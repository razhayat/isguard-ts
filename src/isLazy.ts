import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type LazyTypeGuard<T> = TypeGuard<T> & {
	unbox: () => TypeGuard<T>;
};

export const isLazy = <T>(generator: () => TypeGuard<T>): LazyTypeGuard<T> => {
	return createTypeGuard<LazyTypeGuard<T>>({
		func: value => {
			return generator()(value);
		},
		unbox: generator,
	});
};

