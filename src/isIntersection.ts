import { TypeGuard, Guarded } from "./types";

type UnionToIntersection<U> = (U extends U ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;

export const isIntersection = <const T extends TypeGuard<any>[]>(...guards: T): TypeGuard<UnionToIntersection<Guarded<T[number]>>> => {
	return (value: unknown): value is UnionToIntersection<Guarded<T[number]>> => {
		return guards.every(guard => guard(value));
	};
};
