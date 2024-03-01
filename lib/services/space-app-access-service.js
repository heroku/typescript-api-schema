/**
 Heroku Platform API - Space Access
Space access represents the permissions a particular user has on a particular space.

*/
export default class SpaceAppAccessService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * List permissions for a given user on a given space.
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
 */
    async info(spaceIdentity, accountIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/members/${accountIdentity}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * Update an existing user's set of permissions on a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param accountIdentity unique email address of account or unique identifier of an account or Implicit reference to currently authorized user.
     * @param body Object to send to the endpoint.
     */
    async update(spaceIdentity, accountIdentity, body) {
        const response = await this.heroku.patch(`/spaces/${spaceIdentity}/members/${accountIdentity}`, {
            body,
            headers: {
                Accept: 'application/vnd.heroku+json; version=3',
                'Content-Type': 'application/json'
            }
        });
        return response.body;
    }
    /**
     * List all users and their permissions on a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     */
    async list(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/members`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
