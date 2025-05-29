import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AddOnWebhookEventService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookEventIdentity the event's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnIdentity: string,
    appWebhookEventIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookEvent> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addons/${addOnIdentity}/webhook-events/${appWebhookEventIdentity}`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhookEvent>;
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
   * Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async list(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookEvent[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhook-events`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhookEvent[]>;
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
