export interface AccountDelinquency {
  scheduled_suspension_time: string | null
  scheduled_deletion_time: string | null
}

export interface AccountFeature {
  created_at: string
  description: string
  doc_url: string
  enabled: boolean
  id: string
  name: string
  state: string
  updated_at: string
  display_name: string
  feedback_email: string
}

export interface Account {
  allow_tracking: boolean
  beta: boolean
  created_at: string
  email: string
  federated: boolean
  id: string
  identity_provider: {
    id: string
    name: string
    team: {
      name: string
    }
    organization: {
      name: string
    }
    owner: {
      id: string
      name: string
      type: 'team' | 'enterprise-account'
    }
  } | null
  last_login: string | null
  name: string | null
  sms_number: string | null
  suspended_at: string | null
  delinquent_at: string | null
  two_factor_authentication: boolean
  updated_at: string
  verified: boolean
  country_of_residence: string | null
  eco_dynos_enabled: boolean
  eco_dynos_shutdown_at: string | null
  pipeline_cost_consent_at: string | null
  acknowledged_msa: boolean
  acknowledged_msa_at: string | null
  italian_customer_terms: string | null
  italian_partner_terms: string | null
  mfa_enabled: boolean
  mfa_exemption: boolean
  mfa_exemption_reason: string | null
  mfa_experience: 'vaas' | 'legacy'
  default_organization: {
    id: string
    name: string
  } | null
  default_team: {
    id: string
    name: string
  } | null
}

export interface AddOnAction {

}

export interface AddOnAttachment {
  addon: {
    id: string
    name: string
    app: {
      id: string
      name: string
    }
  }
  app: {
    id: string
    name: string
  }
  created_at: string
  id: string
  name: string
  namespace: string | null
  updated_at: string
  web_url: string | null
  log_input_url: string | null
}

export interface AddOnConfig {
  name: string
  value: string | null
}

export interface AddOnPlanAction {
  id: string
  label: string
  action: string
  url: string
  requires_owner: boolean
}

export interface AddOnRegionCapability {
  id: string
  supports_private_networking: boolean
  addon_service: AddOnService
  region: Region
}

export interface AddOnService {
  cli_plugin_name: string | null
  created_at: string
  human_name: string
  id: string
  name: string
  state: 'alpha' | 'beta' | 'ga' | 'shutdown'
  supports_multiple_installations: boolean
  supports_sharing: boolean
  updated_at: string
  supported_generations: Array<{
    name: string
    id: string
  }>
}

export interface AddOnWebhook {
  created_at: string
  id: string
  include: Array<string>
  level: 'notify' | 'sync'
  updated_at: string
  url: string
}

export interface AddOn {
  actions: Array<Record<string, unknown>>
  addon_service: {
    id: string
    name: string
  } | AddOnService
  billing_entity: {
    id: string
    name: string
    type: 'app' | 'team'
  }
  app: {
    id: string
    name: string
  }
  billed_price: {
    cents: number
    contract: boolean
    metered: boolean
    unit: string
  } | null
  config_vars: Array<string>
  created_at: string
  id: string
  name: string
  plan: {
    id: string
    name: string
  } | Plan
  provider_id: string
  provision_message: string
  state: 'provisioning' | 'provisioned' | 'deprovisioned'
  updated_at: string
  web_url: string | null
}

export interface AllowedAddOnService {
  added_at: string
  added_by: {
    email: string
    id: string
  }
  addon_service: {
    id: string
    name: string
    human_name: string
  }
  id: string
}

export interface AppFeature {
  created_at: string
  description: string
  doc_url: string
  enabled: boolean
  id: string
  name: string
  state: string
  updated_at: string
  display_name: string
  feedback_email: string
}

export interface AppSetup {
  id: string
  created_at: string
  updated_at: string
  status: 'failed' | 'pending' | 'succeeded'
  failure_message: string | null
  app: {
    id: string
    name: string
  }
  build: {
    id: string
    status: 'failed' | 'pending' | 'succeeded'
    output_stream_url: string
  } | null
  manifest_errors: Array<string>
  postdeploy: {
    output: string
    exit_code: number
  } | null
  resolved_success_url: string | null
}

