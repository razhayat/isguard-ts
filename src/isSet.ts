import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isSet = <T>(isValue: TypeGuard<T>): TypeGuard<Set<T>> => {
	return createTypeGuard<TypeGuard<Set<T>>>({
		func: value => {
			return value instanceof Set && [...value.values()].every(value => isValue(value));
		},
	});
};
