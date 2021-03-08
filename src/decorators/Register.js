"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
var express_1 = require("express");
var _ = __importStar(require("lodash"));
var bodyParser = require('body-parser');
//路由
//获取参数
function extractParameters(req, res, params) {
    var args = new Array();
    if (!params)
        return;
    var paramHandlerTpe = {
        'body': function () { return req.body; },
        'query': function (paramName) { return req.query[paramName]; },
        'path': function (paramName) { return req.params[paramName]; },
        'form': function (paramName) { return req.body[paramName]; },
        'request': function () { return req; },
        'response': function () { return res; },
    };
    params.forEach(function (param) {
        args.push(paramHandlerTpe[param.key](param.key));
    });
    return args;
}
function register(app, controller) {
    var router = express_1.Router();
    controller.forEach(function (v) {
        //先获取类上面的
        //获取当前service的元数据
        var classPath = Reflect.getMetadata('path', v);
        var _loop_1 = function (key) {
            var attrMethod = Reflect.getMetadata('method', new v(), key);
            var attrPath = Reflect.getMetadata('path', new v(), key);
            var attrParams = Reflect.getMetadata('params', new v(), key);
            attrParams = _.sortBy(attrParams, function (v) { return v.index; });
            //express router callback
            //@ts-ignore
            var fn = function (req, res, next) {
                // let params=[req,res]
                var params = extractParameters(req, res, attrParams);
                console.log(params, '=>>>');
                var result = new v()[key].apply(new v(), params);
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
            router[attrMethod].apply(router, routerParams);
        };
        //在获取类属性上面的
        for (var key in new v()) {
            _loop_1(key);
        }
        // let params: any[] = [bodyParser.json(), bodyParser.urlencoded({ extended: false })];
        // params.push(router);
        // app.use.apply(app, params);
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: false }));
        app.use(router);
    });
}
exports.register = register;
