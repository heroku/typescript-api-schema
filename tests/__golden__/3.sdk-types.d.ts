/** A Heroku account becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent accounts if their invoices remain unpaid. */
export interface AccountDelinquency {
  /** scheduled time of when we will suspend your account due to delinquency */
  scheduled_suspension_time?: string | null
  /** scheduled time of when we will delete your account due to delinquency */
  scheduled_deletion_time?: string | null
}

/** An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku. */
export interface AccountFeature {
  /** when account feature was created */
  created_at?: string
  /** description of account feature */
  description?: string
  /** documentation URL of account feature */
  doc_url?: string
  /** whether or not account feature has been enabled */
  enabled?: boolean
  /** unique identifier of account feature */
  id?: string
  /** unique name of account feature */
  name?: string
  /** state of account feature */
  state?: string
  /** when account feature was updated */
  updated_at?: string
  /** user readable feature name */
  display_name?: string
  /** e-mail to send feedback about the feature */
  feedback_email?: string
}

/** Update an existing account feature. */
export interface AccountFeatureUpdateOpts {
  /** whether or not account feature has been enabled */
  enabled: boolean
}

/** An account represents an individual signed up to use the Heroku platform. */
export interface Account {
  /** whether to allow third party web activity tracking */
  allow_tracking?: boolean
  /** whether allowed to utilize beta Heroku features */
  beta?: boolean
  /** when account was created */
  created_at?: string
  /** unique email address of account */
  email?: string
  /** whether the user is federated and belongs to an Identity Provider */
  federated?: boolean
  /** unique identifier of an account */
  id?: string
  /** Identity Provider details for federated users. */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** user-friendly unique identifier for this identity provider */
    name?: string
    team?: {
      /** unique name of team */
      name?: string
    }
    organization?: {
      /** unique name of team */
      name?: string
    }
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
  /** when account last authorized with Heroku */
  last_login?: string | null
  /** full name of the account owner */
  name?: string | null
  /** SMS number of account */
  sms_number?: string | null
  /** when account was suspended */
  suspended_at?: string | null
  /** when account became delinquent */
  delinquent_at?: string | null
  /** whether two-factor auth is enabled on the account */
  two_factor_authentication?: boolean
  /** when account was updated */
  updated_at?: string
  /** whether account has been verified with billing information */
  verified?: boolean
  /** country where account owner resides */
  country_of_residence?: string | null
  /** whether the user has enabled Eco dynos */
  eco_dynos_enabled?: boolean
  /** When the user's Eco dynos will be shutdown after disablement */
  eco_dynos_shutdown_at?: string | null
  /** when pipeline cost consent was made */
  pipeline_cost_consent_at?: string | null
  /** whether account has acknowledged the MSA terms of service */
  acknowledged_msa?: boolean
  /** when account has acknowledged the MSA terms of service */
  acknowledged_msa_at?: string | null
  /** whether account has acknowledged the Italian customer terms of service */
  italian_customer_terms?: string | null
  /** whether account has acknowledged the Italian provider terms of service */
  italian_partner_terms?: string | null
  /** whether account has legacy 2FA or VaaS MFA enabled */
  mfa_enabled?: boolean
  /** whether the user is exempt from MFA requirements */
  mfa_exemption?: boolean
  /** the reason why a user may be exempt from MFA requirements */
  mfa_exemption_reason?: string | null
  /** which type of mfa the user should see */
  mfa_experience?: 'vaas' | 'legacy'
  /** team selected by default */
  default_organization?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  } | null
  /** team selected by default */
  default_team?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  } | null
}

/** Update account. */
export interface AccountUpdateOpts {
  /** whether to allow third party web activity tracking */
  allow_tracking?: boolean
  /** whether allowed to utilize beta Heroku features */
  beta?: boolean
  /** full name of the account owner */
  name?: string | null
  /** whether the user has enabled Eco dynos */
  eco_dynos_enabled?: boolean
  /** whether pipeline cost consent was made */
  pipeline_cost_consent?: boolean
}

/** Update account. */
export interface AccountUpdateByUserOpts {
  /** whether to allow third party web activity tracking */
  allow_tracking?: boolean
  /** whether allowed to utilize beta Heroku features */
  beta?: boolean
  /** full name of the account owner */
  name?: string | null
  /** whether the user has enabled Eco dynos */
  eco_dynos_enabled?: boolean
  /** whether pipeline cost consent was made */
  pipeline_cost_consent?: boolean
}

/** Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete. */
export interface AddOnAction {

}

/** Add or update a peering connection to an add-on */
export interface AddOnActionPeerOpts {
  /** The AWS VPC Peering Connection ID of the peering. */
  pcx_id: string
}

/** An add-on attachment represents a connection between an app and an add-on that it has been given access to. */
export interface AddOnAttachment {
  /** identity of add-on */
  addon?: {
    /** unique identifier of add-on */
    id: string
    /** globally unique name of the add-on */
    name: string
    /** billing application associated with this add-on */
    app: {
      /** unique identifier of app */
      id?: string
      /** unique name of app */
      name?: string
    }
  }
  /** application that is attached to add-on */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when add-on attachment was created */
  created_at?: string
  /** unique identifier of this add-on attachment */
  id?: string
  /** unique name for this add-on attachment to this app */
  name?: string
  /** attachment namespace */
  namespace?: string | null
  /** when add-on attachment was updated */
  updated_at?: string
  /** URL for logging into web interface of add-on in attached app context */
  web_url?: string | null
  /** URL for add-on partners to write to an add-on's logs */
  log_input_url?: string | null
}

/** Create a new add-on attachment. */
export interface AddOnAttachmentCreateOpts {
  addon: string
  app: string
  /** name of owning app for confirmation */
  confirm?: string
  /** unique name for this add-on attachment to this app */
  name?: string
  /** attachment namespace */
  namespace?: string | null
  /** attachment namespace config, used to specify namespace via key-value pairs */
  namespace_config?: Record<string, unknown> | null
}

/** Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many. */
export interface AddOnAttachmentResolutionOpts {
  /** unique name for this add-on attachment to this app */
  addon_attachment: string
  /** unique name of app */
  app?: string
  /** unique name of this add-on-service */
  addon_service?: string
}

/** Configuration of an Add-on */
export interface AddOnConfig {
  /** unique name of the config */
  name?: string
  /** value of the config */
  value?: string | null
}

/** Update an add-on's config. Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnConfigUpdateOpts {
  config?: Array<AddOnConfig>
}

/** Add-on Plan Actions are Provider functionality for specific add-on installations */
export interface AddOnPlanAction {
  /** a unique identifier */
  id?: string
  /** the display text shown in Dashboard */
  label?: string
  /** identifier of the action to take that is sent via SSO */
  action?: string
  /** absolute URL to use instead of an action */
  url?: string
  /** if the action requires the user to own the app */
  requires_owner?: boolean
}

/** Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints. */
export interface AddOnRegionCapability {
  /** unique identifier of this add-on-region-capability */
  id?: string
  /** whether the add-on can be installed to a Space */
  supports_private_networking?: boolean
  /** Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication. */
  addon_service?: AddOnService
  /** A region represents a geographic location in which your application may run. */
  region?: Region
}

/** Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication. */
export interface AddOnService {
  /** npm package name of the add-on service's Heroku CLI plugin */
  cli_plugin_name?: string | null
  /** when add-on-service was created */
  created_at?: string
  /** human-readable name of the add-on service provider */
  human_name?: string
  /** unique identifier of this add-on-service */
  id?: string
  /** unique name of this add-on-service */
  name?: string
  /** release status for add-on service */
  state?: 'alpha' | 'beta' | 'ga' | 'shutdown'
  /** whether or not apps can have access to more than one instance of this add-on at the same time */
  supports_multiple_installations?: boolean
  /** whether or not apps can have access to add-ons billed to a different app */
  supports_sharing?: boolean
  /** when add-on-service was updated */
  updated_at?: string
  /** generations supported by this add-on */
  supported_generations?: Array<{
    /** unique name of generation */
    name?: string
    /** unique identifier of generation */
    id?: string
  }>
}

/** Represents the delivery of a webhook notification, including its current status. */
export type AddOnWebhookDelivery = Record<string, unknown>

/** Represents a webhook event that occurred. */
export type AddOnWebhookEvent = Record<string, unknown>

/** Represents the details of a webhook subscription */
export interface AddOnWebhook {
  /** when the webhook was created */
  created_at: string
  /** the webhook's unique identifier */
  id: string
  /** the entities that the subscription provides notifications for */
  include: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at: string
  /** the URL where the webhook's notification requests are sent */
  url: string
}

/** Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookCreateOpts {
  /** a custom `Authorization` header that Heroku will include with all webhook notifications */
  authorization?: string | null
  /** the entities that the subscription provides notifications for */
  include: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level: 'notify' | 'sync'
  /** a value that Heroku will use to sign all webhook notification requests (the signature is included in the request’s `Heroku-Webhook-Hmac-SHA256` header) */
  secret?: string | null
  /** the URL where the webhook's notification requests are sent */
  url: string
}

/** Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookCreateResult {
  /** identity of add-on. Only used for add-on partner webhooks. */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookDeleteResult {
  /** identity of add-on. Only used for add-on partner webhooks. */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookInfoResult {
  /** identity of add-on. Only used for add-on partner webhooks. */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookUpdateOpts {
  /** a custom `Authorization` header that Heroku will include with all webhook notifications */
  authorization?: string | null
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** a value that Heroku will use to sign all webhook notification requests (the signature is included in the request’s `Heroku-Webhook-Hmac-SHA256` header) */
  secret?: string | null
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
export interface AddOnWebhookUpdateResult {
  /** identity of add-on. Only used for add-on partner webhooks. */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Add-ons represent add-ons that have been provisioned and attached to one or more apps. */
export interface AddOn {
  /** provider actions for this specific add-on */
  actions: Array<Record<string, unknown>>
  /** identity of add-on service */
  addon_service: {
    /** unique identifier of this add-on-service */
    id?: string
    /** unique name of this add-on-service */
    name?: string
  } | AddOnService
  /** billing entity associated with this add-on */
  billing_entity: {
    /** unique identifier of the billing entity */
    id?: string
    /** name of the billing entity */
    name?: string
    /** type of Object of the billing entity; new types allowed at any time. */
    type?: 'app' | 'team'
  }
  /** billing application associated with this add-on */
  app: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** billed price */
  billed_price: {
    /** price in cents per unit of plan */
    cents?: number
    /** price is negotiated in a contract outside of monthly add-on billing */
    contract?: boolean
    /** whether this plan is billed per use */
    metered?: boolean
    /** unit of price for plan */
    unit?: string
  } | null
  /** config vars exposed to the owning app by this add-on */
  config_vars: Array<string>
  /** when add-on was created */
  created_at: string
  /** unique identifier of add-on */
  id: string
  /** globally unique name of the add-on */
  name: string
  /** identity of add-on plan */
  plan: {
    /** unique identifier of this plan */
    id?: string
    /** unique name of this plan */
    name?: string
    /** metered pricing information for this add-on */
    meters?: Array<{
      /** unique identifier of this plan meter */
      id?: string
      /** name of this meter */
      name?: string
      /** price in cents per billing unit (may be a rate like "0.015/1000") */
      price_cents?: string
      /** human-readable description of how usage is billed */
      billing_description?: string
    }>
  }
  /** id of this add-on with its provider */
  provider_id: string
  /** A provision message */
  provision_message?: string
  /** state in the add-on's lifecycle */
  state: 'provisioning' | 'provisioned' | 'deprovisioned'
  /** when add-on was updated */
  updated_at: string
  /** URL for logging into web interface of add-on (e.g. a dashboard) */
  web_url: string | null
}

/** Create a new add-on. */
export interface AddOnCreateOpts {
  /** name for add-on's initial attachment */
  attachment?: {
    /** unique name for this add-on attachment to this app */
    name?: string
  }
  /** custom add-on provisioning options */
  config?: Record<string, string>
  /** name of billing entity for confirmation */
  confirm?: string
  plan: string
  /** globally unique name of the add-on */
  name?: string
}

/** Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned. */
export interface AddOnUpdateOpts {
  /** globally unique name of the add-on */
  name?: string
  plan: string
}

/** Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many. */
export interface AddOnResolutionOpts {
  /** globally unique name of the add-on */
  addon: string
  /** unique name of app */
  app?: string
  /** unique name of this add-on-service */
  addon_service?: string
}

/** Entities that have been allowed to be used by a Team */
export interface AllowedAddOnService {
  /** when the add-on service was allowed */
  added_at?: string
  /** the user which allowed the add-on service */
  added_by?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** the add-on service allowed for use */
  addon_service?: {
    /** unique identifier of this add-on-service */
    id?: string
    /** unique name of this add-on-service */
    name?: string
    /** human-readable name of the add-on service provider */
    human_name?: string
  }
  /** unique identifier for this allowed add-on service record */
  id?: string
}

/** Allow an Add-on Service */
export interface AllowedAddOnServiceCreateByTeamOpts {
  /** name of the add-on service to allow */
  addon_service?: string
}

/** An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku. */
export interface AppFeature {
  /** when app feature was created */
  created_at?: string
  /** description of app feature */
  description?: string
  /** documentation URL of app feature */
  doc_url?: string
  /** whether or not app feature has been enabled */
  enabled?: boolean
  /** unique identifier of app feature */
  id?: string
  /** unique name of app feature */
  name?: string
  /** state of app feature */
  state?: string
  /** when app feature was updated */
  updated_at?: string
  /** user readable feature name */
  display_name?: string
  /** e-mail to send feedback about the feature */
  feedback_email?: string
}

/** Update an existing app feature. */
export interface AppFeatureUpdateOpts {
  /** whether or not app feature has been enabled */
  enabled: boolean
}

/** An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file. */
export interface AppSetup {
  /** unique identifier of app setup */
  id?: string
  /** when app setup was created */
  created_at?: string
  /** when app setup was updated */
  updated_at?: string
  /** the overall status of app setup */
  status?: 'failed' | 'pending' | 'succeeded'
  /** reason that app setup has failed */
  failure_message?: string | null
  /** identity of app */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** identity and status of build */
  build?: {
    /** unique identifier of build */
    id?: string
    /** status of build */
    status?: 'failed' | 'pending' | 'succeeded'
    /** Build process output will be available from this URL as a stream. The stream is available as either `text/plain` or `text/event-stream`. Clients should be prepared to handle disconnects and can resume the stream by sending a `Range` header (for `text/plain`) or a `Last-Event-Id` header (for `text/event-stream`). */
    output_stream_url?: string
  } | null
  /** errors associated with invalid app.json manifest file */
  manifest_errors?: Array<string>
  /** result of postdeploy script */
  postdeploy?: {
    /** output of the postdeploy script */
    output?: string
    /** The exit code of the postdeploy script */
    exit_code?: number
  } | null
  /** fully qualified success url */
  resolved_success_url?: string | null
}

/** Create a new app setup from a gzipped tar archive containing an app.json manifest file. */
export interface AppSetupCreateOpts {
  /** optional parameters for created app */
  app?: {
    /** are other team members forbidden from joining this app. */
    locked?: boolean
    /** unique name of app */
    name?: string
    /** unique name of team */
    organization?: string
    /** force creation of the app in the user account even if a default team is set. */
    personal?: boolean
    /** unique name of region */
    region?: string
    /** unique name of space */
    space?: string
    /** unique name of stack */
    stack?: string
  }
  /** gzipped tarball of source code containing app.json manifest file */
  source_blob: {
    /** an optional checksum of the gzipped tarball for verifying its integrity */
    checksum?: string | null
    /** URL of gzipped tarball of source code containing app.json manifest file */
    url?: string
    /** Version of the gzipped tarball. */
    version?: string | null
  }
  /** overrides of keys in the app.json manifest file */
  overrides?: {
    /** overrides the buildpacks specified in the app.json manifest file */
    buildpacks?: Array<{
      /** location of the buildpack */
      url?: string
    }>
    /** overrides of the env specified in the app.json manifest file */
    env?: Record<string, string>
  }
}

/** An app transfer represents a two party interaction for transferring ownership of an app. */
export interface AppTransfer {
  /** app involved in the transfer */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when app transfer was created */
  created_at?: string
  /** unique identifier of app transfer */
  id?: string
  /** identity of the owner of the transfer */
  owner?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** identity of the recipient of the transfer */
  recipient?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** the current state of an app transfer */
  state?: 'pending' | 'accepted' | 'declined'
  /** when app transfer was updated */
  updated_at?: string
}

/** Create a new app transfer. */
export interface AppTransferCreateOpts {
  app: string
  recipient: string | '~'
  /** whether to suppress email notification when transferring apps */
  silent?: boolean
}

/** Update an existing app transfer. */
export interface AppTransferUpdateOpts {
  /** the current state of an app transfer */
  state: 'pending' | 'accepted' | 'declined'
}

/** Represents the delivery of a webhook notification, including its current status. */
export interface AppWebhookDelivery {
  /** when the delivery was created */
  created_at?: string
  /** identity of event */
  event?: {
    /** the event's unique identifier */
    id?: string
    /** the type of entity that the event is related to */
    include?: string
  }
  /** the delivery's unique identifier */
  id?: string
  /** number of times a delivery has been attempted */
  num_attempts?: number
  /** when delivery will be attempted again */
  next_attempt_at?: string | null
  /** last attempt of a delivery */
  last_attempt?: {
    /** unique identifier of attempt */
    id?: string
    /** http response code received during attempt */
    code?: number | null
    /** error class encountered during attempt */
    error_class?: string | null
    /** status of an attempt */
    status?: 'scheduled' | 'succeeded' | 'failed'
    /** when attempt was created */
    created_at?: string
    /** when attempt was updated */
    updated_at?: string
  } | null
  /** the delivery's status */
  status?: 'pending' | 'scheduled' | 'retrying' | 'failed' | 'succeeded'
  /** when the delivery was last updated */
  updated_at?: string
  /** identity of webhook */
  webhook?: {
    /** the webhook's unique identifier */
    id?: string
    /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
    level?: 'notify' | 'sync'
  }
}

/** Represents a webhook event that occurred. */
export interface AppWebhookEvent {
  /** when event was created */
  created_at?: string
  /** the event's unique identifier */
  id?: string
  /** the type of entity that the event is related to */
  include?: string
  /** payload of event */
  payload?: {
    /** the type of event that occurred */
    action?: string
    /** user that caused event */
    actor?: {
      /** unique email address of account */
      email?: string
      /** unique identifier of an account */
      id?: string
    }
    /** the current details of the event */
    data?: Record<string, unknown>
    /** previous details of the event (if any) */
    previous_data?: Record<string, unknown>
    /** the type of resource associated with the event */
    resource?: string
    /** the version of the details provided for the event */
    version?: string
  }
  /** when the event was last updated */
  updated_at?: string
}

/** Represents the details of a webhook subscription */
export type AppWebhook = Record<string, unknown>

/** Create an app webhook subscription. */
export interface AppWebhookCreateOpts {
  /** a custom `Authorization` header that Heroku will include with all webhook notifications */
  authorization?: string | null
  /** the entities that the subscription provides notifications for */
  include: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level: 'notify' | 'sync'
  /** a value that Heroku will use to sign all webhook notification requests (the signature is included in the request’s `Heroku-Webhook-Hmac-SHA256` header) */
  secret?: string | null
  /** the URL where the webhook's notification requests are sent */
  url: string
}

/** Create an app webhook subscription. */
export interface AppWebhookCreateResult {
  /** identity of app. Only used for customer webhooks. */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Removes an app webhook subscription. */
export interface AppWebhookDeleteResult {
  /** identity of app. Only used for customer webhooks. */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Returns the info for an app webhook subscription. */
export interface AppWebhookInfoResult {
  /** identity of app. Only used for customer webhooks. */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Updates the details of an app webhook subscription. */
export interface AppWebhookUpdateOpts {
  /** a custom `Authorization` header that Heroku will include with all webhook notifications */
  authorization?: string | null
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** a value that Heroku will use to sign all webhook notification requests (the signature is included in the request’s `Heroku-Webhook-Hmac-SHA256` header) */
  secret?: string | null
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** Updates the details of an app webhook subscription. */
export interface AppWebhookUpdateResult {
  /** identity of app. Only used for customer webhooks. */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}

/** An app represents the program that you would like to deploy and run on Heroku. */
export interface App {
  /** ACM status of this app */
  acm?: boolean
  /** when app was archived */
  archived_at?: string | null
  /** name of the image used for the base layers of the OCI image */
  base_image_name?: string | null
  /** identity of the stack that will be used for new builds */
  build_stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** description from buildpack of app */
  buildpack_provided_description?: string | null
  /** buildpacks of the OCI image */
  buildpacks?: Array<{
    /** identifier of the buildpack */
    id?: string
    /** version of the buildpack */
    version?: string
    /** homepage of the buildpack */
    homepage?: string
  }> | null
  /** when app was created */
  created_at?: string
  /** current build architecture for the app */
  current_build_architecture?: unknown[]
  /** the generation of the app */
  generation?: string
  /** git repo URL of app */
  git_url?: string
  /** unique identifier of app */
  id?: string
  /** describes whether a Private Spaces app is externally routable or not */
  internal_routing?: boolean | null
  /** maintenance status of app */
  maintenance?: boolean
  /** unique name of app */
  name?: string
  /** identity of app owner */
  owner?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** identity of team */
  organization?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  } | null
  /** identity of team */
  team?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  } | null
  /** identity of app region */
  region?: {
    /** unique identifier of region */
    id?: string
    /** unique name of region */
    name?: string
  }
  /** when app was released */
  released_at?: string | null
  /** git repo size in bytes of app */
  repo_size?: number | null
  /** slug size in bytes of app */
  slug_size?: number | null
  /** identity of space */
  space?: {
    /** unique identifier of space */
    id?: string
    /** unique name of space */
    name?: string
    /** true if this space has shield enabled */
    shield?: boolean
  } | null
  /** identity of app stack */
  stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** when app was updated */
  updated_at?: string
  /** web URL of app */
  web_url?: string | null
}

/** Create a new app. */
export interface AppCreateOpts {
  /** unique name of app */
  name?: string
  region?: string
  stack?: string
  /** unique name of app feature */
  feature_flags?: Array<string>
}

/** Update an existing app. */
export interface AppUpdateOpts {
  build_stack?: string
  /** maintenance status of app */
  maintenance?: boolean
  /** unique name of app */
  name?: string
}

/** An audit trail archive represents a monthly json zipped file containing events */
export interface Archive {
  /** when archive was created */
  created_at?: string
  /** month of the archive */
  month?: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
  /** year of the archive */
  year?: number
  /** url where to download the archive */
  url?: string
  /** checksum for the archive */
  checksum?: string
  /** size of the archive in bytes */
  size?: number
}

/** An audit trail event represents some action on the platform */
export interface AuditTrailEvent {
  /** when event was created */
  created_at?: string
  /** unique identifier of event */
  id?: string
  /** type of event */
  type?: string
  /** action for the event */
  action?: string
  /** user who caused event */
  actor?: {
    id?: string
    email?: string
  }
  /** app upon which event took place */
  app?: {
    id?: string
    name?: string
  }
  /** owner of the app targeted by the event */
  owner?: {
    id?: string
    email?: string
  }
  /** enterprise account on which the event happened */
  enterprise_account?: {
    id?: string
    name?: string
  }
  /** team on which the event happened */
  team?: {
    id?: string
    name?: string
  }
  /** information about where the action was triggered */
  request?: {
    ip_address?: string
  }
  /** data specific to the event */
  data?: Record<string, unknown>
}

/** A build represents the process of transforming a code tarball into build artifacts */
export interface Build {
  /** app that the build belongs to */
  app?: {
    /** unique identifier of app */
    id?: string
  }
  /** buildpacks executed for this build, in order (only applicable to Cedar-generation apps) */
  buildpacks?: Array<{
    /** the URL of the buildpack for the app */
    url?: string
    /** Buildpack Registry name of the buildpack for the app */
    name?: string
  }> | null
  /** when build was created */
  created_at: string
  /** unique identifier of build */
  id: string
  /** Labs set from project.toml file. Only applies to Fir generation apps. */
  labs?: Record<string, unknown>
  /** Build process output will be available from this URL as a stream. The stream is available as either `text/plain` or `text/event-stream`. Clients should be prepared to handle disconnects and can resume the stream by sending a `Range` header (for `text/plain`) or a `Last-Event-Id` header (for `text/event-stream`). */
  output_stream_url?: string
  /** location of gzipped tarball of source code used to create build */
  source_blob: {
    /** an optional checksum of the gzipped tarball for verifying its integrity */
    checksum?: string | null
    /** URL where gzipped tar archive of source code for build was downloaded. */
    url?: string
    /** Version of the gzipped tarball. */
    version?: string | null
    /** Version description of the gzipped tarball. */
    version_description?: string | null
  }
  /** release resulting from the build */
  release?: {
    /** unique identifier of release */
    id?: string
  } | null
  /** slug created by this build (only applicable for Cedar-generation apps) */
  slug?: {
    /** unique identifier of slug */
    id?: string
  } | null
  /** stack of build */
  stack?: string
  /** status of build */
  status: 'failed' | 'pending' | 'succeeded'
  /** when build was updated */
  updated_at: string
  /** user that started the build */
  user: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
  }
}

/** Create a new build. */
export interface BuildCreateOpts {
  /** buildpacks executed for this build, in order (only applicable to Cedar-generation apps) */
  buildpacks?: Array<{
    /** the URL of the buildpack for the app */
    url?: string
    /** Buildpack Registry name of the buildpack for the app */
    name?: string
  }> | null
  /** location of gzipped tarball of source code used to create build */
  source_blob: {
    /** an optional checksum of the gzipped tarball for verifying its integrity */
    checksum?: string | null
    /** URL where gzipped tar archive of source code for build was downloaded. */
    url?: string
    /** Version of the gzipped tarball. */
    version?: string | null
    /** Version description of the gzipped tarball. */
    version_description?: string | null
  }
}

/** A buildpack installation represents a buildpack that will be run against an app. */
export interface BuildpackInstallation {
  /** determines the order in which the buildpacks will execute */
  ordinal?: number
  /** buildpack */
  buildpack?: {
    /** location of the buildpack for the app. Either a url (unofficial buildpacks) or an internal urn (heroku official buildpacks). */
    url?: string
    /** either the Buildpack Registry name or a URL of the buildpack for the app */
    name?: string
  }
}

/** Update an app's buildpack installations. */
export interface BuildpackInstallationUpdateOpts {
  /** The buildpack attribute can accept a name, a url, or a urn. */
  updates: Array<{
    /** location of the buildpack for the app. Either a url (unofficial buildpacks) or an internal urn (heroku official buildpacks). */
    buildpack: string
  }>
}

/** A collaborator represents an account that has been given access to an app on Heroku. */
export interface Collaborator {
  /** app collaborator belongs to */
  app: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when collaborator was created */
  created_at: string
  /** unique identifier of collaborator */
  id: string
  permissions?: Array<TeamAppPermission>
  /** role in the team */
  role?: 'admin' | 'collaborator' | 'member' | 'owner' | null
  /** when collaborator was updated */
  updated_at: string
  /** identity of collaborated account */
  user: {
    /** unique email address of account */
    email?: string
    /** whether the user is federated and belongs to an Identity Provider */
    federated?: boolean
    /** unique identifier of an account */
    id?: string
  }
}

/** Create a new collaborator. */
export interface CollaboratorCreateOpts {
  /** whether to suppress email invitation when creating collaborator */
  silent?: boolean
  user: string | '~'
}

/** Config Vars allow you to manage the configuration information provided to an app on Heroku. */
export type ConfigVar = Record<string, string>

/** A credit represents value that will be used up before further charges are assigned to an account. */
export interface Credit {
  /** total value of credit in cents */
  amount?: number
  /** remaining value of credit in cents */
  balance?: number
  /** when credit was created */
  created_at?: string
  /** when credit will expire */
  expires_at?: string
  /** unique identifier of credit */
  id?: string
  /** a name for credit */
  title?: string
  /** when credit was updated */
  updated_at?: string
}

/** Create a new credit. */
export interface CreditCreateOpts {
  /** first code from a discount card */
  code1?: string
  /** second code from a discount card */
  code2?: string
}

/** Domains define what web routes should be routed to an app on Heroku. */
export interface Domain {
  /** status of this record's ACM */
  acm_status?: string | null
  /** reason for the status of this record's ACM */
  acm_status_reason?: string | null
  /** app that owns the domain */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** canonical name record, the address to point a domain at */
  cname?: string | null
  /** when domain was created */
  created_at?: string
  /** full hostname */
  hostname?: string
  /** unique identifier of this domain */
  id?: string
  /** type of domain name */
  kind?: 'heroku' | 'custom'
  /** when domain was updated */
  updated_at?: string
  /** status of this record's cname */
  status?: string
  /** sni endpoint the domain is associated with */
  sni_endpoint?: {
    /** unique name for SNI endpoint */
    name?: string
    /** unique identifier of this SNI endpoint */
    id?: string
  } | null
}

/** Create a new domain. */
export interface DomainCreateOpts {
  /** full hostname */
  hostname: string
  /** null or unique identifier or name for SNI endpoint */
  sni_endpoint: string | null
}

/** Associate an SNI endpoint */
export interface DomainUpdateOpts {
  /** null or unique identifier or name for SNI endpoint */
  sni_endpoint: string | null
}

/** Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types). */
export interface DynoSize {
  /** CPU architecture of this dyno */
  architecture?: string
  /** minimum vCPUs, non-dedicated may get more depending on load */
  compute?: number
  /** whether this dyno size's product tier can use auto-scaling */
  can_autoscale?: boolean
  /** price information for this dyno size */
  cost?: Record<string, unknown> | null
  /** whether this dyno will be dedicated to one user */
  dedicated?: boolean
  /** unit of consumption for Heroku Enterprise customers to 2 decimal places */
  precise_dyno_units?: number
  /** unique identifier of the dyno size */
  id?: string
  /** amount of RAM in GB */
  memory?: number
  /** name of the dyno size */
  name?: string
  /** whether this dyno can only be provisioned in a private space */
  private_space_only?: boolean
  /** Generation of the Heroku platform for this dyno size */
  generation?: {
    /** unique identifier of the generation of the Heroku platform for this dyno size */
    id?: string
    /** unique name of the generation of the Heroku platform for this dyno size */
    name?: string
  }
  /** infrastructure tier for this dyno */
  infrastructure_tier?: string
  /** product tier for this dyno */
  product_dyno_tier?: string
}

/** Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types). */
export interface Dyno {
  /** a URL to stream output from for attached processes or null for non-attached processes */
  attach_url?: string | null
  /** command used to start this process */
  command?: string
  /** when dyno was created */
  created_at?: string
  /** unique identifier of this dyno */
  id?: string
  /** the name of this process on this dyno */
  name?: string
  /** app release of the dyno */
  release?: {
    /** unique identifier of release */
    id?: string
    /** unique version assigned to the release */
    version?: number
  }
  /** app formation belongs to */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** dyno size */
  size?: string
  /** current status of process (either: crashed, down, idle, starting, or up) */
  state?: string
  /** type of process */
  type?: string
  /** when process last changed state */
  updated_at?: string
}

/** Create a new dyno. */
export interface DynoCreateOpts {
  /** whether to stream output or not */
  attach?: boolean
  /** command used to start this process */
  command: string
  /** custom environment to add to the dyno config vars */
  env?: Record<string, string>
  /** force an attached one-off dyno to not run in a tty */
  force_no_tty?: boolean | null
  /** dyno size */
  size?: string
  /** type of process */
  type?: string
  /** seconds until dyno expires, after which it will soon be killed, max 86400 seconds (24 hours) */
  time_to_live?: number
}

/** Usage for an enterprise account at a daily resolution. */
export interface EnterpriseAccountDailyUsage {
  /** total add-on credits used */
  addons?: number
  /** usage by team */
  teams?: Array<{
    /** total add-on credits used */
    addons?: number
    /** app usage in the team */
    apps?: Array<{
      /** total add-on credits used */
      addons?: number
      /** unique name of app */
      app_name?: string
      /** total add-on credits used for first party add-ons */
      data?: number
      /** dynos used */
      dynos?: number
      /** total add-on credits used for third party add-ons */
      partner?: number
    }>
    /** total add-on credits used for first party add-ons */
    data?: number
    /** dynos used */
    dynos?: number
    /** team identifier */
    id?: string
    /** name of the team */
    name?: string
    /** total add-on credits used for third party add-ons */
    partner?: number
    /** space credits used */
    space?: number
  }>
  /** total add-on credits used for first party add-ons */
  data?: number
  /** date of the usage */
  date?: string
  /** dynos used */
  dynos?: number
  /** enterprise account identifier */
  id?: string
  /** name of the enterprise account */
  name?: string
  /** total add-on credits used for third party add-ons */
  partner?: number
  /** space credits used */
  space?: number
}

/**
 * Retrieves usage for an enterprise account for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).
 * 
 */
export interface EnterpriseAccountDailyUsageInfoOpts {
  /** range start date */
  start: string
  /** range end date */
  end?: string
}

/** Enterprise account members are users with access to an enterprise account. */
export interface EnterpriseAccountMember {
  enterprise_account?: {
    /** unique identifier of the enterprise account */
    id?: string
    /** unique name of the enterprise account */
    name?: string
  }
  /** unique identifier of the member */
  id?: string
  /** enterprise account permissions */
  permissions?: Array<{
    description?: string
    /** permission in the enterprise account */
    name?: 'view' | 'create' | 'manage' | 'billing'
  }>
  /** user information for the membership */
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** whether the Enterprise Account member has two factor authentication enabled */
  two_factor_authentication?: boolean
  /** Identity Provider information the member is federated with */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** name of the identity provider */
    name?: string
    /** whether the identity_provider information is redacted or not */
    redacted?: boolean
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
}

/** Create a member in an enterprise account. */
export interface EnterpriseAccountMemberCreateOpts {
  user: string
  /** permissions for enterprise account */
  permissions: Array<'view' | 'create' | 'manage' | 'billing'>
  /** whether membership is being created as part of SSO JIT */
  federated?: boolean
}

/** Update a member in an enterprise account. */
export interface EnterpriseAccountMemberUpdateOpts {
  /** permissions for enterprise account */
  permissions: Array<'view' | 'create' | 'manage' | 'billing'>
}

/** Usage for an enterprise account at a monthly resolution. */
export interface EnterpriseAccountMonthlyUsage {
  /** total add-on credits used */
  addons?: number
  /** usage by team */
  teams?: Array<{
    /** total add-on credits used */
    addons?: number
    /** app usage in the team */
    apps?: Array<{
      /** total add-on credits used */
      addons?: number
      /** unique name of app */
      app_name?: string
      /** total add-on credits used for first party add-ons */
      data?: number
      /** dynos used */
      dynos?: number
      /** total add-on credits used for third party add-ons */
      partner?: number
    }>
    /** max connect rows synced */
    connect?: number
    /** total add-on credits used for first party add-ons */
    data?: number
    /** dynos used */
    dynos?: number
    /** team identifier */
    id?: string
    /** name of the team */
    name?: string
    /** total add-on credits used for third party add-ons */
    partner?: number
    /** space credits used */
    space?: number
  }>
  /** max connect rows synced */
  connect?: number
  /** total add-on credits used for first party add-ons */
  data?: number
  /** dynos used */
  dynos?: number
  /** enterprise account identifier */
  id?: string
  /** year and month of the usage */
  month?: string
  /** name of the enterprise account */
  name?: string
  /** total add-on credits used for third party add-ons */
  partner?: number
  /** space credits used */
  space?: number
}

/**
 * Retrieves usage for an enterprise account for a range of months. Start and end dates can be specified as query parameters using the date format YYYY-MM. If no end date is specified, one month of usage is returned. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).
 * 
 */
export interface EnterpriseAccountMonthlyUsageInfoOpts {
  /** range start date */
  start: string
  /** range end date */
  end?: string
}

/** Enterprise accounts allow companies to manage their development teams and billing. */
export interface EnterpriseAccount {
  /** unique identifier of the enterprise account */
  id?: string
  /** when the enterprise account was created */
  created_at?: string
  /** unique name of the enterprise account */
  name?: string
  /** when the enterprise account was updated */
  updated_at?: string
  /** the current user's permissions for this enterprise account */
  permissions?: Array<string>
  /** whether the enterprise account is a trial or not */
  trial?: boolean
  /** whether the enterprise account is part of the Salesforce Partner Program */
  partner_benefits?: boolean
  /** Identity Provider associated with the Enterprise Account */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** user-friendly unique identifier for this identity provider */
    name?: string
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
}

/** Update enterprise account properties */
export interface EnterpriseAccountUpdateOpts {
  /** unique name of the enterprise account */
  name?: string
}

/** Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects. */
export type FilterApps = Record<string, unknown>

/** The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app. */
export interface Formation {
  /** app formation belongs to */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** command to use to launch this process */
  command?: string
  /** when process type was created */
  created_at?: string
  /** dyno size */
  dyno_size?: {
    /** unique identifier of the dyno size */
    id?: string
    /** name of the dyno size */
    name?: string
  }
  /** unique identifier of this process type */
  id?: string
  /** number of processes to maintain */
  quantity?: number
  /** deprecated, refer to 'dyno_size' instead */
  size?: string
  /** type of process to maintain */
  type?: string
  /** when dyno type was updated */
  updated_at?: string
}

/** Batch update process types */
export interface FormationBatchUpdateOpts {
  /** Array with formation updates. Each element must have "type", the id or name of the process type to be updated, and can optionally update its "quantity" or "dyno_size". */
  updates: Array<{
    /** dyno size */
    dyno_size?: {
      /** unique identifier of the dyno size */
      id?: string
      /** name of the dyno size */
      name?: string
    }
    /** number of processes to maintain */
    quantity?: number
    /** type of process to maintain */
    type: string
  }>
}

/** Update process type */
export interface FormationUpdateOpts {
  /** dyno size */
  dyno_size?: {
    /** unique identifier of the dyno size */
    id?: string
    /** name of the dyno size */
    name?: string
  }
  /** number of processes to maintain */
  quantity?: number
}

/** A generation represents a version of the Heroku platform that includes the app execution environment, routing, telemetry, and build systems. */
export interface Generation {
  /** when generation was created */
  created_at?: string
  /** unique identifier of generation */
  id?: string
  /** unique name of generation */
  name?: string
  /** when generation was updated */
  updated_at?: string
  /** features unsupported by this generation */
  unsupported_features?: Array<string>
  /** features unsupported by this generation along with their metadata */
  expanded_supported_features?: Array<{
    /** name of unsupported feature */
    name?: string
    /** type of unsupported feature */
    incompatible_type?: string
    /** scope of unsupported feature */
    scope?: string
  }>
}

/** Identity Providers represent the SSO configuration of an Enterprise Account or Team. */
export interface IdentityProvider {
  /** raw contents of the public certificate (eg: .crt or .pem file) */
  certificate?: string | null
  /** Array of sso certificates belonging to this identity provider */
  certificates?: Array<{
    /** when provider record was created */
    created_at?: string
    /** unique identifier of this identity provider */
    id?: string
    /** time which the certificate expires */
    expires_at?: string
    /** raw contents of the public certificate (eg: .crt or .pem file) */
    body?: string
    /** label for certificate */
    name?: string | null
  }>
  /** when provider record was created */
  created_at?: string
  /** URL identifier provided by the identity provider */
  entity_id?: string
  /** unique identifier of this identity provider */
  id?: string
  /** user-friendly unique identifier for this identity provider */
  name?: string
  /** entity that owns this identity provider */
  owner?: {
    /** unique identifier of the owner */
    id: string
    /** name of the owner */
    name?: string
    /** type of the owner */
    type: 'team' | 'enterprise-account'
  }
  /** single log out URL for this identity provider */
  slo_target_url?: string
  /** single sign on URL for this identity provider */
  sso_target_url?: string
  /** when the identity provider record was updated */
  updated_at?: string
  /** when the identity provider is allowed to be used */
  enabled?: boolean
  /** heroku start url */
  heroku_start_url?: string
  /** heroku entity id */
  heroku_entity_id?: string
  /** heroku acs url */
  heroku_acs_url?: string
}

/** Create an Identity Provider */
export interface IdentityProviderCreateOpts {
  /** Array of sso certificates belonging to this identity provider */
  certificates?: Array<{
    /** when provider record was created */
    created_at?: string
    /** unique identifier of this identity provider */
    id?: string
    /** time which the certificate expires */
    expires_at?: string
    /** raw contents of the public certificate (eg: .crt or .pem file) */
    body?: string
    /** label for certificate */
    name?: string | null
  }>
  /** raw contents of the public certificate (eg: .crt or .pem file) */
  certificate?: string | null
  /** URL identifier provided by the identity provider */
  entity_id?: string
  /** single log out URL for this identity provider */
  slo_target_url?: string
  /** single sign on URL for this identity provider */
  sso_target_url?: string
  /** entity that owns this identity provider */
  owner: {
    /** unique identifier of the owner */
    id: string
    /** name of the owner */
    name?: string
    /** type of the owner */
    type: 'team' | 'enterprise-account'
  }
  /** when the identity provider is allowed to be used */
  enabled?: boolean
}

/** Update an Identity Provider */
export interface IdentityProviderUpdateOpts {
  /** URL identifier provided by the identity provider */
  entity_id?: string
  /** single log out URL for this identity provider */
  slo_target_url?: string
  /** single sign on URL for this identity provider */
  sso_target_url?: string
  /** when the identity provider is allowed to be used */
  enabled?: boolean
  /** List of certificates to update or create; any existing certificates not referenced here will be deleted */
  certificates?: Array<{
    /** unique identifier of this identity provider */
    id: string
    /** label for certificate */
    name: string | null
  } | {
    /** label for certificate */
    name?: string | null
    /** raw contents of the public certificate (eg: .crt or .pem file) */
    body: string
  }>
}

/** An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application. */
export interface InboundRuleset {
  /** unique identifier of an inbound-ruleset */
  id?: string
  /** identity of space */
  space?: {
    /** unique identifier of space */
    id?: string
    /** unique name of space */
    name?: string
  }
  /** when inbound-ruleset was created */
  created_at?: string
  rules?: Array<{
    /** states whether the connection is allowed or denied */
    action: 'allow' | 'deny'
    /** is the request’s source in CIDR notation */
    source: string
  }>
  /** unique email address of account */
  created_by?: string
}

/** Create a new inbound ruleset */
export interface InboundRulesetCreateOpts {
  rules?: Array<{
    /** states whether the connection is allowed or denied */
    action: 'allow' | 'deny'
    /** is the request’s source in CIDR notation */
    source: string
  }>
}

/** An invoice address represents the address that should be listed on an invoice. */
export interface InvoiceAddress {
  /** invoice street address line 1 */
  address_1?: string
  /** invoice street address line 2 */
  address_2?: string
  /** invoice city */
  city?: string
  /** country */
  country?: string
  heroku_id?: string
  /** metadata / additional information to go on invoice */
  other?: string
  /** invoice zip code */
  postal_code?: string
  /** invoice state */
  state?: string
  /** flag to use the invoice address for an account or not */
  use_invoice_address?: boolean
}

/** Update invoice address for an account. */
export interface InvoiceAddressUpdateOpts {
  /** invoice street address line 1 */
  address_1?: string
  /** invoice street address line 2 */
  address_2?: string
  /** invoice city */
  city?: string
  /** country */
  country?: string
  /** metadata / additional information to go on invoice */
  other?: string
  /** invoice zip code */
  postal_code?: string
  /** invoice state */
  state?: string
  /** flag to use the invoice address for an account or not */
  use_invoice_address?: boolean
}

/** An invoice is an itemized bill of goods for an account which includes pricing and charges. */
export interface Invoice {
  /** total charges on this invoice */
  charges_total?: number
  /** when invoice was created */
  created_at?: string
  /** total credits on this invoice */
  credits_total?: number
  /** unique identifier of this invoice */
  id?: string
  /** human readable invoice number */
  number?: number
  /** the ending date that the invoice covers */
  period_end?: string
  /** the starting date that this invoice covers */
  period_start?: string
  /** payment status for this invoice (pending, successful, failed) */
  state?: number
  /** combined total of charges and credits on this invoice */
  total?: number
  /** when invoice was updated */
  updated_at?: string
}

/** Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations. */
export interface Key {
  /** comment on the key */
  comment?: string
  /** when key was created */
  created_at?: string
  /** deprecated. Please refer to 'comment' instead */
  email?: string
  /** a unique identifying string based on contents */
  fingerprint?: string
  /** unique identifier of this key */
  id?: string
  /** full public_key as uploaded */
  public_key?: string
  /** when key was updated */
  updated_at?: string
}

/** [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on. */
export interface LogDrain {
  /** add-on that created the drain */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
    /** billing application associated with this add-on */
    app?: {
      /** unique identifier of app */
      id?: string
      /** unique name of app */
      name?: string
    }
  } | null
  /** application that is attached to this drain */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  } | null
  /** when log drain was created */
  created_at?: string
  /** unique identifier of this log drain */
  id?: string
  /** token associated with the log drain */
  token?: string
  /** when log drain was updated */
  updated_at?: string
  /** url associated with the log drain */
  url?: string
}

/** Create a new log drain. */
export interface LogDrainCreateOpts {
  /** url associated with the log drain */
  url: string
}

/** Update an add-on owned log drain. */
export interface LogDrainUpdateOpts {
  /** url associated with the log drain */
  url: string
}

/** A log session is a reference to the http based log stream for an app. */
export interface LogSession {
  /** when log connection was created */
  created_at?: string
  /** unique identifier of this log session */
  id?: string
  /** URL for log streaming session */
  logplex_url?: string
  /** when log session was updated */
  updated_at?: string
}

/** Create a new log session. */
export interface LogSessionCreateOpts {
  /** dyno name to limit results to */
  dyno?: string
  /** process type to limit results to (for Fir-generation apps only) */
  type?: string
  /** number of log lines to stream at a time (for Cedar-generation apps only) */
  lines?: number
  /** log source to limit results to */
  source?: string
  /** whether to stream ongoing logs */
  tail?: boolean
}

/** OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth) */
export interface OauthAuthorization {
  /** access token for this authorization */
  access_token?: {
    /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
    expires_in?: number | null
    /** unique identifier of OAuth token */
    id?: string
    /** contents of the token to be used for authorization */
    token?: string
    /** the version of the token */
    version?: number
  } | null
  /** identifier of the client that obtained this authorization, if any */
  client?: {
    /** unique identifier of this OAuth client */
    id?: string
    /** OAuth client name */
    name?: string
    /** endpoint for redirection after authorization with OAuth client */
    redirect_uri?: string
  } | null
  /** when OAuth authorization was created */
  created_at?: string
  /** human-friendly description of this OAuth authorization */
  description?: string
  /** this authorization's grant */
  grant?: {
    /** grant code received from OAuth web application authorization */
    code?: string
    /** seconds until OAuth grant expires */
    expires_in?: number
    /** unique identifier of OAuth grant */
    id?: string
  } | null
  /** unique identifier of OAuth authorization */
  id?: string
  /** refresh token for this authorization */
  refresh_token?: {
    /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
    expires_in?: number | null
    /** unique identifier of OAuth token */
    id?: string
    /** contents of the token to be used for authorization */
    token?: string
  } | null
  /** The scope of access OAuth authorization allows */
  scope?: Array<string>
  /** this authorization's session */
  session?: {
    /** unique identifier of OAuth token */
    id?: string
  } | null
  /** when OAuth authorization was updated */
  updated_at?: string
  /** authenticated user associated with this authorization */
  user?: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
    /** full name of the account owner */
    full_name?: string | null
  }
}

/** Create a new OAuth authorization. */
export interface OauthAuthorizationCreateOpts {
  client?: string
  /** human-friendly description of this OAuth authorization */
  description?: string
  /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
  expires_in?: number | null
  /** The scope of access OAuth authorization allows */
  scope: Array<string>
}

/** Update an existing OAuth authorization. */
export interface OauthAuthorizationUpdateOpts {
  /** human-friendly description of this OAuth authorization */
  description?: string
  /** identifier of the client that obtained this authorization */
  client: {
    /** unique identifier of this OAuth client */
    id?: string
    /** secret used to obtain OAuth authorizations under this client */
    secret?: string
  }
}

/** Create a new team OAuth authorization. */
export interface OauthAuthorizationTeamCreateOpts {
  /** human-friendly description of this OAuth authorization */
  description?: string
  /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
  expires_in?: number | null
  /** The scope of access OAuth authorization allows */
  scope?: Array<string>
}

/** OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth). */
export interface OauthClient {
  /** when OAuth client was created */
  created_at?: string
  /** unique identifier of this OAuth client */
  id?: string
  /** whether the client is still operable given a delinquent account */
  ignores_delinquent?: boolean | null
  /** OAuth client name */
  name?: string
  /** endpoint for redirection after authorization with OAuth client */
  redirect_uri?: string
  /** secret used to obtain OAuth authorizations under this client */
  secret?: string
  /** when OAuth client was updated */
  updated_at?: string
}

/** Create a new OAuth client. */
export interface OauthClientCreateOpts {
  /** OAuth client name */
  name: string
  /** endpoint for redirection after authorization with OAuth client */
  redirect_uri: string
}

/** Update OAuth client */
export interface OauthClientUpdateOpts {
  /** OAuth client name */
  name?: string
  /** endpoint for redirection after authorization with OAuth client */
  redirect_uri?: string
}

/** OAuth grants are used to obtain authorizations on behalf of a user. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth) */
export interface OauthGrant {

}

/** OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth) */
export interface OauthToken {
  /** current access token */
  access_token?: {
    /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
    expires_in?: number | null
    /** unique identifier of OAuth token */
    id?: string
    /** contents of the token to be used for authorization */
    token?: string
  }
  /** authorization for this set of tokens */
  authorization?: {
    /** unique identifier of OAuth authorization */
    id?: string
  }
  /** OAuth client secret used to obtain token */
  client?: {
    /** secret used to obtain OAuth authorizations under this client */
    secret?: string
  } | null
  /** when OAuth token was created */
  created_at?: string
  /** grant used on the underlying authorization */
  grant?: {
    /** grant code received from OAuth web application authorization */
    code?: string
    /** type of grant requested, one of `authorization_code` or `refresh_token` */
    type?: string
  }
  /** unique identifier of OAuth token */
  id?: string
  /** refresh token for this authorization */
  refresh_token?: {
    /** seconds until OAuth token expires; may be `null` for tokens with indefinite lifetime */
    expires_in?: number | null
    /** unique identifier of OAuth token */
    id?: string
    /** contents of the token to be used for authorization */
    token?: string
    /** the version of the token */
    version?: number
  }
  /** OAuth session using this token */
  session?: {
    /** unique identifier of OAuth token */
    id?: string
  }
  /** when OAuth token was updated */
  updated_at?: string
  /** Reference to the user associated with this token */
  user?: {
    /** unique identifier of an account */
    id?: string
  }
}

/** Create a new OAuth token. */
export interface OauthTokenCreateOpts {
  client: {
    /** secret used to obtain OAuth authorizations under this client */
    secret?: string
  }
  grant: {
    /** grant code received from OAuth web application authorization */
    code?: string
    /** type of grant requested, one of `authorization_code` or `refresh_token` */
    type?: string
  }
  refresh_token: {
    /** contents of the token to be used for authorization */
    token?: string
  }
}

/** An OCI (Open Container Initiative) image is a standardized format for packaging and distributing containerized applications, ready to run on the platform. */
export interface OciImage {
  /** unique identifier of the OCI image */
  id?: string
  /** name of the image used for the base layers of the OCI image */
  base_image_name?: string
  /** the digest of the top most layer of the base image. */
  base_top_layer?: string
  /** identification of the code in your version control system (eg: SHA of the git HEAD) */
  commit?: string
  /** an optional description of the provided commit */
  commit_description?: string
  /** name of the image registry repository used for storage */
  image_repo?: string
  /** unique identifier representing the content of the OCI image */
  digest?: string
  /** stack associated to the OCI image */
  stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** process types of the OCI image */
  process_types?: Record<string, {
    /** name of the process type */
    name?: string
    /** the detailed command used for display purposes */
    display_cmd?: string
    /** the command that will be executed */
    command?: string
    /** working directory */
    working_dir?: string
    /** true if it is the default process type */
    default?: boolean | null
  }>
  /** buildpacks of the OCI image */
  buildpacks?: Array<{
    /** identifier of the buildpack */
    id?: string
    /** version of the buildpack */
    version?: string
    /** homepage of the buildpack */
    homepage?: string
  }>
  /** when the OCI image was created */
  created_at?: string
  /** when the OCI image was updated */
  updated_at?: string
  /** build architecture for OCI image */
  architecture?: string | null
}

/** Create an new OCI image of an app */
export interface OciImageCreateOpts {
  /** build architecture for OCI image */
  architecture?: string | null
  /** name of the image used for the base layers of the OCI image */
  base_image_name?: string
  /** the digest of the top most layer of the base image. */
  base_top_layer?: string
  /** identification of the code in your version control system (eg: SHA of the git HEAD) */
  commit?: string
  /** an optional description of the provided commit */
  commit_description?: string
  /** name of the image registry repository used for storage */
  image_repo?: string
  /** unique identifier representing the content of the OCI image */
  digest?: string
  stack?: string
  /** process types of the OCI image */
  process_types?: Record<string, {
    /** name of the process type */
    name?: string
    /** the detailed command used for display purposes */
    display_cmd?: string
    /** the command that will be executed */
    command?: string
    /** working directory */
    working_dir?: string
    /** true if it is the default process type */
    default?: boolean | null
  }>
  /** buildpacks of the OCI image */
  buildpacks?: Array<{
    /** identifier of the buildpack */
    id?: string
    /** version of the buildpack */
    version?: string
    /** homepage of the buildpack */
    homepage?: string
  }>
}

/** A password reset represents a in-process password reset attempt. */
export interface PasswordReset {
  /** when password reset was created */
  created_at?: string
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
}

/** Reset account's password. This will send a reset password link to the user's email address. */
export interface PasswordResetResetPasswordOpts {
  /** unique email address of account */
  email: string
}

/** Complete password reset. */
export interface PasswordResetCompleteResetPasswordOpts {
  /** current password on the account */
  password: string
  /** confirmation of the new password */
  password_confirmation: string
}

/** [Peering Info](https://devcenter.heroku.com/articles/private-space-vpc-peering?preview=1) gives you the information necessary to peer an AWS VPC to a Private Space. */
export interface PeeringInfo {
  /** The AWS account ID of your Private Space. */
  aws_account_id?: string
  /** The AWS region where your Private Space resides */
  aws_region?: 'ap-south-1' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'eu-central-1' | 'ap-northeast-2' | 'ap-northeast-1' | 'us-east-1' | 'sa-east-1' | 'us-west-1' | 'us-west-2'
  /** The AWS VPC ID of the peer. */
  vpc_id?: string
  /** An IP address and the number of significant bits that make up the routing or networking portion. */
  vpc_cidr?: string
  /** The CIDR ranges that should be routed to the Private Space VPC. */
  dyno_cidr_blocks?: Array<string>
  /** The CIDR ranges that you must not conflict with. */
  unavailable_cidr_blocks?: Array<string>
  /** The CIDR ranges that should be routed to the Private Space VPC. */
  space_cidr_blocks?: Array<string>
}

/** [Peering](https://devcenter.heroku.com/articles/private-space-vpc-peering?preview=1) provides a way to peer your Private Space VPC to another AWS VPC. */
export interface Peering {
  /** The type of peering connection. */
  type?: 'heroku-managed' | 'customer-managed' | 'unknown' | 'slowdb' | 'heroku-postgresql' | 'heroku-redis' | 'heroku-kafka' | 'heroku-cassandra'
  /** The AWS VPC Peering Connection ID of the peering. */
  pcx_id?: string
  /** An IP address and the number of significant bits that make up the routing or networking portion. */
  cidr_block?: string
  /** The CIDR blocks of the peer. */
  cidr_blocks?: Array<string>
  /** The status of the peering connection. */
  status?: 'initiating-request' | 'pending-acceptance' | 'provisioning' | 'active' | 'failed' | 'expired' | 'rejected' | 'deleted'
  /** The AWS VPC ID of the peer. */
  aws_vpc_id?: string
  /** The AWS region of the peer connection. */
  aws_region?: string
  /** The AWS account ID of your Private Space. */
  aws_account_id?: string
  /** When a peering connection will expire. */
  expires?: string
}

/** Accept a pending peering connection with a private space. */
export interface PeeringAcceptOpts {
  /** The AWS VPC Peering Connection ID of the peering. */
  pcx_id: string
}

/** An owned entity including users' permissions. */
export interface PermissionEntity {
  /** ID of the entity. */
  id?: string
  /** Name of the entity. */
  name?: string
  /** unique identifier of team */
  team_id?: string
  /** The type of object the entity is referring to. */
  type?: 'app' | 'space'
  /** Users that have access to the entity. */
  users?: Array<{
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
    /** enterprise account permissions */
    permissions?: Array<string>
  }>
}

/** Information about the latest builds of apps in a pipeline. A build represents the process of transforming code into build artifacts. */
export interface PipelineBuild {
  /** app that the build belongs to */
  app?: {
    /** unique identifier of app */
    id?: string
  }
  /** buildpacks executed for this build, in order (only applicable to Cedar-generation apps) */
  buildpacks?: Array<{
    /** the URL of the buildpack for the app */
    url?: string
    /** Buildpack Registry name of the buildpack for the app */
    name?: string
  }> | null
  /** when build was created */
  created_at?: string
  /** unique identifier of build */
  id?: string
  /** Build process output will be available from this URL as a stream. The stream is available as either `text/plain` or `text/event-stream`. Clients should be prepared to handle disconnects and can resume the stream by sending a `Range` header (for `text/plain`) or a `Last-Event-Id` header (for `text/event-stream`). */
  output_stream_url?: string
  /** location of gzipped tarball of source code used to create build */
  source_blob?: {
    /** an optional checksum of the gzipped tarball for verifying its integrity */
    checksum?: string | null
    /** URL where gzipped tar archive of source code for build was downloaded. */
    url?: string
    /** version of the gzipped tarball */
    version?: string | null
    /** version description of the gzipped tarball */
    version_description?: string | null
  }
  /** release resulting from the build */
  release?: {
    /** unique identifier of release */
    id?: string
  } | null
  /** slug created by this build */
  slug?: {
    /** unique identifier of slug */
    id?: string
  } | null
  /** stack of build */
  stack?: string
  /** status of build */
  status?: 'failed' | 'pending' | 'succeeded'
  /** when build was updated */
  updated_at?: string
  /** user that started the build */
  user?: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
  }
}

/** Pipeline config vars in Heroku CI and review apps used to manage the configuration information for a pipeline. */
export interface PipelineConfigVar {
  /** user-defined config var name and value */
  '["NAME"]: ["value"]'?: Record<string, unknown>
}

/** Information about an app's coupling to a pipeline */
export interface PipelineCoupling {
  /** app involved in the pipeline coupling */
  app?: {
    /** unique identifier of app */
    id?: string
  }
  /** when pipeline coupling was created */
  created_at?: string
  /** unique identifier of pipeline coupling */
  id?: string
  /** pipeline involved in the coupling */
  pipeline?: {
    /** unique identifier of pipeline */
    id?: string
  }
  /** target pipeline stage */
  stage?: 'test' | 'review' | 'development' | 'staging' | 'production'
  /** when pipeline coupling was updated */
  updated_at?: string
}

/** Create a new pipeline coupling. */
export interface PipelineCouplingCreateOpts {
  app: string
  /** unique identifier of pipeline */
  pipeline: string
  /** target pipeline stage */
  stage: 'test' | 'review' | 'development' | 'staging' | 'production'
}

/** Update an existing pipeline coupling. */
export interface PipelineCouplingUpdateOpts {
  /** target pipeline stage */
  stage?: 'test' | 'review' | 'development' | 'staging' | 'production'
}

/** Information about the latest deployment of each app in a pipeline. A deployment is the process of moving the build artifacts to a target environment. */
export interface PipelineDeployment {
  /** add-on plans installed on the app for this deployment */
  addon_plan_names?: Array<string>
  /** a build artifact for the release */
  artifacts?: {
    /** type of artifact */
    type?: string
    id?: string
  }
  /** app involved in the deployment */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when release was created */
  created_at?: string
  /** description of changes in this release */
  description?: string
  /** unique identifier of release */
  id?: string
  /** when release was updated */
  updated_at?: string
  /** slug running in this deployment */
  slug?: {
    /** unique identifier of slug */
    id?: string
  } | null
  /** current status of the release */
  status?: 'expired' | 'failed' | 'pending' | 'succeeded'
  /** user that created the deployment */
  user?: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
  }
  /** unique version assigned to the release */
  version?: number
  /** indicates if this release is the current one for the app */
  current?: boolean
  /** URL that the release command output streams to. The stream is available as either `text/plain` or `text/event-stream`. Prepare clients to handle disconnects and to resume the stream by sending a `Range` header for `text/plain` or a `Last-Event-Id` header for `text/event-stream`. */
  output_stream_url?: string | null
  /** indicates if this release is eligible for rollback */
  eligible_for_rollback?: boolean
}

