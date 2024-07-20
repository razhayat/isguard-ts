import { TypeGuard } from "./types";

export const isArray = <T>(guard: TypeGuard<T>): TypeGuard<T[]> => {
	return (value: unknown): value is T[] => {
		return Array.isArray(value) && value.every(item => guard(item));
	};
};
