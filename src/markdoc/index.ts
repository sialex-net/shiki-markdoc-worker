import Markdoc, { type RenderableTreeNodes } from '@markdoc/markdoc';
import { config } from './markdoc.config';

export function processMarkdown(markdown: string): RenderableTreeNodes {
	let ast = Markdoc.parse(markdown);
	let renderableTree = Markdoc.transform(ast, config);
	return renderableTree;
}
