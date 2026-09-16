/**
 * Code generator for `data/types.d.ts`.
 *
 * Reads:
 *   - data/routes.js          (curated resource grouping; (method, path) per call)
 *   - OpenAPI 3.0.1 spec      (see `./gen/data-schema.ts`)
 *
 * Emits a `data/types.d.ts` whose `HerokuClient` interface preserves the
 * curated resource grouping but replaces every `Promise<unknown>` with
 * concrete request/response types sourced from the spec. Uses the
 * same Opts/Result naming convention as `3.sdk/types.d.ts`.
 *
 * Usage:
 *   npm run generate:data
 */
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { fetchDataApiSpec } from "./gen/data-schema.js";
import { emitTypes } from "./gen/ts-emit.js";
import {
  normalizeOpenApi,
  summarizeOpenApiCoverage,
} from "./gen/normalize-openapi.js";
import type { OpenApiDocument } from "./gen/openapi-types.js";
import type { RouteDefinition } from "./gen/schema-types.js";
import { emitTypedSource as defaultEmitTypedSource, type EmitTypedSourceResult } from "./gen/emit-typed-source.js";
import { GENERATED_CONTENT_PREAMBLE } from "./gen/generator.js";
import { generateRoutesDTSForResources } from "./gen/route-generator.js";

export type {RouteDefinition} from "./gen/schema-types.js";

const BANNER = "/**\n * NOTE: the contents of this file are generated. Do not modify this file.\n */\n";

export function generateDataTypes(
  routesByResource: Record<string, Record<string, RouteDefinition>>,
  spec: OpenApiDocument,
): string {
  const model = normalizeOpenApi(routesByResource, spec);
  return BANNER + "\n" + emitTypes(model, { emitResourceShapes: false });
}

export interface MainDeps {
  routesPath: string
  outPath: string
  fetchSpec: () => Promise<OpenApiDocument>
  writeFile: (path: string, content: string) => void
  importRoutes: (path: string) => Promise<Record<string, unknown>>
  emitTypedSource: (opts: { sourcePath: string; rootDir: string; outDir: string; banner?: string }) => EmitTypedSourceResult
  log: (message: string) => void
}

const HERE = dirname(fileURLToPath(import.meta.url));
const SRC = HERE;
const DIST = resolve(HERE, "../dist");

const defaultDeps: MainDeps = {
  routesPath: resolve(SRC, "data/routes.ts"),
  outPath: resolve(DIST, "data/types.d.ts"),
  fetchSpec: () => fetchDataApiSpec() as Promise<OpenApiDocument>,
  writeFile: writeFileSync,
  importRoutes: (p) => import(p),
  emitTypedSource: defaultEmitTypedSource,
  log: (m) => console.log(m),
};

export async function main(deps: Partial<MainDeps> = {}) {
  const { routesPath, outPath, fetchSpec, writeFile, importRoutes, emitTypedSource, log } = { ...defaultDeps, ...deps };

  const routesModule = await importRoutes(routesPath);
  const routesByResource: Record<string, Record<string, RouteDefinition>> = {};
  for (const [k, v] of Object.entries(routesModule)) {
    if (k !== "default") routesByResource[k] = v as Record<string, RouteDefinition>;
  }

  const spec: OpenApiDocument = await fetchSpec();
  const output = generateDataTypes(routesByResource, spec);

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

  const routesDtsPath = resolve(DIST, "data/routes.d.ts");
  writeFile(routesDtsPath, GENERATED_CONTENT_PREAMBLE + generateRoutesDTSForResources(Object.keys(routesByResource)));
  writeFile(outPath, output);

  const s = summarizeOpenApiCoverage(routesByResource, spec);
  log(`Wrote ${outPath}`);
  log(`Wrote ${emitResult.jsPath}`);
  log(`Wrote ${routesDtsPath}`);
  log(`  Methods total:        ${s.total}`);
  log(`  With request schema:  ${s.withOpts}`);
  log(`  With response schema: ${s.withResult}`);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  main()
}
