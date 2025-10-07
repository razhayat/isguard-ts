import { ArrayTypeGuard } from ".";
import { TypeGuardClass } from "../internal";
import { TypeGuard } from "../types";

export class ArrayTypeGuardClass<T> extends TypeGuardClass<T[]> implements ArrayTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>,
	) {
		super(value => {
			return Array.isArray(value) && value.every(item => isValue(item));
		});
	}
}
