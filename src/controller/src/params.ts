import { EControllerInjectParam } from "@zcodeapp/interfaces";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
function createMethodDecoratorValue(param: EControllerInjectParam) {
  return function(value?: string) {
    return createMetadata(param, value);
  }
}

function createMethodDecorator(param: EControllerInjectParam) {
  return function() {
    return createMetadata(param);
  }
}

function createMetadata(param: EControllerInjectParam, value?: string) {
  return function(target: object, propertyKey: string | symbol, index: number) {
    Reflect.defineMetadata('method:params', [
      ... Reflect.getMetadata('method:params', target, propertyKey) ?? [],
      ... [{ index, param, value }]
    ], target, propertyKey);
  }
}

export const Query = createMethodDecoratorValue(EControllerInjectParam.QUERY);
export const Body = createMethodDecoratorValue(EControllerInjectParam.BODY);
export const Header = createMethodDecoratorValue(EControllerInjectParam.HEADER);
export const Cookie = createMethodDecoratorValue(EControllerInjectParam.COOKIE);
export const Request = createMethodDecorator(EControllerInjectParam.REQUEST);
export const Response = createMethodDecorator(EControllerInjectParam.RESPONSE);