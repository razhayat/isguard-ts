import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isArray = <T>(guard: TypeGuard<T>): TypeGuard<T[]> => {
	return createTypeGuard((value: unknown): value is T[] => {
		return Array.isArray(value) && value.every(item => guard(item));
	});
};
