import { TypeofResult, TypeByTypeOfResult, TypeofTypeGuard } from ".";
import { TypeGuardClass } from "../internal";

export class TypeofTypeGuardClass<T extends TypeofResult> extends TypeGuardClass<TypeByTypeOfResult[T]> implements TypeofTypeGuard<T> {
	public constructor(
		public readonly result: T,
	) {
		super(value => {
			return typeof value === result;
		});
	}
}
