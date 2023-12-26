import { IInjectableOptions, TConstructor } from "@zcodeapp-packages/interfaces";
import { Di } from "./di";

export function Injectable<T>(options?: IInjectableOptions) {
    return function (constructor: TConstructor<T>) {
        Di.getInstance().register(constructor, options?.singleton, options?.args);
    };
}
