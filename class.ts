// type ClassDecorator = <TFunction extends Function>
//   (target: TFunction) => TFunction | void;
type Consturctor = { new (...args: any[]): any };

function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toString() {
      return JSON.stringify(this);
    }
  };
}

@toString
class Foo {
  public foo = "foo";
  public num = 24;
}

console.log(new Foo().toString())
// -> {"foo":"foo","num":24}