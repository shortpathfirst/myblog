'use client'
import React, { useEffect } from 'react'
// Using ES6 import syntax
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import typescript from 'highlight.js/lib/languages/typescript';
import { marked } from 'marked';
import 'highlight.js/styles/github.css'; // Import a light mode Highlight.js style


// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
hljs.registerLanguage('typescript', typescript);
const markdown = `
# Title
hello
  \`\`\`typescript
    const variable = 'hello';

    function getProfile(id: string): {
      name: string; address: string, photo: string
    } {
      return {
        name: 'ben', address: "ben's house", photo: "/ben.png"
      };
    }

  \`\`\`
`;


function SyntaxHighlightComp() {
    useEffect(() => {
        hljs.highlightAll();
    });
    return (
        <div >
        {/* Example with raw JS */}
        <pre>
          <code className="language-typescript">const variable = 'raw';</code>
        </pre>
  
        {/* Example with marked */}
        <div dangerouslySetInnerHTML={{ __html:marked(markdown) as string }}></div>
      </div>
    )
}

export default SyntaxHighlightComp