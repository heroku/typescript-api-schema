// Pure string and schema utilities used by the renderer.

import type { SchemaLink } from './schema-types.js'

export function toPascalCase(name: string): string {
  return name
    .split(/[-.\s/:_{}()]+/)
    .filter(Boolean)
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join('')
}

export function toCamelCase(name: string): string {
  const pascal = toPascalCase(name)
  return pascal.charAt(0).toLowerCase() + pascal.slice(1)
}

const VALID_IDENTIFIER = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/

export function formatPropertyKey(key: string): string {
  return VALID_IDENTIFIER.test(key) ? key : `'${key.replace(/'/g, "\\'")}'`
}

export function renderJSDoc(description: string | undefined, indent: string): string {
  if (!description) return ''
  if (!description.includes('\n')) {
    return `${indent}/** ${description} */\n`
  }
  const lines = description.split('\n')
  return `${indent}/**\n${lines.map(l => `${indent} * ${l}`).join('\n')}\n${indent} */\n`
}

export function disambiguateLinkTitles(links: SchemaLink[]): Map<SchemaLink, string> {
  // Count titles (case-insensitive)
  const counts = new Map<string, number>()
  for (const link of links) {
    if (!link.title) continue
    const lower = link.title.toLowerCase()
    counts.set(lower, (counts.get(lower) ?? 0) + 1)
  }

  // Assign disambiguated suffixes: append method when title collides
  const result = new Map<SchemaLink, string>()
  for (const link of links) {
    if (!link.title) continue
    const lower = link.title.toLowerCase()
    if ((counts.get(lower) ?? 0) > 1 && link.method) {
      result.set(link, link.title + '-' + link.method.toLowerCase())
    } else {
      result.set(link, link.title)
    }
  }
  return result
}
