import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Enum = Record<string | number, string | number>;

export type EnumTypeGuard<T extends Enum> = TypeGuard<T[keyof T]> & {
	enum: T;
};

export const isEnum = <T extends Enum>(enumObj: T): EnumTypeGuard<T> => {
	const enumValues: unknown[] = getEnumValues(enumObj);
	return createTypeGuard<EnumTypeGuard<T>>({
		func: value => {
			return enumValues.includes(value);
		},
		enum: enumObj,
	});
};

const getEnumValues = (enumObj: Enum) => {
	const map = new Map(Object.entries(enumObj));
	Array.from(map.values()).forEach(value => {
		typeof value === "number" && map.delete(value.toString());
	});
	return Array.from(map.values());
};
