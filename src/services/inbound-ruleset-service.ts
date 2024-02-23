import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Inbound Ruleset](https://devcenter.heroku.com/articles/platform-api-reference#inbound-ruleset)
 * An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application.
 */
export default class InboundRulesetService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Current inbound ruleset for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async current(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.InboundRuleset> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-ruleset`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InboundRuleset>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Info on an existing Inbound Ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param inboundRulesetIdentity unique identifier of an inbound-ruleset.
   * @param requestInit The initializer for the request.
   */
  public async info(
    spaceIdentity: string,
    inboundRulesetIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.InboundRuleset> {
    const response = await this.fetchImpl(
      `${this.endpoint}/spaces/${spaceIdentity}/inbound-rulesets/${inboundRulesetIdentity}`,
      {
        ...requestInit,

        method: 'GET',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InboundRuleset>;
    }
    throw new Error(response.statusText);
  }
  /**
   * List all inbound rulesets for a space
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param requestInit The initializer for the request.
   */
  public async list(
    spaceIdentity: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.InboundRuleset[]> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-rulesets`, {
      ...requestInit,

      method: 'GET',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InboundRuleset[]>;
    }
    throw new Error(response.statusText);
  }
  /**
   * Create a new inbound ruleset
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    spaceIdentity: string,
    payload: Heroku.InboundRulesetCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.InboundRuleset> {
    const response = await this.fetchImpl(`${this.endpoint}/spaces/${spaceIdentity}/inbound-ruleset`, {
      ...requestInit,
      body: JSON.stringify(payload, null, 2),
      method: 'PUT',
      headers: {
        ...requestInit?.headers,
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.InboundRuleset>;
    }
    throw new Error(response.statusText);
  }
}
