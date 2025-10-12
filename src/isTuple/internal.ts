import { TupleTypeGuard } from ".";
import { TypeGuardTemplate } from "../types";
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
}
