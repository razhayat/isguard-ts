import { TypeGuard, TypeGuardTemplate } from "..";
import { IntersectionTypeGuardClass, TupleToIntersection } from "./internal";

/**
 * A {@linkcode TypeGuard} for intersection types (`A & B & C`).
 *
 * Returned by {@linkcode isIntersection} and {@linkcode TypeGuard.and}.
 *
 * @template T - Array of types in the intersection
 */
export type IntersectionTypeGuard<T extends readonly unknown[]> = TypeGuard<
	TupleToIntersection<T>
> & {
	/** The array of type guards used in this intersection */
	guards: TypeGuardTemplate<T>;
};

/**
 * Creates an {@linkcode IntersectionTypeGuard} that checks that the value matches **all** provided type guards.
 *
 * Can be shortened with {@linkcode TypeGuard.and}.
 *
 * @template T - Array of types in the intersection
 * @param guards - The type guards for each type in the intersection
 * @returns A type guard for the intersection of all the given type guards
 *
 * @example
 * type A = { a: number };
 * type B = { b: string };
 * type C = A & B;
 *
 * const isA = isType<A>({ a: isNumber });
 * const isB = isType<B>({ b: isString });
 *
 * const isC = isIntersection(isA, isB); // or isA.and(isB)
 *
 * isC({ a: 1, b: "hello" }); // true
 * isC({ a: 1 }); // false
 */
export const isIntersection = <T extends readonly unknown[]>(
	...guards: TypeGuardTemplate<T>
): IntersectionTypeGuard<T> => {
	return new IntersectionTypeGuardClass<T>(guards);
};
