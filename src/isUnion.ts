import { TypeGuard, GuardedType } from "./types";
import { isValue } from "./isValue";

export const isUnion = <T extends TypeGuard<any>[]>(...guards: T): TypeGuard<GuardedType<T[number]>> => {
	return (value: unknown): value is GuardedType<T[number]> => {
		return guards.some(guard => guard(value));
	};
};

export const isValueUnion = <const T extends unknown[]>(...values: T): TypeGuard<T[number]> => {
	return isUnion(...values.map(value => isValue(value)));
};
