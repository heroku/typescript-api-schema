import schema from './schema.json' assert {type: 'json'};

import {pascalCase} from 'pascal-case';
import fs from 'node:fs/promises';
import path from 'node:path';
import camelcase from 'camelcase';
import dashify from 'dashify';

const {definitions} = schema;

/**
 * Gets the value from the schema base on the $ref path.
 *
 * @param ref The path to the schema value
 * @returns {Record<string, unknown>}
 */
function getValueFromSchema(ref) {
  const schemaPath = ref.replace('#/', '').split('/');
  return schemaPath.reduce((acc, fragment) => acc[fragment], schema);
}

/**
 * Determines if the 2 objects are equal based
 * on the key/value pairs recursively. Node that
 * arrays which are not sorted may return false
 * if indices are not aligned.
 *
 * @param a The reference object.
 * @param b The object to check for equivalency.
 * @returns {boolean} True if the 2 objects are functionally equivalent.
 */
function isDeepEqual(a, b) {
  if (typeof a === 'object' && typeof b === 'object') {
    return Object.keys(a).every(key => b[key] && isDeepEqual(a[key], b[key]))
      && Object.keys(b).every(key => a[key] && isDeepEqual(b[key], a[key]));
  }
  return a === b;
}

/**
 * Resolves the types from the schema items to
 * TypeScript types. If a type is 'object' and
 * has properties, a new interface is created and
 * the interface name is returned.
 *
 * When more than 1 type is defined, this method
 * returns an array of union TypeScript type definitions.
 *
 * @param items
 * @returns {(*|undefined)[]}
 */
function resolveTypes(items) {
  if (!Array.isArray(items)) {
    items = [items];
  }
  return [...new Set(items.map(item => {
    const {$ref} = item;
    const schemaValue = $ref ? getValueFromSchema($ref) : item;
    if (schemaValue) {
      const {type: types} = schemaValue;
      const proposedInterfaceName = buildNameFromRef($ref);
      return types.map(resolvedType => getTypeDefinition(resolvedType, proposedInterfaceName, item)).join(' | ');
    }
  }))];
}

/**
 * Gets the TypeScript type definition for the
 * specified resolved type. If this is a non-primitive
 * type, a new interface is created and the interface name
 * is used. If more than 1 type is allowed, a union is
 * returned.
 *
 * @param {'string' | 'array' | 'object' | 'integer' | 'number' | string} typeName The name of the type.
 * @param {undefined | string} proposedInterfaceName The proposed interface name for this type. Required only if `typeName === object`
 * @param {Record<string, unknown>} schemaInfo The schema value belonging to this type definition.
 * @returns {string}
 */
function getTypeDefinition(typeName, proposedInterfaceName, schemaInfo) {
  const {$ref} = schemaInfo;
  const schemaValue = $ref ? getValueFromSchema($ref) : schemaInfo;

  switch (typeName) {
    case 'object':
      return createInterfaceFromSchemaInfo(proposedInterfaceName, schemaInfo);

    case 'array':
      try {
        const resolvedTypes = resolveTypes(schemaValue.items);
        return resolvedTypes.length > 1 ? `(${resolvedTypes})[]` : `${resolvedTypes}[]`;
      } catch (e) {
        return 'unknown[]';
      }

    case 'string':
    case 'number':
    case 'integer':
      const {enum: enumValues} = schemaValue;
      if (enumValues) {
        const filteredValues = enumValues.filter(val => val !== '~');
        return filteredValues.length ? `'${filteredValues.join(`' | '`)}'` : typeName;
      }
      return typeName.replace('integer', 'number');

    default:
      return typeName;
  }
}

/**
 * Creates a TypeScript interface member string
 * based on the specified schema info.
 *
 * @param {string} propName The name of the interface member.
 * @param {Record<string, unknown>} schemaInfo The schema info belonging to this member
 * @param {boolean} required Boolean indicating whether this property is required.
 * @returns {string}
 */
function createInterfaceMemberFromProp(propName, schemaInfo, required) {
  if (/\W/g.test(propName)) {
    propName = `'${propName}'`;
  }

  const {description, typeScriptType, readOnly} = createInterfaceMemberDescriptor(propName, schemaInfo);
  const docBlock = description ? `/**\n  * ${description}\n */\n  ` : '';
  return `${docBlock}${readOnly ? 'readonly ' : ''}${propName}${required ? '' : '?'}: ${typeScriptType};`;
}

