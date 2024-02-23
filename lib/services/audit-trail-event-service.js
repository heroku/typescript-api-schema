/**
 Heroku Platform API - Audit Trail Event
An audit trail event represents some action on the platform

*/
export default class AuditTrailEventService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List existing events. Returns all events for one day, defaulting to current day. Order, actor, action, and type, and day query params can be specified as query parameters. For example, '/enterprise-accounts/:id/events?order=desc&actor=user@example.com&action=create&type=app&day=2020-09-30' would return events in descending order and only return app created events by the user with user@example.com email address.
 *
 * @param enterpriseAccountIdentity unique identifier of the enterprise account.
 */
    async list(enterpriseAccountIdentity) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}/events`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
