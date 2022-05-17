import { Reflect } from "https://deno.land/x/deno_reflect@v0.1.13/mod.ts";
import {Repository} from "../user/userRepository.ts";
// ES7

//   deno run -c tsconfig.json .\reflect-meta\reflect_meta.ts
type Constructor<T = unknown> = new (...args: any[]) => T;

function decorator<T>(_: Constructor<T>): void {}


@decorator
class Example {
  constructor(a: string, b: Repository) {}
}


console.log(Reflect.getMetadata("design:paramtypes", Example));
// "[ [Function: String], [Function: Number], [Function: Example] ]"