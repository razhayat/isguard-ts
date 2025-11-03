import { TypeGuard } from "..";
import { InstanceofTypeGuardClass } from "./internal";

export type Constructor = abstract new (...args: any[]) => {};

export type InstanceofTypeGuard<T extends Constructor> = TypeGuard<InstanceType<T>> & {
	class: T;
};

export const isInstanceof = <T extends Constructor>(constructor: T): InstanceofTypeGuard<T> => {
	return new InstanceofTypeGuardClass<T>(constructor);
};
