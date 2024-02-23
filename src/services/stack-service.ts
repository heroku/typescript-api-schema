import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Stack](https://devcenter.heroku.com/articles/platform-api-reference#stack)
 * Stacks are the different application execution environments available in the Heroku platform.
 */
export default class StackService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Stack info.
   *
   * @param stackIdentity unique name of stack or unique identifier of stack.
   */
  public async info(stackIdentity: string): Promise<Heroku.Stack> {
    const response = await this.heroku.get<Heroku.Stack>(`/stacks/${stackIdentity}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * List available stacks.
   *
   */
  public async list(): Promise<Heroku.Stack[]> {
    const response = await this.heroku.get<Heroku.Stack[]>(`/stacks`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
