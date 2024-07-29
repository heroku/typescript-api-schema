/**
 * [Heroku Platform API - Space Network Address Translation](https://devcenter.heroku.com/articles/platform-api-reference#space-nat)
 * Network address translation (NAT) for stable outbound IP addresses from a space
 */
export default class SpaceNatService {
    fetchImpl;
    constructor(fetchImpl) {
        this.fetchImpl = fetchImpl;
    }
    /**
     * Current state of network address translation for a space.
     *
     * @param spaceIdentity unique identifier of space or unique name of space.
     * @param requestInit The initializer for the request.
     */
    async info(spaceIdentity, requestInit = {}) {
        const response = await this.fetchImpl(`/spaces/${spaceIdentity}/nat`, {
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