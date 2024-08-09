export type TypeGuard<in out T> = (value: unknown) => value is T;
export type Guarded<T extends TypeGuard<any>> = T extends TypeGuard<infer R> ? R : never;
