import { TConstructor } from "../di";
import { IController } from "./IController";
import { IControllerOptions } from "./IControllerOptions";

export interface IControllerConfiguration {
  key: string;
  constructor: TConstructor<IController>,
  options?: IControllerOptions
}