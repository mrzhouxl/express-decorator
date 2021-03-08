import {Body, Controller, Get, Post} from '../decorators/common'

@Controller('/User')
export class UserController{

  @Post('/test')
  add(@Body() body:any){
    console.log(body)
    return {
      a:11
    }
  }

}