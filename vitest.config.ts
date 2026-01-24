import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		typecheck: {
			enabled: true,
		},
		reporters: [
			[
				"default",
				{
					summary: false,
				},
			],
		],
		coverage: {
			enabled: true,
			provider: "v8",
			reporter: ["html", "text"],
		},
	},
});
