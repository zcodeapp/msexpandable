import { TConstructor } from "@zcodeapp/interfaces";
import { Di } from "./di";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Inject<T, Args extends any[] = any[]>(key: TConstructor<T, Args> | string) {
  return function (target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        get: () => Di.getInstance().get(key),
        enumerable: true,
        configurable: true,
    });
  };
}