import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Dyno](https://devcenter.heroku.com/articles/platform-api-reference#dyno)
 * Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types).
 */
export default class DynoService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.DynoCreatePayload): Promise<Heroku.Dyno> {
    const response = await this.heroku.post<Heroku.Dyno>(`/apps/${appIdentity}/dynos`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Restart dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   */
  public async restart(appIdentity: string, dynoIdentity: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.delete<Record<string, unknown>>(`/apps/${appIdentity}/dynos/${dynoIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Restart all dynos.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async restartAll(appIdentity: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.delete<Record<string, unknown>>(`/apps/${appIdentity}/dynos`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Stop dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   */
  public async stop(appIdentity: string, dynoIdentity: string): Promise<Record<string, unknown>> {
    const response = await this.heroku.post<Record<string, unknown>>(
      `/apps/${appIdentity}/dynos/${dynoIdentity}/actions/stop`,
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
   * Info for existing dyno.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param dynoIdentity unique identifier of this dyno or the name of this process on this dyno.
   */
  public async info(appIdentity: string, dynoIdentity: string): Promise<Heroku.Dyno> {
    const response = await this.heroku.get<Heroku.Dyno>(`/apps/${appIdentity}/dynos/${dynoIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing dynos.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.Dyno[]> {
    const response = await this.heroku.get<Heroku.Dyno[]>(`/apps/${appIdentity}/dynos`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
