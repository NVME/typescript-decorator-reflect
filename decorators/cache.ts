export function cache(target: object, propertyKey: string, descriptor: any) {
  let memoCache = new Map<string, any>();
  return {
    value: function (...args: any[]) {
      const key = JSON.stringify(args);
      if (memoCache.has(key)) {
        return memoCache.get(key);
      } else {
        const result = descriptor.value.apply(this, args);
        memoCache.set(key, result);
        return result;
      }
    },
  };
}
