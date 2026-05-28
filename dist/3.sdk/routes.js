/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export const accountDelinquency = {
  "info": {
    "method": "GET",
    "path": "/account/delinquency"
  }
}

export const accountFeature = {
  "info": {
    "method": "GET",
    "path": "/account/features/{accountFeatureIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/account/features"
  },
  "update": {
    "method": "PATCH",
    "path": "/account/features/{accountFeatureIdentity}",
    "hasRequestBody": true
  }
}

export const account = {
  "info": {
    "method": "GET",
    "path": "/account"
  },
  "update": {
    "method": "PATCH",
    "path": "/account",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/account"
  },
  "infoByUser": {
    "method": "GET",
    "path": "/users/{accountIdentity}"
  },
  "updateByUser": {
    "method": "PATCH",
    "path": "/users/{accountIdentity}",
    "hasRequestBody": true
  },
  "deleteByUser": {
    "method": "DELETE",
    "path": "/users/{accountIdentity}"
  }
}

export const addOnAction = {
  "provision": {
    "method": "POST",
    "path": "/addons/{addOnIdentity}/actions/provision"
  },
  "deprovision": {
    "method": "POST",
    "path": "/addons/{addOnIdentity}/actions/deprovision"
  },
  "peer": {
    "method": "POST",
    "path": "/addons/{addOnIdentity}/actions/peer",
    "hasRequestBody": true
  },
  "unpeer": {
    "method": "POST",
    "path": "/addons/{addOnIdentity}/actions/unpeer"
  }
}

export const addOnAttachment = {
  "create": {
    "method": "POST",
    "path": "/addon-attachments",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/addon-attachments/{addOnAttachmentIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/addon-attachments/{addOnAttachmentIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/addon-attachments"
  },
  "listByAddOn": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/addon-attachments"
  },
  "listByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/addon-attachments"
  },
  "infoByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/addon-attachments/{addOnAttachmentScopedIdentity}"
  },
  "resolution": {
    "method": "POST",
    "path": "/actions/addon-attachments/resolve",
    "hasRequestBody": true
  }
}

export const addOnConfig = {
  "list": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/config"
  },
  "update": {
    "method": "PATCH",
    "path": "/addons/{addOnIdentity}/config",
    "hasRequestBody": true
  }
}

export const addOnRegionCapability = {
  "list": {
    "method": "GET",
    "path": "/addon-region-capabilities"
  },
  "listByAddOnService": {
    "method": "GET",
    "path": "/addon-services/{addOnServiceIdentity}/region-capabilities"
  },
  "listByRegion": {
    "method": "GET",
    "path": "/regions/{regionIdentity}/addon-region-capabilities"
  }
}

export const addOnService = {
  "info": {
    "method": "GET",
    "path": "/addon-services/{addOnServiceIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/addon-services"
  }
}

export const addOnWebhookDelivery = {
  "info": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhook-deliveries/{appWebhookDeliveryIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhook-deliveries"
  }
}

export const addOnWebhookEvent = {
  "info": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhook-events/{appWebhookEventIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhook-events"
  }
}

export const addOnWebhook = {
  "create": {
    "method": "POST",
    "path": "/addons/{addOnIdentity}/webhooks",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/addons/{addOnIdentity}/webhooks/{appWebhookIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhooks/{appWebhookIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/webhooks"
  },
  "update": {
    "method": "PATCH",
    "path": "/addons/{addOnIdentity}/webhooks/{appWebhookIdentity}",
    "hasRequestBody": true
  }
}

export const addOn = {
  "list": {
    "method": "GET",
    "path": "/addons"
  },
  "info": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/addons",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/addons/{addOnIdentity}"
  },
  "infoByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/addons/{addOnIdentity}"
  },
  "listByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/addons"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/addons/{addOnIdentity}",
    "hasRequestBody": true
  },
  "listByUser": {
    "method": "GET",
    "path": "/users/{accountIdentity}/addons"
  },
  "listByTeam": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/addons"
  },
  "resolution": {
    "method": "POST",
    "path": "/actions/addons/resolve",
    "hasRequestBody": true
  }
}

