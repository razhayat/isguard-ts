import { isLiteral } from "./isLiteral";
import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";

export const isMaybe = <T>(guard: TypeGuard<T>): TypeGuard<T | null> => {
	return isUnion(isLiteral(null), guard);
};
