import { TypeGuard } from "./types";

export type Constructor<T> = abstract new (...args: any[]) => T;

export const isInstanceof = <T>(constructor: Constructor<T>): TypeGuard<T> => {
	return (value: unknown): value is T => {
		return value instanceof constructor;
	};
};
