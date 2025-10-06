import { TypeGuardClass } from "../internal";
import { LazyTypeGuard } from "../isLazy";
import { TypeGuard } from "../types";

export class LazyTypeGuardClass<T> extends TypeGuardClass<T> implements LazyTypeGuard<T> {
	public constructor(
		private readonly generator: () => TypeGuard<T>
	) {
		super(value => {
			return generator()(value);
		});
	}

	public unbox(): TypeGuard<T> {
		return this.generator();
	}
}
