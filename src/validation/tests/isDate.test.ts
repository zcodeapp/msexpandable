import { Di } from '@zcodeapp/di'
import { IValidation } from '@zcodeapp/interfaces'
import { Validation } from '../src'
import { SampleDefaultValues } from './isDate/SampleDefaultValues'
import { SampleStringValue } from './isDate/SampleStringValue'
import { SampleInvalidType } from './isDate/SampleInvalidType'
import { Utils } from '@zcodeapp/utils'
import { SampleMessagesDefault } from './isDate/SampleMessagesDefault'
import { SampleMessages } from './isDate/SampleMessages'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test IsDate decorator', () => {
  const di = Di.getInstance()
  const validation = di.get<IValidation>(Validation)

  describe('Test for default and valid values using SampleDefaultValues', () => {
    it('Test valid default value validation', () => {
      const date = Di.getInstance().get(Date)
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.default = date
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.default).toBe(date)
    })
    it('Test valid default not apply generate value validation', () => {
      const date = Di.getInstance().get(Date)
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.nonGenerate = date
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.nonGenerate).toBe(date)
    })
    it('Test valid default generate required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generate).toBeInstanceOf(Date)
      expect(sampleDefaultValues.generate.toISOString()).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/
      )
    })
    it('Test valid default generate non-required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generate.toISOString()).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/
      )
    })
    it('Test valid default generate using boolean value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generateBoolean.toISOString()).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[+-]\d{2}:\d{2})?$/
      )
    })
  })

  describe('Test using string date', () => {
    it('Test valid string', () => {
      const date = '2020-03-01T16:04:16.298Z'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.dateString).toStrictEqual(new Date(date))
      expect(sampleDefaultValues.dateString).not.toBe(date)
    })
    it('Test valid string format, no Z', () => {
      const date = '2020-10-01T16:04:16.298'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      validation.check(sampleDefaultValues)
      expect(sampleDefaultValues.dateString.toISOString()).toBe(`${date}Z`)
    })
    it('Test valid string format, no milliseconds', () => {
      const date = '2020-10-01T16:04:10'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      validation.check(sampleDefaultValues)
      expect(sampleDefaultValues.dateString.toISOString()).toBe(`${date}.000Z`)
    })
    it('Test invalid string day', () => {
      const date = '2020-02-50T16:04:16.298Z'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleStringValue',
          propertyName: 'dateString',
          value: sampleDefaultValues.dateString
        }
      ])
    })
    it('Test invalid string month', () => {
      const date = '2020-13-01T16:04:16.298Z'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleStringValue',
          propertyName: 'dateString',
          value: sampleDefaultValues.dateString
        }
      ])
    })
    it('Test invalid string year', () => {
      const date = '20-10-01T16:04:16.298Z'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleStringValue',
          propertyName: 'dateString',
          value: sampleDefaultValues.dateString
        }
      ])
    })
    it('Test invalid string format, no T', () => {
      const date = '2020-10-01 16:04:16.298Z'
      const sampleDefaultValues = di.get(SampleStringValue)
      sampleDefaultValues.dateString = date as any
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleStringValue',
          propertyName: 'dateString',
          value: sampleDefaultValues.dateString
        }
      ])
    })
  })

  describe('Test for default invalid values using SampleInvalidType', () => {
    it('Test invalid default max value validation', () => {
      const sampleInvalidType = di.get(SampleInvalidType)
      sampleInvalidType.default = Utils.Numbers.RandomNumber(2)
      expect(validation.check(sampleInvalidType).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleInvalidType',
          propertyName: 'default',
          value: sampleInvalidType.default
        }
      ])
    })
  })

  describe('Test default messages for values using SampleMessagesDefault', () => {
    it('Test empty message for required', () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault)
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([
        {
          message: 'Class have property required without value',
          constructor: 'SampleMessagesDefault',
          propertyName: '_empty',
          value: sampleMessagesDefault._empty
        }
      ])
    })

    it('Test invalid message for uuid non required', () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault)
      sampleMessagesDefault._empty = new Date()
      sampleMessagesDefault._invalid1 = 50
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleMessagesDefault',
          propertyName: '_invalid1',
          value: sampleMessagesDefault._invalid1
        }
      ])
    })

    it('Test invalid message for invalid non required', () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault)
      sampleMessagesDefault._empty = new Date()
      sampleMessagesDefault._invalid2 = Utils.Strings.RandomString()
      expect(validation.check(sampleMessagesDefault).errors).toStrictEqual([
        {
          message: 'Class have invalid value',
          constructor: 'SampleMessagesDefault',
          propertyName: '_invalid2',
          value: sampleMessagesDefault._invalid2
        }
      ])
    })
  })

  describe('Test custom messages for values using SampleMessages', () => {
    it('Test empty message for required', () => {
      const sampleMessages = di.get(SampleMessages)
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          message: 'Empty message',
          constructor: 'SampleMessages',
          propertyName: '_empty',
          value: sampleMessages._empty
        }
      ])
    })

    it('Test invalid message for int/string non required', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages._empty = new Date()
      sampleMessages._invalid1 = 50
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          message: 'Invalid date message',
          constructor: 'SampleMessages',
          propertyName: '_invalid1',
          value: sampleMessages._invalid1
        }
      ])
    })

    it('Test invalid message for int invalid non required', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages._empty = new Date()
      sampleMessages._invalid2 = Utils.Strings.RandomString()
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          message: 'Invalid content message',
          constructor: 'SampleMessages',
          propertyName: '_invalid2',
          value: sampleMessages._invalid2
        }
      ])
    })
  })
})
