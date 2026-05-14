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
import { emitTypes } from "./gen/ts-emit.js";
import {
  normalizeData,
  summarizeCoverage,
  type RouteDef,
  type RouteSchema,
} from "./gen/normalize-data.js";

export type { RouteDef, RouteSchema } from "./gen/normalize-data.js";
export type { JsonSchema } from "./gen/normalize-data.js";

const BANNER = "/**\n * NOTE: the contents of this file are generated. Do not modify this file.\n */\n";

export function generateDataTypes(
  routesByResource: Record<string, Record<string, RouteDef>>,
  schemas: Record<string, RouteSchema>,
): string {
  const model = normalizeData(routesByResource, schemas);
  return BANNER + "\n" + emitTypes(model, { emitResourceShapes: false });
}

export interface MainDeps {
  routesPath: string
  schemaPath: string
  outPath: string
  readFile: (path: string) => string
  writeFile: (path: string, content: string) => void
  importRoutes: (path: string) => Promise<Record<string, unknown>>
  log: (message: string) => void
}

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, "../dist");

const defaultDeps: MainDeps = {
  routesPath: resolve(ROOT, "data/routes.js"),
  schemaPath: process.env.SHOGUN_SCHEMA_PATH ?? resolve('.', "../shogun/tmp/api_schemas.json"),
  outPath: resolve(ROOT, "data/types.d.ts"),
  readFile: (p) => readFileSync(p, "utf8"),
  writeFile: writeFileSync,
  importRoutes: (p) => import(p),
  log: (m) => console.log(m),
};

export async function main(deps: Partial<MainDeps> = {}) {
  const { routesPath, schemaPath, outPath, readFile, writeFile, importRoutes, log } = { ...defaultDeps, ...deps };

  const routesModule = await importRoutes(routesPath);
  const routesByResource: Record<string, Record<string, RouteDef>> = {};
  for (const [k, v] of Object.entries(routesModule)) {
    if (k !== "default") routesByResource[k] = v as Record<string, RouteDef>;
  }

  const schemas: Record<string, RouteSchema> = JSON.parse(readFile(schemaPath));
  const output = generateDataTypes(routesByResource, schemas);
  writeFile(outPath, output);

  const s = summarizeCoverage(routesByResource, schemas);
  log(`Wrote ${outPath}`);
  log(`  Methods total:        ${s.total}`);
  log(`  With any schema:      ${s.withSchema} (${(100 * s.withSchema / s.total).toFixed(1)}%)`);
  log(`  With request schema:  ${s.withOpts}`);
  log(`  With response schema: ${s.withResult}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
