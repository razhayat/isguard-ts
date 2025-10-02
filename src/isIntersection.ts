import { TypeGuard, TypeGuardTemplate } from "./types";
import { createTypeGuard } from "./internal";

type TupleToIntersection<T extends readonly unknown[]> = {
	[K in keyof T]-?: (x: T[K]) => void;
} extends {
	[key: number]: (x: infer I) => void;
} ? I : never;

export type IntersectionTypeGuard<T extends readonly unknown[]> = TypeGuard<TupleToIntersection<T>> & {
	guards: TypeGuardTemplate<T>;
};

export const isIntersection = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): IntersectionTypeGuard<T> => {
	return createTypeGuard<IntersectionTypeGuard<T>>({
		func: value => {
			return guards.every(guard => guard(value));
		},
		guards: guards,
	});
};
