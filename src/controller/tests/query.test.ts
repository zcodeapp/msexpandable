import { Di } from "@zcodeapp/di";
import { EControllerMethod, ERequestStatus, IController } from "@zcodeapp/interfaces";
import { ControllerRequest } from "../src";
import { QueryReturnJsonController } from "./mock/query/QueryReturnJsonController"

/* eslint-disable @typescript-eslint/no-explicit-any */
describe("Test Query", () => {

  const di = Di.getInstance();

  it("Test Query return JSON QueryReturnJsonController", () => {

    const request = di.get(ControllerRequest);

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
  });

  it("Test Query with no query-data return JSON QueryReturnJsonController", () => {
    const instanceController = di.get<IController>(QueryReturnJsonController);

    const resultMethod = instanceController.callMethod("get");

    expect(resultMethod.statusCode).toBe(ERequestStatus.OK);
    expect(resultMethod.json).toBeTruthy();
    expect(resultMethod.body.query).toBeUndefined()
  });
});