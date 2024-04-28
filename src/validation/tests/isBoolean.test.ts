import { Di } from '@zcodeapp/di'
import { IValidation } from '@zcodeapp/interfaces'
import { Validation } from '../src/validation'
import { SampleDefaultValues } from './isBoolean/SampleDefaultValues'
import { SampleInvalidType } from './isBoolean/SampleInvalidType'
import { Utils } from '@zcodeapp/utils'
import { SampleMessagesDefault } from './isBoolean/SampleMessagesDefault'
import { SampleMessages } from './isBoolean/SampleMessages'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test IsBoolean decorator', () => {
  const di = Di.getInstance()
  const validation = di.get<IValidation>(Validation)

  describe('Test for default values using SampleDefaultValues', () => {
    it('Test valid default value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.default = true
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
    })
  })

  describe('Test for default invalid values using SampleInvalidType', () => {
    it('Test invalid default max value validation', () => {
      const sampleInvalidType = di.get(SampleInvalidType)
      sampleInvalidType.default = Utils.Strings.RandomString()
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

    it('Test invalid message for non required', () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault)
      sampleMessagesDefault._empty = false
      sampleMessagesDefault._invalid1 = Utils.Strings.RandomString(1)
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
      sampleMessagesDefault._empty = false
      sampleMessagesDefault._invalid2 = 'test' as any
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

    it('Test invalid message for non required', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages._empty = true
      sampleMessages._invalid1 = Utils.Strings.RandomString(1)
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          message: 'Invalid string message',
          constructor: 'SampleMessages',
          propertyName: '_invalid1',
          value: sampleMessages._invalid1
        }
      ])
    })

    it('Test invalid message for invalid non required', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages._empty = true
      sampleMessages._invalid2 = 'test' as any
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
