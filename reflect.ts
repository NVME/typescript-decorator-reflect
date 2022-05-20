//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
//Reflect is a built-in object that provides methods for interceptable JavaScript operations.

// let alex = {
//   name: " Alex",
//   id: 89,
//   hello: function (a:any, b:any) {
//     console.log(`hello my name is ${this.name} ${a} ${b}`);
//   },
// };

// console.log(Reflect.ownKeys(alex))
// console.log(Reflect.has(alex,'name'))
// console.log(Reflect.get(alex, 'name'))
// Reflect.set(alex,'name','Joe')
// console.log(alex.name)

const example = {
  prop1: "property1",
  prop2: 42
};

Reflect.defineProperty(example, 'prop3', {
  value: "Property #3",
  enumerable: true,
  writable: true,
  configurable: true
});

//update
example['prop3'] = 'NEW AND IMPROVED Property #3';
// update by reflect
Reflect.set(example, 'prop3', 'ULTIMATELY IMPROVED Property #3');

console.log('prop3', Reflect.get(example, 'prop3'));
console.log(example);

console.log(Reflect.deleteProperty(example, 'prop3'));
//delete example['prop3'];
 console.log(Reflect.deleteProperty(example, 'prop1'));
//delete example.prop1;

console.log({
    ownKeys: Reflect.ownKeys(example),
    keys: Object.keys(example)
});
console.log(example);

console.log(Object.getOwnPropertyDescriptors(example));

