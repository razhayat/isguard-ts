import { TypeGuard } from "./types";

export const isRecursive = <T>(generator: (guard: TypeGuard<T>) => TypeGuard<T>): TypeGuard<T> => {
	const guard: TypeGuard<T> = (value: unknown) => {
		return innerGuard(value);
	};

	const innerGuard = generator(guard);
	return guard;
};
