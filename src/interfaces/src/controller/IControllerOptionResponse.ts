import { ERequestStatus } from '../http-request'

export interface IControllerOptionResponse {
  status: ERequestStatus
  json?: string
  description?: string
}
