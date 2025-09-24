import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isSet = <T>(isValue: TypeGuard<T>): TypeGuard<Set<T>> => {
	return createTypeGuard((value: unknown): value is Set<T> => {
		return value instanceof Set && [...value.values()].every(value => isValue(value));
	});
};
