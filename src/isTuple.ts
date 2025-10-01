import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./internal";

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplate<T>): TypeGuard<T> => {
	return createTypeGuard<TypeGuard<T>>({
		func: value => {
			return Array.isArray(value) && template.length >= value.length && template.every((guard, i) => guard(value[i]));
		},
	});
};
