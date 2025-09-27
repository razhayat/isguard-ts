import { isLiteral } from "./isLiteral";
import { isUnion } from "./isUnion";
import { TypeGuard } from "./types";

export const isOptional = <T>(guard: TypeGuard<T>): TypeGuard<T | undefined> => {
	return isUnion(isLiteral(void 0), guard);
};
