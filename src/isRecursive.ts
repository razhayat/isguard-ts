import { TypeGuard } from "./types";

/**
 * @deprecated use `isLazy` instead
 */
export const isRecursive = <T>(generator: (guard: TypeGuard<T>) => TypeGuard<T>): TypeGuard<T> => {
	const guard: TypeGuard<T> = (value) => {
		return innerGuard(value);
	};

	const innerGuard = generator(guard);
	return guard;
};
