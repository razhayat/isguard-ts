import { isLiteral } from "./isLiteral";
import { isUnion, UnionTypeGuard } from "./isUnion";
import { TypeGuard } from "./types";

export type OptionalTypeGuard<T> = UnionTypeGuard<[undefined, T]> & {
	unbox: () => TypeGuard<T>;
};

export const isOptional = <T>(guard: TypeGuard<T>): OptionalTypeGuard<T> => {
	const base = isUnion(isLiteral(void 0), guard);

	return Object.assign(base, {
		unbox: () => guard,
	} satisfies Omit<OptionalTypeGuard<T>, keyof typeof base>);
};
