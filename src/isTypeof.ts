import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

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

export type TypeofTypeGuard<T extends TypeofResult> = TypeGuard<TypeByTypeOfResult[T]> & {
	result: T;
};

export const isTypeof = <T extends TypeofResult>(result: T): TypeofTypeGuard<T> => {
	return createTypeGuard<TypeofTypeGuard<T>>({
		func: value => {
			return typeof value === result;
		},
		result: result,
	});
};
