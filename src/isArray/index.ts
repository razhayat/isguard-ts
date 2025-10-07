import { ArrayTypeGuardClass } from "./internal";
import { TypeGuard } from "../types";

export type ArrayTypeGuard<T> = TypeGuard<T[]> & {
	isValue: TypeGuard<T>;
};

export const isArray = <T>(isValue: TypeGuard<T>): ArrayTypeGuard<T> => {
	return new ArrayTypeGuardClass<T>(isValue);
};
