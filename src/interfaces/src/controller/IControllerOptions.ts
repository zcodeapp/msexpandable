import { TConstructor } from '../di'
import {
  IControllerInterceptor,
  IControllerMiddleware,
  IControllerOptionResponse
} from '.'

export interface IControllerOptions {
  path?: string
  useControllerRoute?: boolean
  middlewares?: TConstructor<IControllerMiddleware>[]
  interceptors?: TConstructor<IControllerInterceptor>[]
  summary?: string
  responses?: IControllerOptionResponse[]
}
