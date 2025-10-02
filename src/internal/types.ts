import { TypeGuard } from "../types";

export type AnyTypeGuard = TypeGuard<any, any> | TypeGuard<never>;
