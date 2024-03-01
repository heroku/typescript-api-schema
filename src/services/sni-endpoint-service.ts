import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - SNI Endpoint](https://devcenter.heroku.com/articles/platform-api-reference#sni-endpoint)
 * SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app.
 */
export default class SniEndpointService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.SniEndpointCreatePayload): Promise<Heroku.SniEndpoint> {
    const response = await this.heroku.post<Heroku.SniEndpoint>(`/apps/${appIdentity}/sni-endpoints`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   */
  public async delete(appIdentity: string, sniEndpointIdentity: string): Promise<Heroku.SniEndpoint> {
    const response = await this.heroku.delete<Heroku.SniEndpoint>(
      `/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Info for existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   */
  public async info(appIdentity: string, sniEndpointIdentity: string): Promise<Heroku.SniEndpoint> {
    const response = await this.heroku.get<Heroku.SniEndpoint>(
      `/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing SNI endpoints.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.SniEndpoint[]> {
    const response = await this.heroku.get<Heroku.SniEndpoint[]>(`/apps/${appIdentity}/sni-endpoints`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Update an existing SNI endpoint.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param sniEndpointIdentity unique identifier of this SNI endpoint or unique name for SNI endpoint.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    sniEndpointIdentity: string,
    body: Heroku.SniEndpointUpdatePayload
  ): Promise<Heroku.SniEndpoint> {
    const response = await this.heroku.patch<Heroku.SniEndpoint>(
      `/apps/${appIdentity}/sni-endpoints/${sniEndpointIdentity}`,
      {
        body,
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
}
