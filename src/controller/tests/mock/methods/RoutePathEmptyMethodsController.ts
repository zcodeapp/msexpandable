import { IController } from '@zcodeapp/interfaces'
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Patch,
  Options,
  Head,
  BaseController
} from '../../../src'

@Controller()
export class RoutePathEmptyMethodsController
  extends BaseController
  implements IController
{
  @Get()
  public get() {}

  @Post()
  public post() {}

  @Put()
  public put() {}

  @Delete()
  public delete() {}

  @Patch()
  public patch() {}

  @Options()
  public options() {}

  @Head()
  public head() {}
}
