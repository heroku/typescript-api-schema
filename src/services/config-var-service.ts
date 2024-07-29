/**
 * [Heroku Platform API - Config Vars](https://devcenter.heroku.com/articles/platform-api-reference#config-var)
 * Config Vars allow you to manage the configuration information provided to an app on Heroku.
 */
export default class ConfigVarService {
  public constructor(protected readonly fetchImpl: typeof fetch) {}

  /**
   * Get config-vars for app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async infoForApp(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/config-vars`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Get config-vars for a release.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param releaseIdentity unique identifier of release or unique version assigned to the release.
   * @param requestInit The initializer for the request.
   */
  public async infoForAppRelease(
    appIdentity: string,
    releaseIdentity: string | number,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/releases/${releaseIdentity}/config-vars`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    payload: Record<string, unknown>,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Record<string, unknown>> {
    const response = await this.fetchImpl(`/apps/${appIdentity}/config-vars`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Record<string, unknown>>;
    }
    throw new Error(response.statusText);
  }
}