/**
 Heroku Platform API - Space Topology
Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery.

*/
export default class SpaceTopologyService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Current space topology
 *
 * @param spaceIdentity unique identifier of space or unique name of space.
 */
    async topology(spaceIdentity) {
        const response = await this.heroku.get(`/spaces/${spaceIdentity}/topology`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
