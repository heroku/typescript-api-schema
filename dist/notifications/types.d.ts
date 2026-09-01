/**
 * NOTE: the contents of this file are generated. Do not modify this file.
 */

export type NotificationListResult = Array<{
  id: string
  created_at: string
  title: string
  read: boolean
  body: string
  target: {
    type: string
    id: string
  }
  followup: Array<{
    created_at: string
    body: string
  }>
}>

export interface NotificationUpdateOpts {
  read: boolean
}

export interface NotificationUpdateResult {
  id: string
  created_at: string
  title: string
  read: boolean
  body: string
  target: {
    type: string
    id: string
  }
  followup: Array<{
    created_at: string
    body: string
  }>
}

export interface HerokuClient {
  notification: {
  list(): Promise<NotificationListResult>
  update(id: string, requestBody: NotificationUpdateOpts): Promise<NotificationUpdateResult>
  }
}