/** Promotion targets represent an individual app being promoted to */
export interface PipelinePromotionTarget {
  /** the app which was promoted to */
  app?: {
    /** unique identifier of app */
    id?: string
  }
  /** an error message for why the promotion failed */
  error_message?: string | null
  /** unique identifier of promotion target */
  id?: string
  /** the promotion which the target belongs to */
  pipeline_promotion?: {
    /** unique identifier of promotion */
    id?: string
  }
  /** the release which was created on the target app */
  release?: {
    /** unique identifier of release */
    id?: string
  } | null
  /** status of promotion */
  status?: 'pending' | 'succeeded' | 'failed'
}

/** Promotions allow you to move code from an app in a pipeline to all targets */
export interface PipelinePromotion {
  /** when promotion was created */
  created_at?: string
  /** unique identifier of promotion */
  id?: string
  /** the pipeline which the promotion belongs to */
  pipeline?: {
    /** unique identifier of pipeline */
    id?: string
  }
  /** the app being promoted from */
  source?: {
    /** the app which was promoted from */
    app?: {
      /** unique identifier of app */
      id?: string
    }
    /** the release used to promoted from */
    release?: {
      /** unique identifier of release */
      id?: string
    }
  }
  /** status of promotion */
  status?: 'pending' | 'completed'
  /** when promotion was updated */
  updated_at?: string | null
}

/** Create a new promotion. */
export interface PipelinePromotionCreateOpts {
  /** pipeline involved in the promotion */
  pipeline: {
    /** unique identifier of pipeline */
    id: string
  }
  /** the app being promoted from */
  source: {
    /** the app which was promoted from */
    app?: {
      /** unique identifier of app */
      id?: string
    }
    /** the specific release to promote from (optional, defaults to current release) */
    release?: {
      /** unique identifier of release */
      id?: string
    }
  }
  targets: Array<{
    /** the app is being promoted to */
    app?: {
      /** unique identifier of app */
      id?: string
    }
  }>
}

/** Information about the latest release of each app in a pipeline. A release makes a deployment available to end-users. */
export interface PipelineRelease {
  /** add-on plans installed on the app for this release */
  addon_plan_names?: Array<string>
  /** a build artifact for the release */
  artifacts?: {
    /** type of artifact */
    type?: string
    id?: string
  }
  /** app involved in the release */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when release was created */
  created_at?: string
  /** description of changes in this release */
  description?: string
  /** unique identifier of release */
  id?: string
  /** when release was updated */
  updated_at?: string
  /** slug running in the release */
  slug?: {
    /** unique identifier of slug */
    id?: string
  } | null
  /** current status of the release */
  status?: 'expired' | 'failed' | 'pending' | 'succeeded'
  /** user that created the release */
  user?: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
  }
  /** unique version assigned to the release */
  version?: number
  /** indicates if this release is the current one for the app */
  current?: boolean
  /** URL that the release command output streams to. The stream is available as either `text/plain` or `text/event-stream`. Prepare clients to handle disconnects and to resume the stream by sending a `Range` header for `text/plain` or a `Last-Event-Id` header for `text/event-stream`. */
  output_stream_url?: string | null
  /** indicates if this release is eligible for rollback */
  eligible_for_rollback?: boolean
}

/** A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json */
export interface PipelineStack {
  /** identity of the stack that will be used for new builds without a stack defined in CI and Review Apps */
  stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  } | null
}

/** A pipeline transfer is the process of changing pipeline ownership along with the contained apps. */
export interface PipelineTransfer {
  /** pipeline being transferred */
  pipeline?: {
    /** unique identifier of pipeline */
    id?: string
  }
  /** Previous owner of the pipeline. */
  previous_owner?: {
    /** unique identifier of a pipeline owner */
    id: string
    /** type of pipeline owner */
    type: string
  } | null
  /** New owner of the pipeline. */
  new_owner?: {
    /** unique identifier of a pipeline owner */
    id: string
    /** type of pipeline owner */
    type: string
  } | null
}

/** Create a new pipeline transfer. */
export interface PipelineTransferCreateOpts {
  /** The pipeline to transfer */
  pipeline: {
    /** unique identifier of pipeline */
    id?: string
  }
  /** New pipeline owner */
  new_owner: {
    /** unique identifier of a pipeline owner */
    id?: string
    /** type of pipeline owner */
    type?: string
  }
}

/** A pipeline allows grouping of apps into different stages. */
export interface Pipeline {
  /** when pipeline was created */
  created_at?: string
  /** unique identifier of pipeline */
  id?: string
  /** name of pipeline */
  name?: string
  /** Owner of a pipeline. */
  owner?: {
    /** unique identifier of a pipeline owner */
    id: string
    /** type of pipeline owner */
    type: string
  } | null
  /** when pipeline was updated */
  updated_at?: string
  /** the generation of the Heroku platform for this pipeline */
  generation?: {
    /** unique identifier of the generation of the Heroku platform for this pipeline */
    id?: string
    /** unique name of the generation of the Heroku platform for this pipeline */
    name?: string
  }
}

/** Create a new pipeline. */
export interface PipelineCreateOpts {
  /** name of pipeline */
  name: string
  /** Owner of a pipeline. */
  owner?: {
    /** unique identifier of a pipeline owner */
    id: string
    /** type of pipeline owner */
    type: string
  } | null
}

/** Update an existing pipeline. */
export interface PipelineUpdateOpts {
  /** name of pipeline */
  name?: string
}

/** Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication. */
export interface Plan {
  /** identity of add-on service */
  addon_service?: {
    /** unique identifier of this add-on-service */
    id?: string
    /** unique name of this add-on-service */
    name?: string
  }
  /** when plan was created */
  created_at?: string
  /** the compliance regimes applied to an add-on plan */
  compliance?: Array<'HIPAA' | 'PCI'> | null
  /** whether this plan is the default for its add-on service */
  default?: boolean
  /** description of plan */
  description?: string
  /** human readable name of the add-on plan */
  human_name?: string
  /** unique identifier of this plan */
  id?: string
  /** whether this plan is installable to a Private Spaces app */
  installable_inside_private_network?: boolean
  /** whether this plan is installable to a Common Runtime app */
  installable_outside_private_network?: boolean
  /** unique name of this plan */
  name?: string
  /** price */
  price?: {
    /** price in cents per unit of plan */
    cents?: number
    /** price is negotiated in a contract outside of monthly add-on billing */
    contract?: boolean
    /** whether this plan is billed per use */
    metered?: boolean
    /** unit of price for plan */
    unit?: string
  }
  /** whether this plan is the default for apps in Private Spaces */
  space_default?: boolean
  /** release status for plan */
  state?: string
  /** when plan was updated */
  updated_at?: string
  /** whether this plan is publicly visible */
  visible?: boolean
}

/** Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit. */
export interface RateLimit {
  /** allowed requests remaining in current interval */
  remaining?: number
}

/** A region represents a geographic location in which your application may run. */
export interface Region {
  /** country where the region exists */
  country?: string
  /** when region was created */
  created_at?: string
  /** description of region */
  description?: string
  /** unique identifier of region */
  id?: string
  /** area in the country where the region exists */
  locale?: string
  /** unique name of region */
  name?: string
  /** whether or not region is available for creating a Private Space */
  private_capable?: boolean
  /** provider of underlying substrate */
  provider?: {
    /** name of provider */
    name?: string
    /** region name used by provider */
    region?: 'ap-south-1' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'eu-central-1' | 'eu-west-2' | 'ap-northeast-2' | 'ap-northeast-1' | 'us-east-1' | 'sa-east-1' | 'us-west-1' | 'us-west-2' | 'ca-central-1'
  }
  /** when region was updated */
  updated_at?: string
}

/** A release represents a combination of code, config vars and add-ons for an app on Heroku. */
export interface Release {
  /** add-on plans installed on the app for this release */
  addon_plan_names?: Array<string>
  /** build artifacts for the release */
  artifacts?: Array<{
    /** type of artifact */
    type?: string
    id?: string
  }>
  /** app involved in the release */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when release was created */
  created_at?: string
  /** description of changes in this release */
  description?: string
  /** unique identifier of release */
  id?: string
  /** when release was updated */
  updated_at?: string
  /** OCI image running in this release */
  oci_image?: {
    /** unique identifier of the OCI image */
    id?: string
  } | null
  /** slug running in this release. Not applicable to apps using Cloud Native Buildpacks. */
  slug?: {
    /** unique identifier of slug */
    id?: string
  } | null
  /** current status of the release */
  status?: 'expired' | 'failed' | 'pending' | 'succeeded'
  /** user that created the release */
  user?: {
    /** unique identifier of an account */
    id?: string
    /** unique email address of account */
    email?: string
  }
  /** unique version assigned to the release */
  version?: number
  /** indicates if this release is the current one for the app */
  current?: boolean
  /** URL that the release command output streams to. The stream is available as either `text/plain` or `text/event-stream`. Prepare clients to handle disconnects and to resume the stream by sending a `Range` header for `text/plain` or a `Last-Event-Id` header for `text/event-stream`. */
  output_stream_url?: string | null
  /** indicates if this release is eligible for rollback */
  eligible_for_rollback?: boolean
}

/** Create new release. */
export interface ReleaseCreateOpts {
  /** description of changes in this release */
  description?: string
  oci_image?: string
  slug?: string
}

/** Rollback to an existing release. */
export interface ReleaseRollbackOpts {
  /** unique identifier of release */
  release: string
}

/** An ephemeral app to review a set of changes */
export interface ReviewApp {
  /** the Heroku app associated to this review app */
  app?: {
    /** unique identifier of app */
    id?: string
  } | null
  /** the app setup for this review app */
  app_setup?: {
    /** unique identifier of app setup */
    id?: string
  } | null
  /** the branch of the repository which the review app is based on */
  branch?: string
  /** when test run was created */
  created_at?: string
  /** unique identifier of the review app */
  id?: string
  /** the pipeline which this review app belongs to */
  pipeline?: {
    /** unique identifier of pipeline */
    id?: string
  }
  /** current state of the review app */
  status?: 'pending' | 'creating' | 'created' | 'deleting' | 'deleted' | 'errored'
  /** when review app was updated */
  updated_at?: string
  /** The user who created the review app */
  creator?: Record<string, unknown>
  /** wait for ci before building the app */
  wait_for_ci?: boolean
  /** error message from creating the review app if any */
  error_status?: string | null
  /** message from creating the review app if any */
  message?: string | null
  fork_repo?: {
    /** repository id of the fork the branch resides in */
    id?: number | null
  } | null
  /** pull request number the review app is built for */
  pr_number?: number | null
}

/** Create a new review app */
export interface ReviewAppCreateOpts {
  /** the branch of the repository which the review app is based on */
  branch: string
  /** pull request number the review app is built for */
  pr_number?: number | null
  /** unique identifier of pipeline */
  pipeline: string
  /** The download location for the review app's source code */
  source_blob: {
    /** URL where gzipped tar archive of source code for build was downloaded. */
    url?: string
    /** The version number (or SHA) of the code to build. */
    version?: string | null
  }
  /** hash of config vars */
  environment?: Record<string, string | null> | null
  /** repository id of the fork the branch resides in */
  fork_repo_id?: number | null
}

/** Review apps can be configured for pipelines. */
export interface ReviewAppConfig {
  repo?: {
    /** repository id */
    id?: number
  }
  /** enable automatic review apps for pull requests */
  automatic_review_apps?: boolean
  /** the deploy target for the review apps of a pipeline */
  deploy_target?: {
    /** unique identifier of deploy target */
    id: string
    /** type of deploy target */
    type: string
  } | null
  /** automatically destroy review apps when they haven't been deployed for a number of days */
  destroy_stale_apps?: boolean
  /** number of days without a deployment after which to consider a review app stale */
  stale_days?: number
  /** unique identifier of pipeline */
  pipeline_id?: string
  /** If true, review apps are created only when CI passes */
  wait_for_ci?: boolean
  /** A unique prefix that will be used to create review app names */
  base_name?: string | null
}

/** Enable review apps for a pipeline */
export interface ReviewAppConfigEnableOpts {
  /** repository name */
  repo: string
  /** enable automatic review apps for pull requests */
  automatic_review_apps?: boolean
  /** automatically destroy review apps when they haven't been deployed for a number of days */
  destroy_stale_apps?: boolean
  /** number of days without a deployment after which to consider a review app stale */
  stale_days?: number
  /** the deploy target for the review apps of a pipeline */
  deploy_target?: {
    /** unique identifier of deploy target */
    id: string
    /** type of deploy target */
    type: string
  } | null
  /** If true, review apps are created only when CI passes */
  wait_for_ci?: boolean
  /** A unique prefix that will be used to create review app names */
  base_name?: string | null
}

/** Update review app configuration for a pipeline */
export interface ReviewAppConfigUpdateOpts {
  /** enable automatic review apps for pull requests */
  automatic_review_apps?: boolean
  /** automatically destroy review apps when they haven't been deployed for a number of days */
  destroy_stale_apps?: boolean
  /** number of days without a deployment after which to consider a review app stale */
  stale_days?: number
  /** the deploy target for the review apps of a pipeline */
  deploy_target?: {
    /** unique identifier of deploy target */
    id: string
    /** type of deploy target */
    type: string
  } | null
  /** If true, review apps are created only when CI passes */
  wait_for_ci?: boolean
  /** A unique prefix that will be used to create review app names */
  base_name?: string | null
}

/** A slug is a snapshot of your application code that is ready to run on the platform. */
export interface Slug {
  /** pointer to the url where clients can fetch or store the actual release binary */
  blob?: {
    /** method to be used to interact with the slug blob */
    method?: string
    /** URL to interact with the slug blob */
    url?: string
  }
  /** description from buildpack of slug */
  buildpack_provided_description?: string | null
  /** an optional checksum of the slug for verifying its integrity */
  checksum?: string | null
  /** identification of the code with your version control system (eg: SHA of the git HEAD) */
  commit?: string | null
  /** an optional description of the provided commit */
  commit_description?: string | null
  /** when slug was created */
  created_at?: string
  /** unique identifier of slug */
  id?: string
  /** hash mapping process type names to their respective command */
  process_types?: Record<string, string>
  /** size of slug, in bytes */
  size?: number | null
  /** identity of slug stack */
  stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** when slug was updated */
  updated_at?: string
  /** when slug was deleted */
  deleted_at?: string | null
}

/** Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs). */
export interface SlugCreateOpts {
  /** description from buildpack of slug */
  buildpack_provided_description?: string | null
  /** an optional checksum of the slug for verifying its integrity */
  checksum?: string | null
  /** identification of the code with your version control system (eg: SHA of the git HEAD) */
  commit?: string | null
  /** an optional description of the provided commit */
  commit_description?: string | null
  /** hash mapping process type names to their respective command */
  process_types: Record<string, string>
  stack?: string
}

/** SMS numbers are used for recovery on accounts with two-factor authentication enabled. */
export interface SmsNumber {
  /** SMS number of account */
  sms_number?: string | null
}

/** SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app. */
export interface SniEndpoint {
  /** raw contents of the public certificate chain (eg: .crt or .pem file) */
  certificate_chain?: string
  /** when endpoint was created */
  created_at?: string
  /** unique identifier of this SNI endpoint */
  id?: string
  /** unique name for SNI endpoint */
  name?: string
  /** when SNI endpoint was updated */
  updated_at?: string
  /** unique name for SSL certificate */
  display_name?: string | null
  /** domains associated with this SSL certificate */
  domains?: Array<string>
  /** application that this SSL certificate is on */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** certificate provided by this endpoint */
  ssl_cert?: {
    'ca_signed?'?: boolean
    cert_domains?: unknown[]
    expires_at?: string
    issuer?: string
    'self_signed?'?: boolean
    starts_at?: string
    subject?: string
    /** unique identifier of this SSL certificate */
    id?: string
  }
}

/** Create a new SNI endpoint. */
export interface SniEndpointCreateOpts {
  /** raw contents of the public certificate chain (eg: .crt or .pem file) */
  certificate_chain: string
  /** contents of the private key (eg .key file) */
  private_key: string
}

/** Update an existing SNI endpoint. */
export interface SniEndpointUpdateOpts {
  /** raw contents of the public certificate chain (eg: .crt or .pem file) */
  certificate_chain: string
  /** contents of the private key (eg .key file) */
  private_key: string
}

/** A source is a location for uploading and downloading an application's source code. */
export interface Source {
  /** pointer to the URL where clients can fetch or store the source */
  source_blob?: {
    /** URL to download the source */
    get_url?: string
    /** URL to upload the source */
    put_url?: string
  }
}

/** Space access represents the permissions a particular user has on a particular space. */
export interface SpaceAppAccess {
  /** space user belongs to */
  space?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when space was created */
  created_at?: string
  /** unique identifier of space */
  id?: string
  /** user space permissions */
  permissions?: Array<{
    description?: string
    name?: string
  }>
  /** when space was updated */
  updated_at?: string
  /** identity of user account */
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
}

/** Update an existing user's set of permissions on a space. */
export interface SpaceAppAccessUpdateOpts {
  permissions: Array<{
    name?: string
  }>
}

/** Network address translation (NAT) for stable outbound IP addresses from a space */
export interface SpaceNat {
  /** when network address translation for a space was created */
  created_at?: string
  /** potential IPs from which outbound network traffic will originate */
  sources?: Array<string>
  /** availability of network address translation for a space */
  state?: 'disabled' | 'updating' | 'enabled'
  /** when network address translation for a space was updated */
  updated_at?: string
}

/** Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery. */
export interface SpaceTopology {
  /** version of the space topology payload */
  version?: number
  /** The apps within this space */
  apps?: Array<{
    /** unique identifier of app */
    id?: string
    domains?: unknown[]
    /** formations for application */
    formation?: Array<{
      /** unique identifier of this process type */
      id?: string
      /** Name of process type */
      process_type?: string
      /** Current dynos for application */
      dynos?: Array<{
        /** unique identifier of this dyno */
        id?: string
        /** process number, e.g. 1 in web.1 */
        number?: number
        /** RFC1918 Address of Dyno */
        private_ip?: string
        /** localspace hostname of resource */
        hostname?: string
      }>
    }>
  }>
}

/** Transfer spaces between enterprise teams with the same Enterprise Account. */
export type SpaceTransfer = Record<string, unknown>

/** Transfer space between enterprise teams */
export interface SpaceTransferTransferOpts {
  /** unique name of team */
  new_owner: string
}

/** A space is an isolated, highly available, secure app execution environment. */
export interface Space {
  /** when space was created */
  created_at?: string
  /** unique identifier of space */
  id?: string
  /** unique name of space */
  name?: string
  /** organization that owns this space */
  organization?: {
    /** unique name of team */
    name?: string
  }
  /** team that owns this space */
  team?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  }
  /** identity of space region */
  region?: {
    /** unique identifier of region */
    id?: string
    /** unique name of region */
    name?: string
  }
  /** true if this space has shield enabled */
  shield?: boolean
  /** availability of this space */
  state?: 'allocating' | 'allocated' | 'deleting'
  /** when space was updated */
  updated_at?: string
  /** The RFC-1918 CIDR the Private Space will use. It must be a /16 in 10.0.0.0/8, 172.16.0.0/12 or 192.168.0.0/16 */
  cidr?: string
  /** The RFC-1918 CIDR that the Private Space will use for the Heroku-managed peering connection that's automatically created when using Heroku Data add-ons. It must be between a /16 and a /20 */
  data_cidr?: string
  /** generation for space */
  generation?: string
}

/** Update an existing space. */
export interface SpaceUpdateOpts {
  /** unique name of space */
  name?: string
}

/** Create a new space. */
export interface SpaceCreateOpts {
  /** unique name of space */
  name: string
  /** unique name of team */
  team: string
  region?: string
  /** true if this space has shield enabled */
  shield?: boolean
  /** The RFC-1918 CIDR the Private Space will use. It must be a /16 in 10.0.0.0/8, 172.16.0.0/12 or 192.168.0.0/16 */
  cidr?: string
  /** The RFC-1918 CIDR that the Private Space will use for the Heroku-managed peering connection that's automatically created when using Heroku Data add-ons. It must be between a /16 and a /20 */
  data_cidr?: string
  /** URL to which all apps will drain logs. Only settable during space creation and enables direct logging. Must use HTTPS. */
  log_drain_url?: string
  /** channel to create the space on */
  channel_name?: string
  /** generation for space */
  generation?: string
  /** runtime features for the space */
  features?: unknown[]
  /** supported api features for the space */
  supported_features?: unknown[]
  /** EKS version for the space infrastructure */
  eks_version?: string
}

/** Stacks are the different application execution environments available in the Heroku platform. */
export interface Stack {
  /** indicates this stack is the default for new apps */
  default?: boolean
  /** when stack was introduced */
  created_at?: string
  /** unique identifier of stack */
  id?: string
  /** unique name of stack */
  name?: string
  /** availability of this stack: beta, deprecated or public */
  state?: string
  /** when stack was last modified */
  updated_at?: string
}

export type TeamAddOn = Record<string, unknown>

/** A team collaborator represents an account that has been given access to a team app on Heroku. */
export interface TeamAppCollaborator {
  /** app collaborator belongs to */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** when collaborator was created */
  created_at?: string
  /** unique identifier of collaborator */
  id?: string
  /** array of permissions for the collaborator (only applicable if the app is on a team) */
  permissions?: Array<TeamAppPermission>
  /** role in the team */
  role?: 'admin' | 'collaborator' | 'member' | 'owner' | null
  /** when collaborator was updated */
  updated_at?: string
  /** identity of collaborated account */
  user?: {
    /** unique email address of account */
    email?: string
    /** whether the user is federated and belongs to an Identity Provider */
    federated?: boolean
    /** unique identifier of an account */
    id?: string
  }
}

/** Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team. */
export interface TeamAppCollaboratorCreateOpts {
  /** An array of permissions to give to the collaborator. */
  permissions?: Array<string>
  /** whether to suppress email invitation when creating collaborator */
  silent?: boolean
  user: string | '~'
}

/** Update an existing collaborator from a team app. */
export interface TeamAppCollaboratorUpdateOpts {
  /** An array of permissions to give to the collaborator. */
  permissions: Array<string>
}

/** A team app permission is a behavior that is assigned to a user in a team app. */
export interface TeamAppPermission {
  /** The name of the app permission. */
  name?: string
  /** A description of what the app permission allows. */
  description?: string
}

/** A team app encapsulates the team specific functionality of Heroku apps. */
export interface TeamApp {
  /** when app was archived */
  archived_at?: string | null
  /** name of the image used for the base layers of the OCI image */
  base_image_name?: string | null
  /** identity of the stack that will be used for new builds */
  build_stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** description from buildpack of app */
  buildpack_provided_description?: string | null
  /** buildpacks of the OCI image */
  buildpacks?: Array<{
    /** identifier of the buildpack */
    id?: string
    /** version of the buildpack */
    version?: string
    /** homepage of the buildpack */
    homepage?: string
  }> | null
  /** current build architecture for the app */
  current_build_architecture?: unknown[]
  /** when app was created */
  created_at?: string
  /** the generation of the app */
  generation?: string
  /** git repo URL of app */
  git_url?: string
  /** unique identifier of app */
  id?: string
  /** describes whether a Private Spaces app is externally routable or not */
  internal_routing?: boolean | null
  /** is the current member a collaborator on this app. */
  joined?: boolean
  /** are other team members forbidden from joining this app. */
  locked?: boolean
  /** maintenance status of app */
  maintenance?: boolean
  /** unique name of app */
  name?: string
  /** team that owns this app */
  team?: {
    /** unique name of team */
    name?: string
  } | null
  /** identity of app owner */
  owner?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  } | null
  /** identity of app region */
  region?: {
    /** unique identifier of region */
    id?: string
    /** unique name of region */
    name?: string
  }
  /** when app was released */
  released_at?: string | null
  /** git repo size in bytes of app */
  repo_size?: number | null
  /** slug size in bytes of app */
  slug_size?: number | null
  /** identity of space */
  space?: {
    /** unique identifier of space */
    id?: string
    /** unique name of space */
    name?: string
  } | null
  /** identity of app stack */
  stack?: {
    /** unique identifier of stack */
    id?: string
    /** unique name of stack */
    name?: string
  }
  /** when app was updated */
  updated_at?: string
  /** web URL of app */
  web_url?: string | null
}

/** Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set. */
export interface TeamAppCreateOpts {
  /** are other team members forbidden from joining this app. */
  locked?: boolean
  /** unique name of app */
  name?: string
  /** unique name of team */
  team?: string
  /** force creation of the app in the user account even if a default team is set. */
  personal?: boolean
  /** unique name of region */
  region?: string
  /** unique name of space */
  space?: string
  /** unique name of stack */
  stack?: string
  /** describes whether a Private Spaces app is externally routable or not */
  internal_routing?: boolean | null
}

/** Lock or unlock a team app. */
export interface TeamAppUpdateLockedOpts {
  /** are other team members forbidden from joining this app. */
  locked: boolean
}

/** Transfer an existing team app to another Heroku account. */
export interface TeamAppTransferToAccountOpts {
  owner: string | '~'
}

/** Transfer an existing team app to another team. */
export interface TeamAppTransferToTeamOpts {
  /** unique name of team */
  owner: string
}

/** Usage for an enterprise team at a daily resolution. */
export interface TeamDailyUsage {
  /** total add-on credits used */
  addons?: number
  /** app usage in the team */
  apps?: Array<{
    /** total add-on credits used */
    addons?: number
    /** unique name of app */
    app_name?: string
    /** total add-on credits used for first party add-ons */
    data?: number
    /** dynos used */
    dynos?: number
    /** total add-on credits used for third party add-ons */
    partner?: number
  }>
  /** total add-on credits used for first party add-ons */
  data?: number
  /** date of the usage */
  date?: string
  /** dynos used */
  dynos?: number
  /** team identifier */
  id?: string
  /** name of the team */
  name?: string
  /** total add-on credits used for third party add-ons */
  partner?: number
  /** space credits used */
  space?: number
}

/**
 * Retrieves usage for an enterprise team for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
 * 
 */
export interface TeamDailyUsageInfoOpts {
  /** range start date */
  start: string
  /** range end date */
  end?: string
}

/** A Heroku team becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent teams if their invoices remain unpaid. */
export interface TeamDelinquency {
  /** scheduled time of when we will suspend your team due to delinquency */
  scheduled_suspension_time?: string | null
  /** scheduled time of when we will delete your team due to delinquency */
  scheduled_deletion_time?: string | null
}

/** A team feature represents a feature enabled on a team account. */
export interface TeamFeature {
  /** when team feature was created */
  created_at?: string
  /** description of team feature */
  description?: string
  /** documentation URL of team feature */
  doc_url?: string
  /** whether or not team feature has been enabled */
  enabled?: boolean
  /** unique identifier of team feature */
  id?: string
  /** unique name of team feature */
  name?: string
  /** state of team feature */
  state?: string
  /** when team feature was updated */
  updated_at?: string
  /** user readable feature name */
  display_name?: string
  /** e-mail to send feedback about the feature */
  feedback_email?: string
}

/** A team invitation represents an invite to a team. */
export interface TeamInvitation {
  /** when invitation was created */
  created_at?: string
  /** unique identifier of an invitation */
  id?: string
  invited_by?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
    /** full name of the account owner */
    name?: string | null
  }
  team?: {
    /** unique identifier of team */
    id?: string
    /** unique name of team */
    name?: string
  }
  /** role in the team */
  role?: 'admin' | 'collaborator' | 'member' | 'owner' | null
  /** when invitation was updated */
  updated_at?: string
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
    /** full name of the account owner */
    name?: string | null
  }
}

/** Create Team Invitation */
export interface TeamInvitationCreateOpts {
  /** unique email address of account */
  email: string
  /** role in the team */
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
}

