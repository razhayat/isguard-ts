import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Constructor = abstract new (...args: any[]) => {};

export const isInstanceof = <T extends Constructor>(constructor: T): TypeGuard<InstanceType<T>> => {
	return createTypeGuard<TypeGuard<InstanceType<T>>>({
		func: value => {
			return value instanceof constructor;
		},
	});
};
