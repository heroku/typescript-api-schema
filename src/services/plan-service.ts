import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Plan](https://devcenter.heroku.com/articles/platform-api-reference#plan)
 * Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication.
 */
export default class PlanService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing plan.
   *
   * @param planIdentity unique identifier of this plan or unique name of this plan.
   */
  public async info(planIdentity: string): Promise<Heroku.Plan> {
    const response = await this.heroku.get<Heroku.Plan>(`/plans/${planIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info for existing plan by Add-on.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   * @param planIdentity unique identifier of this plan or unique name of this plan.
   */
  public async infoByAddOn(addOnServiceIdentity: string, planIdentity: string): Promise<Heroku.Plan> {
    const response = await this.heroku.get<Heroku.Plan>(
      `/addon-services/${addOnServiceIdentity}/plans/${planIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing plans by Add-on.
   *
   * @param addOnServiceIdentity unique identifier of this add-on-service or unique name of this add-on-service.
   */
  public async listByAddOn(addOnServiceIdentity: string): Promise<Heroku.Plan[]> {
    const response = await this.heroku.get<Heroku.Plan[]>(`/addon-services/${addOnServiceIdentity}/plans`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
