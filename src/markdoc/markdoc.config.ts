import Markdoc, { type Config, type Node } from '@markdoc/markdoc';
import {
	transformerNotationDiff,
	transformerNotationHighlight,
} from '@shikijs/transformers';
import { highlighter } from '../shiki';

export let config: Config = {
	nodes: {
		document: {
			// render markdoc document into html section
			render: 'section',
		},
		fence: {
			render: 'Codeblock',
			transform(node: Node) {
				let { content, language } = node.attributes;
				let html = highlighter.codeToHtml(content, {
					colorReplacements: {
						// improve accessibility (color contrast ratio)
						'#6e738d': '#939ab7',
					},
					lang: language,
					theme: 'catppuccin-macchiato',
					transformers: [
						transformerNotationDiff(),
						transformerNotationHighlight(),
					],
				});
				return new Markdoc.Tag('Codeblock', {
					...node.attributes,
					innerHtml: html,
				});
			},
		},
	},
	tags: {
		aside: {
			attributes: {
				children: {},
				type: {},
			},
			render: 'Aside',
		},
	},
};
