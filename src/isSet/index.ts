import { TypeGuard } from "..";
import { SetTypeGuardClass } from "./internal";

export type SetTypeGuard<T> = TypeGuard<Set<T>> & {
	isValue: TypeGuard<T>;
};

export const isSet = <T>(isValue: TypeGuard<T>): SetTypeGuard<T> => {
	return new SetTypeGuardClass<T>(isValue);
};
