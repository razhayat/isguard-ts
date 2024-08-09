export type TypeGuard<in out T> = (value: unknown) => value is T;

export type Guarded<T extends TypeGuard<any>> = T extends TypeGuard<infer R> ? R : never;

export type GuardedTuple<T extends readonly TypeGuard<any>[]> = {
	[I in keyof T]: Guarded<T[I]>;
};