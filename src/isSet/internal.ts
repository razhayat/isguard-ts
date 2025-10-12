import { SetTypeGuard } from ".";
import { TypeGuard } from "../types";
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
}
