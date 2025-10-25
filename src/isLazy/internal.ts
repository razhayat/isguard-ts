import { LazyTypeGuard, TypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class LazyTypeGuardClass<T> extends TypeGuardClass<T> implements LazyTypeGuard<T> {
	public constructor(
		private readonly generator: () => TypeGuard<T>
	) {
		super();
	}

	protected is(value: unknown) {
		return this.generator()(value);
	}

	protected toZod() {
		return zod().lazy(() => this.generator().zod());
	}

	public unbox(): TypeGuard<T> {
		return this.generator();
	}
}
