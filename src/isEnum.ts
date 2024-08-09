import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";
import { isNumber, isString } from "./utils";

export type Enum = Record<string | number, string | number>;

export const getEnumValues = (enumObj: Enum) => {
	const map = new Map(Object.entries(enumObj));
	Array.from(map.values()).forEach(value => {
		isNumber(value) && map.delete(value.toString());
	});
	return Array.from(map.values());
};

export const isEnum = <T extends Enum>(enumObj: T): TypeGuard<T> => {
	const enumValues = getEnumValues(enumObj);
	return (data: unknown): data is T => {
		return enumValues.some(v => v === data);
	};
};