/**
 * Creates a descriptor for an interface member
 * based on the specified schema fragment.
 *
 * @param propName {string} The name of the interface member.
 * @param schemaInfo {Record<string, unknown>} The schema to base this interface member on.
 * @returns {{description: string, typeScriptType: string, readOnly: boolean, propName: string}}
 */
function createInterfaceMemberDescriptor(propName, schemaInfo) {
  const {$ref} = schemaInfo;
  const schemaValue = $ref ? getValueFromSchema($ref) : schemaInfo;
  const {type, readOnly, anyOf} = schemaValue;
  let {description = '', example = ''} = schemaValue;

  let resolvedTypes = anyOf ? resolveTypes(anyOf) : type;
  if (anyOf) {
    description += anyOf
      .filter(anyOfRef => anyOfRef.$ref)
      .map(anyOfRef => getValueFromSchema(anyOfRef.$ref).description)
      .join(' or ');
  }
  description += example ? '\n * @example ' + JSON.stringify(example) : '';
  const unionOrIntersection = resolvedTypes.some(type => /(null|string|number|boolean)/.test(type)) ? '|' : '&';
  const typeDefinitions = resolvedTypes.map((resolvedType) => getTypeDefinition(resolvedType, propName, schemaInfo));
  return {
    description,
    typeScriptType: typeDefinitions.join(` ${unionOrIntersection} `),
    propName,
    readOnly,
  };
}

// Storage for interfaces to write out.
/**
 *
 * @type {Map<string, {interfaceDefinition: string, schemaInfo: Record<string, unknown>}>}
 */
const interfaceMap = new Map();

/**
 *
 * @type {string[]}
 */
const paths = [];

/**
 *
 * @param ref {string | undefined}
 * @param useShallowCheck {boolean}
 * @returns {string | undefined}
 */
function buildNameFromRef(ref = '', useShallowCheck = true) {
  const pathParts = ref
    ?.split('/')
    .filter(part => part !== 'definitions' && part !== '#');

  if (useShallowCheck) {
    const shallowName = [...pathParts].pop();

    if (!definitions[shallowName] && !interfaceMap.has(shallowName)) {
      return shallowName;
    }
  }
  return pathParts?.join('-');
}

/**
 * Creates a TypeScript interface from the specified schema info.
 * If the interface name cannot be determined or if it conflicts
 * with an existing interface, it will be anonymous and inlined.
 *
 * @param {undefined | string} propName The property name for this type. Required only if `typeName === object`
 * @param {Record<string, unknown>} schemaInfo The schema info belonging to this type definition.
 * @return string
 */
function createInterfaceFromSchemaInfo(propName, schemaInfo) {
  let {properties, strictProperties, description = '', required, $ref} = schemaInfo;
  let interfaceName = pascalCase(propName ?? '');

  // $ref will always reference a single definition
  // and are safe to use as-is
  if ($ref) {
    interfaceName = pascalCase(buildNameFromRef($ref));
    schemaInfo = getValueFromSchema($ref);
    ({properties, strictProperties, required, description} = schemaInfo);
  }
  const alternateInterfaceName = interfaceName
    ? `${[...paths.filter(path => !!path)].pop() ?? ''}${interfaceName}`
    : '';
  // We may have created an interface by this
  // name already. Determine if it's a conflict
  // or a duplicate.
  if (interfaceMap.has(interfaceName)) {
    const {schemaInfo: existingSchema} = (interfaceMap.get(interfaceName) ?? {});
    const isEq = isDeepEqual(schemaInfo?.properties || true, existingSchema?.properties || false);
    // Duplicate, just use the interface
    if (isEq || schemaInfo === existingSchema) {
      return interfaceName;
    }
    // Conflict, use the alternate interface name
    interfaceName = alternateInterfaceName;
  }

  // Check the alternate interface name against
  // an existing schema next.
  if (interfaceMap.has(alternateInterfaceName)) {
    const {schemaInfo: alternateExistingSchema} = interfaceMap.get(alternateInterfaceName);
    const isEq = isDeepEqual(schemaInfo.properties, alternateExistingSchema.properties);
    if (isEq || schemaInfo === alternateExistingSchema) {
      return alternateInterfaceName;
    }
  }
  // Anonymous object with unknown values
  if (!properties) {
    return 'Record<string, unknown>';
  }

  // By the time we get here, a new
  // interface is being created and
  // will be written as output.
  paths.push(interfaceName);
  if (interfaceName) {
    interfaceMap.set(interfaceName, {interfaceDefinition: '', schemaInfo});
  }
  // interfaceMap.set(interfaceName, {interfaceDefinition: 'reserved', schemaInfo});
  // Interface members are primitives, other interfaces,
  // intersection types or enums.
  const interfaceMembers = properties
    ? Object.keys(properties).map((propName => createInterfaceMemberFromProp(propName, properties[propName], strictProperties || required?.includes(propName))))
    : ['[k: string]: unknown'];

  // Build the entire interface
  // definition including doc blocks.
  const title = definitions[propName] ? `\n * [Heroku Platform API - ${propName}](https://devcenter.heroku.com/articles/platform-api-reference#${propName})` : '';
  let interfaceDefinition = (description && interfaceName) ? `/**\n * ${title}\n * ${description}\n */\n` : '';
  interfaceDefinition += interfaceName ? `export interface ${interfaceName} ` : '';
  interfaceDefinition += `{\n ${interfaceMembers.join('\n ')}\n}`;
  // Anonymous interfaces will be inlined and therefore not stored
  if (interfaceName) {
    const sc = interfaceMap.get(interfaceName)?.schemaInfo;
    if (interfaceMap.has(interfaceName) && sc !== schemaInfo) {
      console.group(interfaceName);
      console.log('duplicate definition', sc, schemaInfo, alternateInterfaceName, interfaceMap.has(alternateInterfaceName));
      console.groupEnd();
    }
    interfaceMap.set(interfaceName, {interfaceDefinition, schemaInfo});
  }
  paths.pop();
  // Return either the interface name or the inlined definition
  return interfaceName || interfaceDefinition;
}

