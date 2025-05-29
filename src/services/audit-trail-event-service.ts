/**
 * [Heroku Platform API - Audit Trail Event](https://devcenter.heroku.com/articles/platform-api-reference#audit-trail-event)
 * An audit trail event represents some action on the platform
 */
export default class AuditTrailEventService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * List existing events. Returns all events for one day, defaulting to current day. Order, actor, action, and type, and day query params can be specified as query parameters. For example, '/enterprise-accounts/:id/events?order=desc&actor=user@example.com&action=create&type=app&day=2020-09-30' would return events in descending order and only return app created events by the user with user@example.com email address.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param requestInit The initializer for the request.
   */
  public async list(
    enterpriseAccountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}/events`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
  }
}
