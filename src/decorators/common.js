"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Query = exports.Body = exports.Post = exports.Get = exports.createdMethod = exports.Controller = void 0;
require("reflect-metadata");
var METHOD_METADETA = 'method';
var PATH_METADETA = 'path';
var PARAMS_METADETA = 'params';
function Controller(path) {
    return function (target) {
        //给当前类添加一个元数据
        Reflect.defineMetadata(PATH_METADETA, path, target);
    };
}
exports.Controller = Controller;
function createdMethod(methods) {
    return function (path) {
        return function (target, key, descriptor) {
            //给类的属性添加属性，描述当前属性的路径
            Reflect.defineMetadata(PATH_METADETA, path, target, key);
            //添加方法元数据，描述当前方法为什么方法
            Reflect.defineMetadata(METHOD_METADETA, methods, target, key);
        };
    };
}
exports.createdMethod = createdMethod;
//要想加其他的装饰器用这个方法在添加就行了
exports.Get = createdMethod('get');
exports.Post = createdMethod('post');
exports.Body = createParams("body");
exports.Query = createParams("query");
function createParams(param) {
    return function (field) {
        return function (target, name, index) {
            var params = Reflect.getMetadata(PARAMS_METADETA, new target.constructor(), name) || [];
            params.push({ key: param, index: index, field: field });
            Reflect.defineMetadata(PARAMS_METADETA, params, target, name);
        };
    };
}
