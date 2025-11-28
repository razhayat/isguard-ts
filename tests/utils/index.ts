import { expect, test } from "vitest";
import { defaultStringifyInput } from "./stringify";
import { TestCaseTuple, TypeGuardProp, TypeGuardTuple } from "./types";

export type DescribedGuardTestsProps<T> = {
	guard: TypeGuardProp<T>;
	equivalentGuards?: TypeGuardProp<NoInfer<T>>[];
	testCases: TestCaseTuple[];
};

export const describedGuardTests = <T>({
	guard,
	equivalentGuards = [],
	testCases,
}: DescribedGuardTestsProps<T>) => {
	const guardOptions = [guard, ...equivalentGuards].map<TypeGuardTuple<T>>(guard => typeof guard === "function" ? [guard] : guard);

	testCases.forEach((testCase, testCaseIndex) => {
		const [input, result, options = {}] = testCase;
		const {
			stringify = defaultStringifyInput,
			zod: testCaseZod,
		} = options;

		const inputStr = typeof stringify === "string" ? stringify : stringify(input);

		guardOptions.forEach(([guard], guardIndex) => {
			test(`case #${testCaseIndex + 1} - guard #${guardIndex + 1} should return ${result} for ${inputStr}`, () => {
				expect(guard(input)).toBe(result);
			});
		});

		guardOptions.forEach(([guard, guardOptions = {}], schemaIndex) => {
			const { zod = testCaseZod } = guardOptions;
			const zodResult = zod === "inverted" ? !result : result;

			test(`case #${testCaseIndex + 1} - zod schema #${schemaIndex + 1} should ${zod === "throws" ? "throw" : `return ${zodResult}`} for ${inputStr}`, () => {
				const testFunction = () => guard.zod().safeParse(input).success;
				zod === "throws" ? expect(testFunction).toThrow() : expect(testFunction()).toBe(zodResult);
			});
		});
	});
};
