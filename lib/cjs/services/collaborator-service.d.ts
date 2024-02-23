import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#collaborator)
 * A collaborator represents an account that has been given access to an app on Heroku.
 */
export default class CollaboratorService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Create a new collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(appIdentity: string, payload: Heroku.CollaboratorCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Collaborator>;
    /**
     * Delete an existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     * @param requestInit The initializer for the request.
     */
    delete(appIdentity: string, collaboratorIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Collaborator>;
    /**
     * Info for existing collaborator.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param collaboratorIdentity invited email address of collaborator or unique identifier of collaborator.
     * @param requestInit The initializer for the request.
     */
    info(appIdentity: string, collaboratorIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Collaborator>;
    /**
     * List existing collaborators.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param requestInit The initializer for the request.
     */
    list(appIdentity: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.Collaborator[]>;
}
