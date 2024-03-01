import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Inbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#inbound-ruleset)
 * An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
 */
export default class InboundRulesetService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * Current inbound ruleset for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async current(spaceIdentity: string): Promise<Heroku.InboundRuleset> {
    const response = await this.heroku.get<Heroku.InboundRuleset>(`/spaces/${spaceIdentity}/inbound-ruleset`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Info on an existing Inbound Ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
   */
  public async info(spaceIdentity: string, inboundRulesetIdentity: string): Promise<Heroku.InboundRuleset> {
    const response = await this.heroku.get<Heroku.InboundRuleset>(
      `/spaces/${spaceIdentity}/inbound-rulesets/${inboundRulesetIdentity}`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    return response.body;
  }
  /**
   * List all inbound rulesets for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async list(spaceIdentity: string): Promise<Heroku.InboundRuleset[]> {
    const response = await this.heroku.get<Heroku.InboundRuleset[]>(`/spaces/${spaceIdentity}/inbound-rulesets`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Create a new inbound ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param body Object to send to the endpoint.
   */
  public async create(spaceIdentity: string, body: Heroku.InboundRulesetCreatePayload): Promise<void> {
    const response = await this.heroku.put<void>(`/spaces/${spaceIdentity}/inbound-ruleset`, {
      body,
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
}
