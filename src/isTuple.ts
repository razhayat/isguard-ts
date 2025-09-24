import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./utils";

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplate<T>): TypeGuard<T> => {
	return createTypeGuard((value: unknown): value is T => {
		return Array.isArray(value) && template.length >= value.length && template.every((guard, i) => guard(value[i]));
	});
};
