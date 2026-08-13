/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface AccountInfoWithTokenResult {
  id: string
  heroku: {
    user_id: string
  }
  github: {
    user_id: number | null
    token: string | null
  }
  created_at: string | null
  updated_at: string | null
}

export interface AppLinkInfoResult {
  app: {
    id: string
  }
  pull_requests: {
    enabled: boolean
    auto_deploy: boolean
  }
  app_id: string
  id: string
  parent: null
  auto_deploy: boolean
  wait_for_ci: boolean
  branch: string | null
  created_at: string | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  }
  pull_request: null
  repo: string
  repo_id: number
  repo_host: string
  updated_at: string | null
}

export interface AppLinkUpdateOpts {
  auto_deploy?: boolean | null
  branch?: string | null
  wait_for_ci?: boolean | null
  pull_requests?: {
    space_id?: string | null
  }
}

export interface AppLinkUpdateResult {
  app: {
    id: string
  }
  pull_requests: {
    enabled: boolean
    auto_deploy: boolean
    space_id: string | null
    auto_destroy: boolean
  }
  app_id: string
  auto_deploy: boolean
  id: string
  wait_for_ci: boolean
  branch: string | null
  created_at: string | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  }
  repo: string
  repo_id: number
  repo_host: string
  updated_at: string | null
}

export interface GithubTarballInfoResult {
  archive_link: string
}

export type PipelineListAppLinksResult = Array<{
  app: {
    id: string
  }
  pull_requests: {
    enabled: boolean
    auto_deploy: boolean
    space_id: string | null
    auto_destroy: boolean
  }
  app_id: string
  auto_deploy: boolean
  id: string
  wait_for_ci: boolean
  branch: string | null
  created_at: string | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  }
  repo: string
  repo_id: number
  repo_host: string
  updated_at: string | null
}>

export interface PipelineRepositoryInfoResult {
  ci: boolean
  created_at: string | null
  creator: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  id: string
  organization: {
    id: string
  } | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  pipeline: {
    id: string
  }
  repository: {
    created_at: string | null
    id: number
    name: string
    type: string
    updated_at: string | null
    host: string
  }
  updated_at: string | null
  statuses: Array<{
    type: string
    status: boolean
  }>
}

export interface PipelineRepositoryCreateOpts {
  repository: number
}

export interface PipelineRepositoryCreateResult {
  ci: boolean
  created_at: string | null
  creator: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  id: string
  organization: {
    id: string
  } | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  pipeline: {
    id: string
  }
  repository: {
    created_at: string | null
    id: number
    name: string
    type: string
    updated_at: string | null
    host: string
  }
  updated_at: string | null
}

export interface PipelineRepositoryUpdateOpts {
  ci?: boolean | null
  organization?: string | null
}

export interface PipelineRepositoryUpdateResult {
  ci: boolean
  created_at: string | null
  creator: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  id: string
  organization: {
    id: string
  } | null
  owner: {
    id: string
    heroku: {
      user_id: string
    }
    github: {
      user_id: number | null
    }
  } | null
  pipeline: {
    id: string
  }
  repository: {
    created_at: string | null
    id: number
    name: string
    type: string
    updated_at: string | null
    host: string
  }
  updated_at: string | null
}

export interface HerokuClient {
  account: {
  infoWithToken(): Promise<AccountInfoWithTokenResult>
  }
  appLink: {
  info(app: string): Promise<AppLinkInfoResult>
  update(app: string, requestBody: AppLinkUpdateOpts): Promise<AppLinkUpdateResult>
  }
  githubTarball: {
  info(owner: string, repo: string, ref: string): Promise<GithubTarballInfoResult>
  }
  pipeline: {
  listAppLinks(pipeline: string): Promise<PipelineListAppLinksResult>
  }
  pipelineRepository: {
  info(pipeline: string): Promise<PipelineRepositoryInfoResult>
  create(pipeline: string, requestBody: PipelineRepositoryCreateOpts): Promise<PipelineRepositoryCreateResult>
  update(pipeline: string, requestBody: PipelineRepositoryUpdateOpts): Promise<PipelineRepositoryUpdateResult>
  }
}
