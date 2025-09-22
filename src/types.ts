type ExactEqual<T> = {
	required: Required<T>;
};

export type TypeGuard<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	(value: unknown): value is T;
};

export type Guarded<T extends TypeGuard<any, any>> = T extends TypeGuard<infer R> ? R : never;

export type TypeGuardTemplate<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};
