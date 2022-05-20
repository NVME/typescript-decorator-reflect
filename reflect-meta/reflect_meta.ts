import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
import { Repository } from "../user/userRepository.ts";
// ES7
// https://blog.wotw.pro/typescript-decorators-reflection/
// https://github.com/rbuckton/reflect-metadata

// deno run -c tsconfig.json .\reflect-meta\reflect_meta.ts
// By default, emitDecoratorMetadata exposes three new properties:

// design:type: the type of the object being decorated (here a Function)
// design:paramtypes: an array of types that match either the decorated item's signature or its constructor's signature (here [Number])
// design:returntype: the return type of the object being decorated (here void 0)

function LogMethod(
  target: any,
  propertyKey: string | symbol,
  descriptor: PropertyDescriptor,
) {

  // Checks the type of the decorated object
  const t=Reflect.getMetadata("design:type", target, propertyKey);
  console.log(t);
  // [Function: Function]

  // Checks the types of all params
  var types = Reflect.getMetadata("design:paramtypes", target, propertyKey); 
  console.log(types);
  //[ [Function: Number], [Function: String] ]

  // Checks the return type
  console.log(Reflect.getMetadata("design:returntype", target, propertyKey));
  // [Function: String]
}

class Demo {
  @LogMethod
  public foo(bar: number,tar:string):string {
    // do nothing
    return 'foobar'
  }
}
const demo = new Demo();

console.log({
  ownMetadataKeys: Reflect.getOwnMetadataKeys(demo),
  metadataKeys: Reflect.getMetadataKeys(demo)
});
