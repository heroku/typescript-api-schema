import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
export default class AppWebhookDeliveryService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Returns the info for an existing delivery.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookDeliveryIdentity the delivery's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    appIdentity: string,
    appWebhookDeliveryIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookDelivery> {
    const response = await this.fetchImpl(
      `${this.endpoint}/apps/${appIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`,
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
      return (await response.json()) as Promise<Heroku.AppWebhookDelivery>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Lists existing deliveries for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param requestInit The initializer for the request.
   */
  public async list(
    appIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookDelivery[]> {
    const response = await this.fetchImpl(`${this.endpoint}/apps/${appIdentity}/webhook-deliveries`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.AppWebhookDelivery[]>;
    }
    throw new Error(response.statusText);
  }
}
