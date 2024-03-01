import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - App Webhook Event](https://devcenter.heroku.com/articles/platform-api-reference#app-webhook-event)
 * Represents a webhook event that occurred.
 */
export default class AppWebhookEventService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Returns the info for a specified webhook event.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   * @param appWebhookEventIdentity the event's unique identifier.
   */
  public async info(appIdentity: string, appWebhookEventIdentity: string): Promise<Heroku.AppWebhookEvent> {
    const response = await this.heroku.get<Heroku.AppWebhookEvent>(
      `/apps/${appIdentity}/webhook-events/${appWebhookEventIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * Lists existing webhook events for an app.
   *
   * @param appIdentity unique identifier of app or unique name of app.
   */
  public async list(appIdentity: string): Promise<Heroku.AppWebhookEvent[]> {
    const response = await this.heroku.get<Heroku.AppWebhookEvent[]>(`/apps/${appIdentity}/webhook-events`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
