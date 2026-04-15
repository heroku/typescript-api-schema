const DEFAULT_SCHEMA_VARIANT = '3.sdk'
const DEFAULT_URL = 'https://api.heroku.com/schema'

export async function fetchSchema(baseUrl = DEFAULT_URL, schemaVariant = DEFAULT_SCHEMA_VARIANT): Promise<unknown> {
  const response = await fetch(baseUrl, {
    headers: {
      'Accept': `application/vnd.heroku+json; version=${schemaVariant}`
    }
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch schema: ${response.status} ${response.statusText}`)
  }

  return await response.json()
}
