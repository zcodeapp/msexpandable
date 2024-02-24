import { EValidationTypes } from "@zcodeapp/interfaces";
import { decoratorMinMax } from "./decorators/minmax";
import { decoratorDefault } from "./decorators/default";

export const IsNumber = decoratorMinMax(EValidationTypes.NUMBER);
export const IsString = decoratorMinMax(EValidationTypes.STRING);
export const IsBoolean = decoratorDefault(EValidationTypes.BOOLEAN);
export const IsUuid = decoratorDefault(EValidationTypes.UUID);
// export const IsDatetime = decoratorDefault(EValidationTypes.DATETIME);

// export const IsModel = decoratorDefault(EValidationTypes.MODEL);