# 使用TS装饰器写的一个小demo
  主要基于express封装装饰器完成路由功能，获取参数的功能
  也就也了个@Controller @Post @Get @Body @Query
  主要为了学习
  decorators文件夹里面的common是封装的装饰器，register主要是为了注册的
  index里面有使用的方法
 ```TS
  var express = require('express');
  import {register} from './decorators/Register'
  import {UserController} from './controller/UserController'
  import { Router } from 'express';
  import * as bodyParser from 'body-parser'
  var app=express()

  register(app,[UserController]);

  var server = app.listen(3122, function () {
      var host = server.address().address;
      var port = server.address().port;
      console.log('Example app listening at http://%s:%s', host, port);
  })
  //controller
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
 ```
## 用于联系，博客地址https://www.cnblogs.com/silentCM/p/14509664.html

## 希望对各位有用，希望点个star
