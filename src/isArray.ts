import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type ArrayTypeGuard<T> = TypeGuard<T[]> & {
	isValue: TypeGuard<T>;
};

export const isArray = <T>(isValue: TypeGuard<T>): ArrayTypeGuard<T> => {
	return createTypeGuard<ArrayTypeGuard<T>>({
		func: value => {
			return Array.isArray(value) && value.every(item => isValue(item));
		},
		isValue: isValue,
	});
};
