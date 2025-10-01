import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export const isRefine = <T, R extends T>(guard: TypeGuard<T>, refinement: (value: T) => value is R): TypeGuard<R> => {
	return createTypeGuard<TypeGuard<R>>({
		func: value => {
			return guard(value) && refinement(value);
		},
	});
};
