import { TypeGuard } from "./types";

export const isValue = <const T extends readonly unknown[]>(...values: T): TypeGuard<T[number]> => {
	return (value: unknown): value is T => {
		return values.includes(value);
	};
};
