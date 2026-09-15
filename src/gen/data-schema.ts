import { parse } from 'yaml'

const DEFAULT_URL = 'https://data-api.staging.herokudev.com/api-docs/v1/swagger.yaml'

export async function fetchDataApiSpec(baseUrl = DEFAULT_URL): Promise<unknown> {
  const response = await fetch(baseUrl)

  if (!response.ok) {
    throw new Error(`Failed to fetch data-api spec: ${response.status} ${response.statusText}`)
  }

  return parse(await response.text())
}
