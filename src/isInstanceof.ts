import { TypeGuard } from "./types";

export type Constructor = abstract new (...args: any[]) => {};

export const isInstanceof = <T extends Constructor>(constructor: T): TypeGuard<InstanceType<T>> => {
	return (value: unknown): value is InstanceType<T> => {
		return value instanceof constructor;
	};
};
