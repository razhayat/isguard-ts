import { UnionTypeGuard } from "../isUnion";
import { TypeGuard } from "../types";
import { OptionalTypeGuardClass } from "./internal";

export type OptionalTypeGuard<T> = UnionTypeGuard<[undefined, T]> & {
	unbox: () => TypeGuard<T>;
};

export const isOptional = <T>(guard: TypeGuard<T>): OptionalTypeGuard<T> => {
	return new OptionalTypeGuardClass<T>(guard);
};
