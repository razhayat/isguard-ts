import { LazyTypeGuardClass } from "./internal";
import { TypeGuard } from "../types";

export type LazyTypeGuard<T> = TypeGuard<T> & {
	unbox: () => TypeGuard<T>;
};

export const isLazy = <T>(generator: () => TypeGuard<T>): LazyTypeGuard<T> => {
	return new LazyTypeGuardClass<T>(generator);
};
