import {Controller, Get} from '../decorators/common'

@Controller('/User')
export class UserController{

  @Get('/test')
  add(res:any,req:any){
    console.log(11)
    return {
      a:11
    }
  }

}