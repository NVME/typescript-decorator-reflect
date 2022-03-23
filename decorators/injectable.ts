import { Container } from "../container.ts";
import { UserRepository } from "../user/user.ts";
import { Consturctor } from "../Util.ts";

export function injectable<T extends Consturctor>(InjectableClass: T) {
  const className = InjectableClass.name;
  Container.register(className, new InjectableClass());
}

export function injector<T extends { new (...args: any[]): {} }>(
  InjectTargetClass: T,
): T | void {
  
  // replacing the original constructor with a new one that provides the injections from the Container
  return class extends InjectTargetClass {
    constructor(...args: any[]) {
      // get the instances to inject from the Container
      // this implementation does not support args which should not be injected
      type paramsType= ConstructorParameters<typeof InjectTargetClass>;
      
      console.log('dfdf')
      const injectedArgs: any[] = args.map((arg) => {
        const key = typeof arg;
        console.log(`Injecting an instance identified by key ${key}`);
        return Container.get(key);
      });
      // call original constructor with injected arguments
      super(...injectedArgs);
    }
  };
}

@injector
class D {
  constructor(userRepository?: UserRepository) {
  }
}

const d= new D();


