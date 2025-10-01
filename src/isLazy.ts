import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isLazy = <T>(generator: () => TypeGuard<T>): TypeGuard<T> => {
	return createTypeGuard((value: unknown): value is T => {
		return generator()(value);
	});
};
