import { SetTypeGuardClass } from "./internal";
import { TypeGuard } from "../types";

export type SetTypeGuard<T> = TypeGuard<Set<T>> & {
	isValue: TypeGuard<T>;
};

export const isSet = <T>(isValue: TypeGuard<T>): SetTypeGuard<T> => {
	return new SetTypeGuardClass<T>(isValue);
};
