import { isLiteral, Literal, LiteralTypeGuard } from "..";
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
		return this.values.length ? zod().union(this.values.map(value => zod().literal(value))) : zod().never();
	}

	public extract<V extends readonly T[number][]>(...values: V): LiteralTypeGuard<V> {
		return isLiteral(...values);
	}
}
