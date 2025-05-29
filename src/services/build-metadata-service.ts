import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Build Metadata](https://devcenter.heroku.com/articles/platform-api-reference#build-metadata)
 * Build metadata contains the reference data for building the associated App.
 */
export default class BuildMetadataService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Build metadata for app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.BuildMetadata> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/build-metadata`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.BuildMetadata>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
