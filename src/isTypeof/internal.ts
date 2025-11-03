import { ZodType } from "zod";
import { TypeofResult, TypeByTypeOfResult, TypeofTypeGuard } from "..";
import { zod } from "../plugins/internal";
import { TypeGuardClass } from "../types/internal";

export class TypeofTypeGuardClass<T extends TypeofResult> extends TypeGuardClass<TypeByTypeOfResult[T]> implements TypeofTypeGuard<T> {
	public constructor(
		public readonly result: T,
	) {
		super();
	}

	protected is(value: unknown) {
		return typeof value === this.result;
	}

	protected toZod() {
		const z = zod();
		const zodGeneratorByResult: {
			[R in TypeofResult]: () => ZodType<TypeByTypeOfResult[R]>;
		} = {
			string: () => z.string(),
			number: () => z.number(),
			bigint: () => z.bigint(),
			boolean: () => z.boolean(),
			symbol: () => z.symbol(),
			undefined: () => z.undefined(),
			object: () => z.object({}).nullable(),
			function: () => z.function(),
		};

		return zodGeneratorByResult[this.result]();
	}
}
