function immutable(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const original = descriptor.set;
  
    descriptor.set = function (value: any) {
      return original.call(this, { ...value })
    }
  }
  
  class Accessor {
    private _point = { x: 0, y: 0 }
  
    @immutable
    set point(value: { x: number, y: number }) {
      this._point = value;
    }
  
    get point() {
      return this._point;
    }
  }
  
  const accessor = new Accessor();
  const point = { x: 1, y: 1 }
  accessor.point = point;
  
  console.log(accessor.point === point)
  // -> false