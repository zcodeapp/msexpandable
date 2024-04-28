import { IRequest } from './IRequest'
import { IResponse } from './IResponse'

export interface IRequestMap {
  uuid: string
  request: IRequest
  response: IResponse
}
