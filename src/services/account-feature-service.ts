import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Feature](https://devcenter.heroku.com/articles/platform-api-reference#account-feature)
 * An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
 */
export default class AccountFeatureService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for an existing account feature.
   *
   * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
   */
  public async info(accountFeatureIdentity: string): Promise<Heroku.AccountFeature> {
    const response = await this.heroku.get<Heroku.AccountFeature>(`/account/features/${accountFeatureIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing account features.
   *
   */
  public async list(): Promise<Heroku.AccountFeature[]> {
    const response = await this.heroku.get<Heroku.AccountFeature[]>(`/account/features`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing account feature.
   *
   * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
   * @param body Object to send to the endpoint.
   */
  public async update(
    accountFeatureIdentity: string,
    body: Heroku.AccountFeatureUpdatePayload
  ): Promise<Heroku.AccountFeature> {
    const response = await this.heroku.patch<Heroku.AccountFeature>(`/account/features/${accountFeatureIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
