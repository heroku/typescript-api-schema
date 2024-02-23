import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Key](https://devcenter.heroku.com/articles/platform-api-reference#key)
 * Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations.
 */
export default class KeyService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Info for existing key.
   *
   * @param keyIdentity unique identifier of this key or a unique identifying string based on contents.
   */
  public async info(keyIdentity: string): Promise<Heroku.Key> {
    const response = await this.heroku.get<Heroku.Key>(`/account/keys/${keyIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List existing keys.
   *
   */
  public async list(): Promise<Heroku.Key[]> {
    const response = await this.heroku.get<Heroku.Key[]>(`/account/keys`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
