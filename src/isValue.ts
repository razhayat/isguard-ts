import { TypeGuard } from "./types";

export const isValue = <const T>(value: T): TypeGuard<T> => {
	return (data: unknown): data is T => {
		return data === value;
	};
};
