import { ZodType } from "zod";
import { RefineTypeGuard, TypeGuard } from "..";
import { TypeGuardClass } from "../types/internal";

export class RefineTypeGuardClass<T, R extends T> extends TypeGuardClass<R> implements RefineTypeGuard<T, R> {
	public constructor(
		public readonly isBase: TypeGuard<T>,
		public readonly refinement: (value: T) => value is R,
	) {
		super();
	}

	protected is(value: unknown) {
		return this.isBase(value) && this.refinement(value);
	}

	protected toZod() {
		return this.isBase.zod().refine(value => this.refinement(value)) as ZodType<R>;
	}
}
