import { IResponseData } from './IResponseData'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponse<B = any> {
  send(body?: B): IResponse<B>
  json(json: B): IResponse<B>
  status(code: number): IResponse<B>
  setHeader(name: string, value: string): IResponse<B>
  setCookie(name: string, value: string): IResponse<B>
  redirect(status: number, url: string): IResponse<B>
  redirect(url: string): IResponse<B>
  sendFile(path: string): IResponse<B>
  getResponseData(): IResponseData
}
