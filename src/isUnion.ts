import { TypeGuard, TypeGuardTemplate } from "./types";
import { isValue } from "./isValue";

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): TypeGuard<T[number]> => {
	return (value: unknown): value is T[number] => {
		return guards.some(guard => guard(value));
	};
};

export const isValueUnion = <const T extends readonly unknown[]>(...values: T): TypeGuard<T[number]> => {
	return isUnion(...values.map(value => isValue(value)));
};
