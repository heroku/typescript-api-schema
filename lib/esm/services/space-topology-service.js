/**
 * [Heroku Platform API - Space Topology](https://devcenter.heroku.com/articles/platform-api-reference#space-topology)
 * Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery.
 */
export default class SpaceTopologyService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Current space topology
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async topology(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/spaces/${spaceIdentity}/topology`, {
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