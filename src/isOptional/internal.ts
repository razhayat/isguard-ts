import { OptionalTypeGuard, TypeGuard, isLiteral } from "..";
import { UnionTypeGuardClass } from "../isUnion/internal";

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
