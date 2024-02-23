import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Audit Trail Archive](https://devcenter.heroku.com/articles/platform-api-reference#archive)
* An audit trail archive represents a monthly json zipped file containing events
*/
export default class ArchiveService {
    protected readonly heroku: APIClient;
    constructor(heroku: APIClient);
    /**
 * Get archive for a single month.
 *
 * @param enterpriseAccountIdentity unique identifier of the enterprise account.
 * @param archiveYear year of the archive
 * @example 2019.
 * @param archiveMonth month of the archive
 * @example 10.
 */
    info(enterpriseAccountIdentity: string, archiveYear: number, archiveMonth: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'): Promise<void>;
    /**
     * List existing archives.
     *
     * @param enterpriseAccountIdentity unique identifier of the enterprise account.
     */
    list(enterpriseAccountIdentity: string): Promise<void>;
}
