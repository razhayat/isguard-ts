import { ArrayTypeGuard, IndexRecordTypeGuard, IntersectionTypeGuard, isArray, isIndexRecord, isIntersection, isMaybe, isOptional, isRefine, isSet, isUnion, MaybeTypeGuard, OptionalTypeGuard, RefineTypeGuard, SetTypeGuard, UnionTypeGuard } from "..";
import { TypeGuard, TypeGuardTemplate } from "../types";

export interface TypeGuardClass<T> {
	(value: unknown): value is T;
}

export class TypeGuardClass<T> extends Function implements TypeGuard<T> {
	constructor(func: (value: unknown) => boolean) {
		super();
		return Object.setPrototypeOf(func, new.target.prototype);
	}

	optional(): OptionalTypeGuard<T> {
		return isOptional(this);
	}

	maybe(): MaybeTypeGuard<T> {
		return isMaybe(this);
	}

	and<I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>): IntersectionTypeGuard<[T, ...I]> {
		return isIntersection<[T, ...I]>(this, ...guards);
	}

	or<I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>): UnionTypeGuard<[T, ...I]> {
		return isUnion<[T, ...I]>(this, ...guards);
	}

	array(): ArrayTypeGuard<T> {
		return isArray(this);
	}

	set(): SetTypeGuard<T> {
		return isSet(this);
	}

	indexRecord(): IndexRecordTypeGuard<T> {
		return isIndexRecord(this);
	}

	refine<R extends T>(refinement: (value: T) => value is R): RefineTypeGuard<T, R> {
		return isRefine(this, refinement);
	}
}
