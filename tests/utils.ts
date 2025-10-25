import { expect, test } from "vitest";
import { isBigint, isBoolean, isFunction, isNumber, isString, isSymbol, isUndefined, TypeGuard } from "../src";

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
	if (isUndefined(input)) {
		return "undefined";
	}

	if (Array.isArray(input)) {
		const itemsStr = input.map(defaultStringifyInput).join(", ");
		return `[${itemsStr}]`;
	}

	if (isNumber(input) || isBoolean(input) || isSymbol(input) || isFunction(input)) {
		return input.toString();
	}

	if (isString(input)) {
		return `"${input}"`;
	}

	if (isBigint(input)) {
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
	const zodGuards = guards.map(guard => guard.zod());

	testCases.forEach(testCase => {
		const [input, result, options = {}] = testCase;
		const {
			stringify = defaultStringifyInput,
			invertZod = false,
		} = options;

		const inputStr = isString(stringify) ? stringify : stringify(input);

		guards.forEach((guard, guardIndex) => {
			test(`guard #${guardIndex + 1} should return ${result} for ${inputStr}`, () => {
				expect(guard(input)).toBe(result);
			});
		});

		const zodResult = invertZod ? !result : result;
		zodGuards.forEach((guard, guardIndex) => {
			test(`zod schema #${guardIndex + 1} should return ${zodResult} for ${inputStr}`, () => {
				expect(guard.safeParse(input).success).toBe(zodResult);
			});
		});
	});
};
