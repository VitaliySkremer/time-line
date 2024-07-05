type statusAlert = 'success' | 'error'

export interface IAlert {
  title: string,
  status: statusAlert
}