import { TypeGuard, TypeGuardTemplate } from "..";
import { TypeTypeGuardClass } from "./internal";

/**
 * A {@linkcode TypeGuard} for object types. Provides additional methods for manipulating the type structure.
 *
 * Returned by {@linkcode isType}.
 *
 * @template T - The object type to guard
 */
export type TypeTypeGuard<T extends object> = TypeGuard<T> & {
	/** The template used to create this type guard */
	template: TypeGuardTemplate<T>;
	/** Creates a type guard for the partial version of `T` (all properties optional) */
	partial(): TypeTypeGuard<Partial<T>>;
	/** Creates a type guard for a subset of `T`'s properties */
	pick<const K extends readonly (keyof T)[]>(
		...keys: K
	): TypeTypeGuard<Pick<T, K[number]>>;
	/** Creates a type guard excluding specified properties from `T` */
	omit<const K extends readonly (keyof T)[]>(
		...keys: K
	): TypeTypeGuard<Omit<T, K[number]>>;
};

/**
 * Creates a {@linkcode TypeTypeGuard} for an object type based on a template of property type guards.
 * This is the primary function for creating type guards for interfaces and object types.
 *
 * @template T - The object type to create a guard for
 * @param template - An object where each property is a type guard for the corresponding property in `T`
 * @returns A type guard for `T`
 *
 * @example
 *
 * type Person = {
 *   name: string;
 *   age: number;
 * };
 *
 * const isPerson = isType<Person>({
 *   name: isString,
 *   age: isNumber,
 * });
 *
 * isPerson({ name: "Hello", age: 6 }); // true
 */
export const isType = <T extends object>(
	template: TypeGuardTemplate<T>,
): TypeTypeGuard<T> => {
	return new TypeTypeGuardClass<T>(template);
};