/** A Team Invoice is an itemized bill of goods for a team which includes pricing and charges. */
export interface TeamInvoice {
  /** total add-ons charges in on this invoice */
  addons_total?: number
  /** total database charges on this invoice */
  database_total?: number
  /** total charges on this invoice */
  charges_total?: number
  /** when invoice was created */
  created_at?: string
  /** total credits on this invoice */
  credits_total?: number
  /** total amount of dyno units consumed across dyno types. */
  dyno_units?: number
  /** unique identifier of this invoice */
  id?: string
  /** human readable invoice number */
  number?: number
  /** status of the invoice payment */
  payment_status?: string
  /** the ending date that the invoice covers */
  period_end?: string
  /** the starting date that this invoice covers */
  period_start?: string
  /** total platform charges on this invoice */
  platform_total?: number
  /** payment status for this invoice (pending, successful, failed) */
  state?: number
  /** combined total of charges and credits on this invoice */
  total?: number
  /** when invoice was updated */
  updated_at?: string
  /** The total amount of hours consumed across dyno types. */
  weighted_dyno_hours?: number
}

/** A team member is an individual with access to a team. */
export interface TeamMember {
  /** when the membership record was created */
  created_at: string
  /** email address of the team member */
  email: string
  /** whether the user is federated and belongs to an Identity Provider */
  federated: boolean
  /** unique identifier of the team member */
  id?: string
  /** Identity Provider information the member is federated with */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** name of the identity provider */
    name?: string
    /** whether the identity_provider information is redacted or not */
    redacted?: boolean
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
  /** role in the team */
  role?: 'admin' | 'collaborator' | 'member' | 'owner' | null
  /** whether the team member has two factor authentication enabled */
  two_factor_authentication?: boolean
  /** when the membership record was updated */
  updated_at: string
  /** user information for the membership */
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
    /** full name of the account owner */
    name?: string | null
  }
}

/** Create a new team member, or update their role. */
export interface TeamMemberCreateOrUpdateOpts {
  /** email address of the team member */
  email: string
  /** whether the user is federated and belongs to an Identity Provider */
  federated?: boolean
  /** role in the team */
  role: 'admin' | 'viewer' | 'member'
}

/** Create a new team member. */
export interface TeamMemberCreateOpts {
  /** email address of the team member */
  email: string
  /** whether the user is federated and belongs to an Identity Provider */
  federated?: boolean
  /** role in the team */
  role: 'admin' | 'viewer' | 'member'
}

/** Update a team member. */
export interface TeamMemberUpdateOpts {
  /** email address of the team member */
  email: string
  /** whether the user is federated and belongs to an Identity Provider */
  federated?: boolean
  /** role in the team */
  role: 'admin' | 'viewer' | 'member'
}

/** Usage for an enterprise team at a monthly resolution. */
export interface TeamMonthlyUsage {
  /** total add-on credits used */
  addons?: number
  /** app usage in the team */
  apps?: Array<{
    /** total add-on credits used */
    addons?: number
    /** unique name of app */
    app_name?: string
    /** total add-on credits used for first party add-ons */
    data?: number
    /** dynos used */
    dynos?: number
    /** total add-on credits used for third party add-ons */
    partner?: number
  }>
  /** max connect rows synced */
  connect?: number
  /** total add-on credits used for first party add-ons */
  data?: number
  /** dynos used */
  dynos?: number
  /** team identifier */
  id?: string
  /** year and month of the usage */
  month?: string
  /** name of the team */
  name?: string
  /** total add-on credits used for third party add-ons */
  partner?: number
  /** space credits used */
  space?: number
}

/**
 * Retrieves usage for an enterprise team for a range of months. Start and end dates can be specified as query parameters using the date, YYYY-MM. If no end date is specified, one month of usage is returned. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
 * 
 */
export interface TeamMonthlyUsageInfoOpts {
  /** range start date */
  start: string
  /** range end date */
  end?: string
}

/** Tracks a Team's Preferences */
export interface TeamPreferences {
  /** The default permission used when adding new members to the team */
  'default-permission'?: 'admin' | 'member' | 'viewer' | null
  /** Whether add-on service rules should be applied to add-on installations */
  'addons-controls'?: boolean | null
}

/** Update Team Preferences */
export interface TeamPreferencesUpdateOpts {
  /** Whether add-on service rules should be applied to add-on installations */
  'addons-controls'?: boolean | null
}

/** A space is an isolated, highly available, secure app execution environment. */
export type TeamSpace = Record<string, unknown>

/** Teams allow you to manage access to a shared group of applications and other resources. */
export interface Team {
  /** unique identifier of team */
  id?: string
  /** when the team was created */
  created_at?: string
  /** whether charges incurred by the team are paid by credit card. */
  credit_card_collections?: boolean
  /** whether to use this team when none is specified */
  default?: boolean
  enterprise_account?: {
    /** unique identifier of the enterprise account */
    id?: string
    /** unique name of the enterprise account */
    name?: string
  } | null
  /** Identity Provider associated with the Team */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** user-friendly unique identifier for this identity provider */
    name?: string
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
  /** upper limit of members allowed in a team. */
  membership_limit?: number | null
  /** Time when team was consented into new pipeline costs */
  pipeline_cost_consent_at?: string | null
  /** Email of team user that consented to new pipeline costs */
  pipeline_cost_consent_user_email?: string | null
  /** unique name of team */
  name?: string
  /** whether the team is provisioned licenses by salesforce. */
  provisioned_licenses?: boolean
  /** role in the team */
  role?: 'admin' | 'collaborator' | 'member' | 'owner' | null
  /** type of team. */
  type?: 'enterprise' | 'team'
  /** when the team was updated */
  updated_at?: string
}

/** Update team properties. */
export interface TeamUpdateOpts {
  /** whether to use this team when none is specified */
  default?: boolean
  /** unique name of team */
  name?: string
}

/** Create a new team. */
export interface TeamCreateOpts {
  /** unique name of team */
  name: string
  /** street address line 1 */
  address_1?: string
  /** street address line 2 */
  address_2?: string | null
  /** encrypted card number of payment method */
  card_number?: string | null
  /** city */
  city?: string
  /** country */
  country?: string
  /** card verification value */
  cvv?: string | null
  /** expiration month */
  expiration_month?: string | null
  /** expiration year */
  expiration_year?: string | null
  /** the first name for payment method */
  first_name?: string
  /** the last name for payment method */
  last_name?: string
  /** metadata */
  other?: string | null
  /** postal code */
  postal_code?: string
  /** state */
  state?: string
  /** Nonce generated by Braintree hosted fields form */
  nonce?: string | null
  /** Device data string generated by the client */
  device_data?: string | null
}

/** Create a team in an enterprise account. */
export interface TeamCreateInEnterpriseAccountOpts {
  /** unique name of team */
  name: string
}

/** A telemetry drain forwards OpenTelemetry traces, metrics, and logs to your own consumer. For Fir-generation apps only. */
export interface TelemetryDrain {
  /** when the telemetry drain was created */
  created_at?: string
  /** unique identifier of telemetry drain */
  id?: string
  /** entity that owns this telemetry drain */
  owner?: {
    /** unique identifier of owner */
    id: string
    /** type of owner */
    type: 'app' | 'space'
  }
  /** OpenTelemetry signals to send to telemetry drain */
  signals?: Array<'traces' | 'metrics' | 'logs'>
  /** OpenTelemetry exporter configuration */
  exporter?: {
    /** the transport type to be used for your OpenTelemetry consumer */
    type: 'otlphttp' | 'otlp'
    /** URI of your OpenTelemetry consumer */
    endpoint: string
    /** JSON headers to send to your OpenTelemetry consumer */
    headers?: Record<string, string>
  }
  /** when telemetry drain was last updated */
  updated_at?: string
}

/** Create a telemetry drain. */
export interface TelemetryDrainCreateOpts {
  /** entity that owns this telemetry drain */
  owner: {
    /** unique identifier of owner */
    id: string
    /** type of owner */
    type: 'app' | 'space'
  }
  /** OpenTelemetry signals to send to telemetry drain */
  signals: Array<'traces' | 'metrics' | 'logs'>
  /** OpenTelemetry exporter configuration */
  exporter: {
    /** the transport type to be used for your OpenTelemetry consumer */
    type: 'otlphttp' | 'otlp'
    /** URI of your OpenTelemetry consumer */
    endpoint: string
    /** JSON headers to send to your OpenTelemetry consumer */
    headers?: Record<string, string>
  }
}

/** Update a telemetry drain. */
export interface TelemetryDrainUpdateOpts {
  /** OpenTelemetry signals to send to telemetry drain */
  signals?: Array<'traces' | 'metrics' | 'logs'>
  /** OpenTelemetry exporter configuration */
  exporter?: {
    /** the transport type to be used for your OpenTelemetry consumer */
    type: 'otlphttp' | 'otlp'
    /** URI of your OpenTelemetry consumer */
    endpoint: string
    /** JSON headers to send to your OpenTelemetry consumer */
    headers?: Record<string, string>
  }
}

/** A single test case belonging to a test run */
export interface TestCase {
  /** unique identifier of a test case */
  id?: string
  /** when test case was created */
  created_at?: string
  /** when test case was updated */
  updated_at?: string
  /** description of the test case */
  description?: string
  /** meta information about the test case */
  diagnostic?: string
  /** special note about the test case e.g. skipped, todo */
  directive?: string
  /** whether the test case was successful */
  passed?: boolean
  /** the test number */
  number?: number
  /** the test node which executed this test case */
  test_node?: {
    id?: string
  }
  /** the test run which owns this test case */
  test_run?: {
    id?: string
  }
}

/** A single test node belonging to a test run */
export interface TestNode {
  /** when test node was created */
  created_at?: string
  /** the dyno which belongs to this test node */
  dyno?: {
    id?: string
    /** a URL to stream output from for debug runs or null for non-debug runs */
    attach_url?: string | null
  } | null
  /** the status of the test run when the error occured */
  error_status?: string | null
  /** the exit code of the test script */
  exit_code?: number | null
  id?: string
  /** The index of the test node */
  index?: number
  /** human friendly message indicating reason for an error */
  message?: string | null
  /** the streaming output for the test node */
  output_stream_url?: string
  /** the pipeline which owns this test node */
  pipeline?: {
    id?: string
  }
  /** the streaming test setup output for the test node */
  setup_stream_url?: string
  /** current state of the test run */
  status?: 'pending' | 'cancelled' | 'creating' | 'building' | 'running' | 'succeeded' | 'failed' | 'errored' | 'debugging'
  /** when test node was updated */
  updated_at?: string
  /** the test run which owns this test node */
  test_run?: {
    id?: string
  }
}

/** An execution or trial of one or more tests */
export interface TestRun {
  /** the email of the actor triggering the test run */
  actor_email?: string
  /** whether the test was run with an empty cache */
  clear_cache?: boolean | null
  /** the branch of the repository that the test run concerns */
  commit_branch?: string
  /** the message for the commit under test */
  commit_message?: string
  /** the SHA hash of the commit under test */
  commit_sha?: string
  /** whether the test run was started for interactive debugging */
  debug?: boolean
  /** the app setup for the test run */
  app_setup?: Record<string, unknown> | null
  /** when test run was created */
  created_at?: string
  /** the type of dynos used for this test-run */
  dyno?: {
    /** dyno size */
    size?: string
  } | null
  /** unique identifier of a test run */
  id?: string
  /** human friendly message indicating reason for an error */
  message?: string | null
  /** the auto incrementing test run number */
  number?: number
  /** the team that owns this test-run */
  organization?: {
    /** unique name of team */
    name?: string
  } | null
  /** the pipeline which owns this test-run */
  pipeline?: {
    id?: string
  }
  /** current state of the test run */
  status?: 'pending' | 'cancelled' | 'creating' | 'building' | 'running' | 'succeeded' | 'failed' | 'errored' | 'debugging'
  /** The download location for the source code to be tested */
  source_blob_url?: string
  /** when test-run was updated */
  updated_at?: string
  /** An account represents an individual signed up to use the Heroku platform. */
  user?: Account
  /** human friently warning emitted during the test run */
  warning_message?: string | null
}

/** Create a new test-run. */
export interface TestRunCreateOpts {
  /** the branch of the repository that the test run concerns */
  commit_branch: string
  /** the message for the commit under test */
  commit_message: string
  /** the SHA hash of the commit under test */
  commit_sha: string
  /** whether the test run was started for interactive debugging */
  debug?: boolean
  organization?: string
  pipeline: string
  /** The download location for the source code to be tested */
  source_blob_url: string
}

/** Update a test-run's status. */
export interface TestRunUpdateOpts {
  /** current state of the test run */
  status: 'pending' | 'cancelled' | 'creating' | 'building' | 'running' | 'succeeded' | 'failed' | 'errored' | 'debugging'
  /** human friendly message indicating reason for an error */
  message: string | null
}

/** Tracks a user's preferences and message dismissals */
export interface UserPreferences {
  /** User's default timezone */
  timezone?: string | null
  /** User's default team */
  'default-organization'?: string | null
  /** Whether the user has dismissed the GitHub link banner */
  'dismissed-github-banner'?: boolean | null
  /** Whether the user has dismissed the getting started banner */
  'dismissed-getting-started'?: boolean | null
  /** Whether the user has dismissed the Organization Access Controls banner */
  'dismissed-org-access-controls'?: boolean | null
  /** Whether the user has dismissed the Organization Wizard */
  'dismissed-org-wizard-notification'?: boolean | null
  /** Whether the user has dismissed the Pipelines banner */
  'dismissed-pipelines-banner'?: boolean | null
  /** Whether the user has dismissed the GitHub banner on a pipeline overview */
  'dismissed-pipelines-github-banner'?: boolean | null
  /** Which pipeline uuids the user has dismissed the GitHub banner for */
  'dismissed-pipelines-github-banners'?: Array<string> | null
  /** Whether the user has dismissed the 2FA SMS banner */
  'dismissed-sms-banner'?: boolean | null
}

/** Update User Preferences */
export interface UserPreferencesUpdateOpts {
  /** User's default timezone */
  timezone?: string | null
  /** User's default team */
  'default-organization'?: string | null
  /** Whether the user has dismissed the GitHub link banner */
  'dismissed-github-banner'?: boolean | null
  /** Whether the user has dismissed the getting started banner */
  'dismissed-getting-started'?: boolean | null
  /** Whether the user has dismissed the Organization Access Controls banner */
  'dismissed-org-access-controls'?: boolean | null
  /** Whether the user has dismissed the Organization Wizard */
  'dismissed-org-wizard-notification'?: boolean | null
  /** Whether the user has dismissed the Pipelines banner */
  'dismissed-pipelines-banner'?: boolean | null
  /** Whether the user has dismissed the GitHub banner on a pipeline overview */
  'dismissed-pipelines-github-banner'?: boolean | null
  /** Which pipeline uuids the user has dismissed the GitHub banner for */
  'dismissed-pipelines-github-banners'?: Array<string> | null
  /** Whether the user has dismissed the 2FA SMS banner */
  'dismissed-sms-banner'?: boolean | null
}

/** [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN. */
export interface VpnConnection {
  /** VPN ID */
  id?: string
  /** VPN Name */
  name?: string
  /** Public IP of VPN customer gateway */
  public_ip?: string
  /** Routable CIDRs of VPN */
  routable_cidrs?: Array<string>
  /** CIDR Block of the Private Space */
  space_cidr_block?: string
  tunnels?: Array<{
    /** Timestamp of last status changed */
    last_status_change?: string
    /** Public IP address for the tunnel */
    ip?: string
    /** Public IP address for the customer side of the tunnel */
    customer_ip?: string
    /** Pre-shared key */
    pre_shared_key?: string
    /** Status of the tunnel */
    status?: 'UP' | 'DOWN'
    /** Details of the status */
    status_message?: string
  }>
  /** IKE Version */
  ike_version?: number
  /** Status of the VPN */
  status?: 'pending' | 'provisioning' | 'active' | 'deprovisioning' | 'failed'
  /** Details of the status */
  status_message?: string
}

/** Create a new VPN connection in a private space. */
export interface VpnConnectionCreateOpts {
  /** VPN Name */
  name: string
  /** Public IP of VPN customer gateway */
  public_ip: string
  /** Routable CIDRs of VPN */
  routable_cidrs: Array<string>
}

/** Update a VPN connection in a private space. */
export interface VpnConnectionUpdateOpts {
  /** Routable CIDRs of VPN */
  routable_cidrs: Array<string>
}

/** Add-on Single Sign-on generates URL that allows a customer to log in to an Add-on Service's web dashboard. */
export interface AddOnSso {
  /** whether this SSO request is a GET or a POST */
  method?: 'get' | 'post'
  /** URL to follow to initiate single sign-on */
  action?: string
  /** params for this request */
  params?: {
    /** unique email address of current user */
    email?: string
    /** unique identifier of current user */
    user_id?: string
    /** name of app where add-on was first attached */
    owning_app?: string
    /** current app name when SSO was requested */
    attached_app?: string
    /** timestamp used to build params as an unix epoch integer */
    timestamp?: number
    /** Base64-encoded nav data for Heroku header */
    'nav-data'?: string
    /** id of this add-on with its provider */
    id?: string
    /** token generated for this request that authenticates user */
    token?: string
    /** unique identifier of add-on */
    resource_id?: string
    /** unique token for this SSO request */
    resource_token?: string
  }
}

/** Build metadata contains the reference data for building the associated App. */
export interface BuildMetadata {
  /** App associated with this metadata */
  app?: {
    /** unique name of app */
    name?: string
    /** unique identifier of app */
    id?: string
  }
  /** URL for deleting the build cache. */
  cache_delete_url?: string
  /** URL for retrieving the latest build cache. */
  cache_get_url?: string
  /** URL for updating the latest build cache. */
  cache_put_url?: string
  /** URL for deleting this app's repo. */
  repo_delete_url?: string
  /** URL for retrieving this app's repo. */
  repo_get_url?: string
  /** URL for updating the app's repo. */
  repo_put_url?: string
}

/** A capability represents a requested capability on a resource along with whether the requesting user has that capability */
export interface Capability {
  /** name of the capability */
  capability: string
  /** id or name of the resource */
  resource_id: string | null
  /** type of the resource */
  resource_type: string
  /** whether the user has the capability on the resource_id of type resource_type */
  capable: boolean
  /** whether the given application resource is flagged as a paranoid app and will require a second factor */
  requires_second_factor?: boolean
  /** canonical id of the resource if it's present */
  resource_canonical_id?: string
}

/**
 * Request to check a list of capabilities the current user (yourself). An capability is a tuple of
 * (capability, resource_id, resource_type). The endpoint will then respond with a `capable` boolean
 * true or false for each requested capability. This boolean indicates whether the authenticated user
 * has the requested capability on the resource.
 * 
 */
export interface CapabilityCapabilitiesOpts {
  /** The list of capabilities that you want to check */
  capabilities: Array<{
    /** name of the capability */
    capability?: string
    /** id or name of the resource */
    resource_id?: string | null
    /** type of the resource */
    resource_type?: string
  }>
}

/**
 * Request to check a list of capabilities the current user (yourself). An capability is a tuple of
 * (capability, resource_id, resource_type). The endpoint will then respond with a `capable` boolean
 * true or false for each requested capability. This boolean indicates whether the authenticated user
 * has the requested capability on the resource.
 * 
 */
export interface CapabilityCapabilitiesResult {
  /** The list of capabilities for the requested resources */
  capabilities?: Array<Capability>
}

/** The Config Vars Settings endpoints enable you to view and manage the configuration provided to an app on Heroku. These endpoints are similar to /config-vars but also allow you to check which config vars you can mask, and which are currently masked. */
export interface ConfigVarsSettings {
  /** attachment that created this config var, if any */
  attachment?: {
    /** unique identifier of this add-on attachment */
    id?: string
  } | null
  /** name of the config var */
  key?: string
  /** value of the config var */
  value?: string | null
  /** indicates if the value is masked */
  masked?: boolean
  /** indicates if you can mask the value */
  masking_supported?: boolean
  /** indicates when the value was updated */
  value_updated_at?: string
}

/** Update a config var. You can update an existing config var's value by setting it again, and you can remove it by setting it to `null`. You can't unmask a masked config var. */
export interface ConfigVarsSettingsUpdateOpts {
  /** An array of config vars to be updated. */
  config?: Array<unknown>
}

/** Run processes inside existing dynos. */
export interface DynoProcesses {
  /** a URL to stream output from for attached processes or null for non-attached processes */
  attach_url?: string | null
}

/** Create a new process in an existing dyno. */
export interface DynoProcessesCreateOpts {
  /** command used to start this process */
  command: string
  /** custom environment to add to the dyno config vars */
  env?: Record<string, string>
}

/** Contains a set of information useful for identifying a user and the type of access this user is allowed to have. */
export interface GatewayToken {
  /** Token issuer */
  iss?: string
  /** Integer representation of the timestamp the token was issued at */
  iat?: number
  /** Integer representation of the timestamp the token should expire at */
  exp?: number
  /** Unique identifier of the subject */
  sub?: string
  /** Unique identifier of the user */
  user_id?: string
  /** Email address of the user */
  user_email?: string
  /** Unique identifier of the OAuth authirization used in the token */
  authorization_id?: string | null
  /** Indicates that a rate limit should be enforced */
  rate_limit_enabled?: boolean
  /** Rate limit multiplier that should be used */
  rate_limit_multiplier?: number
  /** Describes if the token contains second factor claim */
  second_factor?: boolean
  /** Describes if the token contains sudo claim */
  sudo?: boolean
  /** Unique identifier of the sudoer if sudo was used */
  sudo_user_id?: string | null
  /** Reason for using sudo if present */
  sudo_reason?: string | null
  /** Describes if the token contains sudo force claim */
  sudo_force?: boolean
}

/** Actions taken on Identity Providers, the SSO configuration representation. */
export interface IdentityProviderActions {
  /** Array of sso certificates belonging to this identity provider */
  certificates?: Array<{
    /** when provider record was created */
    created_at?: string
    /** unique identifier of this identity provider */
    id?: string
    /** time which the certificate expires */
    expires_at?: string
    /** raw contents of the public certificate (eg: .crt or .pem file) */
    body?: string
    /** label for certificate */
    name?: string | null
  }>
  /** raw contents of the public certificate (eg: .crt or .pem file) */
  certificate?: string | null
  /** when provider record was created */
  created_at?: string
  /** URL identifier provided by the identity provider */
  entity_id?: string
  /** unique identifier of this identity provider */
  id?: string
  /** user-friendly unique identifier for this identity provider */
  name?: string
  /** entity that owns this identity provider */
  owner?: {
    /** unique identifier of the owner */
    id: string
    /** name of the owner */
    name?: string
    /** type of the owner */
    type: 'team' | 'enterprise-account'
  }
  /** single log out URL for this identity provider */
  slo_target_url?: string
  /** single sign on URL for this identity provider */
  sso_target_url?: string
  /** when the identity provider record was updated */
  updated_at?: string
}

