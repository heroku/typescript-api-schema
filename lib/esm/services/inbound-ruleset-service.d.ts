import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Inbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#inbound-ruleset)
 * An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
 */
export default class InboundRulesetService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Current inbound ruleset for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    current(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InboundRuleset>;
    /**
     * Info on an existing Inbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, inboundRulesetIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InboundRuleset>;
    /**
     * List all inbound rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    list(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InboundRuleset[]>;
    /**
     * Create a new inbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(spaceIdentity: string, payload: Heroku.InboundRulesetCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.InboundRuleset>;
}