export const allowedAddOnService = {
  "listByTeam": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/allowed-addon-services"
  },
  "createByTeam": {
    "method": "POST",
    "path": "/teams/{teamIdentity}/allowed-addon-services",
    "hasRequestBody": true
  },
  "deleteByTeam": {
    "method": "DELETE",
    "path": "/teams/{teamIdentity}/allowed-addon-services/{allowedAddOnServiceIdentity}"
  }
}

export const appFeature = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/features/{appFeatureIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/features"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/features/{appFeatureIdentity}",
    "hasRequestBody": true
  }
}

export const appSetup = {
  "create": {
    "method": "POST",
    "path": "/app-setups",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/app-setups/{appSetupIdentity}"
  }
}

export const appTransfer = {
  "create": {
    "method": "POST",
    "path": "/account/app-transfers",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/account/app-transfers/{appTransferIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/account/app-transfers/{appTransferIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/account/app-transfers"
  },
  "update": {
    "method": "PATCH",
    "path": "/account/app-transfers/{appTransferIdentity}",
    "hasRequestBody": true
  }
}

export const appWebhookDelivery = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhook-deliveries/{appWebhookDeliveryIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhook-deliveries"
  }
}

export const appWebhookEvent = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhook-events/{appWebhookEventIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhook-events"
  }
}

export const appWebhook = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/webhooks",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/webhooks/{appWebhookIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhooks/{appWebhookIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/webhooks"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/webhooks/{appWebhookIdentity}",
    "hasRequestBody": true
  }
}

export const app = {
  "create": {
    "method": "POST",
    "path": "/apps",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps"
  },
  "listOwnedAndCollaborated": {
    "method": "GET",
    "path": "/users/{accountIdentity}/apps"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}",
    "hasRequestBody": true
  },
  "enableACM": {
    "method": "POST",
    "path": "/apps/{appIdentity}/acm"
  },
  "disableACM": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/acm"
  },
  "refreshACM": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/acm"
  }
}

export const archive = {
  "info": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/archives/{archiveYear}/{archiveMonth}"
  },
  "list": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/archives"
  }
}

export const auditTrailEvent = {
  "list": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/events"
  }
}

export const build = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/builds",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/builds/{buildIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/builds"
  },
  "deleteCache": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/build-cache"
  },
  "cancel": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/builds/{buildIdentity}"
  }
}

export const buildpackInstallation = {
  "update": {
    "method": "PUT",
    "path": "/apps/{appIdentity}/buildpack-installations",
    "hasRequestBody": true
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/buildpack-installations"
  }
}

export const collaborator = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/collaborators",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/collaborators/{collaboratorIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/collaborators/{collaboratorIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/collaborators"
  }
}

export const configVar = {
  "infoForApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/config-vars"
  },
  "infoForAppRelease": {
    "method": "GET",
    "path": "/apps/{appIdentity}/releases/{releaseIdentity}/config-vars"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/config-vars",
    "hasRequestBody": true
  }
}

export const credit = {
  "create": {
    "method": "POST",
    "path": "/account/credits",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/account/credits/{creditIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/account/credits"
  }
}

export const domain = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/domains",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/domains/{domainIdentity}",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/domains/{domainIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/domains/{domainIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/domains"
  }
}

export const dynoSize = {
  "info": {
    "method": "GET",
    "path": "/dyno-sizes/{dynoSizeIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/dyno-sizes"
  },
  "listAppDynoSizes": {
    "method": "GET",
    "path": "/apps/{appIdentity}/available-dyno-sizes"
  }
}

export const dyno = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/dynos",
    "hasRequestBody": true
  },
  "restart": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/dynos/{dynoIdentity}"
  },
  "restartFormation": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/formations/{dynoFormationType}"
  },
  "restartAll": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/dynos"
  },
  "stop": {
    "method": "POST",
    "path": "/apps/{appIdentity}/dynos/{dynoIdentity}/actions/stop"
  },
  "stopFormation": {
    "method": "POST",
    "path": "/apps/{appIdentity}/formations/{dynoFormationType}/actions/stop"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/dynos/{dynoIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/dynos"
  }
}

export const enterpriseAccountDailyUsage = {
  "info": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountId}/usage/daily",
    "hasRequestBody": true
  }
}

