/**
 * Code generator for `data/types.d.ts`.
 *
 * Reads:
 *   - data/routes.js          (curated resource grouping; (method, path) per call)
 *   - <SCHEMA_PATH>           (Shogun's tmp/api_schemas.json — schemas keyed by "VERB /path")
 *
 * Emits a `data/types.d.ts` whose `HerokuClient` interface preserves the
 * curated resource grouping but replaces every `Promise<unknown>` with
 * concrete request/response types inferred from spec traffic. Uses the
 * same Opts/Result naming convention as `3.sdk/types.d.ts`.
 *
 * Usage:
 *   SHOGUN_SCHEMA_PATH=/path/to/shogun/tmp/api_schemas.json \
 *     node --experimental-strip-types src/gen-data-types.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

interface RouteDef { method: string; path: string; hasRequestBody?: true }
interface JsonSchema { type?: string | string[]; properties?: Record<string, JsonSchema>; required?: string[]; items?: JsonSchema; anyOf?: JsonSchema[] }
interface RouteSchema { request: JsonSchema | null; responses: Record<string, JsonSchema>; request_example_count: number; response_example_count: number }

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "..");
const ROUTES_PATH = resolve(ROOT, "data/routes.js");
const OUT_PATH    = resolve(ROOT, "data/types.d.ts");
const SCHEMA_PATH = process.env.SHOGUN_SCHEMA_PATH ?? resolve(ROOT, "../shogun/tmp/api_schemas.json");

const PARAM_RE = /\{(\w+)\}/g;
const normalizeRoute = (key: string): string => key.replace(PARAM_RE, ":$1");

const toPascal = (s: string): string =>
  s.replace(/(?:^|[_-])([a-z])/g, (_, c: string) => c.toUpperCase()).replace(/^./, (c) => c.toUpperCase());

// Pick the principal response shape: prefer 200, then 201/202, else the first
// non-empty schema. We render only one Result type per method to match 3.sdk.
function pickPrincipalResponse(responses: Record<string, JsonSchema>): JsonSchema | null {
  for (const status of ["200", "201", "202"]) if (responses[status]) return responses[status];
  for (const v of Object.values(responses)) if (v) return v;
  return null;
}

// Renders a JSON Schema fragment as TypeScript. Indentation matches 3.sdk's
// hand-written output style. Unknown/unsupported shapes degrade to `unknown`
// rather than throwing — codegen should never block on schema oddities.
function renderType(schema: JsonSchema | null | undefined, indent = "  "): string {
  if (!schema) return "unknown";
  if (schema.anyOf) return schema.anyOf.map((s) => renderType(s, indent)).join(" | ");

  const types = Array.isArray(schema.type) ? schema.type : schema.type ? [schema.type] : [];
  const nonNull = types.filter((t) => t !== "null");
  const nullable = types.includes("null");

  let core: string;
  if (nonNull.length > 1) {
    core = nonNull.map((t) => renderType({ ...schema, type: t }, indent)).join(" | ");
  } else {
    const t = nonNull[0];
    switch (t) {
      case "string":  core = "string"; break;
      case "integer":
      case "number":  core = "number"; break;
      case "boolean": core = "boolean"; break;
      case "array":   core = `Array<${renderType(schema.items, indent)}>`; break;
      case "object":  core = renderObject(schema, indent); break;
      default:        core = "unknown";
    }
  }
  return nullable ? `${core} | null` : core;
}

function renderObject(schema: JsonSchema, indent: string): string {
  const props = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const keys = Object.keys(props);
  if (keys.length === 0) return "Record<string, unknown>";

  const inner = indent + "  ";
  const lines = keys.map((k) => {
    const optional = required.has(k) ? "" : "?";
    const safeKey = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
    return `${inner}${safeKey}${optional}: ${renderType(props[k], inner)}`;
  });
  return `{\n${lines.join("\n")}\n${indent}}`;
}

// Top-level interface body — same as renderObject but without enclosing braces
// and at the document indent (zero). Used for `export interface XOpts { ... }`.
function renderInterfaceBody(schema: JsonSchema): string {
  const props = schema.properties ?? {};
  const required = new Set(schema.required ?? []);
  const keys = Object.keys(props);
  if (keys.length === 0) return "  [key: string]: unknown";
  return keys
    .map((k) => {
      const optional = required.has(k) ? "" : "?";
      const safeKey = /^[A-Za-z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
      return `  ${safeKey}${optional}: ${renderType(props[k], "  ")}`;
    })
    .join("\n");
}

// Path params come from `{name}` segments. Order matters for the generated
// signature; Sinatra preserves left-to-right declaration order.
function extractPathParams(path: string): string[] {
  const out: string[] = [];
  for (const m of path.matchAll(/\{(\w+)\}/g)) out.push(m[1]);
  return out;
}

interface MethodPlan {
  resource: string;
  method: string;
  route: RouteDef;
  schema: RouteSchema | null;
  optsName: string | null;
  resultName: string;
}

function plan(routesByResource: Record<string, Record<string, RouteDef>>, schemas: Record<string, RouteSchema>): MethodPlan[] {
  const out: MethodPlan[] = [];
  const norm = (k: string) => k.replace(PARAM_RE, ":$1");
  const indexed: Record<string, RouteSchema> = {};
  for (const [k, v] of Object.entries(schemas)) indexed[norm(k)] = v;

  for (const [resource, methods] of Object.entries(routesByResource)) {
    for (const [method, route] of Object.entries(methods)) {
      const key  = norm(`${route.method} ${route.path}`);
      const sch  = indexed[key] ?? null;
      const stem = `${toPascal(resource)}${toPascal(method)}`;
      out.push({
        resource,
        method,
        route,
        schema: sch,
        optsName: route.hasRequestBody ? `${stem}Opts` : null,
        resultName: `${stem}Result`,
      });
    }
  }
  return out;
}

function render(plans: MethodPlan[]): string {
  const interfaces: string[] = [];
  const optsEmitted = new Set<string>();
  const resultEmitted = new Set<string>();

  for (const p of plans) {
    if (p.optsName && p.schema?.request && !optsEmitted.has(p.optsName)) {
      interfaces.push(`export interface ${p.optsName} {\n${renderInterfaceBody(p.schema.request)}\n}`);
      optsEmitted.add(p.optsName);
    }
    if (!resultEmitted.has(p.resultName)) {
      const principal = p.schema ? pickPrincipalResponse(p.schema.responses) : null;
      if (principal) {
        interfaces.push(`export interface ${p.resultName} {\n${renderInterfaceBody(principal)}\n}`);
        resultEmitted.add(p.resultName);
      }
    }
  }

  // Group plans by resource to render the HerokuClient interface
  const byResource = new Map<string, MethodPlan[]>();
  for (const p of plans) {
    if (!byResource.has(p.resource)) byResource.set(p.resource, []);
    byResource.get(p.resource)!.push(p);
  }

  const clientLines: string[] = ["export interface HerokuClient {"];
  for (const [resource, methods] of byResource) {
    clientLines.push(`  ${resource}: {`);
    for (const p of methods) {
      const params = extractPathParams(p.route.path).map((n) => `${n}: string`);
      if (p.optsName && optsEmitted.has(p.optsName)) params.push(`requestBody: ${p.optsName}`);
      const ret = resultEmitted.has(p.resultName) ? p.resultName : "unknown";
      const todo = p.schema ? "" : "  // TODO: no spec coverage — schema unknown";
      clientLines.push(`    ${p.method}(${params.join(", ")}): Promise<${ret}>${todo}`);
    }
    clientLines.push("  }");
    clientLines.push("");
  }
  clientLines.push("}");

  const banner = "/**\n * NOTE: the contents of this file are generated. Do not modify this file.\n */\n";
  return [banner, ...interfaces, "", clientLines.join("\n"), ""].join("\n");
}

