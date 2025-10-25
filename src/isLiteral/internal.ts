import { Literal, LiteralTypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class LiteralTypeGuardClass<T extends readonly Literal[]> extends TypeGuardClass<T[number]> implements LiteralTypeGuard<T> {
	public constructor(
		public readonly values: T,
	) {
		super();
	}

	protected is(value: unknown) {
		const unknownValues: readonly unknown[] = this.values;
		return unknownValues.includes(value);
	}

	protected toZod() {
		return this.values.length ? zod().literal(this.values) : zod().never();
	}
}
