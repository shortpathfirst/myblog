import { remark } from 'remark';
import html from 'remark-html';
import {rehype} from 'rehype';
import rehypeHighlight from 'rehype-highlight';

export default async function markdownToHtml(markdown: string) {
  const result = await remark()
    .use(html, { sanitize: false })
    .process(markdown);

  const processedHtml = rehype()
    .data('settings', { fragment: true })
    .use(rehypeHighlight)
    .processSync(result.value);

  return processedHtml.toString();
}
