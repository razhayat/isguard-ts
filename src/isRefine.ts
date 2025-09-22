import { TypeGuard } from "./types";

export const isRefine = <T, R extends T>(guard: TypeGuard<T>, refinement: (value: T) => value is R): TypeGuard<R> => {
	return (value: unknown): value is R => {
		return guard(value) && refinement(value);
	};
};
