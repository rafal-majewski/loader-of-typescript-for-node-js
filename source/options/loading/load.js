import {loadWithKnownFormat} from "./with-known-format/index.js";
import {loadWithUnknownFormat} from "./with-unknown-format/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/** @returns {LoadFnOutput} */
export function load(
	/** @type {string} */
	url,
	/** @type {LoadHookContext} */
	context,
	/** @type {NextLoad} */
	nextLoad,
) {
	if (typeof context.format === `string`) {
		const output = loadWithKnownFormat(url, context, nextLoad, context.format);
		return output;
	} else {
		const output = loadWithUnknownFormat(url, context, nextLoad);
		return output;
	}
}
