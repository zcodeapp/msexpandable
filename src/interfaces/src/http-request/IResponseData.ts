import { ERequestStatus } from "./ERequestStatus";
import { IRequestCookie } from "./IRequestCookie";
import { IRequestHeader } from "./IRequestHeader";

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IResponseData<B = any> {
  headers?: IRequestHeader[];
  cookies?: IRequestCookie[];
  statusCode: ERequestStatus;
  json?: boolean;
  file?: string;
  redirect?: string;
  body?: B;
}