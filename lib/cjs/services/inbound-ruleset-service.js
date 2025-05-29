"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * [Heroku Platform API - Inbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#inbound-ruleset)
 * An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
 */
class InboundRulesetService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Current inbound ruleset for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async current(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-ruleset`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Info on an existing Inbound Ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
     * @param requestInit The initializer for the request.
     */
    async info(spaceIdentity, inboundRulesetIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-rulesets/${inboundRulesetIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * List all inbound rulesets for a space
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async list(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-rulesets`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
    /**
     * Create a new inbound ruleset
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(spaceIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-ruleset`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PUT',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3.sdk',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        let message = response.statusText;
        try {
            ({ message } = (await response.json()));
        }
        catch (error) {
            // no-op
        }
        throw new Error(`${response.status}: ${message}`, { cause: response });
    }
}
exports.default = InboundRulesetService;
