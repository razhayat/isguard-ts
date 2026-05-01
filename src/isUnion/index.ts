import { TypeGuard, TypeGuardTemplate } from "..";
import { UnionTypeGuardClass } from "./internal";

/**
 * A type guard for union types.
 *
 * @template T - Array of types in the union
 */
export type UnionTypeGuard<T extends readonly unknown[]> = TypeGuard<
	T[number]
> & {
	/** The array of type guards used in this union */
	guards: TypeGuardTemplate<T>;
};

/**
 * Creates a `TypeGuard` for union types.
 * Accepts multiple type guards and creates a guard that passes if any of them pass.
 * This is equivalent to calling `guard.or(...guards)` on an existing `TypeGuard`.
 *
 * ---
 *
 * @template T - Array of types in the union
 *
 * @param guards - The type guards for each type in the union
 *
 * @returns A type guard that accepts any of the union types
 *
 * ---
 *
 * @example
 * type A = { a: number };
 * type B = { b: string };
 * type C = A | B;
 *
 * const isA = isType<A>({ a: isNumber });
 * const isB = isType<B>({ b: isString });
 *
 * const isC = isUnion(isA, isB); // or isA.or(isB)
 *
 * isC({ a: 1 }); // true
 * isC({ b: "hello" }); // true
 */
export const isUnion = <T extends readonly unknown[]>(
	...guards: TypeGuardTemplate<T>
): UnionTypeGuard<T> => {
	return new UnionTypeGuardClass<T>(guards);
};
