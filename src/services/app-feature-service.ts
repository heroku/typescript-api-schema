import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Feature](https://devcenter.heroku.com/articles/platform-api-reference#app-feature)
 * An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku.
 */
export default class AppFeatureService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for an existing app feature.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    appFeatureIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppFeature> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/features/${appFeatureIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppFeature>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing app features.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppFeature[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/features`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppFeature[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update an existing app feature.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appFeatureIdentity unique identifier of app feature or unique name of app feature.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    appFeatureIdentity: string,
    payload: Heroku.AppFeatureUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppFeature> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/features/${appFeatureIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.AppFeature>;
    }
    throw new Error(response.statusText);
  }
}