export interface AppTransfer {
  app: {
    name: string
    id: string
  }
  created_at: string
  id: string
  owner: {
    email: string
    id: string
  }
  recipient: {
    email: string
    id: string
  }
  state: 'pending' | 'accepted' | 'declined'
  updated_at: string
}

export interface AppWebhookDelivery {
  created_at: string
  event: {
    id: string
    include: string
  }
  id: string
  num_attempts: number
  next_attempt_at: string | null
  last_attempt: {
    id: string
    code: number | null
    error_class: string | null
    status: 'scheduled' | 'succeeded' | 'failed'
    created_at: string
    updated_at: string
  } | null
  status: 'pending' | 'scheduled' | 'retrying' | 'failed' | 'succeeded'
  updated_at: string
  webhook: {
    id: string
    level: 'notify' | 'sync'
  }
}

export interface AppWebhookEvent {
  created_at: string
  id: string
  include: string
  payload: {
    action: string
    actor: {
      email: string
      id: string
    }
    data: Record<string, unknown>
    previous_data: Record<string, unknown>
    resource: string
    version: string
  }
  updated_at: string
}

export interface App {
  acm: boolean
  archived_at: string | null
  base_image_name: string | null
  build_stack: {
    id: string
    name: string
  }
  buildpack_provided_description: string | null
  buildpacks: Array<{
    id: string
    version: string
    homepage: string
  }> | null
  created_at: string
  current_build_architecture: unknown[]
  generation: string
  git_url: string
  id: string
  internal_routing: boolean | null
  maintenance: boolean
  name: string
  owner: {
    email: string
    id: string
  }
  organization: {
    id: string
    name: string
  } | null
  team: {
    id: string
    name: string
  } | null
  region: {
    id: string
    name: string
  }
  released_at: string | null
  repo_size: number | null
  slug_size: number | null
  space: {
    id: string
    name: string
    shield: boolean
  } | null
  stack: {
    id: string
    name: string
  }
  updated_at: string
  web_url: string | null
}

export interface Archive {
  created_at: string
  month: '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12'
  year: number
  url: string
  checksum: string
  size: number
}

export interface AuditTrailEvent {
  created_at: string
  id: string
  type: string
  action: string
  actor: {
    id: string
    email: string
  }
  app: {
    id: string
    name: string
  }
  owner: {
    id: string
    email: string
  }
  enterprise_account: {
    id: string
    name: string
  }
  team: {
    id: string
    name: string
  }
  request: {
    ip_address: string
  }
  data: Record<string, unknown>
}

export interface Build {
  app: {
    id: string
  }
  buildpacks: Array<{
    url: string
    name: string
  }> | null
  created_at: string
  id: string
  labs: Record<string, unknown>
  output_stream_url: string
  source_blob: {
    checksum: string | null
    url: string
    version: string | null
    version_description: string | null
  }
  release: {
    id: string
  } | null
  slug: {
    id: string
  } | null
  stack: string
  status: 'failed' | 'pending' | 'succeeded'
  updated_at: string
  user: {
    id: string
    email: string
  }
}

export interface BuildpackInstallation {
  ordinal: number
  buildpack: {
    url: string
    name: string
  }
}

export interface Collaborator {
  app: {
    name: string
    id: string
  }
  created_at: string
  id: string
  permissions: Array<TeamAppPermission>
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
  updated_at: string
  user: {
    email: string
    federated: boolean
    id: string
  }
}

export interface Credit {
  amount: number
  balance: number
  created_at: string
  expires_at: string
  id: string
  title: string
  updated_at: string
}

export interface Domain {
  acm_status: string | null
  acm_status_reason: string | null
  app: {
    name: string
    id: string
  }
  cname: string | null
  created_at: string
  hostname: string
  id: string
  kind: 'heroku' | 'custom'
  updated_at: string
  status: string
  sni_endpoint: {
    name: string
    id: string
  } | null
}

