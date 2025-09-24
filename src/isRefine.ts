import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export const isRefine = <T, R extends T>(guard: TypeGuard<T>, refinement: (value: T) => value is R): TypeGuard<R> => {
	return createTypeGuard((value: unknown): value is R => {
		return guard(value) && refinement(value);
	});
};
