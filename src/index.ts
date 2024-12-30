import {
	transformerNotationDiff,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { authorizeRequest } from './auth';
import { processMarkdown } from './markdoc';
import { highlighter } from './shiki';

export default {
	// biome-ignore lint/correctness/noUnusedVariables:
	async fetch(request, env, ctx): Promise<Response> {
		if (!authorizeRequest(request, env)) {
			return new Response('Forbidden', {
				status: 403,
			});
		}
		let url = new URL(request.url);
		let body = await request.text();
		switch (url.pathname) {
			case '/':
				return new Response('Hello, World!');
			case '/markdoc': {
				let renderableTree = processMarkdown(body);
				let json = JSON.stringify(renderableTree);
				return new Response(json, {
					headers: { 'Content-Type': 'application/json; charset=utf-8' },
				});
			}
			case '/shiki': {
				let language = request.headers.get('shiki-language');
				let html = highlighter.codeToHtml(body, {
					lang: language ?? 'ts',
					theme: 'catppuccin-macchiato',
					transformers: [
						transformerNotationDiff(),
						transformerNotationHighlight(),
					],
				});
				return new Response(html, {
					headers: { 'Content-Type': 'text/html; charset=utf-8' },
				});
			}
			default:
				return new Response('Not Found', {
					status: 404,
				});
		}
	},
} satisfies ExportedHandler<Env>;
