import { UnionTypeGuard } from ".";
import { TypeGuardClass } from "../internal";
import { TypeGuardTemplate } from "../types";

export class UnionTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<T[number]> implements UnionTypeGuard<T> {
	public constructor(
		public readonly guards: TypeGuardTemplate<T>,
	) {
		super(value => {
			return guards.some(guard => guard(value));
		});
	}
}
