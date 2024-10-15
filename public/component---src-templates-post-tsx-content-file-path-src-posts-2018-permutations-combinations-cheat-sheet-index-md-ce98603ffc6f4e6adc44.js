"use strict";(self.webpackChunktrekhleb_github_io=self.webpackChunktrekhleb_github_io||[]).push([[2210],{9664:function(e,A,t){t.r(A),t.d(A,{default:function(){return r}});var a=t(8453),n=t(6540);function o(e){const A=Object.assign({h2:"h2",a:"a",span:"span",p:"p",em:"em",blockquote:"blockquote",strong:"strong",ul:"ul",li:"li"},(0,a.RP)(),e.components);return n.createElement(n.Fragment,null,n.createElement(A.h2,{id:"tldr",style:{position:"relative"}},"TL;DR",n.createElement(A.a,{href:"#tldr","aria-label":"tldr permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.p,null,"This article briefly describes the difference between mathematical ",n.createElement(A.em,null,"permutations")," and ",n.createElement(A.em,null,"combinations"),", explains the main idea behind permutations and combinations algorithms and contains links to algorithms implementation in JavaScript."),"\n",n.createElement(A.blockquote,null,"\n",n.createElement(A.p,null,"JavaScript code examples may be found in ",n.createElement(A.a,{href:"https://github.com/trekhleb/javascript-algorithms"},"JavaScript Algorithms and Data Structures repository"),". Read more for further details."),"\n"),"\n",n.createElement(A.h2,{id:"what-are-combinations-and-permutations",style:{position:"relative"}},"What are Combinations and Permutations",n.createElement(A.a,{href:"#what-are-combinations-and-permutations","aria-label":"what are combinations and permutations permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.p,null,"Let’s say we have a ",n.createElement(A.strong,null,"collection")," or ",n.createElement(A.strong,null,"set")," of something (collection of numbers, letters, fruits, coins etc.), and we need to ",n.createElement(A.strong,null,"pick items")," from a collection to form another collection. For example imagine that you’re picking lottery numbers from the collection of available numbers (",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{0, 1, 2, 3, 4, 5, 6, 7, 8, 9} → {4, 5, 9}</code>'}}),"). Or you’re picking the fruits from collections of available fruits to make a fruit salad (",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{orange, apple, banana, grape} → {apple, banana}</code>'}}),"). Or you’re trying to guess the lock password, and you’re choosing 3 numbers out of ",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}</code>'}})," set to guess the correct password (",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{1, 1, 2}, {1, 1, 3}, {1, 1, 4}</code>'}}),", ...). In all these cases you’re creating one collection out from the other one by following some rules. These rules define whether your new collection is a ",n.createElement(A.strong,null,"permutation")," or a ",n.createElement(A.strong,null,"combination"),"."),"\n",n.createElement(A.p,null,"If the ",n.createElement(A.strong,null,"order")," of the elements in your new collection ",n.createElement(A.strong,null,"matters")," then you’re dealing with ",n.createElement(A.strong,null,"permutations")," (for example in case of lock password the set of ",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{1, 1, 2}</code>'}})," is not the same as set of ",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{2, 1, 1}</code>'}}),"). Otherwise, if the ",n.createElement(A.strong,null,"order doesn’t matter")," then you’re making a combination (combination of fruits ",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{apple, banana}</code>'}})," to make a salad — it doesn’t matter if you’ll pick apple or banana first)."),"\n",n.createElement(A.p,null,"Your new collection ",n.createElement(A.strong,null,"may or may not contain duplicates (or repetitions)"),". For example in lock password you’re allowed to use duplicate numbers but when you’re dealing with collection of race winners (",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<code class="language-text">{Black, Smith, Brown}</code>'}}),") you’re not allowed to make duplicates because it doesn’t make sense to have the same person to be on two winning positions."),"\n",n.createElement(A.p,null,"To illustrate all these differences I’ve created small cheat sheets to make it more easy to remember them."),"\n",n.createElement(A.h2,{id:"permutations-concept-cheat-sheet",style:{position:"relative"}},"Permutations Concept Cheat Sheet",n.createElement(A.a,{href:"#permutations-concept-cheat-sheet","aria-label":"permutations concept cheat sheet permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 880px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 108.80000000000001%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAWABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAe7NCoLAoP/EABcQAAMBAAAAAAAAAAAAAAAAAAAgMQH/2gAIAQEAAQUCpExP/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAwEBPwEf/8QAFBEBAAAAAAAAAAAAAAAAAAAAIP/aAAgBAgEBPwEf/8QAFBABAAAAAAAAAAAAAAAAAAAAMP/aAAgBAQAGPwIf/8QAHBAAAgICAwAAAAAAAAAAAAAAAAEQESExQVGx/9oACAEBAAE/IW1h4aiyclGkU+4//9oADAMBAAIAAwAAABBwxwD/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EB//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EB//xAAaEAEBAQEBAQEAAAAAAAAAAAABEQAhMWFB/9oACAEBAAE/ELBeWKvHBVK98XIAn7pBA7oiBO74TTtxRtD58wQ3/9k=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Permutations"\n        title=""\n        src="/static/d937250eee95bd245948ae4535b1f0d6/f84cf/02-permutations.jpg"\n        srcset="/static/d937250eee95bd245948ae4535b1f0d6/0479a/02-permutations.jpg 250w,\n/static/d937250eee95bd245948ae4535b1f0d6/41099/02-permutations.jpg 500w,\n/static/d937250eee95bd245948ae4535b1f0d6/f84cf/02-permutations.jpg 880w"\n        sizes="(max-width: 880px) 100vw, 880px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",n.createElement(A.h2,{id:"combinations-concept-cheat-sheet",style:{position:"relative"}},"Combinations Concept Cheat Sheet",n.createElement(A.a,{href:"#combinations-concept-cheat-sheet","aria-label":"combinations concept cheat sheet permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 880px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 108.80000000000001%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAWABQDASIAAhEBAxEB/8QAFwABAQEBAAAAAAAAAAAAAAAAAAECBf/EABQBAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhADEAAAAe7nYoICg//EABYQAAMAAAAAAAAAAAAAAAAAAAAwMf/aAAgBAQABBQIiP//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQMBAT8BH//EABQRAQAAAAAAAAAAAAAAAAAAACD/2gAIAQIBAT8BH//EABUQAQEAAAAAAAAAAAAAAAAAABEw/9oACAEBAAY/AiP/xAAaEAACAgMAAAAAAAAAAAAAAAABEQAxECFB/9oACAEBAAE/ISXA7ZMBdTsWqGFuIq8f/9oADAMBAAIAAwAAABDAyDz/xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAEDAQE/EB//xAAUEQEAAAAAAAAAAAAAAAAAAAAg/9oACAECAQE/EB//xAAaEAEBAQEBAQEAAAAAAAAAAAABEQAxIVFh/9oACAEBAAE/ECUKXyjzCKO+RTzAaqYJyfcfA/Mc9wqboQ03uOb/2Q==\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Combinations"\n        title=""\n        src="/static/f3c0838bc02c49d018fcb3976f3a5794/f84cf/03-combinations.jpg"\n        srcset="/static/f3c0838bc02c49d018fcb3976f3a5794/0479a/03-combinations.jpg 250w,\n/static/f3c0838bc02c49d018fcb3976f3a5794/41099/03-combinations.jpg 500w,\n/static/f3c0838bc02c49d018fcb3976f3a5794/f84cf/03-combinations.jpg 880w"\n        sizes="(max-width: 880px) 100vw, 880px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",n.createElement(A.h2,{id:"permutationscombinations-algorithms-cheat-sheet",style:{position:"relative"}},"Permutations/Combinations Algorithms Cheat Sheet",n.createElement(A.a,{href:"#permutationscombinations-algorithms-cheat-sheet","aria-label":"permutationscombinations algorithms cheat sheet permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.p,null,"If you would want to implement permutation and combination algorithms you might find the following permutation/combination algorithms cheat sheet useful."),"\n",n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<span\n      class="gatsby-resp-image-wrapper"\n      style="position: relative; display: block; margin-left: auto; margin-right: auto; max-width: 880px; "\n    >\n      <span\n    class="gatsby-resp-image-background-image"\n    style="padding-bottom: 70.8%; position: relative; bottom: 0; left: 0; background-image: url(\'data:image/jpeg;base64,/9j/2wBDABALDA4MChAODQ4SERATGCgaGBYWGDEjJR0oOjM9PDkzODdASFxOQERXRTc4UG1RV19iZ2hnPk1xeXBkeFxlZ2P/2wBDARESEhgVGC8aGi9jQjhCY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2NjY2P/wgARCAAOABQDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAAAAEF/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEAMQAAAB3VEUf//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEAAQUCX//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQMBAT8BP//EABQRAQAAAAAAAAAAAAAAAAAAABD/2gAIAQIBAT8BP//EABQQAQAAAAAAAAAAAAAAAAAAACD/2gAIAQEABj8CX//EABgQAAMBAQAAAAAAAAAAAAAAAAABERBh/9oACAEBAAE/IcvSEEj/2gAMAwEAAgADAAAAECvv/8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAwEBPxA//8QAFBEBAAAAAAAAAAAAAAAAAAAAEP/aAAgBAgEBPxA//8QAGxAAAwACAwAAAAAAAAAAAAAAAAExIUFxoeH/2gAIAQEAAT8Qr2OUSL0QuR4PowVn/9k=\'); background-size: cover; display: block;"\n  ></span>\n  <img\n        class="gatsby-resp-image-image"\n        alt="Algorithms Cheat Sheet"\n        title=""\n        src="/static/45e47234d87e36b44a7dee15af13be6d/f84cf/04.jpg"\n        srcset="/static/45e47234d87e36b44a7dee15af13be6d/0479a/04.jpg 250w,\n/static/45e47234d87e36b44a7dee15af13be6d/41099/04.jpg 500w,\n/static/45e47234d87e36b44a7dee15af13be6d/f84cf/04.jpg 880w"\n        sizes="(max-width: 880px) 100vw, 880px"\n        style="width:100%;height:100%;margin:0;vertical-align:middle;position:absolute;top:0;left:0;"\n        loading="lazy"\n        decoding="async"\n      />\n    </span>'}}),"\n",n.createElement(A.h2,{id:"combinations-and-permutations-in-javascript",style:{position:"relative"}},"Combinations and Permutations in JavaScript",n.createElement(A.a,{href:"#combinations-and-permutations-in-javascript","aria-label":"combinations and permutations in javascript permalink",className:"gatsby-remark-autolink-header-anchor after"},n.createElement(A.span,{dangerouslySetInnerHTML:{__html:'<svg aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg>'}}))),"\n",n.createElement(A.p,null,"If you want to see exact implementations of these algorithms in JavaScript you may find follow these links:"),"\n",n.createElement(A.ul,null,"\n",n.createElement(A.li,null,n.createElement(A.a,{href:"https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/combinations"},"Combinations in JavaScript")),"\n",n.createElement(A.li,null,n.createElement(A.a,{href:"https://github.com/trekhleb/javascript-algorithms/tree/master/src/algorithms/sets/permutations"},"Permutations in JavaScript")),"\n"),"\n",n.createElement(A.p,null,"I hope you’ll find these cheat sheets helpful, and they will help you to write combinations/permutations algorithms smoothly."),"\n",n.createElement(A.p,null,"Happy coding!"))}var i=function(e){void 0===e&&(e={});const{wrapper:A}=Object.assign({},(0,a.RP)(),e.components);return A?n.createElement(A,e,n.createElement(o,e)):o(e)},l=t(9713);const s=e=>{const{data:A,children:t}=e;return n.createElement(l.A,{post:A},t)};function r(e){return n.createElement(s,e,n.createElement(i,e))}}}]);
//# sourceMappingURL=component---src-templates-post-tsx-content-file-path-src-posts-2018-permutations-combinations-cheat-sheet-index-md-ce98603ffc6f4e6adc44.js.map