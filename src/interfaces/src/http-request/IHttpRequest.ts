import { IRequest } from './IRequest'
import { IRequestMap } from './IRequestMap'
import { IResponse } from './IResponse'

export interface IHttpRequest {
  register(uuid: string, request: IRequest, response: IResponse): void
  get(uuid: string): IRequestMap
  remove(uuid: string): void
}
