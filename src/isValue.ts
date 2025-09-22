import { TypeGuard } from "./types";

/**
 * @deprecated use `isLiteral` instead
 */
export const isValue = <const T>(value: T): TypeGuard<T> => {
	return (data: unknown): data is T => {
		return data === value;
	};
};

/**
 * @deprecated use `isLiteral` instead
 */
export const isValueUnion = <const T extends readonly unknown[]>(...values: T): TypeGuard<T[number]> => {
	return (value: unknown): value is T[number] => {
		return values.includes(value);
	};
};
