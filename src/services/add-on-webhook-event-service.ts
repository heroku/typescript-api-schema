import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AddOnWebhookEventService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookEventIdentity the event's unique identifier.
   */
  public async info(addOnIdentity: string, appWebhookEventIdentity: string): Promise<Heroku.AppWebhookEvent> {
    const response = await this.heroku.get<Heroku.AppWebhookEvent>(
      `/addons/${addOnIdentity}/webhook-events/${appWebhookEventIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async list(addOnIdentity: string): Promise<Heroku.AppWebhookEvent[]> {
    const response = await this.heroku.get<Heroku.AppWebhookEvent[]>(`/addons/${addOnIdentity}/webhook-events`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
