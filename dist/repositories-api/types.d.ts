/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface GithubRepositoryInfoResult {
  name?: string
  full_name?: string
  id?: number
}

export interface HerokuClient {
  githubRepository: {
  info(pipelineIdentity: string): Promise<GithubRepositoryInfoResult>
  }
}
