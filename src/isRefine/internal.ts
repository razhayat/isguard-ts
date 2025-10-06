import { RefineTypeGuard } from ".";
import { TypeGuardClass } from "../internal";
import { TypeGuard } from "../types";

export class RefineTypeGuardClass<T, R extends T> extends TypeGuardClass<R> implements RefineTypeGuard<T, R> {
	public constructor(
		public readonly isBase: TypeGuard<T>,
		public readonly refinement: (value: T) => value is R,
	) {
		super(value => {
			return isBase(value) && refinement(value);
		});
	}
}
