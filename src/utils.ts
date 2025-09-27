import { isArray } from "./isArray";
import { TypeGuard } from "./types";

export const createTypeGuard = <T>(func: (value: unknown) => value is T): TypeGuard<T> => {
	const guard: TypeGuard<T> = Object.assign(func, {
		array: () => isArray(guard),
	} satisfies Omit<TypeGuard<T>, keyof typeof func>);

	return guard;
};
