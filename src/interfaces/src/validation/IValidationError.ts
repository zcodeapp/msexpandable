/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IValidationError {
  message: string
  constructor: string
  propertyName: string
  value?: any
}
