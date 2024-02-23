import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Add-on Webhook](https://devcenter.heroku.com/articles/platform-api-reference#add-on-webhook)
 * Represents the details of a webhook subscription
 */
export default class AddOnWebhookService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param body Object to send to the endpoint.
   */
  public async create(addOnIdentity: string, body: Heroku.AddOnWebhookCreatePayload): Promise<Heroku.AddonWebhook> {
    const response = await this.heroku.post<Heroku.AddonWebhook>(`/addons/${addOnIdentity}/webhooks`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   */
  public async delete(addOnIdentity: string, appWebhookIdentity: string): Promise<Heroku.AddonWebhook> {
    const response = await this.heroku.delete<Heroku.AddonWebhook>(
      `/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`,
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
   * Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   */
  public async info(addOnIdentity: string, appWebhookIdentity: string): Promise<Heroku.AddonWebhook> {
    const response = await this.heroku.get<Heroku.AddonWebhook>(
      `/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   */
  public async list(addOnIdentity: string): Promise<Heroku.AddonWebhook[]> {
    const response = await this.heroku.get<Heroku.AddonWebhook[]>(`/addons/${addOnIdentity}/webhooks`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on.
   *
   * @param addOnIdentity unique identifier of add-on or globally unique name of the add-on.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param body Object to send to the endpoint.
   */
  public async update(
    addOnIdentity: string,
    appWebhookIdentity: string,
    body: Heroku.AddOnWebhookUpdatePayload
  ): Promise<Heroku.AddonWebhook> {
    const response = await this.heroku.patch<Heroku.AddonWebhook>(
      `/addons/${addOnIdentity}/webhooks/${appWebhookIdentity}`,
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
}
