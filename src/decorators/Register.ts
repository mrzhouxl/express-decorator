import * as express from 'express'
import { Router} from 'express'
//路由

export function register(app: any, controller:Array<any>) {
  const router: any = Router()
  controller.forEach((v: any) => {

    //先获取类上面的
    //获取当前service的元数据
    let classPath = Reflect.getMetadata('path', v)

    //在获取类属性上面的
    for (const key in new v()) {
      let attrMethod = Reflect.getMetadata('method', new v(), key);
      let attrPath = Reflect.getMetadata('path', new v(), key);
      //express router callback
      //@ts-ignore
      let fn: any = (req, res, next) => {
        let result = new v()[key].apply(new v(), [req, res])
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
      let routerParams = [classPath  + attrPath]
      routerParams.push(fn)
      console.log(routerParams)
      router[attrMethod].apply(router, routerParams)
    }
    // let params: any[] = [meta.baseUrl, bodyParser.json(), cookieParser()];
    // meta.midwares && (params = params.concat(meta.midwares));
    // params.push(router);
  })
  app.use(router)
}