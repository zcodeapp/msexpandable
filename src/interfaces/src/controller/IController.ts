import { IResponseData } from "../http-request";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IController {
  callMethod<T = any>(method: string): IResponseData<T>
}