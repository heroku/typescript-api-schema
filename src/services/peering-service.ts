import type { APIClient } from '@heroku-cli/command';
import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Peering](https://devcenter.heroku.com/articles/platform-api-reference#peering)
 * [Peering](https://devcenter.heroku.com/articles/private-space-peering) provides a way to peer your Private Space VPC to another AWS VPC.
 */
export default class PeeringService {
  public constructor(protected readonly heroku: APIClient) {}

  /**
   * List peering connections of a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   */
  public async list(spaceIdentity: string): Promise<Heroku.Peering[]> {
    const response = await this.heroku.get<Heroku.Peering[]>(`/spaces/${spaceIdentity}/peerings`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
  /**
   * Accept a pending peering connection with a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example pcx-123456789012.
   */
  public async accept(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering> {
    const response = await this.heroku.post<Heroku.Peering>(
      `/spaces/${spaceIdentity}/peerings/${peeringPcxId}/actions/accept`,
      {
        headers: {
          Accept: 'application/vnd.heroku+json; version=3',
          'Content-Type': 'application/json'
        }
      }
    );
    return response.body;
  }
  /**
   * Destroy an active peering connection with a private space.
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example pcx-123456789012.
   */
  public async destroy(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering> {
    const response = await this.heroku.delete<Heroku.Peering>(`/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3',
        'Content-Type': 'application/json'
      }
    });
    return response.body;
  }
  /**
   * Fetch information for existing peering connection
   *
   * @param spaceIdentity unique identifier of space or unique name of space.
   * @param peeringPcxId The AWS VPC Peering Connection ID of the peering.
   * @example pcx-123456789012.
   */
  public async info(spaceIdentity: string, peeringPcxId: string): Promise<Heroku.Peering> {
    const response = await this.heroku.get<Heroku.Peering>(`/spaces/${spaceIdentity}/peerings/${peeringPcxId}`, {
      headers: {
        Accept: 'application/vnd.heroku+json; version=3'
      }
    });
    return response.body;
  }
}
