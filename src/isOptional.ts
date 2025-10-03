import { isLiteral } from "./isLiteral";
import { isUnion, UnionTypeGuard } from "./isUnion";
import { TypeGuard } from "./types";

export type OptionalTypeGuard<T> = UnionTypeGuard<[undefined, T]> & {
	isValue: TypeGuard<T>;
};

export const isOptional = <T>(isValue: TypeGuard<T>): OptionalTypeGuard<T> => {
	const base = isUnion(isLiteral(void 0), isValue);

	return Object.assign(base, {
		isValue: isValue,
	} satisfies Omit<OptionalTypeGuard<T>, keyof typeof base>);
};
