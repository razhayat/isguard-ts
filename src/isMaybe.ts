import { isLiteral } from "./isLiteral";
import { isUnion, UnionTypeGuard } from "./isUnion";
import { TypeGuard } from "./types";

export type MaybeTypeGuard<T> = UnionTypeGuard<[null, T]> & {
	unbox: () => TypeGuard<T>;
};

export const isMaybe = <T>(guard: TypeGuard<T>): MaybeTypeGuard<T> => {
	const base = isUnion(isLiteral(null), guard);

	return Object.assign(base, {
		unbox: () => guard,
	} satisfies Omit<MaybeTypeGuard<T>, keyof typeof base>);
};
