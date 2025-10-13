import { TypeGuard, TypeGuardTemplate } from "..";
import { IntersectionTypeGuardClass, TupleToIntersection } from "./internal";

export type IntersectionTypeGuard<T extends readonly unknown[]> = TypeGuard<TupleToIntersection<T>> & {
	guards: TypeGuardTemplate<T>;
};

export const isIntersection = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): IntersectionTypeGuard<T> => {
	return new IntersectionTypeGuardClass<T>(guards);
};
