import { TypeGuard } from "./types";

export type TypeofResult = "string" | "number" | "bigint" | "boolean" | "symbol" | "undefined" | "object" | "function";

export const isTypeof = <T>(result: TypeofResult): TypeGuard<T> => {
	return (value: unknown): value is T => {
		return typeof value === result;
	};
};
