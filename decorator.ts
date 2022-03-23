//https://www.typescriptlang.org/docs/handbook/decorators.html
//https://saul-mirone.github.io/a-complete-guide-to-typescript-decorator/
//https://blog.wolksoftware.com/decorators-metadata-reflection-in-typescript-from-novice-to-expert-part-4
//So, applying decorators is a lot like composing a chain of functions, pretty much like higher-order function or class.

// declare type ClassDecorator = <TFunction extends Function>(target: TFunction) => TFunction | void;

// declare type PropertyDecorator = (target: Object, propertyKey: string | symbol) => void;

// declare type MethodDecorator = <T>(target: Object, propertyKey: string | symbol, descriptor: TypedPropertyDescriptor<T>) => TypedPropertyDescriptor<T> | void;

// declare type ParameterDecorator = (target: Object, propertyKey: string | symbol, parameterIndex: number) => void;

// @classDecorator
// class Bird {
//   @propertyDecorator
//   name: string;

//   @methodDecorator
//   fly(
//     @parameterDecorator
//       meters: number
//   ) {}

//   @accessorDecorator
//   get egg() {}
// }

//Decorators execute only once, when a class definition is first evaluated at runtime.
function simpleDecorator(target: any) {
  console.log("---hi I am a decorator---");
}

@simpleDecorator
class A {}
//output: ---hi I am a decorator---
