export const account = {
  infoWithToken: {
    method: 'GET',
    path: '/account/github/token',
  },
}

export const appLink = {
  info: {
    method: 'GET',
    path: '/apps/{app}/github',
  },
  update: {
    method: 'PATCH',
    path: '/apps/{app}/github',
    hasRequestBody: true,
  },
}

export const pipeline = {
  listAppLinks: {
    method: 'GET',
    path: '/pipelines/{pipeline}/github',
  },
}

export const pipelineRepository = {
  info: {
    method: 'GET',
    path: '/pipelines/{pipeline}/repository',
  },
  create: {
    method: 'POST',
    path: '/pipelines/{pipeline}/repository',
    hasRequestBody: true,
  },
  update: {
    method: 'PATCH',
    path: '/pipelines/{pipeline}/repository',
    hasRequestBody: true,
  },
}

export const githubTarball = {
  info: {
    method: 'GET',
    path: '/github/repos/{owner}/{repo}/tarball/{ref}',
  },
}
