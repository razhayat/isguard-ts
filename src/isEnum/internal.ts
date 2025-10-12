import { Enum, EnumTypeGuard } from ".";
import { TypeGuardClass } from "../types/internal";

export class EnumTypeGuardClass<T extends Enum> extends TypeGuardClass<T[keyof T]> implements EnumTypeGuard<T> {
	public readonly enum: T;
	private readonly _values: unknown[];

	public constructor(
		enumObj: T
	) {
		super();

		this.enum = enumObj;
		this._values = this.getEnumValues();
	}

	protected is(value: unknown) {
		return this._values.includes(value);
	}

	private getEnumValues() {
		const map = new Map(Object.entries(this.enum));

		Array.from(map.entries()).forEach(([key, value]) => {
			if (typeof value === "number" && map.get(value.toString()) === key) {
				map.delete(value.toString());
			}
		});

		return Array.from(map.values());
	}
}
