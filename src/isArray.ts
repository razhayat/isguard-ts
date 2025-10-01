import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isArray = <T>(guard: TypeGuard<T>): TypeGuard<T[]> => {
	return createTypeGuard<TypeGuard<T[]>>({
		func: value => {
			return Array.isArray(value) && value.every(item => guard(item));
		},
	});
};
