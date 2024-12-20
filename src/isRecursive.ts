import { TypeGuard } from "./types";

export const isRecursive = <T>(func: (guard: TypeGuard<T>) => TypeGuard<T>): TypeGuard<T> => {
	const guard = (value: unknown): value is T => {
		return innerGuard(value);
	};

	const innerGuard = func(guard);
	return guard;
};
