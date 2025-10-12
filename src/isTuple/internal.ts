import { TupleTypeGuard } from ".";
import { TypeGuardTemplate } from "../types";
import { TypeGuardClass } from "../types/internal";

export class TupleTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<T> implements TupleTypeGuard<T> {
	public constructor(
		public readonly template: TypeGuardTemplate<T>
	) {
		super(value => {
			return Array.isArray(value) && template.length >= value.length && template.every((guard, i) => guard(value[i]));
		});
	}
}
