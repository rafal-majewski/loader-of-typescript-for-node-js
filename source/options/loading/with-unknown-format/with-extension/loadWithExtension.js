import {
	loadCommonjsTypescript,
	loadModuleTypescript,
} from "../../TypeScript/index.js";
import {loadUnknownTypescript} from "./unknown-TypeScript/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/** @returns {LoadFnOutput} */
export function loadWithExtension(
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
	/** @type {string} */
	extensionOfUrl,
) {
	switch (extensionOfUrl) {
		case `cts`: {
			const output = loadCommonjsTypescript(url, context, nextLoad);
			return output;
		}
		case `mts`: {
			const output = loadModuleTypescript(url, context, nextLoad);
			return output;
		}
		case `ts`: {
			const output = loadUnknownTypescript(url, context, nextLoad);
			return output;
		}
		default: {
			const output = nextLoad(url, context);
			return output;
		}
	}
}
