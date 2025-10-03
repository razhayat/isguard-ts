import { isLiteral } from "./isLiteral";
import { isUnion, UnionTypeGuard } from "./isUnion";
import { TypeGuard } from "./types";

export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	isValue: TypeGuard<T>;
};

export const isMaybe = <T>(isValue: TypeGuard<T>): MaybeTypeGuard<T> => {
	const base = isUnion(isLiteral(null), isValue);

	return Object.assign(base, {
		isValue: isValue,
	} satisfies Omit<MaybeTypeGuard<T>, keyof typeof base>);
};
