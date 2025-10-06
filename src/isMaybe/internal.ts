import { isLiteral } from "../isLiteral";
import { MaybeTypeGuard } from "../isMaybe";
import { UnionTypeGuardClass } from "../isUnion/internal";
import { TypeGuard } from "../types";

export class MaybeTypeGuardClass<T> extends UnionTypeGuardClass<[null, T]> implements MaybeTypeGuard<T> {
	public constructor(
		private readonly guard: TypeGuard<T>,
	) {
		super([isLiteral(null), guard]);
	}

	public unbox(): TypeGuard<T> {
		return this.guard;
	}
}
