import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#add-on-service)
 * Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class AddOnServiceService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing add-on-service.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnServiceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnService> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-services/${addOnServiceIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnService>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on-services.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AddOnService[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-services`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnService[]>;
    }
    throw new Error(response.statusText);
  }
}
