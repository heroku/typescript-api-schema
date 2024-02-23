import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SNI Endpoint](https://devcenter.heroku.com/articles/platform-api-reference#sni-endpoint)
 * SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
 */
export default class SniEndpointService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.SniEndpointCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SniEndpoint> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints`, {
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
      return (await response.json()) as Promise<Heroku.SniEndpoint>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Delete existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    appIdentity: string,
    sniEndpointIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SniEndpoint> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
      ...requestInit,

      method: 'DELETE',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SniEndpoint>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info for existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    sniEndpointIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SniEndpoint> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SniEndpoint>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing SNI endpoints.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SniEndpoint[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.SniEndpoint[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Update an existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    appIdentity: string,
    sniEndpointIdentity: string,
    payload: Heroku.SniEndpointUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.SniEndpoint> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`, {
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
      return (await response.json()) as Promise<Heroku.SniEndpoint>;
    }
    throw new Error(response.statusText);
  }
}
