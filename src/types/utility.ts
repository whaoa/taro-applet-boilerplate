/**
 * PartialByKeys
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/02757-medium-partialbykeys/README.md
 * @see https://github.com/type-challenges/type-challenges/issues/5395
 */
export type PartialByKeys<T, K extends keyof T> = Omit<
  Partial<Pick<T, K>> & Omit<T, K>,
  never
>;

/**
 * RequiredByKeys
 * @link https://github.com/type-challenges/type-challenges/blob/main/questions/02759-medium-requiredbykeys/README.md
 * @see https://github.com/type-challenges/type-challenges/issues/8405
 */
export type RequiredByKeys<T, K extends keyof T> = Omit<
  T & Required<Pick<T, K>>,
  never
>;
