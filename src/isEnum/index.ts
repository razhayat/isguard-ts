import { TypeGuard } from "..";
import { EnumTypeGuardClass } from "./internal";

/**
 * Represents an enum object with string or number values.
 */
export type Enum = Readonly<Record<string, string | number>>;

/**
 * A {@linkcode TypeGuard} for enum values.
 *
 * Returned by {@linkcode isEnum}.
 *
 * @template T - The enum type to guard
 */
export type EnumTypeGuard<T extends Enum> = TypeGuard<T[keyof T]> & {
	/** The enum object used by this guard */
	enum: T;
};

/**
 * Creates an {@linkcode EnumTypeGuard} that checks that the value is a valid enum value.
 *
 * @template T - The enum type
 * @param enumObj - The enum object to create a guard for
 * @returns A type guard for values of `T` (`T[keyof T]`)
 *
 * @example
 *
 * enum Direction {
 *   up = 0,
 *   down = 1,
 *   left = 2,
 *   right = 3,
 * }
 *
 * const isDirection = isEnum(Direction);
 *
 * isDirection(Direction.up); // true
 * isDirection(2); // true
 * isDirection("hello"); // false
 */
export const isEnum = <T extends Enum>(enumObj: T): EnumTypeGuard<T> => {
	return new EnumTypeGuardClass<T>(enumObj);
};