export interface DynoSize {
  architecture: string
  compute: number
  can_autoscale: boolean
  cost: Record<string, unknown> | null
  dedicated: boolean
  precise_dyno_units: number
  id: string
  memory: number
  name: string
  private_space_only: boolean
  generation: {
    id: string
    name: string
  }
  infrastructure_tier: string
  product_dyno_tier: string
}

export interface Dyno {
  attach_url: string | null
  command: string
  created_at: string
  id: string
  name: string
  release: {
    id: string
    version: number
  }
  app: {
    name: string
    id: string
  }
  size: string
  state: string
  type: string
  updated_at: string
}

export interface EnterpriseAccountDailyUsage {
  addons: number
  teams: Array<{
    addons: number
    apps: Array<{
      addons: number
      app_name: string
      data: number
      dynos: number
      partner: number
    }>
    data: number
    dynos: number
    id: string
    name: string
    partner: number
    space: number
  }>
  data: number
  date: string
  dynos: number
  id: string
  name: string
  partner: number
  space: number
}

export interface EnterpriseAccountMember {
  enterprise_account: {
    id: string
    name: string
  }
  id: string
  permissions: Array<{
    description: string
    name: 'view' | 'create' | 'manage' | 'billing'
  }>
  user: {
    email: string
    id: string
  }
  two_factor_authentication: boolean
  identity_provider: {
    id: string
    name: string
    redacted: boolean
    owner: {
      id: string
      name: string
      type: 'team' | 'enterprise-account'
    }
  } | null
}

export interface EnterpriseAccountMonthlyUsage {
  addons: number
  teams: Array<{
    addons: number
    apps: Array<{
      addons: number
      app_name: string
      data: number
      dynos: number
      partner: number
    }>
    connect: number
    data: number
    dynos: number
    id: string
    name: string
    partner: number
    space: number
  }>
  connect: number
  data: number
  dynos: number
  id: string
  month: string
  name: string
  partner: number
  space: number
}

export interface EnterpriseAccount {
  id: string
  created_at: string
  name: string
  updated_at: string
  permissions: Array<string>
  trial: boolean
  partner_benefits: boolean
  identity_provider: {
    id: string
    name: string
    owner: {
      id: string
      name: string
      type: 'team' | 'enterprise-account'
    }
  } | null
}

export interface Formation {
  app: {
    name: string
    id: string
  }
  command: string
  created_at: string
  dyno_size: {
    id: string
    name: string
  }
  id: string
  quantity: number
  size: string
  type: string
  updated_at: string
}

export interface Generation {
  created_at: string
  id: string
  name: string
  updated_at: string
  unsupported_features: Array<string>
  expanded_supported_features: Array<{
    name: string
    incompatible_type: string
    scope: string
  }>
}

export interface IdentityProvider {
  certificate: string | null
  certificates: Array<{
    created_at: string
    id: string
    expires_at: string
    body: string
    name: string | null
  }>
  created_at: string
  entity_id: string
  id: string
  name: string
  owner: {
    id: string
    name: string
    type: 'team' | 'enterprise-account'
  }
  slo_target_url: string
  sso_target_url: string
  updated_at: string
  enabled: boolean
  heroku_start_url: string
  heroku_entity_id: string
  heroku_acs_url: string
}

export interface InboundRuleset {
  id: string
  space: {
    id: string
    name: string
  }
  created_at: string
  rules: Array<{
    action: 'allow' | 'deny'
    source: string
  }>
  created_by: string
}

export interface InvoiceAddress {
  address_1: string
  address_2: string
  city: string
  country: string
  heroku_id: string
  other: string
  postal_code: string
  state: string
  use_invoice_address: boolean
}

export interface Invoice {
  charges_total: number
  created_at: string
  credits_total: number
  id: string
  number: number
  period_end: string
  period_start: string
  state: number
  total: number
  updated_at: string
}

export interface Key {
  comment: string
  created_at: string
  email: string
  fingerprint: string
  id: string
  public_key: string
  updated_at: string
}

export interface LogDrain {
  addon: {
    id: string
    name: string
    app: {
      id: string
      name: string
    }
  } | null
  app: {
    id: string
    name: string
  } | null
  created_at: string
  id: string
  token: string
  updated_at: string
  url: string
}

