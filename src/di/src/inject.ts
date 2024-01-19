import { TConstructor } from "@zcodeapp/interfaces";
import { Di } from ".";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Inject<T>(key: TConstructor<T> | string) {
  return function (target: any, propertyKey: any) {
    Object.defineProperty(target, propertyKey, {
        get: () => Di.getInstance().get(key),
        enumerable: true,
        configurable: true,
    });
  };
}