/**
 Heroku Platform API - Audit Trail Archive
An audit trail archive represents a monthly json zipped file containing events

*/
export default class ArchiveService {
    heroku;
    constructor(heroku) {
        this.heroku = heroku;
    }
    /**
 * Get archive for a single month.
 *
 * @param enterpriseAccountIdentity unique identifier of the enterprise account.
 * @param archiveYear year of the archive.
 * @param archiveMonth month of the archive.
 */
    async info(enterpriseAccountIdentity, archiveYear, archiveMonth) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}/archives/${archiveYear}/${archiveMonth}`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
    /**
     * List existing archives.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    async list(enterpriseAccountIdentity) {
        const response = await this.heroku.get(`/enterprise-accounts/${enterpriseAccountIdentity}/archives`, {
            headers: {
                Accept: 'application/vnd.heroku+json; version=3'
            }
        });
        return response.body;
    }
}