export interface LogSession {
  created_at: string
  id: string
  logplex_url: string
  updated_at: string
}

export interface OauthAuthorization {
  access_token: {
    expires_in: number | null
    id: string
    token: string
    version: number
  } | null
  client: {
    id: string
    name: string
    redirect_uri: string
  } | null
  created_at: string
  description: string
  grant: {
    code: string
    expires_in: number
    id: string
  } | null
  id: string
  refresh_token: {
    expires_in: number | null
    id: string
    token: string
  } | null
  scope: Array<string>
  session: {
    id: string
  } | null
  updated_at: string
  user: {
    id: string
    email: string
    full_name: string | null
  }
}

export interface OauthClient {
  created_at: string
  id: string
  ignores_delinquent: boolean | null
  name: string
  redirect_uri: string
  secret: string
  updated_at: string
}

export interface OauthGrant {

}

export interface OauthToken {
  access_token: {
    expires_in: number | null
    id: string
    token: string
  }
  authorization: {
    id: string
  }
  client: {
    secret: string
  } | null
  created_at: string
  grant: {
    code: string
    type: string
  }
  id: string
  refresh_token: {
    expires_in: number | null
    id: string
    token: string
    version: number
  }
  session: {
    id: string
  }
  updated_at: string
  user: {
    id: string
  }
}

export interface OciImage {
  id: string
  base_image_name: string
  base_top_layer: string
  commit: string
  commit_description: string
  image_repo: string
  digest: string
  stack: {
    id: string
    name: string
  }
  process_types: Record<string, {
    name: string
    display_cmd: string
    command: string
    working_dir: string
    default: boolean | null
  }>
  buildpacks: Array<{
    id: string
    version: string
    homepage: string
  }>
  created_at: string
  updated_at: string
  architecture: string | null
}

export interface PasswordReset {
  created_at: string
  user: {
    email: string
    id: string
  }
}

export interface PeeringInfo {
  aws_account_id: string
  aws_region: 'ap-south-1' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'eu-central-1' | 'ap-northeast-2' | 'ap-northeast-1' | 'us-east-1' | 'sa-east-1' | 'us-west-1' | 'us-west-2'
  vpc_id: string
  vpc_cidr: string
  dyno_cidr_blocks: Array<string>
  unavailable_cidr_blocks: Array<string>
  space_cidr_blocks: Array<string>
}

export interface Peering {
  type: 'heroku-managed' | 'customer-managed' | 'unknown' | 'slowdb' | 'heroku-postgresql' | 'heroku-redis' | 'heroku-kafka' | 'heroku-cassandra'
  pcx_id: string
  cidr_block: string
  cidr_blocks: Array<string>
  status: 'initiating-request' | 'pending-acceptance' | 'provisioning' | 'active' | 'failed' | 'expired' | 'rejected' | 'deleted'
  aws_vpc_id: string
  aws_region: string
  aws_account_id: string
  expires: string
}

export interface PermissionEntity {
  id: string
  name: string
  team_id: string
  type: 'app' | 'space'
  users: Array<{
    email: string
    id: string
    permissions: Array<string>
  }>
}

export interface PipelineBuild {
  app: {
    id: string
  }
  buildpacks: Array<{
    url: string
    name: string
  }> | null
  created_at: string
  id: string
  output_stream_url: string
  source_blob: {
    checksum: string | null
    url: string
    version: string | null
    version_description: string | null
  }
  release: {
    id: string
  } | null
  slug: {
    id: string
  } | null
  stack: string
  status: 'failed' | 'pending' | 'succeeded'
  updated_at: string
  user: {
    id: string
    email: string
  }
}

export interface PipelineConfigVar {
  '["NAME"]: ["value"]': Record<string, unknown>
}

export interface PipelineCoupling {
  app: {
    id: string
  }
  created_at: string
  id: string
  pipeline: {
    id: string
  }
  stage: 'test' | 'review' | 'development' | 'staging' | 'production'
  updated_at: string
}

