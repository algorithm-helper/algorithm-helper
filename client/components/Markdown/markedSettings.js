import marked from 'marked';
import hljs from 'highlight.js';

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  const validLang = !!(language && hljs.getLanguage(language));
  const highlighted = validLang ? hljs.highlight(language, code).value : code;
  return `<pre><code class="hljs ${language}">${highlighted}</code></pre>`;
};

const settings = {
  renderer,
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
};

export default settings;
