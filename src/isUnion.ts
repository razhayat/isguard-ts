import { TypeGuard, TypeGuardTemplate } from "./types";

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): TypeGuard<T[number]> => {
	return (value: unknown): value is T[number] => {
		return guards.some(guard => guard(value));
	};
};