// Stats so you can see at a glance which methods came back unknown.
interface Stats { total: number; withSchema: number; withOpts: number; withResult: number }
function summarize(plans: MethodPlan[]): Stats {
  let withSchema = 0, withOpts = 0, withResult = 0;
  for (const p of plans) {
    if (p.schema) withSchema += 1;
    if (p.schema?.request) withOpts += 1;
    if (p.schema && pickPrincipalResponse(p.schema.responses)) withResult += 1;
  }
  return { total: plans.length, withSchema, withOpts, withResult };
}

const routesModule = await import(ROUTES_PATH);
const routesByResource: Record<string, Record<string, RouteDef>> = {};
for (const [k, v] of Object.entries(routesModule)) if (k !== "default") routesByResource[k] = v as Record<string, RouteDef>;

const schemas: Record<string, RouteSchema> = JSON.parse(readFileSync(SCHEMA_PATH, "utf8"));

const plans = plan(routesByResource, schemas);
const output = render(plans);
writeFileSync(OUT_PATH, output);

const s = summarize(plans);
console.log(`Wrote ${OUT_PATH}`);
console.log(`  Methods total:        ${s.total}`);
console.log(`  With any schema:      ${s.withSchema} (${(100 * s.withSchema / s.total).toFixed(1)}%)`);
console.log(`  With request schema:  ${s.withOpts}`);
console.log(`  With response schema: ${s.withResult}`);
