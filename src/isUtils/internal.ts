import { TypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class UnknownTypeGuardClass extends TypeGuardClass<unknown> implements TypeGuard<unknown> {
	public constructor() {
		super();
	}

	protected is() {
		return true;
	}

	protected toZod() {
		return zod().unknown();
	}
}

export class NeverTypeGuardClass extends TypeGuardClass<never> implements TypeGuard<never> {
	public constructor() {
		super();
	}

	protected is() {
		return false;
	}

	protected toZod() {
		return zod().never();
	}
}
