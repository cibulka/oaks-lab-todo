export function getArrayIntersection<T>(arr1: T[], arr2: T[]) {
  return arr1.filter((v) => arr2.includes(v));
}

export function isArrayIntersecting<T>(arr1: T[], arr2: T[]) {
  return getArrayIntersection(arr1, arr2).length > 0;
}
