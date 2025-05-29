import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Capability](https://devcenter.heroku.com/articles/platform-api-reference#capability)
 * A capability represents a requested capability on a resource along with whether the requesting user has that capability
 */
export default class CapabilityService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Request to check a list of capabilities the current user (yourself). An capability is a tuple of
     * (capability, resource_id, resource_type). The endpoint will then respond with a `capable` boolean
     * true or false for each requested capability. This boolean indicates whether the authenticated user
     * has the requested capability on the resource.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    capabilities(payload: Heroku.CapabilityCapabilitiesPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.CapabilityCapabilitiesResponse>;
}