export const enterpriseAccountMember = {
  "list": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/members"
  },
  "create": {
    "method": "POST",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/members",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/members/{enterpriseAccountMemberUserIdentity}",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/members/{enterpriseAccountMemberUserIdentity}"
  }
}

export const enterpriseAccountMonthlyUsage = {
  "info": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountId}/usage/monthly",
    "hasRequestBody": true
  }
}

export const enterpriseAccount = {
  "list": {
    "method": "GET",
    "path": "/enterprise-accounts"
  },
  "info": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}",
    "hasRequestBody": true
  }
}

export const filterApps = {
  "apps": {
    "method": "POST",
    "path": "/filters/apps",
    "hasRequestBody": true
  }
}

export const formation = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/formation/{formationIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/formation"
  },
  "batchUpdate": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/formation",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/formation/{formationIdentity}",
    "hasRequestBody": true
  }
}

export const generation = {
  "info": {
    "method": "GET",
    "path": "/generations/{stackIdentity}"
  },
  "listGet": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/available-generations"
  }
}

export const identityProvider = {
  "info": {
    "method": "GET",
    "path": "/identity-providers/{identityProviderIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/identity-providers",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/identity-providers/{identityProviderIdentity}",
    "hasRequestBody": true
  }
}

export const inboundRuleset = {
  "current": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/inbound-ruleset"
  },
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/inbound-rulesets/{inboundRulesetIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/inbound-rulesets"
  },
  "create": {
    "method": "PUT",
    "path": "/spaces/{spaceIdentity}/inbound-ruleset",
    "hasRequestBody": true
  }
}

export const invoiceAddress = {
  "info": {
    "method": "GET",
    "path": "/account/invoice-address"
  },
  "update": {
    "method": "PUT",
    "path": "/account/invoice-address",
    "hasRequestBody": true
  }
}

export const invoice = {
  "info": {
    "method": "GET",
    "path": "/account/invoices/{invoiceIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/account/invoices"
  }
}

export const key = {
  "info": {
    "method": "GET",
    "path": "/account/keys/{keyIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/account/keys"
  }
}

export const logDrain = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/log-drains",
    "hasRequestBody": true
  },
  "update": {
    "method": "PUT",
    "path": "/addons/{addOnIdentity}/log-drains/{logDrainQueryIdentity}",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/log-drains/{logDrainQueryIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/log-drains/{logDrainQueryIdentity}"
  },
  "listByAddOn": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/log-drains"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/log-drains"
  }
}

export const logSession = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/log-sessions",
    "hasRequestBody": true
  }
}

export const oauthAuthorization = {
  "create": {
    "method": "POST",
    "path": "/oauth/authorizations",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/oauth/authorizations/{oauthAuthorizationIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/oauth/authorizations/{oauthAuthorizationIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/oauth/authorizations/{oauthAuthorizationIdentity}",
    "hasRequestBody": true
  },
  "list": {
    "method": "GET",
    "path": "/oauth/authorizations"
  },
  "regenerate": {
    "method": "POST",
    "path": "/oauth/authorizations/{oauthAuthorizationIdentity}/actions/regenerate-tokens"
  },
  "teamList": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/oauth/authorizations"
  },
  "teamCreate": {
    "method": "POST",
    "path": "/teams/{teamIdentity}/oauth/authorizations",
    "hasRequestBody": true
  }
}

export const oauthClient = {
  "create": {
    "method": "POST",
    "path": "/oauth/clients",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/oauth/clients/{oauthClientIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/oauth/clients/{oauthClientIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/oauth/clients"
  },
  "update": {
    "method": "PATCH",
    "path": "/oauth/clients/{oauthClientIdentity}",
    "hasRequestBody": true
  },
  "rotateCredentials": {
    "method": "POST",
    "path": "/oauth/clients/{oauthClientIdentity}/actions/rotate-credentials"
  }
}

export const oauthToken = {
  "create": {
    "method": "POST",
    "path": "/oauth/tokens",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/oauth/tokens/{oauthTokenIdentity}"
  }
}

export const ociImage = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/oci-images/{ociImageIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/oci-images",
    "hasRequestBody": true
  }
}

export const passwordReset = {
  "resetPassword": {
    "method": "POST",
    "path": "/password-resets",
    "hasRequestBody": true
  },
  "completeResetPassword": {
    "method": "POST",
    "path": "/password-resets/{passwordResetResetPasswordToken}/actions/finalize",
    "hasRequestBody": true
  }
}

export const peering = {
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/peering-info"
  },
  "list": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/peerings"
  },
  "accept": {
    "method": "POST",
    "path": "/spaces/{spaceIdentity}/peerings",
    "hasRequestBody": true
  },
  "destroy": {
    "method": "DELETE",
    "path": "/spaces/{spaceIdentity}/peerings/{peeringPcxId}"
  }
}

