import {load} from "./loading/index.js";
/** @typedef {import("node:module").RegisterHooksOptions} RegisterHooksOptions */
/** @satisfies {RegisterHooksOptions} */
export const optionsOfLoadingTypescriptHook = /** @type {const} */ ({
	load: load,
});
