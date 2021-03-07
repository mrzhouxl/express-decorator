"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Post = exports.Get = exports.createdMethod = exports.Controller = void 0;
require("reflect-metadata");
var METHOD_METADETA = 'method';
var PATH_METADETA = 'path';
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
            console.log(PATH_METADETA, path, target, descriptor);
            Reflect.defineMetadata(PATH_METADETA, path, target, key);
            //添加方法元数据，描述当前方法为什么方法
            Reflect.defineMetadata(METHOD_METADETA, methods, target, key);
        };
    };
}
exports.createdMethod = createdMethod;
exports.Get = createdMethod('get');
exports.Post = createdMethod('post');
