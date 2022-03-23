//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect
//Reflect is a built-in object that provides methods for interceptable JavaScript operations.

let alex = {
  name: " Alex",
  id: 89,
  hello: function (a:any, b:any) {
    console.log(`hello my name is ${this.name} ${a} ${b}`);
  },
};

console.log(Reflect.ownKeys(alex))
console.log(Reflect.has(alex,'name'))
console.log(Reflect.get(alex, 'name'))
Reflect.set(alex,'name','Joe')
console.log(alex.name)

