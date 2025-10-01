import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Literal = string | number | bigint | boolean | null | undefined;

export const isLiteral = <const T extends readonly Literal[]>(...literals: T): TypeGuard<T[number]> => {
	return createTypeGuard<TypeGuard<T[number]>>({
		func: value => {
			const unknownLiterals: readonly unknown[] = literals;
			return unknownLiterals.includes(value);
		},
	});
};
