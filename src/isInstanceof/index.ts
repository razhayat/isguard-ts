import { InstanceofTypeGuardClass } from "./internal";
import { TypeGuard } from "../types";

export type Constructor = abstract new (...args: any[]) => {};

export type InstanceofTypeGuard<T extends Constructor> = TypeGuard<InstanceType<T>> & {
	class: T;
};

export const isInstanceof = <T extends Constructor>(constructor: T): InstanceofTypeGuard<T> => {
	return new InstanceofTypeGuardClass<T>(constructor);
};
