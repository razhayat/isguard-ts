import { ZodType } from "zod";
import { IntersectionTypeGuard, TypeGuardTemplate } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export type TupleToIntersection<T extends readonly unknown[]> = {
	[K in keyof T]-?: (x: T[K]) => void;
} extends {
	[key: number]: (x: infer I) => void;
} ? I : never;

export class IntersectionTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<TupleToIntersection<T>> implements IntersectionTypeGuard<T> {
	public constructor(
		public readonly guards: TypeGuardTemplate<T>
	) {
		super();
	}

	protected is(value: unknown) {
		return this.guards.every(guard => guard(value));
	}

	protected toZod() {
		return this.guards.reduce<ZodType<TupleToIntersection<T>>>((acc, curr) => {
			return acc.and(curr.zod());
		}, zod().any());
	}
}
