import { UnionTypeGuard } from ".";
import { TypeGuardTemplate } from "../types";
import { TypeGuardClass } from "../types/internal";

export class UnionTypeGuardClass<T extends readonly unknown[]> extends TypeGuardClass<T[number]> implements UnionTypeGuard<T> {
	public constructor(
		public readonly guards: TypeGuardTemplate<T>,
	) {
		super(value => {
			return guards.some(guard => guard(value));
		});
	}
}
