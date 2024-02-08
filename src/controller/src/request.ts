import { Injectable } from "@zcodeapp/di";
import { IRequest, IRequestCookie, IRequestHeader, IRequestParam, IRequestQuery, IRequestData } from "@zcodeapp/interfaces";

/* eslint-disable @typescript-eslint/no-explicit-any */
@Injectable({ singleton: false })
export class ControllerRequest<B = any> implements IRequest<B> {

  private _data: IRequestData<B>;

  public populate(requestData: IRequestData<B>) {
    this._data = {... (this._data ?? {}), ... requestData};
  }

  public getMethod(): string {
    return this._data?.method;
  }

  public getUrl(): string {
    return this._data.url;
  }

  public getOriginalUrl(): string {
    return this._data.originalUrl;
  }

  public getHeaders(): IRequestHeader[] {
    return this._data?.headers;
  }

  public getCookies(): IRequestCookie[] {
    return this._data?.cookies;
  }

  public getBody(): B {
    return this._data?.body;
  }

  public getParams(): IRequestParam[] {
    return this._data?.params;
  }

  public getQuery(): IRequestQuery[] {
    return this._data?.query;
  }
}