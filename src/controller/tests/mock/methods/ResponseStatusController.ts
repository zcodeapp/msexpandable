import { ERequestStatus, IController } from '@zcodeapp/interfaces'
import { BaseController, Controller } from '../../../src'

@Controller('/', {
  responses: [
    {
      status: ERequestStatus.BAD_REQUEST,
      description: 'Example error 400'
    }
  ]
})
export class ResponseStatusController
  extends BaseController
  implements IController {}
