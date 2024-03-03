import { EValidationTypes } from "@zcodeapp/interfaces";
import { decoratorMinMax } from "./decorators/minmax";
import { decoratorDefault } from "./decorators/default";
import { decoratorGenerate } from "./decorators/generate";
import { decoratorModel } from "./decorators/model";

export const IsNumber = decoratorMinMax(EValidationTypes.NUMBER);
export const IsString = decoratorMinMax(EValidationTypes.STRING);
export const IsBoolean = decoratorDefault(EValidationTypes.BOOLEAN);
export const IsUuid = decoratorGenerate(EValidationTypes.UUID);
export const IsDate = decoratorGenerate(EValidationTypes.DATE);
export const IsDecimal = decoratorMinMax(EValidationTypes.DECIMAL);
export const HaveOne = decoratorModel(EValidationTypes.HAVE_ONE);
// export const HaveMany = decoratorDefault(EValidationTypes.HAVE_MANY);