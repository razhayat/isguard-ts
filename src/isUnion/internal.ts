import { ZodType } from "zod";
import { UnionTypeGuard, TypeGuardTemplate } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class UnionTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<T[number]> implements UnionTypeGuard<T> {
	public constructor(
		public readonly guards: TypeGuardTemplate<T>,
	) {
		super();
	}

	protected is(value: unknown) {
		return this.guards.some(guard => guard(value));
	}

	protected toZod(): ZodType<T[number]> {
		return this.guards.length ? zod().union(this.guards.map(guard => guard.zod())) : zod().never();
	}
}
