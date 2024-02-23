import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Setup API - App Setup](https://devcenter.heroku.com/articles/platform-api-reference#app-setup)
 * An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file.
 */
export default class AppSetupService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new app setup from a gzipped tar archive containing an app.json manifest file.
   *
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    payload: Heroku.AppSetupCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppSetup> {
    const response = await this.fetchImpl(`${this.endpoint}/app-setups`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'POST',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppSetup>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Get the status of an app setup.
   *
   * @param appSetupIdentity unique identifier of app setup.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appSetupIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppSetup> {
    const response = await this.fetchImpl(`${this.endpoint}/app-setups/${appSetupIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppSetup>;
    }
    throw new Error(response.statusText);
  }
}
