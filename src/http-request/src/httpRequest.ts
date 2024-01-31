import { Injectable } from "@zcodeapp/di";
import { IRequest, IResponse, IRequestMap, IHttpRequest } from "@zcodeapp/interfaces";

@Injectable({ singleton: true })
export class HttpRequest implements IHttpRequest {

  private requestMap: IRequestMap[] = [];

  public register(uuid: string, request: IRequest, response: IResponse): void {
    const mapIndex = this.requestMap.findIndex(x => x.uuid == uuid);
    const payload: IRequestMap = {
      uuid,
      request,
      response
    }
    if(mapIndex >= 0)
      this.requestMap[mapIndex] = payload;
    else
      this.requestMap.push(payload);
  }

  public get(uuid: string): IRequestMap {
    const request = this.requestMap.find(x => x.uuid == uuid);

    if (!request)
      throw new Error(`Class and method not found [${uuid}]`);

    return request;
  }

  public remove(uuid: string): void {
    const index = this.requestMap.findIndex(x => x.uuid == uuid);
    this.requestMap.splice(index, 1);
  }
}