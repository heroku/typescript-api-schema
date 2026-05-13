import { describe, it, expect } from 'vitest'
import {
  toPascalCase,
  toCamelCase,
  formatPropertyKey,
  renderJSDoc,
  disambiguateLinkTitles,
} from './utils.js'

describe('toPascalCase', () => {
  it('converts hyphenated names', () => {
    expect(toPascalCase('add-on-attachment')).toBe('AddOnAttachment')
  })

  it('converts single words', () => {
    expect(toPascalCase('account')).toBe('Account')
  })

  it('converts two-part names', () => {
    expect(toPascalCase('config-var')).toBe('ConfigVar')
  })
})

describe('toCamelCase', () => {
  it('converts hyphenated names', () => {
    expect(toCamelCase('app-identity')).toBe('appIdentity')
  })

  it('converts single words', () => {
    expect(toCamelCase('account')).toBe('account')
  })
})

describe('formatPropertyKey', () => {
  it('returns valid identifiers as-is', () => {
    expect(formatPropertyKey('name')).toBe('name')
    expect(formatPropertyKey('created_at')).toBe('created_at')
    expect(formatPropertyKey('$ref')).toBe('$ref')
  })

  it('quotes keys with hyphens', () => {
    expect(formatPropertyKey('nav-data')).toBe("'nav-data'")
    expect(formatPropertyKey('default-permission')).toBe("'default-permission'")
  })

  it('quotes keys with special characters', () => {
    expect(formatPropertyKey('ca_signed?')).toBe("'ca_signed?'")
  })

  it('quotes keys with brackets and colons', () => {
    expect(formatPropertyKey('["NAME"]: ["value"]')).toBe("'[\"NAME\"]: [\"value\"]'")
  })

  it('escapes single quotes in keys', () => {
    expect(formatPropertyKey("it's")).toBe("'it\\'s'")
  })
})

describe('renderJSDoc', () => {
  it('returns empty string for undefined description', () => {
    expect(renderJSDoc(undefined, '')).toBe('')
  })

  it('renders single-line description', () => {
    expect(renderJSDoc('unique identifier', '  ')).toBe('  /** unique identifier */\n')
  })

  it('renders multi-line description', () => {
    expect(renderJSDoc('line one\nline two', '')).toBe(
      '/**\n * line one\n * line two\n */\n',
    )
  })
})

describe('disambiguateLinkTitles', () => {
  it('returns titles unchanged when unique', () => {
    const links = [
      { title: 'Create', method: 'POST' },
      { title: 'List', method: 'GET' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.get(links[0])).toBe('Create')
    expect(result.get(links[1])).toBe('List')
  })

  it('appends method when titles collide (case-insensitive)', () => {
    const links = [
      { title: 'List', method: 'GET' },
      { title: 'list', method: 'POST' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.get(links[0])).toBe('List-get')
    expect(result.get(links[1])).toBe('list-post')
  })

  it('skips links without title', () => {
    const links = [
      { method: 'GET' },
      { title: 'Create', method: 'POST' },
    ]
    const result = disambiguateLinkTitles(links)
    expect(result.size).toBe(1)
    expect(result.get(links[1])).toBe('Create')
  })
})
