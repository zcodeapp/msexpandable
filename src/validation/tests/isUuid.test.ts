import { Di } from '@zcodeapp/di'
import { IValidation } from '@zcodeapp/interfaces'
import { Utils } from '@zcodeapp/utils'
import { Validation } from '../src'
import { SampleDefaultValues } from './isUuid/SampleDefaultValues'
import { SampleInvalidType } from './isUuid/SampleInvalidType'
import { SampleMessagesDefault } from './isUuid/SampleMessagesDefault'
import { SampleMessages } from './isUuid/SampleMessages'

/* eslint-disable @typescript-eslint/no-explicit-any */
describe('Test IsUuid decorator', () => {
  const di = Di.getInstance()
  const validation = di.get<IValidation>(Validation)

  describe('Test for default and valid values using SampleDefaultValues', () => {
    it('Test valid default value validation', () => {
      const uuid = Utils.Strings.Uuid()
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.default = uuid
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.default).toBe(uuid)
    })
    it('Test valid default not apply generate value validation', () => {
      const uuid = Utils.Strings.Uuid()
      const sampleDefaultValues = di.get(SampleDefaultValues)
      sampleDefaultValues.nonGenerate = uuid
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.nonGenerate).toBe(uuid)
    })
    it('Test valid default generate required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generate).toMatch(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
      )
    })
    it('Test valid default generate non-required value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generateNonRequired).toMatch(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
      )
    })
    it('Test valid default generate using boolean value validation', () => {
      const sampleDefaultValues = di.get(SampleDefaultValues)
      expect(validation.check(sampleDefaultValues).errors).toStrictEqual([])
      expect(sampleDefaultValues.generateBoolean).toMatch(
        /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/
      )
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
      sampleMessagesDefault._empty = Utils.Strings.Uuid()
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

    it('Test invalid message for int invalid non required', () => {
      const sampleMessagesDefault = di.get(SampleMessagesDefault)
      sampleMessagesDefault._empty = Utils.Strings.Uuid()
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
      sampleMessages._empty = Utils.Strings.Uuid()
      sampleMessages._invalid1 = 50
      expect(validation.check(sampleMessages).errors).toStrictEqual([
        {
          message: 'Invalid uuid message',
          constructor: 'SampleMessages',
          propertyName: '_invalid1',
          value: sampleMessages._invalid1
        }
      ])
    })

    it('Test invalid message for int invalid non required', () => {
      const sampleMessages = di.get(SampleMessages)
      sampleMessages._empty = Utils.Strings.Uuid()
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
