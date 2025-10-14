import { UnionTypeGuard, TypeGuard } from "..";
import { MaybeTypeGuardClass } from "./internal";

export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	unbox(): TypeGuard<T>;
};

export const isMaybe = <T>(guard: TypeGuard<T>): MaybeTypeGuard<T> => {
	return new MaybeTypeGuardClass<T>(guard);
};
