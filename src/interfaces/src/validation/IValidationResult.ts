import { IValidationError } from './IValidationError'

export interface IValidationResult {
  errors: IValidationError[]
  success: boolean
}
