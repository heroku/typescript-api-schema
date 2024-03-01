import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Outbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#outbound-ruleset)
 * An outbound-ruleset is a collection of rules that specify what hosts Dynos are allowed to communicate with.
 */
export default class OutboundRulesetService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Current outbound ruleset for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async current(spaceIdentity: string): Promise<Heroku.OutboundRuleset> {
    const response = await this.heroku.get<Heroku.OutboundRuleset>(`/spaces/${spaceIdentity}/outbound-ruleset`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info on an existing Outbound Ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param outboundRulesetIdentity unique identifier of an outbound-ruleset.
   */
  public async info(spaceIdentity: string, outboundRulesetIdentity: string): Promise<Heroku.OutboundRuleset> {
    const response = await this.heroku.get<Heroku.OutboundRuleset>(
      `/spaces/${spaceIdentity}/outbound-rulesets/${outboundRulesetIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List all Outbound Rulesets for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async list(spaceIdentity: string): Promise<Heroku.OutboundRuleset[]> {
    const response = await this.heroku.get<Heroku.OutboundRuleset[]>(`/spaces/${spaceIdentity}/outbound-rulesets`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a new outbound ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param body Object to send to the endpoint.
   */
  public async create(spaceIdentity: string, body: Heroku.OutboundRulesetCreatePayload): Promise<void> {
    const response = await this.heroku.put<void>(`/spaces/${spaceIdentity}/outbound-ruleset`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
