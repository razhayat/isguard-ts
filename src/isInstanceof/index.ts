import { TypeGuard } from "..";
import { InstanceofTypeGuardClass } from "./internal";

/**
 * Represents a constructor function that can be used with `instanceof`.
 */
export type Constructor = abstract new (...args: any[]) => {};

/**
 * A {@linkcode TypeGuard} for `instanceof` checks.
 *
 * Returned by {@linkcode isInstanceof}.
 *
 * @template T - The constructor type
 */
export type InstanceofTypeGuard<T extends Constructor> = TypeGuard<InstanceType<T>> & {
	/** The constructor function used for `instanceof` checks */
	class: T;
};

/**
 * Creates an {@linkcode InstanceofTypeGuard} that checks that the value is an instance of the provided constructor.
 *
 * @template T - The constructor type
 * @param constructor - The class constructor to check instanceof against
 * @returns A type guard for instances of `T` (`InstanceType<T>`)
 *
 * @example
 *
 * abstract class Animal {}
 * class Dog extends Animal {}
 *
 * const isAnimal = isInstanceof(Animal);
 * const isDog = isInstanceof(Dog);
 *
 * isAnimal(new Dog()); // true
 * isDog(new Animal()); // false
 */
export const isInstanceof = <T extends Constructor>(constructor: T): InstanceofTypeGuard<T> => {
	return new InstanceofTypeGuardClass<T>(constructor);
};
