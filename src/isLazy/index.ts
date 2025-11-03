import { TypeGuard } from "..";
import { LazyTypeGuardClass } from "./internal";

export type LazyTypeGuard<T> = TypeGuard<T> & {
	unbox(): TypeGuard<T>;
};

export const isLazy = <T>(generator: () => TypeGuard<T>): LazyTypeGuard<T> => {
	return new LazyTypeGuardClass<T>(generator);
};
