/**
 * Curated corrections to the data-api OpenAPI spec, applied before
 * normalization. Each patch fixes a known gap between the published spec and
 * what the API accepts. Remove a patch once the spec itself is fixed.
 */
import type { OpenApiDocument, OpenApiSchema, OpenApiSchemaOrRef } from "../gen/openapi-types.js";

const REF_PREFIX = "#/components/schemas/";

/**
 * `PATCH /postgres/v0/databases/{name}/config` accepts any setting that
 * `GET .../config` returns, but the spec's `PostgresDatabaseUpdateConfigOpts`
 * lists only three of them. Add each remaining setting from
 * `PostgresDatabaseConfigResult`, typed as that setting's `value`. Settings
 * the spec already lists are left alone. A spec without these schemas is left
 * unchanged; the golden test pins that the real spec gets patched.
 */
function widenPostgresUpdateConfigOpts(schemas: Record<string, OpenApiSchemaOrRef>): void {
  const opts = schemas.PostgresDatabaseUpdateConfigOpts as OpenApiSchema | undefined;
  const config = schemas.PostgresDatabaseConfigResult as OpenApiSchema | undefined;
  if (!opts?.properties || !config?.properties) return;

  for (const [key, setting] of Object.entries(config.properties)) {
    if (key in opts.properties) continue;
    const resolved = "$ref" in setting ? schemas[setting.$ref.slice(REF_PREFIX.length)] : setting;
    const value = (resolved as OpenApiSchema | undefined)?.properties?.value;
    if (!value) {
      throw new Error(`spec-patches: can't find the value type of PostgresDatabaseConfigResult.${key}`);
    }
    opts.properties[key] = value;
  }
}

/** Returns a copy of `spec` with every curated patch applied. */
export function applyDataSpecPatches(spec: OpenApiDocument): OpenApiDocument {
  const patched = structuredClone(spec);
  const schemas = patched.components?.schemas;
  if (schemas) widenPostgresUpdateConfigOpts(schemas);
  return patched;
}
