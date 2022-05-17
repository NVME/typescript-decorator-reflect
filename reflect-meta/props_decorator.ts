import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
//deno run -c tsconfig.json .\reflect-meta\props_decorator.ts
function Prop(): PropertyDecorator {
  return (target, key: string | symbol) => {
    const type = Reflect.getMetadata("design:type", target, key);
    console.log(`${String(key)} type: ${type.name}`);
    // other...
  };
}

class SomeClass {
  @Prop()
  public Aprop!: string;
}
