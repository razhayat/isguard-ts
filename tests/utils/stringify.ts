export const objectStringify = (input: object) => {
	const entries = Reflect.ownKeys(input)
		.map(key => {
			return `${key.toString()}: ${defaultStringifyInput(Reflect.get(input, key))}`;
		})
		.join(", ");

	if (!entries) {
		return "{}";
	}

	return `{ ${entries} }`;
};

export const constructorStringify = (
	constructor: Function,
	...args: unknown[]
) => {
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

	if (
		typeof input === "number" ||
		typeof input === "boolean" ||
		typeof input === "symbol" ||
		typeof input === "function"
	) {
		return input.toString();
	}

	if (typeof input === "string") {
		return `"${input}"`;
	}

	if (typeof input === "bigint") {
		return `${input}n`;
	}

	if (input instanceof Object) {
		if (input.constructor === Object) {
			return objectStringify(input);
		}

		return constructorStringify(input.constructor);
	}

	return JSON.stringify(input);
};
