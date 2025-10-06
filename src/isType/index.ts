import { TypeGuard, TypeGuardTemplate } from "../types";
import { TypeTypeGuardClass } from "./internal";

export type TupleToObject<T extends readonly unknown[]> = Pick<T, Extract<keyof T, `${number}`>>;

export type IsTypeGuarded<T> = [T] extends [readonly unknown[]] ? TupleToObject<T> : T;

export type TypeTypeGuard<T extends object> = TypeGuard<IsTypeGuarded<T>> & {
	template: TypeGuardTemplate<T>;
	partial: () => TypeTypeGuard<Partial<T>>;
	pick: <const K extends readonly (keyof T)[]>(...keys: K) => TypeTypeGuard<Pick<T, K[number]>>;
	omit: <const K extends readonly (keyof T)[]>(...keys: K) => TypeTypeGuard<Omit<T, K[number]>>;
};

export const isType = <T extends object>(template: TypeGuardTemplate<T>): TypeTypeGuard<T> => {
	return new TypeTypeGuardClass(template);
};
