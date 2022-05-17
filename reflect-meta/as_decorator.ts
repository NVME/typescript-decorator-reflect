import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
//deno run -c tsconfig.json .\reflect-meta\as_decorator.ts
@Reflect.metadata("inClass", "A")
class Test {
  @Reflect.metadata("inMethod", "B")
  public hello(): string {
    return "hello world";
  }
}

console.log(Reflect.getMetadata("inClass", Test)); // 'A'
console.log(Reflect.getMetadata("inMethod", new Test(), "hello")); // 'B'
