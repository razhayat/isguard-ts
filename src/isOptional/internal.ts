import { OptionalTypeGuard, TypeGuard, isUndefined } from "..";
import { UnionTypeGuardClass } from "../isUnion/internal";

export class OptionalTypeGuardClass<T> extends UnionTypeGuardClass<[undefined, T]> implements OptionalTypeGuard<T> {
	public constructor(
		private readonly guard: TypeGuard<T>,
	) {
		super([isUndefined, guard]);
	}

	public unbox(): TypeGuard<T> {
		return this.guard;
	}
}
