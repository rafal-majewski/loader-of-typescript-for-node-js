import {
	loadCommonjsTypescript,
	loadModuleTypescript,
} from "../TypeScript/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/** @returns {LoadFnOutput} */
export function loadWithKnownFormat(
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
	/** @type {string} */
	formatOfContext,
) {
	switch (formatOfContext) {
		case `commonjs-typescript`: {
			const output = loadCommonjsTypescript(url, context, nextLoad);
			return output;
		}
		case `module-typescript`: {
			const output = loadModuleTypescript(url, context, nextLoad);
			return output;
		}
		default: {
			const output = nextLoad(url, context);
			return output;
		}
	}
}
