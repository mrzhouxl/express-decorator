"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var express_1 = require("express");
//路由
function register(app, controller) {
    var router = express_1.Router();
    controller.forEach(function (v) {
        //先获取类上面的
        //获取当前service的元数据
        var classPath = Reflect.getMetadata('path', v);
        var _loop_1 = function (key) {
            var attrMethod = Reflect.getMetadata('method', new v(), key);
            var attrPath = Reflect.getMetadata('path', new v(), key);
            //express router callback
            //@ts-ignore
            var fn = function (req, res, next) {
                var result = new v()[key].apply(new v(), [req, res]);
                if (result instanceof Promise) {
                    result.then(function (value) {
                        !res.headersSent && res.send(value);
                    }).catch(function (err) {
                        next(err);
                    });
                }
                else if (result !== undefined) {
                    !res.headersSent && res.send(result);
                }
            };
            var routerParams = [classPath + attrPath];
            routerParams.push(fn);
            console.log(routerParams);
            router[attrMethod].apply(router, routerParams);
        };
        //在获取类属性上面的
        for (var key in new v()) {
            _loop_1(key);
        }
        // let params: any[] = [meta.baseUrl, bodyParser.json(), cookieParser()];
        // meta.midwares && (params = params.concat(meta.midwares));
        // params.push(router);
    });
    app.use(router);
}
exports.register = register;
