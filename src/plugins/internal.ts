const createZodPlugin = () => {
	try {
		const plugin: typeof import("zod") = require("zod");
		return () => plugin;
	}
	catch (error) {
		return () => {
			console.error("zod must be installed in order to use this feature");
			throw error;
		};
	}
};

export const zod = createZodPlugin();
