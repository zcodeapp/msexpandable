import { IRequestCookie } from './IRequestCookie'
import { IRequestHeader } from './IRequestHeader'
import { IRequestParam } from './IRequestParam'
import { IRequestQuery } from './IRequestQuery'

export interface IRequestData<B> {
  url: string
  originalUrl: string
  method?: string
  headers?: IRequestHeader[]
  cookies?: IRequestCookie[]
  body?: B
  params?: IRequestParam[]
  query?: IRequestQuery[]
}
