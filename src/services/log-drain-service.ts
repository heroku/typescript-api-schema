import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Drain](https://devcenter.heroku.com/articles/platform-api-reference#log-drain)
 * [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on.
 */
export default class LogDrainService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new log drain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.LogDrainCreatePayload): Promise<Heroku.LogDrain> {
    const response = await this.heroku.post<Heroku.LogDrain>(`/apps/${appIdentity}/log-drains`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Update an add-on owned log drain.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   * @param body Object to send to the endpoint.
   */
  public async update(
    addOnIdentity: string,
    logDrainQueryIdentity: string,
    body: Heroku.LogDrainUpdatePayload
  ): Promise<Heroku.LogDrain> {
    const response = await this.heroku.put<Heroku.LogDrain>(
      `/addons/${addOnIdentity}/log-drains/${logDrainQueryIdentity}`,
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
  /**
   * Delete an existing log drain. Log drains added by add-ons can only be removed by removing the add-on.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   */
  public async delete(appIdentity: string, logDrainQueryIdentity: string): Promise<Heroku.LogDrain> {
    const response = await this.heroku.delete<Heroku.LogDrain>(
      `/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`,
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
   * Info for existing log drain.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param logDrainQueryIdentity unique identifier of this log drain or url associated with the log drain or token associated with the log drain.
   */
  public async info(appIdentity: string, logDrainQueryIdentity: string): Promise<Heroku.LogDrain> {
    const response = await this.heroku.get<Heroku.LogDrain>(
      `/apps/${appIdentity}/log-drains/${logDrainQueryIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing log drains for an add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async listByAddOn(addOnIdentity: string): Promise<Heroku.LogDrain[]> {
    const response = await this.heroku.get<Heroku.LogDrain[]>(`/addons/${addOnIdentity}/log-drains`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing log drains.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.LogDrain[]> {
    const response = await this.heroku.get<Heroku.LogDrain[]>(`/apps/${appIdentity}/log-drains`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