export const permissionEntity = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/permissions"
  }
}

export const pipelineBuild = {
  "list": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/latest-builds"
  }
}

export const pipelineConfigVar = {
  "infoForApp": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/stage/{pipelineCouplingStage}/config-vars"
  },
  "update": {
    "method": "PATCH",
    "path": "/pipelines/{pipelineId}/stage/{pipelineCouplingStage}/config-vars",
    "hasRequestBody": true
  }
}

export const pipelineCoupling = {
  "listByPipeline": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/pipeline-couplings"
  },
  "listByCurrentUser": {
    "method": "GET",
    "path": "/users/~/pipeline-couplings"
  },
  "list": {
    "method": "GET",
    "path": "/pipeline-couplings"
  },
  "listByTeam": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/pipeline-couplings"
  },
  "create": {
    "method": "POST",
    "path": "/pipeline-couplings",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/pipeline-couplings/{pipelineCouplingIdentity}"
  },
  "delete": {
    "method": "DELETE",
    "path": "/pipeline-couplings/{pipelineCouplingIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/pipeline-couplings/{pipelineCouplingIdentity}",
    "hasRequestBody": true
  },
  "infoByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/pipeline-couplings"
  }
}

export const pipelineDeployment = {
  "list": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/latest-deployments"
  }
}

export const pipelinePromotionTarget = {
  "list": {
    "method": "GET",
    "path": "/pipeline-promotions/{pipelinePromotionId}/promotion-targets"
  }
}

export const pipelinePromotion = {
  "create": {
    "method": "POST",
    "path": "/pipeline-promotions",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/pipeline-promotions/{pipelinePromotionIdentity}"
  }
}

export const pipelineRelease = {
  "list": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/latest-releases"
  }
}

export const pipelineStack = {
  "defaultStack": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/pipeline-stack"
  }
}

export const pipelineTransfer = {
  "create": {
    "method": "POST",
    "path": "/pipeline-transfers",
    "hasRequestBody": true
  }
}

export const pipeline = {
  "create": {
    "method": "POST",
    "path": "/pipelines",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/pipelines/{pipelineIdentity}"
  },
  "delete": {
    "method": "DELETE",
    "path": "/pipelines/{pipelineId}"
  },
  "update": {
    "method": "PATCH",
    "path": "/pipelines/{pipelineId}",
    "hasRequestBody": true
  },
  "list": {
    "method": "GET",
    "path": "/pipelines"
  }
}

export const plan = {
  "info": {
    "method": "GET",
    "path": "/plans/{planIdentity}"
  },
  "infoByAddOn": {
    "method": "GET",
    "path": "/addon-services/{addOnServiceIdentity}/plans/{planIdentity}"
  },
  "listByAddOn": {
    "method": "GET",
    "path": "/addon-services/{addOnServiceIdentity}/plans"
  }
}

export const rateLimit = {
  "info": {
    "method": "GET",
    "path": "/account/rate-limits"
  }
}

export const region = {
  "info": {
    "method": "GET",
    "path": "/regions/{regionIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/regions"
  }
}

export const release = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/releases/{releaseIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/releases"
  },
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/releases",
    "hasRequestBody": true
  },
  "rollback": {
    "method": "POST",
    "path": "/apps/{appIdentity}/releases",
    "hasRequestBody": true
  }
}

