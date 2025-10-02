import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./internal";

export type UnionTypeGuard<T extends readonly unknown[]> = TypeGuard<T[number]> & {
	guards: TypeGuardTemplate<T>;
};

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): UnionTypeGuard<T> => {
	return createTypeGuard<UnionTypeGuard<T>>({
		func: value => {
			return guards.some(guard => guard(value));
		},
		guards: guards,
	});
};
