import { Literal, LiteralTypeGuard } from "../isLiteral";
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
}
