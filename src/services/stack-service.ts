import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Stack](https://devcenter.heroku.com/articles/platform-api-reference#stack)
 * Stacks are the different application execution environments available in the Heroku platform.
 */
export default class StackService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Stack info.
   *
   * @param stackIdentity unique name of stack or unique identifier of stack.
   * @param requestInit The initializer for the request.
   */
  public async info(
    stackIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.Stack> {
    const response = await this.fetchImpl(`${this.endpoint}/stacks/${stackIdentity}`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Stack>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List available stacks.
   *
   * @param requestInit The initializer for the request.
   */
  public async list(requestInit: Omit<RequestInit, 'body' | 'method'> = {}): Promise<Heroku.Stack[]> {
    const response = await this.fetchImpl(`${this.endpoint}/stacks`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.Stack[]>;
    }
    throw new Error(response.statusText);
  }
}
