import { TypeGuard } from "../types";
import { TypeGuardClass } from "../types/internal";

export class UnknownTypeGuardClass extends TypeGuardClass<unknown> implements TypeGuard<unknown> {
	public constructor() {
		super(() => true);
	}
}

export class NeverTypeGuardClass extends TypeGuardClass<never> implements TypeGuard<never> {
	public constructor() {
		super(() => false);
	}
}
