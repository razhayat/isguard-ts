import { TypeGuard } from "..";
import { TypeofTypeGuardClass } from "./internal";

/**
 * Maps typeof result strings to their corresponding TypeScript types.
 */
export type TypeByTypeOfResult = {
	string: string;
	number: number;
	bigint: bigint;
	boolean: boolean;
	symbol: symbol;
	undefined: undefined;
	object: object | null;
	function: Function;
};

/**
 * Valid results from the `typeof` operator.
 */
export type TypeofResult = keyof TypeByTypeOfResult;

/**
 * A {@linkcode TypeGuard} that uses the `typeof` operator for validation.
 *
 * Returned by {@linkcode isTypeof}.
 *
 * @template T - The typeof result string
 */
export type TypeofTypeGuard<T extends TypeofResult> = TypeGuard<TypeByTypeOfResult[T]> & {
	/** The expected `typeof` result */
	result: T;
};

/**
 * Creates a {@linkcode TypeofTypeGuard} that uses the `typeof` operator for validation.
 *
 * @template T - The typeof result to check for
 * @param result - The expected typeof result
 * @returns A type guard that checks `typeof value === result`
 *
 * @example
 *
 * const isString = isTypeof("string");
 *
 * isString("hello"); // true
 * isString(123); // false
 */
export const isTypeof = <T extends TypeofResult>(result: T): TypeofTypeGuard<T> => {
	return new TypeofTypeGuardClass<T>(result);
};
