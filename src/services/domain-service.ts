import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Domain](https://devcenter.heroku.com/articles/platform-api-reference#domain)
 * Domains define what web routes should be routed to an app on Heroku.
 */
export default class DomainService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new domain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.DomainCreatePayload): Promise<Heroku.Domain> {
    const response = await this.heroku.post<Heroku.Domain>(`/apps/${appIdentity}/domains`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Associate an SNI endpoint
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    domainIdentity: string,
    body: Heroku.DomainUpdatePayload
  ): Promise<Heroku.Domain> {
    const response = await this.heroku.patch<Heroku.Domain>(`/apps/${appIdentity}/domains/${domainIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Delete an existing domain
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   */
  public async delete(appIdentity: string, domainIdentity: string): Promise<Heroku.Domain> {
    const response = await this.heroku.delete<Heroku.Domain>(`/apps/${appIdentity}/domains/${domainIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Info for existing domain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param domainIdentity unique identifier of this domain or full hostname.
   */
  public async info(appIdentity: string, domainIdentity: string): Promise<Heroku.Domain> {
    const response = await this.heroku.get<Heroku.Domain>(`/apps/${appIdentity}/domains/${domainIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing domains.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Domain[]> {
    const response = await this.heroku.get<Heroku.Domain[]>(`/apps/${appIdentity}/domains`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
