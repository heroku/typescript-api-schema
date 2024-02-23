import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
 * Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class PlanService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing plan.
   *
   * @param planIdentity unique identifier of this plan or unique name of this plan.
   * @param requestInit The initializer for the request.
   */
  public async info(
    planIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Plan> {
    const response = await this.fetchImpl(`${this.endpoint}/plans/${planIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Plan>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing plan by Add-on.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   * @param planIdentity unique identifier of this plan or unique name of this plan.
   * @param requestInit The initializer for the request.
   */
  public async infoByAddOn(
    addOnServiceIdentity: string,
    planIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Plan> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addon-services/${addOnServiceIdentity}/plans/${planIdentity}`,
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
      return (await response.json()) as Promise<Heroku.Plan>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing plans by Add-on.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   * @param requestInit The initializer for the request.
   */
  public async listByAddOn(
    addOnServiceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Plan[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addon-services/${addOnServiceIdentity}/plans`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Plan[]>;
    }
    throw new Error(response.statusText);
  }
}
