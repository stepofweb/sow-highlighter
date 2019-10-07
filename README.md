# Bootstrap Code Highlighter


* Lightweight
* 3.7Kb minified
* 1.9Kb gzipped


* Vanilla-js code! No jQuery or any dependency!
* No external CSS
* No javascript code initialization needed
* 4 ways of using it: bootstrap, default, custom css &amp; with an highlight.js CSS

SOW Highlighter is a tiny open-source library which improves readability of code snippets by highlighting any programming language, without addition of external js/css file!

(Initially written for [Smarty Template](https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B))

**The beauty**: can also be used with any highlight.js css file! So if you like a particular highlight.js style, use it! Cool, isn't it?

[Here is the demo!](http://stepofweb.github.io/sow-highlighter)

## How do I use it?
Include the script:
&lt;script src="dist/sow-highlighter.min.js">&lt;/script>


## 1. Bootstrap
1. Layout : White
&lt;pre>&lt;code class="sow-hl style-bootstrap bg-white">
  // code here
&lt;/code>&lt;/pre>

2. Layout : Light
&lt;pre>&lt;code class="sow-hl style-bootstrap bg-light">
  // code here
&lt;/code>&lt;/pre>

2. Layout : Dark
&lt;pre>&lt;code class="sow-hl style-bootstrap bg-dark">
  // code here
&lt;/code>&lt;/pre>


## 2. Default
1. Layout : Light
&lt;pre>&lt;code class="sow-hl style-default-light">
  // code here
&lt;/code>&lt;/pre>

2. Layout : Dark
&lt;pre>&lt;code class="sow-hl style-default-dark">
  // code here
&lt;/code>&lt;/pre>


## 3. Using highlight.js CSS
&lt;link rel="stylesheet" href="https://highlightjs.org/static/demo/styles/atom-one-dark.css">

&lt;pre>&lt;code class="sow-hl style-hljs hljs">
  // code here
&lt;/code>&lt;/pre>

## 4. Custom CSS
Only .sow-hl class is needed!

&lt;pre>&lt;code class="sow-hl sow-custom">
  // code here
&lt;/code>&lt;/pre>

The CSS classes you need to style yourself:
&lt;style>
.sow-hl.sow-custom {
	display: block;
	overflow-x: auto;
	padding: .5em;
	color: #abb2bf;
	background: #3e444e;
}

.sow-custom .sow-comment {
  color: #758390;
}

.sow-custom .sow-keyword {
	color: #689fca;
}

.sow-custom .sow-string {
	color: #98c379;
}

.sow-custom .sow-number {
	color: #d19a66;
}
&lt;/style>

### Quick FAQ

1. Can I use it without &lt;code> tag?
Sure, move the classes directly to &lt;pre>
2. Would you extend this script in the future?
In theory, yes! "Copy code" button will be added but will anyway be kept as lightweight as possible so fancy/complicated functions will never be added! Maybe as extensions (example: live code edit).
3. Would you maintain this script?
Yes, because is part of  [Smarty Template](https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B)) and also, is the code I use myself!

- inspired from microlight
