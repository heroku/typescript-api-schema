import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Session](https://devcenter.heroku.com/articles/platform-api-reference#log-session)
 * A log session is a reference to the http based log stream for an app.
 */
export default class LogSessionService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create a new log session.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.LogSessionCreatePayload): Promise<Heroku.LogSession> {
    const response = await this.heroku.post<Heroku.LogSession>(`/apps/${appIdentity}/log-sessions`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
