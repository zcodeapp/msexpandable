import {
  EControllerInjectParam,
  IController,
  IControllerInjectParams,
  IResponseData
} from '@zcodeapp/interfaces'
import { ControllerRequest } from './request'
import { ControllerResponse } from './response'
import 'reflect-metadata'

/* eslint-disable @typescript-eslint/no-explicit-any */
export abstract class BaseController implements IController {
  constructor(
    protected readonly _request: ControllerRequest,
    protected readonly _response: ControllerResponse
  ) {}

  public callMethod<T = any>(method: string): IResponseData<T> {
    const queryParams = this._request.getQuery()
    const body = this._request.getBody()

    const params: IControllerInjectParams[] = [
      ...(Reflect.getMetadata('method:params', this, method) ?? [])
    ]

    params.sort((a, b) => a.index - b.index)

    const args: any[] = []
    params.map((param) => {
      if (param.param == EControllerInjectParam.QUERY) {
        if (!queryParams) return args.push(undefined)

        if (queryParams && param?.value)
          return args.push(
            queryParams.find((x) => x.name == param.value)?.value
          )

        return args.push(queryParams)
      }
      if (param.param == EControllerInjectParam.BODY) {
        if (param?.value) return args.push(body[param.value])

        return args.push(body)
      }
    })
    return this[method](...args).getResponseData()
  }
}