export const reviewApp = {
  "create": {
    "method": "POST",
    "path": "/review-apps",
    "hasRequestBody": true
  },
  "getReviewApp": {
    "method": "GET",
    "path": "/review-apps/{reviewAppId}"
  },
  "delete": {
    "method": "DELETE",
    "path": "/review-apps/{reviewAppId}"
  },
  "getReviewAppByAppId": {
    "method": "GET",
    "path": "/apps/{appIdentity}/review-app"
  },
  "list": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/review-apps"
  }
}

export const reviewAppConfig = {
  "enable": {
    "method": "POST",
    "path": "/pipelines/{pipelineId}/review-app-config",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/review-app-config"
  },
  "update": {
    "method": "PATCH",
    "path": "/pipelines/{pipelineId}/review-app-config",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/pipelines/{pipelineId}/review-app-config"
  }
}

export const slug = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/slugs/{slugIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/slugs",
    "hasRequestBody": true
  }
}

export const smsNumber = {
  "sMSNumber": {
    "method": "GET",
    "path": "/users/{accountIdentity}/sms-number"
  },
  "recover": {
    "method": "POST",
    "path": "/users/{accountIdentity}/sms-number/actions/recover"
  },
  "confirm": {
    "method": "POST",
    "path": "/users/{accountIdentity}/sms-number/actions/confirm"
  }
}

export const sniEndpoint = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/sni-endpoints",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/apps/{appIdentity}/sni-endpoints/{sniEndpointIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/sni-endpoints/{sniEndpointIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/sni-endpoints"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/sni-endpoints/{sniEndpointIdentity}",
    "hasRequestBody": true
  }
}

export const source = {
  "create": {
    "method": "POST",
    "path": "/sources"
  },
  "createDeprecated": {
    "method": "POST",
    "path": "/apps/{appIdentity}/sources"
  }
}

export const spaceAppAccess = {
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/members/{accountIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/spaces/{spaceIdentity}/members/{accountIdentity}",
    "hasRequestBody": true
  },
  "list": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/members"
  }
}

export const spaceNat = {
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/nat"
  }
}

export const spaceTopology = {
  "topology": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/topology"
  }
}

export const spaceTransfer = {
  "transfer": {
    "method": "POST",
    "path": "/spaces/{spaceIdentity}/transfer",
    "hasRequestBody": true
  }
}

export const space = {
  "list": {
    "method": "GET",
    "path": "/spaces"
  },
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/spaces/{spaceIdentity}",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/spaces/{spaceIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/spaces",
    "hasRequestBody": true
  }
}

export const stack = {
  "info": {
    "method": "GET",
    "path": "/stacks/{stackIdentity}"
  },
  "listGet": {
    "method": "GET",
    "path": "/apps/{appIdentity}/available-stacks"
  }
}

export const teamAddOn = {
  "listForTeam": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/addons"
  }
}

export const teamAppCollaborator = {
  "create": {
    "method": "POST",
    "path": "/teams/apps/{appIdentity}/collaborators",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/teams/apps/{teamAppIdentity}/collaborators/{teamAppCollaboratorIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/teams/apps/{teamAppIdentity}/collaborators/{teamAppCollaboratorIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/teams/apps/{teamAppIdentity}/collaborators/{teamAppCollaboratorIdentity}",
    "hasRequestBody": true
  },
  "list": {
    "method": "GET",
    "path": "/teams/apps/{teamAppIdentity}/collaborators"
  }
}

export const teamAppPermission = {
  "list": {
    "method": "GET",
    "path": "/teams/permissions"
  }
}

export const teamApp = {
  "create": {
    "method": "POST",
    "path": "/teams/apps",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/teams/apps/{teamAppIdentity}"
  },
  "updateLocked": {
    "method": "PATCH",
    "path": "/teams/apps/{teamAppIdentity}",
    "hasRequestBody": true
  },
  "transferToAccount": {
    "method": "PATCH",
    "path": "/teams/apps/{teamAppIdentity}",
    "hasRequestBody": true
  },
  "transferToTeam": {
    "method": "PATCH",
    "path": "/teams/apps/{teamAppIdentity}",
    "hasRequestBody": true
  },
  "listByTeam": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/apps"
  }
}

export const teamDailyUsage = {
  "info": {
    "method": "GET",
    "path": "/teams/{teamId}/usage/daily",
    "hasRequestBody": true
  }
}

export const teamDelinquency = {
  "info": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/delinquency"
  }
}

