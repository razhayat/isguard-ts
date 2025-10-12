import { ArrayTypeGuard, IndexRecordTypeGuard, IntersectionTypeGuard, MaybeTypeGuard, OptionalTypeGuard, RefineTypeGuard, SetTypeGuard, UnionTypeGuard } from ".";
import { AnyTypeGuard } from "./internal";

type ExactEqual<T> = {
	required: Required<T>;
	keys: keyof T;
} & {};

export type TypeGuard<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	(value: unknown): value is T;
	optional: () => OptionalTypeGuard<T>;
	maybe: () => MaybeTypeGuard<T>;
	and: <I extends readonly unknown[]>(...guards: TypeGuardTemplate<I>) => IntersectionTypeGuard<[T, ...I]>;
	or: <I extends readonly unknown[]>(...guards: TypeGuardTemplate<I>) => UnionTypeGuard<[T, ...I]>;
	array: () => ArrayTypeGuard<T>;
	set: () => SetTypeGuard<T>;
	indexRecord: () => IndexRecordTypeGuard<T>;
	refine: <R extends T>(refinement: (value: T) => value is R) => RefineTypeGuard<T, R>;
};

export type Guarded<T extends AnyTypeGuard> = T extends TypeGuard<infer R> ? R : never;

export type TypeGuardTemplate<in out T, in out _U extends ExactEqual<T> = ExactEqual<T>> = {
	-readonly [K in keyof T]-?: TypeGuard<T[K]>;
};
