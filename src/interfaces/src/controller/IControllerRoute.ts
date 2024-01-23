import { IControllerRouteOptions } from "./IControllerRouteOptions";

export interface IControllerRoute extends IControllerRouteOptions {
  key: string;
  propertyName: string;
  descriptor: PropertyDescriptor;
}