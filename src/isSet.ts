import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type SetTypeGuard<T> = TypeGuard<Set<T>> & {
	isValue: TypeGuard<T>;
};

export const isSet = <T>(isValue: TypeGuard<T>): SetTypeGuard<T> => {
	return createTypeGuard<SetTypeGuard<T>>({
		func: value => {
			return value instanceof Set && [...value.values()].every(value => isValue(value));
		},
		isValue: isValue,
	});
};
