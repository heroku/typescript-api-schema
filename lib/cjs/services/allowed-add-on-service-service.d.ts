import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Allowed Add-on Service](https://devcenter.heroku.com/articles/platform-api-reference#allowed-add-on-service)
 * Entities that have been allowed to be used by a Team
 */
export default class AllowedAddOnServiceService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List all allowed add-on services for a team
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listByTeam(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AllowedAddOnService[]>;
    /**
     * Allow an Add-on Service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    createByTeam(teamIdentity: string, payload: Heroku.AllowedAddOnServiceCreateByTeamPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AllowedAddOnService[]>;
    /**
     * Remove an allowed add-on service
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param allowedAddOnServiceIdentity unique identifier for this allowed add-on service record or unique name of this add-on-service.
     * @param requestInit The initializer for the request.
     */
    deleteByTeam(teamIdentity: string, allowedAddOnServiceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.AllowedAddOnService>;
}
