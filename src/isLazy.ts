import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isLazy = <T>(generator: () => TypeGuard<T>): TypeGuard<T> => {
	return createTypeGuard<TypeGuard<T>>({
		func: value => {
			return generator()(value);
		},
	});
};

