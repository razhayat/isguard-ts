import { TypeGuard } from "..";
import { LiteralTypeGuardClass } from "./internal";

export type Literal = string | number | bigint | boolean | null | undefined;

export type LiteralTypeGuard<T extends readonly Literal[]> = TypeGuard<T[number]> & {
	values: T;
};

export const isLiteral = <const T extends readonly Literal[]>(...values: T): LiteralTypeGuard<T> => {
	return new LiteralTypeGuardClass<T>(values);
};
