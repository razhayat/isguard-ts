import { SetTypeGuard, TypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class SetTypeGuardClass<T> extends TypeGuardClass<Set<T>> implements SetTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>
	) {
		super();
	}

	protected is(value: unknown) {
		return value instanceof Set && [...value.values()].every(value => this.isValue(value));
	}

	protected toZod() {
		return zod().set(this.isValue.zod());
	}
}
