import {loadTypescript} from "../base/index.js";
/** @typedef {import("node:module").LoadFnOutput} LoadFnOutput */
/** @typedef {import("node:module").LoadHookContext} LoadHookContext */
/**
 * @typedef {(
 * 	urlInNextLoad: string,
 * 	contextInNextLoad?: Partial<LoadHookContext>,
 * ) => LoadFnOutput} NextLoad
 */
/**
 * @param {string} url
 * @param {LoadHookContext} context
 * @param {NextLoad} nextLoad
 * @returns {LoadFnOutput}
 */
export function loadModuleTypescript(url, context, nextLoad) {
	const output = loadTypescript(
		{output: `module`, reformattedContext: `module-typescript`},
		url,
		context,
		nextLoad,
	);
	return output;
}
