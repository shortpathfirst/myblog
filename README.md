1. Setting minheight in layout.tsx
2. Button 




1. Adding [Fonteawesome](https://docs.fontawesome.com/web/use-with/react)
```js
npm i --save @fortawesome/fontawesome-svg-core
//Free icons
npm i --save @fortawesome/free-solid-svg-icons
npm i --save @fortawesome/free-regular-svg-icons
npm i --save @fortawesome/free-brands-svg-icons
// React component
npm i --save @fortawesome/react-fontawesome@latest
```

2. Adding d3

```js
npm i d3
npm i @types/d3
```

3. Adding syntax highlither with marked parser
```js
npm i highlight.js marked
// Stylesin appjs file
import "highlight.js/styles/github.css"; 

// Using ES6 import syntax
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';

// Then register the languages you need
hljs.registerLanguage('javascript', javascript);
```
Add dom purifier for `marked` to prevent XSS attacks
```js
npm i dompurify
npm i @types/dompurify
```






## Getting Started
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
