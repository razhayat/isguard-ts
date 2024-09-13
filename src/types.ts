export type TypeGuard<in out T> = (value: unknown) => value is T;

export type Guarded<T extends TypeGuard<any>> = T extends TypeGuard<infer R> ? R : never;

export type TypeGuardTemplate<in out T> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};

export type TypeGuardTemplateFunction<in out T> = (guard: TypeGuard<T>) => TypeGuardTemplateParameter<T>;

export type TypeGuardTemplateParameter<T> = TypeGuardTemplate<T> | TypeGuardTemplateFunction<T>;
