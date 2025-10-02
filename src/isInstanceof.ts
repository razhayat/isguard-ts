import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Constructor = abstract new (...args: any[]) => {};

export type InstanceofTypeGuard<T extends Constructor> = TypeGuard<InstanceType<T>> & {
	constructor: T;
};

export const isInstanceof = <T extends Constructor>(constructor: T): InstanceofTypeGuard<T> => {
	return createTypeGuard<InstanceofTypeGuard<T>>({
		func: value => {
			return value instanceof constructor;
		},
		constructor: constructor,
	});
};
