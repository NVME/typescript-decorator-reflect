import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";

//deno run -c tsconfig.json .\reflect-meta\custom_meta.ts
function classDecorator(): ClassDecorator {
  return (target) => {
    Reflect.defineMetadata("classMetaData", "a", target);
  };
}

function methodDecorator(): MethodDecorator {
  return (target, key, descriptor) => {
    Reflect.defineMetadata("methodMetaData", "b", target, key);
  };
}

@classDecorator()
class SomeClass {
  @methodDecorator()
  someMethod() {}
}

console.log(Reflect.getMetadata("classMetaData", SomeClass)); // 'a'
console.log(
  Reflect.getMetadata("methodMetaData", new SomeClass(), "someMethod"),
); // 'b'
