import {Body, Controller, Get, Post,Query} from '../decorators/common'

@Controller('/User')
export class UserController{

  @Post('/test')
  add(@Body() body:any,@Query('user') query:any){
    console.log(body,query)
    return {
      a:11
    }
  }

}