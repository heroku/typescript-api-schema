import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Region Capability](https://devcenter.heroku.com/articles/platform-api-reference#add-on-region-capability)
 * Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints.
 */
export default class AddOnRegionCapabilityService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List all existing add-on region capabilities.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-region-capabilities`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnRegionCapability[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on region capabilities for an add-on-service
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   * @param requestInit The initializer for the request.
   */
  public async listByAddOnService(
    addOnServiceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addon-services/${addOnServiceIdentity}/region-capabilities`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnRegionCapability[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing add-on region capabilities for a region.
   *
   * @param regionIdentity unique identifier of region or unique name of region.
   * @param requestInit The initializer for the request.
   */
  public async listByRegion(
    regionIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AddOnRegionCapability[]> {
    const response = await this.fetchImpl(`${this.endpoint}/regions/${regionIdentity}/addon-region-capabilities`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AddOnRegionCapability[]>;
    }
    throw new Error(response.statusText);
  }
}
