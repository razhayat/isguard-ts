import { isLiteral } from "../isLiteral";
import { OptionalTypeGuard } from "../isOptional";
import { UnionTypeGuardClass } from "../isUnion/internal";
import { TypeGuard } from "../types";

export class OptionalTypeGuardClass<T> extends UnionTypeGuardClass<[undefined, T]> implements OptionalTypeGuard<T> {
	public constructor(
		private readonly guard: TypeGuard<T>,
	) {
		super([isLiteral(void 0), guard]);
	}

	public unbox(): TypeGuard<T> {
		return this.guard;
	}
}
