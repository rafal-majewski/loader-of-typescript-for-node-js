import {
	loadCommonjsTypescript,
	loadModuleTypescript,
} from "../../../TypeScript/index.js";
import {determineTypeOfModule} from "./determining-type-of-module/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/** @returns {LoadFnOutput} */
export function loadUnknownTypescript(
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
) {
	const typeOfModule = determineTypeOfModule(url);
	switch (typeOfModule) {
		case `commonjs`: {
			const output = loadCommonjsTypescript(url, context, nextLoad);
			return output;
		}
		case `module`: {
			const output = loadModuleTypescript(url, context, nextLoad);
			return output;
		}
	}
}
