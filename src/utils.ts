import { isArray } from "./isArray";
import { isOptional } from "./isOptional";
import { isSet } from "./isSet";
import { TypeGuard } from "./types";

export const createTypeGuard = <T>(func: (value: unknown) => value is T): TypeGuard<T> => {
	const guard: TypeGuard<T> = Object.assign(func, {
		optional: () => isOptional(guard),
		array: () => isArray(guard),
		set: () => isSet(guard),
	} satisfies Omit<TypeGuard<T>, keyof typeof func>);

	return guard;
};
