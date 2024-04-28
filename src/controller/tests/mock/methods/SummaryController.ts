import { IController } from '@zcodeapp/interfaces'
import { BaseController, Controller } from '../../../src'

@Controller('/', {
  summary: 'Controller summary'
})
export class SummaryController extends BaseController implements IController {}
