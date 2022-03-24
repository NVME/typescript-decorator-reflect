import { Container } from "../container.ts";

type Consturctor = { new (...args: any[]): any };

export function injectable(key: string) {
  return <T extends Consturctor>(InjectableClass: T) => {
    Container.register(key, new InjectableClass());
  };
}