export interface PipelineDeployment {
  addon_plan_names: Array<string>
  artifacts: {
    type: string
    id: string | string
  }
  app: {
    name: string
    id: string
  }
  created_at: string
  description: string
  id: string
  updated_at: string
  slug: {
    id: string
  } | null
  status: 'expired' | 'failed' | 'pending' | 'succeeded'
  user: {
    id: string
    email: string
  }
  version: number
  current: boolean
  output_stream_url: string | null
  eligible_for_rollback: boolean
}

export interface PipelinePromotionTarget {
  app: {
    id: string
  }
  error_message: string | null
  id: string
  pipeline_promotion: {
    id: string
  }
  release: {
    id: string
  } | null
  status: 'pending' | 'succeeded' | 'failed'
}

export interface PipelinePromotion {
  created_at: string
  id: string
  pipeline: {
    id: string
  }
  source: {
    app: {
      id: string
    }
    release: {
      id: string
    }
  }
  status: 'pending' | 'completed'
  updated_at: string | null
}

export interface PipelineRelease {
  addon_plan_names: Array<string>
  artifacts: {
    type: string
    id: string | string
  }
  app: {
    name: string
    id: string
  }
  created_at: string
  description: string
  id: string
  updated_at: string
  slug: {
    id: string
  } | null
  status: 'expired' | 'failed' | 'pending' | 'succeeded'
  user: {
    id: string
    email: string
  }
  version: number
  current: boolean
  output_stream_url: string | null
  eligible_for_rollback: boolean
}

export interface PipelineStack {
  stack: {
    id: string
    name: string
  } | null
}

export interface PipelineTransfer {
  pipeline: {
    id: string
  }
  previous_owner: {
    id: string
    type: string
  } | null
  new_owner: {
    id: string
    type: string
  } | null
}

export interface Pipeline {
  created_at: string
  id: string
  name: string
  owner: {
    id: string
    type: string
  } | null
  updated_at: string
  generation: {
    id: string
    name: string
  }
}

export interface Plan {
  addon_service: {
    id: string
    name: string
  }
  created_at: string
  compliance: Array<'HIPAA' | 'PCI'> | null
  default: boolean
  description: string
  human_name: string
  id: string
  installable_inside_private_network: boolean
  installable_outside_private_network: boolean
  name: string
  price: {
    cents: number
    contract: boolean
    metered: boolean
    unit: string
  }
  space_default: boolean
  state: string
  updated_at: string
  visible: boolean
}

export interface RateLimit {
  remaining: number
}

export interface Region {
  country: string
  created_at: string
  description: string
  id: string
  locale: string
  name: string
  private_capable: boolean
  provider: {
    name: string
    region: 'ap-south-1' | 'eu-west-1' | 'ap-southeast-1' | 'ap-southeast-2' | 'eu-central-1' | 'eu-west-2' | 'ap-northeast-2' | 'ap-northeast-1' | 'us-east-1' | 'sa-east-1' | 'us-west-1' | 'us-west-2' | 'ca-central-1'
  }
  updated_at: string
}

export interface Release {
  addon_plan_names: Array<string>
  artifacts: Array<{
    type: string
    id: string | string
  }>
  app: {
    name: string
    id: string
  }
  created_at: string
  description: string
  id: string
  updated_at: string
  oci_image: {
    id: string
  } | null
  slug: {
    id: string
  } | null
  status: 'expired' | 'failed' | 'pending' | 'succeeded'
  user: {
    id: string
    email: string
  }
  version: number
  current: boolean
  output_stream_url: string | null
  eligible_for_rollback: boolean
}

export interface ReviewApp {
  app: {
    id: string
  } | null
  app_setup: {
    id: string
  } | null
  branch: string
  created_at: string
  id: string
  pipeline: {
    id: string
  }
  status: 'pending' | 'creating' | 'created' | 'deleting' | 'deleted' | 'errored'
  updated_at: string
  creator: Record<string, unknown>
  wait_for_ci: boolean
  error_status: string | null
  message: string | null
  fork_repo: {
    id: number | null
  } | null
  pr_number: number | null
}

