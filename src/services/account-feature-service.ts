import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Account Feature](https://devcenter.heroku.com/articles/platform-api-reference#account-feature)
 * An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku.
 */
export default class AccountFeatureService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for an existing account feature.
   *
   * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
   * @param requestInit The initializer for the request.
   */
  public async info(
    accountFeatureIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AccountFeature> {
    const response = await this.fetchImpl(`${this.endpoint}/account/features/${accountFeatureIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AccountFeature>;
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
   * List existing account features.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.AccountFeature[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/features`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AccountFeature[]>;
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
   * Update an existing account feature.
   *
   * @param accountFeatureIdentity unique identifier of account feature or unique name of account feature.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    accountFeatureIdentity: string,
    payload: Heroku.AccountFeatureUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AccountFeature> {
    const response = await this.fetchImpl(`${this.endpoint}/account/features/${accountFeatureIdentity}`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PATCH',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AccountFeature>;
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
