/**
 Heroku Platform API - Outbound Ruleset
An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with.

*/
export default class OutboundRulesetService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Current outbound ruleset for a space
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async current(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/outbound-ruleset`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Info on an existing Outbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param outboundRulesetIdentity unique identifier of an outbound-ruleset.
     */
    async info(spaceIdentity, outboundRulesetIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/outbound-rulesets/${outboundRulesetIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List all Outbound Rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async list(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/outbound-rulesets`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Create a new outbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    async create(spaceIdentity, body) {
        const response = await this.heroku.put(`/spaces/${spaceIdentity}/outbound-ruleset`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
}
