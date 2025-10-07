import { SetTypeGuard } from ".";
import { TypeGuardClass } from "../internal";
import { TypeGuard } from "../types";

export class SetTypeGuardClass<T> extends TypeGuardClass<Set<T>> implements SetTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>
	) {
		super(value => {
			return value instanceof Set && [...value.values()].every(value => isValue(value));
		});
	}
}
