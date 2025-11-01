import { ArrayTypeGuard, TypeGuard } from "..";
import { TypeGuardClass } from "../types/internal";

export class ArrayTypeGuardClass<T> extends TypeGuardClass<T[]> implements ArrayTypeGuard<T> {
	public constructor(
		public readonly isValue: TypeGuard<T>,
	) {
		super();
	}

	protected is(value: unknown) {
		return Array.isArray(value) && [...value].every(item => this.isValue(item));
	}

	protected toZod() {
		return this.isValue.zod().array();
	}
}
