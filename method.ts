// type MethodDecorator = <T>(
//     target: Object,
//     propertyKey: string | symbol,
//     descriptor: TypedPropertyDescriptor<T>
//   ) => TypedPropertyDescriptor<T> | void;

class A {
  @bar
  foo(n: number) {
    console.log("foo", n);
  }
}

// function bar(target: object, propertyKey: string, descriptor: any) {
//   console.log('bar', target, propertyKey, descriptor)
// }
  
function bar(target: object, propertyKey: string, descriptor: any) {
  return {
    value: function (...args: any[]) {
      console.log("bar");
      descriptor.value.apply(this, args);
    },
  };
}

const a = new A();
a.foo(1);

