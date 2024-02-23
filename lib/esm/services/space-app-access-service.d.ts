import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Space Access](https://devcenter.heroku.com/articles/platform-api-reference#space-app-access)
 * Space access represents the permissions a particular user has on a particular space.
 */
export default class SpaceAppAccessService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * List permissions for a given user on a given space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param requestInit The initializer for the request.
     */
    info(spaceIdentity: string, accountIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SpaceAppAccess>;
    /**
     * Update an existing user's set of permissions on a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(spaceIdentity: string, accountIdentity: string, payload: Heroku.SpaceAppAccessUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SpaceAppAccess>;
    /**
     * List all users and their permissions on a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    list(spaceIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.SpaceAppAccess[]>;
}
