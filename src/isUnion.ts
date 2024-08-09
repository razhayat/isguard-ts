import { TypeGuard, Guarded } from "./types";
import { isValue } from "./isValue";

export const isUnion = <T extends TypeGuard<any>[]>(...guards: T): TypeGuard<Guarded<T[number]>> => {
	return (value: unknown): value is Guarded<T[number]> => {
		return guards.some(guard => guard(value));
	};
};

export const isValueUnion = <const T extends unknown[]>(...values: T): TypeGuard<T[number]> => {
	return isUnion(...values.map(value => isValue(value)));
};
