/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export interface GithubRepositoryGetRepositoryInformationForAPipelineResult {
  name?: string
  full_name?: string
  id?: number
}

export interface HerokuClient {
  githubRepository: {
  getRepositoryInformationForAPipeline(pipelineIdentity: string): Promise<GithubRepositoryGetRepositoryInformationForAPipelineResult>
  }
}
