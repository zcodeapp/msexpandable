import { Injectable } from "../../../src";
import { Inject } from "../../../src";
import { ExampleSimpleInject } from "./ExampleSimpleInject"

@Injectable({ singleton: true})
export class ExampleSimpleDependencyInject {

    @Inject(ExampleSimpleInject)
    private _exampleSimpleInject: ExampleSimpleInject;

    public getExampleSimpleInject()
    {
        return this._exampleSimpleInject;
    }
}