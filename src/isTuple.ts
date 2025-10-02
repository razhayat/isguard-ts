import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./internal";

export type TupleTypeGuard<T extends readonly unknown[]> = TypeGuard<T> & {
	template: TypeGuardTemplate<T>;
};

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplate<T>): TupleTypeGuard<T> => {
	return createTypeGuard<TupleTypeGuard<T>>({
		func: value => {
			return Array.isArray(value) && template.length >= value.length && template.every((guard, i) => guard(value[i]));
		},
		template: template,
	});
};
