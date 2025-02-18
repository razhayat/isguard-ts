import { TypeGuard } from "./types";
import { isNumber } from "./isUtils";

export type Enum = Record<string | number, string | number>;

const getEnumValues = (enumObj: Enum) => {
	const map = new Map(Object.entries(enumObj));
	Array.from(map.values()).forEach(value => {
		isNumber(value) && map.delete(value.toString());
	});
	return Array.from(map.values());
};

export const isEnum = <T extends Enum>(enumObj: T): TypeGuard<T[keyof T]> => {
	const enumValues: unknown[] = getEnumValues(enumObj);
	return (value: unknown): value is T[keyof T] => {
		return enumValues.includes(value);
	};
};
