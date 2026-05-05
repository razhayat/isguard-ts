import { TypeGuard, TypeGuardTemplate } from "..";
import { TupleTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for tuple types.
 *
 * Returned by {@linkcode isTuple}.
 *
 * @template T - The tuple type to guard
 */
export type TupleTypeGuard<T extends readonly unknown[]> = TypeGuard<T> & {
	/** The template of type guards corresponding to each position in the tuple */
	template: TypeGuardTemplate<T>;
};

/**
 * Creates a {@linkcode TupleTypeGuard} that validates that the array has the exact length and types match at each position.
 *
 * **Best practice**:
 * pass the generic type argument into `isTuple` to avoid unexpected optional-field behavior.
 *
 * @template T - The tuple type to guard
 * @param template - An array of type guards corresponding to each position in the tuple
 * @returns A type guard for `T`
 *
 * @example
 *
 * type Row = [number, string?];
 * const isRow = isTuple<Row>([isNumber, isString.optional()]);
 *
 * isRow([6, "Hello"]); // true
 * isRow([6]); // true
 * isRow(["Hello", "Bye"]); // false
 */
export const isTuple = <T extends readonly unknown[]>(
	template: TypeGuardTemplate<T>,
): TupleTypeGuard<T> => {
	return new TupleTypeGuardClass<T>(template);
};
