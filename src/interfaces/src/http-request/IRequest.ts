import { IRequestCookie } from './IRequestCookie'
import { IRequestData } from './IRequestData'
import { IRequestHeader } from './IRequestHeader'
import { IRequestParam } from './IRequestParam'
import { IRequestQuery } from './IRequestQuery'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IRequest<B = any> {
  populate(requestData: IRequestData<B>)
  getMethod(): string
  getUrl(): string
  getOriginalUrl(): string
  getHeaders(): IRequestHeader[]
  getCookies(): IRequestCookie[]
  getBody(): B
  getParams(): IRequestParam[]
  getQuery(): IRequestQuery[]
}
