import * as express from 'express'
import { Router } from 'express'
import * as _ from 'lodash'
var bodyParser = require('body-parser')
//路由

//获取参数
function extractParameters(req: any, res: any, params: any) {
  let args: Array<any> = new Array();
  if (!params) return;

  let paramHandlerTpe: any = {
    'body': () => req.body,
    'query': (paramName: string) => req.query[paramName],
    'path': (paramName: string) => req.params[paramName],
    'form': (paramName: string) => req.body[paramName],
    'request': () => req,
    'response': () => res,
  }

  params.forEach((param: any) => {
    args.push(paramHandlerTpe[param.key](param.key))
  })
  return args;
}


export function register(app: any, controller: Array<any>) {
  const router: any = Router()
  controller.forEach((v: any) => {

    //先获取类上面的
    //获取当前service的元数据
    let classPath = Reflect.getMetadata('path', v)

    //在获取类属性上面的
    for (const key in new v()) {
      let attrMethod = Reflect.getMetadata('method', new v(), key);
      let attrPath = Reflect.getMetadata('path', new v(), key);
      let attrParams = Reflect.getMetadata('params', new v(), key);
      attrParams = _.sortBy(attrParams, (v) => v.index)
      //express router callback
      //@ts-ignore
      let fn: any = (req, res, next) => {
        // let params=[req,res]
        let params = extractParameters(req, res, attrParams)
        console.log(params,'=>>>')

        let result = new v()[key].apply(new v(), params)
        if (result instanceof Promise) {
          result.then(value => {
            !res.headersSent && res.send(value);
          }).catch(err => {
            next(err)
          })
        } else if (result !== undefined) {
          !res.headersSent && res.send(result);
        }
      }
      let routerParams = [classPath + attrPath]
      routerParams.push(fn)
      router[attrMethod].apply(router, routerParams)
    }
    // let params: any[] = [bodyParser.json(), bodyParser.urlencoded({ extended: false })];
    // params.push(router);
    // app.use.apply(app, params);
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(router)
  })

}