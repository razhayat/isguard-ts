import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Literal = string | number | bigint | boolean | null | undefined;

export type LiteralTypeGuard<T extends readonly Literal[]> = TypeGuard<T[number]> & {
	values: T;
};

export const isLiteral = <const T extends readonly Literal[]>(...values: T): LiteralTypeGuard<T> => {
	return createTypeGuard<LiteralTypeGuard<T>>({
		func: value => {
			const unknownValues: readonly unknown[] = values;
			return unknownValues.includes(value);
		},
		values: values,
	});
};
