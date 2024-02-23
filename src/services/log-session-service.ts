import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Log Session](https://devcenter.heroku.com/articles/platform-api-reference#log-session)
 * A log session is a reference to the http based log stream for an app.
 */
export default class LogSessionService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Create a new log session.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    appIdentity: string,
    payload: Heroku.LogSessionCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.LogSession> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/log-sessions`, {
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
      return (await response.json()) as Promise<Heroku.LogSession>;
    }
    throw new Error(response.statusText);
  }
}
