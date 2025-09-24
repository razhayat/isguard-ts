import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./utils";

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): TypeGuard<T[number]> => {
	return createTypeGuard((value: unknown): value is T[number] => {
		return guards.some(guard => guard(value));
	});
};
