import { TypeGuardClass } from "../internal";
import { Literal, LiteralTypeGuard } from "../isLiteral";

export class LiteralTypeGuardClass<T extends readonly Literal[]> extends TypeGuardClass<T[number]> implements LiteralTypeGuard<T> {
	public constructor(
		public readonly values: T,
	) {
		super(value => {
			const unknownValues: readonly unknown[] = values;
			return unknownValues.includes(value);
		});
	}
}
