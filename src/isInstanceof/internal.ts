import { TypeGuardClass } from "../internal";
import { Constructor, InstanceofTypeGuard } from "../isInstanceof";

export class InstanceofTypeGuardClass<T extends Constructor> extends TypeGuardClass<InstanceType<T>> implements InstanceofTypeGuard<T> {
	public readonly class: T;

	public constructor(classConstructor: T) {
		super(value => {
			return value instanceof classConstructor;
		});

		this.class = classConstructor;
	}
}
