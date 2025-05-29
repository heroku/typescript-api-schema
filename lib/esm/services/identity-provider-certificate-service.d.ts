import * as Heroku from '@heroku-cli/schema';
/**
 * [Heroku Platform API - Certificates](https://devcenter.heroku.com/articles/platform-api-reference#identity-provider-certificate)
 * Certificates represent an sso cert attached to an Identity Provider
 */
export default class IdentityProviderCertificateService {
    protected readonly fetchImpl: typeof fetch;
    protected readonly endpoint: string;
    constructor(fetchImpl: typeof fetch, endpoint: string);
    /**
     * Destroy a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    delete(identityProviderIdentity: string, identityProviderIdentity1: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProviderCertificate>;
    /**
     * Create a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    create(identityProviderIdentity: string, payload: Heroku.IdentityProviderCertificateCreatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProviderCertificate>;
    /**
     * Update a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param payload Object to send to the endpoint.
     * @param requestInit The initializer for the request.
     */
    update(identityProviderIdentity: string, identityProviderIdentity1: string, payload: Heroku.IdentityProviderCertificateUpdatePayload, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProviderCertificate>;
    /**
     * Get a Certificate
     *
     * @param identityProviderIdentity unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param identityProviderIdentity1 unique identifier of this identity provider or user-friendly unique identifier for this identity provider.
     * @param requestInit The initializer for the request.
     */
    info(identityProviderIdentity: string, identityProviderIdentity1: string, requestInit?: Omit<RequestInit, 'body' | 'method'>): Promise<Heroku.IdentityProviderCertificate>;
}
