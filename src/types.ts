export type TypeGuard<in out T> = (value: unknown) => value is T;

export type Guarded<T extends TypeGuard<any>> = T extends TypeGuard<infer R> ? R : never;

export type MapGuarded<T extends readonly TypeGuard<any>[]> = {
	[I in keyof T]: Guarded<T[I]>;
};

export type MapTypeGuard<T extends readonly unknown[]> = {
	[I in keyof T]: TypeGuard<T[I]>;
};

export type TypeGuardTemplate<T> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};

export type IsTypeParameter<T> = TypeGuardTemplate<T> | ((guard: TypeGuard<T>) => IsTypeParameter<T>);
