import { Di } from '@zcodeapp/di'
import { IValidation } from '@zcodeapp/interfaces'
import { Validation } from '../src/validation'
import { SampleDefaultValues } from './haveOne/SampleDefaultValues'
import { SampleDefaultData } from './haveOne/SampleDefaultData'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test HaveOne decorator', () => {
  const di = Di.getInstance()
  const validation = di.get<IValidation>(Validation)

  describe('Test for default values using SampleDefaultValues', () => {
    it('Test valid default value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)

      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData

      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
    })
  })
})
