import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Domain](https://devcenter.heroku.com/articles/platform-api-reference#domain)
 * Domains define what web routes should be routed to an app on Heroku.
 */
export default class DomainService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new domain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.DomainCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Domain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/domains`, {
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
      return (await response.json()) as Promise<Heroku.Domain>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Associate an SNI endpoint
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    domainIdentity: string,
    payload: Heroku.DomainUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Domain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/domains/${domainIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.Domain>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete an existing domain
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    domainIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Domain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/domains/${domainIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Domain>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing domain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    domainIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Domain> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/domains/${domainIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Domain>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing domains.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Domain[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/domains`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Domain[]>;
    }
    throw new Error(response.statusText);
  }
}
