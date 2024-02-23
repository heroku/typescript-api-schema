import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Key](https://devcenter.heroku.com/articles/platform-api-reference#key)
 * Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
 */
export default class KeyService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Info for existing key.
   *
   * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
   * @param requestInit The initializer for the request.
   */
  public async info(keyIdentity: string, requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Key> {
    const response = await this.fetchImpl(`${this.endpoint}/account/keys/${keyIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Key>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List existing keys.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Key[]> {
    const response = await this.fetchImpl(`${this.endpoint}/account/keys`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Key[]>;
    }
    throw new Error(response.statusText);
  }
}