/** Certificates represent an sso cert attached to an Identity Provider */
export interface IdentityProviderCertificate {
  /** label for certificate */
  name?: string | null
  /** raw contents of the public certificate (eg: .crt or .pem file) */
  body?: string
  /** when provider record was created */
  created_at?: string
  /** unique identifier of this identity provider */
  id?: string
  /** time which the certificate expires */
  expires_at?: string
  /** unique identifier of the identity provider the cert belongs to */
  identity_provider_id?: string
}

/** Create a Certificate */
export interface IdentityProviderCertificateCreateOpts {
  /** raw contents of the public certificate (eg: .crt or .pem file) */
  body: string
  /** label for certificate */
  name?: string | null
}

/** Update a Certificate */
export interface IdentityProviderCertificateUpdateOpts {
  /** label for certificate */
  name?: string | null
}

/** The on file payment method for an account */
export interface PaymentMethod {
  /** street address line 1 */
  address_1?: string | null
  /** street address line 2 */
  address_2?: string
  /** last 4 digits of credit card number */
  card_last4?: string
  /** name of credit card issuer */
  card_type?: string
  /** city */
  city?: string
  /** country */
  country?: string
  /** expiration month */
  expiration_month?: string | null
  /** expiration year */
  expiration_year?: string | null
  /** the first name for payment method */
  first_name?: string
  /** the last name for payment method */
  last_name?: string
  /** metadata */
  other?: string | null
  /** postal code */
  postal_code?: string
  /** state */
  state?: string
}

/** Update an existing payment method for an account. */
export interface PaymentMethodUpdateOpts {
  /** street address line 1 */
  address_1?: string | null
  /** street address line 2 */
  address_2?: string
  /** encrypted card number of payment method */
  card_number?: string | null
  /** city */
  city?: string
  /** country */
  country?: string
  /** card verification value */
  cvv?: string | null
  /** expiration month */
  expiration_month?: string | null
  /** expiration year */
  expiration_year?: string | null
  /** the first name for payment method */
  first_name?: string
  /** the last name for payment method */
  last_name?: string
  /** metadata */
  other?: string | null
  /** postal code */
  postal_code?: string
  /** state */
  state?: string
  /** Nonce generated by Braintree hosted fields form */
  nonce?: string | null
  /** Device data string generated by the client */
  device_data?: string
}

/** A payment represents money collected for an account */
export interface Payment {
  /** amount of payment in cents */
  amount?: number
  /** when payment was created */
  created_at?: string
  /** legacy unique identifier of payment */
  id?: number
  /** identity of invoice */
  invoice?: {
    /** unique identifier of this invoice */
    id?: string
    /** human readable invoice number */
    number?: number
  } | null
  /** when credit was updated */
  updated_at?: string
  /** identity of user issuing payment */
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** state of the payment */
  state?: 'failure' | 'pending' | 'success'
}

/** Create a payment on an existing account */
export interface PaymentCreatePostOpts {
  /** amount of payment in cents */
  amount: number
  invoice_id: number
  /** unique identifier for a payment transaction */
  uuid: string
}

/** Create a payment on an existing team */
export interface PaymentCreatePostOpts {
  /** amount of payment in cents */
  amount: number
  invoice_id: number
  /** unique identifier for a payment transaction */
  uuid: string
}

/** Plan meters describe how a metered add-on plan bills for usage. */
export interface PlanMeter {
  /** unique identifier of this plan meter */
  id?: string
  /** name of this meter */
  name?: string
  /** price in cents per billing unit (may be a rate like "0.015/1000") */
  price_cents?: string
  /** human-readable product name */
  product_description?: string
  /** human-readable description of how usage is billed */
  billing_description?: string
  /** rate unit for discrete-rate meters (e.g. "token"); null for time-based meters */
  rate_period?: string | null
  /** billing period for time-based meters (e.g. "month"); null for rate-based meters */
  billing_period?: string | null
  /** billing unit for time-based meters (e.g. "compute"); null when not applicable */
  billing_unit?: string | null
  /** how usage is aggregated */
  aggregation?: string
  /** number of units included at no charge per billing period */
  included_units?: number
  /** when this meter becomes effective */
  start_time?: string
  /** when this meter is no longer effective, or null if open-ended */
  end_time?: string | null
  /** when this meter was created */
  created_at?: string
  /** when this meter was last updated */
  updated_at?: string
}

/** [Space Hosts](https://devcenter.heroku.com/articles/private-spaces-dedicated-hosts?preview=1) lists dedicated hosts allocated to a space */
export interface SpaceHost {
  /** unique identifier of this host */
  host_id?: string
  /** availability of this space */
  state?: 'available' | 'under-assessment' | 'permanent-failure' | 'released' | 'released-permanent-failure'
  /** approximate available capacity on this host expresses a percentage */
  available_capacity_percentage?: number
  /** when the host was allocated */
  allocated_at?: string
  /** when the host was released */
  released_at?: string
}

/** Single log drain for all apps in a Private Space */
export type SpaceLogDrain = Record<string, unknown>

/** Update log drain for a space. */
export interface SpaceLogDrainUpdateOpts {
  url?: string
}

/** A team license is credits provided and consumed by the team. */
export interface TeamLicense {
  /** when license started */
  start_date?: string
  /** when license ended */
  end_date?: string
  /** quantity of the license */
  qty?: number
  /** consumed quantity */
  consumed?: number
  /** code of this license change */
  code?: string
  /** name of this license */
  name?: string
}

/** A team license collection is credits provided and consumed by the team per period. */
export interface TeamLicenseCollection {
  /** year and month the licenses were in effect */
  period?: string
  /** Licenses for this period. */
  licenses?: Array<TeamLicense>
}

/** Telemetry Ingress Info allows add-on partners to view authorization information required to write to Fir app logs. */
export interface TelemetryIngressInfo {
  /** JWT token to be used for authorization */
  id_token?: string
  /** the authorization type */
  token_type?: string
  /** URLs for add-on partners to write to an add-ons logs */
  transports?: unknown
  /** when the token will expire */
  expires_at?: string
}

/** Usage history for resources. */
export interface UsageHistory {
  /** unique identifier of the resource */
  resource_id?: string
  /** time resolution of the data buckets (ISO 8601 duration format) */
  bucket_resolution?: 'PT1H' | 'PT2H' | 'PT4H' | 'PT6H' | 'P1D'
  /** an array of timestamps corresponding to usage data points */
  usage_timestamps?: Array<string>
  /** usage associated with the resource */
  usage?: Array<{
    /** key identifier for the meter */
    meter_key?: string
    /** an array of usage data points corresponding to timestamps in usage_timestamps */
    usage_data_points?: Array<number>
  }>
}

/**
 * Retrieves usage history for a resource. Supports queries up to 3 months in the past. Start date and duration can be specified as query parameters. Default is to show the past 1 month of usage.
 * 
 */
export interface UsageHistoryInfoOpts {
  /** start date for the usage history query (ISO 8601 format - date resolution) */
  start?: string
  /** duration of the usage history query (ISO 8601 duration format) */
  duration?: 'P3D' | 'P1W' | 'P2W' | 'P1M' | 'P3M'
}

/** Usage for apps. */
export interface Usage {
  /** add-on usage in the app */
  addons?: Array<{
    /** unique identifier of add-on */
    id?: string
    /** the meters associated with the add-on */
    meters?: Record<string, {
      /** total meter units used */
      quantity?: number
    }>
  }>
}

/**
 * Retrieves usage for apps belonging to a particular team.
 * 
 */
export interface UsageInfoGetResult {
  /** apps belonging to the team */
  apps?: Array<{
    /** unique identifier of app */
    id?: string
    /** add-on usage in the app */
    addons?: Array<{
      /** unique identifier of add-on */
      id?: string
      /** the meters associated with the add-on */
      meters?: Record<string, {
        /** total meter units used */
        quantity?: number
      }>
    }>
  }>
}

