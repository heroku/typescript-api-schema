export interface AccountWithToken {
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

export interface AppLink {
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
  branch: string
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
  auto_deploy?: boolean
  branch?: string
  wait_for_ci?: boolean
  pull_requests?: {
    space_id?: any | null
  }
}

export interface AppLinkUpdateResult {
  app: {
    id: string
  }
  pull_requests: {
    enabled: boolean
    auto_deploy: boolean
    space_id: null
    auto_destroy: boolean
  }
  app_id: string
  auto_deploy: boolean
  id: string
  wait_for_ci: boolean
  branch: string
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

export interface GithubTarball {
  archive_link: string
}

export interface PipelineAppLink {
  app: {
    id: string
  }
  pull_requests: {
    enabled: boolean
    auto_deploy: boolean
    space_id: null
    auto_destroy: boolean
  }
  app_id: string
  auto_deploy: boolean
  id: string
  wait_for_ci: boolean
  branch: string
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

export interface PipelineRepository {
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
    host: string
    updated_at: string | null
  }
  statuses: Array<PipelineStatus>
  updated_at: string | null
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
    host: string
    updated_at: string | null
  }
  updated_at: string | null
}

export interface PipelineRepositoryUpdateOpts {
  ci?: boolean
  organization?: string | null
  owner?: string
  review_apps?: boolean
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
    host: string
    updated_at: string | null
  }
  updated_at: string | null
}

export interface PipelineStatus {
  type: string
  status: boolean
}

export interface HerokuClient {
  account: {
    infoWithToken(): Promise<AccountWithToken>
  }
  appLink: {
    info(app: string): Promise<AppLink>
    update(app: string, requestBody: AppLinkUpdateOpts): Promise<AppLinkUpdateResult>
  }
  githubTarball: {
    info(owner: string, repo: string, ref: string): Promise<GithubTarball>
  }
  pipeline: {
    listAppLinks(pipeline: string): Promise<Array<PipelineAppLink>>
  }
  pipelineRepository: {
    info(pipeline: string): Promise<PipelineRepository>
    create(pipeline: string, requestBody: PipelineRepositoryCreateOpts): Promise<PipelineRepositoryCreateResult>
    update(pipeline: string, requestBody: PipelineRepositoryUpdateOpts): Promise<PipelineRepositoryUpdateResult>
  }
}
