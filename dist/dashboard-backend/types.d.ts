/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export type FavoriteListResult = Array<{
  id: string
  resource_id: string
  resource_name: string
  type: string
}>

export interface FavoriteCreateOpts {
  resource_id: string
  type: string
}

export interface FavoriteCreateResult {
  id: string
  resource_id: string
  type: string
}

export interface HerokuClient {
  favorite: {
  list(query: {
  type?: string
}): Promise<FavoriteListResult>
  create(requestBody: FavoriteCreateOpts): Promise<FavoriteCreateResult | void>
  delete(id: string): Promise<void>
  }
}
