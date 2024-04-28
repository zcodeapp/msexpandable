import { Injectable } from '@zcodeapp/di'
import { ERequestStatus, IResponse, IResponseData } from '@zcodeapp/interfaces'

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: false })
export class ControllerResponse<B = any> implements IResponse<B> {
  private _responseData: IResponseData<B> = {
    headers: [],
    cookies: [],
    statusCode: ERequestStatus.OK
  }

  public send(body?: B): IResponse<B> {
    this._responseData.body = body
    return this
  }

  public json(json: B): IResponse<B> {
    this._responseData = {
      ...this._responseData,
      ...{ json: true, body: json }
    }
    return this
  }

  public status(statusCode: ERequestStatus): IResponse<B> {
    this._responseData = { ...this._responseData, ...{ statusCode } }
    return this
  }

  public setHeader(name: string, value: string): IResponse<B> {
    this._responseData = {
      ...this._responseData,
      ...{ headers: [...this._responseData.headers, ...[{ name, value }]] }
    }
    return this
  }

  public setCookie(name: string, value: string): IResponse<B> {
    this._responseData = {
      ...this._responseData,
      ...{ cookies: [...this._responseData.cookies, ...[{ name, value }]] }
    }
    return this
  }

  public redirect(
    status: ERequestStatus | string,
    redirect?: string
  ): IResponse<B> {
    if (typeof status == 'string') {
      redirect = status
      status = ERequestStatus.PERMANENT_REDIRECT
    }
    this._responseData = {
      ...this._responseData,
      ...{ redirect, statusCode: status }
    }
    return this
  }

  public sendFile(file: string): IResponse<B> {
    this._responseData = { ...this._responseData, ...{ file } }
    return this
  }

  public getResponseData(): IResponseData<B> {
    return this._responseData
  }
}
