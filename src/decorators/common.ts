import "reflect-metadata";

const METHOD_METADETA='method'
const PATH_METADETA='path'

export function Controller(path: string): ClassDecorator {
  return (target) => {
    //给当前类添加一个元数据
    Reflect.defineMetadata(PATH_METADETA, path, target);
  }
}
export function createdMethod(methods: string) {
  return (path: string): MethodDecorator => {
    return (target: any, key: string | symbol, descriptor: any) => {
      //给类的属性添加属性，描述当前属性的路径
      console.log(PATH_METADETA,path,target,descriptor)
      Reflect.defineMetadata(PATH_METADETA,path,target,key);
      //添加方法元数据，描述当前方法为什么方法
      Reflect.defineMetadata(METHOD_METADETA,methods,target,key)
    }
  }
}

export const Get=createdMethod('get')
export const Post=createdMethod('post')


 

