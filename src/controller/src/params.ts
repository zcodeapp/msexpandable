import { EControllerInjectParam, IParamsOptions } from '@zcodeapp/interfaces'
import 'reflect-metadata'

/* eslint-disable @typescript-eslint/no-explicit-any */
function createMethodDecorator(param: EControllerInjectParam) {
  return function (field?: string | IParamsOptions, options?: IParamsOptions) {
    if (!options) options = {}

    if (typeof field == 'string') options = { ...options, ...{ field } }
    else options = { ...options, ...field }

    return function (
      target: object,
      propertyKey: string | symbol,
      index: number
    ) {
      Reflect.defineMetadata(
        'method:params',
        [
          ...(Reflect.getMetadata('method:params', target, propertyKey) ?? []),
          ...[{ index, param, value: options.field }]
        ],
        target,
        propertyKey
      )
    }
  }
}

export const Query = createMethodDecorator(EControllerInjectParam.QUERY)
export const Body = createMethodDecorator(EControllerInjectParam.BODY)
export const Header = createMethodDecorator(EControllerInjectParam.HEADER)
export const Cookie = createMethodDecorator(EControllerInjectParam.COOKIE)
export const Request = createMethodDecorator(EControllerInjectParam.REQUEST)
export const Response = createMethodDecorator(EControllerInjectParam.RESPONSE)
