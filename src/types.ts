type ExactEqual<T> = {
	required: Required<T>;
	keys: keyof T;
} & {};

export type TypeGuard<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	(value: unknown): value is T;
	optional: () => TypeGuard<T | undefined>;
	maybe: () => TypeGuard<T | null>;
	array: () => TypeGuard<T[]>;
	set: () => TypeGuard<Set<T>>;
	refine: <R extends T>(refinement: (value: T) => value is R) => TypeGuard<R>;
};

export type Guarded<T extends TypeGuard<any, any>> = T extends TypeGuard<infer R> ? R : never;

export type TypeGuardTemplate<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};
