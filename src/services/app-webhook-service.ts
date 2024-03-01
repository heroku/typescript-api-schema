import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook)
 * Represents the details of a webhook subscription
 */
export default class AppWebhookService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Create an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param body Object to send to the endpoint.
   */
  public async create(appIdentity: string, body: Heroku.AppWebhookCreatePayload): Promise<Heroku.AppWebhook> {
    const response = await this.heroku.post<Heroku.AppWebhook>(`/apps/${appIdentity}/webhooks`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Removes an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   */
  public async delete(appIdentity: string, appWebhookIdentity: string): Promise<Heroku.AppWebhook> {
    const response = await this.heroku.delete<Heroku.AppWebhook>(
      `/apps/${appIdentity}/webhooks/${appWebhookIdentity}`,
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
   * Returns the info for an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   */
  public async info(appIdentity: string, appWebhookIdentity: string): Promise<Heroku.AppWebhook> {
    const response = await this.heroku.get<Heroku.AppWebhook>(`/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List all webhook subscriptions for a particular app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.AppWebhook[]> {
    const response = await this.heroku.get<Heroku.AppWebhook[]>(`/apps/${appIdentity}/webhooks`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Updates the details of an app webhook subscription.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookIdentity the webhook's unique identifier.
   * @param body Object to send to the endpoint.
   */
  public async update(
    appIdentity: string,
    appWebhookIdentity: string,
    body: Heroku.AppWebhookUpdatePayload
  ): Promise<Heroku.AppWebhook> {
    const response = await this.heroku.patch<Heroku.AppWebhook>(`/apps/${appIdentity}/webhooks/${appWebhookIdentity}`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
