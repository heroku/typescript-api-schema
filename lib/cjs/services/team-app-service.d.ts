import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Team App](https://devcenter.heroku.com/articles/platform-api-reference#team-app)
 * A team app encapsulates the team specific functionality of Heroku apps.
 */
export default class TeamAppService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set.
     *
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(payload: Heroku.TeamAppCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp>;
    /**
     * Info for a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    info(teamAppIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp>;
    /**
     * Lock or unlock a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    updateLocked(teamAppIdentity: string, payload: Heroku.TeamAppUpdateLockedPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp>;
    /**
     * Transfer an existing team app to another Heroku account.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    transferToAccount(teamAppIdentity: string, payload: Heroku.TeamAppTransferToAccountPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<void>;
    /**
     * Transfer an existing team app to another team.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    transferToTeam(teamAppIdentity: string, payload: Heroku.TeamAppTransferToTeamPayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp>;
    /**
     * List team apps.
     *
     * @param teamIdentity unique name of team or unique identifier of team.
     * @param requestInit The initializer for the request.
     */
    listByTeam(teamIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.TeamApp[]>;
}
