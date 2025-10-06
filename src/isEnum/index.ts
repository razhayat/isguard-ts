import { TypeGuard } from "../types";
import { EnumTypeGuardClass } from "./internal";

export type Enum = Record<string | number, string | number>;

export type EnumTypeGuard<T extends Enum> = TypeGuard<T[keyof T]> & {
	enum: T;
};

export const isEnum = <T extends Enum>(enumObj: T): EnumTypeGuard<T> => {
	return new EnumTypeGuardClass<T>(enumObj);
};
