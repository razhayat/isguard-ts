import { TypeGuard } from "../../src";

export type TypeGuardOptions = {
	zod?: "throws";
};

export type TypeGuardTuple<T> = [guard: TypeGuard<T>, options?: TypeGuardOptions];

export type TypeGuardProp<T> = TypeGuard<T> | TypeGuardTuple<T>;

export type TestCaseOptions = {
	stringify?: string | ((input: unknown) => string);
	zod?: "throws" | "inverted";
};
