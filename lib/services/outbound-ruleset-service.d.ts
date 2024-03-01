import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Outbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#outbound-ruleset)
* An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with.
*/
export default class OutboundRulesetService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Current outbound ruleset for a space
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    current(spaceIdentity: string): Promise<Heroku.OutboundRuleset>;
    /**
     * Info on an existing Outbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param outboundRulesetIdentity unique identifier of an outbound-ruleset.
     */
    info(spaceIdentity: string, outboundRulesetIdentity: string): Promise<Heroku.OutboundRuleset>;
    /**
     * List all Outbound Rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    list(spaceIdentity: string): Promise<Heroku.OutboundRuleset[]>;
    /**
     * Create a new outbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    create(spaceIdentity: string, body: Heroku.OutboundRulesetCreatePayload): Promise<void>;
}
