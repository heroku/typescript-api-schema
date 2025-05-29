import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Certificates](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-certificate)
 * Certificates represent an sso cert attached to an Identity Provider
 */
export default class IdentityProviderCertificateService {
  public constructor(
    protected readonly fetchImpl: typeof fetch,
    protected readonly endpoint: string
  ) {}

  /**
   * Destroy a Certificate
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param requestInit The initializer for the request.
   */
  public async delete(
    identityProviderIdentity: string,
    identityProviderIdentity1: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProviderCertificate> {
    const response = await this.fetchImpl(
      `${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`,
      {
        ...requestInit,

        method: 'DELETE',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProviderCertificate>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Create a Certificate
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async create(
    identityProviderIdentity: string,
    payload: Heroku.IdentityProviderCertificateCreatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProviderCertificate> {
    const response = await this.fetchImpl(
      `${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'POST',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProviderCertificate>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Update a Certificate
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param payload Object to send to the endpoint.
   * @param requestInit The initializer for the request.
   */
  public async update(
    identityProviderIdentity: string,
    identityProviderIdentity1: string,
    payload: Heroku.IdentityProviderCertificateUpdatePayload,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProviderCertificate> {
    const response = await this.fetchImpl(
      `${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`,
      {
        ...requestInit,
        body: JSON.stringify(payload, null, 2),
        method: 'PATCH',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProviderCertificate>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
  /**
   * Get a Certificate
   *
   * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
   * @param requestInit The initializer for the request.
   */
  public async info(
    identityProviderIdentity: string,
    identityProviderIdentity1: string,
    requestInit: Omit<RequestInit, 'body' | 'method'> = {}
  ): Promise<Heroku.IdentityProviderCertificate> {
    const response = await this.fetchImpl(
      `${this.endpoint}/identity-providers/${identityProviderIdentity}/certificates/${identityProviderIdentity1}`,
      {
        ...requestInit,

        method: 'Get',
        headers: {
          ...requestInit?.headers,
          Accept: 'application/vnd.heroku+json; version=3.sdk',
          'Content-Type': 'application/json'
        }
      }
    );
    if (response.ok) {
      return (await response.json()) as Promise<Heroku.IdentityProviderCertificate>;
    }
    let message = response.statusText;
    try {
      ({ message } = (await response.json()) as { message: string });
    } catch (error) {
      // no-op
    }
    throw new Error(`${response.status}: ${message}`, { cause: response });
  }
}