export const teamFeature = {
  "info": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/features/{teamFeatureIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/features"
  }
}

export const teamInvitation = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamName}/invitations"
  },
  "create": {
    "method": "PUT",
    "path": "/teams/{teamIdentity}/invitations",
    "hasRequestBody": true
  },
  "revoke": {
    "method": "DELETE",
    "path": "/teams/{teamIdentity}/invitations/{teamInvitationIdentity}"
  },
  "get": {
    "method": "GET",
    "path": "/teams/invitations/{teamInvitationToken}"
  },
  "accept": {
    "method": "POST",
    "path": "/teams/invitations/{teamInvitationToken}/accept"
  }
}

export const teamInvoice = {
  "info": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/invoices/{teamInvoiceIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/invoices"
  }
}

export const teamMember = {
  "createOrUpdate": {
    "method": "PUT",
    "path": "/teams/{teamIdentity}/members",
    "hasRequestBody": true
  },
  "create": {
    "method": "POST",
    "path": "/teams/{teamIdentity}/members",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/teams/{teamIdentity}/members",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/teams/{teamIdentity}/members/{teamMemberIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/members"
  },
  "listByMember": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/members/{teamMemberIdentity}/apps"
  }
}

export const teamMonthlyUsage = {
  "info": {
    "method": "GET",
    "path": "/teams/{teamId}/usage/monthly",
    "hasRequestBody": true
  }
}

export const teamPreferences = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamPreferencesIdentity}/preferences"
  },
  "update": {
    "method": "PATCH",
    "path": "/teams/{teamPreferencesIdentity}/preferences",
    "hasRequestBody": true
  }
}

export const teamSpace = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/spaces"
  }
}

export const team = {
  "list": {
    "method": "GET",
    "path": "/teams"
  },
  "info": {
    "method": "GET",
    "path": "/teams/{teamIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/teams/{teamIdentity}",
    "hasRequestBody": true
  },
  "create": {
    "method": "POST",
    "path": "/teams",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/teams/{teamIdentity}"
  },
  "listByEnterpriseAccount": {
    "method": "GET",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/teams"
  },
  "createInEnterpriseAccount": {
    "method": "POST",
    "path": "/enterprise-accounts/{enterpriseAccountIdentity}/teams",
    "hasRequestBody": true
  }
}

export const telemetryDrain = {
  "create": {
    "method": "POST",
    "path": "/telemetry-drains",
    "hasRequestBody": true
  },
  "listByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/telemetry-drains"
  },
  "listBySpace": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/telemetry-drains"
  },
  "update": {
    "method": "PATCH",
    "path": "/telemetry-drains/{telemetryDrainIdentity}",
    "hasRequestBody": true
  },
  "delete": {
    "method": "DELETE",
    "path": "/telemetry-drains/{telemetryDrainIdentity}"
  },
  "info": {
    "method": "GET",
    "path": "/telemetry-drains/{telemetryDrainIdentity}"
  }
}

export const testCase = {
  "list": {
    "method": "GET",
    "path": "/test-runs/{testRunId}/test-cases"
  }
}

export const testNode = {
  "list": {
    "method": "GET",
    "path": "/test-runs/{testRunIdentity}/test-nodes"
  }
}

export const testRun = {
  "create": {
    "method": "POST",
    "path": "/test-runs",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/test-runs/{testRunId}"
  },
  "list": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/test-runs"
  },
  "infoByPipeline": {
    "method": "GET",
    "path": "/pipelines/{pipelineId}/test-runs/{testRunNumber}"
  },
  "update": {
    "method": "PATCH",
    "path": "/test-runs/{testRunNumber}",
    "hasRequestBody": true
  }
}

export const userPreferences = {
  "list": {
    "method": "GET",
    "path": "/users/{userPreferencesIdentity}/preferences"
  },
  "update": {
    "method": "PATCH",
    "path": "/users/{userPreferencesIdentity}/preferences",
    "hasRequestBody": true
  }
}

