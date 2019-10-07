/**
 * 	@SOW Code Highlighter
 * 	@version 	0.1.0
 *	@Author 	Dorin Grigoras www.stepofweb.com
 *
 *	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 * 	Originally developed for Smarty Template
 *	https://wrapbootstrap.com/theme/smarty-website-admin-rtl-WB02DSN1B
 *	++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
 *
 * 	@license MIT, Grigoras Dorin / www.stepofweb.com
 * 	@copyright 2019 www.stepofweb.com
 */
;(function() {
	'use strict';

	var _t, // this element!
		sowHL 				= document.getElementsByClassName("sow-hl"),
		regExpFinal 		= new RegExp(  "a(bstract|lias|lert|nd|rguments|rray|s(m|sert)?|uto)|ALTER"
										+ "|b(utton|ase|egin|ool(ean)?|reak|yte)"
										+ "|c(ase|atch|har|hr|hecked|lass|lone|ompl|onst|ontinue|onsole|reate)|CREATE"
										+ "|div|de(bugger|cimal|clare|f(ault|er)?|die|dump|init|l(egate|ete)?)|do|data|double|DEFAULT"
										+ "|e(cho|ls?if|lse(if)?|nd|nsure|num|vent|x(cept|ec|it|p(licit|ort)|te(nds|nsion|rn)))"
										+ "|f(ont|ace|allthrough|alse|inal(ly)?|ixed|loat|or(each)?|riend|rom|unc(tion)?)"
										+ "|global|goto|guard"
										+ "|i(nput|frame|mp(lements|licit|ort)|nit|nclude(_once)|nline?|s)|(^|\W)if($|\W)|(^|\W)i($|\W)|(^|\W)b($|\W)|(^|\W)in($|\W)"
										+ "|l(ambda|et|ength|og|ock|ong)"
										+ "|key|KEY"
										+ "|m(icrolight|odule|utable)"
										+ "|n(amespace|ative|ext|ew|il|ot|ull)|NaN|NOT|NULL"
										+ "|o(bject|perator|ut|verride)|(^|\W)or($|\W)" 
										+ "|p(arse|ackage|arams|rivate|rotected|rotocol|ublic)|PRIMARY"
										+ "|r(aise|e(adonly|do|f|gister|peat|quire(_once)?|scue|strict|try|turn))"
										+ "|s(ection|cript|pan|trong|tr(tolower|toupper|_replace|_ireplace)|byte|ealed|elf|hort|igned|izeof|tatic|tring|truct|ubscript|uper|ynchronized|witch|rc)"
										+ "|t(ype|able|extarea|emplate|hen|his|hrows?|ransient|rue|ry|ype(alias|def|id|name|of))|TABLE"
										+ "|u(n(checked|def(ined)?|ion|less|signed|til)|se|sing)|UNSIGNED"
										+ "|v(alue|alues|ar|irtual|oid|olatile)"
										+ "|w(char_t|hen|here|hile|ith)"
										+ "|xor"
										+ "|yield"
										// --

		),

		defaultDark 		= '.sow-hl.style-default-dark{display:block;overflow-x:auto;padding:1.5em;color:#abb2bf;background:#3e444e;border-radius:4px}.style-default-dark .sow-comment{color:#758390}.style-default-dark .sow-keyword{color:#689fca}.style-default-dark .sow-string{color:#98c379}.style-default-dark .sow-number{color:#d19a66}',
		defaultLight 		= '.sow-hl.style-default-light{display:block;overflow-x:auto;padding:1.5em;color:#333333;background:#fbfbfb;border-radius:4px}.style-default-light .sow-comment{color:#bcc2c7}.style-default-light .sow-keyword{color:#5b99bd}.style-default-light .sow-string{color:#67a23c}.style-default-light .sow-number{color:#CA6E18}';


	/**
	 *
	 *	Init this
	 *
	 *
	 **/
	function sowHL__init() {

		for (var i = 0; _t = sowHL[i++];) {

			var text  					= _t.textContent,
				curPos   				= 0,
				nextChar 				= text[0],
				curChar   				= 1,
				hasSpeialChars 			= false,
				classPrefix 			= _t.classList.contains('style-hljs') ? 'hljs-' : 'sow-',

				hlDark 					= _t.classList.contains('bg-dark') 			? true : false,
				hlDefaultBootstrap		= _t.classList.contains('style-bootstrap') 	? true : false,

				hlStyle 				= hlDefaultBootstrap === true ? [

														// DARK 			LIGHT
											hlDark ? 'text-white-50' 	: 'text-secondary', 	// 0: not formatted
											hlDark ? 'text-info' 		: 'text-primary', 		// 1: keyword required!
											hlDark ? 'text-white-50' 	: 'text-secondary', 	// 2: punctuation
											hlDark ? 'text-success' 	: 'text-success', 		// 3: strings and regexps
											hlDark ? 'text-secondary' 	: 'text-black-50', 		// 4: comments
											hlDark ? 'text-warning' 	: 'text-danger', 		// 5: number

							] : [

											classPrefix + 'noclass', 							// 0: not formatted
											classPrefix + 'keyword', 							// 1: keyword required!
											classPrefix + 'punctuation', 						// 2: punctuation
											classPrefix + 'string', 							// 3: strings and regexps
											classPrefix + 'comment', 							// 4: comments
											classPrefix + 'number', 							// 5: number
							],

				token = _t.innerHTML 	= '',		// current token content (and cleaning the node)
				prevChar, prevChar2,				// prevChar2 = the one before the previous
				multichar, node; 					// flag determining if token is multi-character

				// default style : dark
				if(_t.classList.contains('style-default-dark'))
					_t['appendChild'](node = document.createElement('style')).prepend(defaultDark);

				// default style : light
				else if(_t.classList.contains('style-default-light'))
					_t['appendChild'](node = document.createElement('style')).prepend(defaultLight);


				// -----------------------------------------------------------
				// CURRENT TOKEN TYPE:
				// 		0: anything else (whitespaces / newlines)
				// 		1: operator or brace
				// 		2: closing braces (after which '/' is division not regex)
				// 		3: (key)word
				// 		4: regex
				// 		5: string starting with "
				// 		6: string starting with '
				// 		7: string starting with `
				// 		8: xml comment  <!-- -->
				// 		9: multiline comment /* */
				// 		10: single-line comment starting with two slashes //
				// 		11: single-line comment starting with hash #
				// 		12: number
				// -----------------------------------------------------------
				var tokenTypeCurr = 0,
					tokenTypeLast; 	// kept to determine between regex and division



			// running through characters and highlighting
			// --
			// escaping if needed (with except for comments)
			// pervious character will not be therefore
			// recognized as a token finalize condition
			while (prevChar2 = prevChar, prevChar = tokenTypeCurr < 8 && prevChar == '\\' ? 1 : curChar) {

				curChar 		= nextChar;
				nextChar		= text[curPos++];
				multichar 		= token.length > 1;

				// skip duplicating first char
				if(curPos == 1 && curChar == nextChar)
					continue;

				// backslash fix
				if(curChar == "\\" && nextChar == '`') {
					curChar = curChar.replace(/\\/g, '\\ ');
					hasSpeialChars = true;
				}

				else if(curChar == "\\" && nextChar == "'") {
					curChar = curChar.replace(/\\/g, "\\ ");
					hasSpeialChars = true;
				}

				else if(curChar == '\\' && nextChar == '"') {
					curChar = curChar.replace(/\\/g, '\\ ');
					hasSpeialChars = true;
				}

				/* CLOSING TAGS! OPENINGS ARE DOWN BELOW **/
				// checking if current token should be finalized
				// types 9-10 (single-line comments) end with a newline
				if (!curChar || (tokenTypeCurr > 9 && curChar == '\n') || [ 

						// finalize conditions for other token types
						/\S/['test'](curChar), 										// 0: whitespaces :: merged together

						1,                											// 1: operators :: consist of a single character

						1, 															// 2: braces 	::	consist of a single character

						!/[$\w]/['test'](curChar), 									// 3: (key)word

						// (prevChar == '/' || prevChar == '\n') && multichar,			// 4: regex
						multichar,													// 4: regex
						
						prevChar == '"' && multichar,								// 5: string with "
						
						prevChar == "'" && multichar, 								// 6: string with '

						prevChar == '`' && multichar,								// 7: string with `
						
						text[curPos-4]+prevChar2+prevChar == '-->', 				// 8: xml comment

						prevChar2+prevChar == '*/',									// 9: multiline comment
																					// -- -- -- -- -- -- -- -- --
						curChar == '//',											// 10: single-line comment
						curChar == '#',												// 11: hash-style comment
																					// 12: number
																					// -- -- -- -- -- -- -- -- --
						function() {

							// number
							if(multichar && (!isNaN(parseFloat(curChar)) && isFinite(curChar)))
								return false;

							// decimal point
							else if((curChar == '.' || curChar == ',') && (!isNaN(parseFloat(prevChar)) && isFinite(prevChar)))
								return false;

							return 1;

						}()

					][tokenTypeCurr]
				) {
					// appending the token to the result
					if (token) {

						// remapping token type into class  (some types are highlighted similarly)
						_t['appendChild']( node = document.createElement('span') ).setAttribute('class', hlStyle[ 

							(!tokenTypeCurr) 							? 0 : 	// 0. not formatted
							// -- -- -- -- -- --
							(tokenTypeCurr > 7 && tokenTypeCurr < 12) 	? 4 : 	// 4. comments
							(tokenTypeCurr < 3) 						? 2 : 	// 2. punctuation (braces)
							(tokenTypeCurr > 4 && tokenTypeCurr < 8) 	? 3 : 	// 3: strings
							(tokenTypeCurr == 12) 						? 5 : 	// 4. number

							// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
							(tokenTypeCurr >  3) 	? 0 : 						// otherwise tokenTypeCurr == 3, (key)word
							// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
							// (key)word (1 if regexp matches, 0 otherwise)
							+  regExpFinal['test'](token)
							// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++

						]);


						// Append
						if(hasSpeialChars === true) {
							token = token.replace("\\ `", "\\`");
							token = token.replace("\\ '", "\\'");
							token = token.replace('\\ "', '\\"');
						}
						node['appendChild'](document.createTextNode(token));

					}


					// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --
					// saving the previous token type
					// (skipping whitespaces and comments)
					tokenTypeLast 	= (tokenTypeCurr && tokenTypeCurr < 8) ? tokenTypeCurr : tokenTypeLast;


					// initializing a new token
					token 			= '';

					// determining the new token type 
					// (going up the list until matching a token type start condition)
					tokenTypeCurr 	= 13; // params + 1
					// -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- -- --




					/* OPENING TAGS! CLOSING ARE ABOVE **/
					while (![

						1, 															//  0: whitespace

						/[\/{}[(\-+*=<>:;|\\.,?!&@~]/['test'](curChar), 			//  1: operator or braces
						/[\])]/['test'](curChar), 									//  2: closing brace
						/[$\w]/['test'](curChar), 									//  3: (key)word
						
						curChar == '/' 												//  4: regex
							&& (tokenTypeLast < 2) 	// previous token was an opening brace or an operator (otherwise division, not a regex)
							&& (prevChar != '<'), 	// workaround for xml closing tags

						curChar == '"', 											//  5: string with "
						curChar == "'", 											//  6: string with '
						curChar == "`", 											//  7: string with `
						curChar+nextChar+text[curPos+1]+text[curPos+1] == '<!--',	//  8: xml comment
						curChar+nextChar == '/*',	  								//  9: multiline comment
						curChar+nextChar == '//', 									//  10: single-line comment
						curChar == '#',												//  11: hash-style comment
						curChar && !isNaN(parseFloat(curChar)) && isFinite(curChar) //  12: number

					][--tokenTypeCurr]);
				}
	 
				token += curChar;
			}

		};

	}




	/**
	 *
	 *	Init this
	 *
	 *
	 **/
	if (document.readyState == 'complete') sowHL__init();
	else window.addEventListener('load', function() { sowHL__init() }, 0);

})();