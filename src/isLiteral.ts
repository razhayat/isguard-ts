import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export type Literal = string | number | bigint | boolean | null | undefined;

export const isLiteral = <const T extends readonly Literal[]>(...literals: T): TypeGuard<T[number]> => {
	return createTypeGuard((value: unknown): value is T[number] => {
		const unknownLiterals: readonly unknown[] = literals;
		return unknownLiterals.includes(value);
	});
};
