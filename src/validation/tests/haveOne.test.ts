import { Di } from '@zcodeapp/di'
import { IValidation } from '@zcodeapp/interfaces'
import { Validation } from '../src/validation'
import { SampleDefaultValues } from './haveOne/SampleDefaultValues'
import { SampleDefaultData } from './haveOne/SampleDefaultData'
import { SampleMessages } from './haveOne/SampleMessages'
import { SampleDefaultModelRequired } from './haveOne/SampleDefaultModelRequired'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test HaveOne decorator', () => {
  const di = Di.getInstance()
  const validation = di.get<IValidation>(Validation)

  describe('Test for values using SampleDefaultValues', () => {
    it('Test valid required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
    })

    it('Test valid required invalid object value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultValues as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'This value needs to be a "SampleDefaultData" object',
          propertyName: 'default',
          value: sampleDefaultValues
        }
      ])
    })

    it('Test valid not required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData
      sampleDefaultValues.nonRequired = sampleDefaultData
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
    })

    it('Test invalid non-required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData
      sampleDefaultValues.nonRequired = 'value fake' as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'This value needs to be a "SampleDefaultData" object',
          propertyName: 'nonRequired',
          value: 'value fake'
        }
      ])
    })

    it('Test invalid required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.default = 'value fake' as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'This value needs to be a "SampleDefaultData" object',
          propertyName: 'default',
          value: 'value fake'
        }
      ])
    })

    it('Test invalid value inside dependency', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 12345 as any
      sampleDefaultValues.default = sampleDefaultData
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'Class have invalid value',
          propertyName: 'default.name',
          value: 12345
        }
      ])
    })

    it('Test invalid object value inside dependency', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultData.nonRequired = sampleDefaultValues as any
      sampleDefaultValues.default = sampleDefaultData
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'This value needs to be a "SampleDefaultData" object',
          propertyName: 'default.nonRequired',
          value: sampleDefaultValues
        }
      ])
    })

    it('Test valid non-required value validation using model configuration', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData
      sampleDefaultValues.modelConfig = sampleDefaultData
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
    })

    it('Test invalid non-required value validation using model configuration', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultValues.default = sampleDefaultData
      sampleDefaultValues.modelConfig = 'Name test'
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          constructor: 'SampleDefaultValues',
          message: 'This value needs to be a "SampleDefaultData" object',
          propertyName: 'modelConfig',
          value: 'Name test'
        }
      ])
    })
  })

  describe('Test for values using SampleDefaultModelRequired', () => {
    it('Test valid required value validation', () => {
      const sampleDefaultModelRequired = di.get(SampleDefaultModelRequired)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleDefaultModelRequired.default = sampleDefaultData
      expect(validation.check(sampleDefaultModelRequired).errors).toStrictEqual(
        []
      )
    })
    it('Test invalid required value validation', () => {
      const sampleDefaultModelRequired = di.get(SampleDefaultModelRequired)
      sampleDefaultModelRequired.default = 'content' as any
      expect(validation.check(sampleDefaultModelRequired).errors).toStrictEqual(
        [
          {
            constructor: 'SampleDefaultModelRequired',
            message: 'This value needs to be a "SampleDefaultData" object',
            propertyName: 'default',
            value: 'content'
          }
        ]
      )
    })
  })

  describe('Test for values using SampleMessages', () => {
    it('Test empty message using undefined', () => {
      const sampleMessages = di.get(SampleMessages)
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          constructor: 'SampleMessages',
          message: 'Invalid message',
          propertyName: 'default',
          value: undefined
        }
      ])
    })

    it('Test empty message using null', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages.default = null as any
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          constructor: 'SampleMessages',
          message: 'Invalid message',
          propertyName: 'default',
          value: null
        }
      ])
    })

    it('Test invalid message', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages.default = 'string content' as any
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          constructor: 'SampleMessages',
          message: 'Invalid message',
          propertyName: 'default',
          value: 'string content'
        }
      ])
    })

    it('Test invalid non-required message', () => {
      const sampleMessages = di.get(SampleMessages)
      const sampleDefaultData = di.get(SampleDefaultData)
      sampleDefaultData.name = 'Name test'
      sampleMessages.default = sampleDefaultData
      sampleMessages.NonRequired = 'string content' as any
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          constructor: 'SampleMessages',
          message: 'Invalid message non-required',
          propertyName: 'NonRequired',
          value: 'string content'
        }
      ])
    })
  })
})
