export const mergeSettings = <T extends Record<string, any>>(obj1: T, obj2?: T) => {
  return {...obj1, ...obj2} as Required<T>;
};
