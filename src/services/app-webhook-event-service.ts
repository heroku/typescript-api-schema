import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AppWebhookEventService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Returns the info for a specified webhook event.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookEventIdentity the event's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    appWebhookEventIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookEvent> {
    const response = await this.fetchImpl(
      `${this.endpoint}/apps/${appIdentity}/webhook-events/${appWebhookEventIdentity}`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhookEvent>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Lists existing webhook events for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookEvent[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhook-events`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhookEvent[]>;
    }
    throw new Error(response.statusText);
  }
}
