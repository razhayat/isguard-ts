import { ArrayTypeGuard } from ".";
import { TypeGuard } from "../types";
import { TypeGuardClass } from "../types/internal";

export class ArrayTypeGuardClass<T> extends TypeGuardClass<T[]> implements ArrayTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>,
	) {
		super(value => {
			return Array.isArray(value) && value.every(item => isValue(item));
		});
	}
}
