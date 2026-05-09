import { TypeGuard, TypeGuardTemplate } from "..";
import { UnionTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for union types (`A | B | C`).
 *
 * Returned by {@linkcode isUnion} and {@linkcode TypeGuard.or}.
 *
 * @template T - Array of types in the union
 */
export type UnionTypeGuard<T extends readonly unknown[]> = TypeGuard<T[number]> & {
	/** The array of type guards used in this union */
	guards: TypeGuardTemplate<T>;
};

/**
 * Creates a {@linkcode UnionTypeGuard} that checks that the value matches **any** of the provided type guards.
 *
 * **Best practice**:
 * use `satisfies` on the result of `isUnion` to ensure the result is of the expected union type.
 *
 * Can be shortened with {@linkcode TypeGuard.or}.
 *
 * @template T - Array of types in the union
 * @param guards - The type guards for each type in the union
 * @returns A type guard for the union of all the given type guards
 *
 * @example
 *
 * type A = { a: number };
 * type B = { b: string };
 * type C = A | B;
 *
 * const isA = isType<A>({ a: isNumber });
 * const isB = isType<B>({ b: isString });
 *
 * const isC = isUnion(isA, isB) satisfies TypeGuard<C>; // or isA.or(isB)
 *
 * isC({ a: 1 }); // true
 * isC({ b: "hello" }); // true
 * isC({ a: 1, b: "hello" }); // true
 * isC({}); // false
 */
export const isUnion = <T extends readonly unknown[]>(
	...guards: TypeGuardTemplate<T>
): UnionTypeGuard<T> => {
	return new UnionTypeGuardClass<T>(guards);
};
