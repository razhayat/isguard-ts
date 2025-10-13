import { TypeofResult, TypeByTypeOfResult, TypeofTypeGuard } from "..";
import { TypeGuardClass } from "../types/internal";

export class TypeofTypeGuardClass<T extends TypeofResult> extends TypeGuardClass<TypeByTypeOfResult[T]> implements TypeofTypeGuard<T> {
	public constructor(
		public readonly result: T,
	) {
		super();
	}

	protected is(value: unknown) {
		return typeof value === this.result;
	}
}
