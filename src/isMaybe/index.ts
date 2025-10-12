import { MaybeTypeGuardClass } from "./internal";
import { UnionTypeGuard } from "../isUnion";
import { TypeGuard } from "../types";

export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	unbox(): TypeGuard<T>;
};

export const isMaybe = <T>(guard: TypeGuard<T>): MaybeTypeGuard<T> => {
	return new MaybeTypeGuardClass<T>(guard);
};
