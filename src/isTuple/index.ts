import { TupleTypeGuardClass } from "./internal";
import { TypeGuard, TypeGuardTemplate } from "../types";

export type TupleTypeGuard<T extends readonly unknown[]> = TypeGuard<T> & {
	template: TypeGuardTemplate<T>;
};

export const isTuple = <T extends readonly unknown[]>(template: TypeGuardTemplate<T>): TupleTypeGuard<T> => {
	return new TupleTypeGuardClass<T>(template);
};
