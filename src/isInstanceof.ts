import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export type Constructor = abstract new (...args: any[]) => unknown;

export const isInstanceof = <T extends Constructor>(constructor: T): TypeGuard<InstanceType<T>> => {
	return createTypeGuard((value: unknown): value is InstanceType<T> => {
		return value instanceof constructor;
	});
};
