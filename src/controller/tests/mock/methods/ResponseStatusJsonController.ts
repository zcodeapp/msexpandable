import { ERequestStatus, IController } from '@zcodeapp/interfaces'
import { BaseController, Controller } from '../../../src'

@Controller('/', {
  responses: [
    {
      status: ERequestStatus.BAD_REQUEST
    }
  ]
})
export class ResponseStatusJsonController
  extends BaseController
  implements IController {}
