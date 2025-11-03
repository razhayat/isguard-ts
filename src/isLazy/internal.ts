import { LazyTypeGuard, TypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class LazyTypeGuardClass<T> extends TypeGuardClass<T> implements LazyTypeGuard<T> {
	private _guard: TypeGuard<T> | undefined;

	public constructor(
		private readonly _generator: () => TypeGuard<T>
	) {
		super();
	}

	protected is(value: unknown) {
		return this.unbox()(value);
	}

	protected toZod() {
		return zod().lazy(() => this.unbox().zod());
	}

	public unbox(): TypeGuard<T> {
		return this._guard ??= this._generator();
	}
}
