/**
 * [Heroku Platform API - Audit Trail Archive](https://devcenter.heroku.com/articles/platform-api-reference#archive)
 * An audit trail archive represents a monthly json zipped file containing events
 */
export default class ArchiveService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

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
  public async info(
    enterpriseAccountIdentity: string,
    archiveYear: number,
    archiveMonth: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12',
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}/archives/${archiveYear}/${archiveMonth}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
  }
  /**
   * List existing archives.
   *
   * @param enterpriseAccountIdentity unique identifier of the enterprise account or unique name of the enterprise account.
   * @param requestInit The initializer for the request.
   */
  public async list(
    enterpriseAccountIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<void> {
    await this.fetchImpl(`/enterprise-accounts/${enterpriseAccountIdentity}/archives`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3.sdk'
      }
    });
  }
}
