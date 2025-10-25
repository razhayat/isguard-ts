import { ZodType } from "zod";
import { TupleTypeGuard, TypeGuardTemplate } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class TupleTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<T> implements TupleTypeGuard<T> {
	public constructor(
		public readonly template: TypeGuardTemplate<T>
	) {
		super();
	}

	protected is(value: unknown) {
		return Array.isArray(value) && this.template.length >= value.length && this.template.every((guard, i) => guard(value[i]));
	}

	protected toZod() {
		return zod().tuple(this.template.map(guard => guard.zod()) as any) as unknown as ZodType<T>;
	}
}
