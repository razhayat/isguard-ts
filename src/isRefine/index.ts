import { TypeGuard } from "..";
import { RefineTypeGuardClass } from "./internal";

export type RefineTypeGuard<T, R extends T> = TypeGuard<R> & {
	isBase: TypeGuard<T>;
	refinement: (value: T) => value is R;
};

export const isRefine = <T, R extends T>(isBase: TypeGuard<T>, refinement: (value: T) => value is R): RefineTypeGuard<T, R> => {
	return new RefineTypeGuardClass<T, R>(isBase, refinement);
};
