import { IDiOptions, TConstructor } from "@zcodeapp/interfaces";
import { Di } from ".";
import "reflect-metadata";

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Injectable(options?: IDiOptions): any {
    return function(constructor: TConstructor<any>) {
        const di = Di.getInstance();
        di.register(constructor, options);
    };
}
