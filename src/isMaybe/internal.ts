import { isNull, MaybeTypeGuard, TypeGuard } from "..";
import { UnionTypeGuardClass } from "../isUnion/internal";

export class MaybeTypeGuardClass<T> extends UnionTypeGuardClass<[null, T]> implements MaybeTypeGuard<T> {
	public constructor(
		private readonly guard: TypeGuard<T>,
	) {
		super([isNull, guard]);
	}

	protected toZod() {
		return this.guard.zod().nullable();
	}

	public unbox(): TypeGuard<T> {
		return this.guard;
	}
}
