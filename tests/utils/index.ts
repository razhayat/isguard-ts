import { expect, test } from "vitest";
import { TypeGuard } from "../../src";
import { defaultStringifyInput } from "./stringify";

export type TypeGuardOptions<T> = {
	guard: TypeGuard<T>;
	skipZod?: boolean;
};

export type TestCaseOptions = {
	stringify?: string | ((input: unknown) => string);
	invertZod?: boolean;
};

export type DescribedGuardTestsProps<T> = {
	guard: TypeGuard<T>;
	equivalentGuards?: (TypeGuard<NoInfer<T>> | TypeGuardOptions<NoInfer<T>>)[];
	testCases: [input: unknown, result: boolean, options?: TestCaseOptions][];
};

export const describedGuardTests = <T>({
	guard,
	equivalentGuards = [],
	testCases,
}: DescribedGuardTestsProps<T>) => {
	const guardOptions = [guard, ...equivalentGuards].map<TypeGuardOptions<T>>(guard => typeof guard === "function" ? { guard } : guard);
	const zodSchemas = guardOptions.filter(({ skipZod }) => !skipZod).map(({ guard }) => guard.zod());

	testCases.forEach((testCase, testCaseIndex) => {
		const [input, result, options = {}] = testCase;
		const {
			stringify = defaultStringifyInput,
			invertZod = false,
		} = options;

		const inputStr = typeof stringify === "string" ? stringify : stringify(input);

		guardOptions.forEach(({ guard }, guardIndex) => {
			test(`case #${testCaseIndex + 1} - guard #${guardIndex + 1} should return ${result} for ${inputStr}`, () => {
				expect(guard(input)).toBe(result);
			});
		});

		const zodResult = invertZod ? !result : result;
		zodSchemas.forEach((schema, schemaIndex) => {
			test(`case #${testCaseIndex + 1} - zod schema #${schemaIndex + 1} should return ${zodResult} for ${inputStr}`, () => {
				expect(schema.safeParse(input).success).toBe(zodResult);
			});
		});
	});
};
