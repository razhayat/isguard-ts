import { TypeGuard, TypeGuardTemplate } from "..";
import { IntersectionTypeGuardClass, TupleToIntersection } from "./internal";

/**
 * A type guard for intersection types.
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
 * Creates a `TypeGuard` for intersection types.
 * Accepts multiple type guards and creates a guard that passes only if all of them pass.
 *
 * Can be shortened with {@linkcode TypeGuard.and}.
 *
 * @template T - Array of types in the intersection
 * @param guards - The type guards for each type in the intersection
 * @returns A type guard that accepts the intersection of all types
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
