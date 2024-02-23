import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
export default class AddOnWebhookDeliveryService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookDeliveryIdentity the delivery's unique identifier.
   * @param requestInit The initializer for the request.
   */
  public async info(
    addOnIdentity: string,
    appWebhookDeliveryIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookDelivery> {
    const response = await this.fetchImpl(
      `${this.endpoint}/addons/${addOnIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`,
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
   * Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param requestInit The initializer for the request.
   */
  public async list(
    addOnIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.AppWebhookDelivery[]> {
    const response = await this.fetchImpl(`${this.endpoint}/addons/${addOnIdentity}/webhook-deliveries`, {
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
