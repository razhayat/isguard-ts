import { TypeGuard } from "./types";

export const isRecursive = <T>(generator: (guard: TypeGuard<T>) => TypeGuard<T>): TypeGuard<T> => {
	const guard = (value: unknown): value is T => {
		return innerGuard(value);
	};

	const innerGuard = generator(guard);
	return guard;
};
