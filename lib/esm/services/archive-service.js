/**
 * [Heroku Platform API - Audit Trail Archive](https://devcenter.heroku.com/articles/platform-api-reference#archive)
 * An audit trail archive represents a monthly json zipped file containing events
 */
export default class ArchiveService {
    fetchImpl;
    endpoint;
    constructor(fetchImpl, endpoint) {
        this.fetchImpl = fetchImpl;
        this.endpoint = endpoint;
    }
    /**
     * Get archive for a single month.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param archiveYear year of the archive
     * @example 2019.
     * @param archiveMonth month of the archive
     * @example "10".
     * @param requestInit The initializer for the request.
     */
    async info(enterpriseAccountIdentity, archiveYear, archiveMonth, requestInit = {}) {
        await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}/archives/${archiveYear}/${archiveMonth}`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
    }
    /**
     * List existing archives.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
     * @param requestInit The initializer for the request.
     */
    async list(enterpriseAccountIdentity, requestInit = {}) {
        await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}/archives`, {
            ...requestInit,
            method: 'GET',
            headers: {
                ...requestInit?.headers,
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
    }
}
