import { TypeGuard } from "./types";
import { createTypeGuard } from "./utils";

export type TypeByTypeOfResult = {
	string: string;
	number: number;
	bigint: bigint;
	boolean: boolean;
	symbol: symbol;
	undefined: undefined;
	object: object | null;
	function: Function;
};

export type TypeofResult = keyof TypeByTypeOfResult;

export const isTypeof = <T extends TypeofResult>(result: T): TypeGuard<TypeByTypeOfResult[T]> => {
	return createTypeGuard((value: unknown): value is TypeByTypeOfResult[T] => {
		return typeof value === result;
	});
};
