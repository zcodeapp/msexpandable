import { IInjectableOptions, TConstructor } from "@zcodeapp/interfaces";
import { Di } from "./di";

export function Injectable<T>(options?: IInjectableOptions) {
    return function (constructor: TConstructor<T>) {
        Di.getInstance().register(constructor, options?.args ?? [], options?.singleton);
    };
}
