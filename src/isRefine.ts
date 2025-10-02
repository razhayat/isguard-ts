import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type RefineTypeGuard<T, R extends T> = TypeGuard<R> & {
	isBase: TypeGuard<T>;
	refinement: (value: T) => value is R;
};

export const isRefine = <T, R extends T>(isBase: TypeGuard<T>, refinement: (value: T) => value is R): RefineTypeGuard<T, R> => {
	return createTypeGuard<RefineTypeGuard<T, R>>({
		func: value => {
			return isBase(value) && refinement(value);
		},
		isBase: isBase,
		refinement: refinement,
	});
};
