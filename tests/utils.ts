import { expect, it } from "vitest";
import { isBigint, isBoolean, isFunction, isNumber, isString, isSymbol, isUndefined, TypeGuard } from "../src";

export type DescribedGuardTestsProps<T> = {
	guard: TypeGuard<T>;
	equivalentGuards?: TypeGuard<T>[];
	description?: (input: string, result: boolean, guardIndex: number) => string;
	testCases: [input: unknown, result: boolean, stringifyInput?: string | ((input: unknown) => string)][];
};

export const guardTest = <T>(input: unknown, guard: TypeGuard<T>, result: boolean) => {
	return () => expect(guard(input)).toBe(result);
};

export const defaultDescription = (input: string, result: boolean, guardIndex: number) => {
	return `guard #${guardIndex + 1} should return ${result} for ${input}`;
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
	description = defaultDescription,
	testCases,
}: DescribedGuardTestsProps<T>) => {
	const guards = [guard, ...equivalentGuards];

	testCases.forEach(testCase => {
		const [input, result, testCaseStringifyInput = defaultStringifyInput] = testCase;
		const inputStr = isString(testCaseStringifyInput) ? testCaseStringifyInput : testCaseStringifyInput(input);

		guards.forEach((guard, guardIndex) => {
			it(description(inputStr, result, guardIndex), guardTest(input, guard, result));
		});
	});
};