export interface HerokuClient {
  /** A Heroku account becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent accounts if their invoices remain unpaid. */
  accountDelinquency: {
  /** Account delinquency information. */
  info(): Promise<AccountDelinquency>
  }
  /** An account feature represents a Heroku labs capability that can be enabled or disabled for an account on Heroku. */
  accountFeature: {
  /** Info for an existing account feature. */
  info(accountFeatureIdentity: string): Promise<AccountFeature>
  /** List existing account features. */
  list(): Promise<Array<AccountFeature>>
  /** Update an existing account feature. */
  update(accountFeatureIdentity: string, requestBody: AccountFeatureUpdateOpts): Promise<AccountFeature>
  }
  /** An account represents an individual signed up to use the Heroku platform. */
  account: {
  /** Info for account. */
  info(): Promise<Account>
  /** Update account. */
  update(requestBody: AccountUpdateOpts): Promise<Account>
  /** Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account. */
  delete(): Promise<Account>
  /** Info for account. */
  infoByUser(accountIdentity: string | '~'): Promise<Account>
  /** Update account. */
  updateByUser(accountIdentity: string | '~', requestBody: AccountUpdateByUserOpts): Promise<Account>
  /** Delete account. Note that this action cannot be undone. Note: This endpoint requires the HTTP_HEROKU_PASSWORD or HTTP_HEROKU_PASSWORD_BASE64 header be set correctly for the user account. */
  deleteByUser(accountIdentity: string | '~'): Promise<Account>
  }
  /** Add-on Actions are lifecycle operations for add-on provisioning and deprovisioning. They allow add-on providers to (de)provision add-ons in the background and then report back when (de)provisioning is complete. */
  addOnAction: {
  /** Mark an add-on as provisioned for use. */
  provision(addOnIdentity: string): Promise<AddOn>
  /** Mark an add-on as deprovisioned. */
  deprovision(addOnIdentity: string): Promise<AddOn>
  /** Add or update a peering connection to an add-on */
  peer(addOnIdentity: string, requestBody: AddOnActionPeerOpts): Promise<AddOnAction>
  /** Remove a peering connection from an add-on */
  unpeer(addOnIdentity: string): Promise<AddOnAction>
  }
  /** An add-on attachment represents a connection between an app and an add-on that it has been given access to. */
  addOnAttachment: {
  /** Create a new add-on attachment. */
  create(requestBody: AddOnAttachmentCreateOpts): Promise<AddOnAttachment>
  /** Delete an existing add-on attachment. */
  delete(addOnAttachmentIdentity: string): Promise<AddOnAttachment>
  /** Info for existing add-on attachment. */
  info(addOnAttachmentIdentity: string): Promise<AddOnAttachment>
  /** List existing add-on attachments. */
  list(): Promise<Array<AddOnAttachment>>
  /** List existing add-on attachments for an add-on. */
  listByAddOn(addOnIdentity: string): Promise<Array<AddOnAttachment>>
  /** List existing add-on attachments for an app. */
  listByApp(appIdentity: string): Promise<Array<AddOnAttachment>>
  /** Info for existing add-on attachment for an app. */
  infoByApp(appIdentity: string, addOnAttachmentScopedIdentity: string): Promise<AddOnAttachment>
  /** Resolve an add-on attachment from a name, optionally passing an app name. If there are matches it returns at least one add-on attachment (exact match) or many. */
  resolution(requestBody: AddOnAttachmentResolutionOpts): Promise<Array<AddOnAttachment>>
  }
  /** Configuration of an Add-on */
  addOnConfig: {
  /** Get an add-on's config. Accessible by customers with access and by the add-on partner providing this add-on. */
  list(addOnIdentity: string): Promise<Array<AddOnConfig>>
  /** Update an add-on's config. Can only be accessed by the add-on partner providing this add-on. */
  update(addOnIdentity: string, requestBody: AddOnConfigUpdateOpts): Promise<Array<AddOnConfig>>
  }
  /** Add-on region capabilities represent the relationship between an Add-on Service and a specific Region. Only Beta and GA add-ons are returned by these endpoints. */
  addOnRegionCapability: {
  /** List all existing add-on region capabilities. */
  list(): Promise<Array<AddOnRegionCapability>>
  /** List existing add-on region capabilities for an add-on-service */
  listByAddOnService(addOnServiceIdentity: string): Promise<Array<AddOnRegionCapability>>
  /** List existing add-on region capabilities for a region. */
  listByRegion(regionIdentity: string): Promise<Array<AddOnRegionCapability>>
  }
  /** Add-on services represent add-ons that may be provisioned for apps. Endpoints under add-on services can be accessed without authentication. */
  addOnService: {
  /** Info for existing add-on-service. */
  info(addOnServiceIdentity: string): Promise<AddOnService>
  /** List existing add-on-services. */
  list(): Promise<Array<AddOnService>>
  }
  /** Represents the delivery of a webhook notification, including its current status. */
  addOnWebhookDelivery: {
  /** Returns the info for an existing delivery.  Can only be accessed by the add-on partner providing this add-on. */
  info(addOnIdentity: string, appWebhookDeliveryIdentity: string): Promise<AppWebhookDelivery>
  /** Lists existing deliveries for an add-on.  Can only be accessed by the add-on partner providing this add-on. */
  list(addOnIdentity: string): Promise<Array<AppWebhookDelivery>>
  }
  /** Represents a webhook event that occurred. */
  addOnWebhookEvent: {
  /** Returns the info for a specified webhook event.  Can only be accessed by the add-on partner providing this add-on. */
  info(addOnIdentity: string, appWebhookEventIdentity: string): Promise<AppWebhookEvent>
  /** Lists existing webhook events for an add-on.  Can only be accessed by the add-on partner providing this add-on. */
  list(addOnIdentity: string): Promise<Array<AppWebhookEvent>>
  }
  /** Represents the details of a webhook subscription */
  addOnWebhook: {
  /** Create an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
  create(addOnIdentity: string, requestBody: AddOnWebhookCreateOpts): Promise<AddOnWebhookCreateResult>
  /** Removes an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
  delete(addOnIdentity: string, appWebhookIdentity: string): Promise<AddOnWebhookDeleteResult>
  /** Returns the info for an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
  info(addOnIdentity: string, appWebhookIdentity: string): Promise<AddOnWebhookInfoResult>
  /** List all webhook subscriptions for a particular add-on.  Can only be accessed by the add-on partner providing this add-on. */
  list(addOnIdentity: string): Promise<Array<{
  /** identity of add-on. Only used for add-on partner webhooks. */
  addon?: {
    /** unique identifier of add-on */
    id?: string
    /** globally unique name of the add-on */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}>>
  /** Updates the details of an add-on webhook subscription.  Can only be accessed by the add-on partner providing this add-on. */
  update(addOnIdentity: string, appWebhookIdentity: string, requestBody: AddOnWebhookUpdateOpts): Promise<AddOnWebhookUpdateResult>
  }
  /** Add-ons represent add-ons that have been provisioned and attached to one or more apps. */
  addOn: {
  /** List all existing add-ons. */
  list(): Promise<Array<AddOn>>
  /** Info for an existing add-on. */
  info(addOnIdentity: string): Promise<AddOn>
  /** Create a new add-on. */
  create(appIdentity: string, requestBody: AddOnCreateOpts): Promise<AddOn>
  /** Delete an existing add-on. */
  delete(appIdentity: string, addOnIdentity: string): Promise<AddOn>
  /** Info for an existing add-on. */
  infoByApp(appIdentity: string, addOnIdentity: string): Promise<AddOn>
  /** List existing add-ons for an app. */
  listByApp(appIdentity: string): Promise<Array<AddOn>>
  /** Change add-on plan. Some add-ons may not support changing plans. In that case, an error will be returned. */
  update(appIdentity: string, addOnIdentity: string, requestBody: AddOnUpdateOpts): Promise<AddOn>
  /** List all existing add-ons a user has access to */
  listByUser(accountIdentity: string | '~'): Promise<Array<AddOn>>
  /** List add-ons used across all Team apps */
  listByTeam(teamIdentity: string): Promise<Array<AddOn>>
  /** Resolve an add-on from a name, optionally passing an app name. If there are matches it returns at least one add-on (exact match) or many. */
  resolution(requestBody: AddOnResolutionOpts): Promise<Array<AddOn>>
  }
  /** Entities that have been allowed to be used by a Team */
  allowedAddOnService: {
  /** List all allowed add-on services for a team */
  listByTeam(teamIdentity: string): Promise<Array<AllowedAddOnService>>
  /** Allow an Add-on Service */
  createByTeam(teamIdentity: string, requestBody: AllowedAddOnServiceCreateByTeamOpts): Promise<Array<AllowedAddOnService>>
  /** Remove an allowed add-on service */
  deleteByTeam(teamIdentity: string, allowedAddOnServiceIdentity: string): Promise<AllowedAddOnService>
  }
  /** An app feature represents a Heroku labs capability that can be enabled or disabled for an app on Heroku. */
  appFeature: {
  /** Info for an existing app feature. */
  info(appIdentity: string, appFeatureIdentity: string): Promise<AppFeature>
  /** List existing app features. */
  list(appIdentity: string): Promise<Array<AppFeature>>
  /** Update an existing app feature. */
  update(appIdentity: string, appFeatureIdentity: string, requestBody: AppFeatureUpdateOpts): Promise<AppFeature>
  }
  /** An app setup represents an app on Heroku that is setup using an environment, addons, and scripts described in an app.json manifest file. */
  appSetup: {
  /** Create a new app setup from a gzipped tar archive containing an app.json manifest file. */
  create(requestBody: AppSetupCreateOpts): Promise<AppSetup>
  /** Get the status of an app setup. */
  info(appSetupIdentity: string): Promise<AppSetup>
  }
  /** An app transfer represents a two party interaction for transferring ownership of an app. */
  appTransfer: {
  /** Create a new app transfer. */
  create(requestBody: AppTransferCreateOpts): Promise<AppTransfer>
  /** Delete an existing app transfer */
  delete(appTransferIdentity: string): Promise<AppTransfer>
  /** Info for existing app transfer. */
  info(appTransferIdentity: string): Promise<AppTransfer>
  /** List existing apps transfers. */
  list(): Promise<Array<AppTransfer>>
  /** Update an existing app transfer. */
  update(appTransferIdentity: string, requestBody: AppTransferUpdateOpts): Promise<AppTransfer>
  }
  /** Represents the delivery of a webhook notification, including its current status. */
  appWebhookDelivery: {
  /** Returns the info for an existing delivery. */
  info(appIdentity: string, appWebhookDeliveryIdentity: string): Promise<AppWebhookDelivery>
  /** Lists existing deliveries for an app. */
  list(appIdentity: string): Promise<Array<AppWebhookDelivery>>
  }
  /** Represents a webhook event that occurred. */
  appWebhookEvent: {
  /** Returns the info for a specified webhook event. */
  info(appIdentity: string, appWebhookEventIdentity: string): Promise<AppWebhookEvent>
  /** Lists existing webhook events for an app. */
  list(appIdentity: string): Promise<Array<AppWebhookEvent>>
  }
  /** Represents the details of a webhook subscription */
  appWebhook: {
  /** Create an app webhook subscription. */
  create(appIdentity: string, requestBody: AppWebhookCreateOpts): Promise<AppWebhookCreateResult>
  /** Removes an app webhook subscription. */
  delete(appIdentity: string, appWebhookIdentity: string): Promise<AppWebhookDeleteResult>
  /** Returns the info for an app webhook subscription. */
  info(appIdentity: string, appWebhookIdentity: string): Promise<AppWebhookInfoResult>
  /** List all webhook subscriptions for a particular app. */
  list(appIdentity: string): Promise<Array<{
  /** identity of app. Only used for customer webhooks. */
  app?: {
    /** unique identifier of app */
    id?: string
    /** unique name of app */
    name?: string
  }
  /** when the webhook was created */
  created_at?: string
  /** the webhook's unique identifier */
  id?: string
  /** the entities that the subscription provides notifications for */
  include?: Array<string>
  /** if `notify`, Heroku makes a single, fire-and-forget delivery attempt. If `sync`, Heroku attempts multiple deliveries until the request is successful or a limit is reached */
  level?: 'notify' | 'sync'
  /** when the webhook was updated */
  updated_at?: string
  /** the URL where the webhook's notification requests are sent */
  url?: string
}>>
  /** Updates the details of an app webhook subscription. */
  update(appIdentity: string, appWebhookIdentity: string, requestBody: AppWebhookUpdateOpts): Promise<AppWebhookUpdateResult>
  }
  /** An app represents the program that you would like to deploy and run on Heroku. */
  app: {
  /** Create a new app. */
  create(requestBody: AppCreateOpts): Promise<App>
  /** Delete an existing app. */
  delete(appIdentity: string): Promise<App>
  /** Info for existing app. */
  info(appIdentity: string): Promise<App>
  /** List existing apps. */
  list(): Promise<Array<App>>
  /** List owned and collaborated apps (excludes team apps). */
  listOwnedAndCollaborated(accountIdentity: string | '~'): Promise<Array<App>>
  /** Update an existing app. */
  update(appIdentity: string, requestBody: AppUpdateOpts): Promise<App>
  /** Enable ACM flag for an app */
  enableACM(appIdentity: string): Promise<App>
  /** Disable ACM flag for an app */
  disableACM(appIdentity: string): Promise<App>
  /** Refresh ACM for an app */
  refreshACM(appIdentity: string): Promise<App>
  }
  /** An audit trail archive represents a monthly json zipped file containing events */
  archive: {
  /** Get archive for a single month. */
  info(enterpriseAccountIdentity: string, archiveYear: number, archiveMonth: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'): Promise<Archive>
  /** List existing archives. */
  list(enterpriseAccountIdentity: string): Promise<Array<Archive>>
  }
  /** An audit trail event represents some action on the platform */
  auditTrailEvent: {
  /** List existing events. Returns all events for one day, defaulting to current day. Order, actor, action, and type, and day query params can be specified as query parameters. For example, '/enterprise-accounts/:id/events?order=desc&actor=user@example.com&action=create&type=app&day=2020-09-30' would return events in descending order and only return app created events by the user with user@example.com email address. */
  list(enterpriseAccountIdentity: string): Promise<Array<AuditTrailEvent>>
  }
  /** A build represents the process of transforming a code tarball into build artifacts */
  build: {
  /** Create a new build. */
  create(appIdentity: string, requestBody: BuildCreateOpts): Promise<Build>
  /** Info for existing build. */
  info(appIdentity: string, buildIdentity: string): Promise<Build>
  /** List existing build. */
  list(appIdentity: string): Promise<Array<Build>>
  /** Destroy a build cache. */
  deleteCache(appIdentity: string): Promise<Build>
  /** Cancel running build. */
  cancel(appIdentity: string, buildIdentity: string): Promise<Build>
  }
  /** A buildpack installation represents a buildpack that will be run against an app. */
  buildpackInstallation: {
  /** Update an app's buildpack installations. */
  update(appIdentity: string, requestBody: BuildpackInstallationUpdateOpts): Promise<Array<BuildpackInstallation>>
  /** List an app's existing buildpack installations. */
  list(appIdentity: string): Promise<Array<BuildpackInstallation>>
  }
  /** A collaborator represents an account that has been given access to an app on Heroku. */
  collaborator: {
  /** Create a new collaborator. */
  create(appIdentity: string, requestBody: CollaboratorCreateOpts): Promise<Collaborator>
  /** Delete an existing collaborator. */
  delete(appIdentity: string, collaboratorIdentity: string): Promise<Collaborator>
  /** Info for existing collaborator. */
  info(appIdentity: string, collaboratorIdentity: string): Promise<Collaborator>
  /** List existing collaborators. */
  list(appIdentity: string): Promise<Array<Collaborator>>
  }
  /** Config Vars allow you to manage the configuration information provided to an app on Heroku. */
  configVar: {
  /** Get config-vars for app. */
  infoForApp(appIdentity: string): Promise<ConfigVar>
  /** Get config-vars for a release. */
  infoForAppRelease(appIdentity: string, releaseIdentity: string | number): Promise<ConfigVar>
  /** Update config-vars for app. You can update existing config-vars by setting them again, and remove by setting it to `null`. */
  update(appIdentity: string): Promise<ConfigVar>
  }
  /** A credit represents value that will be used up before further charges are assigned to an account. */
  credit: {
  /** Create a new credit. */
  create(requestBody: CreditCreateOpts): Promise<Credit>
  /** Info for existing credit. */
  info(creditIdentity: string): Promise<Credit>
  /** List existing credits. */
  list(): Promise<Array<Credit>>
  }
  /** Domains define what web routes should be routed to an app on Heroku. */
  domain: {
  /** Create a new domain. */
  create(appIdentity: string, requestBody: DomainCreateOpts): Promise<Domain>
  /** Associate an SNI endpoint */
  update(appIdentity: string, domainIdentity: string, requestBody: DomainUpdateOpts): Promise<Domain>
  /** Delete an existing domain */
  delete(appIdentity: string, domainIdentity: string): Promise<Domain>
  /** Info for existing domain. */
  info(appIdentity: string, domainIdentity: string): Promise<Domain>
  /** List existing domains. */
  list(appIdentity: string): Promise<Array<Domain>>
  }
  /** Dyno sizes are the values and details of sizes that can be assigned to dynos. This information can also be found at : [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types). */
  dynoSize: {
  /** Info for existing dyno size. */
  info(dynoSizeIdentity: string): Promise<DynoSize>
  /** List existing dyno sizes. */
  list(): Promise<Array<DynoSize>>
  /** List available dyno sizes for an app */
  listAppDynoSizes(appIdentity: string): Promise<DynoSize>
  }
  /** Dynos encapsulate running processes of an app on Heroku. Detailed information about dyno sizes can be found at: [https://devcenter.heroku.com/articles/dyno-types](https://devcenter.heroku.com/articles/dyno-types). */
  dyno: {
  /** Create a new dyno. */
  create(appIdentity: string, requestBody: DynoCreateOpts): Promise<Dyno>
  /** Restart dyno. */
  restart(appIdentity: string, dynoIdentity: string): Promise<Dyno>
  /** Restart dynos of a given formation type. */
  restartFormation(appIdentity: string, dynoFormationType: string): Promise<Dyno>
  /** Restart all dynos. */
  restartAll(appIdentity: string): Promise<Dyno>
  /** Stop dyno. */
  stop(appIdentity: string, dynoIdentity: string): Promise<Dyno>
  /** Stop dynos of a given formation type. */
  stopFormation(appIdentity: string, dynoFormationType: string): Promise<Dyno>
  /** Info for existing dyno. */
  info(appIdentity: string, dynoIdentity: string): Promise<Dyno>
  /** List existing dynos. */
  list(appIdentity: string): Promise<Array<Dyno>>
  }
  /** Usage for an enterprise account at a daily resolution. */
  enterpriseAccountDailyUsage: {
  /**
   * Retrieves usage for an enterprise account for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).
   * 
   */
  info(enterpriseAccountId: string, requestBody: EnterpriseAccountDailyUsageInfoOpts): Promise<Array<EnterpriseAccountDailyUsage>>
  }
  /** Enterprise account members are users with access to an enterprise account. */
  enterpriseAccountMember: {
  /** List members in an enterprise account. */
  list(enterpriseAccountIdentity: string): Promise<Array<{
  enterprise_account?: {
    /** unique identifier of the enterprise account */
    id?: string
    /** unique name of the enterprise account */
    name?: string
  }
  /** unique identifier of the member */
  id?: string
  /** enterprise account permissions */
  permissions?: Array<{
    description?: string
    /** permission in the enterprise account */
    name?: 'view' | 'create' | 'manage' | 'billing'
  }>
  /** user information for the membership */
  user?: {
    /** unique email address of account */
    email?: string
    /** unique identifier of an account */
    id?: string
  }
  /** whether the Enterprise Account member has two factor authentication enabled */
  two_factor_authentication?: boolean
  /** Identity Provider information the member is federated with */
  identity_provider?: {
    /** unique identifier of this identity provider */
    id?: string
    /** name of the identity provider */
    name?: string
    /** whether the identity_provider information is redacted or not */
    redacted?: boolean
    /** entity that owns this identity provider */
    owner?: {
      /** unique identifier of the owner */
      id: string
      /** name of the owner */
      name?: string
      /** type of the owner */
      type: 'team' | 'enterprise-account'
    }
  } | null
  /** when account last authorized with Heroku */
  last_login?: string | null
}>>
  /** Create a member in an enterprise account. */
  create(enterpriseAccountIdentity: string, requestBody: EnterpriseAccountMemberCreateOpts): Promise<EnterpriseAccountMember>
  /** Update a member in an enterprise account. */
  update(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string, requestBody: EnterpriseAccountMemberUpdateOpts): Promise<EnterpriseAccountMember>
  /** delete a member in an enterprise account. */
  delete(enterpriseAccountIdentity: string, enterpriseAccountMemberUserIdentity: string): Promise<EnterpriseAccountMember>
  }
  /** Usage for an enterprise account at a monthly resolution. */
  enterpriseAccountMonthlyUsage: {
  /**
   * Retrieves usage for an enterprise account for a range of months. Start and end dates can be specified as query parameters using the date format YYYY-MM. If no end date is specified, one month of usage is returned. The enterprise account identifier can be found from the [enterprise account list](https://devcenter.heroku.com/articles/platform-api-reference#enterprise-account-list).
   * 
   */
  info(enterpriseAccountId: string, requestBody: EnterpriseAccountMonthlyUsageInfoOpts): Promise<Array<EnterpriseAccountMonthlyUsage>>
  }
  /** Enterprise accounts allow companies to manage their development teams and billing. */
  enterpriseAccount: {
  /** List enterprise accounts in which you are a member. */
  list(): Promise<Array<EnterpriseAccount>>
  /** Information about an enterprise account. */
  info(enterpriseAccountIdentity: string): Promise<EnterpriseAccount>
  /** Update enterprise account properties */
  update(enterpriseAccountIdentity: string, requestBody: EnterpriseAccountUpdateOpts): Promise<EnterpriseAccount>
  }
  /** Filters are special endpoints to allow for API consumers to specify a subset of resources to consume in order to reduce the number of requests that are performed.  Each filter endpoint endpoint is responsible for determining its supported request format.  The endpoints are over POST in order to handle large request bodies without hitting request uri query length limitations, but the requests themselves are idempotent and will not have side effects. */
  filterApps: {
  /** Request an apps list filtered by app id. */
  apps(): Promise<Array<TeamApp>>
  }
  /** The formation of processes that should be maintained for an app. Update the formation to scale processes or change dyno sizes. Available process type names and commands are defined by the `process_types` attribute for the [slug](#slug) currently released on an app. */
  formation: {
  /** Info for a process type */
  info(appIdentity: string, formationIdentity: string): Promise<Formation>
  /** List process type formation */
  list(appIdentity: string): Promise<Array<Formation>>
  /** Batch update process types */
  batchUpdate(appIdentity: string, requestBody: FormationBatchUpdateOpts): Promise<Array<Formation>>
  /** Update process type */
  update(appIdentity: string, formationIdentity: string, requestBody: FormationUpdateOpts): Promise<Formation>
  }
  /** A generation represents a version of the Heroku platform that includes the app execution environment, routing, telemetry, and build systems. */
  generation: {
  /** Info for generation. */
  info(stackIdentity: string): Promise<Generation>
  /** List available generations. */
  listGet(): Promise<Array<Generation>>
  /** List available generations for a team. */
  listGet(teamIdentity: string): Promise<Array<Generation>>
  }
  /** Identity Providers represent the SSO configuration of an Enterprise Account or Team. */
  identityProvider: {
  /** Info for an Identity Provider */
  info(identityProviderIdentity: string): Promise<IdentityProvider>
  /** Create an Identity Provider */
  create(requestBody: IdentityProviderCreateOpts): Promise<IdentityProvider>
  /** Update an Identity Provider */
  update(identityProviderIdentity: string, requestBody: IdentityProviderUpdateOpts): Promise<IdentityProvider>
  }
  /** An inbound-ruleset is a collection of rules that specify what hosts can or cannot connect to an application. */
  inboundRuleset: {
  /** Current inbound ruleset for a space */
  current(spaceIdentity: string): Promise<InboundRuleset>
  /** Info on an existing Inbound Ruleset */
  info(spaceIdentity: string, inboundRulesetIdentity: string): Promise<InboundRuleset>
  /** List all inbound rulesets for a space */
  list(spaceIdentity: string): Promise<Array<InboundRuleset>>
  /** Create a new inbound ruleset */
  create(spaceIdentity: string, requestBody: InboundRulesetCreateOpts): Promise<InboundRuleset>
  }
  /** An invoice address represents the address that should be listed on an invoice. */
  invoiceAddress: {
  /** Retrieve existing invoice address. */
  info(): Promise<InvoiceAddress>
  /** Update invoice address for an account. */
  update(requestBody: InvoiceAddressUpdateOpts): Promise<InvoiceAddress>
  }
  /** An invoice is an itemized bill of goods for an account which includes pricing and charges. */
  invoice: {
  /** Info for existing invoice. */
  info(invoiceIdentity: number): Promise<Invoice>
  /** List existing invoices. */
  list(): Promise<Array<Invoice>>
  }
  /** Keys represent public SSH keys associated with an account and are used to authorize accounts as they are performing git operations. */
  key: {
  /** Info for existing key. */
  info(keyIdentity: string): Promise<Key>
  /** List existing keys. */
  list(): Promise<Array<Key>>
  }
  /** [Log drains](https://devcenter.heroku.com/articles/log-drains) provide a way to forward your Heroku logs to an external syslog server for long-term archiving. This external service must be configured to receive syslog packets from Heroku, whereupon its URL can be added to an app using this API. Some add-ons will add a log drain when they are provisioned to an app. These drains can only be removed by removing the add-on. */
  logDrain: {
  /** Create a new log drain. */
  create(appIdentity: string, requestBody: LogDrainCreateOpts): Promise<LogDrain>
  /** Update an add-on owned log drain. */
  update(addOnIdentity: string, logDrainQueryIdentity: string, requestBody: LogDrainUpdateOpts): Promise<LogDrain>
  /** Delete an existing log drain. Log drains added by add-ons can only be removed by removing the add-on. */
  delete(appIdentity: string, logDrainQueryIdentity: string): Promise<LogDrain>
  /** Info for existing log drain. */
  info(appIdentity: string, logDrainQueryIdentity: string): Promise<LogDrain>
  /** List existing log drains for an add-on. */
  listByAddOn(addOnIdentity: string): Promise<Array<LogDrain>>
  /** List existing log drains. */
  list(appIdentity: string): Promise<Array<LogDrain>>
  }
  /** A log session is a reference to the http based log stream for an app. */
  logSession: {
  /** Create a new log session. */
  create(appIdentity: string, requestBody: LogSessionCreateOpts): Promise<LogSession>
  }
  /** OAuth authorizations represent clients that a Heroku user has authorized to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth) */
  oauthAuthorization: {
  /** Create a new OAuth authorization. */
  create(requestBody: OauthAuthorizationCreateOpts): Promise<OauthAuthorization>
  /** Delete OAuth authorization. */
  delete(oauthAuthorizationIdentity: string): Promise<OauthAuthorization>
  /** Info for an OAuth authorization. */
  info(oauthAuthorizationIdentity: string): Promise<OauthAuthorization>
  /** Update an existing OAuth authorization. */
  update(oauthAuthorizationIdentity: string, requestBody: OauthAuthorizationUpdateOpts): Promise<OauthAuthorization>
  /** List OAuth authorizations. */
  list(): Promise<Array<OauthAuthorization>>
  /** Regenerate OAuth tokens. This endpoint is only available to direct authorizations or privileged OAuth clients. */
  regenerate(oauthAuthorizationIdentity: string): Promise<OauthAuthorization>
  /** List team OAuth authorizations. */
  teamList(teamIdentity: string): Promise<Array<OauthAuthorization>>
  /** Create a new team OAuth authorization. */
  teamCreate(teamIdentity: string, requestBody: OauthAuthorizationTeamCreateOpts): Promise<OauthAuthorization>
  }
  /** OAuth clients are applications that Heroku users can authorize to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth). */
  oauthClient: {
  /** Create a new OAuth client. */
  create(requestBody: OauthClientCreateOpts): Promise<OauthClient>
  /** Delete OAuth client. */
  delete(oauthClientIdentity: string): Promise<OauthClient>
  /** Info for an OAuth client. The output for unauthenticated requests excludes the `secret` parameter. */
  info(oauthClientIdentity: string): Promise<OauthClient>
  /** List OAuth clients */
  list(): Promise<Array<OauthClient>>
  /** Update OAuth client */
  update(oauthClientIdentity: string, requestBody: OauthClientUpdateOpts): Promise<OauthClient>
  /** Rotate credentials for an OAuth client */
  rotateCredentials(oauthClientIdentity: string): Promise<OauthClient>
  }
  /** OAuth tokens provide access for authorized clients to act on behalf of a Heroku user to automate, customize or extend their usage of the platform. For more information please refer to the [Heroku OAuth documentation](https://devcenter.heroku.com/articles/oauth) */
  oauthToken: {
  /** Create a new OAuth token. */
  create(requestBody: OauthTokenCreateOpts): Promise<OauthToken>
  /** Revoke OAuth access token. */
  delete(oauthTokenIdentity: string): Promise<OauthToken>
  }
  /** An OCI (Open Container Initiative) image is a standardized format for packaging and distributing containerized applications, ready to run on the platform. */
  ociImage: {
  /** Info for the OCI images of an app, filtered by identifier. */
  info(appIdentity: string, ociImageIdentity: string): Promise<Array<OciImage>>
  /** Create an new OCI image of an app */
  create(appIdentity: string, requestBody: OciImageCreateOpts): Promise<OciImage>
  }
  /** A password reset represents a in-process password reset attempt. */
  passwordReset: {
  /** Reset account's password. This will send a reset password link to the user's email address. */
  resetPassword(requestBody: PasswordResetResetPasswordOpts): Promise<PasswordReset>
  /** Complete password reset. */
  completeResetPassword(passwordResetResetPasswordToken: string, requestBody: PasswordResetCompleteResetPasswordOpts): Promise<PasswordReset>
  }
  /** [Peering](https://devcenter.heroku.com/articles/private-space-vpc-peering?preview=1) provides a way to peer your Private Space VPC to another AWS VPC. */
  peering: {
  /** Provides the necessary information to establish an AWS VPC Peering with your private space. */
  info(spaceIdentity: string): Promise<PeeringInfo>
  /** List peering connections of a private space. */
  list(spaceIdentity: string): Promise<Array<Peering>>
  /** Accept a pending peering connection with a private space. */
  accept(spaceIdentity: string, requestBody: PeeringAcceptOpts): Promise<Peering>
  /** Destroy an active peering connection with a private space. */
  destroy(spaceIdentity: string, peeringPcxId: string): Promise<Peering>
  }
  /** An owned entity including users' permissions. */
  permissionEntity: {
  /** List permission entities for a team. */
  list(teamIdentity: string): Promise<Array<PermissionEntity>>
  }
  /** Information about the latest builds of apps in a pipeline. A build represents the process of transforming code into build artifacts. */
  pipelineBuild: {
  /** List latest builds for each app in a pipeline */
  list(pipelineId: string): Promise<Array<PipelineBuild>>
  }
  /** Pipeline config vars in Heroku CI and review apps used to manage the configuration information for a pipeline. */
  pipelineConfigVar: {
  /** Get config-vars for a pipeline stage. */
  infoForApp(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production'): Promise<PipelineConfigVar>
  /** Update config-vars for a pipeline stage. You can update existing config-vars by setting them again, and remove by setting it to `null`. */
  update(pipelineId: string, pipelineCouplingStage: 'test' | 'review' | 'development' | 'staging' | 'production'): Promise<PipelineConfigVar>
  }
  /** Information about an app's coupling to a pipeline */
  pipelineCoupling: {
  /** List couplings for a pipeline */
  listByPipeline(pipelineId: string): Promise<Array<PipelineCoupling>>
  /** List pipeline couplings for the current user. */
  listByCurrentUser(): Promise<Array<PipelineCoupling>>
  /** List pipeline couplings. */
  list(): Promise<Array<PipelineCoupling>>
  /** List pipeline couplings for a team. */
  listByTeam(teamIdentity: string): Promise<Array<PipelineCoupling>>
  /** Create a new pipeline coupling. */
  create(requestBody: PipelineCouplingCreateOpts): Promise<PipelineCoupling>
  /** Info for an existing pipeline coupling. */
  info(pipelineCouplingIdentity: string): Promise<PipelineCoupling>
  /** Delete an existing pipeline coupling. */
  delete(pipelineCouplingIdentity: string): Promise<PipelineCoupling>
  /** Update an existing pipeline coupling. */
  update(pipelineCouplingIdentity: string, requestBody: PipelineCouplingUpdateOpts): Promise<PipelineCoupling>
  /** Info for an existing pipeline coupling. */
  infoByApp(appIdentity: string): Promise<PipelineCoupling>
  }
  /** Information about the latest deployment of each app in a pipeline. A deployment is the process of moving the build artifacts to a target environment. */
  pipelineDeployment: {
  /** List latest deployments for each app in a pipeline. A deployment is a release that changed your source slug, container image, or Heroku processes. */
  list(pipelineId: string): Promise<Array<Release>>
  }
  /** Promotion targets represent an individual app being promoted to */
  pipelinePromotionTarget: {
  /** List promotion targets belonging to an existing promotion. */
  list(pipelinePromotionId: string): Promise<Array<PipelinePromotionTarget>>
  }
  /** Promotions allow you to move code from an app in a pipeline to all targets */
  pipelinePromotion: {
  /** Create a new promotion. */
  create(requestBody: PipelinePromotionCreateOpts): Promise<PipelinePromotion>
  /** Info for existing pipeline promotion. */
  info(pipelinePromotionIdentity: string): Promise<PipelinePromotion>
  }
  /** Information about the latest release of each app in a pipeline. A release makes a deployment available to end-users. */
  pipelineRelease: {
  /** List latest releases for each app in a pipeline */
  list(pipelineId: string): Promise<Array<Release>>
  }
  /** A pipeline's stack is determined by the apps in the pipeline. This is used during creation of CI and Review Apps that have no stack defined in app.json */
  pipelineStack: {
  /** The stack for a given pipeline, used for CI and Review Apps that have no stack defined in app.json. */
  defaultStack(pipelineId: string): Promise<PipelineStack>
  }
  /** A pipeline transfer is the process of changing pipeline ownership along with the contained apps. */
  pipelineTransfer: {
  /** Create a new pipeline transfer. */
  create(requestBody: PipelineTransferCreateOpts): Promise<PipelineTransfer>
  }
  /** A pipeline allows grouping of apps into different stages. */
  pipeline: {
  /** Create a new pipeline. */
  create(requestBody: PipelineCreateOpts): Promise<Pipeline>
  /** Info for existing pipeline. */
  info(pipelineIdentity: string): Promise<Pipeline>
  /** Delete an existing pipeline. */
  delete(pipelineId: string): Promise<Pipeline>
  /** Update an existing pipeline. */
  update(pipelineId: string, requestBody: PipelineUpdateOpts): Promise<Pipeline>
  /** List existing pipelines. */
  list(): Promise<Array<Pipeline>>
  }
  /** Plans represent different configurations of add-ons that may be added to apps. Endpoints under add-on services can be accessed without authentication. */
  plan: {
  /** Info for existing plan. */
  info(planIdentity: string): Promise<Plan>
  /** Info for existing plan by Add-on. */
  infoByAddOn(addOnServiceIdentity: string, planIdentity: string): Promise<Plan>
  /** List existing plans by Add-on. */
  listByAddOn(addOnServiceIdentity: string): Promise<Array<Plan>>
  }
  /** Rate Limit represents the number of request tokens each account holds. Requests to this endpoint do not count towards the rate limit. */
  rateLimit: {
  /** Info for rate limits. */
  info(): Promise<RateLimit>
  }
  /** A region represents a geographic location in which your application may run. */
  region: {
  /** Info for existing region. */
  info(regionIdentity: string): Promise<Region>
  /** List existing regions. */
  list(): Promise<Array<Region>>
  }
  /** A release represents a combination of code, config vars and add-ons for an app on Heroku. */
  release: {
  /** Info for existing release. */
  info(appIdentity: string, releaseIdentity: string | number): Promise<Release>
  /** List existing releases. */
  list(appIdentity: string): Promise<Array<Release>>
  /** Create new release. */
  create(appIdentity: string, requestBody: ReleaseCreateOpts): Promise<Release>
  /** Rollback to an existing release. */
  rollback(appIdentity: string, requestBody: ReleaseRollbackOpts): Promise<Release>
  }
  /** An ephemeral app to review a set of changes */
  reviewApp: {
  /** Create a new review app */
  create(requestBody: ReviewAppCreateOpts): Promise<ReviewApp>
  /** Gets an existing review app */
  getReviewApp(reviewAppId: string): Promise<ReviewApp>
  /** Delete an existing review app */
  delete(reviewAppId: string): Promise<ReviewApp>
  /** Get a review app using the associated app_id */
  getReviewAppByAppId(appIdentity: string): Promise<ReviewApp>
  /** List review apps for a pipeline */
  list(pipelineId: string): Promise<Array<ReviewApp>>
  }
  /** Review apps can be configured for pipelines. */
  reviewAppConfig: {
  /** Enable review apps for a pipeline */
  enable(pipelineId: string, requestBody: ReviewAppConfigEnableOpts): Promise<ReviewAppConfig>
  /** Get review apps configuration for a pipeline */
  info(pipelineId: string): Promise<ReviewAppConfig>
  /** Update review app configuration for a pipeline */
  update(pipelineId: string, requestBody: ReviewAppConfigUpdateOpts): Promise<ReviewAppConfig>
  /** Disable review apps for a pipeline */
  delete(pipelineId: string): Promise<ReviewAppConfig>
  }
  /** A slug is a snapshot of your application code that is ready to run on the platform. */
  slug: {
  /** Info for existing slug. */
  info(appIdentity: string, slugIdentity: string): Promise<Slug>
  /** Create a new slug. For more information please refer to [Deploying Slugs using the Platform API](https://devcenter.heroku.com/articles/platform-api-deploying-slugs). */
  create(appIdentity: string, requestBody: SlugCreateOpts): Promise<Slug>
  }
  /** SMS numbers are used for recovery on accounts with two-factor authentication enabled. */
  smsNumber: {
  /** Recover an account using an SMS recovery code */
  sMSNumber(accountIdentity: string | '~'): Promise<SmsNumber>
  /** Recover an account using an SMS recovery code */
  recover(accountIdentity: string | '~'): Promise<SmsNumber>
  /** Confirm an SMS number change with a confirmation code */
  confirm(accountIdentity: string | '~'): Promise<SmsNumber>
  }
  /** SNI Endpoint is a public address serving a custom SSL cert for HTTPS traffic, using the SNI TLS extension, to a Heroku app. */
  sniEndpoint: {
  /** Create a new SNI endpoint. */
  create(appIdentity: string, requestBody: SniEndpointCreateOpts): Promise<SniEndpoint>
  /** Delete existing SNI endpoint. */
  delete(appIdentity: string, sniEndpointIdentity: string): Promise<SniEndpoint>
  /** Info for existing SNI endpoint. */
  info(appIdentity: string, sniEndpointIdentity: string): Promise<SniEndpoint>
  /** List existing SNI endpoints. */
  list(appIdentity: string): Promise<Array<SniEndpoint>>
  /** Update an existing SNI endpoint. */
  update(appIdentity: string, sniEndpointIdentity: string, requestBody: SniEndpointUpdateOpts): Promise<SniEndpoint>
  }
  /** A source is a location for uploading and downloading an application's source code. */
  source: {
  /** Create URLs for uploading and downloading source. */
  create(): Promise<Source>
  /** Create URLs for uploading and downloading source. Deprecated in favor of `POST /sources` */
  createDeprecated(appIdentity: string): Promise<Source>
  }
  /** Space access represents the permissions a particular user has on a particular space. */
  spaceAppAccess: {
  /** List permissions for a given user on a given space. */
  info(spaceIdentity: string, accountIdentity: string | '~'): Promise<SpaceAppAccess>
  /** Update an existing user's set of permissions on a space. */
  update(spaceIdentity: string, accountIdentity: string | '~', requestBody: SpaceAppAccessUpdateOpts): Promise<SpaceAppAccess>
  /** List all users and their permissions on a space. */
  list(spaceIdentity: string): Promise<Array<SpaceAppAccess>>
  }
  /** Network address translation (NAT) for stable outbound IP addresses from a space */
  spaceNat: {
  /** Current state of network address translation for a space. */
  info(spaceIdentity: string): Promise<SpaceNat>
  }
  /** Space Topology provides you with a mechanism for viewing all the running dynos, formations and applications for a space. This is the same data thats used to power our DNS Service Discovery. */
  spaceTopology: {
  /** Current space topology */
  topology(spaceIdentity: string): Promise<SpaceTopology>
  }
  /** Transfer spaces between enterprise teams with the same Enterprise Account. */
  spaceTransfer: {
  /** Transfer space between enterprise teams */
  transfer(spaceIdentity: string, requestBody: SpaceTransferTransferOpts): Promise<Space>
  }
  /** A space is an isolated, highly available, secure app execution environment. */
  space: {
  /** List existing spaces. */
  list(): Promise<Array<Space>>
  /** Info for existing space. */
  info(spaceIdentity: string): Promise<Space>
  /** Update an existing space. */
  update(spaceIdentity: string, requestBody: SpaceUpdateOpts): Promise<Space>
  /** Delete an existing space. */
  delete(spaceIdentity: string): Promise<Space>
  /** Create a new space. */
  create(requestBody: SpaceCreateOpts): Promise<Space>
  }
  /** Stacks are the different application execution environments available in the Heroku platform. */
  stack: {
  /** Stack info. */
  info(stackIdentity: string): Promise<Stack>
  /** List available stacks. */
  listGet(): Promise<Array<Stack>>
  /** List available app stacks for an app. */
  listGet(appIdentity: string): Promise<Array<Stack>>
  }
  teamAddOn: {
  /** List add-ons used across all Team apps */
  listForTeam(teamIdentity: string): Promise<Array<AddOn>>
  }
  /** A team collaborator represents an account that has been given access to a team app on Heroku. */
  teamAppCollaborator: {
  /** Create a new collaborator on a team app. Use this endpoint instead of the `/apps/{app_id_or_name}/collaborator` endpoint when you want the collaborator to be granted [permissions] (https://devcenter.heroku.com/articles/org-users-access#roles-and-permissions) according to their role in the team. */
  create(appIdentity: string, requestBody: TeamAppCollaboratorCreateOpts): Promise<TeamAppCollaborator>
  /** Delete an existing collaborator from a team app. */
  delete(teamAppIdentity: string, teamAppCollaboratorIdentity: string): Promise<TeamAppCollaborator>
  /** Info for a collaborator on a team app. */
  info(teamAppIdentity: string, teamAppCollaboratorIdentity: string): Promise<TeamAppCollaborator>
  /** Update an existing collaborator from a team app. */
  update(teamAppIdentity: string, teamAppCollaboratorIdentity: string, requestBody: TeamAppCollaboratorUpdateOpts): Promise<TeamAppCollaborator>
  /** List collaborators on a team app. */
  list(teamAppIdentity: string): Promise<Array<TeamAppCollaborator>>
  }
  /** A team app permission is a behavior that is assigned to a user in a team app. */
  teamAppPermission: {
  /** Lists permissions available to teams. */
  list(): Promise<Array<TeamAppPermission>>
  }
  /** A team app encapsulates the team specific functionality of Heroku apps. */
  teamApp: {
  /** Create a new app in the specified team, in the default team if unspecified, or in personal account, if default team is not set. */
  create(requestBody: TeamAppCreateOpts): Promise<TeamApp>
  /** Info for a team app. */
  info(teamAppIdentity: string): Promise<TeamApp>
  /** Lock or unlock a team app. */
  updateLocked(teamAppIdentity: string, requestBody: TeamAppUpdateLockedOpts): Promise<TeamApp>
  /** Transfer an existing team app to another Heroku account. */
  transferToAccount(teamAppIdentity: string, requestBody: TeamAppTransferToAccountOpts): Promise<TeamApp>
  /** Transfer an existing team app to another team. */
  transferToTeam(teamAppIdentity: string, requestBody: TeamAppTransferToTeamOpts): Promise<TeamApp>
  /** List team apps. */
  listByTeam(teamIdentity: string): Promise<Array<TeamApp>>
  }
  /** Usage for an enterprise team at a daily resolution. */
  teamDailyUsage: {
  /**
   * Retrieves usage for an enterprise team for a range of days. Start and end dates can be specified as query parameters using the date format YYYY-MM-DD. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
   * 
   */
  info(teamId: string, requestBody: TeamDailyUsageInfoOpts): Promise<Array<TeamDailyUsage>>
  }
  /** A Heroku team becomes delinquent due to non-payment. We [suspend and delete](https://help.heroku.com/EREVRILX/what-happens-if-i-have-unpaid-heroku-invoices) delinquent teams if their invoices remain unpaid. */
  teamDelinquency: {
  /** Team delinquency information. */
  info(teamIdentity: string): Promise<TeamDelinquency>
  }
  /** A team feature represents a feature enabled on a team account. */
  teamFeature: {
  /** Info for an existing team feature. */
  info(teamIdentity: string, teamFeatureIdentity: string): Promise<TeamFeature>
  /** List existing team features. */
  list(teamIdentity: string): Promise<Array<TeamFeature>>
  }
  /** A team invitation represents an invite to a team. */
  teamInvitation: {
  /** Get a list of a team's Identity Providers */
  list(teamName: string): Promise<Array<TeamInvitation>>
  /** Create Team Invitation */
  create(teamIdentity: string, requestBody: TeamInvitationCreateOpts): Promise<TeamInvitation>
  /** Revoke a team invitation. */
  revoke(teamIdentity: string, teamInvitationIdentity: string): Promise<TeamInvitation>
  /** Get an invitation by its token */
  get(teamInvitationToken: string): Promise<TeamInvitation>
  /** Accept Team Invitation */
  accept(teamInvitationToken: string): Promise<TeamMember>
  }
  /** A Team Invoice is an itemized bill of goods for a team which includes pricing and charges. */
  teamInvoice: {
  /** Info for existing invoice. */
  info(teamIdentity: string, teamInvoiceIdentity: number): Promise<TeamInvoice>
  /** List existing invoices. */
  list(teamIdentity: string): Promise<Array<TeamInvoice>>
  }
  /** A team member is an individual with access to a team. */
  teamMember: {
  /** Create a new team member, or update their role. */
  createOrUpdate(teamIdentity: string, requestBody: TeamMemberCreateOrUpdateOpts): Promise<TeamMember>
  /** Create a new team member. */
  create(teamIdentity: string, requestBody: TeamMemberCreateOpts): Promise<TeamMember>
  /** Update a team member. */
  update(teamIdentity: string, requestBody: TeamMemberUpdateOpts): Promise<TeamMember>
  /** Remove a member from the team. */
  delete(teamIdentity: string, teamMemberIdentity: string): Promise<TeamMember>
  /** List members of the team. */
  list(teamIdentity: string): Promise<Array<TeamMember>>
  /** List the apps of a team member. */
  listByMember(teamIdentity: string, teamMemberIdentity: string): Promise<Array<TeamApp>>
  }
  /** Usage for an enterprise team at a monthly resolution. */
  teamMonthlyUsage: {
  /**
   * Retrieves usage for an enterprise team for a range of months. Start and end dates can be specified as query parameters using the date, YYYY-MM. If no end date is specified, one month of usage is returned. The team identifier can be found from the [team list endpoint](https://devcenter.heroku.com/articles/platform-api-reference#team-list).
   * 
   */
  info(teamId: string, requestBody: TeamMonthlyUsageInfoOpts): Promise<Array<TeamMonthlyUsage>>
  }
  /** Tracks a Team's Preferences */
  teamPreferences: {
  /** Retrieve Team Preferences */
  list(teamPreferencesIdentity: string): Promise<TeamPreferences>
  /** Update Team Preferences */
  update(teamPreferencesIdentity: string, requestBody: TeamPreferencesUpdateOpts): Promise<TeamPreferences>
  }
  /** A space is an isolated, highly available, secure app execution environment. */
  teamSpace: {
  /** List spaces owned by the team */
  list(teamIdentity: string): Promise<Array<Space>>
  }
  /** Teams allow you to manage access to a shared group of applications and other resources. */
  team: {
  /** List teams in which you are a member. */
  list(): Promise<Array<Team>>
  /** Info for a team. */
  info(teamIdentity: string): Promise<Team>
  /** Update team properties. */
  update(teamIdentity: string, requestBody: TeamUpdateOpts): Promise<Team>
  /** Create a new team. */
  create(requestBody: TeamCreateOpts): Promise<Team>
  /** Delete an existing team. */
  delete(teamIdentity: string): Promise<Team>
  /** List teams for an enterprise account. */
  listByEnterpriseAccount(enterpriseAccountIdentity: string): Promise<Array<Team>>
  /** Create a team in an enterprise account. */
  createInEnterpriseAccount(enterpriseAccountIdentity: string, requestBody: TeamCreateInEnterpriseAccountOpts): Promise<Team>
  }
  /** A telemetry drain forwards OpenTelemetry traces, metrics, and logs to your own consumer. For Fir-generation apps only. */
  telemetryDrain: {
  /** Create a telemetry drain. */
  create(requestBody: TelemetryDrainCreateOpts): Promise<TelemetryDrain>
  /** List telemetry drains for an app. */
  listByApp(appIdentity: string): Promise<Array<TelemetryDrain>>
  /** List telemetry drains for a space. */
  listBySpace(spaceIdentity: string): Promise<Array<TelemetryDrain>>
  /** Update a telemetry drain. */
  update(telemetryDrainIdentity: string, requestBody: TelemetryDrainUpdateOpts): Promise<TelemetryDrain>
  /** Delete a telemetry drain. */
  delete(telemetryDrainIdentity: string): Promise<TelemetryDrain>
  /** Info for a telemetry drain. */
  info(telemetryDrainIdentity: string): Promise<TelemetryDrain>
  }
  /** A single test case belonging to a test run */
  testCase: {
  /** List test cases */
  list(testRunId: string): Promise<TestCase>
  }
  /** A single test node belonging to a test run */
  testNode: {
  /** List test nodes */
  list(testRunIdentity: string): Promise<TestNode>
  }
  /** An execution or trial of one or more tests */
  testRun: {
  /** Create a new test-run. */
  create(requestBody: TestRunCreateOpts): Promise<TestRun>
  /** Info for existing test-run. */
  info(testRunId: string): Promise<TestRun>
  /** List existing test-runs for a pipeline. */
  list(pipelineId: string): Promise<TestRun>
  /** Info for existing test-run by Pipeline */
  infoByPipeline(pipelineId: string, testRunNumber: number): Promise<TestRun>
  /** Update a test-run's status. */
  update(testRunNumber: number, requestBody: TestRunUpdateOpts): Promise<TestRun>
  }
  /** Tracks a user's preferences and message dismissals */
  userPreferences: {
  /** Retrieve User Preferences */
  list(userPreferencesIdentity: '~'): Promise<UserPreferences>
  /** Update User Preferences */
  update(userPreferencesIdentity: '~', requestBody: UserPreferencesUpdateOpts): Promise<UserPreferences>
  }
  /** [VPN](https://devcenter.heroku.com/articles/private-space-vpn-connection) provides a way to connect your Private Spaces to your network via VPN. */
  vpnConnection: {
  /** Create a new VPN connection in a private space. */
  create(spaceIdentity: string, requestBody: VpnConnectionCreateOpts): Promise<VpnConnection>
  /** Destroy existing VPN Connection */
  destroy(spaceIdentity: string, vpnConnectionIdentity: string): Promise<VpnConnection>
  /** List VPN connections for a space. */
  list(spaceIdentity: string): Promise<Array<VpnConnection>>
  /** Info for an existing vpn-connection. */
  info(spaceIdentity: string, vpnConnectionIdentity: string): Promise<VpnConnection>
  /** Update a VPN connection in a private space. */
  update(spaceIdentity: string, vpnConnectionIdentity: string, requestBody: VpnConnectionUpdateOpts): Promise<VpnConnection>
  }
  /** Add-on Single Sign-on generates URL that allows a customer to log in to an Add-on Service's web dashboard. */
  addOnSso: {
  /** Generate a timestamp-based single sign-on URL. */
  addOnSSO(addOnIdentity: string): Promise<AddOnSso>
  /** Generate a timestamp-based single sign-on URL. */
  addOnSSOByApp(appIdentity: string, addOnIdentity: string): Promise<AddOnSso>
  }
  /** Build metadata contains the reference data for building the associated App. */
  buildMetadata: {
  /** Build metadata for app. */
  info(appIdentity: string): Promise<BuildMetadata>
  }
  /** A capability represents a requested capability on a resource along with whether the requesting user has that capability */
  capability: {
  /**
   * Request to check a list of capabilities the current user (yourself). An capability is a tuple of
   * (capability, resource_id, resource_type). The endpoint will then respond with a `capable` boolean
   * true or false for each requested capability. This boolean indicates whether the authenticated user
   * has the requested capability on the resource.
   * 
   */
  capabilities(requestBody: CapabilityCapabilitiesOpts): Promise<CapabilityCapabilitiesResult>
  }
  /** The Config Vars Settings endpoints enable you to view and manage the configuration provided to an app on Heroku. These endpoints are similar to /config-vars but also allow you to check which config vars you can mask, and which are currently masked. */
  configVarsSettings: {
  /** Get additional info for an app's config vars, including which config vars you can mask, and which are currently masked. */
  list(appIdentity: string): Promise<Array<ConfigVarsSettings>>
  /** Update a config var. You can update an existing config var's value by setting it again, and you can remove it by setting it to `null`. You can't unmask a masked config var. */
  update(appIdentity: string, requestBody: ConfigVarsSettingsUpdateOpts): Promise<ConfigVarsSettings>
  }
  /** Run processes inside existing dynos. */
  dynoProcesses: {
  /** Create a new process in an existing dyno. */
  create(appIdentity: string, dynoIdentity: string, requestBody: DynoProcessesCreateOpts): Promise<DynoProcesses>
  }
  /** Contains a set of information useful for identifying a user and the type of access this user is allowed to have. */
  gatewayToken: {
  /**
   * Generate a gateway token for a user. Note that a JWT version of the
   * token will be available in `Heroku-Gateway-Token` header.
   * 
   */
  create(): Promise<GatewayToken>
  /**
   * Generates a Proxy oauth acccess tokens for the passed in gateway token.
   * This new proxy token is designed to have a shorter lifetime than the
   * user supplied token so it is safe to pass to futher downstream services
   * without increasing the breadth of the long lived tokens.
   * 
   */
  oAuthToken(): Promise<OauthToken>
  }
  /** Actions taken on Identity Providers, the SSO configuration representation. */
  identityProviderActions: {
  /** Migrate an Identity Provider */
  update(identityProviderIdentity: string): Promise<IdentityProvider>
  }
  /** Certificates represent an sso cert attached to an Identity Provider */
  identityProviderCertificate: {
  /** Destroy a Certificate */
  delete(identityProvidersIdentity: string, certificatesIdentity: string): Promise<IdentityProviderCertificate>
  /** Create a Certificate */
  create(identityProviderIdentity: string, requestBody: IdentityProviderCertificateCreateOpts): Promise<IdentityProviderCertificate>
  /** Update a Certificate */
  update(identityProvidersIdentity: string, certificatesIdentity: string, requestBody: IdentityProviderCertificateUpdateOpts): Promise<IdentityProviderCertificate>
  /** Get a Certificate */
  info(identityProvidersIdentity: string, certificatesIdentity: string): Promise<IdentityProviderCertificate>
  }
  /** The on file payment method for an account */
  paymentMethod: {
  /** Update an existing payment method for an account. */
  update(requestBody: PaymentMethodUpdateOpts): Promise<PaymentMethod>
  /** Get the current payment method for an account. */
  get(): Promise<PaymentMethod>
  }
  /** A payment represents money collected for an account */
  payment: {
  /** Create a payment on an existing account */
  createPost(requestBody: PaymentCreatePostOpts): Promise<Payment>
  /** Create a payment on an existing team */
  createPost(teamIdentity: string, requestBody: PaymentCreatePostOpts): Promise<Payment>
  }
  /** Plan meters describe how a metered add-on plan bills for usage. */
  planMeter: {
  /** List active meters for an existing plan. */
  list(planIdentity: string): Promise<Array<PlanMeter>>
  /** Info for an existing plan meter. Meter identifier may be either the meter's uuid (unique across all meters) or name (unique within the plan). */
  info(planIdentity: string, planMeterIdentity: string): Promise<PlanMeter>
  }
  /** [Space Hosts](https://devcenter.heroku.com/articles/private-spaces-dedicated-hosts?preview=1) lists dedicated hosts allocated to a space */
  spaceHost: {
  /** List hosts */
  list(spaceIdentity: string): Promise<Array<SpaceHost>>
  }
  /** Single log drain for all apps in a Private Space */
  spaceLogDrain: {
  /** Current log drain for a space. */
  info(spaceIdentity: string): Promise<LogDrain>
  /** Update log drain for a space. */
  update(spaceIdentity: string, requestBody: SpaceLogDrainUpdateOpts): Promise<LogDrain>
  }
  /** A team license is credits provided and consumed by the team. */
  teamLicense: {
  /** List teams licenses. */
  list(teamIdentity: string): Promise<Array<TeamLicense>>
  }
  /** A team license collection is credits provided and consumed by the team per period. */
  teamLicenseCollection: {
  /** List team licenses. */
  list(teamIdentity: string): Promise<Array<TeamLicenseCollection>>
  }
  /** Telemetry Ingress Info allows add-on partners to view authorization information required to write to Fir app logs. */
  telemetryIngressInfo: {
  /** Fetch telemetry ingress info. */
  info(addOnAttachmentIdentity: string): Promise<TelemetryIngressInfo>
  }
  /** Usage history for resources. */
  usageHistory: {
  /**
   * Retrieves usage history for a resource. Supports queries up to 3 months in the past. Start date and duration can be specified as query parameters. Default is to show the past 1 month of usage.
   * 
   */
  info(usageHistoryResourceId: string, requestBody: UsageHistoryInfoOpts): Promise<UsageHistory>
  }
  /** Usage for apps. */
  usage: {
  /**
   * Retrieves usage for an app.
   * 
   */
  infoGet(appIdentity: string): Promise<Usage>
  /**
   * Retrieves usage for an app belonging to a particular team.
   * 
   */
  infoGet(teamIdentity: string, teamAppIdentity: string): Promise<Usage>
  /**
   * Retrieves usage for apps belonging to a particular team.
   * 
   */
  infoGet(teamIdentity: string): Promise<UsageInfoGetResult>
  }
}
