import { TypeGuard } from "./types";

export const isSet = <T>(isValue: TypeGuard<T>): TypeGuard<Set<T>> => {
	return (value: unknown): value is Set<T> => {
		return value instanceof Set && [...value.values()].every(value => isValue(value));
	};
};
