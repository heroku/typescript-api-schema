import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on SSO](https://devcenter.heroku.com/articles/platform-api-reference#add-on-sso)
 * Add-on Single Sign-on generates URL that allows a customer to log in to an Add-on Service's web dashboard.
 */
export default class AddOnSsoService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Generate a timestamp-based single sign-on URL.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async addOnSso(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnSso> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/sso`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnSso>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Generate a timestamp-based single sign-on URL.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async addOnSsoByApp(
    appIdentity: string,
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnSso> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/addons/${addOnIdentity}/sso`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnSso>;
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
