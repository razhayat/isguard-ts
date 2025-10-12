import { ArrayTypeGuard, IndexRecordTypeGuard, IntersectionTypeGuard, isArray, isIndexRecord, isIntersection, isMaybe, isOptional, isRefine, isSet, isUnion, MaybeTypeGuard, OptionalTypeGuard, RefineTypeGuard, SetTypeGuard, UnionTypeGuard } from "..";
import { TypeGuard, TypeGuardTemplate } from ".";

export interface TypeGuardClass<T> {
	(value: unknown): value is T;
}

export abstract class TypeGuardClass<T> extends Function implements TypeGuard<T> {
	// @ts-expect-error
	public constructor() {
		const newThis = (value: unknown) => {
			return (newThis as TypeGuardClass<T>).is(value);
		};

		return Object.setPrototypeOf(newThis, new.target.prototype);
	}

	protected abstract is(value: unknown): boolean;

	public optional(): OptionalTypeGuard<T> {
		return isOptional(this);
	}

	public maybe(): MaybeTypeGuard<T> {
		return isMaybe(this);
	}

	public and<I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>): IntersectionTypeGuard<[T, ...I]> {
		return isIntersection<[T, ...I]>(this, ...guards);
	}

	public or<I extends readonly unknown[]>(...guards: TypeGuardTemplate<I, any>): UnionTypeGuard<[T, ...I]> {
		return isUnion<[T, ...I]>(this, ...guards);
	}

	public array(): ArrayTypeGuard<T> {
		return isArray(this);
	}

	public set(): SetTypeGuard<T> {
		return isSet(this);
	}

	public indexRecord(): IndexRecordTypeGuard<T> {
		return isIndexRecord(this);
	}

	public refine<R extends T>(refinement: (value: T) => value is R): RefineTypeGuard<T, R> {
		return isRefine(this, refinement);
	}
}