export interface ReviewAppConfig {
  repo: {
    id: number
  }
  automatic_review_apps: boolean
  deploy_target: {
    id: string
    type: string
  } | null
  destroy_stale_apps: boolean
  stale_days: number
  pipeline_id: string
  wait_for_ci: boolean
  base_name: string | null
}

export interface Slug {
  blob: {
    method: string
    url: string
  }
  buildpack_provided_description: string | null
  checksum: string | null
  commit: string | null
  commit_description: string | null
  created_at: string
  id: string
  process_types: Record<string, string>
  size: number | null
  stack: {
    id: string
    name: string
  }
  updated_at: string
  deleted_at: string | null
}

export interface SmsNumber {
  sms_number: string | null
}

export interface SniEndpoint {
  certificate_chain: string
  created_at: string
  id: string
  name: string
  updated_at: string
  display_name: string | null
  domains: Array<string>
  app: {
    id: string
    name: string
  }
  ssl_cert: {
    'ca_signed?': boolean
    cert_domains: unknown[]
    expires_at: string
    issuer: string
    'self_signed?': boolean
    starts_at: string
    subject: string
    id: string
  }
}

export interface Source {
  source_blob: {
    get_url: string
    put_url: string
  }
}

export interface SpaceAppAccess {
  space: {
    name: string
    id: string
  }
  created_at: string
  id: string
  permissions: Array<{
    description: string
    name: string
  }>
  updated_at: string
  user: {
    email: string
    id: string
  }
}

export interface SpaceNat {
  created_at: string
  sources: Array<string>
  state: 'disabled' | 'updating' | 'enabled'
  updated_at: string
}

export interface SpaceTopology {
  version: number
  apps: Array<{
    id: string
    domains: unknown[]
    formation: Array<{
      id: string
      process_type: string
      dynos: Array<{
        id: string
        number: number
        private_ip: string
        hostname: string
      }>
    }>
  }>
}

export interface Space {
  created_at: string
  id: string
  name: string
  organization: {
    name: string
  }
  team: {
    id: string
    name: string
  }
  region: {
    id: string
    name: string
  }
  shield: boolean
  state: 'allocating' | 'allocated' | 'deleting'
  updated_at: string
  cidr: string
  data_cidr: string
  generation: string
}

export interface Stack {
  default: boolean
  created_at: string
  id: string
  name: string
  state: string
  updated_at: string
}

export interface TeamAppCollaborator {
  app: {
    name: string
    id: string
  }
  created_at: string
  id: string
  permissions: Array<TeamAppPermission>
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
  updated_at: string
  user: {
    email: string
    federated: boolean
    id: string
  }
}

export interface TeamAppPermission {
  name: string
  description: string
}

export interface TeamApp {
  archived_at: string | null
  base_image_name: string | null
  build_stack: {
    id: string
    name: string
  }
  buildpack_provided_description: string | null
  buildpacks: Array<{
    id: string
    version: string
    homepage: string
  }> | null
  current_build_architecture: unknown[]
  created_at: string
  generation: string
  git_url: string
  id: string
  internal_routing: boolean | null
  joined: boolean
  locked: boolean
  maintenance: boolean
  name: string
  team: {
    name: string
  } | null
  owner: {
    email: string
    id: string
  } | null
  region: {
    id: string
    name: string
  }
  released_at: string | null
  repo_size: number | null
  slug_size: number | null
  space: {
    id: string
    name: string
  } | null
  stack: {
    id: string
    name: string
  }
  updated_at: string
  web_url: string | null
}

export interface TeamDailyUsage {
  addons: number
  apps: Array<{
    addons: number
    app_name: string
    data: number
    dynos: number
    partner: number
  }>
  data: number
  date: string
  dynos: number
  id: string
  name: string
  partner: number
  space: number
}

export interface TeamDelinquency {
  scheduled_suspension_time: string | null
  scheduled_deletion_time: string | null
}

export interface TeamFeature {
  created_at: string
  description: string
  doc_url: string
  enabled: boolean
  id: string
  name: string
  state: string
  updated_at: string
  display_name: string
  feedback_email: string
}

