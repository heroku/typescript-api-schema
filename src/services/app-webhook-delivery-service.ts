import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Delivery](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-delivery)
 * Represents the delivery of a webhook notification, including its current status.
 */
export default class AppWebhookDeliveryService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Returns the info for an existing delivery.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookDeliveryIdentity the delivery's unique identifier.
   */
  public async info(appIdentity: string, appWebhookDeliveryIdentity: string): Promise<Heroku.AppWebhookDelivery> {
    const response = await this.heroku.get<Heroku.AppWebhookDelivery>(
      `/apps/${appIdentity}/webhook-deliveries/${appWebhookDeliveryIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Lists existing deliveries for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.AppWebhookDelivery[]> {
    const response = await this.heroku.get<Heroku.AppWebhookDelivery[]>(`/apps/${appIdentity}/webhook-deliveries`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
