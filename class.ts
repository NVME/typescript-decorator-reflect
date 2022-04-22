// type ClassDecorator = <TFunction extends Function>
//   (target: TFunction) => TFunction | void;
type Consturctor = { new (...args: any[]): any };
type ToStringType<T> = T & {toStr:()=>void}
function toString<T extends Consturctor>(BaseClass: T) {
  return class extends BaseClass {
    toStr() {
      return JSON.stringify(this);
    }
  } ;
}

@toString
class Foo {
  public foo = "foo";
  public num = 24;
}
const foo= new  Foo() as ToStringType<Foo> ;
console.log(foo.toStr())
// -> {"foo":"foo","num":24}