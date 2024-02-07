import { Di } from "@zcodeapp/di";
import { EControllerMethod, ERequestStatus, IController, IControllerManager } from "@zcodeapp/interfaces";
import { ControllerManager, ControllerRequest, ControllerResponse } from "../src";
import { QueryReturnJsonController } from "./mock/query/QueryReturnJsonController"

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Test Query", () => {

  const di = Di.getInstance();
  let controllerManager: IControllerManager;

  beforeEach(() => {
      controllerManager = di.get(ControllerManager);
  });

  it("Test Query return JSON QueryReturnJsonController", () => {

    const request = di.get(ControllerRequest);
    const response = di.get(ControllerResponse);

    request.populate({
      originalUrl: "",
      url: "",
      method: EControllerMethod.GET,
      query: QueryReturnJsonController.getQuery()
    });

    const instanceController = di.get<IController>(QueryReturnJsonController, {
      providers: [
        {
          class: ControllerRequest,
          factory: () => request
        },
        {
          class: ControllerResponse,
          factory: () => response
        }
      ]
    });

    const resultMethod = instanceController.callMethod("get");

    const [ partner, country ] = QueryReturnJsonController.getQuery();

    expect(resultMethod.statusCode).toBe(ERequestStatus.OK);
    expect(resultMethod.json).toBeTruthy();
    expect(resultMethod.body.partner).toBe(partner.value);
    expect(resultMethod.body.country).toBe(country.value);
    expect(resultMethod.body.query).toStrictEqual(QueryReturnJsonController.getQuery());
  })
});