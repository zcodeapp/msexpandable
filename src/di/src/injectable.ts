import { IInjectableOptions } from "@zcodeapp/interfaces";
import { Di } from ".";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Injectable(options?: IInjectableOptions): any {
    return function(constructor: any) {
        const di = Di.getInstance();
        di.register(constructor, options?.args, options?.singleton ?? false);
    };
}
