import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
//import {isConstructor , isFunction} from "https://github.com/nestjs/nest/blob/master/packages/common/utils/shared.utils.ts"
//deno run -c tsconfig.json .\reflect-meta\router.ts
const METHOD_METADATA = "method";
const PATH_METADATA = "path";

const Controller = (path: string): ClassDecorator => {
  return (target) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  };
};

const createMappingDecorator = (method: string) =>
  (path: string): MethodDecorator => {
    return (target, key, descriptor) => {
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    };
  };

const Get = createMappingDecorator("GET");
const Post = createMappingDecorator("POST");

@Controller("/test")
class SomeClass {
  @Get("/a")
  someGetMethod() {
    return "hello world";
  }

  @Post("/b")
  somePostMethod() {}
}
const isFunction = (val: any): boolean => typeof val === 'function';
const isConstructor = (val: any): boolean => val === 'constructor';

function mapRoute(instance: Object) {
  const prototype = Object.getPrototypeOf(instance);

  // get class methodName
  const methodsNames = Object.getOwnPropertyNames(prototype)
    .filter((item) => !isConstructor(item) && isFunction(prototype[item]));
  return methodsNames.map((methodName) => {
    const fn = prototype[methodName];

    // get custom metadata
    const route = Reflect.getMetadata(PATH_METADATA, fn);
    const method = Reflect.getMetadata(METHOD_METADATA, fn);
    return {
      route,
      method,
      fn,
      methodName,
    };
  });
}

console.log(Reflect.getMetadata(PATH_METADATA, SomeClass)); // '/test'

const routs = mapRoute(new SomeClass());

console.log({ routs });
