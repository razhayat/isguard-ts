import { Constructor, InstanceofTypeGuard } from "../isInstanceof";
import { TypeGuardClass } from "../types/internal";

export class InstanceofTypeGuardClass<T extends Constructor> extends TypeGuardClass<InstanceType<T>> implements InstanceofTypeGuard<T> {
	public readonly class: T;

	public constructor(classConstructor: T) {
		super();

		this.class = classConstructor;
	}

	protected is(value: unknown) {
		return value instanceof this.class;
	}
}
