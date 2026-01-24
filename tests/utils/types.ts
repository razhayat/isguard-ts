import { TypeGuard } from "../../src";

export type TypeGuardOptions = {
	zod?: "throws";
};

export type TypeGuardTuple<T> = [
	guard: TypeGuard<T>,
	options?: TypeGuardOptions,
];

export type TypeGuardProp<T> = TypeGuard<T> | TypeGuardTuple<T>;

export type TestCaseOptions<T> = {
	stringify?: string | ((input: T) => string);
	zod?: "throws" | "inverted";
};

export type TestCaseTuple<T = unknown> = [
	input: T,
	result: boolean,
	options?: TestCaseOptions<T>,
];
