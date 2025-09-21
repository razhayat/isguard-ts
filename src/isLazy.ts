import { TypeGuard } from "./types";

export const isLazy = <T>(generator: () => TypeGuard<T>): TypeGuard<T> => {
	return (value: unknown): value is T => {
		return generator()(value);
	};
};
