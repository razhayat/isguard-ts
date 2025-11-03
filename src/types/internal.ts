import { TypeGuard } from "..";

export type AnyTypeGuard = TypeGuard<any, any> | TypeGuard<never>;

export * from "./typeGuardClass";
