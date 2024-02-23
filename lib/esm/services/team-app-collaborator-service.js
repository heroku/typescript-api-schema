/**
 * [Heroku Platform API - Team App Collaborator](https://devcenter.heroku.com/articles/platform-api-reference#team-app-collaborator)
 * A team collaborator represents an account that has been given access to a team app on Heroku.
 */
export default class TeamAppCollaboratorService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team.
     *
     * @param appIdentity unique identifier of app or unique name of app.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async create(appIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${appIdentity}/collaborators`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'POST',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Delete an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param requestInit The initializer for the request.
     */
    async delete(teamAppIdentity, teamAppCollaboratorIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            ...requestInit,
            method: 'DELETE',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Info for a collaborator on a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param requestInit The initializer for the request.
     */
    async info(teamAppIdentity, teamAppCollaboratorIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * Update an existing collaborator from a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param teamAppCollaboratorIdentity invited email address of collaborator.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    async update(teamAppIdentity, teamAppCollaboratorIdentity, payload, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}/collaborators/${teamAppCollaboratorIdentity}`, {
            ...requestInit,
            body: JSON.stringify(payload, null, 2),
            method: 'PATCH',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
    /**
     * List collaborators on a team app.
     *
     * @param teamAppIdentity unique name of app
     * @example "example".
     * @param requestInit The initializer for the request.
     */
    async list(teamAppIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`${this.endpoint}/teams/apps/${teamAppIdentity}/collaborators`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        if (response.ok) {
            return (await response.json());
        }
        throw new Error(response.statusText);
    }
}