export const vpnConnection = {
  "create": {
    "method": "POST",
    "path": "/spaces/{spaceIdentity}/vpn-connections",
    "hasRequestBody": true
  },
  "destroy": {
    "method": "DELETE",
    "path": "/spaces/{spaceIdentity}/vpn-connections/{vpnConnectionIdentity}"
  },
  "list": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/vpn-connections"
  },
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/vpn-connections/{vpnConnectionIdentity}"
  },
  "update": {
    "method": "PATCH",
    "path": "/spaces/{spaceIdentity}/vpn-connections/{vpnConnectionIdentity}",
    "hasRequestBody": true
  }
}

export const addOnSso = {
  "addOnSSO": {
    "method": "GET",
    "path": "/addons/{addOnIdentity}/sso"
  },
  "addOnSSOByApp": {
    "method": "GET",
    "path": "/apps/{appIdentity}/addons/{addOnIdentity}/sso"
  }
}

export const buildMetadata = {
  "info": {
    "method": "GET",
    "path": "/apps/{appIdentity}/build-metadata"
  }
}

export const capability = {
  "capabilities": {
    "method": "PUT",
    "path": "/users/~/capabilities",
    "hasRequestBody": true
  }
}

export const configVarsSettings = {
  "list": {
    "method": "GET",
    "path": "/apps/{appIdentity}/config-vars-settings"
  },
  "update": {
    "method": "PATCH",
    "path": "/apps/{appIdentity}/config-vars-settings",
    "hasRequestBody": true
  }
}

export const dynoProcesses = {
  "create": {
    "method": "POST",
    "path": "/apps/{appIdentity}/dynos/{dynoIdentity}",
    "hasRequestBody": true
  }
}

export const gatewayToken = {
  "create": {
    "method": "POST",
    "path": "/users/~/gateway-tokens"
  },
  "oAuthToken": {
    "method": "POST",
    "path": "/users/~/gateway-tokens/oauth-authorization"
  }
}

export const identityProviderActions = {
  "update": {
    "method": "POST",
    "path": "/identity-providers/{identityProviderIdentity}/migrate"
  }
}

export const identityProviderCertificate = {
  "delete": {
    "method": "DELETE",
    "path": "/identity-providers/{identityProvidersIdentity}/certificates/{certificatesIdentity}"
  },
  "create": {
    "method": "POST",
    "path": "/identity-providers/{identityProviderIdentity}/certificates",
    "hasRequestBody": true
  },
  "update": {
    "method": "PATCH",
    "path": "/identity-providers/{identityProvidersIdentity}/certificates/{certificatesIdentity}",
    "hasRequestBody": true
  },
  "info": {
    "method": "GET",
    "path": "/identity-providers/{identityProvidersIdentity}/certificates/{certificatesIdentity}"
  }
}

export const paymentMethod = {
  "update": {
    "method": "PATCH",
    "path": "/account/payment-method",
    "hasRequestBody": true
  },
  "get": {
    "method": "GET",
    "path": "/account/payment-method"
  }
}

export const payment = {
  "createPost": {
    "method": "POST",
    "path": "/teams/{teamIdentity}/payments",
    "hasRequestBody": true
  }
}

export const planMeter = {
  "list": {
    "method": "GET",
    "path": "/plans/{planIdentity}/meters"
  },
  "info": {
    "method": "GET",
    "path": "/plans/{planIdentity}/meters/{planMeterIdentity}"
  }
}

export const spaceHost = {
  "list": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/hosts"
  }
}

export const spaceLogDrain = {
  "info": {
    "method": "GET",
    "path": "/spaces/{spaceIdentity}/log-drain"
  },
  "update": {
    "method": "PUT",
    "path": "/spaces/{spaceIdentity}/log-drain",
    "hasRequestBody": true
  }
}

export const teamLicense = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/licenses"
  }
}

export const teamLicenseCollection = {
  "list": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/license-collections"
  }
}

export const telemetryIngressInfo = {
  "info": {
    "method": "GET",
    "path": "/addon-attachments/{addOnAttachmentIdentity}/telemetry-ingress-info"
  }
}

export const usageHistory = {
  "info": {
    "method": "GET",
    "path": "/resource/{usageHistoryResourceId}/usage-history",
    "hasRequestBody": true
  }
}

export const usage = {
  "infoGet": {
    "method": "GET",
    "path": "/teams/{teamIdentity}/usage"
  }
}
