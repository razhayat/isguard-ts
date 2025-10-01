import { TypeGuard } from "./types";
import { createTypeGuard } from "./internal";

export type Enum = Record<string | number, string | number>;

const getEnumValues = (enumObj: Enum) => {
	const map = new Map(Object.entries(enumObj));
	Array.from(map.values()).forEach(value => {
		typeof value === "number" && map.delete(value.toString());
	});
	return Array.from(map.values());
};

export const isEnum = <T extends Enum>(enumObj: T): TypeGuard<T[keyof T]> => {
	const enumValues: unknown[] = getEnumValues(enumObj);
	return createTypeGuard<TypeGuard<T[keyof T]>>({
		func: value => {
			return enumValues.includes(value);
		},
	});
};