/**
 * Gets the targetSchema type from a link fragment.
 * Any interfaces are created as needed.
 *
 * @param targetSchema
 * @returns {string}
 */
function getTargetSchemaType(targetSchema) {
  if (!targetSchema) {
    return 'void';
  }
  const {type: types} = targetSchema;
  if (types) {
    return types
      .map(type => getTypeDefinition(type, undefined, targetSchema))
      .join(' | ');
  }
  return createInterfaceFromSchemaInfo(undefined, targetSchema);
}

/**
 * Creates descriptors for the url params based
 * on the specified tokenized url.
 *
 * @param tokenizedUrl The URL containing the $ref tokens to create descriptors for
 * @returns {{parameterizedUrl, paramDescriptors: {description: string, typeScriptType: string, readOnly: boolean, propName: string}[]}}
 */
function createParamDescriptors(tokenizedUrl) {
  const tokenRegex = /{\((#[\w+/\-_]+)\)}/g;
  const hrefTokens = [...tokenizedUrl.matchAll(tokenRegex)];
  let parameterizedUrl = tokenizedUrl;
  const paramDescriptors = hrefTokens.map(hrefToken => {
    const [token, ref] = hrefToken;
    const proposedInterfaceName = camelcase(buildNameFromRef(ref, false));
    parameterizedUrl = parameterizedUrl.replace(token, '${' + proposedInterfaceName + '}');
    return createInterfaceMemberDescriptor(proposedInterfaceName, getValueFromSchema(ref));
  });
  return {parameterizedUrl, paramDescriptors};
}

/**
 * Builds the service class members from the
 * array of link definitions. Any interfaces
 * specified with $ref are built and added
 * as type definitions to function arguments
 * or return types.
 *
 * @example
 *
 * ```ts
 * public async info(accountFeatureIdentity: string, requestInit: RequestInit & {headers?: Headers} = {}): Promise<AccountFeature> {
 *   requestInit.method = 'GET';
 *   if (!requestInit.headers) {
 *    requestInit.headers = new Headers();
 *   }
 *   requestInit.headers.append('Accept', 'application/vnd.heroku+json; version=3');
 *   return await this.fetch(`/account/features/${accountFeatureIdentity}`, requestInit);
 * }
 * ```
 *
 * @param entityName The name of the target entity for this API
 * @param {Array<{
 * description: string,
 * title: string,
 * href:string, method: 'GET' | 'POST' | 'DELETE' | 'PATCH' | 'PUT' | 'UPDATE'
 * schema: Record<string, unknown>,
 * targetSchema: Record<string, unknown>
 * }>} links
 * @return string[]
 */
function buildClassMembersFromLinks(entityName, links) {
  const members = [];
  for (const link of links) {
    const {description, method, href, schema, title, targetSchema} = link;
    let payloadType = schema
      ? createInterfaceFromSchemaInfo(`${entityName}-${title}-payload`, schema)
      : '';
    if (payloadType && !payloadType.startsWith('Record')) {
      payloadType = `Heroku.${payloadType}`;
    }

    let targetSchemaType = getTargetSchemaType(targetSchema);
    if (targetSchemaType !== 'void' && !targetSchemaType.startsWith('Record')) {
      targetSchemaType = `Heroku.${targetSchemaType}`;
    }
    const {paramDescriptors, parameterizedUrl} = createParamDescriptors(decodeURIComponent(href));

    // Doc blocks are composed of the schema
    // description for the method declaration
    // and the interface descriptor for each param.
    let docBlock = description ? `/**\n * ${description}\n *` : '';
    docBlock += paramDescriptors.map(descriptor => `\n * @param ${descriptor.propName} ${descriptor.description}.`).join('');
    docBlock += payloadType ? `\n * @param payload Object to send to the endpoint.` : '';
    docBlock += `\n * @param requestInit The initializer for the request.`
    docBlock += ` \n */`;

    // Params consist of the data needed to
    // build the endpoint url and the body
    // in cases where POST, PUT, PATCH and UPDATE
    // methods are used.
    const params = paramDescriptors
      .map(descriptor => `${descriptor.propName}:${descriptor.typeScriptType}`);
    if (payloadType) {
      params.push(`payload: ${payloadType}`);
    }
    params.push(`requestInit: Omit<RequestInit, 'body' | 'method'> = {}`);

    // Options consist of the body if a payload
    // is sent to the endpoint and the headers.
    let requestInit = `{
    ...requestInit,
    ${payloadType ? `body: JSON.stringify(payload, null, 2),` : ''}
    method: '${method}',
    headers: {
      ...requestInit?.headers,
      Accept: 'application/vnd.heroku+json; version=3'
      ${method !== 'GET' ? `,'Content-Type': 'application/json'` : ''}
      } }`;

    const returnVal = targetSchemaType !== 'void' ? `
    const response = await this.fetchImpl(\`${`\${this.endpoint}` + parameterizedUrl}\`, ${requestInit});
    if (response.ok) {
        return await response.json() as Promise<${targetSchemaType}>;
    }
    throw new Error(response.statusText);` : `await this.fetchImpl(\`${parameterizedUrl}\`, ${requestInit});`;

    // Finally the class member is constructed
    let member = `${docBlock}
    public async ${camelcase(title)}(${params}): Promise<${targetSchemaType}> {
    ${returnVal}
    }`;
    members.push(member);
  }
  return members;
}

const serviceClasses = new Map();

/**
 * Creates a TypeScript service class from the specified schema info.
 * This class can be used to interact with the Heroku API.
 *
 * @param {undefined | string} propName The property name for this type. Required only if `typeName === object`
 * @param {Record<string, unknown>} schemaInfo The schema info belonging to this type definition.
 */
function createServiceClass(propName, schemaInfo) {
  let {links, description, title} = schemaInfo;
  const className = pascalCase(propName + '-service');
  const classMembers = buildClassMembersFromLinks(propName, links);
  const clazz = `import * as Heroku from '@heroku-cli/schema';
  /**
   * [${title}](https://devcenter.heroku.com/articles/platform-api-reference#${propName})\n * ${description ?? ''}
  */
  export default class ${className} {
    public constructor(protected readonly fetchImpl: typeof fetch, protected readonly endpoint: string) {}

    ${classMembers.join('\n')}
  }
  `;
  serviceClasses.set(className, clazz);
}

// Initialization and job
for (const definitionKey in definitions) {
  const definition = definitions[definitionKey];
  createInterfaceFromSchemaInfo(definitionKey, definition);
  if (definition.links) {
    createServiceClass(definitionKey, definition);
  }
}

await fs.mkdir('src/services', {recursive: true});

let schemaStr = '';
for (const [, {interfaceDefinition}] of interfaceMap) {
  schemaStr += interfaceDefinition + '\n';
}
await fs.writeFile(path.join('src', 'index.ts'), schemaStr);
let serviceIndex = '';
for (const [fileName, serviceClass] of serviceClasses) {
  const dashedFileName = dashify(fileName);
  serviceIndex += `export * from './${dashedFileName}';`;
  await fs.writeFile(path.join('src/services', `${dashedFileName}.ts`), serviceClass);
}
await fs.writeFile(path.join('src/services', `index.ts`), serviceIndex);
