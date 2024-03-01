import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Inbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#inbound-ruleset)
* An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
*/
export default class InboundRulesetService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Current inbound ruleset for a space
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    current(spaceIdentity: string): Promise<Heroku.InboundRuleset>;
    /**
     * Info on an existing Inbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
     */
    info(spaceIdentity: string, inboundRulesetIdentity: string): Promise<Heroku.InboundRuleset>;
    /**
     * List all inbound rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    list(spaceIdentity: string): Promise<Heroku.InboundRuleset[]>;
    /**
     * Create a new inbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param body Object to send to the endpoint.
     */
    create(spaceIdentity: string, body: Heroku.InboundRulesetCreatePayload): Promise<void>;
}
