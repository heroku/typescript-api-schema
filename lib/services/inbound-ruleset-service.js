/**
 Heroku Platform API - Inbound Ruleset
An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.

*/
export default class InboundRulesetService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Current inbound ruleset for a space
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async current(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/inbound-ruleset`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info on an existing Inbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
     */
    async info(spaceIdentity, inboundRulesetIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/inbound-rulesets/${inboundRulesetIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List all inbound rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async list(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/inbound-rulesets`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a new inbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    async create(spaceIdentity, body) {
        const response = await this.heroku.put(`/spaces/${spaceIdentity}/inbound-ruleset`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
