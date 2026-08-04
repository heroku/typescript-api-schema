/**
 * Code generator for `metrics/types.d.ts`.
 *
 * Reads:
 *   - metrics/routes.ts       (hand-written resource grouping; (method, path, query) per call)
 *   - metrics/schemas.json    (local response schemas keyed by "VERB /path")
 *
 * Emits dist/metrics/{types.d.ts, routes.js, routes.d.ts}. Mirrors the data
 * pipeline (gen-data-types.ts) but sources its schema from a committed local
 * file rather than Shogun.
 *
 * Usage: tsx src/gen-metrics-types.ts
 */
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { emitTypes } from "./gen/ts-emit.js";
import {
  normalizeData,
  summarizeCoverage,
  type RouteDef,
  type RouteSchema,
} from "./gen/normalize-data.js";
import { emitTypedSource as defaultEmitTypedSource, type EmitTypedSourceResult } from "./gen/emit-typed-source.js";
import { GENERATED_CONTENT_PREAMBLE } from "./gen/generator.js";
import { generateRoutesDTSForResources, generateSharedTypesDTS } from "./gen/route-generator.js";

const BANNER = "/**\n * NOTE: the contents of this file are generated. Do not modify this file.\n */\n";

export function generateMetricsTypes(
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
  emitTypedSource: (opts: { sourcePath: string; rootDir: string; outDir: string; banner?: string }) => EmitTypedSourceResult
  log: (message: string) => void
}

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = HERE;
const DIST = resolve(HERE, "../dist");

const defaultDeps: MainDeps = {
  routesPath: resolve(SRC, "metrics/routes.ts"),
  schemaPath: resolve(SRC, "metrics/schemas.json"),
  outPath: resolve(DIST, "metrics/types.d.ts"),
  readFile: (p) => readFileSync(p, "utf8"),
  writeFile: writeFileSync,
  importRoutes: (p) => import(p),
  emitTypedSource: defaultEmitTypedSource,
  log: (m) => console.log(m),
};

export async function main(deps: Partial<MainDeps> = {}) {
  const { routesPath, schemaPath, outPath, readFile, writeFile, importRoutes, emitTypedSource, log } = { ...defaultDeps, ...deps };

  const routesModule = await importRoutes(routesPath);
  const routesByResource: Record<string, Record<string, RouteDef>> = {};
  for (const [k, v] of Object.entries(routesModule)) {
    if (k !== "default") routesByResource[k] = v as Record<string, RouteDef>;
  }

  const schemas: Record<string, RouteSchema> = JSON.parse(readFile(schemaPath));
  const output = generateMetricsTypes(routesByResource, schemas);

  const emitResult = emitTypedSource({
    sourcePath: routesPath,
    rootDir: SRC,
    outDir: DIST,
    banner: GENERATED_CONTENT_PREAMBLE,
  });
  if (emitResult.diagnostics.length > 0) {
    const summary = emitResult.diagnostics.map(d => ts.flattenDiagnosticMessageText(d.messageText, '\n')).join('\n')
    throw new Error(`emitTypedSource returned ${emitResult.diagnostics.length} diagnostic(s):\n${summary}`)
  }

  const routesDtsPath = resolve(DIST, "metrics/routes.d.ts");
  writeFile(routesDtsPath, GENERATED_CONTENT_PREAMBLE + generateRoutesDTSForResources(Object.keys(routesByResource)));
  writeFile(outPath, output);

  // Rewrite the SHARED dist/types.d.ts so the `query?: string[]` field added in
  // A1 actually lands on disk. Normally only `npm run generate` writes this file,
  // and that fetches the hyperschema over the network. We regenerate just the
  // shared RouteDefinition block here from the pure emitter — no network — so the
  // SDK (which imports RouteDefinition from `@heroku/types/types`) can typecheck
  // `route.query`. VERIFIED during planning: dist/types.d.ts today contains ONLY
  // the RouteDefinition interface, so this full-file overwrite is lossless.
  const sharedTypesPath = resolve(DIST, "types.d.ts");
  writeFile(sharedTypesPath, GENERATED_CONTENT_PREAMBLE + generateSharedTypesDTS());

  const s = summarizeCoverage(routesByResource, schemas);
  log(`Wrote ${outPath}`);
  log(`Wrote ${emitResult.jsPath}`);
  log(`Wrote ${routesDtsPath}`);
  log(`Wrote ${sharedTypesPath}`);
  log(`  Methods total:        ${s.total}`);
  log(`  With any schema:      ${s.withSchema} (${(100 * s.withSchema / s.total).toFixed(1)}%)`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
