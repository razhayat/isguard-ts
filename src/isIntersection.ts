import { TypeGuard, TypeGuardTemplate } from "./types";

type TupleToIntersection<T extends readonly unknown[]> = {
	[K in keyof T]-?: (x: T[K]) => void;
} extends {
	[key: number]: (x: infer I) => void;
} ? I : never;

export const isIntersection = <T extends readonly unknown[]>(...guards: TypeGuardTemplate<T>): TypeGuard<TupleToIntersection<T>> => {
	return (value: unknown): value is TupleToIntersection<T> => {
		return guards.every(guard => guard(value));
	};
};
