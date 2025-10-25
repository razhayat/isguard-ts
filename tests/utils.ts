import { expect, test } from "vitest";
import { TypeGuard } from "../src";

export type TestCaseOptions = {
	stringify?: string | ((input: unknown) => string);
	invertZod?: boolean;
};

export type DescribedGuardTestsProps<T> = {
	guard: TypeGuard<T>;
	equivalentGuards?: TypeGuard<NoInfer<T>>[];
	testCases: [input: unknown, result: boolean, options?: TestCaseOptions][];
};

export const objectStringify = (input: object) => {
	const entries = Reflect.ownKeys(input).map(key => {
		return `${key.toString()}: ${defaultStringifyInput(Reflect.get(input, key))}`
	}).join(", ");

	if (!entries) {
		return "{}";
	}

	return `{ ${entries} }`;
};

export const constructorStringify = (constructor: Function, ...args: unknown[]) => {
	const argsStr = args.map(defaultStringifyInput).join(", ");
	return `new ${constructor.name}(${argsStr})`;
};

export const defaultStringifyInput = (input: unknown): string => {
	if (input === void 0) {
		return "undefined";
	}

	if (Array.isArray(input)) {
		const itemsStr = input.map(defaultStringifyInput).join(", ");
		return `[${itemsStr}]`;
	}

	if (typeof input === "number" || typeof input === "boolean" || typeof input === "symbol" || typeof input === "function") {
		return input.toString();
	}

	if (typeof input === "string") {
		return `"${input}"`;
	}

	if (typeof input === "bigint") {
		return `${input}n`;
	}

	if (input instanceof Object) {
		if (input.constructor.name === "Object") {
			return objectStringify(input);
		}

		return constructorStringify(input.constructor);
	}

	return JSON.stringify(input);
};

export const describedGuardTests = <T>({
	guard,
	equivalentGuards = [],
	testCases,
}: DescribedGuardTestsProps<T>) => {
	const guards = [guard, ...equivalentGuards];
	const zodSchemas = guards.map(guard => guard.zod());

	testCases.forEach((testCase, testCaseIndex) => {
		const [input, result, options = {}] = testCase;
		const {
			stringify = defaultStringifyInput,
			invertZod = false,
		} = options;

		const inputStr = typeof stringify === "string" ? stringify : stringify(input);

		guards.forEach((guard, guardIndex) => {
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
