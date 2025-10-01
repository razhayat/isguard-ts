import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./internal";

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): TypeGuard<T[number]> => {
	return createTypeGuard<TypeGuard<T[number]>>({
		func: value => {
			return guards.some(guard => guard(value));
		},
	});
};
