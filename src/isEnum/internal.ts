import { Enum, EnumTypeGuard } from ".";
import { TypeGuardClass } from "../internal";

export class EnumTypeGuardClass<T extends Enum> extends TypeGuardClass<T[keyof T]> implements EnumTypeGuard<T> {
	public readonly enum: T;

	public constructor(
		enumObj: T
	) {
		super(value => {
			return enumValues.includes(value);
		});

		this.enum = enumObj;
		const enumValues: unknown[] = this.getEnumValues();
	}

	private getEnumValues() {
		const map = new Map(Object.entries(this.enum));

		Array.from(map.values()).forEach(value => {
			typeof value === "number" && map.delete(value.toString());
		});

		return Array.from(map.values());
	}
}