export interface TeamInvitation {
  created_at: string
  id: string
  invited_by: {
    email: string
    id: string
    name: string | null
  }
  team: {
    id: string
    name: string
  }
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
  updated_at: string
  user: {
    email: string
    id: string
    name: string | null
  }
}

export interface TeamInvoice {
  addons_total: number
  database_total: number
  charges_total: number
  created_at: string
  credits_total: number
  dyno_units: number
  id: string
  number: number
  payment_status: string
  period_end: string
  period_start: string
  platform_total: number
  state: number
  total: number
  updated_at: string
  weighted_dyno_hours: number
}

export interface TeamMember {
  created_at: string
  email: string
  federated: boolean
  id: string
  identity_provider: {
    id: string
    name: string
    redacted: boolean
    owner: {
      id: string
      name: string
      type: 'team' | 'enterprise-account'
    }
  } | null
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
  two_factor_authentication: boolean
  updated_at: string
  user: {
    email: string
    id: string
    name: string | null
  }
}

export interface TeamMonthlyUsage {
  addons: number
  apps: Array<{
    addons: number
    app_name: string
    data: number
    dynos: number
    partner: number
  }>
  connect: number
  data: number
  dynos: number
  id: string
  month: string
  name: string
  partner: number
  space: number
}

export interface TeamPreferences {
  'default-permission': 'admin' | 'member' | 'viewer' | null
  'addons-controls': boolean | null
}

export interface Team {
  id: string
  created_at: string
  credit_card_collections: boolean
  default: boolean
  enterprise_account: {
    id: string
    name: string
  } | null
  identity_provider: {
    id: string
    name: string
    owner: {
      id: string
      name: string
      type: 'team' | 'enterprise-account'
    }
  } | null
  membership_limit: number | null
  pipeline_cost_consent_at: string | null
  pipeline_cost_consent_user_email: string | null
  name: string
  provisioned_licenses: boolean
  role: 'admin' | 'collaborator' | 'member' | 'owner' | null
  type: 'enterprise' | 'team'
  updated_at: string
}

export interface TelemetryDrain {
  created_at: string
  id: string
  owner: {
    id: string
    type: 'app' | 'space'
  }
  signals: Array<'traces' | 'metrics' | 'logs'>
  exporter: {
    type: 'otlphttp' | 'otlp'
    endpoint: string
    headers: Record<string, string>
  }
  updated_at: string
}

export interface TestCase {
  id: string
  created_at: string
  updated_at: string
  description: string
  diagnostic: string
  directive: string
  passed: boolean
  number: number
  test_node: {
    id: string
  }
  test_run: {
    id: string
  }
}

export interface TestNode {
  created_at: string
  dyno: {
    id: string | string
    attach_url: string | null
  } | null
  error_status: string | null
  exit_code: number | null
  id: string
  index: number
  message: string | null
  output_stream_url: string
  pipeline: {
    id: string | string
  }
  setup_stream_url: string
  status: 'pending' | 'cancelled' | 'creating' | 'building' | 'running' | 'succeeded' | 'failed' | 'errored' | 'debugging'
  updated_at: string
  test_run: {
    id: string
  }
}

export interface TestRun {
  actor_email: string
  clear_cache: boolean | null
  commit_branch: string
  commit_message: string
  commit_sha: string
  debug: boolean
  app_setup: Record<string, unknown> | null
  created_at: string
  dyno: {
    size: string
  } | null
  id: string
  message: string | null
  number: number
  organization: {
    name: string
  } | null
  pipeline: {
    id: string | string
  }
  status: 'pending' | 'cancelled' | 'creating' | 'building' | 'running' | 'succeeded' | 'failed' | 'errored' | 'debugging'
  source_blob_url: string
  updated_at: string
  user: Account
  warning_message: string | null
}

export interface UserPreferences {
  timezone: string | null
  'default-organization': string | null
  'dismissed-github-banner': boolean | null
  'dismissed-getting-started': boolean | null
  'dismissed-org-access-controls': boolean | null
  'dismissed-org-wizard-notification': boolean | null
  'dismissed-pipelines-banner': boolean | null
  'dismissed-pipelines-github-banner': boolean | null
  'dismissed-pipelines-github-banners': Array<string> | null
  'dismissed-sms-banner': boolean | null
}

