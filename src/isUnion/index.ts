import { TypeGuard, TypeGuardTemplate } from "../types";
import { UnionTypeGuardClass } from "./internal";

export type UnionTypeGuard<T extends readonly unknown[]> = TypeGuard<T[number]> & {
	guards: TypeGuardTemplate<T>;
};

export const isUnion = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): UnionTypeGuard<T> => {
	return new UnionTypeGuardClass<T>(guards);
};
