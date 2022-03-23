//https://blog.jannikwempe.com/typescript-class-decorators-incl-dependency-injection-example

import { Container, Injection } from "../container.ts";


// in order to know which parameters of the constructor (index) should be injected (identified by key)


// add to class which has constructor paramteters marked with @inject()
export function injectionTarget() {
  return function injectionTarget<T extends { new (...args: any[]): {} }>(
    constructor: T,
  ): T | void {
    // replacing the original constructor with a new one that provides the injections from the Container
    return class extends constructor {
      constructor(...args: any[]) {
        // get injections from class; previously created by @inject()
        const injections = (constructor as any).injections as Injection[];
        // get the instances to inject from the Container
        // this implementation does not support args which should not be injected
        const injectedArgs: any[] = injections.map(({ key }) => {
          console.log(`Injecting an instance identified by key ${key}`);
          return Container.get(key);
        });
        // call original constructor with injected arguments
        super(...injectedArgs);
      }
    };
  };
}

// mark constructor parameters which should be injected
// this stores the information about the properties which should be injected
export function inject(key: string) {
  return function (
    target: Object,
    propertyKey: string | symbol,
    parameterIndex: number,
  ) {
    const injection: Injection = { index: parameterIndex, key };
    const existingInjections: Injection[] = (target as any).injections || [];
    // create property 'injections' holding all constructor parameters, which should be injected
    Object.defineProperty(target, "injections", {
      enumerable: false,
      configurable: false,
      writable: false,
      value: [...existingInjections, injection],
    });
  };
}
