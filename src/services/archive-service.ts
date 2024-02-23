import type { APIClient } from '@heroku-cli/command';
/**
 * [Heroku Platform API - Audit Trail Archive](https://devcenter.heroku.com/articles/platform-api-reference#archive)
 * An audit trail archive represents a monthly json zipped file containing events
 */
export default class ArchiveService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Get archive for a single month.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   * @param archiveYear year of the archive
   * @example 2019.
   * @param archiveMonth month of the archive
   * @example 10.
   */
  public async info(
    enterpriseAccountIdentity: string,
    archiveYear: number,
    archiveMonth: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
  ): Promise<void> {
    const response = await this.heroku.get<void>(
      `/enterprise-accounts/${enterpriseAccountIdentity}/archives/${archiveYear}/${archiveMonth}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List existing archives.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account.
   */
  public async list(enterpriseAccountIdentity: string): Promise<void> {
    const response = await this.heroku.get<void>(`/enterprise-accounts/${enterpriseAccountIdentity}/archives`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