export interface VpnConnection {
  id: string
  name: string
  public_ip: string
  routable_cidrs: Array<string>
  space_cidr_block: string
  tunnels: Array<{
    last_status_change: string
    ip: string
    customer_ip: string
    pre_shared_key: string
    status: 'UP' | 'DOWN'
    status_message: string
  }>
  ike_version: number
  status: 'pending' | 'provisioning' | 'active' | 'deprovisioning' | 'failed'
  status_message: string
}

export interface AddOnSso {
  method: 'get' | 'post'
  action: string
  params: {
    email: string
    user_id: string
    owning_app: string
    attached_app: string
    timestamp: number
    'nav-data': string
    id: string
    token: string
    resource_id: string
    resource_token: string
  }
}

export interface BuildMetadata {
  app: {
    name: string
    id: string
  }
  cache_delete_url: string
  cache_get_url: string
  cache_put_url: string
  repo_delete_url: string
  repo_get_url: string
  repo_put_url: string
}

export interface Capability {
  capability: string
  resource_id: string | null
  resource_type: string
  capable: boolean
  requires_second_factor: boolean
  resource_canonical_id: string
}

export interface ConfigVarsSettings {
  attachment: {
    id: string
  } | null
  key: string
  value: string | null
  masked: boolean
  masking_supported: boolean
  value_updated_at: string
}

export interface DynoProcesses {
  attach_url: string | null
}

export interface GatewayToken {
  iss: string
  iat: number
  exp: number
  sub: string
  user_id: string
  user_email: string
  authorization_id: string | null
  rate_limit_enabled: boolean
  rate_limit_multiplier: number
  second_factor: boolean
  sudo: boolean
  sudo_user_id: string | null
  sudo_reason: string | null
  sudo_force: boolean
}

export interface IdentityProviderActions {
  certificates: Array<{
    created_at: string
    id: string
    expires_at: string
    body: string
    name: string | null
  }>
  certificate: string | null
  created_at: string
  entity_id: string
  id: string
  name: string
  owner: {
    id: string
    name: string
    type: 'team' | 'enterprise-account'
  }
  slo_target_url: string
  sso_target_url: string
  updated_at: string
}

export interface IdentityProviderCertificate {
  name: string | null
  body: string
  created_at: string
  id: string
  expires_at: string
  identity_provider_id: string
}

export interface PaymentMethod {
  address_1: string | null
  address_2: string
  card_last4: string
  card_type: string
  city: string
  country: string
  expiration_month: string | null
  expiration_year: string | null
  first_name: string
  last_name: string
  other: string | null
  postal_code: string
  state: string
}

export interface Payment {
  amount: number
  created_at: string
  id: number
  invoice: {
    id: string
    number: number
  } | null
  updated_at: string
  user: {
    email: string
    id: string
  }
  state: 'failure' | 'pending' | 'success'
}

export interface SpaceHost {
  host_id: string
  state: 'available' | 'under-assessment' | 'permanent-failure' | 'released' | 'released-permanent-failure'
  available_capacity_percentage: number
  allocated_at: string
  released_at: string
}

export interface TeamLicense {
  start_date: string
  end_date: string
  qty: number
  consumed: number
  code: string
  name: string
}

export interface TeamLicenseCollection {
  period: string
  licenses: Array<TeamLicense>
}

export interface TelemetryIngressInfo {
  id_token: string
  token_type: string
  transports: unknown
  expires_at: string
}

export interface UsageHistory {
  resource_id: string
  bucket_resolution: 'PT1H' | 'PT2H' | 'PT4H' | 'PT6H' | 'P1D'
  usage_timestamps: Array<string>
  usage: Array<{
    meter_key: string
    usage_data_points: Array<number>
  }>
}

export interface Usage {
  addons: Array<{
    id: string
    meters: Record<string, {
      quantity: number
    }>
  }>
}
