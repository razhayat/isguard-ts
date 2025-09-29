import { isArray } from "./isArray";
import { isMaybe } from "./isMaybe";
import { isOptional } from "./isOptional";
import { isIndexRecord } from "./isRecord";
import { isRefine } from "./isRefine";
import { isSet } from "./isSet";
import { TypeGuard } from "./types";

export const createTypeGuard = <T>(func: (value: unknown) => value is T): TypeGuard<T> => {
	const guard: TypeGuard<T> = Object.assign(func, {
		optional: () => isOptional(guard),
		maybe: () => isMaybe(guard),
		array: () => isArray(guard),
		set: () => isSet(guard),
		indexRecord: () => isIndexRecord(guard),
		refine: refinement => isRefine(guard, refinement),
	} satisfies Omit<TypeGuard<T>, keyof typeof func>);

	return guard;
};
