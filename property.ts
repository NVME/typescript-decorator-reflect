// type PropertyDecorator =
//   (target: Object, propertyKey: string | symbol) => void;
function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
function getEventKey(key: string) {
  return "on" + capitalizeFirstLetter(key) + "Change";
}

function observable(target: any, key: string): any {
  // prop -> onPropChange
  const targetKey = getEventKey(key);

  target[targetKey] = function (fn: (prev: any, next: any) => void) {
    let prev = this[key];
    Reflect.defineProperty(this, key, {
      set(next) {
        fn(prev, next);
        prev = next;
      },
    });
  };
}

class Foobar {
  @observable
  foo = -1;

  @observable
  bar = "bar";
}

type OnChangeEvent<T> =
  & {
    [K in keyof T as K extends string ? `on${Capitalize<K>}Change` : never]: (
      fn: (prev: T[K], next: T[K]) => void,
    ) => void;
  }
  & T;

const foobar = new Foobar() as OnChangeEvent<Foobar>;

foobar.onFooChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));
foobar.onBarChange((prev, next) => console.log(`prev: ${prev}, next: ${next}`));

foobar.foo = 100; // -> prev: -1, next: 100
foobar.foo = -3.14; // -> prev: 100, next: -3.14
foobar.bar = "baz"; // -> prev: bar, next: baz
foobar.bar = "sing"; // -> prev: baz, next: sing
