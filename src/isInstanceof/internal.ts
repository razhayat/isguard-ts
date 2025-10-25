import { Constructor, InstanceofTypeGuard } from "..";
import { zod } from "../plugins/internal";
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

	protected toZod() {
		return zod().instanceof(this.class);
	}
}
