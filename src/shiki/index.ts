import { createHighlighterCore } from 'shiki/core';
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript';
// import { createOnigurumaEngine } from 'shiki/engine/oniguruma';
import tsx from 'shiki/langs/tsx.mjs';
import ts from 'shiki/langs/typescript.mjs';
import catppuccinMacchiato from 'shiki/themes/catppuccin-macchiato.mjs';

// // @ts-expect-error
// let engine = await createOnigurumaEngine(import('shiki/onig.wasm'));

let jsEngine = createJavaScriptRegexEngine();

export let highlighter = await createHighlighterCore({
	// engine,
	engine: jsEngine,
	langs: [ts, tsx],
	themes: [catppuccinMacchiato],
});
