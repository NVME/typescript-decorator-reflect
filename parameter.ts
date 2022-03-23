// type ParameterDecorator = (
//     target: Object,
//     propertyKey: string | symbol,
//     parameterIndex: number
//   ) => void;

type Validator = (x: any) => boolean;

// save the marks
const validateMap: Record<string, Validator[]> = {};

// 1. mark the parameters need to be validated
function typedDecoratorFactory(validator: Validator): ParameterDecorator {
  return (_, key, index) => {
    const target = validateMap[key as string] ?? [];
    target[index] = validator;
    validateMap[key as string] = target;
  }
}

function validate(_: Object, key: string, descriptor: PropertyDescriptor) {
  const originalFn = descriptor.value;
  descriptor.value = function(...args: any[]) {

    // 2. run the validators
    const validatorList = validateMap[key];
    if (validatorList) {
      args.forEach((arg, index) => {
        const validator = validatorList[index];

        if (!validator) return;

        const result = validator(arg);

        if (!result) {
          throw new Error(
            `Failed for parameter: ${arg} of the index: ${index}`
          );
        }
      });
    }

    // 3. run the original method
    return originalFn.call(this, ...args);
  }
}

const isInt = typedDecoratorFactory((x) => Number.isInteger(x));
const isString = typedDecoratorFactory((x) => typeof x === 'string');

class C {
  @validate
  sayRepeat(@isString word: string, @isInt x: number) {
    return Array(x).fill(word).join('');
  }
}

const c = new C();
c.sayRepeat('hello', 2); // pass
c.sayRepeat('', 'lol' as any); // throw an error