/*!
 * jQuery JavaScript Library v3.3.1
 * https://jquery.com/
 *
 * Includes Sizzle.js
 * https://sizzlejs.com/
 *
 * Copyright JS Foundation and other contributors
 * Released under the MIT license
 * https://jquery.org/license
 *
 * Date: 2018-01-20T17:24Z
 */
( function( global, factory ) {

	"use strict";

	if ( typeof module === "object" && typeof module.exports === "object" ) {

		// For CommonJS and CommonJS-like environments where a proper `window`
		// is present, execute the factory and get jQuery.
		// For environments that do not have a `window` with a `document`
		// (such as Node.js), expose a factory as module.exports.
		// This accentuates the need for the creation of a real `window`.
		// e.g. var jQuery = require("jquery")(window);
		// See ticket #14549 for more info.
		module.exports = global.document ?
			factory( global, true ) :
			function( w ) {
				if ( !w.document ) {
					throw new Error( "jQuery requires a window with a document" );
				}
				return factory( w );
			};
	} else {
		factory( global );
	}

// Pass this if window is not defined yet
} )( typeof window !== "undefined" ? window : this, function( window, noGlobal ) {

// Edge <= 12 - 13+, Firefox <=18 - 45+, IE 10 - 11, Safari 5.1 - 9+, iOS 6 - 9.1
// throw exceptions when non-strict code (e.g., ASP.NET 4.5) accesses strict mode
// arguments.callee.caller (trac-13335). But as of jQuery 3.0 (2016), strict mode should be common
// enough that all such attempts are guarded in a try block.
"use strict";

var arr = [];

var document = window.document;

var getProto = Object.getPrototypeOf;

var slice = arr.slice;

var concat = arr.concat;

var push = arr.push;

var indexOf = arr.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var fnToString = hasOwn.toString;

var ObjectFunctionString = fnToString.call( Object );

var support = {};

var isFunction = function isFunction( obj ) {

      // Support: Chrome <=57, Firefox <=52
      // In some browsers, typeof returns "function" for HTML <object> elements
      // (i.e., `typeof document.createElement( "object" ) === "function"`).
      // We don't want to classify *any* DOM node as a function.
      return typeof obj === "function" && typeof obj.nodeType !== "number";
  };


var isWindow = function isWindow( obj ) {
		return obj != null && obj === obj.window;
	};




	var preservedScriptAttributes = {
		type: true,
		src: true,
		noModule: true
	};

	function DOMEval( code, doc, node ) {
		doc = doc || document;

		var i,
			script = doc.createElement( "script" );

		script.text = code;
		if ( node ) {
			for ( i in preservedScriptAttributes ) {
				if ( node[ i ] ) {
					script[ i ] = node[ i ];
				}
			}
		}
		doc.head.appendChild( script ).parentNode.removeChild( script );
	}


function toType( obj ) {
	if ( obj == null ) {
		return obj + "";
	}

	// Support: Android <=2.3 only (functionish RegExp)
	return typeof obj === "object" || typeof obj === "function" ?
		class2type[ toString.call( obj ) ] || "object" :
		typeof obj;
}
/* global Symbol */
// Defining this global in .eslintrc.json would create a danger of using the global
// unguarded in another place, it seems safer to define global only for this module



var
	version = "3.3.1",

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {

		// The jQuery object is actually just the init constructor 'enhanced'
		// Need init if jQuery is called (just allow error to be thrown if not included)
		return new jQuery.fn.init( selector, context );
	},

	// Support: Android <=4.0 only
	// Make sure we trim BOM and NBSP
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g;

jQuery.fn = jQuery.prototype = {

	// The current version of jQuery being used
	jquery: version,

	constructor: jQuery,

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {

		// Return all the elements in a clean array
		if ( num == null ) {
			return slice.call( this );
		}

		// Return just the one element from the set
		return num < 0 ? this[ num + this.length ] : this[ num ];
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	each: function( callback ) {
		return jQuery.each( this, callback );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map( this, function( elem, i ) {
			return callback.call( elem, i, elem );
		} ) );
	},

	slice: function() {
		return this.pushStack( slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[ j ] ] : [] );
	},

	end: function() {
		return this.prevObject || this.constructor();
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: push,
	sort: arr.sort,
	splice: arr.splice
};

jQuery.extend = jQuery.fn.extend = function() {
	var options, name, src, copy, copyIsArray, clone,
		target = arguments[ 0 ] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;

		// Skip the boolean and the target
		target = arguments[ i ] || {};
		i++;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !isFunction( target ) ) {
		target = {};
	}

	// Extend jQuery itself if only one argument is passed
	if ( i === length ) {
		target = this;
		i--;
	}

	for ( ; i < length; i++ ) {

		// Only deal with non-null/undefined values
		if ( ( options = arguments[ i ] ) != null ) {

			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
					( copyIsArray = Array.isArray( copy ) ) ) ) {

					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && Array.isArray( src ) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject( src ) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend( {

	// Unique for each copy of jQuery on the page
	expando: "jQuery" + ( version + Math.random() ).replace( /\D/g, "" ),

	// Assume jQuery is ready without the ready module
	isReady: true,

	error: function( msg ) {
		throw new Error( msg );
	},

	noop: function() {},

	isPlainObject: function( obj ) {
		var proto, Ctor;

		// Detect obvious negatives
		// Use toString instead of jQuery.type to catch host objects
		if ( !obj || toString.call( obj ) !== "[object Object]" ) {
			return false;
		}

		proto = getProto( obj );

		// Objects with no prototype (e.g., `Object.create( null )`) are plain
		if ( !proto ) {
			return true;
		}

		// Objects with prototype are plain iff they were constructed by a global Object function
		Ctor = hasOwn.call( proto, "constructor" ) && proto.constructor;
		return typeof Ctor === "function" && fnToString.call( Ctor ) === ObjectFunctionString;
	},

	isEmptyObject: function( obj ) {

		/* eslint-disable no-unused-vars */
		// See https://github.com/eslint/eslint/issues/6125
		var name;

		for ( name in obj ) {
			return false;
		}
		return true;
	},

	// Evaluates a script in a global context
	globalEval: function( code ) {
		DOMEval( code );
	},

	each: function( obj, callback ) {
		var length, i = 0;

		if ( isArrayLike( obj ) ) {
			length = obj.length;
			for ( ; i < length; i++ ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		} else {
			for ( i in obj ) {
				if ( callback.call( obj[ i ], i, obj[ i ] ) === false ) {
					break;
				}
			}
		}

		return obj;
	},

	// Support: Android <=4.0 only
	trim: function( text ) {
		return text == null ?
			"" :
			( text + "" ).replace( rtrim, "" );
	},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArrayLike( Object( arr ) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		return arr == null ? -1 : indexOf.call( arr, elem, i );
	},

	// Support: Android <=4.0 only, PhantomJS 1 only
	// push.apply(_, arraylike) throws on ancient WebKit
	merge: function( first, second ) {
		var len = +second.length,
			j = 0,
			i = first.length;

		for ( ; j < len; j++ ) {
			first[ i++ ] = second[ j ];
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, invert ) {
		var callbackInverse,
			matches = [],
			i = 0,
			length = elems.length,
			callbackExpect = !invert;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			callbackInverse = !callback( elems[ i ], i );
			if ( callbackInverse !== callbackExpect ) {
				matches.push( elems[ i ] );
			}
		}

		return matches;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var length, value,
			i = 0,
			ret = [];

		// Go through the array, translating each of the items to their new values
		if ( isArrayLike( elems ) ) {
			length = elems.length;
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret.push( value );
				}
			}
		}

		// Flatten any nested arrays
		return concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// jQuery.support is not used in Core but other projects attach their
	// properties to it so it needs to exist.
	support: support
} );

if ( typeof Symbol === "function" ) {
	jQuery.fn[ Symbol.iterator ] = arr[ Symbol.iterator ];
}

// Populate the class2type map
jQuery.each( "Boolean Number String Function Array Date RegExp Object Error Symbol".split( " " ),
function( i, name ) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
} );

function isArrayLike( obj ) {

	// Support: real iOS 8.2 only (not reproducible in simulator)
	// `in` check used to prevent JIT error (gh-2145)
	// hasOwn isn't used here due to false negatives
	// regarding Nodelist length in IE
	var length = !!obj && "length" in obj && obj.length,
		type = toType( obj );

	if ( isFunction( obj ) || isWindow( obj ) ) {
		return false;
	}

	return type === "array" || length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj;
}
var Sizzle =
/*!
 * Sizzle CSS Selector Engine v2.3.3
 * https://sizzlejs.com/
 *
 * Copyright jQuery Foundation and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2016-08-08
 */
(function( window ) {

var i,
	support,
	Expr,
	getText,
	isXML,
	tokenize,
	compile,
	select,
	outermostContext,
	sortInput,
	hasDuplicate,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + 1 * new Date(),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
		}
		return 0;
	},

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf as it's faster than native
	// https://jsperf.com/thor-indexof-vs-for/5
	indexOf = function( list, elem ) {
		var i = 0,
			len = list.length;
		for ( ; i < len; i++ ) {
			if ( list[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = "(?:\\\\.|[\\w-]|[^\0-\\xa0])+",

	// Attribute selectors: http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + identifier + ")(?:" + whitespace +
		// Operator (capture 2)
		"*([*^$|!~]?=)" + whitespace +
		// "Attribute values must be CSS identifiers [capture 5] or strings [capture 3 or capture 4]"
		"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + identifier + "))|)" + whitespace +
		"*\\]",

	pseudos = ":(" + identifier + ")(?:\\((" +
		// To reduce the number of selectors needing tokenize in the preFilter, prefer arguments:
		// 1. quoted (capture 3; capture 4 or capture 5)
		"('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|" +
		// 2. simple (capture 6)
		"((?:\\\\.|[^\\\\()[\\]]|" + attributes + ")*)|" +
		// 3. anything else (capture 2)
		".*" +
		")\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rwhitespace = new RegExp( whitespace + "+", "g" ),
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*?)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + identifier + ")" ),
		"CLASS": new RegExp( "^\\.(" + identifier + ")" ),
		"TAG": new RegExp( "^(" + identifier + "|[*])" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rsibling = /[+~]/,

	// CSS escapes
	// http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox<24
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			high < 0 ?
				// BMP codepoint
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	},

	// CSS string/identifier serialization
	// https://drafts.csswg.org/cssom/#common-serializing-idioms
	rcssescape = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
	fcssescape = function( ch, asCodePoint ) {
		if ( asCodePoint ) {

			// U+0000 NULL becomes U+FFFD REPLACEMENT CHARACTER
			if ( ch === "\0" ) {
				return "\uFFFD";
			}

			// Control characters and (dependent upon position) numbers get escaped as code points
			return ch.slice( 0, -1 ) + "\\" + ch.charCodeAt( ch.length - 1 ).toString( 16 ) + " ";
		}

		// Other potentially-special ASCII characters get backslash-escaped
		return "\\" + ch;
	},

	// Used for iframes
	// See setDocument()
	// Removing the function wrapper causes a "Permission Denied"
	// error in IE
	unloadHandler = function() {
		setDocument();
	},

	disabledAncestor = addCombinator(
		function( elem ) {
			return elem.disabled === true && ("form" in elem || "label" in elem);
		},
		{ dir: "parentNode", next: "legend" }
	);

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var m, i, elem, nid, match, groups, newSelector,
		newContext = context && context.ownerDocument,

		// nodeType defaults to 9, since context defaults to document
		nodeType = context ? context.nodeType : 9;

	results = results || [];

	// Return early from calls with invalid selector or context
	if ( typeof selector !== "string" || !selector ||
		nodeType !== 1 && nodeType !== 9 && nodeType !== 11 ) {

		return results;
	}

	// Try to shortcut find operations (as opposed to filters) in HTML documents
	if ( !seed ) {

		if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
			setDocument( context );
		}
		context = context || document;

		if ( documentIsHTML ) {

			// If the selector is sufficiently simple, try using a "get*By*" DOM method
			// (excepting DocumentFragment context, where the methods don't exist)
			if ( nodeType !== 11 && (match = rquickExpr.exec( selector )) ) {

				// ID selector
				if ( (m = match[1]) ) {

					// Document context
					if ( nodeType === 9 ) {
						if ( (elem = context.getElementById( m )) ) {

							// Support: IE, Opera, Webkit
							// TODO: identify versions
							// getElementById can match elements by name instead of ID
							if ( elem.id === m ) {
								results.push( elem );
								return results;
							}
						} else {
							return results;
						}

					// Element context
					} else {

						// Support: IE, Opera, Webkit
						// TODO: identify versions
						// getElementById can match elements by name instead of ID
						if ( newContext && (elem = newContext.getElementById( m )) &&
							contains( context, elem ) &&
							elem.id === m ) {

							results.push( elem );
							return results;
						}
					}

				// Type selector
				} else if ( match[2] ) {
					push.apply( results, context.getElementsByTagName( selector ) );
					return results;

				// Class selector
				} else if ( (m = match[3]) && support.getElementsByClassName &&
					context.getElementsByClassName ) {

					push.apply( results, context.getElementsByClassName( m ) );
					return results;
				}
			}

			// Take advantage of querySelectorAll
			if ( support.qsa &&
				!compilerCache[ selector + " " ] &&
				(!rbuggyQSA || !rbuggyQSA.test( selector )) ) {

				if ( nodeType !== 1 ) {
					newContext = context;
					newSelector = selector;

				// qSA looks outside Element context, which is not what we want
				// Thanks to Andrew Dupont for this workaround technique
				// Support: IE <=8
				// Exclude object elements
				} else if ( context.nodeName.toLowerCase() !== "object" ) {

					// Capture the context ID, setting it first if necessary
					if ( (nid = context.getAttribute( "id" )) ) {
						nid = nid.replace( rcssescape, fcssescape );
					} else {
						context.setAttribute( "id", (nid = expando) );
					}

					// Prefix every selector in the list
					groups = tokenize( selector );
					i = groups.length;
					while ( i-- ) {
						groups[i] = "#" + nid + " " + toSelector( groups[i] );
					}
					newSelector = groups.join( "," );

					// Expand context for sibling selectors
					newContext = rsibling.test( selector ) && testContext( context.parentNode ) ||
						context;
				}

				if ( newSelector ) {
					try {
						push.apply( results,
							newContext.querySelectorAll( newSelector )
						);
						return results;
					} catch ( qsaError ) {
					} finally {
						if ( nid === expando ) {
							context.removeAttribute( "id" );
						}
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {function(string, object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key + " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key + " " ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created element and returns a boolean result
 */
function assert( fn ) {
	var el = document.createElement("fieldset");

	try {
		return !!fn( el );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( el.parentNode ) {
			el.parentNode.removeChild( el );
		}
		// release memory in IE
		el = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = arr.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			a.sourceIndex - b.sourceIndex;

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for :enabled/:disabled
 * @param {Boolean} disabled true for :disabled; false for :enabled
 */
function createDisabledPseudo( disabled ) {

	// Known :disabled false positives: fieldset[disabled] > legend:nth-of-type(n+2) :can-disable
	return function( elem ) {

		// Only certain elements can match :enabled or :disabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-enabled
		// https://html.spec.whatwg.org/multipage/scripting.html#selector-disabled
		if ( "form" in elem ) {

			// Check for inherited disabledness on relevant non-disabled elements:
			// * listed form-associated elements in a disabled fieldset
			//   https://html.spec.whatwg.org/multipage/forms.html#category-listed
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-fe-disabled
			// * option elements in a disabled optgroup
			//   https://html.spec.whatwg.org/multipage/forms.html#concept-option-disabled
			// All such elements have a "form" property.
			if ( elem.parentNode && elem.disabled === false ) {

				// Option elements defer to a parent optgroup if present
				if ( "label" in elem ) {
					if ( "label" in elem.parentNode ) {
						return elem.parentNode.disabled === disabled;
					} else {
						return elem.disabled === disabled;
					}
				}

				// Support: IE 6 - 11
				// Use the isDisabled shortcut property to check for disabled fieldset ancestors
				return elem.isDisabled === disabled ||

					// Where there is no isDisabled, check manually
					/* jshint -W018 */
					elem.isDisabled !== !disabled &&
						disabledAncestor( elem ) === disabled;
			}

			return elem.disabled === disabled;

		// Try to winnow out elements that can't be disabled before trusting the disabled property.
		// Some victims get caught in our net (label, legend, menu, track), but it shouldn't
		// even exist on them, let alone have a boolean value.
		} else if ( "label" in elem ) {
			return elem.disabled === disabled;
		}

		// Remaining elements are neither :enabled nor :disabled
		return false;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Checks a node for validity as a Sizzle context
 * @param {Element|Object=} context
 * @returns {Element|Object|Boolean} The input node if acceptable, otherwise a falsy value
 */
function testContext( context ) {
	return context && typeof context.getElementsByTagName !== "undefined" && context;
}

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Detects XML nodes
 * @param {Element|Object} elem An element or a document
 * @returns {Boolean} True iff elem is a non-HTML XML node
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var hasCompare, subWindow,
		doc = node ? node.ownerDocument || node : preferredDoc;

	// Return early if doc is invalid or already selected
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Update global variables
	document = doc;
	docElem = document.documentElement;
	documentIsHTML = !isXML( document );

	// Support: IE 9-11, Edge
	// Accessing iframe documents after unload throws "permission denied" errors (jQuery #13936)
	if ( preferredDoc !== document &&
		(subWindow = document.defaultView) && subWindow.top !== subWindow ) {

		// Support: IE 11, Edge
		if ( subWindow.addEventListener ) {
			subWindow.addEventListener( "unload", unloadHandler, false );

		// Support: IE 9 - 10 only
		} else if ( subWindow.attachEvent ) {
			subWindow.attachEvent( "onunload", unloadHandler );
		}
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties
	// (excepting IE8 booleans)
	support.attributes = assert(function( el ) {
		el.className = "i";
		return !el.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( el ) {
		el.appendChild( document.createComment("") );
		return !el.getElementsByTagName("*").length;
	});

	// Support: IE<9
	support.getElementsByClassName = rnative.test( document.getElementsByClassName );

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programmatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( el ) {
		docElem.appendChild( el ).id = expando;
		return !document.getElementsByName || !document.getElementsByName( expando ).length;
	});

	// ID filter and find
	if ( support.getById ) {
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var elem = context.getElementById( id );
				return elem ? [ elem ] : [];
			}
		};
	} else {
		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== "undefined" &&
					elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};

		// Support: IE 6 - 7 only
		// getElementById is not reliable as a find shortcut
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== "undefined" && documentIsHTML ) {
				var node, i, elems,
					elem = context.getElementById( id );

				if ( elem ) {

					// Verify the id attribute
					node = elem.getAttributeNode("id");
					if ( node && node.value === id ) {
						return [ elem ];
					}

					// Fall back on getElementsByName
					elems = context.getElementsByName( id );
					i = 0;
					while ( (elem = elems[i++]) ) {
						node = elem.getAttributeNode("id");
						if ( node && node.value === id ) {
							return [ elem ];
						}
					}
				}

				return [];
			}
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== "undefined" ) {
				return context.getElementsByTagName( tag );

			// DocumentFragment nodes don't have gEBTN
			} else if ( support.qsa ) {
				return context.querySelectorAll( tag );
			}
		} :

		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				// By happy coincidence, a (broken) gEBTN appears on DocumentFragment nodes too
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== "undefined" && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See https://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( document.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( el ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// https://bugs.jquery.com/ticket/12359
			docElem.appendChild( el ).innerHTML = "<a id='" + expando + "'></a>" +
				"<select id='" + expando + "-\r\\' msallowcapture=''>" +
				"<option selected=''></option></select>";

			// Support: IE8, Opera 11-12.16
			// Nothing should be selected when empty strings follow ^= or $= or *=
			// The test attribute must be unknown in Opera but "safe" for WinRT
			// https://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if ( el.querySelectorAll("[msallowcapture^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !el.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Support: Chrome<29, Android<4.4, Safari<7.0+, iOS<7.0+, PhantomJS<1.9.8+
			if ( !el.querySelectorAll( "[id~=" + expando + "-]" ).length ) {
				rbuggyQSA.push("~=");
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !el.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}

			// Support: Safari 8+, iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			// In-page `selector#id sibling-combinator selector` fails
			if ( !el.querySelectorAll( "a#" + expando + "+*" ).length ) {
				rbuggyQSA.push(".#.+[+~]");
			}
		});

		assert(function( el ) {
			el.innerHTML = "<a href='' disabled='disabled'></a>" +
				"<select disabled='disabled'><option/></select>";

			// Support: Windows 8 Native Apps
			// The type and name attributes are restricted during .innerHTML assignment
			var input = document.createElement("input");
			input.setAttribute( "type", "hidden" );
			el.appendChild( input ).setAttribute( "name", "D" );

			// Support: IE8
			// Enforce case-sensitivity of name attribute
			if ( el.querySelectorAll("[name=d]").length ) {
				rbuggyQSA.push( "name" + whitespace + "*[*^$|!~]?=" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( el.querySelectorAll(":enabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Support: IE9-11+
			// IE's :disabled selector does not pick up the children of disabled fieldsets
			docElem.appendChild( el ).disabled = true;
			if ( el.querySelectorAll(":disabled").length !== 2 ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			el.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( el ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( el, "*" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( el, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */
	hasCompare = rnative.test( docElem.compareDocumentPosition );

	// Element contains another
	// Purposefully self-exclusive
	// As in, an element does not contain itself
	contains = hasCompare || rnative.test( docElem.contains ) ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = hasCompare ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		// Sort on method existence if only one input has compareDocumentPosition
		var compare = !a.compareDocumentPosition - !b.compareDocumentPosition;
		if ( compare ) {
			return compare;
		}

		// Calculate position if both inputs belong to the same document
		compare = ( a.ownerDocument || a ) === ( b.ownerDocument || b ) ?
			a.compareDocumentPosition( b ) :

			// Otherwise we know they are disconnected
			1;

		// Disconnected nodes
		if ( compare & 1 ||
			(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

			// Choose the first element that is related to our preferred document
			if ( a === document || a.ownerDocument === preferredDoc && contains(preferredDoc, a) ) {
				return -1;
			}
			if ( b === document || b.ownerDocument === preferredDoc && contains(preferredDoc, b) ) {
				return 1;
			}

			// Maintain original order
			return sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;
		}

		return compare & 4 ? -1 : 1;
	} :
	function( a, b ) {
		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Parentless nodes are either documents or disconnected
		if ( !aup || !bup ) {
			return a === document ? -1 :
				b === document ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf( sortInput, a ) - indexOf( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return document;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		!compilerCache[ expr + " " ] &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch (e) {}
	}

	return Sizzle( expr, document, null, [ elem ] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val !== undefined ?
		val :
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null;
};

Sizzle.escape = function( sel ) {
	return (sel + "").replace( rcssescape, fcssescape );
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	// Clear input after sorting to release objects
	// See https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		while ( (node = elem[i++]) ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (jQuery #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[3] || match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[6] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] ) {
				match[2] = match[4] || match[5] || "";

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== "undefined" && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result.replace( rwhitespace, " " ) + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, uniqueCache, outerCache, node, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType,
						diff = false;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) {

										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {

							// Seek `elem` from a previously-cached index

							// ...in a gzip-friendly way
							node = parent;
							outerCache = node[ expando ] || (node[ expando ] = {});

							// Support: IE <9 only
							// Defend against cloned attroperties (jQuery gh-1709)
							uniqueCache = outerCache[ node.uniqueID ] ||
								(outerCache[ node.uniqueID ] = {});

							cache = uniqueCache[ type ] || [];
							nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
							diff = nodeIndex && cache[ 2 ];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									uniqueCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						} else {
							// Use previously-cached element index if available
							if ( useCache ) {
								// ...in a gzip-friendly way
								node = elem;
								outerCache = node[ expando ] || (node[ expando ] = {});

								// Support: IE <9 only
								// Defend against cloned attroperties (jQuery gh-1709)
								uniqueCache = outerCache[ node.uniqueID ] ||
									(outerCache[ node.uniqueID ] = {});

								cache = uniqueCache[ type ] || [];
								nodeIndex = cache[ 0 ] === dirruns && cache[ 1 ];
								diff = nodeIndex;
							}

							// xml :nth-child(...)
							// or :nth-last-child(...) or :nth(-last)?-of-type(...)
							if ( diff === false ) {
								// Use the same loop as above to seek `elem` from the start
								while ( (node = ++nodeIndex && node && node[ dir ] ||
									(diff = nodeIndex = 0) || start.pop()) ) {

									if ( ( ofType ?
										node.nodeName.toLowerCase() === name :
										node.nodeType === 1 ) &&
										++diff ) {

										// Cache the index of each encountered element
										if ( useCache ) {
											outerCache = node[ expando ] || (node[ expando ] = {});

											// Support: IE <9 only
											// Defend against cloned attroperties (jQuery gh-1709)
											uniqueCache = outerCache[ node.uniqueID ] ||
												(outerCache[ node.uniqueID ] = {});

											uniqueCache[ type ] = [ dirruns, diff ];
										}

										if ( node === elem ) {
											break;
										}
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					// Don't keep the element (issue #299)
					input[0] = null;
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			text = text.replace( runescape, funescape );
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": createDisabledPseudo( false ),
		"disabled": createDisabledPseudo( true ),

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is negated by element (1) or content nodes (text: 3; cdata: 4; entity ref: 5),
			//   but not by others (comment: 8; processing instruction: 7; etc.)
			// nodeType < 6 works because attributes (2) do not appear as children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeType < 6 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&

				// Support: IE<8
				// New HTML5 attribute values (e.g., "search") appear with elem.type === "text"
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === "text" );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

tokenize = Sizzle.tokenize = function( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( (tokens = []) );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
};

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		skip = combinator.next,
		key = skip || dir,
		checkNonElements = base && key === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
			return false;
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var oldCache, uniqueCache, outerCache,
				newCache = [ dirruns, doneName ];

			// We can't set arbitrary data on XML nodes, so they don't benefit from combinator caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});

						// Support: IE <9 only
						// Defend against cloned attroperties (jQuery gh-1709)
						uniqueCache = outerCache[ elem.uniqueID ] || (outerCache[ elem.uniqueID ] = {});

						if ( skip && skip === elem.nodeName.toLowerCase() ) {
							elem = elem[ dir ] || elem;
						} else if ( (oldCache = uniqueCache[ key ]) &&
							oldCache[ 0 ] === dirruns && oldCache[ 1 ] === doneName ) {

							// Assign to newCache so results back-propagate to previous elements
							return (newCache[ 2 ] = oldCache[ 2 ]);
						} else {
							// Reuse newcache so results back-propagate to previous elements
							uniqueCache[ key ] = newCache;

							// A match means we're done; a fail means we have to keep checking
							if ( (newCache[ 2 ] = matcher( elem, context, xml )) ) {
								return true;
							}
						}
					}
				}
			}
			return false;
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			var ret = ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
			// Avoid hanging onto element (issue #299)
			checkContext = null;
			return ret;
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	var bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, outermost ) {
			var elem, j, matcher,
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				setMatched = [],
				contextBackup = outermostContext,
				// We must always have either seed elements or outermost context
				elems = seed || byElement && Expr.find["TAG"]( "*", outermost ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1),
				len = elems.length;

			if ( outermost ) {
				outermostContext = context === document || context || outermost;
			}

			// Add elements passing elementMatchers directly to results
			// Support: IE<9, Safari
			// Tolerate NodeList properties (IE: "length"; Safari: <number>) matching elements by id
			for ( ; i !== len && (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					if ( !context && elem.ownerDocument !== document ) {
						setDocument( elem );
						xml = !documentIsHTML;
					}
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context || document, xml) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// `i` is now the count of elements visited above, and adding it to `matchedCount`
			// makes the latter nonnegative.
			matchedCount += i;

			// Apply set filters to unmatched elements
			// NOTE: This can be skipped if there are no unmatched elements (i.e., `matchedCount`
			// equals `i`), unless we didn't visit _any_ elements in the above loop because we have
			// no element matchers and no seed.
			// Incrementing an initially-string "0" `i` allows `i` to remain a string only in that
			// case, which will result in a "00" `matchedCount` that differs from `i` but is also
			// numerically zero.
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, match /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !match ) {
			match = tokenize( selector );
		}
		i = match.length;
		while ( i-- ) {
			cached = matcherFromTokens( match[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );

		// Save selector and tokenization
		cached.selector = selector;
	}
	return cached;
};

/**
 * A low-level selection function that works with Sizzle's compiled
 *  selector functions
 * @param {String|Function} selector A selector or a pre-compiled
 *  selector function built with Sizzle.compile
 * @param {Element} context
 * @param {Array} [results]
 * @param {Array} [seed] A set of elements to match against
 */
select = Sizzle.select = function( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		compiled = typeof selector === "function" && selector,
		match = !seed && tokenize( (selector = compiled.selector || selector) );

	results = results || [];

	// Try to minimize operations if there is only one selector in the list and no seed
	// (the latter of which guarantees us context)
	if ( match.length === 1 ) {

		// Reduce context if the leading compound selector is an ID
		tokens = match[0] = match[0].slice( 0 );
		if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
				context.nodeType === 9 && documentIsHTML && Expr.relative[ tokens[1].type ] ) {

			context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
			if ( !context ) {
				return results;

			// Precompiled matchers will still verify ancestry, so step up a level
			} else if ( compiled ) {
				context = context.parentNode;
			}

			selector = selector.slice( tokens.shift().value.length );
		}

		// Fetch a seed set for right-to-left matching
		i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
		while ( i-- ) {
			token = tokens[i];

			// Abort if we hit a combinator
			if ( Expr.relative[ (type = token.type) ] ) {
				break;
			}
			if ( (find = Expr.find[ type ]) ) {
				// Search, expanding context for leading sibling combinators
				if ( (seed = find(
					token.matches[0].replace( runescape, funescape ),
					rsibling.test( tokens[0].type ) && testContext( context.parentNode ) || context
				)) ) {

					// If seed is empty or no tokens remain, we can return early
					tokens.splice( i, 1 );
					selector = seed.length && toSelector( tokens );
					if ( !selector ) {
						push.apply( results, seed );
						return results;
					}

					break;
				}
			}
		}
	}

	// Compile and execute a filtering function if one is not provided
	// Provide `match` to avoid retokenization if we modified the selector above
	( compiled || compile( selector, match ) )(
		seed,
		context,
		!documentIsHTML,
		results,
		!context || rsibling.test( selector ) && testContext( context.parentNode ) || context
	);
	return results;
};

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome 14-35+
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = !!hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( el ) {
	// Should return 1, but returns 4 (following)
	return el.compareDocumentPosition( document.createElement("fieldset") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// https://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( el ) {
	el.innerHTML = "<a href='#'></a>";
	return el.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( el ) {
	el.innerHTML = "<input/>";
	el.firstChild.setAttribute( "value", "" );
	return el.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( el ) {
	return el.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return elem[ name ] === true ? name.toLowerCase() :
					(val = elem.getAttributeNode( name )) && val.specified ?
					val.value :
				null;
		}
	});
}

return Sizzle;

})( window );



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;

// Deprecated
jQuery.expr[ ":" ] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;
jQuery.escapeSelector = Sizzle.escape;




var dir = function( elem, dir, until ) {
	var matched = [],
		truncate = until !== undefined;

	while ( ( elem = elem[ dir ] ) && elem.nodeType !== 9 ) {
		if ( elem.nodeType === 1 ) {
			if ( truncate && jQuery( elem ).is( until ) ) {
				break;
			}
			matched.push( elem );
		}
	}
	return matched;
};


var siblings = function( n, elem ) {
	var matched = [];

	for ( ; n; n = n.nextSibling ) {
		if ( n.nodeType === 1 && n !== elem ) {
			matched.push( n );
		}
	}

	return matched;
};


var rneedsContext = jQuery.expr.match.needsContext;



function nodeName( elem, name ) {

  return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();

};
var rsingleTag = ( /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i );



// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			return !!qualifier.call( elem, i, elem ) !== not;
		} );
	}

	// Single element
	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		} );
	}

	// Arraylike of elements (jQuery, arguments, Array)
	if ( typeof qualifier !== "string" ) {
		return jQuery.grep( elements, function( elem ) {
			return ( indexOf.call( qualifier, elem ) > -1 ) !== not;
		} );
	}

	// Filtered directly for both simple and complex selectors
	return jQuery.filter( qualifier, elements, not );
}

jQuery.filter = function( expr, elems, not ) {
	var elem = elems[ 0 ];

	if ( not ) {
		expr = ":not(" + expr + ")";
	}

	if ( elems.length === 1 && elem.nodeType === 1 ) {
		return jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [];
	}

	return jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
		return elem.nodeType === 1;
	} ) );
};

jQuery.fn.extend( {
	find: function( selector ) {
		var i, ret,
			len = this.length,
			self = this;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter( function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			} ) );
		}

		ret = this.pushStack( [] );

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		return len > 1 ? jQuery.uniqueSort( ret ) : ret;
	},
	filter: function( selector ) {
		return this.pushStack( winnow( this, selector || [], false ) );
	},
	not: function( selector ) {
		return this.pushStack( winnow( this, selector || [], true ) );
	},
	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	}
} );


// Initialize a jQuery object


// A central reference to the root jQuery(document)
var rootjQuery,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	// Shortcut simple #id case for speed
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/,

	init = jQuery.fn.init = function( selector, context, root ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Method init() accepts an alternate rootjQuery
		// so migrate can support jQuery.sub (gh-2101)
		root = root || rootjQuery;

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector[ 0 ] === "<" &&
				selector[ selector.length - 1 ] === ">" &&
				selector.length >= 3 ) {

				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && ( match[ 1 ] || !context ) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[ 1 ] ) {
					context = context instanceof jQuery ? context[ 0 ] : context;

					// Option to run scripts is true for back-compat
					// Intentionally let the error be thrown if parseHTML is not present
					jQuery.merge( this, jQuery.parseHTML(
						match[ 1 ],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[ 1 ] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {

							// Properties of context are called as methods if possible
							if ( isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[ 2 ] );

					if ( elem ) {

						// Inject the element directly into the jQuery object
						this[ 0 ] = elem;
						this.length = 1;
					}
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || root ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this[ 0 ] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( isFunction( selector ) ) {
			return root.ready !== undefined ?
				root.ready( selector ) :

				// Execute immediately if ready is not present
				selector( jQuery );
		}

		return jQuery.makeArray( selector, this );
	};

// Give the init function the jQuery prototype for later instantiation
init.prototype = jQuery.fn;

// Initialize central reference
rootjQuery = jQuery( document );


var rparentsprev = /^(?:parents|prev(?:Until|All))/,

	// Methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend( {
	has: function( target ) {
		var targets = jQuery( target, this ),
			l = targets.length;

		return this.filter( function() {
			var i = 0;
			for ( ; i < l; i++ ) {
				if ( jQuery.contains( this, targets[ i ] ) ) {
					return true;
				}
			}
		} );
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			matched = [],
			targets = typeof selectors !== "string" && jQuery( selectors );

		// Positional selectors never match, since there's no _selection_ context
		if ( !rneedsContext.test( selectors ) ) {
			for ( ; i < l; i++ ) {
				for ( cur = this[ i ]; cur && cur !== context; cur = cur.parentNode ) {

					// Always skip document fragments
					if ( cur.nodeType < 11 && ( targets ?
						targets.index( cur ) > -1 :

						// Don't pass non-elements to Sizzle
						cur.nodeType === 1 &&
							jQuery.find.matchesSelector( cur, selectors ) ) ) {

						matched.push( cur );
						break;
					}
				}
			}
		}

		return this.pushStack( matched.length > 1 ? jQuery.uniqueSort( matched ) : matched );
	},

	// Determine the position of an element within the set
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[ 0 ] && this[ 0 ].parentNode ) ? this.first().prevAll().length : -1;
		}

		// Index in selector
		if ( typeof elem === "string" ) {
			return indexOf.call( jQuery( elem ), this[ 0 ] );
		}

		// Locate the position of the desired element
		return indexOf.call( this,

			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[ 0 ] : elem
		);
	},

	add: function( selector, context ) {
		return this.pushStack(
			jQuery.uniqueSort(
				jQuery.merge( this.get(), jQuery( selector, context ) )
			)
		);
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter( selector )
		);
	}
} );

function sibling( cur, dir ) {
	while ( ( cur = cur[ dir ] ) && cur.nodeType !== 1 ) {}
	return cur;
}

jQuery.each( {
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return siblings( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return siblings( elem.firstChild );
	},
	contents: function( elem ) {
        if ( nodeName( elem, "iframe" ) ) {
            return elem.contentDocument;
        }

        // Support: IE 9 - 11 only, iOS 7 only, Android Browser <=4.3 only
        // Treat the template element as a regular one in browsers that
        // don't support it.
        if ( nodeName( elem, "template" ) ) {
            elem = elem.content || elem;
        }

        return jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var matched = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			matched = jQuery.filter( selector, matched );
		}

		if ( this.length > 1 ) {

			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				jQuery.uniqueSort( matched );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				matched.reverse();
			}
		}

		return this.pushStack( matched );
	};
} );
var rnothtmlwhite = ( /[^\x20\t\r\n\f]+/g );



// Convert String-formatted options into Object-formatted ones
function createOptions( options ) {
	var object = {};
	jQuery.each( options.match( rnothtmlwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	} );
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		createOptions( options ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,

		// Last fire value for non-forgettable lists
		memory,

		// Flag to know if list was already fired
		fired,

		// Flag to prevent firing
		locked,

		// Actual callback list
		list = [],

		// Queue of execution data for repeatable lists
		queue = [],

		// Index of currently firing callback (modified by add/remove as needed)
		firingIndex = -1,

		// Fire callbacks
		fire = function() {

			// Enforce single-firing
			locked = locked || options.once;

			// Execute callbacks for all pending executions,
			// respecting firingIndex overrides and runtime changes
			fired = firing = true;
			for ( ; queue.length; firingIndex = -1 ) {
				memory = queue.shift();
				while ( ++firingIndex < list.length ) {

					// Run callback and check for early termination
					if ( list[ firingIndex ].apply( memory[ 0 ], memory[ 1 ] ) === false &&
						options.stopOnFalse ) {

						// Jump to end and forget the data so .add doesn't re-fire
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			// Forget the data if we're done with it
			if ( !options.memory ) {
				memory = false;
			}

			firing = false;

			// Clean up if we're done firing for good
			if ( locked ) {

				// Keep an empty list if we have data for future add calls
				if ( memory ) {
					list = [];

				// Otherwise, this object is spent
				} else {
					list = "";
				}
			}
		},

		// Actual Callbacks object
		self = {

			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {

					// If we have memory from a past run, we should fire after adding
					if ( memory && !firing ) {
						firingIndex = list.length - 1;
						queue.push( memory );
					}

					( function add( args ) {
						jQuery.each( args, function( _, arg ) {
							if ( isFunction( arg ) ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && toType( arg ) !== "string" ) {

								// Inspect recursively
								add( arg );
							}
						} );
					} )( arguments );

					if ( memory && !firing ) {
						fire();
					}
				}
				return this;
			},

			// Remove a callback from the list
			remove: function() {
				jQuery.each( arguments, function( _, arg ) {
					var index;
					while ( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
						list.splice( index, 1 );

						// Handle firing indexes
						if ( index <= firingIndex ) {
							firingIndex--;
						}
					}
				} );
				return this;
			},

			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ?
					jQuery.inArray( fn, list ) > -1 :
					list.length > 0;
			},

			// Remove all callbacks from the list
			empty: function() {
				if ( list ) {
					list = [];
				}
				return this;
			},

			// Disable .fire and .add
			// Abort any current/pending executions
			// Clear all callbacks and values
			disable: function() {
				locked = queue = [];
				list = memory = "";
				return this;
			},
			disabled: function() {
				return !list;
			},

			// Disable .fire
			// Also disable .add unless we have memory (since it would have no effect)
			// Abort any pending executions
			lock: function() {
				locked = queue = [];
				if ( !memory && !firing ) {
					list = memory = "";
				}
				return this;
			},
			locked: function() {
				return !!locked;
			},

			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( !locked ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					queue.push( args );
					if ( !firing ) {
						fire();
					}
				}
				return this;
			},

			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},

			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};


function Identity( v ) {
	return v;
}
function Thrower( ex ) {
	throw ex;
}

function adoptValue( value, resolve, reject, noValue ) {
	var method;

	try {

		// Check for promise aspect first to privilege synchronous behavior
		if ( value && isFunction( ( method = value.promise ) ) ) {
			method.call( value ).done( resolve ).fail( reject );

		// Other thenables
		} else if ( value && isFunction( ( method = value.then ) ) ) {
			method.call( value, resolve, reject );

		// Other non-thenables
		} else {

			// Control `resolve` arguments by letting Array#slice cast boolean `noValue` to integer:
			// * false: [ value ].slice( 0 ) => resolve( value )
			// * true: [ value ].slice( 1 ) => resolve()
			resolve.apply( undefined, [ value ].slice( noValue ) );
		}

	// For Promises/A+, convert exceptions into rejections
	// Since jQuery.when doesn't unwrap thenables, we can skip the extra checks appearing in
	// Deferred#then to conditionally suppress rejection.
	} catch ( value ) {

		// Support: Android 4.0 only
		// Strict mode functions invoked without .call/.apply get global-object context
		reject.apply( undefined, [ value ] );
	}
}

jQuery.extend( {

	Deferred: function( func ) {
		var tuples = [

				// action, add listener, callbacks,
				// ... .then handlers, argument index, [final state]
				[ "notify", "progress", jQuery.Callbacks( "memory" ),
					jQuery.Callbacks( "memory" ), 2 ],
				[ "resolve", "done", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 0, "resolved" ],
				[ "reject", "fail", jQuery.Callbacks( "once memory" ),
					jQuery.Callbacks( "once memory" ), 1, "rejected" ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				"catch": function( fn ) {
					return promise.then( null, fn );
				},

				// Keep pipe for back-compat
				pipe: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;

					return jQuery.Deferred( function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {

							// Map tuples (progress, done, fail) to arguments (done, fail, progress)
							var fn = isFunction( fns[ tuple[ 4 ] ] ) && fns[ tuple[ 4 ] ];

							// deferred.progress(function() { bind to newDefer or newDefer.notify })
							// deferred.done(function() { bind to newDefer or newDefer.resolve })
							// deferred.fail(function() { bind to newDefer or newDefer.reject })
							deferred[ tuple[ 1 ] ]( function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && isFunction( returned.promise ) ) {
									returned.promise()
										.progress( newDefer.notify )
										.done( newDefer.resolve )
										.fail( newDefer.reject );
								} else {
									newDefer[ tuple[ 0 ] + "With" ](
										this,
										fn ? [ returned ] : arguments
									);
								}
							} );
						} );
						fns = null;
					} ).promise();
				},
				then: function( onFulfilled, onRejected, onProgress ) {
					var maxDepth = 0;
					function resolve( depth, deferred, handler, special ) {
						return function() {
							var that = this,
								args = arguments,
								mightThrow = function() {
									var returned, then;

									// Support: Promises/A+ section 2.3.3.3.3
									// https://promisesaplus.com/#point-59
									// Ignore double-resolution attempts
									if ( depth < maxDepth ) {
										return;
									}

									returned = handler.apply( that, args );

									// Support: Promises/A+ section 2.3.1
									// https://promisesaplus.com/#point-48
									if ( returned === deferred.promise() ) {
										throw new TypeError( "Thenable self-resolution" );
									}

									// Support: Promises/A+ sections 2.3.3.1, 3.5
									// https://promisesaplus.com/#point-54
									// https://promisesaplus.com/#point-75
									// Retrieve `then` only once
									then = returned &&

										// Support: Promises/A+ section 2.3.4
										// https://promisesaplus.com/#point-64
										// Only check objects and functions for thenability
										( typeof returned === "object" ||
											typeof returned === "function" ) &&
										returned.then;

									// Handle a returned thenable
									if ( isFunction( then ) ) {

										// Special processors (notify) just wait for resolution
										if ( special ) {
											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special )
											);

										// Normal processors (resolve) also hook into progress
										} else {

											// ...and disregard older resolution values
											maxDepth++;

											then.call(
												returned,
												resolve( maxDepth, deferred, Identity, special ),
												resolve( maxDepth, deferred, Thrower, special ),
												resolve( maxDepth, deferred, Identity,
													deferred.notifyWith )
											);
										}

									// Handle all other returned values
									} else {

										// Only substitute handlers pass on context
										// and multiple values (non-spec behavior)
										if ( handler !== Identity ) {
											that = undefined;
											args = [ returned ];
										}

										// Process the value(s)
										// Default process is resolve
										( special || deferred.resolveWith )( that, args );
									}
								},

								// Only normal processors (resolve) catch and reject exceptions
								process = special ?
									mightThrow :
									function() {
										try {
											mightThrow();
										} catch ( e ) {

											if ( jQuery.Deferred.exceptionHook ) {
												jQuery.Deferred.exceptionHook( e,
													process.stackTrace );
											}

											// Support: Promises/A+ section 2.3.3.3.4.1
											// https://promisesaplus.com/#point-61
											// Ignore post-resolution exceptions
											if ( depth + 1 >= maxDepth ) {

												// Only substitute handlers pass on context
												// and multiple values (non-spec behavior)
												if ( handler !== Thrower ) {
													that = undefined;
													args = [ e ];
												}

												deferred.rejectWith( that, args );
											}
										}
									};

							// Support: Promises/A+ section 2.3.3.3.1
							// https://promisesaplus.com/#point-57
							// Re-resolve promises immediately to dodge false rejection from
							// subsequent errors
							if ( depth ) {
								process();
							} else {

								// Call an optional hook to record the stack, in case of exception
								// since it's otherwise lost when execution goes async
								if ( jQuery.Deferred.getStackHook ) {
									process.stackTrace = jQuery.Deferred.getStackHook();
								}
								window.setTimeout( process );
							}
						};
					}

					return jQuery.Deferred( function( newDefer ) {

						// progress_handlers.add( ... )
						tuples[ 0 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onProgress ) ?
									onProgress :
									Identity,
								newDefer.notifyWith
							)
						);

						// fulfilled_handlers.add( ... )
						tuples[ 1 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onFulfilled ) ?
									onFulfilled :
									Identity
							)
						);

						// rejected_handlers.add( ... )
						tuples[ 2 ][ 3 ].add(
							resolve(
								0,
								newDefer,
								isFunction( onRejected ) ?
									onRejected :
									Thrower
							)
						);
					} ).promise();
				},

				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 5 ];

			// promise.progress = list.add
			// promise.done = list.add
			// promise.fail = list.add
			promise[ tuple[ 1 ] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(
					function() {

						// state = "resolved" (i.e., fulfilled)
						// state = "rejected"
						state = stateString;
					},

					// rejected_callbacks.disable
					// fulfilled_callbacks.disable
					tuples[ 3 - i ][ 2 ].disable,

					// rejected_handlers.disable
					// fulfilled_handlers.disable
					tuples[ 3 - i ][ 3 ].disable,

					// progress_callbacks.lock
					tuples[ 0 ][ 2 ].lock,

					// progress_handlers.lock
					tuples[ 0 ][ 3 ].lock
				);
			}

			// progress_handlers.fire
			// fulfilled_handlers.fire
			// rejected_handlers.fire
			list.add( tuple[ 3 ].fire );

			// deferred.notify = function() { deferred.notifyWith(...) }
			// deferred.resolve = function() { deferred.resolveWith(...) }
			// deferred.reject = function() { deferred.rejectWith(...) }
			deferred[ tuple[ 0 ] ] = function() {
				deferred[ tuple[ 0 ] + "With" ]( this === deferred ? undefined : this, arguments );
				return this;
			};

			// deferred.notifyWith = list.fireWith
			// deferred.resolveWith = list.fireWith
			// deferred.rejectWith = list.fireWith
			deferred[ tuple[ 0 ] + "With" ] = list.fireWith;
		} );

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( singleValue ) {
		var

			// count of uncompleted subordinates
			remaining = arguments.length,

			// count of unprocessed arguments
			i = remaining,

			// subordinate fulfillment data
			resolveContexts = Array( i ),
			resolveValues = slice.call( arguments ),

			// the master Deferred
			master = jQuery.Deferred(),

			// subordinate callback factory
			updateFunc = function( i ) {
				return function( value ) {
					resolveContexts[ i ] = this;
					resolveValues[ i ] = arguments.length > 1 ? slice.call( arguments ) : value;
					if ( !( --remaining ) ) {
						master.resolveWith( resolveContexts, resolveValues );
					}
				};
			};

		// Single- and empty arguments are adopted like Promise.resolve
		if ( remaining <= 1 ) {
			adoptValue( singleValue, master.done( updateFunc( i ) ).resolve, master.reject,
				!remaining );

			// Use .then() to unwrap secondary thenables (cf. gh-3000)
			if ( master.state() === "pending" ||
				isFunction( resolveValues[ i ] && resolveValues[ i ].then ) ) {

				return master.then();
			}
		}

		// Multiple arguments are aggregated like Promise.all array elements
		while ( i-- ) {
			adoptValue( resolveValues[ i ], updateFunc( i ), master.reject );
		}

		return master.promise();
	}
} );


// These usually indicate a programmer mistake during development,
// warn about them ASAP rather than swallowing them by default.
var rerrorNames = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;

jQuery.Deferred.exceptionHook = function( error, stack ) {

	// Support: IE 8 - 9 only
	// Console exists when dev tools are open, which can happen at any time
	if ( window.console && window.console.warn && error && rerrorNames.test( error.name ) ) {
		window.console.warn( "jQuery.Deferred exception: " + error.message, error.stack, stack );
	}
};




jQuery.readyException = function( error ) {
	window.setTimeout( function() {
		throw error;
	} );
};




// The deferred used on DOM ready
var readyList = jQuery.Deferred();

jQuery.fn.ready = function( fn ) {

	readyList
		.then( fn )

		// Wrap jQuery.readyException in a function so that the lookup
		// happens at the time of error handling instead of callback
		// registration.
		.catch( function( error ) {
			jQuery.readyException( error );
		} );

	return this;
};

jQuery.extend( {

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );
	}
} );

jQuery.ready.then = readyList.then;

// The ready event handler and self cleanup method
function completed() {
	document.removeEventListener( "DOMContentLoaded", completed );
	window.removeEventListener( "load", completed );
	jQuery.ready();
}

// Catch cases where $(document).ready() is called
// after the browser event has already occurred.
// Support: IE <=9 - 10 only
// Older IE sometimes signals "interactive" too soon
if ( document.readyState === "complete" ||
	( document.readyState !== "loading" && !document.documentElement.doScroll ) ) {

	// Handle it asynchronously to allow scripts the opportunity to delay ready
	window.setTimeout( jQuery.ready );

} else {

	// Use the handy event callback
	document.addEventListener( "DOMContentLoaded", completed );

	// A fallback to window.onload, that will always work
	window.addEventListener( "load", completed );
}




// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
var access = function( elems, fn, key, value, chainable, emptyGet, raw ) {
	var i = 0,
		len = elems.length,
		bulk = key == null;

	// Sets many values
	if ( toType( key ) === "object" ) {
		chainable = true;
		for ( i in key ) {
			access( elems, fn, i, key[ i ], true, emptyGet, raw );
		}

	// Sets one value
	} else if ( value !== undefined ) {
		chainable = true;

		if ( !isFunction( value ) ) {
			raw = true;
		}

		if ( bulk ) {

			// Bulk operations run against the entire set
			if ( raw ) {
				fn.call( elems, value );
				fn = null;

			// ...except when executing function values
			} else {
				bulk = fn;
				fn = function( elem, key, value ) {
					return bulk.call( jQuery( elem ), value );
				};
			}
		}

		if ( fn ) {
			for ( ; i < len; i++ ) {
				fn(
					elems[ i ], key, raw ?
					value :
					value.call( elems[ i ], i, fn( elems[ i ], key ) )
				);
			}
		}
	}

	if ( chainable ) {
		return elems;
	}

	// Gets
	if ( bulk ) {
		return fn.call( elems );
	}

	return len ? fn( elems[ 0 ], key ) : emptyGet;
};


// Matches dashed string for camelizing
var rmsPrefix = /^-ms-/,
	rdashAlpha = /-([a-z])/g;

// Used by camelCase as callback to replace()
function fcamelCase( all, letter ) {
	return letter.toUpperCase();
}

// Convert dashed to camelCase; used by the css and data modules
// Support: IE <=9 - 11, Edge 12 - 15
// Microsoft forgot to hump their vendor prefix (#9572)
function camelCase( string ) {
	return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
}
var acceptData = function( owner ) {

	// Accepts only:
	//  - Node
	//    - Node.ELEMENT_NODE
	//    - Node.DOCUMENT_NODE
	//  - Object
	//    - Any
	return owner.nodeType === 1 || owner.nodeType === 9 || !( +owner.nodeType );
};




function Data() {
	this.expando = jQuery.expando + Data.uid++;
}

Data.uid = 1;

Data.prototype = {

	cache: function( owner ) {

		// Check if the owner object already has a cache
		var value = owner[ this.expando ];

		// If not, create one
		if ( !value ) {
			value = {};

			// We can accept data for non-element nodes in modern browsers,
			// but we should not, see #8335.
			// Always return an empty object.
			if ( acceptData( owner ) ) {

				// If it is a node unlikely to be stringify-ed or looped over
				// use plain assignment
				if ( owner.nodeType ) {
					owner[ this.expando ] = value;

				// Otherwise secure it in a non-enumerable property
				// configurable must be true to allow the property to be
				// deleted when data is removed
				} else {
					Object.defineProperty( owner, this.expando, {
						value: value,
						configurable: true
					} );
				}
			}
		}

		return value;
	},
	set: function( owner, data, value ) {
		var prop,
			cache = this.cache( owner );

		// Handle: [ owner, key, value ] args
		// Always use camelCase key (gh-2257)
		if ( typeof data === "string" ) {
			cache[ camelCase( data ) ] = value;

		// Handle: [ owner, { properties } ] args
		} else {

			// Copy the properties one-by-one to the cache object
			for ( prop in data ) {
				cache[ camelCase( prop ) ] = data[ prop ];
			}
		}
		return cache;
	},
	get: function( owner, key ) {
		return key === undefined ?
			this.cache( owner ) :

			// Always use camelCase key (gh-2257)
			owner[ this.expando ] && owner[ this.expando ][ camelCase( key ) ];
	},
	access: function( owner, key, value ) {

		// In cases where either:
		//
		//   1. No key was specified
		//   2. A string key was specified, but no value provided
		//
		// Take the "read" path and allow the get method to determine
		// which value to return, respectively either:
		//
		//   1. The entire cache object
		//   2. The data stored at the key
		//
		if ( key === undefined ||
				( ( key && typeof key === "string" ) && value === undefined ) ) {

			return this.get( owner, key );
		}

		// When the key is not a string, or both a key and value
		// are specified, set or extend (existing objects) with either:
		//
		//   1. An object of properties
		//   2. A key and value
		//
		this.set( owner, key, value );

		// Since the "set" path can have two possible entry points
		// return the expected data based on which path was taken[*]
		return value !== undefined ? value : key;
	},
	remove: function( owner, key ) {
		var i,
			cache = owner[ this.expando ];

		if ( cache === undefined ) {
			return;
		}

		if ( key !== undefined ) {

			// Support array or space separated string of keys
			if ( Array.isArray( key ) ) {

				// If key is an array of keys...
				// We always set camelCase keys, so remove that.
				key = key.map( camelCase );
			} else {
				key = camelCase( key );

				// If a key with the spaces exists, use it.
				// Otherwise, create an array by matching non-whitespace
				key = key in cache ?
					[ key ] :
					( key.match( rnothtmlwhite ) || [] );
			}

			i = key.length;

			while ( i-- ) {
				delete cache[ key[ i ] ];
			}
		}

		// Remove the expando if there's no more data
		if ( key === undefined || jQuery.isEmptyObject( cache ) ) {

			// Support: Chrome <=35 - 45
			// Webkit & Blink performance suffers when deleting properties
			// from DOM nodes, so set to undefined instead
			// https://bugs.chromium.org/p/chromium/issues/detail?id=378607 (bug restricted)
			if ( owner.nodeType ) {
				owner[ this.expando ] = undefined;
			} else {
				delete owner[ this.expando ];
			}
		}
	},
	hasData: function( owner ) {
		var cache = owner[ this.expando ];
		return cache !== undefined && !jQuery.isEmptyObject( cache );
	}
};
var dataPriv = new Data();

var dataUser = new Data();



//	Implementation Summary
//
//	1. Enforce API surface and semantic compatibility with 1.9.x branch
//	2. Improve the module's maintainability by reducing the storage
//		paths to a single mechanism.
//	3. Use the same single mechanism to support "private" and "user" data.
//	4. _Never_ expose "private" data to user code (TODO: Drop _data, _removeData)
//	5. Avoid exposing implementation details on user objects (eg. expando properties)
//	6. Provide a clear path for implementation upgrade to WeakMap in 2014

var rbrace = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
	rmultiDash = /[A-Z]/g;

function getData( data ) {
	if ( data === "true" ) {
		return true;
	}

	if ( data === "false" ) {
		return false;
	}

	if ( data === "null" ) {
		return null;
	}

	// Only convert to a number if it doesn't change the string
	if ( data === +data + "" ) {
		return +data;
	}

	if ( rbrace.test( data ) ) {
		return JSON.parse( data );
	}

	return data;
}

function dataAttr( elem, key, data ) {
	var name;

	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {
		name = "data-" + key.replace( rmultiDash, "-$&" ).toLowerCase();
		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = getData( data );
			} catch ( e ) {}

			// Make sure we set the data so it isn't changed later
			dataUser.set( elem, key, data );
		} else {
			data = undefined;
		}
	}
	return data;
}

jQuery.extend( {
	hasData: function( elem ) {
		return dataUser.hasData( elem ) || dataPriv.hasData( elem );
	},

	data: function( elem, name, data ) {
		return dataUser.access( elem, name, data );
	},

	removeData: function( elem, name ) {
		dataUser.remove( elem, name );
	},

	// TODO: Now that all calls to _data and _removeData have been replaced
	// with direct calls to dataPriv methods, these can be deprecated.
	_data: function( elem, name, data ) {
		return dataPriv.access( elem, name, data );
	},

	_removeData: function( elem, name ) {
		dataPriv.remove( elem, name );
	}
} );

jQuery.fn.extend( {
	data: function( key, value ) {
		var i, name, data,
			elem = this[ 0 ],
			attrs = elem && elem.attributes;

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = dataUser.get( elem );

				if ( elem.nodeType === 1 && !dataPriv.get( elem, "hasDataAttrs" ) ) {
					i = attrs.length;
					while ( i-- ) {

						// Support: IE 11 only
						// The attrs elements can be null (#14894)
						if ( attrs[ i ] ) {
							name = attrs[ i ].name;
							if ( name.indexOf( "data-" ) === 0 ) {
								name = camelCase( name.slice( 5 ) );
								dataAttr( elem, name, data[ name ] );
							}
						}
					}
					dataPriv.set( elem, "hasDataAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each( function() {
				dataUser.set( this, key );
			} );
		}

		return access( this, function( value ) {
			var data;

			// The calling jQuery object (element matches) is not empty
			// (and therefore has an element appears at this[ 0 ]) and the
			// `value` parameter was not undefined. An empty jQuery object
			// will result in `undefined` for elem = this[ 0 ] which will
			// throw an exception if an attempt to read a data cache is made.
			if ( elem && value === undefined ) {

				// Attempt to get data from the cache
				// The key will always be camelCased in Data
				data = dataUser.get( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// Attempt to "discover" the data in
				// HTML5 custom data-* attrs
				data = dataAttr( elem, key );
				if ( data !== undefined ) {
					return data;
				}

				// We tried really hard, but the data doesn't exist.
				return;
			}

			// Set the data...
			this.each( function() {

				// We always store the camelCased key
				dataUser.set( this, key, value );
			} );
		}, null, value, arguments.length > 1, null, true );
	},

	removeData: function( key ) {
		return this.each( function() {
			dataUser.remove( this, key );
		} );
	}
} );


jQuery.extend( {
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = dataPriv.get( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || Array.isArray( data ) ) {
					queue = dataPriv.access( elem, type, jQuery.makeArray( data ) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// Clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// Not public - generate a queueHooks object, or return the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return dataPriv.get( elem, key ) || dataPriv.access( elem, key, {
			empty: jQuery.Callbacks( "once memory" ).add( function() {
				dataPriv.remove( elem, [ type + "queue", key ] );
			} )
		} );
	}
} );

jQuery.fn.extend( {
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[ 0 ], type );
		}

		return data === undefined ?
			this :
			this.each( function() {
				var queue = jQuery.queue( this, type, data );

				// Ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[ 0 ] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			} );
	},
	dequeue: function( type ) {
		return this.each( function() {
			jQuery.dequeue( this, type );
		} );
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},

	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while ( i-- ) {
			tmp = dataPriv.get( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
} );
var pnum = ( /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/ ).source;

var rcssNum = new RegExp( "^(?:([+-])=|)(" + pnum + ")([a-z%]*)$", "i" );


var cssExpand = [ "Top", "Right", "Bottom", "Left" ];

var isHiddenWithinTree = function( elem, el ) {

		// isHiddenWithinTree might be called from jQuery#filter function;
		// in that case, element will be second argument
		elem = el || elem;

		// Inline style trumps all
		return elem.style.display === "none" ||
			elem.style.display === "" &&

			// Otherwise, check computed style
			// Support: Firefox <=43 - 45
			// Disconnected elements can have computed display: none, so first confirm that elem is
			// in the document.
			jQuery.contains( elem.ownerDocument, elem ) &&

			jQuery.css( elem, "display" ) === "none";
	};

var swap = function( elem, options, callback, args ) {
	var ret, name,
		old = {};

	// Remember the old values, and insert the new ones
	for ( name in options ) {
		old[ name ] = elem.style[ name ];
		elem.style[ name ] = options[ name ];
	}

	ret = callback.apply( elem, args || [] );

	// Revert the old values
	for ( name in options ) {
		elem.style[ name ] = old[ name ];
	}

	return ret;
};




function adjustCSS( elem, prop, valueParts, tween ) {
	var adjusted, scale,
		maxIterations = 20,
		currentValue = tween ?
			function() {
				return tween.cur();
			} :
			function() {
				return jQuery.css( elem, prop, "" );
			},
		initial = currentValue(),
		unit = valueParts && valueParts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

		// Starting value computation is required for potential unit mismatches
		initialInUnit = ( jQuery.cssNumber[ prop ] || unit !== "px" && +initial ) &&
			rcssNum.exec( jQuery.css( elem, prop ) );

	if ( initialInUnit && initialInUnit[ 3 ] !== unit ) {

		// Support: Firefox <=54
		// Halve the iteration target value to prevent interference from CSS upper bounds (gh-2144)
		initial = initial / 2;

		// Trust units reported by jQuery.css
		unit = unit || initialInUnit[ 3 ];

		// Iteratively approximate from a nonzero starting point
		initialInUnit = +initial || 1;

		while ( maxIterations-- ) {

			// Evaluate and update our best guess (doubling guesses that zero out).
			// Finish if the scale equals or crosses 1 (making the old*new product non-positive).
			jQuery.style( elem, prop, initialInUnit + unit );
			if ( ( 1 - scale ) * ( 1 - ( scale = currentValue() / initial || 0.5 ) ) <= 0 ) {
				maxIterations = 0;
			}
			initialInUnit = initialInUnit / scale;

		}

		initialInUnit = initialInUnit * 2;
		jQuery.style( elem, prop, initialInUnit + unit );

		// Make sure we update the tween properties later on
		valueParts = valueParts || [];
	}

	if ( valueParts ) {
		initialInUnit = +initialInUnit || +initial || 0;

		// Apply relative offset (+=/-=) if specified
		adjusted = valueParts[ 1 ] ?
			initialInUnit + ( valueParts[ 1 ] + 1 ) * valueParts[ 2 ] :
			+valueParts[ 2 ];
		if ( tween ) {
			tween.unit = unit;
			tween.start = initialInUnit;
			tween.end = adjusted;
		}
	}
	return adjusted;
}


var defaultDisplayMap = {};

function getDefaultDisplay( elem ) {
	var temp,
		doc = elem.ownerDocument,
		nodeName = elem.nodeName,
		display = defaultDisplayMap[ nodeName ];

	if ( display ) {
		return display;
	}

	temp = doc.body.appendChild( doc.createElement( nodeName ) );
	display = jQuery.css( temp, "display" );

	temp.parentNode.removeChild( temp );

	if ( display === "none" ) {
		display = "block";
	}
	defaultDisplayMap[ nodeName ] = display;

	return display;
}

function showHide( elements, show ) {
	var display, elem,
		values = [],
		index = 0,
		length = elements.length;

	// Determine new display value for elements that need to change
	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		display = elem.style.display;
		if ( show ) {

			// Since we force visibility upon cascade-hidden elements, an immediate (and slow)
			// check is required in this first loop unless we have a nonempty display value (either
			// inline or about-to-be-restored)
			if ( display === "none" ) {
				values[ index ] = dataPriv.get( elem, "display" ) || null;
				if ( !values[ index ] ) {
					elem.style.display = "";
				}
			}
			if ( elem.style.display === "" && isHiddenWithinTree( elem ) ) {
				values[ index ] = getDefaultDisplay( elem );
			}
		} else {
			if ( display !== "none" ) {
				values[ index ] = "none";

				// Remember what we're overwriting
				dataPriv.set( elem, "display", display );
			}
		}
	}

	// Set the display of the elements in a second loop to avoid constant reflow
	for ( index = 0; index < length; index++ ) {
		if ( values[ index ] != null ) {
			elements[ index ].style.display = values[ index ];
		}
	}

	return elements;
}

jQuery.fn.extend( {
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each( function() {
			if ( isHiddenWithinTree( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		} );
	}
} );
var rcheckableType = ( /^(?:checkbox|radio)$/i );

var rtagName = ( /<([a-z][^\/\0>\x20\t\r\n\f]+)/i );

var rscriptType = ( /^$|^module$|\/(?:java|ecma)script/i );



// We have to close these tags to support XHTML (#13200)
var wrapMap = {

	// Support: IE <=9 only
	option: [ 1, "<select multiple='multiple'>", "</select>" ],

	// XHTML parsers do not magically insert elements in the
	// same way that tag soup parsers do. So we cannot shorten
	// this by omitting <tbody> or other required elements.
	thead: [ 1, "<table>", "</table>" ],
	col: [ 2, "<table><colgroup>", "</colgroup></table>" ],
	tr: [ 2, "<table><tbody>", "</tbody></table>" ],
	td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

	_default: [ 0, "", "" ]
};

// Support: IE <=9 only
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll( context, tag ) {

	// Support: IE <=9 - 11 only
	// Use typeof to avoid zero-argument method invocation on host objects (#15151)
	var ret;

	if ( typeof context.getElementsByTagName !== "undefined" ) {
		ret = context.getElementsByTagName( tag || "*" );

	} else if ( typeof context.querySelectorAll !== "undefined" ) {
		ret = context.querySelectorAll( tag || "*" );

	} else {
		ret = [];
	}

	if ( tag === undefined || tag && nodeName( context, tag ) ) {
		return jQuery.merge( [ context ], ret );
	}

	return ret;
}


// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		dataPriv.set(
			elems[ i ],
			"globalEval",
			!refElements || dataPriv.get( refElements[ i ], "globalEval" )
		);
	}
}


var rhtml = /<|&#?\w+;/;

function buildFragment( elems, context, scripts, selection, ignored ) {
	var elem, tmp, tag, wrap, contains, j,
		fragment = context.createDocumentFragment(),
		nodes = [],
		i = 0,
		l = elems.length;

	for ( ; i < l; i++ ) {
		elem = elems[ i ];

		if ( elem || elem === 0 ) {

			// Add nodes directly
			if ( toType( elem ) === "object" ) {

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

			// Convert non-html into a text node
			} else if ( !rhtml.test( elem ) ) {
				nodes.push( context.createTextNode( elem ) );

			// Convert html into DOM nodes
			} else {
				tmp = tmp || fragment.appendChild( context.createElement( "div" ) );

				// Deserialize a standard representation
				tag = ( rtagName.exec( elem ) || [ "", "" ] )[ 1 ].toLowerCase();
				wrap = wrapMap[ tag ] || wrapMap._default;
				tmp.innerHTML = wrap[ 1 ] + jQuery.htmlPrefilter( elem ) + wrap[ 2 ];

				// Descend through wrappers to the right content
				j = wrap[ 0 ];
				while ( j-- ) {
					tmp = tmp.lastChild;
				}

				// Support: Android <=4.0 only, PhantomJS 1 only
				// push.apply(_, arraylike) throws on ancient WebKit
				jQuery.merge( nodes, tmp.childNodes );

				// Remember the top-level container
				tmp = fragment.firstChild;

				// Ensure the created nodes are orphaned (#12392)
				tmp.textContent = "";
			}
		}
	}

	// Remove wrapper from fragment
	fragment.textContent = "";

	i = 0;
	while ( ( elem = nodes[ i++ ] ) ) {

		// Skip elements already in the context collection (trac-4087)
		if ( selection && jQuery.inArray( elem, selection ) > -1 ) {
			if ( ignored ) {
				ignored.push( elem );
			}
			continue;
		}

		contains = jQuery.contains( elem.ownerDocument, elem );

		// Append to fragment
		tmp = getAll( fragment.appendChild( elem ), "script" );

		// Preserve script evaluation history
		if ( contains ) {
			setGlobalEval( tmp );
		}

		// Capture executables
		if ( scripts ) {
			j = 0;
			while ( ( elem = tmp[ j++ ] ) ) {
				if ( rscriptType.test( elem.type || "" ) ) {
					scripts.push( elem );
				}
			}
		}
	}

	return fragment;
}


( function() {
	var fragment = document.createDocumentFragment(),
		div = fragment.appendChild( document.createElement( "div" ) ),
		input = document.createElement( "input" );

	// Support: Android 4.0 - 4.3 only
	// Check state lost if the name is set (#11217)
	// Support: Windows Web Apps (WWA)
	// `name` and `type` must use .setAttribute for WWA (#14901)
	input.setAttribute( "type", "radio" );
	input.setAttribute( "checked", "checked" );
	input.setAttribute( "name", "t" );

	div.appendChild( input );

	// Support: Android <=4.1 only
	// Older WebKit doesn't clone checked state correctly in fragments
	support.checkClone = div.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE <=11 only
	// Make sure textarea (and checkbox) defaultValue is properly cloned
	div.innerHTML = "<textarea>x</textarea>";
	support.noCloneChecked = !!div.cloneNode( true ).lastChild.defaultValue;
} )();
var documentElement = document.documentElement;



var
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

// Support: IE <=9 only
// See #13393 for more info
function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

function on( elem, types, selector, data, fn, one ) {
	var origFn, type;

	// Types can be a map of types/handlers
	if ( typeof types === "object" ) {

		// ( types-Object, selector, data )
		if ( typeof selector !== "string" ) {

			// ( types-Object, data )
			data = data || selector;
			selector = undefined;
		}
		for ( type in types ) {
			on( elem, type, selector, data, types[ type ], one );
		}
		return elem;
	}

	if ( data == null && fn == null ) {

		// ( types, fn )
		fn = selector;
		data = selector = undefined;
	} else if ( fn == null ) {
		if ( typeof selector === "string" ) {

			// ( types, selector, fn )
			fn = data;
			data = undefined;
		} else {

			// ( types, data, fn )
			fn = data;
			data = selector;
			selector = undefined;
		}
	}
	if ( fn === false ) {
		fn = returnFalse;
	} else if ( !fn ) {
		return elem;
	}

	if ( one === 1 ) {
		origFn = fn;
		fn = function( event ) {

			// Can use an empty set, since event contains the info
			jQuery().off( event );
			return origFn.apply( this, arguments );
		};

		// Use same guid so caller can remove using origFn
		fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
	}
	return elem.each( function() {
		jQuery.event.add( this, types, fn, data, selector );
	} );
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {

		var handleObjIn, eventHandle, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.get( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Ensure that invalid selectors throw exceptions at attach time
		// Evaluate against documentElement in case elem is a non-element node (e.g., document)
		if ( selector ) {
			jQuery.find.matchesSelector( documentElement, selector );
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !( events = elemData.events ) ) {
			events = elemData.events = {};
		}
		if ( !( eventHandle = elemData.handle ) ) {
			eventHandle = elemData.handle = function( e ) {

				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== "undefined" && jQuery.event.triggered !== e.type ?
					jQuery.event.dispatch.apply( elem, arguments ) : undefined;
			};
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend( {
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join( "." )
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !( handlers = events[ type ] ) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener if the special events handler returns false
				if ( !special.setup ||
					special.setup.call( elem, data, namespaces, eventHandle ) === false ) {

					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {

		var j, origCount, tmp,
			events, t, handleObj,
			special, handlers, type, namespaces, origType,
			elemData = dataPriv.hasData( elem ) && dataPriv.get( elem );

		if ( !elemData || !( events = elemData.events ) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( rnothtmlwhite ) || [ "" ];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[ t ] ) || [];
			type = origType = tmp[ 1 ];
			namespaces = ( tmp[ 2 ] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[ 2 ] &&
				new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector ||
						selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown ||
					special.teardown.call( elem, namespaces, elemData.handle ) === false ) {

					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove data and the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			dataPriv.remove( elem, "handle events" );
		}
	},

	dispatch: function( nativeEvent ) {

		// Make a writable jQuery.Event from the native event object
		var event = jQuery.event.fix( nativeEvent );

		var i, j, ret, matched, handleObj, handlerQueue,
			args = new Array( arguments.length ),
			handlers = ( dataPriv.get( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[ 0 ] = event;

		for ( i = 1; i < arguments.length; i++ ) {
			args[ i ] = arguments[ i ];
		}

		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( ( matched = handlerQueue[ i++ ] ) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( ( handleObj = matched.handlers[ j++ ] ) &&
				!event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or 2) have namespace(s)
				// a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.rnamespace || event.rnamespace.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( ( jQuery.event.special[ handleObj.origType ] || {} ).handle ||
						handleObj.handler ).apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( ( event.result = ret ) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var i, handleObj, sel, matchedHandlers, matchedSelectors,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		if ( delegateCount &&

			// Support: IE <=9
			// Black-hole SVG <use> instance trees (trac-13180)
			cur.nodeType &&

			// Support: Firefox <=42
			// Suppress spec-violating clicks indicating a non-primary pointer button (trac-3861)
			// https://www.w3.org/TR/DOM-Level-3-Events/#event-type-click
			// Support: IE 11 only
			// ...but not arrow key "clicks" of radio inputs, which can have `button` -1 (gh-2343)
			!( event.type === "click" && event.button >= 1 ) ) {

			for ( ; cur !== this; cur = cur.parentNode || this ) {

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && !( event.type === "click" && cur.disabled === true ) ) {
					matchedHandlers = [];
					matchedSelectors = {};
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matchedSelectors[ sel ] === undefined ) {
							matchedSelectors[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) > -1 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matchedSelectors[ sel ] ) {
							matchedHandlers.push( handleObj );
						}
					}
					if ( matchedHandlers.length ) {
						handlerQueue.push( { elem: cur, handlers: matchedHandlers } );
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		cur = this;
		if ( delegateCount < handlers.length ) {
			handlerQueue.push( { elem: cur, handlers: handlers.slice( delegateCount ) } );
		}

		return handlerQueue;
	},

	addProp: function( name, hook ) {
		Object.defineProperty( jQuery.Event.prototype, name, {
			enumerable: true,
			configurable: true,

			get: isFunction( hook ) ?
				function() {
					if ( this.originalEvent ) {
							return hook( this.originalEvent );
					}
				} :
				function() {
					if ( this.originalEvent ) {
							return this.originalEvent[ name ];
					}
				},

			set: function( value ) {
				Object.defineProperty( this, name, {
					enumerable: true,
					configurable: true,
					writable: true,
					value: value
				} );
			}
		} );
	},

	fix: function( originalEvent ) {
		return originalEvent[ jQuery.expando ] ?
			originalEvent :
			new jQuery.Event( originalEvent );
	},

	special: {
		load: {

			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {

			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					this.focus();
					return false;
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {

			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( this.type === "checkbox" && this.click && nodeName( this, "input" ) ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Support: Firefox 20+
				// Firefox doesn't alert if the returnValue field is not set.
				if ( event.result !== undefined && event.originalEvent ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}
};

jQuery.removeEvent = function( elem, type, handle ) {

	// This "if" is needed for plain objects
	if ( elem.removeEventListener ) {
		elem.removeEventListener( type, handle );
	}
};

jQuery.Event = function( src, props ) {

	// Allow instantiation without the 'new' keyword
	if ( !( this instanceof jQuery.Event ) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				// Support: Android <=2.3 only
				src.returnValue === false ?
			returnTrue :
			returnFalse;

		// Create target properties
		// Support: Safari <=6 - 7 only
		// Target should not be a text node (#504, #13143)
		this.target = ( src.target && src.target.nodeType === 3 ) ?
			src.target.parentNode :
			src.target;

		this.currentTarget = src.currentTarget;
		this.relatedTarget = src.relatedTarget;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || Date.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// https://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	constructor: jQuery.Event,
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,
	isSimulated: false,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;

		if ( e && !this.isSimulated ) {
			e.preventDefault();
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopPropagation();
		}
	},
	stopImmediatePropagation: function() {
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if ( e && !this.isSimulated ) {
			e.stopImmediatePropagation();
		}

		this.stopPropagation();
	}
};

// Includes all common event props including KeyEvent and MouseEvent specific props
jQuery.each( {
	altKey: true,
	bubbles: true,
	cancelable: true,
	changedTouches: true,
	ctrlKey: true,
	detail: true,
	eventPhase: true,
	metaKey: true,
	pageX: true,
	pageY: true,
	shiftKey: true,
	view: true,
	"char": true,
	charCode: true,
	key: true,
	keyCode: true,
	button: true,
	buttons: true,
	clientX: true,
	clientY: true,
	offsetX: true,
	offsetY: true,
	pointerId: true,
	pointerType: true,
	screenX: true,
	screenY: true,
	targetTouches: true,
	toElement: true,
	touches: true,

	which: function( event ) {
		var button = event.button;

		// Add which for key events
		if ( event.which == null && rkeyEvent.test( event.type ) ) {
			return event.charCode != null ? event.charCode : event.keyCode;
		}

		// Add which for click: 1 === left; 2 === middle; 3 === right
		if ( !event.which && button !== undefined && rmouseEvent.test( event.type ) ) {
			if ( button & 1 ) {
				return 1;
			}

			if ( button & 2 ) {
				return 3;
			}

			if ( button & 4 ) {
				return 2;
			}

			return 0;
		}

		return event.which;
	}
}, jQuery.event.addProp );

// Create mouseenter/leave events using mouseover/out and event-time checks
// so that event delegation works in jQuery.
// Do the same for pointerenter/pointerleave and pointerover/pointerout
//
// Support: Safari 7 only
// Safari sends mouseenter too often; see:
// https://bugs.chromium.org/p/chromium/issues/detail?id=470258
// for the description of the bug (it existed in older Chrome versions as well).
jQuery.each( {
	mouseenter: "mouseover",
	mouseleave: "mouseout",
	pointerenter: "pointerover",
	pointerleave: "pointerout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mouseenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || ( related !== target && !jQuery.contains( target, related ) ) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
} );

jQuery.fn.extend( {

	on: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn );
	},
	one: function( types, selector, data, fn ) {
		return on( this, types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {

			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ?
					handleObj.origType + "." + handleObj.namespace :
					handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {

			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {

			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each( function() {
			jQuery.event.remove( this, types, fn, selector );
		} );
	}
} );


var

	/* eslint-disable max-len */

	// See https://github.com/eslint/eslint/issues/3229
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,

	/* eslint-enable */

	// Support: IE <=10 - 11, Edge 12 - 13 only
	// In IE/Edge using regex groups here causes severe slowdowns.
	// See https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = /<script|<style|<link/i,

	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;

// Prefer a tbody over its parent table for containing new rows
function manipulationTarget( elem, content ) {
	if ( nodeName( elem, "table" ) &&
		nodeName( content.nodeType !== 11 ? content : content.firstChild, "tr" ) ) {

		return jQuery( elem ).children( "tbody" )[ 0 ] || elem;
	}

	return elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = ( elem.getAttribute( "type" ) !== null ) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	if ( ( elem.type || "" ).slice( 0, 5 ) === "true/" ) {
		elem.type = elem.type.slice( 5 );
	} else {
		elem.removeAttribute( "type" );
	}

	return elem;
}

function cloneCopyEvent( src, dest ) {
	var i, l, type, pdataOld, pdataCur, udataOld, udataCur, events;

	if ( dest.nodeType !== 1 ) {
		return;
	}

	// 1. Copy private data: events, handlers, etc.
	if ( dataPriv.hasData( src ) ) {
		pdataOld = dataPriv.access( src );
		pdataCur = dataPriv.set( dest, pdataOld );
		events = pdataOld.events;

		if ( events ) {
			delete pdataCur.handle;
			pdataCur.events = {};

			for ( type in events ) {
				for ( i = 0, l = events[ type ].length; i < l; i++ ) {
					jQuery.event.add( dest, type, events[ type ][ i ] );
				}
			}
		}
	}

	// 2. Copy user data
	if ( dataUser.hasData( src ) ) {
		udataOld = dataUser.access( src );
		udataCur = jQuery.extend( {}, udataOld );

		dataUser.set( dest, udataCur );
	}
}

// Fix IE bugs, see support tests
function fixInput( src, dest ) {
	var nodeName = dest.nodeName.toLowerCase();

	// Fails to persist the checked state of a cloned checkbox or radio button.
	if ( nodeName === "input" && rcheckableType.test( src.type ) ) {
		dest.checked = src.checked;

	// Fails to return the selected option to the default selected state when cloning options
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

function domManip( collection, args, callback, ignored ) {

	// Flatten any nested arrays
	args = concat.apply( [], args );

	var fragment, first, scripts, hasScripts, node, doc,
		i = 0,
		l = collection.length,
		iNoClone = l - 1,
		value = args[ 0 ],
		valueIsFunction = isFunction( value );

	// We can't cloneNode fragments that contain checked, in WebKit
	if ( valueIsFunction ||
			( l > 1 && typeof value === "string" &&
				!support.checkClone && rchecked.test( value ) ) ) {
		return collection.each( function( index ) {
			var self = collection.eq( index );
			if ( valueIsFunction ) {
				args[ 0 ] = value.call( this, index, self.html() );
			}
			domManip( self, args, callback, ignored );
		} );
	}

	if ( l ) {
		fragment = buildFragment( args, collection[ 0 ].ownerDocument, false, collection, ignored );
		first = fragment.firstChild;

		if ( fragment.childNodes.length === 1 ) {
			fragment = first;
		}

		// Require either new content or an interest in ignored elements to invoke the callback
		if ( first || ignored ) {
			scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
			hasScripts = scripts.length;

			// Use the original fragment for the last item
			// instead of the first because it can end up
			// being emptied incorrectly in certain situations (#8070).
			for ( ; i < l; i++ ) {
				node = fragment;

				if ( i !== iNoClone ) {
					node = jQuery.clone( node, true, true );

					// Keep references to cloned scripts for later restoration
					if ( hasScripts ) {

						// Support: Android <=4.0 only, PhantomJS 1 only
						// push.apply(_, arraylike) throws on ancient WebKit
						jQuery.merge( scripts, getAll( node, "script" ) );
					}
				}

				callback.call( collection[ i ], node, i );
			}

			if ( hasScripts ) {
				doc = scripts[ scripts.length - 1 ].ownerDocument;

				// Reenable scripts
				jQuery.map( scripts, restoreScript );

				// Evaluate executable scripts on first document insertion
				for ( i = 0; i < hasScripts; i++ ) {
					node = scripts[ i ];
					if ( rscriptType.test( node.type || "" ) &&
						!dataPriv.access( node, "globalEval" ) &&
						jQuery.contains( doc, node ) ) {

						if ( node.src && ( node.type || "" ).toLowerCase()  !== "module" ) {

							// Optional AJAX dependency, but won't run scripts if not present
							if ( jQuery._evalUrl ) {
								jQuery._evalUrl( node.src );
							}
						} else {
							DOMEval( node.textContent.replace( rcleanScript, "" ), doc, node );
						}
					}
				}
			}
		}
	}

	return collection;
}

function remove( elem, selector, keepData ) {
	var node,
		nodes = selector ? jQuery.filter( selector, elem ) : elem,
		i = 0;

	for ( ; ( node = nodes[ i ] ) != null; i++ ) {
		if ( !keepData && node.nodeType === 1 ) {
			jQuery.cleanData( getAll( node ) );
		}

		if ( node.parentNode ) {
			if ( keepData && jQuery.contains( node.ownerDocument, node ) ) {
				setGlobalEval( getAll( node, "script" ) );
			}
			node.parentNode.removeChild( node );
		}
	}

	return elem;
}

jQuery.extend( {
	htmlPrefilter: function( html ) {
		return html.replace( rxhtmlTag, "<$1></$2>" );
	},

	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var i, l, srcElements, destElements,
			clone = elem.cloneNode( true ),
			inPage = jQuery.contains( elem.ownerDocument, elem );

		// Fix IE cloning issues
		if ( !support.noCloneChecked && ( elem.nodeType === 1 || elem.nodeType === 11 ) &&
				!jQuery.isXMLDoc( elem ) ) {

			// We eschew Sizzle here for performance reasons: https://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			for ( i = 0, l = srcElements.length; i < l; i++ ) {
				fixInput( srcElements[ i ], destElements[ i ] );
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0, l = srcElements.length; i < l; i++ ) {
					cloneCopyEvent( srcElements[ i ], destElements[ i ] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		// Return the cloned set
		return clone;
	},

	cleanData: function( elems ) {
		var data, elem, type,
			special = jQuery.event.special,
			i = 0;

		for ( ; ( elem = elems[ i ] ) !== undefined; i++ ) {
			if ( acceptData( elem ) ) {
				if ( ( data = elem[ dataPriv.expando ] ) ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataPriv.expando ] = undefined;
				}
				if ( elem[ dataUser.expando ] ) {

					// Support: Chrome <=35 - 45+
					// Assign undefined instead of using delete, see Data#remove
					elem[ dataUser.expando ] = undefined;
				}
			}
		}
	}
} );

jQuery.fn.extend( {
	detach: function( selector ) {
		return remove( this, selector, true );
	},

	remove: function( selector ) {
		return remove( this, selector );
	},

	text: function( value ) {
		return access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().each( function() {
					if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
						this.textContent = value;
					}
				} );
		}, null, value, arguments.length );
	},

	append: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		} );
	},

	prepend: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		} );
	},

	before: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		} );
	},

	after: function() {
		return domManip( this, arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		} );
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; ( elem = this[ i ] ) != null; i++ ) {
			if ( elem.nodeType === 1 ) {

				// Prevent memory leaks
				jQuery.cleanData( getAll( elem, false ) );

				// Remove any remaining nodes
				elem.textContent = "";
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function() {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		} );
	},

	html: function( value ) {
		return access( this, function( value ) {
			var elem = this[ 0 ] || {},
				i = 0,
				l = this.length;

			if ( value === undefined && elem.nodeType === 1 ) {
				return elem.innerHTML;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				!wrapMap[ ( rtagName.exec( value ) || [ "", "" ] )[ 1 ].toLowerCase() ] ) {

				value = jQuery.htmlPrefilter( value );

				try {
					for ( ; i < l; i++ ) {
						elem = this[ i ] || {};

						// Remove element nodes and prevent memory leaks
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch ( e ) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var ignored = [];

		// Make the changes, replacing each non-ignored context element with the new content
		return domManip( this, arguments, function( elem ) {
			var parent = this.parentNode;

			if ( jQuery.inArray( this, ignored ) < 0 ) {
				jQuery.cleanData( getAll( this ) );
				if ( parent ) {
					parent.replaceChild( elem, this );
				}
			}

		// Force callback invocation
		}, ignored );
	}
} );

jQuery.each( {
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1,
			i = 0;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone( true );
			jQuery( insert[ i ] )[ original ]( elems );

			// Support: Android <=4.0 only, PhantomJS 1 only
			// .get() because push.apply(_, arraylike) throws on ancient WebKit
			push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
} );
var rnumnonpx = new RegExp( "^(" + pnum + ")(?!px)[a-z%]+$", "i" );

var getStyles = function( elem ) {

		// Support: IE <=11 only, Firefox <=30 (#15098, #14150)
		// IE throws on elements created in popups
		// FF meanwhile throws on frame elements through "defaultView.getComputedStyle"
		var view = elem.ownerDocument.defaultView;

		if ( !view || !view.opener ) {
			view = window;
		}

		return view.getComputedStyle( elem );
	};

var rboxStyle = new RegExp( cssExpand.join( "|" ), "i" );



( function() {

	// Executing both pixelPosition & boxSizingReliable tests require only one layout
	// so they're executed at the same time to save the second computation.
	function computeStyleTests() {

		// This is a singleton, we need to execute it only once
		if ( !div ) {
			return;
		}

		container.style.cssText = "position:absolute;left:-11111px;width:60px;" +
			"margin-top:1px;padding:0;border:0";
		div.style.cssText =
			"position:relative;display:block;box-sizing:border-box;overflow:scroll;" +
			"margin:auto;border:1px;padding:1px;" +
			"width:60%;top:1%";
		documentElement.appendChild( container ).appendChild( div );

		var divStyle = window.getComputedStyle( div );
		pixelPositionVal = divStyle.top !== "1%";

		// Support: Android 4.0 - 4.3 only, Firefox <=3 - 44
		reliableMarginLeftVal = roundPixelMeasures( divStyle.marginLeft ) === 12;

		// Support: Android 4.0 - 4.3 only, Safari <=9.1 - 10.1, iOS <=7.0 - 9.3
		// Some styles come back with percentage values, even though they shouldn't
		div.style.right = "60%";
		pixelBoxStylesVal = roundPixelMeasures( divStyle.right ) === 36;

		// Support: IE 9 - 11 only
		// Detect misreporting of content dimensions for box-sizing:border-box elements
		boxSizingReliableVal = roundPixelMeasures( divStyle.width ) === 36;

		// Support: IE 9 only
		// Detect overflow:scroll screwiness (gh-3699)
		div.style.position = "absolute";
		scrollboxSizeVal = div.offsetWidth === 36 || "absolute";

		documentElement.removeChild( container );

		// Nullify the div so it wouldn't be stored in the memory and
		// it will also be a sign that checks already performed
		div = null;
	}

	function roundPixelMeasures( measure ) {
		return Math.round( parseFloat( measure ) );
	}

	var pixelPositionVal, boxSizingReliableVal, scrollboxSizeVal, pixelBoxStylesVal,
		reliableMarginLeftVal,
		container = document.createElement( "div" ),
		div = document.createElement( "div" );

	// Finish early in limited (non-browser) environments
	if ( !div.style ) {
		return;
	}

	// Support: IE <=9 - 11 only
	// Style of cloned element affects source element cloned (#8908)
	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	jQuery.extend( support, {
		boxSizingReliable: function() {
			computeStyleTests();
			return boxSizingReliableVal;
		},
		pixelBoxStyles: function() {
			computeStyleTests();
			return pixelBoxStylesVal;
		},
		pixelPosition: function() {
			computeStyleTests();
			return pixelPositionVal;
		},
		reliableMarginLeft: function() {
			computeStyleTests();
			return reliableMarginLeftVal;
		},
		scrollboxSize: function() {
			computeStyleTests();
			return scrollboxSizeVal;
		}
	} );
} )();


function curCSS( elem, name, computed ) {
	var width, minWidth, maxWidth, ret,

		// Support: Firefox 51+
		// Retrieving style before computed somehow
		// fixes an issue with getting wrong values
		// on detached elements
		style = elem.style;

	computed = computed || getStyles( elem );

	// getPropertyValue is needed for:
	//   .css('filter') (IE 9 only, #12537)
	//   .css('--customProperty) (#3144)
	if ( computed ) {
		ret = computed.getPropertyValue( name ) || computed[ name ];

		if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
			ret = jQuery.style( elem, name );
		}

		// A tribute to the "awesome hack by Dean Edwards"
		// Android Browser returns percentage for some values,
		// but width seems to be reliably pixels.
		// This is against the CSSOM draft spec:
		// https://drafts.csswg.org/cssom/#resolved-values
		if ( !support.pixelBoxStyles() && rnumnonpx.test( ret ) && rboxStyle.test( name ) ) {

			// Remember the original values
			width = style.width;
			minWidth = style.minWidth;
			maxWidth = style.maxWidth;

			// Put in the new values to get a computed value out
			style.minWidth = style.maxWidth = style.width = ret;
			ret = computed.width;

			// Revert the changed values
			style.width = width;
			style.minWidth = minWidth;
			style.maxWidth = maxWidth;
		}
	}

	return ret !== undefined ?

		// Support: IE <=9 - 11 only
		// IE returns zIndex value as an integer.
		ret + "" :
		ret;
}


function addGetHookIf( conditionFn, hookFn ) {

	// Define the hook, we'll check on the first run if it's really needed.
	return {
		get: function() {
			if ( conditionFn() ) {

				// Hook not needed (or it's not possible to use it due
				// to missing dependency), remove it.
				delete this.get;
				return;
			}

			// Hook needed; redefine it so that the support test is not executed again.
			return ( this.get = hookFn ).apply( this, arguments );
		}
	};
}


var

	// Swappable if display is none or starts with table
	// except "table", "table-cell", or "table-caption"
	// See here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rcustomProp = /^--/,
	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: "0",
		fontWeight: "400"
	},

	cssPrefixes = [ "Webkit", "Moz", "ms" ],
	emptyStyle = document.createElement( "div" ).style;

// Return a css property mapped to a potentially vendor prefixed property
function vendorPropName( name ) {

	// Shortcut for names that are not vendor prefixed
	if ( name in emptyStyle ) {
		return name;
	}

	// Check for vendor prefixed names
	var capName = name[ 0 ].toUpperCase() + name.slice( 1 ),
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in emptyStyle ) {
			return name;
		}
	}
}

// Return a property mapped along what jQuery.cssProps suggests or to
// a vendor prefixed property.
function finalPropName( name ) {
	var ret = jQuery.cssProps[ name ];
	if ( !ret ) {
		ret = jQuery.cssProps[ name ] = vendorPropName( name ) || name;
	}
	return ret;
}

function setPositiveNumber( elem, value, subtract ) {

	// Any relative (+/-) values have already been
	// normalized at this point
	var matches = rcssNum.exec( value );
	return matches ?

		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 2 ] - ( subtract || 0 ) ) + ( matches[ 3 ] || "px" ) :
		value;
}

function boxModelAdjustment( elem, dimension, box, isBorderBox, styles, computedVal ) {
	var i = dimension === "width" ? 1 : 0,
		extra = 0,
		delta = 0;

	// Adjustment may not be necessary
	if ( box === ( isBorderBox ? "border" : "content" ) ) {
		return 0;
	}

	for ( ; i < 4; i += 2 ) {

		// Both box models exclude margin
		if ( box === "margin" ) {
			delta += jQuery.css( elem, box + cssExpand[ i ], true, styles );
		}

		// If we get here with a content-box, we're seeking "padding" or "border" or "margin"
		if ( !isBorderBox ) {

			// Add padding
			delta += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// For "border" or "margin", add border
			if ( box !== "padding" ) {
				delta += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );

			// But still keep track of it otherwise
			} else {
				extra += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}

		// If we get here with a border-box (content + padding + border), we're seeking "content" or
		// "padding" or "margin"
		} else {

			// For "content", subtract padding
			if ( box === "content" ) {
				delta -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// For "content" or "padding", subtract border
			if ( box !== "margin" ) {
				delta -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	// Account for positive content-box scroll gutter when requested by providing computedVal
	if ( !isBorderBox && computedVal >= 0 ) {

		// offsetWidth/offsetHeight is a rounded sum of content, padding, scroll gutter, and border
		// Assuming integer scroll gutter, subtract the rest and round down
		delta += Math.max( 0, Math.ceil(
			elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
			computedVal -
			delta -
			extra -
			0.5
		) );
	}

	return delta;
}

function getWidthOrHeight( elem, dimension, extra ) {

	// Start with computed style
	var styles = getStyles( elem ),
		val = curCSS( elem, dimension, styles ),
		isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
		valueIsBorderBox = isBorderBox;

	// Support: Firefox <=54
	// Return a confounding non-pixel value or feign ignorance, as appropriate.
	if ( rnumnonpx.test( val ) ) {
		if ( !extra ) {
			return val;
		}
		val = "auto";
	}

	// Check for style in case a browser which returns unreliable values
	// for getComputedStyle silently falls back to the reliable elem.style
	valueIsBorderBox = valueIsBorderBox &&
		( support.boxSizingReliable() || val === elem.style[ dimension ] );

	// Fall back to offsetWidth/offsetHeight when value is "auto"
	// This happens for inline elements with no explicit setting (gh-3571)
	// Support: Android <=4.1 - 4.3 only
	// Also use offsetWidth/offsetHeight for misreported inline dimensions (gh-3602)
	if ( val === "auto" ||
		!parseFloat( val ) && jQuery.css( elem, "display", false, styles ) === "inline" ) {

		val = elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ];

		// offsetWidth/offsetHeight provide border-box values
		valueIsBorderBox = true;
	}

	// Normalize "" and auto
	val = parseFloat( val ) || 0;

	// Adjust for the element's box model
	return ( val +
		boxModelAdjustment(
			elem,
			dimension,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles,

			// Provide the current computed size to request scroll gutter calculation (gh-3589)
			val
		)
	) + "px";
}

jQuery.extend( {

	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {

					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"animationIterationCount": true,
		"columnCount": true,
		"fillOpacity": true,
		"flexGrow": true,
		"flexShrink": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {

		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name ),
			style = elem.style;

		// Make sure that we're working with the right name. We don't
		// want to query the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Gets hook for the prefixed version, then unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// Convert "+=" or "-=" to relative numbers (#7345)
			if ( type === "string" && ( ret = rcssNum.exec( value ) ) && ret[ 1 ] ) {
				value = adjustCSS( elem, name, ret );

				// Fixes bug #9237
				type = "number";
			}

			// Make sure that null and NaN values aren't set (#7116)
			if ( value == null || value !== value ) {
				return;
			}

			// If a number was passed in, add the unit (except for certain CSS properties)
			if ( type === "number" ) {
				value += ret && ret[ 3 ] || ( jQuery.cssNumber[ origName ] ? "" : "px" );
			}

			// background-* props affect original clone's values
			if ( !support.clearCloneStyle && value === "" && name.indexOf( "background" ) === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !( "set" in hooks ) ||
				( value = hooks.set( elem, value, extra ) ) !== undefined ) {

				if ( isCustomProp ) {
					style.setProperty( name, value );
				} else {
					style[ name ] = value;
				}
			}

		} else {

			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks &&
				( ret = hooks.get( elem, false, extra ) ) !== undefined ) {

				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var val, num, hooks,
			origName = camelCase( name ),
			isCustomProp = rcustomProp.test( name );

		// Make sure that we're working with the right name. We don't
		// want to modify the value if it is a CSS custom property
		// since they are user-defined.
		if ( !isCustomProp ) {
			name = finalPropName( origName );
		}

		// Try prefixed name followed by the unprefixed name
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		// Convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Make numeric if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || isFinite( num ) ? num || 0 : val;
		}

		return val;
	}
} );

jQuery.each( [ "height", "width" ], function( i, dimension ) {
	jQuery.cssHooks[ dimension ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {

				// Certain elements can have dimension info if we invisibly show them
				// but it must have a current display style that would benefit
				return rdisplayswap.test( jQuery.css( elem, "display" ) ) &&

					// Support: Safari 8+
					// Table columns in Safari have non-zero offsetWidth & zero
					// getBoundingClientRect().width unless display is changed.
					// Support: IE <=11 only
					// Running getBoundingClientRect on a disconnected node
					// in IE throws an error.
					( !elem.getClientRects().length || !elem.getBoundingClientRect().width ) ?
						swap( elem, cssShow, function() {
							return getWidthOrHeight( elem, dimension, extra );
						} ) :
						getWidthOrHeight( elem, dimension, extra );
			}
		},

		set: function( elem, value, extra ) {
			var matches,
				styles = getStyles( elem ),
				isBorderBox = jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
				subtract = extra && boxModelAdjustment(
					elem,
					dimension,
					extra,
					isBorderBox,
					styles
				);

			// Account for unreliable border-box dimensions by comparing offset* to computed and
			// faking a content-box to get border and padding (gh-3699)
			if ( isBorderBox && support.scrollboxSize() === styles.position ) {
				subtract -= Math.ceil(
					elem[ "offset" + dimension[ 0 ].toUpperCase() + dimension.slice( 1 ) ] -
					parseFloat( styles[ dimension ] ) -
					boxModelAdjustment( elem, dimension, "border", false, styles ) -
					0.5
				);
			}

			// Convert to pixels if value adjustment is needed
			if ( subtract && ( matches = rcssNum.exec( value ) ) &&
				( matches[ 3 ] || "px" ) !== "px" ) {

				elem.style[ dimension ] = value;
				value = jQuery.css( elem, dimension );
			}

			return setPositiveNumber( elem, value, subtract );
		}
	};
} );

jQuery.cssHooks.marginLeft = addGetHookIf( support.reliableMarginLeft,
	function( elem, computed ) {
		if ( computed ) {
			return ( parseFloat( curCSS( elem, "marginLeft" ) ) ||
				elem.getBoundingClientRect().left -
					swap( elem, { marginLeft: 0 }, function() {
						return elem.getBoundingClientRect().left;
					} )
				) + "px";
		}
	}
);

// These hooks are used by animate to expand properties
jQuery.each( {
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// Assumes a single number if not a string
				parts = typeof value === "string" ? value.split( " " ) : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( prefix !== "margin" ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
} );

jQuery.fn.extend( {
	css: function( name, value ) {
		return access( this, function( elem, name, value ) {
			var styles, len,
				map = {},
				i = 0;

			if ( Array.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	}
} );


function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			// Use a property on the element directly when it is not a DOM element,
			// or when there is no matching style property that exists.
			if ( tween.elem.nodeType !== 1 ||
				tween.elem[ tween.prop ] != null && tween.elem.style[ tween.prop ] == null ) {
				return tween.elem[ tween.prop ];
			}

			// Passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails.
			// Simple values such as "10px" are parsed to Float;
			// complex values such as "rotate(1rad)" are returned as-is.
			result = jQuery.css( tween.elem, tween.prop, "" );

			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {

			// Use step hook for back compat.
			// Use cssHook if its there.
			// Use .style if available and use plain properties where available.
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.nodeType === 1 &&
				( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null ||
					jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9 only
// Panic based approach to setting things on disconnected nodes
Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p * Math.PI ) / 2;
	},
	_default: "swing"
};

jQuery.fx = Tween.prototype.init;

// Back compat <1.8 extension point
jQuery.fx.step = {};




var
	fxNow, inProgress,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rrun = /queueHooks$/;

function schedule() {
	if ( inProgress ) {
		if ( document.hidden === false && window.requestAnimationFrame ) {
			window.requestAnimationFrame( schedule );
		} else {
			window.setTimeout( schedule, jQuery.fx.interval );
		}

		jQuery.fx.tick();
	}
}

// Animations created synchronously will run synchronously
function createFxNow() {
	window.setTimeout( function() {
		fxNow = undefined;
	} );
	return ( fxNow = Date.now() );
}

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		i = 0,
		attrs = { height: type };

	// If we include width, step value is 1 to do all cssExpand values,
	// otherwise step value is 2 to skip over Left and Right
	includeWidth = includeWidth ? 1 : 0;
	for ( ; i < 4; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( Animation.tweeners[ prop ] || [] ).concat( Animation.tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( ( tween = collection[ index ].call( animation, prop, value ) ) ) {

			// We're done with this property
			return tween;
		}
	}
}

function defaultPrefilter( elem, props, opts ) {
	var prop, value, toggle, hooks, oldfire, propTween, restoreDisplay, display,
		isBox = "width" in props || "height" in props,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHiddenWithinTree( elem ),
		dataShow = dataPriv.get( elem, "fxshow" );

	// Queue-skipping animations hijack the fx hooks
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always( function() {

			// Ensure the complete handler is called before this completes
			anim.always( function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			} );
		} );
	}

	// Detect show/hide animations
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.test( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {

				// Pretend to be hidden if this is a "show" and
				// there is still data from a stopped show/hide
				if ( value === "show" && dataShow && dataShow[ prop ] !== undefined ) {
					hidden = true;

				// Ignore all other no-op show/hide data
				} else {
					continue;
				}
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	// Bail out if this is a no-op like .hide().hide()
	propTween = !jQuery.isEmptyObject( props );
	if ( !propTween && jQuery.isEmptyObject( orig ) ) {
		return;
	}

	// Restrict "overflow" and "display" styles during box animations
	if ( isBox && elem.nodeType === 1 ) {

		// Support: IE <=9 - 11, Edge 12 - 15
		// Record all 3 overflow attributes because IE does not infer the shorthand
		// from identically-valued overflowX and overflowY and Edge just mirrors
		// the overflowX value there.
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Identify a display type, preferring old show/hide data over the CSS cascade
		restoreDisplay = dataShow && dataShow.display;
		if ( restoreDisplay == null ) {
			restoreDisplay = dataPriv.get( elem, "display" );
		}
		display = jQuery.css( elem, "display" );
		if ( display === "none" ) {
			if ( restoreDisplay ) {
				display = restoreDisplay;
			} else {

				// Get nonempty value(s) by temporarily forcing visibility
				showHide( [ elem ], true );
				restoreDisplay = elem.style.display || restoreDisplay;
				display = jQuery.css( elem, "display" );
				showHide( [ elem ] );
			}
		}

		// Animate inline elements as inline-block
		if ( display === "inline" || display === "inline-block" && restoreDisplay != null ) {
			if ( jQuery.css( elem, "float" ) === "none" ) {

				// Restore the original display value at the end of pure show/hide animations
				if ( !propTween ) {
					anim.done( function() {
						style.display = restoreDisplay;
					} );
					if ( restoreDisplay == null ) {
						display = style.display;
						restoreDisplay = display === "none" ? "" : display;
					}
				}
				style.display = "inline-block";
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		anim.always( function() {
			style.overflow = opts.overflow[ 0 ];
			style.overflowX = opts.overflow[ 1 ];
			style.overflowY = opts.overflow[ 2 ];
		} );
	}

	// Implement show/hide animations
	propTween = false;
	for ( prop in orig ) {

		// General show/hide setup for this element animation
		if ( !propTween ) {
			if ( dataShow ) {
				if ( "hidden" in dataShow ) {
					hidden = dataShow.hidden;
				}
			} else {
				dataShow = dataPriv.access( elem, "fxshow", { display: restoreDisplay } );
			}

			// Store hidden/visible for toggle so `.stop().toggle()` "reverses"
			if ( toggle ) {
				dataShow.hidden = !hidden;
			}

			// Show elements before animating them
			if ( hidden ) {
				showHide( [ elem ], true );
			}

			/* eslint-disable no-loop-func */

			anim.done( function() {

			/* eslint-enable no-loop-func */

				// The final step of a "hide" animation is actually hiding the element
				if ( !hidden ) {
					showHide( [ elem ] );
				}
				dataPriv.remove( elem, "fxshow" );
				for ( prop in orig ) {
					jQuery.style( elem, prop, orig[ prop ] );
				}
			} );
		}

		// Per-property setup
		propTween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );
		if ( !( prop in dataShow ) ) {
			dataShow[ prop ] = propTween.start;
			if ( hidden ) {
				propTween.end = propTween.start;
				propTween.start = 0;
			}
		}
	}
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( Array.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// Not quite $.extend, this won't overwrite existing keys.
			// Reusing 'index' because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = Animation.prefilters.length,
		deferred = jQuery.Deferred().always( function() {

			// Don't match elem in the :animated selector
			delete tick.elem;
		} ),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),

				// Support: Android 2.3 only
				// Archaic crash bug won't allow us to use `1 - ( 0.5 || 0 )` (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ] );

			// If there's more to do, yield
			if ( percent < 1 && length ) {
				return remaining;
			}

			// If this was an empty animation, synthesize a final progress notification
			if ( !length ) {
				deferred.notifyWith( elem, [ animation, 1, 0 ] );
			}

			// Resolve the animation and report its conclusion
			deferred.resolveWith( elem, [ animation ] );
			return false;
		},
		animation = deferred.promise( {
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, {
				specialEasing: {},
				easing: jQuery.easing._default
			}, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,

					// If we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// Resolve when we played the last frame; otherwise, reject
				if ( gotoEnd ) {
					deferred.notifyWith( elem, [ animation, 1, 0 ] );
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		} ),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length; index++ ) {
		result = Animation.prefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			if ( isFunction( result.stop ) ) {
				jQuery._queueHooks( animation.elem, animation.opts.queue ).stop =
					result.stop.bind( result );
			}
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	// Attach callbacks from options
	animation
		.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		} )
	);

	return animation;
}

jQuery.Animation = jQuery.extend( Animation, {

	tweeners: {
		"*": [ function( prop, value ) {
			var tween = this.createTween( prop, value );
			adjustCSS( tween.elem, prop, rcssNum.exec( value ), tween );
			return tween;
		} ]
	},

	tweener: function( props, callback ) {
		if ( isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.match( rnothtmlwhite );
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length; index++ ) {
			prop = props[ index ];
			Animation.tweeners[ prop ] = Animation.tweeners[ prop ] || [];
			Animation.tweeners[ prop ].unshift( callback );
		}
	},

	prefilters: [ defaultPrefilter ],

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			Animation.prefilters.unshift( callback );
		} else {
			Animation.prefilters.push( callback );
		}
	}
} );

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !isFunction( easing ) && easing
	};

	// Go to the end state if fx are off
	if ( jQuery.fx.off ) {
		opt.duration = 0;

	} else {
		if ( typeof opt.duration !== "number" ) {
			if ( opt.duration in jQuery.fx.speeds ) {
				opt.duration = jQuery.fx.speeds[ opt.duration ];

			} else {
				opt.duration = jQuery.fx.speeds._default;
			}
		}
	}

	// Normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.fn.extend( {
	fadeTo: function( speed, to, easing, callback ) {

		// Show any hidden elements after setting opacity to 0
		return this.filter( isHiddenWithinTree ).css( "opacity", 0 ).show()

			// Animate to the value specified
			.end().animate( { opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {

				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || dataPriv.get( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each( function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = dataPriv.get( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this &&
					( type == null || timers[ index ].queue === type ) ) {

					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// Start the next in the queue if the last step wasn't forced.
			// Timers currently will call their complete callbacks, which
			// will dequeue but only if they were gotoEnd.
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		} );
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each( function() {
			var index,
				data = dataPriv.get( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// Enable finishing flag on private data
			data.finish = true;

			// Empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// Look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// Look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// Turn off finishing flag
			delete data.finish;
		} );
	}
} );

jQuery.each( [ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
} );

// Generate shortcuts for custom animations
jQuery.each( {
	slideDown: genFx( "show" ),
	slideUp: genFx( "hide" ),
	slideToggle: genFx( "toggle" ),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
} );

jQuery.timers = [];
jQuery.fx.tick = function() {
	var timer,
		i = 0,
		timers = jQuery.timers;

	fxNow = Date.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];

		// Run the timer and safely remove it when done (allowing for external removal)
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	jQuery.timers.push( timer );
	jQuery.fx.start();
};

jQuery.fx.interval = 13;
jQuery.fx.start = function() {
	if ( inProgress ) {
		return;
	}

	inProgress = true;
	schedule();
};

jQuery.fx.stop = function() {
	inProgress = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,

	// Default speed
	_default: 400
};


// Based off of the plugin by Clint Helfers, with permission.
// https://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function( time, type ) {
	time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
	type = type || "fx";

	return this.queue( type, function( next, hooks ) {
		var timeout = window.setTimeout( next, time );
		hooks.stop = function() {
			window.clearTimeout( timeout );
		};
	} );
};


( function() {
	var input = document.createElement( "input" ),
		select = document.createElement( "select" ),
		opt = select.appendChild( document.createElement( "option" ) );

	input.type = "checkbox";

	// Support: Android <=4.3 only
	// Default value for a checkbox should be "on"
	support.checkOn = input.value !== "";

	// Support: IE <=11 only
	// Must access selectedIndex to make default options select
	support.optSelected = opt.selected;

	// Support: IE <=11 only
	// An input loses its value after becoming a radio
	input = document.createElement( "input" );
	input.value = "t";
	input.type = "radio";
	support.radioValue = input.value === "t";
} )();


var boolHook,
	attrHandle = jQuery.expr.attrHandle;

jQuery.fn.extend( {
	attr: function( name, value ) {
		return access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each( function() {
			jQuery.removeAttr( this, name );
		} );
	}
} );

jQuery.extend( {
	attr: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set attributes on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === "undefined" ) {
			return jQuery.prop( elem, name, value );
		}

		// Attribute hooks are determined by the lowercase version
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			hooks = jQuery.attrHooks[ name.toLowerCase() ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : undefined );
		}

		if ( value !== undefined ) {
			if ( value === null ) {
				jQuery.removeAttr( elem, name );
				return;
			}

			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			elem.setAttribute( name, value + "" );
			return value;
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		ret = jQuery.find.attr( elem, name );

		// Non-existent attributes return null, we normalize to undefined
		return ret == null ? undefined : ret;
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !support.radioValue && value === "radio" &&
					nodeName( elem, "input" ) ) {
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	removeAttr: function( elem, value ) {
		var name,
			i = 0,

			// Attribute names can contain non-HTML whitespace characters
			// https://html.spec.whatwg.org/multipage/syntax.html#attributes-2
			attrNames = value && value.match( rnothtmlwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( ( name = attrNames[ i++ ] ) ) {
				elem.removeAttribute( name );
			}
		}
	}
} );

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {

			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else {
			elem.setAttribute( name, name );
		}
		return name;
	}
};

jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = attrHandle[ name ] || jQuery.find.attr;

	attrHandle[ name ] = function( elem, name, isXML ) {
		var ret, handle,
			lowercaseName = name.toLowerCase();

		if ( !isXML ) {

			// Avoid an infinite loop by temporarily removing this function from the getter
			handle = attrHandle[ lowercaseName ];
			attrHandle[ lowercaseName ] = ret;
			ret = getter( elem, name, isXML ) != null ?
				lowercaseName :
				null;
			attrHandle[ lowercaseName ] = handle;
		}
		return ret;
	};
} );




var rfocusable = /^(?:input|select|textarea|button)$/i,
	rclickable = /^(?:a|area)$/i;

jQuery.fn.extend( {
	prop: function( name, value ) {
		return access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		return this.each( function() {
			delete this[ jQuery.propFix[ name ] || name ];
		} );
	}
} );

jQuery.extend( {
	prop: function( elem, name, value ) {
		var ret, hooks,
			nType = elem.nodeType;

		// Don't get/set properties on text, comment and attribute nodes
		if ( nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {

			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			if ( hooks && "set" in hooks &&
				( ret = hooks.set( elem, value, name ) ) !== undefined ) {
				return ret;
			}

			return ( elem[ name ] = value );
		}

		if ( hooks && "get" in hooks && ( ret = hooks.get( elem, name ) ) !== null ) {
			return ret;
		}

		return elem[ name ];
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {

				// Support: IE <=9 - 11 only
				// elem.tabIndex doesn't always return the
				// correct value when it hasn't been explicitly set
				// https://web.archive.org/web/20141116233347/http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				if ( tabindex ) {
					return parseInt( tabindex, 10 );
				}

				if (
					rfocusable.test( elem.nodeName ) ||
					rclickable.test( elem.nodeName ) &&
					elem.href
				) {
					return 0;
				}

				return -1;
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	}
} );

// Support: IE <=11 only
// Accessing the selectedIndex property
// forces the browser to respect setting selected
// on the option
// The getter ensures a default option is selected
// when in an optgroup
// eslint rule "no-unused-expressions" is disabled for this code
// since it considers such accessions noop
if ( !support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent && parent.parentNode ) {
				parent.parentNode.selectedIndex;
			}
			return null;
		},
		set: function( elem ) {

			/* eslint no-unused-expressions: "off" */

			var parent = elem.parentNode;
			if ( parent ) {
				parent.selectedIndex;

				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each( [
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
} );




	// Strip and collapse whitespace according to HTML spec
	// https://infra.spec.whatwg.org/#strip-and-collapse-ascii-whitespace
	function stripAndCollapse( value ) {
		var tokens = value.match( rnothtmlwhite ) || [];
		return tokens.join( " " );
	}


function getClass( elem ) {
	return elem.getAttribute && elem.getAttribute( "class" ) || "";
}

function classesToArray( value ) {
	if ( Array.isArray( value ) ) {
		return value;
	}
	if ( typeof value === "string" ) {
		return value.match( rnothtmlwhite ) || [];
	}
	return [];
}

jQuery.fn.extend( {
	addClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).addClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, curValue, clazz, j, finalValue,
			i = 0;

		if ( isFunction( value ) ) {
			return this.each( function( j ) {
				jQuery( this ).removeClass( value.call( this, j, getClass( this ) ) );
			} );
		}

		if ( !arguments.length ) {
			return this.attr( "class", "" );
		}

		classes = classesToArray( value );

		if ( classes.length ) {
			while ( ( elem = this[ i++ ] ) ) {
				curValue = getClass( elem );

				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( " " + stripAndCollapse( curValue ) + " " );

				if ( cur ) {
					j = 0;
					while ( ( clazz = classes[ j++ ] ) ) {

						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) > -1 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}

					// Only assign if different to avoid unneeded rendering.
					finalValue = stripAndCollapse( cur );
					if ( curValue !== finalValue ) {
						elem.setAttribute( "class", finalValue );
					}
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value,
			isValidValue = type === "string" || Array.isArray( value );

		if ( typeof stateVal === "boolean" && isValidValue ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( isFunction( value ) ) {
			return this.each( function( i ) {
				jQuery( this ).toggleClass(
					value.call( this, i, getClass( this ), stateVal ),
					stateVal
				);
			} );
		}

		return this.each( function() {
			var className, i, self, classNames;

			if ( isValidValue ) {

				// Toggle individual class names
				i = 0;
				self = jQuery( this );
				classNames = classesToArray( value );

				while ( ( className = classNames[ i++ ] ) ) {

					// Check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( value === undefined || type === "boolean" ) {
				className = getClass( this );
				if ( className ) {

					// Store className if set
					dataPriv.set( this, "__className__", className );
				}

				// If the element has a class name or if we're passed `false`,
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				if ( this.setAttribute ) {
					this.setAttribute( "class",
						className || value === false ?
						"" :
						dataPriv.get( this, "__className__" ) || ""
					);
				}
			}
		} );
	},

	hasClass: function( selector ) {
		var className, elem,
			i = 0;

		className = " " + selector + " ";
		while ( ( elem = this[ i++ ] ) ) {
			if ( elem.nodeType === 1 &&
				( " " + stripAndCollapse( getClass( elem ) ) + " " ).indexOf( className ) > -1 ) {
					return true;
			}
		}

		return false;
	}
} );




var rreturn = /\r/g;

jQuery.fn.extend( {
	val: function( value ) {
		var hooks, ret, valueIsFunction,
			elem = this[ 0 ];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] ||
					jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks &&
					"get" in hooks &&
					( ret = hooks.get( elem, "value" ) ) !== undefined
				) {
					return ret;
				}

				ret = elem.value;

				// Handle most common string cases
				if ( typeof ret === "string" ) {
					return ret.replace( rreturn, "" );
				}

				// Handle cases where value is null/undef or number
				return ret == null ? "" : ret;
			}

			return;
		}

		valueIsFunction = isFunction( value );

		return this.each( function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( valueIsFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";

			} else if ( typeof val === "number" ) {
				val += "";

			} else if ( Array.isArray( val ) ) {
				val = jQuery.map( val, function( value ) {
					return value == null ? "" : value + "";
				} );
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !( "set" in hooks ) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		} );
	}
} );

jQuery.extend( {
	valHooks: {
		option: {
			get: function( elem ) {

				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :

					// Support: IE <=10 - 11 only
					// option.text throws exceptions (#14686, #14858)
					// Strip and collapse whitespace
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					stripAndCollapse( jQuery.text( elem ) );
			}
		},
		select: {
			get: function( elem ) {
				var value, option, i,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one",
					values = one ? null : [],
					max = one ? index + 1 : options.length;

				if ( index < 0 ) {
					i = max;

				} else {
					i = one ? index : 0;
				}

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// Support: IE <=9 only
					// IE8-9 doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&

							// Don't return options that are disabled or in a disabled optgroup
							!option.disabled &&
							( !option.parentNode.disabled ||
								!nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];

					/* eslint-disable no-cond-assign */

					if ( option.selected =
						jQuery.inArray( jQuery.valHooks.option.get( option ), values ) > -1
					) {
						optionSet = true;
					}

					/* eslint-enable no-cond-assign */
				}

				// Force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	}
} );

// Radios and checkboxes getter/setter
jQuery.each( [ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( Array.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery( elem ).val(), value ) > -1 );
			}
		}
	};
	if ( !support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			return elem.getAttribute( "value" ) === null ? "on" : elem.value;
		};
	}
} );




// Return jQuery for attributes-only inclusion


support.focusin = "onfocusin" in window;


var rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	stopPropagationCallback = function( e ) {
		e.stopPropagation();
	};

jQuery.extend( jQuery.event, {

	trigger: function( event, data, elem, onlyHandlers ) {

		var i, cur, tmp, bubbleType, ontype, handle, special, lastElement,
			eventPath = [ elem || document ],
			type = hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = hasOwn.call( event, "namespace" ) ? event.namespace.split( "." ) : [];

		cur = lastElement = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf( "." ) > -1 ) {

			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split( "." );
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf( ":" ) < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join( "." );
		event.rnamespace = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join( "\\.(?:.*\\.|)" ) + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === ( elem.ownerDocument || document ) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( ( cur = eventPath[ i++ ] ) && !event.isPropagationStopped() ) {
			lastElement = cur;
			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( dataPriv.get( cur, "events" ) || {} )[ event.type ] &&
				dataPriv.get( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && handle.apply && acceptData( cur ) ) {
				event.result = handle.apply( cur, data );
				if ( event.result === false ) {
					event.preventDefault();
				}
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( ( !special._default ||
				special._default.apply( eventPath.pop(), data ) === false ) &&
				acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name as the event.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && isFunction( elem[ type ] ) && !isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;

					if ( event.isPropagationStopped() ) {
						lastElement.addEventListener( type, stopPropagationCallback );
					}

					elem[ type ]();

					if ( event.isPropagationStopped() ) {
						lastElement.removeEventListener( type, stopPropagationCallback );
					}

					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	// Piggyback on a donor event to simulate a different one
	// Used only for `focus(in | out)` events
	simulate: function( type, elem, event ) {
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true
			}
		);

		jQuery.event.trigger( e, null, elem );
	}

} );

jQuery.fn.extend( {

	trigger: function( type, data ) {
		return this.each( function() {
			jQuery.event.trigger( type, data, this );
		} );
	},
	triggerHandler: function( type, data ) {
		var elem = this[ 0 ];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
} );


// Support: Firefox <=44
// Firefox doesn't have focus(in | out) events
// Related ticket - https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
// Support: Chrome <=48 - 49, Safari <=9.0 - 9.1
// focus(in | out) events fire after focus & blur events,
// which is spec violation - http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
// Related ticket - https://bugs.chromium.org/p/chromium/issues/detail?id=449857
if ( !support.focusin ) {
	jQuery.each( { focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler on the document while someone wants focusin/focusout
		var handler = function( event ) {
			jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ) );
		};

		jQuery.event.special[ fix ] = {
			setup: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix );

				if ( !attaches ) {
					doc.addEventListener( orig, handler, true );
				}
				dataPriv.access( doc, fix, ( attaches || 0 ) + 1 );
			},
			teardown: function() {
				var doc = this.ownerDocument || this,
					attaches = dataPriv.access( doc, fix ) - 1;

				if ( !attaches ) {
					doc.removeEventListener( orig, handler, true );
					dataPriv.remove( doc, fix );

				} else {
					dataPriv.access( doc, fix, attaches );
				}
			}
		};
	} );
}
var location = window.location;

var nonce = Date.now();

var rquery = ( /\?/ );



// Cross-browser xml parsing
jQuery.parseXML = function( data ) {
	var xml;
	if ( !data || typeof data !== "string" ) {
		return null;
	}

	// Support: IE 9 - 11 only
	// IE throws on parseFromString with invalid input.
	try {
		xml = ( new window.DOMParser() ).parseFromString( data, "text/xml" );
	} catch ( e ) {
		xml = undefined;
	}

	if ( !xml || xml.getElementsByTagName( "parsererror" ).length ) {
		jQuery.error( "Invalid XML: " + data );
	}
	return xml;
};


var
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( Array.isArray( obj ) ) {

		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {

				// Treat each array item as a scalar.
				add( prefix, v );

			} else {

				// Item is non-scalar (array or object), encode its numeric index.
				buildParams(
					prefix + "[" + ( typeof v === "object" && v != null ? i : "" ) + "]",
					v,
					traditional,
					add
				);
			}
		} );

	} else if ( !traditional && toType( obj ) === "object" ) {

		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {

		// Serialize scalar item.
		add( prefix, obj );
	}
}

// Serialize an array of form elements or a set of
// key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, valueOrFunction ) {

			// If value is a function, invoke it and use its return value
			var value = isFunction( valueOrFunction ) ?
				valueOrFunction() :
				valueOrFunction;

			s[ s.length ] = encodeURIComponent( key ) + "=" +
				encodeURIComponent( value == null ? "" : value );
		};

	// If an array was passed in, assume that it is an array of form elements.
	if ( Array.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {

		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		} );

	} else {

		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" );
};

jQuery.fn.extend( {
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map( function() {

			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		} )
		.filter( function() {
			var type = this.type;

			// Use .is( ":disabled" ) so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !rcheckableType.test( type ) );
		} )
		.map( function( i, elem ) {
			var val = jQuery( this ).val();

			if ( val == null ) {
				return null;
			}

			if ( Array.isArray( val ) ) {
				return jQuery.map( val, function( val ) {
					return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
				} );
			}

			return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		} ).get();
	}
} );


var
	r20 = /%20/g,
	rhash = /#.*$/,
	rantiCache = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)$/mg,

	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat( "*" ),

	// Anchor tag for parsing the document origin
	originAnchor = document.createElement( "a" );
	originAnchor.href = location.href;

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( rnothtmlwhite ) || [];

		if ( isFunction( func ) ) {

			// For each dataType in the dataTypeExpression
			while ( ( dataType = dataTypes[ i++ ] ) ) {

				// Prepend if requested
				if ( dataType[ 0 ] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					( structure[ dataType ] = structure[ dataType ] || [] ).unshift( func );

				// Otherwise append
				} else {
					( structure[ dataType ] = structure[ dataType ] || [] ).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if ( typeof dataTypeOrTransport === "string" &&
				!seekingTransport && !inspected[ dataTypeOrTransport ] ) {

				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		} );
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var key, deep,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || ( deep = {} ) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {

	var ct, type, finalDataType, firstDataType,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while ( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader( "Content-Type" );
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {

		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[ 0 ] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}

		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},

		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {

								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s.throws ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return {
								state: "parsererror",
								error: conv ? e : "No conversion from " + prev + " to " + current
							};
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}

jQuery.extend( {

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: location.href,
		type: "GET",
		isLocal: rlocalProtocol.test( location.protocol ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",

		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /\bxml\b/,
			html: /\bhtml/,
			json: /\bjson\b/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": JSON.parse,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var transport,

			// URL without anti-cache param
			cacheURL,

			// Response headers
			responseHeadersString,
			responseHeaders,

			// timeout handle
			timeoutTimer,

			// Url cleanup var
			urlAnchor,

			// Request state (becomes false upon send and true upon completion)
			completed,

			// To know if global events are to be dispatched
			fireGlobals,

			// Loop variable
			i,

			// uncached part of the url
			uncached,

			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),

			// Callbacks context
			callbackContext = s.context || s,

			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context &&
				( callbackContext.nodeType || callbackContext.jquery ) ?
					jQuery( callbackContext ) :
					jQuery.event,

			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks( "once memory" ),

			// Status-dependent callbacks
			statusCode = s.statusCode || {},

			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},

			// Default abort message
			strAbort = "canceled",

			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( completed ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( ( match = rheaders.exec( responseHeadersString ) ) ) {
								responseHeaders[ match[ 1 ].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return completed ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					if ( completed == null ) {
						name = requestHeadersNames[ name.toLowerCase() ] =
							requestHeadersNames[ name.toLowerCase() ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( completed == null ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( completed ) {

							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						} else {

							// Lazy-add the new callbacks in a way that preserves old ones
							for ( code in map ) {
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR );

		// Add protocol if not provided (prefilters might expect it)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || location.href ) + "" )
			.replace( rprotocol, location.protocol + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = ( s.dataType || "*" ).toLowerCase().match( rnothtmlwhite ) || [ "" ];

		// A cross-domain request is in order when the origin doesn't match the current origin.
		if ( s.crossDomain == null ) {
			urlAnchor = document.createElement( "a" );

			// Support: IE <=8 - 11, Edge 12 - 15
			// IE throws exception on accessing the href property if url is malformed,
			// e.g. http://example.com:80x/
			try {
				urlAnchor.href = s.url;

				// Support: IE <=8 - 11 only
				// Anchor's host property isn't correctly set when s.url is relative
				urlAnchor.href = urlAnchor.href;
				s.crossDomain = originAnchor.protocol + "//" + originAnchor.host !==
					urlAnchor.protocol + "//" + urlAnchor.host;
			} catch ( e ) {

				// If there is an error parsing the URL, assume it is crossDomain,
				// it can be rejected by the transport if it is invalid
				s.crossDomain = true;
			}
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( completed ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		// Don't fire events if jQuery.event is undefined in an AMD-usage scenario (#15118)
		fireGlobals = jQuery.event && s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger( "ajaxStart" );
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		// Remove hash to simplify url manipulation
		cacheURL = s.url.replace( rhash, "" );

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// Remember the hash so we can put it back
			uncached = s.url.slice( cacheURL.length );

			// If data is available and should be processed, append data to url
			if ( s.data && ( s.processData || typeof s.data === "string" ) ) {
				cacheURL += ( rquery.test( cacheURL ) ? "&" : "?" ) + s.data;

				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add or update anti-cache param if needed
			if ( s.cache === false ) {
				cacheURL = cacheURL.replace( rantiCache, "$1" );
				uncached = ( rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ( nonce++ ) + uncached;
			}

			// Put hash and anti-cache on the URL that will be requested (gh-1732)
			s.url = cacheURL + uncached;

		// Change '%20' to '+' if this is encoded form body content (gh-2658)
		} else if ( s.data && s.processData &&
			( s.contentType || "" ).indexOf( "application/x-www-form-urlencoded" ) === 0 ) {
			s.data = s.data.replace( r20, "+" );
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[ 0 ] ] ?
				s.accepts[ s.dataTypes[ 0 ] ] +
					( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend &&
			( s.beforeSend.call( callbackContext, jqXHR, s ) === false || completed ) ) {

			// Abort if not done already and return
			return jqXHR.abort();
		}

		// Aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		completeDeferred.add( s.complete );
		jqXHR.done( s.success );
		jqXHR.fail( s.error );

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}

			// If request was aborted inside ajaxSend, stop there
			if ( completed ) {
				return jqXHR;
			}

			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = window.setTimeout( function() {
					jqXHR.abort( "timeout" );
				}, s.timeout );
			}

			try {
				completed = false;
				transport.send( requestHeaders, done );
			} catch ( e ) {

				// Rethrow post-completion exceptions
				if ( completed ) {
					throw e;
				}

				// Propagate others as results
				done( -1, e );
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Ignore repeat invocations
			if ( completed ) {
				return;
			}

			completed = true;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				window.clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader( "Last-Modified" );
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader( "etag" );
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {

				// Extract error from statusText and normalize for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );

				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger( "ajaxStop" );
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
} );

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {

		// Shift arguments if data argument was omitted
		if ( isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		// The url can be an options object (which then must have .url)
		return jQuery.ajax( jQuery.extend( {
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		}, jQuery.isPlainObject( url ) && url ) );
	};
} );


jQuery._evalUrl = function( url ) {
	return jQuery.ajax( {
		url: url,

		// Make this explicit, since user can override this through ajaxSetup (#11264)
		type: "GET",
		dataType: "script",
		cache: true,
		async: false,
		global: false,
		"throws": true
	} );
};


jQuery.fn.extend( {
	wrapAll: function( html ) {
		var wrap;

		if ( this[ 0 ] ) {
			if ( isFunction( html ) ) {
				html = html.call( this[ 0 ] );
			}

			// The elements to wrap the target around
			wrap = jQuery( html, this[ 0 ].ownerDocument ).eq( 0 ).clone( true );

			if ( this[ 0 ].parentNode ) {
				wrap.insertBefore( this[ 0 ] );
			}

			wrap.map( function() {
				var elem = this;

				while ( elem.firstElementChild ) {
					elem = elem.firstElementChild;
				}

				return elem;
			} ).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( isFunction( html ) ) {
			return this.each( function( i ) {
				jQuery( this ).wrapInner( html.call( this, i ) );
			} );
		}

		return this.each( function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		} );
	},

	wrap: function( html ) {
		var htmlIsFunction = isFunction( html );

		return this.each( function( i ) {
			jQuery( this ).wrapAll( htmlIsFunction ? html.call( this, i ) : html );
		} );
	},

	unwrap: function( selector ) {
		this.parent( selector ).not( "body" ).each( function() {
			jQuery( this ).replaceWith( this.childNodes );
		} );
		return this;
	}
} );


jQuery.expr.pseudos.hidden = function( elem ) {
	return !jQuery.expr.pseudos.visible( elem );
};
jQuery.expr.pseudos.visible = function( elem ) {
	return !!( elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length );
};




jQuery.ajaxSettings.xhr = function() {
	try {
		return new window.XMLHttpRequest();
	} catch ( e ) {}
};

var xhrSuccessStatus = {

		// File protocol always yields status code 0, assume 200
		0: 200,

		// Support: IE <=9 only
		// #1450: sometimes IE returns 1223 when it should be 204
		1223: 204
	},
	xhrSupported = jQuery.ajaxSettings.xhr();

support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
support.ajax = xhrSupported = !!xhrSupported;

jQuery.ajaxTransport( function( options ) {
	var callback, errorCallback;

	// Cross domain only allowed if supported through XMLHttpRequest
	if ( support.cors || xhrSupported && !options.crossDomain ) {
		return {
			send: function( headers, complete ) {
				var i,
					xhr = options.xhr();

				xhr.open(
					options.type,
					options.url,
					options.async,
					options.username,
					options.password
				);

				// Apply custom fields if provided
				if ( options.xhrFields ) {
					for ( i in options.xhrFields ) {
						xhr[ i ] = options.xhrFields[ i ];
					}
				}

				// Override mime type if needed
				if ( options.mimeType && xhr.overrideMimeType ) {
					xhr.overrideMimeType( options.mimeType );
				}

				// X-Requested-With header
				// For cross-domain requests, seeing as conditions for a preflight are
				// akin to a jigsaw puzzle, we simply never set it to be sure.
				// (it can always be set on a per-request basis or even using ajaxSetup)
				// For same-domain requests, won't change header if already provided.
				if ( !options.crossDomain && !headers[ "X-Requested-With" ] ) {
					headers[ "X-Requested-With" ] = "XMLHttpRequest";
				}

				// Set headers
				for ( i in headers ) {
					xhr.setRequestHeader( i, headers[ i ] );
				}

				// Callback
				callback = function( type ) {
					return function() {
						if ( callback ) {
							callback = errorCallback = xhr.onload =
								xhr.onerror = xhr.onabort = xhr.ontimeout =
									xhr.onreadystatechange = null;

							if ( type === "abort" ) {
								xhr.abort();
							} else if ( type === "error" ) {

								// Support: IE <=9 only
								// On a manual native abort, IE9 throws
								// errors on any property access that is not readyState
								if ( typeof xhr.status !== "number" ) {
									complete( 0, "error" );
								} else {
									complete(

										// File: protocol always yields status 0; see #8605, #14207
										xhr.status,
										xhr.statusText
									);
								}
							} else {
								complete(
									xhrSuccessStatus[ xhr.status ] || xhr.status,
									xhr.statusText,

									// Support: IE <=9 only
									// IE9 has no XHR2 but throws on binary (trac-11426)
									// For XHR2 non-text, let the caller handle it (gh-2498)
									( xhr.responseType || "text" ) !== "text"  ||
									typeof xhr.responseText !== "string" ?
										{ binary: xhr.response } :
										{ text: xhr.responseText },
									xhr.getAllResponseHeaders()
								);
							}
						}
					};
				};

				// Listen to events
				xhr.onload = callback();
				errorCallback = xhr.onerror = xhr.ontimeout = callback( "error" );

				// Support: IE 9 only
				// Use onreadystatechange to replace onabort
				// to handle uncaught aborts
				if ( xhr.onabort !== undefined ) {
					xhr.onabort = errorCallback;
				} else {
					xhr.onreadystatechange = function() {

						// Check readyState before timeout as it changes
						if ( xhr.readyState === 4 ) {

							// Allow onerror to be called first,
							// but that will not handle a native abort
							// Also, save errorCallback to a variable
							// as xhr.onerror cannot be accessed
							window.setTimeout( function() {
								if ( callback ) {
									errorCallback();
								}
							} );
						}
					};
				}

				// Create the abort callback
				callback = callback( "abort" );

				try {

					// Do send the request (this may raise an exception)
					xhr.send( options.hasContent && options.data || null );
				} catch ( e ) {

					// #14683: Only rethrow if this hasn't been notified as an error yet
					if ( callback ) {
						throw e;
					}
				}
			},

			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




// Prevent auto-execution of scripts when no explicit dataType was provided (See gh-2432)
jQuery.ajaxPrefilter( function( s ) {
	if ( s.crossDomain ) {
		s.contents.script = false;
	}
} );

// Install script dataType
jQuery.ajaxSetup( {
	accepts: {
		script: "text/javascript, application/javascript, " +
			"application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /\b(?:java|ecma)script\b/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
} );

// Handle cache's special case and crossDomain
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
	}
} );

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function( s ) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {
		var script, callback;
		return {
			send: function( _, complete ) {
				script = jQuery( "<script>" ).prop( {
					charset: s.scriptCharset,
					src: s.url
				} ).on(
					"load error",
					callback = function( evt ) {
						script.remove();
						callback = null;
						if ( evt ) {
							complete( evt.type === "error" ? 404 : 200, evt.type );
						}
					}
				);

				// Use native DOM manipulation to avoid our domManip AJAX trickery
				document.head.appendChild( script[ 0 ] );
			},
			abort: function() {
				if ( callback ) {
					callback();
				}
			}
		};
	}
} );




var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup( {
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
} );

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" &&
				( s.contentType || "" )
					.indexOf( "application/x-www-form-urlencoded" ) === 0 &&
				rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters[ "script json" ] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// Force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always( function() {

			// If previous value didn't exist - remove it
			if ( overwritten === undefined ) {
				jQuery( window ).removeProp( callbackName );

			// Otherwise restore preexisting value
			} else {
				window[ callbackName ] = overwritten;
			}

			// Save back as free
			if ( s[ callbackName ] ) {

				// Make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// Save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		} );

		// Delegate to script
		return "script";
	}
} );




// Support: Safari 8 only
// In Safari 8 documents created via document.implementation.createHTMLDocument
// collapse sibling forms: the second one becomes a child of the first one.
// Because of that, this security measure has to be disabled in Safari 8.
// https://bugs.webkit.org/show_bug.cgi?id=137337
support.createHTMLDocument = ( function() {
	var body = document.implementation.createHTMLDocument( "" ).body;
	body.innerHTML = "<form></form><form></form>";
	return body.childNodes.length === 2;
} )();


// Argument "data" should be string of html
// context (optional): If specified, the fragment will be created in this context,
// defaults to document
// keepScripts (optional): If true, will include scripts passed in the html string
jQuery.parseHTML = function( data, context, keepScripts ) {
	if ( typeof data !== "string" ) {
		return [];
	}
	if ( typeof context === "boolean" ) {
		keepScripts = context;
		context = false;
	}

	var base, parsed, scripts;

	if ( !context ) {

		// Stop scripts or inline event handlers from being executed immediately
		// by using document.implementation
		if ( support.createHTMLDocument ) {
			context = document.implementation.createHTMLDocument( "" );

			// Set the base href for the created document
			// so any parsed elements with URLs
			// are based on the document's URL (gh-2965)
			base = context.createElement( "base" );
			base.href = document.location.href;
			context.head.appendChild( base );
		} else {
			context = document;
		}
	}

	parsed = rsingleTag.exec( data );
	scripts = !keepScripts && [];

	// Single tag
	if ( parsed ) {
		return [ context.createElement( parsed[ 1 ] ) ];
	}

	parsed = buildFragment( [ data ], context, scripts );

	if ( scripts && scripts.length ) {
		jQuery( scripts ).remove();
	}

	return jQuery.merge( [], parsed.childNodes );
};


/**
 * Load a url into a page
 */
jQuery.fn.load = function( url, params, callback ) {
	var selector, type, response,
		self = this,
		off = url.indexOf( " " );

	if ( off > -1 ) {
		selector = stripAndCollapse( url.slice( off ) );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax( {
			url: url,

			// If "type" variable is undefined, then "GET" method will be used.
			// Make value of this field explicit since
			// user can override it through ajaxSetup method
			type: type || "GET",
			dataType: "html",
			data: params
		} ).done( function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery( "<div>" ).append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		// If the request succeeds, this function gets "data", "status", "jqXHR"
		// but they are ignored because response was set above.
		// If it fails, this function gets "jqXHR", "status", "error"
		} ).always( callback && function( jqXHR, status ) {
			self.each( function() {
				callback.apply( this, response || [ jqXHR.responseText, status, jqXHR ] );
			} );
		} );
	}

	return this;
};




// Attach a bunch of functions for handling common AJAX events
jQuery.each( [
	"ajaxStart",
	"ajaxStop",
	"ajaxComplete",
	"ajaxError",
	"ajaxSuccess",
	"ajaxSend"
], function( i, type ) {
	jQuery.fn[ type ] = function( fn ) {
		return this.on( type, fn );
	};
} );




jQuery.expr.pseudos.animated = function( elem ) {
	return jQuery.grep( jQuery.timers, function( fn ) {
		return elem === fn.elem;
	} ).length;
};




jQuery.offset = {
	setOffset: function( elem, options, i ) {
		var curPosition, curLeft, curCSSTop, curTop, curOffset, curCSSLeft, calculatePosition,
			position = jQuery.css( elem, "position" ),
			curElem = jQuery( elem ),
			props = {};

		// Set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		curOffset = curElem.offset();
		curCSSTop = jQuery.css( elem, "top" );
		curCSSLeft = jQuery.css( elem, "left" );
		calculatePosition = ( position === "absolute" || position === "fixed" ) &&
			( curCSSTop + curCSSLeft ).indexOf( "auto" ) > -1;

		// Need to be able to calculate position if either
		// top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;

		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( isFunction( options ) ) {

			// Use jQuery.extend here to allow modification of coordinates argument (gh-1848)
			options = options.call( elem, i, jQuery.extend( {}, curOffset ) );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );

		} else {
			curElem.css( props );
		}
	}
};

jQuery.fn.extend( {

	// offset() relates an element's border box to the document origin
	offset: function( options ) {

		// Preserve chaining for setter
		if ( arguments.length ) {
			return options === undefined ?
				this :
				this.each( function( i ) {
					jQuery.offset.setOffset( this, options, i );
				} );
		}

		var rect, win,
			elem = this[ 0 ];

		if ( !elem ) {
			return;
		}

		// Return zeros for disconnected and hidden (display: none) elements (gh-2310)
		// Support: IE <=11 only
		// Running getBoundingClientRect on a
		// disconnected node in IE throws an error
		if ( !elem.getClientRects().length ) {
			return { top: 0, left: 0 };
		}

		// Get document-relative position by adding viewport scroll to viewport-relative gBCR
		rect = elem.getBoundingClientRect();
		win = elem.ownerDocument.defaultView;
		return {
			top: rect.top + win.pageYOffset,
			left: rect.left + win.pageXOffset
		};
	},

	// position() relates an element's margin box to its offset parent's padding box
	// This corresponds to the behavior of CSS absolute positioning
	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset, doc,
			elem = this[ 0 ],
			parentOffset = { top: 0, left: 0 };

		// position:fixed elements are offset from the viewport, which itself always has zero offset
		if ( jQuery.css( elem, "position" ) === "fixed" ) {

			// Assume position:fixed implies availability of getBoundingClientRect
			offset = elem.getBoundingClientRect();

		} else {
			offset = this.offset();

			// Account for the *real* offset parent, which can be the document or its root element
			// when a statically positioned element is identified
			doc = elem.ownerDocument;
			offsetParent = elem.offsetParent || doc.documentElement;
			while ( offsetParent &&
				( offsetParent === doc.body || offsetParent === doc.documentElement ) &&
				jQuery.css( offsetParent, "position" ) === "static" ) {

				offsetParent = offsetParent.parentNode;
			}
			if ( offsetParent && offsetParent !== elem && offsetParent.nodeType === 1 ) {

				// Incorporate borders into its offset, since they are outside its content origin
				parentOffset = jQuery( offsetParent ).offset();
				parentOffset.top += jQuery.css( offsetParent, "borderTopWidth", true );
				parentOffset.left += jQuery.css( offsetParent, "borderLeftWidth", true );
			}
		}

		// Subtract parent offsets and element margins
		return {
			top: offset.top - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true )
		};
	},

	// This method will return documentElement in the following cases:
	// 1) For the element inside the iframe without offsetParent, this method will return
	//    documentElement of the parent window
	// 2) For the hidden or detached element
	// 3) For body or html element, i.e. in case of the html node - it will return itself
	//
	// but those exceptions were never presented as a real life use-cases
	// and might be considered as more preferable results.
	//
	// This logic, however, is not guaranteed and can change at any point in the future
	offsetParent: function() {
		return this.map( function() {
			var offsetParent = this.offsetParent;

			while ( offsetParent && jQuery.css( offsetParent, "position" ) === "static" ) {
				offsetParent = offsetParent.offsetParent;
			}

			return offsetParent || documentElement;
		} );
	}
} );

// Create scrollLeft and scrollTop methods
jQuery.each( { scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function( method, prop ) {
	var top = "pageYOffset" === prop;

	jQuery.fn[ method ] = function( val ) {
		return access( this, function( elem, method, val ) {

			// Coalesce documents and windows
			var win;
			if ( isWindow( elem ) ) {
				win = elem;
			} else if ( elem.nodeType === 9 ) {
				win = elem.defaultView;
			}

			if ( val === undefined ) {
				return win ? win[ prop ] : elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : win.pageXOffset,
					top ? val : win.pageYOffset
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length );
	};
} );

// Support: Safari <=7 - 9.1, Chrome <=37 - 49
// Add the top/left cssHooks using jQuery.fn.position
// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
// Blink bug: https://bugs.chromium.org/p/chromium/issues/detail?id=589347
// getComputedStyle returns percent when specified for top/left/bottom/right;
// rather than make the css module depend on the offset module, just check for it here
jQuery.each( [ "top", "left" ], function( i, prop ) {
	jQuery.cssHooks[ prop ] = addGetHookIf( support.pixelPosition,
		function( elem, computed ) {
			if ( computed ) {
				computed = curCSS( elem, prop );

				// If curCSS returns percentage, fallback to offset
				return rnumnonpx.test( computed ) ?
					jQuery( elem ).position()[ prop ] + "px" :
					computed;
			}
		}
	);
} );


// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name },
		function( defaultExtra, funcName ) {

		// Margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return access( this, function( elem, type, value ) {
				var doc;

				if ( isWindow( elem ) ) {

					// $( window ).outerWidth/Height return w/h including scrollbars (gh-1729)
					return funcName.indexOf( "outer" ) === 0 ?
						elem[ "inner" + name ] :
						elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height],
					// whichever is greatest
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?

					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable );
		};
	} );
} );


jQuery.each( ( "blur focus focusin focusout resize scroll click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup contextmenu" ).split( " " ),
	function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
} );

jQuery.fn.extend( {
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	}
} );




jQuery.fn.extend( {

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {

		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ?
			this.off( selector, "**" ) :
			this.off( types, selector || "**", fn );
	}
} );

// Bind a function to a context, optionally partially applying any
// arguments.
// jQuery.proxy is deprecated to promote standards (specifically Function#bind)
// However, it is not slated for removal any time soon
jQuery.proxy = function( fn, context ) {
	var tmp, args, proxy;

	if ( typeof context === "string" ) {
		tmp = fn[ context ];
		context = fn;
		fn = tmp;
	}

	// Quick check to determine if target is callable, in the spec
	// this throws a TypeError, but we will just return undefined.
	if ( !isFunction( fn ) ) {
		return undefined;
	}

	// Simulated bind
	args = slice.call( arguments, 2 );
	proxy = function() {
		return fn.apply( context || this, args.concat( slice.call( arguments ) ) );
	};

	// Set the guid of unique handler to the same of original handler, so it can be removed
	proxy.guid = fn.guid = fn.guid || jQuery.guid++;

	return proxy;
};

jQuery.holdReady = function( hold ) {
	if ( hold ) {
		jQuery.readyWait++;
	} else {
		jQuery.ready( true );
	}
};
jQuery.isArray = Array.isArray;
jQuery.parseJSON = JSON.parse;
jQuery.nodeName = nodeName;
jQuery.isFunction = isFunction;
jQuery.isWindow = isWindow;
jQuery.camelCase = camelCase;
jQuery.type = toType;

jQuery.now = Date.now;

jQuery.isNumeric = function( obj ) {

	// As of jQuery 3.0, isNumeric is limited to
	// strings and numbers (primitives or objects)
	// that can be coerced to finite numbers (gh-2662)
	var type = jQuery.type( obj );
	return ( type === "number" || type === "string" ) &&

		// parseFloat NaNs numeric-cast false positives ("")
		// ...but misinterprets leading-number strings, particularly hex literals ("0x...")
		// subtraction forces infinities to NaN
		!isNaN( obj - parseFloat( obj ) );
};




// Register as a named AMD module, since jQuery can be concatenated with other
// files that may use define, but not via a proper concatenation script that
// understands anonymous AMD modules. A named AMD is safest and most robust
// way to register. Lowercase jquery is used because AMD module names are
// derived from file names, and jQuery is normally delivered in a lowercase
// file name. Do this after creating the global so that if an AMD module wants
// to call noConflict to hide this version of jQuery, it will work.

// Note that for maximum portability, libraries that are not jQuery should
// declare themselves as anonymous modules, and avoid setting a global if an
// AMD loader is present. jQuery is a special case. For more information, see
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if ( typeof define === "function" && define.amd ) {
	define( "jquery", [], function() {
		return jQuery;
	} );
}




var

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$;

jQuery.noConflict = function( deep ) {
	if ( window.$ === jQuery ) {
		window.$ = _$;
	}

	if ( deep && window.jQuery === jQuery ) {
		window.jQuery = _jQuery;
	}

	return jQuery;
};

// Expose jQuery and $ identifiers, even in AMD
// (#7102#comment:10, https://github.com/jquery/jquery/pull/557)
// and CommonJS for browser emulators (#13566)
if ( !noGlobal ) {
	window.jQuery = window.$ = jQuery;
}




return jQuery;
} );

/*!
 * googoose 1.0.2
 * https://github.com/aadel112/googoose/js/jquery.googoose.js
 * @license Apache 2.0
 *
 * Copyright (C) 2016 - aadel112.com - A project by Aaron Adel    
 */
(function ( $ ) {

    $.fn.googoose = function( options, callback ) {

        var GG = this;
        var now = new Date().getTime();
        var proto = new RegExp(/^(http|https|file):/);
        var ab = new RegExp(/^\//);

        GG.finish = function() {
            if( options.debug ) 
                GG.debug_fn('finish action');
            if (callback) {
                var blob = new Blob([options.html], {
                    type: 'application/msword'
                });
                callback(null, blob);
            } else {
                GG.saveHtmlAsFile(options.filename, options.html);
            }
        }

        var options = $.extend({
            // These are the defaults.
            area: 'div.googoose-wrapper',
            headerfooterid: 'googoose-hdrftrtbl',
            margins: '1.0in',
            zoom: '75',
            filename: 'Doc1_' + now + '.doc',
            size: '8.5in 11.0in',
            display: 'Print',
            lang: 'en-US',
            toc: 'div.googoose.toc',
            pagebreak: 'div.googoose.break',
            headerarea: 'div.googoose.header',
            footerarea: 'div.googoose.footer',
            headerid: 'googoose-header',
            footerid: 'googoose-footer',
            headermargin: '.5in',
            footermargin: '.5in',
            currentpage: 'span.googoose.currentpage',
            totalpage: 'span.googoose.totalpage',
            finishaction: GG.finish,
            html: null,
            initobj: document,
            debugtype: 'alert',
            debug: 0
        }, options );
        GG.options = options;
        
        //http://requiremind.com/memoization-speed-up-your-javascript-performance/
        GG.memoize = function(fn, resolver) {
            var memoized = function() {
                resolver  = resolver || JSON.stringify;
                var cache = memoized.cache;
                var args  = Array.prototype.slice.call(arguments);
                var key   = resolver.apply(this, args);
                if(key in cache) {
                    GG.debug_fn('hit cache');
                    return cache[key];
                }
                var result = fn.apply(this, arguments);
                cache[key] = result;
                return result;
            };
            memoized.cache = {};
            return memoized;
        }

        GG.debug_fn = function( args ) {
            options.debugtype == 'console' ? console.log( args ) : alert( args );
        }

        //http://stackoverflow.com/questions/18755750/saving-text-in-a-local-file-in-internet-explorer-10
        GG.saveHtmlAsFile = function(
                fileNameToSaveAs, textToWrite
                ) {
            /* Saves a text string as a blob file*/  
            var ie = navigator.userAgent.match(/MSIE\s([\d.]+)/),
            ie11 = navigator.userAgent.match(/Trident\/7.0/) && navigator.userAgent.match(/rv:11/),
                ieEDGE = navigator.userAgent.match(/Edge/g),
                ieVer=(ie ? ie[1] : (ie11 ? 11 : (ieEDGE ? 12 : -1)));

            if (ie && ieVer<10) {
                console.log("No blobs on IE ver<10");
                return;
            }

            var textFileAsBlob = new Blob([textToWrite], {
                type: 'application/msword'
            });

            if (ieVer>-1) {
                window.navigator.msSaveBlob(textFileAsBlob, fileNameToSaveAs);

            } else {
                var downloadLink = document.createElement("a");
                downloadLink.download = fileNameToSaveAs;
                downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
                downloadLink.onclick = function(e) { document.body.removeChild(e.target); };
                downloadLink.style.display = "none";
                document.body.appendChild(downloadLink);
                downloadLink.click();
            }
        }

        // http://stackoverflow.com/questions/7394748/whats-the-right-way-to-decode-a-string-that-has-special-html-entities-in-it
        GG.decodeHtmlEntity = function(str) {
            return str.replace(/&#(\d+);/g, function(match, dec) {
            return String.fromCharCode(dec);
            });
        }


        GG.translate_mso_features = function( html ) {
            if( options.debug ) 
                GG.debug_fn('GG.translate_mso_features');

            html = GG.decodeHtmlEntity(html);
            html = GG.remove_bad_tags(html);
            html = GG.convert_pagebreaks(html);
            html = GG.convert_toc(html);
            html = GG.convert_hdrftr(html);
            html = GG.convert_imgs(html);

            return html;
        }

        GG.remove_bad_tags = function( html ) {
            if( options.debug )
                GG.debug_fn('GG.remove_bad_tags');
            var thtml = $(html);

            
            thtml.find('noscript').each(function() {
                $(this).replaceWith('');  
            });
            thtml.each(function() {
                if($(this).is(':hidden')){
                    $(this).remove();
                }
            });

            html = thtml[0].outerHTML;
            return html;
        }

        GG.convert_pagebreaks = function( html ) {
            if( options.debug )
                GG.debug_fn('GG.convert_pagebreaks');
            //user decides in html what will be a page break in word, this converts to a page break
            if( options.pagebreak ) {
                var thtml = $(html);
                thtml.find(options.pagebreak).replaceWith(GG.get_pagebreak());
                html = thtml[0].outerHTML;
            }
            return html;
        }

        GG.convert_toc = function( html ) {
            if( options.debug )
                GG.debug_fn('GG.convert_toc');
            //user determines in html what will be the toc in word
            if( options.toc && $(options.toc).length ) {
                var thtml = $(html);
                thtml.find(options.toc).replaceWith(GG.get_toc_contents());
                html = thtml[0].outerHTML;
            }
            return html; 
        }

        GG.convert_hdrftr = function( html ) {
            if( options.debug )
                GG.debug_fn('GG.convert_hdrftr');
            var hvis = options.headerarea && $(options.headerarea).length;
            var fvis = options.footerarea && $(options.footerarea).length;
            if( hvis || fvis ) {
                var thtml = $('<div>' + html + '</div>' );
                var hdrftr = $('<table id=\'' + options.headerfooterid + '\'></table>');
                hdrftr.append('<tr><td class=h></td><td class=f></td></tr>');
                thtml.append(hdrftr);
                html = thtml[0].outerHTML;

                html = GG.convert_totalpage(html);
                html = GG.convert_currentpage(html);
            }

            var thtml = $(html);
            if( hvis ) {
                var new_header = thtml.find(options.headerarea)[0].outerHTML;
                thtml.find(options.headerarea).replaceWith('');
                thtml.find('table#' + options.headerfooterid + ' .h').append( 
                        GG.headerstart() + new_header + GG.headerend() );
                html = thtml[0].outerHTML;
            }
            if( fvis ) {
                var new_footer = thtml.find(options.footerarea)[0].outerHTML;
                thtml.find(options.footerarea).replaceWith('');
                thtml.find('table#' + options.headerfooterid + ' .f').append( 
                        GG.footerstart() + new_footer + GG.footerend());
                html = thtml[0].outerHTML;
            }
            return html;

        }

        GG.convert_imgs = function( html ) {
            if( options.debug )
                GG.debug_fn('GG.convert_imgs');
            //make sure all standard images use absolute path 
            var thtml = $(html);
            imgs = thtml.find('img');
            imgs.each(function() {
                var src = $(this)[0].src;
                var l = window.location;
                var t = l.protocol + '//' + l.host + '/';
                if( proto.test( src ) ) {
                } else if( ab.test( src ) ) {
                    src = t + src; 
                } else {
                   var p = l.path.replace('/\/[^\/.]+$/', '/' );
                   src = t + p + src;
                }
                $(this).attr( 'src', src );
            });
            html = thtml[0].outerHTML;
            return html;
        }

        GG.convert_totalpage = function(html) {
            if( options.debug )
                GG.debug_fn('GG.convert_totalpage');
            if( options.totalpage && $(options.totalpage).length ) {
                var thtml = $(html);
                thtml.find(options.totalpage).html('');
                thtml.find(options.totalpage).append( GG.get_total_page_number() );
                html = thtml[0].outerHTML;
            }
            return html;
        }

        GG.convert_currentpage = function(html) {
            if( options.debug )
                GG.debug_fn('GG.convert_currentpage');
            if( options.currentpage && $(options.currentpage).length ) {
                var thtml = $(html);
                thtml.find(options.currentpage).html('');
                thtml.find(options.currentpage).append( GG.get_page_number() );
                html = thtml[0].outerHTML;
            }
            return html;
        }

        GG.get_pagebreak = function() {
            if( options.debug ) 
                GG.debug_fn('GG.get_pagebreak');
            return '<br clear=all style=\'mso-special-character:line-break;page-break-before:always\'>';
        }

        GG.headerstart = function() {
            var html = '';
            html += '\n<div style=\'mso-element:header\' id=' + options.headerid + '>\n';
            html += '<p class="MsoHeader">\n';
            return html;
        }
        GG.headerend = function() {
            if( options.debug )
                GG.debug_fn('GG.headerend');
            return '</p></div>\n';
        }

        GG.footerstart = function() {
            if( options.debug ) 
                GG.debug_fn('GG.footerstart');
            var html = '';
            html += '<div style=\'mso-element:footer\' id=' + options.footerid + '>';
            return html;
        }
        GG.footerend = function() {
            if( options.debug )
                GG.debug_fn('GG.footerend');
            return '</div>\n';
        }

        GG.get_page_number = function() {
            if( options.debug )
                GG.debug_fn('GG.get_page_number');
            var html = '<!--[if supportFields]><span\n';
            html += 'class=MsoPageNumber><span style=\'mso-element:field-begin\'></span><span\n';
            html += 'style=\'mso-spacerun:yes\'> </span>PAGE <span style=\'mso-element:field-separator\'></span></span><![endif]--><span\n';
            html += 'class=MsoPageNumber><span style=\'mso-no-proof:yes\'>1</span></span><!--[if supportFields]><span\n';
            html += 'class=MsoPageNumber><span style=\'mso-element:field-end\'></span></span><![endif]-->';   
            return html;
        }

        GG.get_total_page_number = function() {
            if( options.debug )
                GG.debug_fn('GG.get_total_page_number');
            var html = '<!--[if supportFields]><span class=MsoPageNumber><span \n';
            html += ' style=\'mso-element:field-begin\'></span> NUMPAGES <span style=\'mso-element:field-separator\'></span></span><![endif]--><span \n';
            html += ' class=MsoPageNumber><span style=\'mso-no-proof:yes\'>1</span></span><!--[if supportFields]><span \n'
                html += ' class=MsoPageNumber><span style=\'mso-element:field-end\'></span></span><![endif]-->\n';
            return html;
        }

        GG.get_toc_contents = function() {
            if( options.debug ) 
                GG.debug_fn('GG.get_toc_contents');
            var toc = '<p class=MsoToc1>\n';
            toc += '<!--[if supportFields]>\n';
            toc += '<span style=\'mso-element:field-begin\'></span>\n';
            toc += 'TOC \o "1-3" \\u \n';
            toc += '<span style=\'mso-element:field-separator\'></span>\n';
            toc += '<![endif]-->\n';
            toc += '<span style=\'mso-no-proof:yes\'>Table of content - Please right-click and choose "Update fields".</span>\n';
            toc += '<!--[if supportFields]>\n';
            toc += '<span style=\'mso-element:field-end\'></span>\n';
            toc += '<![endif]-->\n';
            toc += '</p>\n';

            return toc;
        }

        //TODO - figure out a way to simulate a right mpuse click, update fields


        GG.include_css = function( html ) {
            if( options.debug ) 
                GG.debug_fn('GG.include_css');
            //adding any header information that may be pertinent in teh copied html
            var tags = ['style', 'link'];
            for( i = 0; i < tags.length ; ++i ) {
                $(document).find(tags[i]).each( function( ) {
                    if(tags[i] != 'link' || ($(this).attr('rel') == 'stylesheet' && proto.test($(this).attr('href')))) {
                        html += ( '\n' + $(this)[0].outerHTML + '\n' );
                    }
                } );
            }
            return html;
        }

        GG.html = function() {
            if( options.debug ) 
                GG.debug_fn('GG.html');
            if( !$(options.area).length ) {
                return null;
            }
//             // fixes IE pre tag handling
//             $('pre').each(function() {
//                 $(this)[0].outerHTML = $(this)[0].outerHTML.replace(/\n/g, "<br />\n");
//             });
            // adding the standard mso header 
            var html = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:w=\'urn:schemas-microsoft-com:office:word\' xmlns=\'http://www.w3.org/TR/REC-html40\'>\n';
            html += '<head>\n';
            html += '<!--[if gte mso 9]>\n';
            html += '<xml>\n';
            html += '<w:WordDocument>\n';
            html += ( '<w:View>' + options.display + '</w:View>\n' );
            html += ('<w:Zoom>'+ options.zoom +'</w:Zoom>\n');
            html += '<w:DoNotOptimizeForBrowser/>\n';
            html += '</w:WordDocument>\n';
            html += '<o:OfficeDocumentSettings>\n';
            html += '<o:AllowPNG/>\n';
            html +='</o:OfficeDocumentSettings>\n';
            html += '</xml>\n';
            html += '<![endif]-->\n';
            html += '';

            html = GG.include_css( html );
            //adding in mso style necessesities
            html += '<style>\n';
            html += '<!--\n';
            html += '@page {\n';
            html += ('\tsize:' + options.size + ';\n');
            html += ('\tmargin:' + options.margins + ';\n');
            html += '}\n';
            html += '@page Container {\n';
            html += ('\tmso-header-margin:' + options.headermargin + ';\n' );
            html += ('\tmso-footer-margin:' + options.footermargin + ';\n' );
            html += ('\tmso-header:' + options.headerid + ';\n' );
            html += ('\tmso-footer:' + options.footerid + ';\n' );
            html += '}\n';
            html += 'div.Container { page:Container; }\n';
            html += ( 'table#' + options.headerfooterid + ' {\n' );
            html += '\tmargin:0in 0in 0in 9in;\n';
            html += '}\n';
            html += '-->\n';
            html += '</style>\n';

            //close head
            html += '</head>\n';

            //start body
            html += ('<body lang=' + options.lang + '>\n<div class=Container>');

            //add area content
            if($(options.initobj).is(options.area)) {
                if(options.debug)
                    GG.debug_fn('is');
                html += GG.translate_mso_features($(options.initobj)[0].outerHTML);
            } else {
                if(options.debug)
                    GG.debug_fn('no is');
                $(options.initobj).find(options.area).each(function(){
                    html += GG.translate_mso_features($(this)[0].outerHTML);
                });
            }

            //close body
            html += '</div></body>\n';

            //close doc
            html += '</html>\n';
            return html;
        }

        //memoized fns
        //		GG.pngname = GG.memoize(GG.get_png_name);


        //execution
        if( options.debug )
            GG.debug_fn('googoose exec');
        options.html = GG.html();
        if( options.html && options.finishaction ) {
            options.finishaction();   
        }
//         return options;
        return GG;
    };
}( jQuery ));

// 4.7.1 (2017-10-09)
!function(){var a={},b=function(b){for(var c=a[b],e=c.deps,f=c.defn,g=e.length,h=new Array(g),i=0;i<g;++i)h[i]=d(e[i]);var j=f.apply(null,h);if(void 0===j)throw"module ["+b+"] returned undefined";c.instance=j},c=function(b,c,d){if("string"!=typeof b)throw"module id must be a string";if(void 0===c)throw"no dependencies for "+b;if(void 0===d)throw"no definition function for "+b;a[b]={deps:c,defn:d,instance:void 0}},d=function(c){var d=a[c];if(void 0===d)throw"module ["+c+"] was undefined";return void 0===d.instance&&b(c),d.instance},e=function(a,b){for(var c=a.length,e=new Array(c),f=0;f<c;++f)e[f]=d(a[f]);b.apply(null,e)},f={};f.bolt={module:{api:{define:c,require:e,demand:d}}};var g=c,h=function(a,b){g(a,[],function(){return b})};h("4",Array),h("5",Error),g("1",["4","5"],function(a,b){var c=function(){},d=function(a,b){return function(){return a(b.apply(null,arguments))}},e=function(a){return function(){return a}},f=function(a){return a},g=function(a,b){return a===b},h=function(b){for(var c=new a(arguments.length-1),d=1;d<arguments.length;d++)c[d-1]=arguments[d];return function(){for(var d=new a(arguments.length),e=0;e<d.length;e++)d[e]=arguments[e];var f=c.concat(d);return b.apply(null,f)}},i=function(a){return function(){return!a.apply(null,arguments)}},j=function(a){return function(){throw new b(a)}},k=function(a){return a()},l=function(a){a()},m=e(!1),n=e(!0);return{noop:c,compose:d,constant:e,identity:f,tripleEquals:g,curry:h,not:i,die:j,apply:k,call:l,never:m,always:n}}),h("2",window),h("2y",Object),g("23",["1","2y"],function(a,b){var c=a.never,d=a.always,e=function(){return f},f=function(){var f=function(a){return a.isNone()},g=function(a){return a()},h=function(a){return a},i=function(){},j={fold:function(a,b){return a()},is:c,isSome:c,isNone:d,getOr:h,getOrThunk:g,getOrDie:function(a){throw new Error(a||"error: getOrDie called on none.")},or:h,orThunk:g,map:e,ap:e,each:i,bind:e,flatten:e,exists:c,forall:d,filter:e,equals:f,equals_:f,toArray:function(){return[]},toString:a.constant("none()")};return b.freeze&&b.freeze(j),j}(),g=function(a){var b=function(){return a},h=function(){return k},i=function(b){return g(b(a))},j=function(b){return b(a)},k={fold:function(b,c){return c(a)},is:function(b){return a===b},isSome:d,isNone:c,getOr:b,getOrThunk:b,getOrDie:b,or:h,orThunk:h,map:i,ap:function(b){return b.fold(e,function(b){return g(b(a))})},each:function(b){b(a)},bind:j,flatten:b,exists:j,forall:j,filter:function(b){return b(a)?k:f},equals:function(b){return b.is(a)},equals_:function(b,d){return b.fold(c,function(b){return d(a,b)})},toArray:function(){return[a]},toString:function(){return"some("+a+")"}};return k},h=function(a){return null===a||void 0===a?f:g(a)};return{some:g,none:e,from:h}}),h("2z",String),g("1i",["23","4","5","2z"],function(a,b,c,d){var e=function(){var a=b.prototype.indexOf,c=function(b,c){return a.call(b,c)},d=function(a,b){return u(a,b)};return void 0===a?d:c}(),f=function(b,c){var d=e(b,c);return d===-1?a.none():a.some(d)},g=function(a,b){return e(a,b)>-1},h=function(a,b){return t(a,b).isSome()},i=function(a,b){for(var c=[],d=0;d<a;d++)c.push(b(d));return c},j=function(a,b){for(var c=[],d=0;d<a.length;d+=b){var e=a.slice(d,d+b);c.push(e)}return c},k=function(a,c){for(var d=a.length,e=new b(d),f=0;f<d;f++){var g=a[f];e[f]=c(g,f,a)}return e},l=function(a,b){for(var c=0,d=a.length;c<d;c++){var e=a[c];b(e,c,a)}},m=function(a,b){for(var c=a.length-1;c>=0;c--){var d=a[c];b(d,c,a)}},n=function(a,b){for(var c=[],d=[],e=0,f=a.length;e<f;e++){var g=a[e],h=b(g,e,a)?c:d;h.push(g)}return{pass:c,fail:d}},o=function(a,b){for(var c=[],d=0,e=a.length;d<e;d++){var f=a[d];b(f,d,a)&&c.push(f)}return c},p=function(a,b){if(0===a.length)return[];for(var c=b(a[0]),d=[],e=[],f=0,g=a.length;f<g;f++){var h=a[f],i=b(h);i!==c&&(d.push(e),e=[]),c=i,e.push(h)}return 0!==e.length&&d.push(e),d},q=function(a,b,c){return m(a,function(a){c=b(c,a)}),c},r=function(a,b,c){return l(a,function(a){c=b(c,a)}),c},s=function(b,c){for(var d=0,e=b.length;d<e;d++){var f=b[d];if(c(f,d,b))return a.some(f)}return a.none()},t=function(b,c){for(var d=0,e=b.length;d<e;d++){var f=b[d];if(c(f,d,b))return a.some(d)}return a.none()},u=function(a,b){for(var c=0,d=a.length;c<d;++c)if(a[c]===b)return c;return-1},v=b.prototype.push,w=function(a){for(var d=[],e=0,f=a.length;e<f;++e){if(!b.prototype.isPrototypeOf(a[e]))throw new c("Arr.flatten item "+e+" was not an array, input: "+a);v.apply(d,a[e])}return d},x=function(a,b){var c=k(a,b);return w(c)},y=function(a,b){for(var c=0,d=a.length;c<d;++c){var e=a[c];if(b(e,c,a)!==!0)return!1}return!0},z=function(a,b){return a.length===b.length&&y(a,function(a,c){return a===b[c]})},A=b.prototype.slice,B=function(a){var b=A.call(a,0);return b.reverse(),b},C=function(a,b){return o(a,function(a){return!g(b,a)})},D=function(a,b){for(var c={},e=0,f=a.length;e<f;e++){var g=a[e];c[d(g)]=b(g,e)}return c},E=function(a){return[a]},F=function(a,b){var c=A.call(a,0);return c.sort(b),c},G=function(b){return 0===b.length?a.none():a.some(b[0])},H=function(b){return 0===b.length?a.none():a.some(b[b.length-1])};return{map:k,each:l,eachr:m,partition:n,filter:o,groupBy:p,indexOf:f,foldr:q,foldl:r,find:s,findIndex:t,flatten:w,bind:x,forall:y,exists:h,contains:g,equal:z,reverse:B,chunk:j,difference:C,mapToObject:D,pure:E,sort:F,range:i,head:G,last:H}}),h("1j",document),g("5n",[],function(){return"undefined"!=typeof window?window:Function("return this;")()}),g("4a",["5n"],function(a){var b=function(b,c){for(var d=void 0!==c?c:a,e=0;e<b.length&&void 0!==d&&null!==d;++e)d=d[b[e]];return d},c=function(a,c){var d=a.split(".");return b(d,c)},d=function(a,b){return void 0!==a[b]&&null!==a[b]||(a[b]={}),a[b]},e=function(b,c){for(var e=void 0!==c?c:a,f=0;f<b.length;++f)e=d(e,b[f]);return e},f=function(a,b){var c=a.split(".");return e(c,b)};return{path:b,resolve:c,forge:e,namespace:f}}),g("30",["4a"],function(a){var b=function(b,c){return a.resolve(b,c)},c=function(a,c){var d=b(a,c);if(void 0===d)throw a+" not available on this browser";return d};return{getOrDie:c}}),g("1k",["30"],function(a){var b=function(){return a.getOrDie("URL")},c=function(a){return b().createObjectURL(a)},d=function(a){b().revokeObjectURL(a)};return{createObjectURL:c,revokeObjectURL:d}}),h("1l",matchMedia),h("1m",navigator),g("p",["1k","1j","1l","1m","2"],function(a,b,c,d,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,s=d,t=s.userAgent,u=function(a){return"matchMedia"in e&&c(a).matches};f=e.opera&&e.opera.buildNumber,n=/Android/.test(t),g=/WebKit/.test(t),h=!g&&!f&&/MSIE/gi.test(t)&&/Explorer/gi.test(s.appName),h=h&&/MSIE (\w+)\./.exec(t)[1],i=t.indexOf("Trident/")!=-1&&(t.indexOf("rv:")!=-1||s.appName.indexOf("Netscape")!=-1)&&11,j=t.indexOf("Edge/")!=-1&&!h&&!i&&12,h=h||i||j,k=!g&&!i&&/Gecko/.test(t),l=t.indexOf("Mac")!=-1,m=/(iPad|iPhone)/.test(t),o="FormData"in e&&"FileReader"in e&&"URL"in e&&!!a.createObjectURL,p=u("only screen and (max-device-width: 480px)")&&(n||m),q=u("only screen and (min-width: 800px)")&&(n||m),r=t.indexOf("Windows Phone")!=-1,j&&(g=!1);var v=!m||o||t.match(/AppleWebKit\/(\d*)/)[1]>=534;return{opera:f,webkit:g,ie:h,gecko:k,mac:l,iOS:m,android:n,contentEditable:v,transparentSrc:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7",caretAfter:8!=h,range:e.getSelection&&"Range"in e,documentMode:h&&!j?b.documentMode||7:10,fileApi:o,ceFalse:h===!1||h>8,canHaveCSP:h===!1||h>11,desktop:!p&&!q,windowsPhone:r}}),h("1n",clearInterval),h("1o",clearTimeout),h("1p",setInterval),h("1q",setTimeout),g("1d",[],function(){function a(a,b){return function(){a.apply(b,arguments)}}function b(b){if("object"!=typeof this)throw new TypeError("Promises must be constructed via new");if("function"!=typeof b)throw new TypeError("not a function");this._state=null,this._value=null,this._deferreds=[],h(b,a(d,this),a(e,this))}function c(a){var b=this;return null===this._state?void this._deferreds.push(a):void i(function(){var c=b._state?a.onFulfilled:a.onRejected;if(null===c)return void(b._state?a.resolve:a.reject)(b._value);var d;try{d=c(b._value)}catch(b){return void a.reject(b)}a.resolve(d)})}function d(b){try{if(b===this)throw new TypeError("A promise cannot be resolved with itself.");if(b&&("object"==typeof b||"function"==typeof b)){var c=b.then;if("function"==typeof c)return void h(a(c,b),a(d,this),a(e,this))}this._state=!0,this._value=b,f.call(this)}catch(a){e.call(this,a)}}function e(a){this._state=!1,this._value=a,f.call(this)}function f(){for(var a=0,b=this._deferreds.length;a<b;a++)c.call(this,this._deferreds[a]);this._deferreds=null}function g(a,b,c,d){this.onFulfilled="function"==typeof a?a:null,this.onRejected="function"==typeof b?b:null,this.resolve=c,this.reject=d}function h(a,b,c){var d=!1;try{a(function(a){d||(d=!0,b(a))},function(a){d||(d=!0,c(a))})}catch(a){if(d)return;d=!0,c(a)}}if(window.Promise)return window.Promise;var i=b.immediateFn||"function"==typeof setImmediate&&setImmediate||function(a){setTimeout(a,1)},j=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)};return b.prototype["catch"]=function(a){return this.then(null,a)},b.prototype.then=function(a,d){var e=this;return new b(function(b,f){c.call(e,new g(a,d,b,f))})},b.all=function(){var a=Array.prototype.slice.call(1===arguments.length&&j(arguments[0])?arguments[0]:arguments);return new b(function(b,c){function d(f,g){try{if(g&&("object"==typeof g||"function"==typeof g)){var h=g.then;if("function"==typeof h)return void h.call(g,function(a){d(f,a)},c)}a[f]=g,0===--e&&b(a)}catch(a){c(a)}}if(0===a.length)return b([]);for(var e=a.length,f=0;f<a.length;f++)d(f,a[f])})},b.resolve=function(a){return a&&"object"==typeof a&&a.constructor===b?a:new b(function(b){b(a)})},b.reject=function(a){return new b(function(b,c){c(a)})},b.race=function(a){return new b(function(b,c){for(var d=0,e=a.length;d<e;d++)a[d].then(b,c)})},b}),g("15",["1n","1o","1j","1p","1q","2","1d"],function(a,b,c,d,e,f,g){var h,i=function(a,b){var c,d=f.requestAnimationFrame,e=["ms","moz","webkit"],g=function(a){f.setTimeout(a,0)};for(c=0;c<e.length&&!d;c++)d=f[e[c]+"RequestAnimationFrame"];d||(d=g),d(a,b)},j=function(a,b){return"number"!=typeof b&&(b=0),e(a,b)},k=function(a,b){return"number"!=typeof b&&(b=1),d(a,b)},l=function(a){return b(a)},m=function(b){return a(b)},n=function(a,c){var d,e;return e=function(){var e=arguments;b(d),d=j(function(){a.apply(this,e)},c)},e.stop=function(){b(d)},e};return{requestAnimationFrame:function(a,b){return h?void h.then(a):void(h=new g(function(a){b||(b=c.body),i(a,b)}).then(a))},setTimeout:j,setInterval:k,setEditorTimeout:function(a,b,c){return j(function(){a.removed||b()},c)},setEditorInterval:function(b,c,d){var e;return e=k(function(){b.removed?a(e):c()},d)},debounce:n,throttle:n,clearInterval:m,clearTimeout:l}}),g("e",["1j","2","p","15"],function(a,b,c,d){"use strict";var e="mce-data-",f=/^(?:mouse|contextmenu)|click/,g={keyLocation:1,layerX:1,layerY:1,returnValue:1,webkitMovementX:1,webkitMovementY:1,keyIdentifier:1},h=function(a){return a.isDefaultPrevented===j||a.isDefaultPrevented===i},i=function(){return!1},j=function(){return!0},k=function(a,b,c,d){a.addEventListener?a.addEventListener(b,c,d||!1):a.attachEvent&&a.attachEvent("on"+b,c)},l=function(a,b,c,d){a.removeEventListener?a.removeEventListener(b,c,d||!1):a.detachEvent&&a.detachEvent("on"+b,c)},m=function(a,b){var c,d=b;return c=a.path,c&&c.length>0&&(d=c[0]),a.deepPath&&(c=a.deepPath(),c&&c.length>0&&(d=c[0])),d},n=function(b,d){var e,k,l=d||{};for(e in b)g[e]||(l[e]=b[e]);if(l.target||(l.target=l.srcElement||a),c.experimentalShadowDom&&(l.target=m(b,l.target)),b&&f.test(b.type)&&b.pageX===k&&b.clientX!==k){var n=l.target.ownerDocument||a,o=n.documentElement,p=n.body;l.pageX=b.clientX+(o&&o.scrollLeft||p&&p.scrollLeft||0)-(o&&o.clientLeft||p&&p.clientLeft||0),l.pageY=b.clientY+(o&&o.scrollTop||p&&p.scrollTop||0)-(o&&o.clientTop||p&&p.clientTop||0)}return l.preventDefault=function(){l.isDefaultPrevented=j,b&&(b.preventDefault?b.preventDefault():b.returnValue=!1)},l.stopPropagation=function(){l.isPropagationStopped=j,b&&(b.stopPropagation?b.stopPropagation():b.cancelBubble=!0)},l.stopImmediatePropagation=function(){l.isImmediatePropagationStopped=j,l.stopPropagation()},h(l)===!1&&(l.isDefaultPrevented=i,l.isPropagationStopped=i,l.isImmediatePropagationStopped=i),"undefined"==typeof l.metaKey&&(l.metaKey=!1),l},o=function(a,b,e){var f=a.document,g={type:"ready"};if(e.domLoaded)return void b(g);var h=function(){return"complete"===f.readyState||"interactive"===f.readyState&&f.body},i=function(){e.domLoaded||(e.domLoaded=!0,b(g))},j=function(){h()&&(l(f,"readystatechange",j),i())},m=function(){try{f.documentElement.doScroll("left")}catch(a){return void d.setTimeout(m)}i()};!f.addEventListener||c.ie&&c.ie<11?(k(f,"readystatechange",j),f.documentElement.doScroll&&a.self===a.top&&m()):h()?i():k(a,"DOMContentLoaded",i),k(a,"load",i)},p=function(){var c,d,f,g,h,i=this,j={};d=e+(+new Date).toString(32),g="onmouseenter"in a.documentElement,f="onfocusin"in a.documentElement,h={mouseenter:"mouseover",mouseleave:"mouseout"},c=1,i.domLoaded=!1,i.events=j;var m=function(a,b){var c,d,e,f,g=j[b];if(c=g&&g[a.type])for(d=0,e=c.length;d<e;d++)if(f=c[d],f&&f.func.call(f.scope,a)===!1&&a.preventDefault(),a.isImmediatePropagationStopped())return};i.bind=function(a,e,l,p){var q,r,s,t,u,v,w,x=b,y=function(a){m(n(a||x.event),q)};if(a&&3!==a.nodeType&&8!==a.nodeType){for(a[d]?q=a[d]:(q=c++,a[d]=q,j[q]={}),p=p||a,e=e.split(" "),s=e.length;s--;)t=e[s],v=y,u=w=!1,"DOMContentLoaded"===t&&(t="ready"),i.domLoaded&&"ready"===t&&"complete"==a.readyState?l.call(p,n({type:t})):(g||(u=h[t],u&&(v=function(a){var b,c;if(b=a.currentTarget,c=a.relatedTarget,c&&b.contains)c=b.contains(c);else for(;c&&c!==b;)c=c.parentNode;c||(a=n(a||x.event),a.type="mouseout"===a.type?"mouseleave":"mouseenter",a.target=b,m(a,q))})),f||"focusin"!==t&&"focusout"!==t||(w=!0,u="focusin"===t?"focus":"blur",v=function(a){a=n(a||x.event),a.type="focus"===a.type?"focusin":"focusout",m(a,q)}),r=j[q][t],r?"ready"===t&&i.domLoaded?l({type:t}):r.push({func:l,scope:p}):(j[q][t]=r=[{func:l,scope:p}],r.fakeName=u,r.capture=w,r.nativeHandler=v,"ready"===t?o(a,v,i):k(a,u||t,v,w)));return a=r=0,l}},i.unbind=function(a,b,c){var e,f,g,h,k,m;if(!a||3===a.nodeType||8===a.nodeType)return i;if(e=a[d]){if(m=j[e],b){for(b=b.split(" "),g=b.length;g--;)if(k=b[g],f=m[k]){if(c)for(h=f.length;h--;)if(f[h].func===c){var n=f.nativeHandler,o=f.fakeName,p=f.capture;f=f.slice(0,h).concat(f.slice(h+1)),f.nativeHandler=n,f.fakeName=o,f.capture=p,m[k]=f}c&&0!==f.length||(delete m[k],l(a,f.fakeName||k,f.nativeHandler,f.capture))}}else{for(k in m)f=m[k],l(a,f.fakeName||k,f.nativeHandler,f.capture);m={}}for(k in m)return i;delete j[e];try{delete a[d]}catch(b){a[d]=null}}return i},i.fire=function(a,b,c){var e;if(!a||3===a.nodeType||8===a.nodeType)return i;c=n(null,c),c.type=b,c.target=a;do e=a[d],e&&m(c,e),a=a.parentNode||a.ownerDocument||a.defaultView||a.parentWindow;while(a&&!c.isPropagationStopped());return i},i.clean=function(a){var b,c,e=i.unbind;if(!a||3===a.nodeType||8===a.nodeType)return i;if(a[d]&&e(a),a.getElementsByTagName||(a=a.document),a&&a.getElementsByTagName)for(e(a),c=a.getElementsByTagName("*"),b=c.length;b--;)a=c[b],a[d]&&e(a);return i},i.destroy=function(){j={}},i.cancel=function(a){return a&&(a.preventDefault(),a.stopImmediatePropagation()),!1}};return p.Event=new p,p.Event.bind(b,"ready",function(){}),p}),g("j",[],function(){function a(a,b,c,d){var e,f,g,i,k,l,m,n,o,p;if((b?b.ownerDocument||b:L)!==D&&C(b),b=b||D,c=c||[],!a||"string"!=typeof a)return c;if(1!==(i=b.nodeType)&&9!==i)return[];if(F&&!d){if(e=oa.exec(a))if(g=e[1]){if(9===i){if(f=b.getElementById(g),!f||!f.parentNode)return c;if(f.id===g)return c.push(f),c}else if(b.ownerDocument&&(f=b.ownerDocument.getElementById(g))&&J(b,f)&&f.id===g)return c.push(f),c}else{if(e[2])return Y.apply(c,b.getElementsByTagName(a)),c;if((g=e[3])&&s.getElementsByClassName)return Y.apply(c,b.getElementsByClassName(g)),c}if(s.qsa&&(!G||!G.test(a))){if(n=m=K,o=b,p=9===i&&a,1===i&&"object"!==b.nodeName.toLowerCase()){for(l=w(a),(m=b.getAttribute("id"))?n=m.replace(qa,"\\$&"):b.setAttribute("id",n),n="[id='"+n+"'] ",k=l.length;k--;)l[k]=n+j(l[k]);o=pa.test(a)&&h(b.parentNode)||b,p=l.join(",")}if(p)try{return Y.apply(c,o.querySelectorAll(p)),c}catch(a){}finally{m||b.removeAttribute("id")}}}return y(a.replace(ea,"$1"),b,c,d)}function b(){function a(c,d){return b.push(c+" ")>t.cacheLength&&delete a[b.shift()],a[c+" "]=d}var b=[];return a}function c(a){return a[K]=!0,a}function d(a,b){var c=b&&a,d=c&&1===a.nodeType&&1===b.nodeType&&(~b.sourceIndex||T)-(~a.sourceIndex||T);if(d)return d;if(c)for(;c=c.nextSibling;)if(c===b)return-1;return a?1:-1}function e(a){return function(b){var c=b.nodeName.toLowerCase();return"input"===c&&b.type===a}}function f(a){return function(b){var c=b.nodeName.toLowerCase();return("input"===c||"button"===c)&&b.type===a}}function g(a){return c(function(b){return b=+b,c(function(c,d){for(var e,f=a([],c.length,b),g=f.length;g--;)c[e=f[g]]&&(c[e]=!(d[e]=c[e]))})})}function h(a){return a&&typeof a.getElementsByTagName!==S&&a}function i(){}function j(a){for(var b=0,c=a.length,d="";b<c;b++)d+=a[b].value;return d}function k(a,b,c){var d=b.dir,e=c&&"parentNode"===d,f=N++;return b.first?function(b,c,f){for(;b=b[d];)if(1===b.nodeType||e)return a(b,c,f)}:function(b,c,g){var h,i,j=[M,f];if(g){for(;b=b[d];)if((1===b.nodeType||e)&&a(b,c,g))return!0}else for(;b=b[d];)if(1===b.nodeType||e){if(i=b[K]||(b[K]={}),(h=i[d])&&h[0]===M&&h[1]===f)return j[2]=h[2];if(i[d]=j,j[2]=a(b,c,g))return!0}}}function l(a){return a.length>1?function(b,c,d){for(var e=a.length;e--;)if(!a[e](b,c,d))return!1;return!0}:a[0]}function m(b,c,d){for(var e=0,f=c.length;e<f;e++)a(b,c[e],d);return d}function n(a,b,c,d,e){for(var f,g=[],h=0,i=a.length,j=null!=b;h<i;h++)(f=a[h])&&(c&&!c(f,d,e)||(g.push(f),j&&b.push(h)));return g}function o(a,b,d,e,f,g){return e&&!e[K]&&(e=o(e)),f&&!f[K]&&(f=o(f,g)),c(function(c,g,h,i){var j,k,l,o=[],p=[],q=g.length,r=c||m(b||"*",h.nodeType?[h]:h,[]),s=!a||!c&&b?r:n(r,o,a,h,i),t=d?f||(c?a:q||e)?[]:g:s;if(d&&d(s,t,h,i),e)for(j=n(t,p),e(j,[],h,i),k=j.length;k--;)(l=j[k])&&(t[p[k]]=!(s[p[k]]=l));if(c){if(f||a){if(f){for(j=[],k=t.length;k--;)(l=t[k])&&j.push(s[k]=l);f(null,t=[],j,i)}for(k=t.length;k--;)(l=t[k])&&(j=f?$.call(c,l):o[k])>-1&&(c[j]=!(g[j]=l))}}else t=n(t===g?t.splice(q,t.length):t),f?f(null,g,t,i):Y.apply(g,t)})}function p(a){for(var b,c,d,e=a.length,f=t.relative[a[0].type],g=f||t.relative[" "],h=f?1:0,i=k(function(a){return a===b},g,!0),m=k(function(a){return $.call(b,a)>-1},g,!0),n=[function(a,c,d){return!f&&(d||c!==z)||((b=c).nodeType?i(a,c,d):m(a,c,d))}];h<e;h++)if(c=t.relative[a[h].type])n=[k(l(n),c)];else{if(c=t.filter[a[h].type].apply(null,a[h].matches),c[K]){for(d=++h;d<e&&!t.relative[a[d].type];d++);return o(h>1&&l(n),h>1&&j(a.slice(0,h-1).concat({value:" "===a[h-2].type?"*":""})).replace(ea,"$1"),c,h<d&&p(a.slice(h,d)),d<e&&p(a=a.slice(d)),d<e&&j(a))}n.push(c)}return l(n)}function q(b,d){var e=d.length>0,f=b.length>0,g=function(c,g,h,i,j){var k,l,m,o=0,p="0",q=c&&[],r=[],s=z,u=c||f&&t.find.TAG("*",j),v=M+=null==s?1:Math.random()||.1,w=u.length;for(j&&(z=g!==D&&g);p!==w&&null!=(k=u[p]);p++){if(f&&k){for(l=0;m=b[l++];)if(m(k,g,h)){i.push(k);break}j&&(M=v)}e&&((k=!m&&k)&&o--,c&&q.push(k))}if(o+=p,e&&p!==o){for(l=0;m=d[l++];)m(q,r,g,h);if(c){if(o>0)for(;p--;)q[p]||r[p]||(r[p]=W.call(i));r=n(r)}Y.apply(i,r),j&&!c&&r.length>0&&o+d.length>1&&a.uniqueSort(i)}return j&&(M=v,z=s),q};return e?c(g):g}var r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K="sizzle"+-new Date,L=window.document,M=0,N=0,O=b(),P=b(),Q=b(),R=function(a,b){return a===b&&(B=!0),0},S="undefined",T=1<<31,U={}.hasOwnProperty,V=[],W=V.pop,X=V.push,Y=V.push,Z=V.slice,$=V.indexOf||function(a){for(var b=0,c=this.length;b<c;b++)if(this[b]===a)return b;return-1},_="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",aa="[\\x20\\t\\r\\n\\f]",ba="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",ca="\\["+aa+"*("+ba+")(?:"+aa+"*([*^$|!~]?=)"+aa+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+ba+"))|)"+aa+"*\\]",da=":("+ba+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+ca+")*)|.*)\\)|)",ea=new RegExp("^"+aa+"+|((?:^|[^\\\\])(?:\\\\.)*)"+aa+"+$","g"),fa=new RegExp("^"+aa+"*,"+aa+"*"),ga=new RegExp("^"+aa+"*([>+~]|"+aa+")"+aa+"*"),ha=new RegExp("="+aa+"*([^\\]'\"]*?)"+aa+"*\\]","g"),ia=new RegExp(da),ja=new RegExp("^"+ba+"$"),ka={ID:new RegExp("^#("+ba+")"),CLASS:new RegExp("^\\.("+ba+")"),TAG:new RegExp("^("+ba+"|[*])"),ATTR:new RegExp("^"+ca),PSEUDO:new RegExp("^"+da),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+aa+"*(even|odd|(([+-]|)(\\d*)n|)"+aa+"*(?:([+-]|)"+aa+"*(\\d+)|))"+aa+"*\\)|)","i"),bool:new RegExp("^(?:"+_+")$","i"),needsContext:new RegExp("^"+aa+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+aa+"*((?:-\\d)?\\d*)"+aa+"*\\)|)(?=[^-]|$)","i")},la=/^(?:input|select|textarea|button)$/i,ma=/^h\d$/i,na=/^[^{]+\{\s*\[native \w/,oa=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,pa=/[+~]/,qa=/'|\\/g,ra=new RegExp("\\\\([\\da-f]{1,6}"+aa+"?|("+aa+")|.)","ig"),sa=function(a,b,c){var d="0x"+b-65536;return d!==d||c?b:d<0?String.fromCharCode(d+65536):String.fromCharCode(d>>10|55296,1023&d|56320)};try{Y.apply(V=Z.call(L.childNodes),L.childNodes),V[L.childNodes.length].nodeType}catch(a){Y={apply:V.length?function(a,b){X.apply(a,Z.call(b))}:function(a,b){for(var c=a.length,d=0;a[c++]=b[d++];);a.length=c-1}}}s=a.support={},v=a.isXML=function(a){var b=a&&(a.ownerDocument||a).documentElement;return!!b&&"HTML"!==b.nodeName},C=a.setDocument=function(a){function b(a){try{return a.top}catch(a){}return null}var c,e=a?a.ownerDocument||a:L,f=e.defaultView;return e!==D&&9===e.nodeType&&e.documentElement?(D=e,E=e.documentElement,F=!v(e),f&&f!==b(f)&&(f.addEventListener?f.addEventListener("unload",function(){C()},!1):f.attachEvent&&f.attachEvent("onunload",function(){C()})),s.attributes=!0,s.getElementsByTagName=!0,s.getElementsByClassName=na.test(e.getElementsByClassName),s.getById=!0,t.find.ID=function(a,b){if(typeof b.getElementById!==S&&F){var c=b.getElementById(a);return c&&c.parentNode?[c]:[]}},t.filter.ID=function(a){var b=a.replace(ra,sa);return function(a){return a.getAttribute("id")===b}},t.find.TAG=s.getElementsByTagName?function(a,b){if(typeof b.getElementsByTagName!==S)return b.getElementsByTagName(a)}:function(a,b){var c,d=[],e=0,f=b.getElementsByTagName(a);if("*"===a){for(;c=f[e++];)1===c.nodeType&&d.push(c);return d}return f},t.find.CLASS=s.getElementsByClassName&&function(a,b){if(F)return b.getElementsByClassName(a)},H=[],G=[],s.disconnectedMatch=!0,G=G.length&&new RegExp(G.join("|")),H=H.length&&new RegExp(H.join("|")),c=na.test(E.compareDocumentPosition),J=c||na.test(E.contains)?function(a,b){var c=9===a.nodeType?a.documentElement:a,d=b&&b.parentNode;return a===d||!(!d||1!==d.nodeType||!(c.contains?c.contains(d):a.compareDocumentPosition&&16&a.compareDocumentPosition(d)))}:function(a,b){if(b)for(;b=b.parentNode;)if(b===a)return!0;return!1},R=c?function(a,b){if(a===b)return B=!0,0;var c=!a.compareDocumentPosition-!b.compareDocumentPosition;return c?c:(c=(a.ownerDocument||a)===(b.ownerDocument||b)?a.compareDocumentPosition(b):1,1&c||!s.sortDetached&&b.compareDocumentPosition(a)===c?a===e||a.ownerDocument===L&&J(L,a)?-1:b===e||b.ownerDocument===L&&J(L,b)?1:A?$.call(A,a)-$.call(A,b):0:4&c?-1:1)}:function(a,b){if(a===b)return B=!0,0;var c,f=0,g=a.parentNode,h=b.parentNode,i=[a],j=[b];if(!g||!h)return a===e?-1:b===e?1:g?-1:h?1:A?$.call(A,a)-$.call(A,b):0;if(g===h)return d(a,b);for(c=a;c=c.parentNode;)i.unshift(c);for(c=b;c=c.parentNode;)j.unshift(c);for(;i[f]===j[f];)f++;return f?d(i[f],j[f]):i[f]===L?-1:j[f]===L?1:0},e):D},a.matches=function(b,c){return a(b,null,null,c)},a.matchesSelector=function(b,c){if((b.ownerDocument||b)!==D&&C(b),c=c.replace(ha,"='$1']"),s.matchesSelector&&F&&(!H||!H.test(c))&&(!G||!G.test(c)))try{var d=I.call(b,c);if(d||s.disconnectedMatch||b.document&&11!==b.document.nodeType)return d}catch(a){}return a(c,D,null,[b]).length>0},a.contains=function(a,b){return(a.ownerDocument||a)!==D&&C(a),J(a,b)},a.attr=function(a,b){(a.ownerDocument||a)!==D&&C(a);var c=t.attrHandle[b.toLowerCase()],d=c&&U.call(t.attrHandle,b.toLowerCase())?c(a,b,!F):void 0;return void 0!==d?d:s.attributes||!F?a.getAttribute(b):(d=a.getAttributeNode(b))&&d.specified?d.value:null},a.error=function(a){throw new Error("Syntax error, unrecognized expression: "+a)},a.uniqueSort=function(a){var b,c=[],d=0,e=0;if(B=!s.detectDuplicates,A=!s.sortStable&&a.slice(0),a.sort(R),B){for(;b=a[e++];)b===a[e]&&(d=c.push(e));for(;d--;)a.splice(c[d],1)}return A=null,a},u=a.getText=function(a){var b,c="",d=0,e=a.nodeType;if(e){if(1===e||9===e||11===e){if("string"==typeof a.textContent)return a.textContent;for(a=a.firstChild;a;a=a.nextSibling)c+=u(a)}else if(3===e||4===e)return a.nodeValue}else for(;b=a[d++];)c+=u(b);return c},t=a.selectors={cacheLength:50,createPseudo:c,match:ka,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(a){return a[1]=a[1].replace(ra,sa),a[3]=(a[3]||a[4]||a[5]||"").replace(ra,sa),"~="===a[2]&&(a[3]=" "+a[3]+" "),a.slice(0,4)},CHILD:function(b){return b[1]=b[1].toLowerCase(),"nth"===b[1].slice(0,3)?(b[3]||a.error(b[0]),b[4]=+(b[4]?b[5]+(b[6]||1):2*("even"===b[3]||"odd"===b[3])),b[5]=+(b[7]+b[8]||"odd"===b[3])):b[3]&&a.error(b[0]),b},PSEUDO:function(a){var b,c=!a[6]&&a[2];return ka.CHILD.test(a[0])?null:(a[3]?a[2]=a[4]||a[5]||"":c&&ia.test(c)&&(b=w(c,!0))&&(b=c.indexOf(")",c.length-b)-c.length)&&(a[0]=a[0].slice(0,b),a[2]=c.slice(0,b)),a.slice(0,3))}},filter:{TAG:function(a){var b=a.replace(ra,sa).toLowerCase();return"*"===a?function(){return!0}:function(a){return a.nodeName&&a.nodeName.toLowerCase()===b}},CLASS:function(a){var b=O[a+" "];return b||(b=new RegExp("(^|"+aa+")"+a+"("+aa+"|$)"))&&O(a,function(a){return b.test("string"==typeof a.className&&a.className||typeof a.getAttribute!==S&&a.getAttribute("class")||"")})},ATTR:function(b,c,d){return function(e){var f=a.attr(e,b);return null==f?"!="===c:!c||(f+="","="===c?f===d:"!="===c?f!==d:"^="===c?d&&0===f.indexOf(d):"*="===c?d&&f.indexOf(d)>-1:"$="===c?d&&f.slice(-d.length)===d:"~="===c?(" "+f+" ").indexOf(d)>-1:"|="===c&&(f===d||f.slice(0,d.length+1)===d+"-"))}},CHILD:function(a,b,c,d,e){var f="nth"!==a.slice(0,3),g="last"!==a.slice(-4),h="of-type"===b;return 1===d&&0===e?function(a){return!!a.parentNode}:function(b,c,i){var j,k,l,m,n,o,p=f!==g?"nextSibling":"previousSibling",q=b.parentNode,r=h&&b.nodeName.toLowerCase(),s=!i&&!h;if(q){if(f){for(;p;){for(l=b;l=l[p];)if(h?l.nodeName.toLowerCase()===r:1===l.nodeType)return!1;o=p="only"===a&&!o&&"nextSibling"}return!0}if(o=[g?q.firstChild:q.lastChild],g&&s){for(k=q[K]||(q[K]={}),j=k[a]||[],n=j[0]===M&&j[1],m=j[0]===M&&j[2],l=n&&q.childNodes[n];l=++n&&l&&l[p]||(m=n=0)||o.pop();)if(1===l.nodeType&&++m&&l===b){k[a]=[M,n,m];break}}else if(s&&(j=(b[K]||(b[K]={}))[a])&&j[0]===M)m=j[1];else for(;(l=++n&&l&&l[p]||(m=n=0)||o.pop())&&((h?l.nodeName.toLowerCase()!==r:1!==l.nodeType)||!++m||(s&&((l[K]||(l[K]={}))[a]=[M,m]),l!==b)););return m-=e,m===d||m%d===0&&m/d>=0}}},PSEUDO:function(b,d){var e,f=t.pseudos[b]||t.setFilters[b.toLowerCase()]||a.error("unsupported pseudo: "+b);return f[K]?f(d):f.length>1?(e=[b,b,"",d],t.setFilters.hasOwnProperty(b.toLowerCase())?c(function(a,b){for(var c,e=f(a,d),g=e.length;g--;)c=$.call(a,e[g]),a[c]=!(b[c]=e[g])}):function(a){return f(a,0,e)}):f}},pseudos:{not:c(function(a){var b=[],d=[],e=x(a.replace(ea,"$1"));return e[K]?c(function(a,b,c,d){for(var f,g=e(a,null,d,[]),h=a.length;h--;)(f=g[h])&&(a[h]=!(b[h]=f))}):function(a,c,f){return b[0]=a,e(b,null,f,d),!d.pop()}}),has:c(function(b){return function(c){return a(b,c).length>0}}),contains:c(function(a){return a=a.replace(ra,sa),function(b){return(b.textContent||b.innerText||u(b)).indexOf(a)>-1}}),lang:c(function(b){return ja.test(b||"")||a.error("unsupported lang: "+b),b=b.replace(ra,sa).toLowerCase(),function(a){var c;do if(c=F?a.lang:a.getAttribute("xml:lang")||a.getAttribute("lang"))return c=c.toLowerCase(),c===b||0===c.indexOf(b+"-");while((a=a.parentNode)&&1===a.nodeType);return!1}}),target:function(a){var b=window.location&&window.location.hash;return b&&b.slice(1)===a.id},root:function(a){return a===E},focus:function(a){return a===D.activeElement&&(!D.hasFocus||D.hasFocus())&&!!(a.type||a.href||~a.tabIndex)},enabled:function(a){return a.disabled===!1},disabled:function(a){return a.disabled===!0},checked:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&!!a.checked||"option"===b&&!!a.selected},selected:function(a){return a.parentNode&&a.parentNode.selectedIndex,a.selected===!0},empty:function(a){for(a=a.firstChild;a;a=a.nextSibling)if(a.nodeType<6)return!1;return!0},parent:function(a){return!t.pseudos.empty(a)},header:function(a){return ma.test(a.nodeName)},input:function(a){return la.test(a.nodeName)},button:function(a){var b=a.nodeName.toLowerCase();return"input"===b&&"button"===a.type||"button"===b},text:function(a){var b;return"input"===a.nodeName.toLowerCase()&&"text"===a.type&&(null==(b=a.getAttribute("type"))||"text"===b.toLowerCase())},first:g(function(){return[0]}),last:g(function(a,b){return[b-1]}),eq:g(function(a,b,c){return[c<0?c+b:c]}),even:g(function(a,b){for(var c=0;c<b;c+=2)a.push(c);return a}),odd:g(function(a,b){for(var c=1;c<b;c+=2)a.push(c);return a}),lt:g(function(a,b,c){for(var d=c<0?c+b:c;--d>=0;)a.push(d);return a}),gt:g(function(a,b,c){for(var d=c<0?c+b:c;++d<b;)a.push(d);return a})}},t.pseudos.nth=t.pseudos.eq;for(r in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})t.pseudos[r]=e(r);for(r in{submit:!0,reset:!0})t.pseudos[r]=f(r);return i.prototype=t.filters=t.pseudos,t.setFilters=new i,w=a.tokenize=function(b,c){var d,e,f,g,h,i,j,k=P[b+" "];if(k)return c?0:k.slice(0);for(h=b,i=[],j=t.preFilter;h;){d&&!(e=fa.exec(h))||(e&&(h=h.slice(e[0].length)||h),i.push(f=[])),d=!1,(e=ga.exec(h))&&(d=e.shift(),f.push({value:d,type:e[0].replace(ea," ")}),h=h.slice(d.length));for(g in t.filter)!(e=ka[g].exec(h))||j[g]&&!(e=j[g](e))||(d=e.shift(),f.push({value:d,type:g,matches:e}),h=h.slice(d.length));if(!d)break}return c?h.length:h?a.error(b):P(b,i).slice(0)},x=a.compile=function(a,b){var c,d=[],e=[],f=Q[a+" "];if(!f){for(b||(b=w(a)),c=b.length;c--;)f=p(b[c]),f[K]?d.push(f):e.push(f);f=Q(a,q(e,d)),f.selector=a}return f},y=a.select=function(a,b,c,d){var e,f,g,i,k,l="function"==typeof a&&a,m=!d&&w(a=l.selector||a);if(c=c||[],1===m.length){if(f=m[0]=m[0].slice(0),f.length>2&&"ID"===(g=f[0]).type&&s.getById&&9===b.nodeType&&F&&t.relative[f[1].type]){if(b=(t.find.ID(g.matches[0].replace(ra,sa),b)||[])[0],!b)return c;l&&(b=b.parentNode),a=a.slice(f.shift().value.length)}for(e=ka.needsContext.test(a)?0:f.length;e--&&(g=f[e],!t.relative[i=g.type]);)if((k=t.find[i])&&(d=k(g.matches[0].replace(ra,sa),pa.test(f[0].type)&&h(b.parentNode)||b))){if(f.splice(e,1),a=d.length&&j(f),!a)return Y.apply(c,d),c;break}}return(l||x(a,m))(d,b,!F,c,pa.test(a)&&h(b.parentNode)||b),c},s.sortStable=K.split("").sort(R).join("")===K,s.detectDuplicates=!!B,C(),s.sortDetached=!0,a}),g("1r",[],function(){var a=Array.isArray||function(a){return"[object Array]"===Object.prototype.toString.call(a)},b=function(b){var c,d,e=b;if(!a(b))for(e=[],c=0,d=b.length;c<d;c++)e[c]=b[c];return e},c=function(a,b,c){var d,e;if(!a)return 0;if(c=c||a,void 0!==a.length){for(d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a)===!1)return 0}else for(d in a)if(a.hasOwnProperty(d)&&b.call(c,a[d],d,a)===!1)return 0;return 1},d=function(a,b){var d=[];return c(a,function(c,e){d.push(b(c,e,a))}),d},e=function(a,b){var d=[];return c(a,function(c,e){b&&!b(c,e,a)||d.push(c)}),d},f=function(a,b){var c,d;if(a)for(c=0,d=a.length;c<d;c++)if(a[c]===b)return c;return-1},g=function(a,b,c,d){
var e=0;for(arguments.length<3&&(c=a[0]);e<a.length;e++)c=b.call(d,c,a[e],e);return c},h=function(a,b,c){var d,e;for(d=0,e=a.length;d<e;d++)if(b.call(c,a[d],d,a))return d;return-1},i=function(a,b,c){var d=h(a,b,c);if(d!==-1)return a[d]},j=function(a){return a[a.length-1]};return{isArray:a,toArray:b,each:c,map:d,filter:e,indexOf:f,reduce:g,findIndex:h,find:i,last:j}}),g("1e",["2","p","1r"],function(a,b,c){var d=/^\s*|\s*$/g,e=function(a){return null===a||void 0===a?"":(""+a).replace(d,"")},f=function(a,b){return b?!("array"!=b||!c.isArray(a))||typeof a==b:void 0!==a},g=function(a,b,c){var d;for(a=a||[],b=b||",","string"==typeof a&&(a=a.split(b)),c=c||{},d=a.length;d--;)c[a[d]]={};return c},h=function(a,b){return Object.prototype.hasOwnProperty.call(a,b)},i=function(a,b,c){var d,e,f,g,h,i=this,j=0;if(a=/^((static) )?([\w.]+)(:([\w.]+))?/.exec(a),f=a[3].match(/(^|\.)(\w+)$/i)[2],e=i.createNS(a[3].replace(/\.\w+$/,""),c),!e[f]){if("static"==a[2])return e[f]=b,void(this.onCreate&&this.onCreate(a[2],a[3],e[f]));b[f]||(b[f]=function(){},j=1),e[f]=b[f],i.extend(e[f].prototype,b),a[5]&&(d=i.resolve(a[5]).prototype,g=a[5].match(/\.(\w+)$/i)[1],h=e[f],j?e[f]=function(){return d[g].apply(this,arguments)}:e[f]=function(){return this.parent=d[g],h.apply(this,arguments)},e[f].prototype[f]=e[f],i.each(d,function(a,b){e[f].prototype[b]=d[b]}),i.each(b,function(a,b){d[b]?e[f].prototype[b]=function(){return this.parent=d[b],a.apply(this,arguments)}:b!=f&&(e[f].prototype[b]=a)})),i.each(b["static"],function(a,b){e[f][b]=a})}},j=function(a,b){var c,d,e,f,g=arguments;for(c=1,d=g.length;c<d;c++){b=g[c];for(e in b)b.hasOwnProperty(e)&&(f=b[e],void 0!==f&&(a[e]=f))}return a},k=function(a,b,d,e){e=e||this,a&&(d&&(a=a[d]),c.each(a,function(a,c){return b.call(e,a,c,d)!==!1&&void k(a,b,d,e)}))},l=function(b,c){var d,e;for(c=c||a,b=b.split("."),d=0;d<b.length;d++)e=b[d],c[e]||(c[e]={}),c=c[e];return c},m=function(b,c){var d,e;for(c=c||a,b=b.split("."),d=0,e=b.length;d<e&&(c=c[b[d]],c);d++);return c},n=function(a,b){return!a||f(a,"array")?a:c.map(a.split(b||","),e)},o=function(a){var c=b.cacheSuffix;return c&&(a+=(a.indexOf("?")===-1?"?":"&")+c),a};return{trim:e,isArray:c.isArray,is:f,toArray:c.toArray,makeMap:g,each:c.each,map:c.map,grep:c.filter,inArray:c.indexOf,hasOwn:h,extend:j,create:i,walk:k,createNS:l,resolve:m,explode:n,_addCacheSuffix:o}}),g("c",["1j","e","j","p","1e"],function(a,b,c,d,e){var f,g=a,h=Array.prototype.push,i=Array.prototype.slice,j=/^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,k=b.Event,l=e.makeMap("children,contents,next,prev"),m=function(a){return"undefined"!=typeof a},n=function(a){return"string"==typeof a},o=function(a){return a&&a==a.window},p=function(a,b){var c,d,e;for(b=b||g,e=b.createElement("div"),c=b.createDocumentFragment(),e.innerHTML=a;d=e.firstChild;)c.appendChild(d);return c},q=function(a,b,c,d){var e;if(n(b))b=p(b,F(a[0]));else if(b.length&&!b.nodeType){if(b=z.makeArray(b),d)for(e=b.length-1;e>=0;e--)q(a,b[e],c,d);else for(e=0;e<b.length;e++)q(a,b[e],c,d);return a}if(b.nodeType)for(e=a.length;e--;)c.call(a[e],b);return a},r=function(a,b){return a&&b&&(" "+a.className+" ").indexOf(" "+b+" ")!==-1},s=function(a,b,c){var d,e;return b=z(b)[0],a.each(function(){var a=this;c&&d==a.parentNode?e.appendChild(a):(d=a.parentNode,e=b.cloneNode(!1),a.parentNode.insertBefore(e,a),e.appendChild(a))}),a},t=e.makeMap("fillOpacity fontWeight lineHeight opacity orphans widows zIndex zoom"," "),u=e.makeMap("checked compact declare defer disabled ismap multiple nohref noshade nowrap readonly selected"," "),v={"for":"htmlFor","class":"className",readonly:"readOnly"},w={"float":"cssFloat"},x={},y={},z=function(a,b){return new z.fn.init(a,b)},A=function(a,b){var c;if(b.indexOf)return b.indexOf(a);for(c=b.length;c--;)if(b[c]===a)return c;return-1},B=/^\s*|\s*$/g,C=function(a){return null===a||a===f?"":(""+a).replace(B,"")},D=function(a,b){var c,d,e,f,g;if(a)if(c=a.length,c===f){for(d in a)if(a.hasOwnProperty(d)&&(g=a[d],b.call(g,d,g)===!1))break}else for(e=0;e<c&&(g=a[e],b.call(g,e,g)!==!1);e++);return a},E=function(a,b){var c=[];return D(a,function(a,d){b(d,a)&&c.push(d)}),c},F=function(a){return a?9==a.nodeType?a:a.ownerDocument:g};z.fn=z.prototype={constructor:z,selector:"",context:null,length:0,init:function(b,c){var d,e,f=this;if(!b)return f;if(b.nodeType)return f.context=f[0]=b,f.length=1,f;if(c&&c.nodeType)f.context=c;else{if(c)return z(b).attr(c);f.context=c=a}if(n(b)){if(f.selector=b,d="<"===b.charAt(0)&&">"===b.charAt(b.length-1)&&b.length>=3?[null,b,null]:j.exec(b),!d)return z(c).find(b);if(d[1])for(e=p(b,F(c)).firstChild;e;)h.call(f,e),e=e.nextSibling;else{if(e=F(c).getElementById(d[2]),!e)return f;if(e.id!==d[2])return f.find(b);f.length=1,f[0]=e}}else this.add(b,!1);return f},toArray:function(){return e.toArray(this)},add:function(a,b){var c,d,e=this;if(n(a))return e.add(z(a));if(b!==!1)for(c=z.unique(e.toArray().concat(z.makeArray(a))),e.length=c.length,d=0;d<c.length;d++)e[d]=c[d];else h.apply(e,z.makeArray(a));return e},attr:function(a,b){var c,d=this;if("object"==typeof a)D(a,function(a,b){d.attr(a,b)});else{if(!m(b)){if(d[0]&&1===d[0].nodeType){if(c=x[a],c&&c.get)return c.get(d[0],a);if(u[a])return d.prop(a)?a:f;b=d[0].getAttribute(a,2),null===b&&(b=f)}return b}this.each(function(){var c;if(1===this.nodeType){if(c=x[a],c&&c.set)return void c.set(this,b);null===b?this.removeAttribute(a,2):this.setAttribute(a,b,2)}})}return d},removeAttr:function(a){return this.attr(a,null)},prop:function(a,b){var c=this;if(a=v[a]||a,"object"==typeof a)D(a,function(a,b){c.prop(a,b)});else{if(!m(b))return c[0]&&c[0].nodeType&&a in c[0]?c[0][a]:b;this.each(function(){1==this.nodeType&&(this[a]=b)})}return c},css:function(a,b){var c,d,e=this,g=function(a){return a.replace(/-(\D)/g,function(a,b){return b.toUpperCase()})},h=function(a){return a.replace(/[A-Z]/g,function(a){return"-"+a})};if("object"==typeof a)D(a,function(a,b){e.css(a,b)});else if(m(b))a=g(a),"number"!=typeof b||t[a]||(b+="px"),e.each(function(){var c=this.style;if(d=y[a],d&&d.set)return void d.set(this,b);try{this.style[w[a]||a]=b}catch(a){}null!==b&&""!==b||(c.removeProperty?c.removeProperty(h(a)):c.removeAttribute(a))});else{if(c=e[0],d=y[a],d&&d.get)return d.get(c);if(c.ownerDocument.defaultView)try{return c.ownerDocument.defaultView.getComputedStyle(c,null).getPropertyValue(h(a))}catch(a){return f}else if(c.currentStyle)return c.currentStyle[g(a)]}return e},remove:function(){for(var a,b=this,c=this.length;c--;)a=b[c],k.clean(a),a.parentNode&&a.parentNode.removeChild(a);return this},empty:function(){for(var a,b=this,c=this.length;c--;)for(a=b[c];a.firstChild;)a.removeChild(a.firstChild);return this},html:function(a){var b,c=this;if(m(a)){b=c.length;try{for(;b--;)c[b].innerHTML=a}catch(d){z(c[b]).empty().append(a)}return c}return c[0]?c[0].innerHTML:""},text:function(a){var b,c=this;if(m(a)){for(b=c.length;b--;)"innerText"in c[b]?c[b].innerText=a:c[0].textContent=a;return c}return c[0]?c[0].innerText||c[0].textContent:""},append:function(){return q(this,arguments,function(a){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.appendChild(a)})},prepend:function(){return q(this,arguments,function(a){(1===this.nodeType||this.host&&1===this.host.nodeType)&&this.insertBefore(a,this.firstChild)},!0)},before:function(){var a=this;return a[0]&&a[0].parentNode?q(a,arguments,function(a){this.parentNode.insertBefore(a,this)}):a},after:function(){var a=this;return a[0]&&a[0].parentNode?q(a,arguments,function(a){this.parentNode.insertBefore(a,this.nextSibling)},!0):a},appendTo:function(a){return z(a).append(this),this},prependTo:function(a){return z(a).prepend(this),this},replaceWith:function(a){return this.before(a).remove()},wrap:function(a){return s(this,a)},wrapAll:function(a){return s(this,a,!0)},wrapInner:function(a){return this.each(function(){z(this).contents().wrapAll(a)}),this},unwrap:function(){return this.parent().each(function(){z(this).replaceWith(this.childNodes)})},clone:function(){var a=[];return this.each(function(){a.push(this.cloneNode(!0))}),z(a)},addClass:function(a){return this.toggleClass(a,!0)},removeClass:function(a){return this.toggleClass(a,!1)},toggleClass:function(a,b){var c=this;return"string"!=typeof a?c:(a.indexOf(" ")!==-1?D(a.split(" "),function(){c.toggleClass(this,b)}):c.each(function(c,d){var e,f;f=r(d,a),f!==b&&(e=d.className,f?d.className=C((" "+e+" ").replace(" "+a+" "," ")):d.className+=e?" "+a:a)}),c)},hasClass:function(a){return r(this[0],a)},each:function(a){return D(this,a)},on:function(a,b){return this.each(function(){k.bind(this,a,b)})},off:function(a,b){return this.each(function(){k.unbind(this,a,b)})},trigger:function(a){return this.each(function(){"object"==typeof a?k.fire(this,a.type,a):k.fire(this,a)})},show:function(){return this.css("display","")},hide:function(){return this.css("display","none")},slice:function(){return new z(i.apply(this,arguments))},eq:function(a){return a===-1?this.slice(a):this.slice(a,+a+1)},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},find:function(a){var b,c,d=[];for(b=0,c=this.length;b<c;b++)z.find(a,this[b],d);return z(d)},filter:function(a){return z("function"==typeof a?E(this.toArray(),function(b,c){return a(c,b)}):z.filter(a,this.toArray()))},closest:function(a){var b=[];return a instanceof z&&(a=a[0]),this.each(function(c,d){for(;d;){if("string"==typeof a&&z(d).is(a)){b.push(d);break}if(d==a){b.push(d);break}d=d.parentNode}}),z(b)},offset:function(a){var b,c,d,e,f=0,g=0;return a?this.css(a):(b=this[0],b&&(c=b.ownerDocument,d=c.documentElement,b.getBoundingClientRect&&(e=b.getBoundingClientRect(),f=e.left+(d.scrollLeft||c.body.scrollLeft)-d.clientLeft,g=e.top+(d.scrollTop||c.body.scrollTop)-d.clientTop)),{left:f,top:g})},push:h,sort:[].sort,splice:[].splice},e.extend(z,{extend:e.extend,makeArray:function(a){return o(a)||a.nodeType?[a]:e.toArray(a)},inArray:A,isArray:e.isArray,each:D,trim:C,grep:E,find:c,expr:c.selectors,unique:c.uniqueSort,text:c.getText,contains:c.contains,filter:function(a,b,c){var d=b.length;for(c&&(a=":not("+a+")");d--;)1!=b[d].nodeType&&b.splice(d,1);return b=1===b.length?z.find.matchesSelector(b[0],a)?[b[0]]:[]:z.find.matches(a,b)}});var G=function(a,b,c){var d=[],e=a[b];for("string"!=typeof c&&c instanceof z&&(c=c[0]);e&&9!==e.nodeType;){if(void 0!==c){if(e===c)break;if("string"==typeof c&&z(e).is(c))break}1===e.nodeType&&d.push(e),e=e[b]}return d},H=function(a,b,c,d){var e=[];for(d instanceof z&&(d=d[0]);a;a=a[b])if(!c||a.nodeType===c){if(void 0!==d){if(a===d)break;if("string"==typeof d&&z(a).is(d))break}e.push(a)}return e},I=function(a,b,c){for(a=a[b];a;a=a[b])if(a.nodeType==c)return a;return null};D({parent:function(a){var b=a.parentNode;return b&&11!==b.nodeType?b:null},parents:function(a){return G(a,"parentNode")},next:function(a){return I(a,"nextSibling",1)},prev:function(a){return I(a,"previousSibling",1)},children:function(a){return H(a.firstChild,"nextSibling",1)},contents:function(a){return e.toArray(("iframe"===a.nodeName?a.contentDocument||a.contentWindow.document:a).childNodes)}},function(a,b){z.fn[a]=function(c){var d=this,e=[];return d.each(function(){var a=b.call(e,this,c,e);a&&(z.isArray(a)?e.push.apply(e,a):e.push(a))}),this.length>1&&(l[a]||(e=z.unique(e)),0===a.indexOf("parents")&&(e=e.reverse())),e=z(e),c?e.filter(c):e}}),D({parentsUntil:function(a,b){return G(a,"parentNode",b)},nextUntil:function(a,b){return H(a,"nextSibling",1,b).slice(1)},prevUntil:function(a,b){return H(a,"previousSibling",1,b).slice(1)}},function(a,b){z.fn[a]=function(c,d){var e=this,f=[];return e.each(function(){var a=b.call(f,this,c,f);a&&(z.isArray(a)?f.push.apply(f,a):f.push(a))}),this.length>1&&(f=z.unique(f),0!==a.indexOf("parents")&&"prevUntil"!==a||(f=f.reverse())),f=z(f),d?f.filter(d):f}}),z.fn.is=function(a){return!!a&&this.filter(a).length>0},z.fn.init.prototype=z.fn,z.overrideDefaults=function(a){var b,c=function(d,e){return b=b||a(),0===arguments.length&&(d=b.element),e||(e=b.context),new c.fn.init(d,e)};return z.extend(c,this),c};var J=function(a,b,c){D(c,function(c,d){a[c]=a[c]||{},a[c][b]=d})};return d.ie&&d.ie<8&&(J(x,"get",{maxlength:function(a){var b=a.maxLength;return 2147483647===b?f:b},size:function(a){var b=a.size;return 20===b?f:b},"class":function(a){return a.className},style:function(a){var b=a.style.cssText;return 0===b.length?f:b}}),J(x,"set",{"class":function(a,b){a.className=b},style:function(a,b){a.style.cssText=b}})),d.ie&&d.ie<9&&(w["float"]="styleFloat",J(y,"set",{opacity:function(a,b){var c=a.style;null===b||""===b?c.removeAttribute("filter"):(c.zoom=1,c.filter="alpha(opacity="+100*b+")")}})),z.attrHooks=x,z.cssHooks=y,z}),g("4b",["1i","23","1q"],function(a,b,c){var d=function(e){var f=b.none(),g=[],h=function(a){return d(function(b){i(function(c){b(a(c))})})},i=function(a){k()?m(a):g.push(a)},j=function(a){f=b.some(a),l(g),g=[]},k=function(){return f.isSome()},l=function(b){a.each(b,m)},m=function(a){f.each(function(b){c(function(){a(b)},0)})};return e(j),{get:i,map:h,isReady:k}},e=function(a){return d(function(b){b(a)})};return{nu:d,pure:e}}),g("4c",["4","1q"],function(a,b){var c=function(c){return function(){var d=a.prototype.slice.call(arguments),e=this;b(function(){c.apply(e,d)},0)}};return{bounce:c}}),g("31",["4b","4c"],function(a,b){var c=function(d){var e=function(a){d(b.bounce(a))},f=function(a){return c(function(b){e(function(c){var d=a(c);b(d)})})},g=function(a){return c(function(b){e(function(c){a(c).get(b)})})},h=function(a){return c(function(b){e(function(c){a.get(b)})})},i=function(){return a.nu(e)};return{map:f,bind:g,anonBind:h,toLazy:i,get:e}},d=function(a){return c(function(b){b(a)})};return{nu:c,pure:d}}),g("4d",["1i"],function(a){var b=function(b,c){return c(function(c){var d=[],e=0,f=function(a){return function(f){d[a]=f,e++,e>=b.length&&c(d)}};0===b.length?c([]):a.each(b,function(a,b){a.get(f(b))})})};return{par:b}}),g("32",["1i","31","4d"],function(a,b,c){var d=function(a){return c.par(a,b.nu)},e=function(b,c){var e=a.map(b,c);return d(e)},f=function(a,b){return function(c){return b(c).bind(a)}};return{par:d,mapM:e,compose:f}}),g("33",["1","23"],function(a,b){var c=function(d){var e=function(a){return d===a},f=function(a){return c(d)},g=function(a){return c(d)},h=function(a){return c(a(d))},i=function(a){a(d)},j=function(a){return a(d)},k=function(a,b){return b(d)},l=function(a){return a(d)},m=function(a){return a(d)},n=function(){return b.some(d)};return{is:e,isValue:a.constant(!0),isError:a.constant(!1),getOr:a.constant(d),getOrThunk:a.constant(d),getOrDie:a.constant(d),or:f,orThunk:g,fold:k,map:h,each:i,bind:j,exists:l,forall:m,toOption:n}},d=function(c){var e=function(a){return a()},f=function(){return a.die(c)()},g=function(a){return a},h=function(a){return a()},i=function(a){return d(c)},j=function(a){return d(c)},k=function(a,b){return a(c)};return{is:a.constant(!1),isValue:a.constant(!1),isError:a.constant(!0),getOr:a.identity,getOrThunk:e,getOrDie:f,or:g,orThunk:h,fold:k,map:i,each:a.noop,bind:j,exists:a.constant(!1),forall:a.constant(!0),toOption:b.none}};return{value:c,error:d}}),g("1s",["1i","1","31","32","33","1m","15","1e"],function(a,b,c,d,e,f,g,h){"use strict";return function(i,j){var k,l=0,m={};j=j||{},k=j.maxLoadTime||5e3;var n=function(a){i.getElementsByTagName("head")[0].appendChild(a)},o=function(a,b,c){var d,e,j,o,p=function(){for(var a=o.passed,b=a.length;b--;)a[b]();o.status=2,o.passed=[],o.failed=[]},q=function(){for(var a=o.failed,b=a.length;b--;)a[b]();o.status=3,o.passed=[],o.failed=[]},r=function(){var a=f.userAgent.match(/WebKit\/(\d*)/);return!!(a&&a[1]<536)},s=function(a,b){a()||((new Date).getTime()-j<k?g.setTimeout(b):q())},t=function(){s(function(){for(var a,b,c=i.styleSheets,e=c.length;e--;)if(a=c[e],b=a.ownerNode?a.ownerNode:a.owningElement,b&&b.id===d.id)return p(),!0},t)},u=function(){s(function(){try{var a=e.sheet.cssRules;return p(),!!a}catch(a){}},u)};if(a=h._addCacheSuffix(a),m[a]?o=m[a]:(o={passed:[],failed:[]},m[a]=o),b&&o.passed.push(b),c&&o.failed.push(c),1!=o.status){if(2==o.status)return void p();if(3==o.status)return void q();if(o.status=1,d=i.createElement("link"),d.rel="stylesheet",d.type="text/css",d.id="u"+l++,d.async=!1,d.defer=!1,j=(new Date).getTime(),"onload"in d&&!r())d.onload=t,d.onerror=q;else{if(f.userAgent.indexOf("Firefox")>0)return e=i.createElement("style"),e.textContent='@import "'+a+'"',u(),void n(e);t()}n(d),d.href=a}},p=function(a){return c.nu(function(c){o(a,b.compose(c,b.constant(e.value(a))),b.compose(c,b.constant(e.error(a))))})},q=function(a){return a.fold(b.identity,b.identity)},r=function(b,c,e){d.par(a.map(b,p)).get(function(b){var d=a.partition(b,function(a){return a.isValue()});d.fail.length>0?e(d.fail.map(q)):c(d.pass.map(q))})};return{load:o,loadAll:r}}}),g("k",[],function(){return function(a,b){var c=a,d=function(a,c,d,e){var f,g;if(a){if(!e&&a[c])return a[c];if(a!=b){if(f=a[d])return f;for(g=a.parentNode;g&&g!=b;g=g.parentNode)if(f=g[d])return f}}},e=function(a,c,d,e){var f,g,h;if(a){if(f=a[d],b&&f===b)return;if(f){if(!e)for(h=f[c];h;h=h[c])if(!h[c])return h;return f}if(g=a.parentNode,g&&g!==b)return g}};this.current=function(){return c},this.next=function(a){return c=d(c,"firstChild","nextSibling",a)},this.prev=function(a){return c=d(c,"lastChild","previousSibling",a)},this.prev2=function(a){return c=e(c,"lastChild","previousSibling",a)}}}),g("34",[],function(){return"undefined"==typeof console&&(console={log:function(){}}),console}),g("1t",["1","5","34","1j"],function(a,b,c,d){var e=function(a,b){var e=b||d,f=e.createElement("div");if(f.innerHTML=a,!f.hasChildNodes()||f.childNodes.length>1)throw c.error("HTML does not have a single root node",a),"HTML must have a single root node";return h(f.childNodes[0])},f=function(a,b){var c=b||d,e=c.createElement(a);return h(e)},g=function(a,b){var c=b||d,e=c.createTextNode(a);return h(e)},h=function(c){if(null===c||void 0===c)throw new b("Node cannot be null or undefined");return{dom:a.constant(c)}};return{fromHtml:e,fromTag:f,fromText:g,fromDom:h}}),g("t",["1t","1e"],function(a,b){var c,d,e,f=b.makeMap,g=/[&<>\"\u0060\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,h=/[<>&\u007E-\uD7FF\uE000-\uFFEF]|[\uD800-\uDBFF][\uDC00-\uDFFF]/g,i=/[<>&\"\']/g,j=/&#([a-z0-9]+);?|&([a-z0-9]+);/gi,k={128:"\u20ac",130:"\u201a",131:"\u0192",132:"\u201e",133:"\u2026",134:"\u2020",135:"\u2021",136:"\u02c6",137:"\u2030",138:"\u0160",139:"\u2039",140:"\u0152",142:"\u017d",145:"\u2018",146:"\u2019",147:"\u201c",148:"\u201d",149:"\u2022",150:"\u2013",151:"\u2014",152:"\u02dc",153:"\u2122",154:"\u0161",155:"\u203a",156:"\u0153",158:"\u017e",159:"\u0178"};d={'"':"&quot;","'":"&#39;","<":"&lt;",">":"&gt;","&":"&amp;","`":"&#96;"},e={"&lt;":"<","&gt;":">","&amp;":"&","&quot;":'"',"&apos;":"'"};var l=function(b){var c;return c=a.fromTag("div").dom(),c.innerHTML=b,c.textContent||c.innerText||b},m=function(a,b){var c,e,f,g={};if(a){for(a=a.split(","),b=b||10,c=0;c<a.length;c+=2)e=String.fromCharCode(parseInt(a[c],b)),d[e]||(f="&"+a[c+1]+";",g[e]=f,g[f]=e);return g}};c=m("50,nbsp,51,iexcl,52,cent,53,pound,54,curren,55,yen,56,brvbar,57,sect,58,uml,59,copy,5a,ordf,5b,laquo,5c,not,5d,shy,5e,reg,5f,macr,5g,deg,5h,plusmn,5i,sup2,5j,sup3,5k,acute,5l,micro,5m,para,5n,middot,5o,cedil,5p,sup1,5q,ordm,5r,raquo,5s,frac14,5t,frac12,5u,frac34,5v,iquest,60,Agrave,61,Aacute,62,Acirc,63,Atilde,64,Auml,65,Aring,66,AElig,67,Ccedil,68,Egrave,69,Eacute,6a,Ecirc,6b,Euml,6c,Igrave,6d,Iacute,6e,Icirc,6f,Iuml,6g,ETH,6h,Ntilde,6i,Ograve,6j,Oacute,6k,Ocirc,6l,Otilde,6m,Ouml,6n,times,6o,Oslash,6p,Ugrave,6q,Uacute,6r,Ucirc,6s,Uuml,6t,Yacute,6u,THORN,6v,szlig,70,agrave,71,aacute,72,acirc,73,atilde,74,auml,75,aring,76,aelig,77,ccedil,78,egrave,79,eacute,7a,ecirc,7b,euml,7c,igrave,7d,iacute,7e,icirc,7f,iuml,7g,eth,7h,ntilde,7i,ograve,7j,oacute,7k,ocirc,7l,otilde,7m,ouml,7n,divide,7o,oslash,7p,ugrave,7q,uacute,7r,ucirc,7s,uuml,7t,yacute,7u,thorn,7v,yuml,ci,fnof,sh,Alpha,si,Beta,sj,Gamma,sk,Delta,sl,Epsilon,sm,Zeta,sn,Eta,so,Theta,sp,Iota,sq,Kappa,sr,Lambda,ss,Mu,st,Nu,su,Xi,sv,Omicron,t0,Pi,t1,Rho,t3,Sigma,t4,Tau,t5,Upsilon,t6,Phi,t7,Chi,t8,Psi,t9,Omega,th,alpha,ti,beta,tj,gamma,tk,delta,tl,epsilon,tm,zeta,tn,eta,to,theta,tp,iota,tq,kappa,tr,lambda,ts,mu,tt,nu,tu,xi,tv,omicron,u0,pi,u1,rho,u2,sigmaf,u3,sigma,u4,tau,u5,upsilon,u6,phi,u7,chi,u8,psi,u9,omega,uh,thetasym,ui,upsih,um,piv,812,bull,816,hellip,81i,prime,81j,Prime,81u,oline,824,frasl,88o,weierp,88h,image,88s,real,892,trade,89l,alefsym,8cg,larr,8ch,uarr,8ci,rarr,8cj,darr,8ck,harr,8dl,crarr,8eg,lArr,8eh,uArr,8ei,rArr,8ej,dArr,8ek,hArr,8g0,forall,8g2,part,8g3,exist,8g5,empty,8g7,nabla,8g8,isin,8g9,notin,8gb,ni,8gf,prod,8gh,sum,8gi,minus,8gn,lowast,8gq,radic,8gt,prop,8gu,infin,8h0,ang,8h7,and,8h8,or,8h9,cap,8ha,cup,8hb,int,8hk,there4,8hs,sim,8i5,cong,8i8,asymp,8j0,ne,8j1,equiv,8j4,le,8j5,ge,8k2,sub,8k3,sup,8k4,nsub,8k6,sube,8k7,supe,8kl,oplus,8kn,otimes,8l5,perp,8m5,sdot,8o8,lceil,8o9,rceil,8oa,lfloor,8ob,rfloor,8p9,lang,8pa,rang,9ea,loz,9j0,spades,9j3,clubs,9j5,hearts,9j6,diams,ai,OElig,aj,oelig,b0,Scaron,b1,scaron,bo,Yuml,m6,circ,ms,tilde,802,ensp,803,emsp,809,thinsp,80c,zwnj,80d,zwj,80e,lrm,80f,rlm,80j,ndash,80k,mdash,80o,lsquo,80p,rsquo,80q,sbquo,80s,ldquo,80t,rdquo,80u,bdquo,810,dagger,811,Dagger,81g,permil,81p,lsaquo,81q,rsaquo,85c,euro",32);var n={encodeRaw:function(a,b){return a.replace(b?g:h,function(a){return d[a]||a})},encodeAllRaw:function(a){return(""+a).replace(i,function(a){return d[a]||a})},encodeNumeric:function(a,b){return a.replace(b?g:h,function(a){return a.length>1?"&#"+(1024*(a.charCodeAt(0)-55296)+(a.charCodeAt(1)-56320)+65536)+";":d[a]||"&#"+a.charCodeAt(0)+";"})},encodeNamed:function(a,b,e){return e=e||c,a.replace(b?g:h,function(a){return d[a]||e[a]||a})},getEncodeFunc:function(a,b){b=m(b)||c;var e=function(a,c){return a.replace(c?g:h,function(a){return void 0!==d[a]?d[a]:void 0!==b[a]?b[a]:a.length>1?"&#"+(1024*(a.charCodeAt(0)-55296)+(a.charCodeAt(1)-56320)+65536)+";":"&#"+a.charCodeAt(0)+";"})},i=function(a,c){return n.encodeNamed(a,c,b)};return a=f(a.replace(/\+/g,",")),a.named&&a.numeric?e:a.named?b?i:n.encodeNamed:a.numeric?n.encodeNumeric:n.encodeRaw},decode:function(a){return a.replace(j,function(a,b){return b?(b="x"===b.charAt(0).toLowerCase()?parseInt(b.substr(1),16):parseInt(b,10),b>65535?(b-=65536,String.fromCharCode(55296+(b>>10),56320+(1023&b))):k[b]||String.fromCharCode(b)):e[a]||c[a]||l(a)})}};return n}),g("w",["1e"],function(a){var b={},c={},d=a.makeMap,e=a.each,f=a.extend,g=a.explode,h=a.inArray,i=function(b,c){return b=a.trim(b),b?b.split(c||" "):[]},j=function(a){var d,f,g,h,j,k,l={},m=function(a,b,e){var f,g,h,j=function(a,b){var c,d,e={};for(c=0,d=a.length;c<d;c++)e[a[c]]=b||{};return e};for(e=e||[],b=b||"","string"==typeof e&&(e=i(e)),a=i(a),f=a.length;f--;)g=i([d,b].join(" ")),h={attributes:j(g),attributesOrder:g,children:j(e,c)},l[a[f]]=h},n=function(a,b){var c,d,e,f;for(a=i(a),c=a.length,b=i(b);c--;)for(d=l[a[c]],e=0,f=b.length;e<f;e++)d.attributes[b[e]]={},d.attributesOrder.push(b[e])};return b[a]?b[a]:(d="id accesskey class dir lang style tabindex title role",f="address blockquote div dl fieldset form h1 h2 h3 h4 h5 h6 hr menu ol p pre table ul",g="a abbr b bdo br button cite code del dfn em embed i iframe img input ins kbd label map noscript object q s samp script select small span strong sub sup textarea u var #text #comment","html4"!=a&&(d+=" contenteditable contextmenu draggable dropzone hidden spellcheck translate",f+=" article aside details dialog figure header footer hgroup section nav",g+=" audio canvas command datalist mark meter output picture progress time wbr video ruby bdi keygen"),"html5-strict"!=a&&(d+=" xml:lang",k="acronym applet basefont big font strike tt",g=[g,k].join(" "),e(i(k),function(a){m(a,"",g)}),j="center dir isindex noframes",f=[f,j].join(" "),h=[f,g].join(" "),e(i(j),function(a){m(a,"",h)})),h=h||[f,g].join(" "),m("html","manifest","head body"),m("head","","base command link meta noscript script style title"),m("title hr noscript br"),m("base","href target"),m("link","href rel media hreflang type sizes hreflang"),m("meta","name http-equiv content charset"),m("style","media type scoped"),m("script","src async defer type charset"),m("body","onafterprint onbeforeprint onbeforeunload onblur onerror onfocus onhashchange onload onmessage onoffline ononline onpagehide onpageshow onpopstate onresize onscroll onstorage onunload",h),m("address dt dd div caption","",h),m("h1 h2 h3 h4 h5 h6 pre p abbr code var samp kbd sub sup i b u bdo span legend em strong small s cite dfn","",g),m("blockquote","cite",h),m("ol","reversed start type","li"),m("ul","","li"),m("li","value",h),m("dl","","dt dd"),m("a","href target rel media hreflang type",g),m("q","cite",g),m("ins del","cite datetime",h),m("img","src sizes srcset alt usemap ismap width height"),m("iframe","src name width height",h),m("embed","src type width height"),m("object","data type typemustmatch name usemap form width height",[h,"param"].join(" ")),m("param","name value"),m("map","name",[h,"area"].join(" ")),m("area","alt coords shape href target rel media hreflang type"),m("table","border","caption colgroup thead tfoot tbody tr"+("html4"==a?" col":"")),m("colgroup","span","col"),m("col","span"),m("tbody thead tfoot","","tr"),m("tr","","td th"),m("td","colspan rowspan headers",h),m("th","colspan rowspan headers scope abbr",h),m("form","accept-charset action autocomplete enctype method name novalidate target",h),m("fieldset","disabled form name",[h,"legend"].join(" ")),m("label","form for",g),m("input","accept alt autocomplete checked dirname disabled form formaction formenctype formmethod formnovalidate formtarget height list max maxlength min multiple name pattern readonly required size src step type value width"),m("button","disabled form formaction formenctype formmethod formnovalidate formtarget name type value","html4"==a?h:g),m("select","disabled form multiple name required size","option optgroup"),m("optgroup","disabled label","option"),m("option","disabled label selected value"),m("textarea","cols dirname disabled form maxlength name readonly required rows wrap"),m("menu","type label",[h,"li"].join(" ")),m("noscript","",h),"html4"!=a&&(m("wbr"),m("ruby","",[g,"rt rp"].join(" ")),m("figcaption","",h),m("mark rt rp summary bdi","",g),m("canvas","width height",h),m("video","src crossorigin poster preload autoplay mediagroup loop muted controls width height buffered",[h,"track source"].join(" ")),m("audio","src crossorigin preload autoplay mediagroup loop muted controls buffered volume",[h,"track source"].join(" ")),m("picture","","img source"),m("source","src srcset type media sizes"),m("track","kind src srclang label default"),m("datalist","",[g,"option"].join(" ")),m("article section nav aside header footer","",h),m("hgroup","","h1 h2 h3 h4 h5 h6"),m("figure","",[h,"figcaption"].join(" ")),m("time","datetime",g),m("dialog","open",h),m("command","type label icon disabled checked radiogroup command"),m("output","for form name",g),m("progress","value max",g),m("meter","value min max low high optimum",g),m("details","open",[h,"summary"].join(" ")),m("keygen","autofocus challenge disabled form keytype name")),"html5-strict"!=a&&(n("script","language xml:space"),n("style","xml:space"),n("object","declare classid code codebase codetype archive standby align border hspace vspace"),n("embed","align name hspace vspace"),n("param","valuetype type"),n("a","charset name rev shape coords"),n("br","clear"),n("applet","codebase archive code object alt name width height align hspace vspace"),n("img","name longdesc align border hspace vspace"),n("iframe","longdesc frameborder marginwidth marginheight scrolling align"),n("font basefont","size color face"),n("input","usemap align"),n("select","onchange"),n("textarea"),n("h1 h2 h3 h4 h5 h6 div p legend caption","align"),n("ul","type compact"),n("li","type"),n("ol dl menu dir","compact"),n("pre","width xml:space"),n("hr","align noshade size width"),n("isindex","prompt"),n("table","summary width frame rules cellspacing cellpadding align bgcolor"),n("col","width align char charoff valign"),n("colgroup","width align char charoff valign"),n("thead","align char charoff valign"),n("tr","align char charoff valign bgcolor"),n("th","axis align char charoff valign nowrap bgcolor width height"),n("form","accept"),n("td","abbr axis scope align char charoff valign nowrap bgcolor width height"),n("tfoot","align char charoff valign"),n("tbody","align char charoff valign"),n("area","nohref"),n("body","background bgcolor text link vlink alink")),"html4"!=a&&(n("input button select textarea","autofocus"),n("input textarea","placeholder"),n("a","download"),n("link script img","crossorigin"),n("iframe","sandbox seamless allowfullscreen")),e(i("a form meter progress dfn"),function(a){l[a]&&delete l[a].children[a]}),delete l.caption.children.table,delete l.script,b[a]=l,l)},k=function(a,b){var c;return a&&(c={},"string"==typeof a&&(a={"*":a}),e(a,function(a,e){c[e]=c[e.toUpperCase()]="map"==b?d(a,/[, ]/):g(a,/[, ]/)})),c};return function(a){var c,l,m,n,o,p,q,r,s,t,u,v,w,x=this,y={},z={},A=[],B={},C={},D=function(c,e,g){var h=a[c];return h?h=d(h,/[, ]/,d(h.toUpperCase(),/[, ]/)):(h=b[c],h||(h=d(e," ",d(e.toUpperCase()," ")),h=f(h,g),b[c]=h)),h};a=a||{},m=j(a.schema),a.verify_html===!1&&(a.valid_elements="*[*]"),c=k(a.valid_styles),l=k(a.invalid_styles,"map"),r=k(a.valid_classes,"map"),n=D("whitespace_elements","pre script noscript style textarea video audio iframe object code"),o=D("self_closing_elements","colgroup dd dt li option p td tfoot th thead tr"),p=D("short_ended_elements","area base basefont br col frame hr img input isindex link meta param embed source wbr track"),q=D("boolean_attributes","checked compact declare defer disabled ismap multiple nohref noresize noshade nowrap readonly selected autoplay loop controls"),t=D("non_empty_elements","td th iframe video audio object script pre code",p),u=D("move_caret_before_on_enter_elements","table",t),v=D("text_block_elements","h1 h2 h3 h4 h5 h6 p div address pre form blockquote center dir fieldset header footer article section hgroup aside nav figure"),s=D("block_elements","hr table tbody thead tfoot th tr td li ol ul caption dl dt dd noscript menu isindex option datalist select optgroup figcaption",v),w=D("text_inline_elements","span strong b em i font strike u var cite dfn code mark q sup sub samp"),e((a.special||"script noscript noframes noembed title style textarea xmp").split(" "),function(a){C[a]=new RegExp("</"+a+"[^>]*>","gi")});var E=function(a){return new RegExp("^"+a.replace(/([?+*])/g,".$1")+"$")},F=function(a){var b,c,e,f,g,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x=/^([#+\-])?([^\[!\/]+)(?:\/([^\[!]+))?(?:(!?)\[([^\]]+)\])?$/,z=/^([!\-])?(\w+::\w+|[^=:<]+)?(?:([=:<])(.*))?$/,B=/[*?+]/;if(a)for(a=i(a,","),y["@"]&&(t=y["@"].attributes,u=y["@"].attributesOrder),b=0,c=a.length;b<c;b++)if(g=x.exec(a[b])){if(r=g[1],m=g[2],s=g[3],l=g[5],p={},q=[],j={attributes:p,attributesOrder:q},"#"===r&&(j.paddEmpty=!0),"-"===r&&(j.removeEmpty=!0),"!"===g[4]&&(j.removeEmptyAttrs=!0),t){for(v in t)p[v]=t[v];q.push.apply(q,u)}if(l)for(l=i(l,"|"),e=0,f=l.length;e<f;e++)if(g=z.exec(l[e])){if(k={},o=g[1],n=g[2].replace(/::/g,":"),r=g[3],w=g[4],"!"===o&&(j.attributesRequired=j.attributesRequired||[],j.attributesRequired.push(n),k.required=!0),"-"===o){delete p[n],q.splice(h(q,n),1);continue}r&&("="===r&&(j.attributesDefault=j.attributesDefault||[],j.attributesDefault.push({name:n,value:w}),k.defaultValue=w),":"===r&&(j.attributesForced=j.attributesForced||[],j.attributesForced.push({name:n,value:w}),k.forcedValue=w),"<"===r&&(k.validValues=d(w,"?"))),B.test(n)?(j.attributePatterns=j.attributePatterns||[],k.pattern=E(n),j.attributePatterns.push(k)):(p[n]||q.push(n),p[n]=k)}t||"@"!=m||(t=p,u=q),s&&(j.outputName=m,y[s]=j),B.test(m)?(j.pattern=E(m),A.push(j)):y[m]=j}},G=function(a){y={},A=[],F(a),e(m,function(a,b){z[b]=a.children})},H=function(a){var c=/^(~)?(.+)$/;
a&&(b.text_block_elements=b.block_elements=null,e(i(a,","),function(a){var b=c.exec(a),d="~"===b[1],g=d?"span":"div",h=b[2];if(z[h]=z[g],B[h]=g,d||(s[h.toUpperCase()]={},s[h]={}),!y[h]){var i=y[g];i=f({},i),delete i.removeEmptyAttrs,delete i.removeEmpty,y[h]=i}e(z,function(a,b){a[g]&&(z[b]=a=f({},z[b]),a[h]=a[g])})}))},I=function(c){var d=/^([+\-]?)(\w+)\[([^\]]+)\]$/;b[a.schema]=null,c&&e(i(c,","),function(a){var b,c,f=d.exec(a);f&&(c=f[1],b=c?z[f[2]]:z[f[2]]={"#comment":{}},b=z[f[2]],e(i(f[3],"|"),function(a){"-"===c?delete b[a]:b[a]={}}))})},J=function(a){var b,c=y[a];if(c)return c;for(b=A.length;b--;)if(c=A[b],c.pattern.test(a))return c};a.valid_elements?G(a.valid_elements):(e(m,function(a,b){y[b]={attributes:a.attributes,attributesOrder:a.attributesOrder},z[b]=a.children}),"html5"!=a.schema&&e(i("strong/b em/i"),function(a){a=i(a,"/"),y[a[1]].outputName=a[0]}),e(i("ol ul sub sup blockquote span font a table tbody tr strong em b i"),function(a){y[a]&&(y[a].removeEmpty=!0)}),e(i("p h1 h2 h3 h4 h5 h6 th td pre div address caption"),function(a){y[a].paddEmpty=!0}),e(i("span"),function(a){y[a].removeEmptyAttrs=!0})),H(a.custom_elements),I(a.valid_children),F(a.extended_valid_elements),I("+ol[ul|ol],+ul[ul|ol]"),e({dd:"dl",dt:"dl",li:"ul ol",td:"tr",th:"tr",tr:"tbody thead tfoot",tbody:"table",thead:"table",tfoot:"table",legend:"fieldset",area:"map",param:"video audio object"},function(a,b){y[b]&&(y[b].parentsRequired=i(a))}),a.invalid_elements&&e(g(a.invalid_elements),function(a){y[a]&&delete y[a]}),J("span")||F("span[!data-mce-type|*]"),x.children=z,x.getValidStyles=function(){return c},x.getInvalidStyles=function(){return l},x.getValidClasses=function(){return r},x.getBoolAttrs=function(){return q},x.getBlockElements=function(){return s},x.getTextBlockElements=function(){return v},x.getTextInlineElements=function(){return w},x.getShortEndedElements=function(){return p},x.getSelfClosingElements=function(){return o},x.getNonEmptyElements=function(){return t},x.getMoveCaretBeforeOnEnterElements=function(){return u},x.getWhiteSpaceElements=function(){return n},x.getSpecialElements=function(){return C},x.isValidChild=function(a,b){var c=z[a.toLowerCase()];return!(!c||!c[b.toLowerCase()])},x.isValid=function(a,b){var c,d,e=J(a);if(e){if(!b)return!0;if(e.attributes[b])return!0;if(c=e.attributePatterns)for(d=c.length;d--;)if(c[d].pattern.test(a))return!0}return!1},x.getElementRule=J,x.getCustomElements=function(){return B},x.addValidElements=F,x.setValidElements=G,x.addCustomElements=H,x.addValidChildren=I,x.elements=y}}),g("y",[],function(){return function(a,b){var c,d,e,f,g=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)\s*\)/gi,h=/(?:url(?:(?:\(\s*\"([^\"]+)\"\s*\))|(?:\(\s*\'([^\']+)\'\s*\))|(?:\(\s*([^)\s]+)\s*\))))|(?:\'([^\']+)\')|(?:\"([^\"]+)\")/gi,i=/\s*([^:]+):\s*([^;]+);?/g,j=/\s+$/,k={},l="\ufeff";for(a=a||{},b&&(e=b.getValidStyles(),f=b.getInvalidStyles()),d=("\\\" \\' \\; \\: ; : "+l).split(" "),c=0;c<d.length;c++)k[d[c]]=l+c,k[l+c]=d[c];var m=function(a,b,c,d){var e=function(a){return a=parseInt(a,10).toString(16),a.length>1?a:"0"+a};return"#"+e(b)+e(c)+e(d)};return{toHex:function(a){return a.replace(g,m)},parse:function(b){var d,e,f,n,o={},p=a.url_converter,q=a.url_converter_scope||this,r=function(a,b,d){var e,f,g,h;if(e=o[a+"-top"+b],e&&(f=o[a+"-right"+b],f&&(g=o[a+"-bottom"+b],g&&(h=o[a+"-left"+b])))){var i=[e,f,g,h];for(c=i.length-1;c--&&i[c]===i[c+1];);c>-1&&d||(o[a+b]=c==-1?i[0]:i.join(" "),delete o[a+"-top"+b],delete o[a+"-right"+b],delete o[a+"-bottom"+b],delete o[a+"-left"+b])}},s=function(a){var b,c=o[a];if(c){for(c=c.split(" "),b=c.length;b--;)if(c[b]!==c[0])return!1;return o[a]=c[0],!0}},t=function(a,b,c,d){s(b)&&s(c)&&s(d)&&(o[a]=o[b]+" "+o[c]+" "+o[d],delete o[b],delete o[c],delete o[d])},u=function(a){return n=!0,k[a]},v=function(a,b){return n&&(a=a.replace(/\uFEFF[0-9]/g,function(a){return k[a]})),b||(a=a.replace(/\\([\'\";:])/g,"$1")),a},w=function(a){return String.fromCharCode(parseInt(a.slice(1),16))},x=function(a){return a.replace(/\\[0-9a-f]+/gi,w)},y=function(b,c,d,e,f,g){if(f=f||g)return f=v(f),"'"+f.replace(/\'/g,"\\'")+"'";if(c=v(c||d||e),!a.allow_script_urls){var h=c.replace(/[\s\r\n]+/g,"");if(/(java|vb)script:/i.test(h))return"";if(!a.allow_svg_data_urls&&/^data:image\/svg/i.test(h))return""}return p&&(c=p.call(q,c,"style")),"url('"+c.replace(/\'/g,"\\'")+"')"};if(b){for(b=b.replace(/[\u0000-\u001F]/g,""),b=b.replace(/\\[\"\';:\uFEFF]/g,u).replace(/\"[^\"]+\"|\'[^\']+\'/g,function(a){return a.replace(/[;:]/g,u)});d=i.exec(b);)if(i.lastIndex=d.index+d[0].length,e=d[1].replace(j,"").toLowerCase(),f=d[2].replace(j,""),e&&f){if(e=x(e),f=x(f),e.indexOf(l)!==-1||e.indexOf('"')!==-1)continue;if(!a.allow_script_urls&&("behavior"==e||/expression\s*\(|\/\*|\*\//.test(f)))continue;"font-weight"===e&&"700"===f?f="bold":"color"!==e&&"background-color"!==e||(f=f.toLowerCase()),f=f.replace(g,m),f=f.replace(h,y),o[e]=n?v(f,!0):f}r("border","",!0),r("border","-width"),r("border","-color"),r("border","-style"),r("padding",""),r("margin",""),t("border","border-width","border-style","border-color"),"medium none"===o.border&&delete o.border,"none"===o["border-image"]&&delete o["border-image"]}return o},serialize:function(a,b){var c,d,g="",h=function(b){var c,d,f,h;if(c=e[b])for(d=0,f=c.length;d<f;d++)b=c[d],h=a[b],h&&(g+=(g.length>0?" ":"")+b+": "+h+";")},i=function(a,b){var c;return c=f["*"],(!c||!c[a])&&(c=f[b],!c||!c[a])};if(b&&e)h("*"),h(b);else for(c in a)d=a[c],!d||f&&!i(c,b)||(g+=(g.length>0?" ":"")+c+": "+d+";");return g}}}}),g("d",["1j","2","c","e","j","1s","k","p","t","w","y","1e"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=l.each,n=l.is,o=l.grep,p=l.trim,q=h.ie,r=/^([a-z0-9],?)+$/i,s=/^[ \t\r\n]*$/,t=function(a,b){var c,d={},e=b.keep_values;return c={set:function(c,d,e){b.url_converter&&(d=b.url_converter.call(b.url_converter_scope||a,d,e,c[0])),c.attr("data-mce-"+e,d).attr(e,d)},get:function(a,b){return a.attr("data-mce-"+b)||a.attr(b)}},d={style:{set:function(a,b){return null!==b&&"object"==typeof b?void a.css(b):(e&&a.attr("data-mce-style",b),void a.attr("style",b))},get:function(b){var c=b.attr("data-mce-style")||b.attr("style");return c=a.serializeStyle(a.parseStyle(c),b[0].nodeName)}}},e&&(d.href=d.src=c),d},u=function(a,b){var c=b.attr("style");c=a.serializeStyle(a.parseStyle(c),b[0].nodeName),c||(c=null),b.attr("data-mce-style",c)},v=function(a,b){var c,d,e=0;if(a)for(c=a.nodeType,a=a.previousSibling;a;a=a.previousSibling)d=a.nodeType,(!b||3!=d||d!=c&&a.nodeValue.length)&&(e++,c=d);return e},w=function(a,e){var g,h=this;h.doc=a,h.win=b,h.files={},h.counter=0,h.stdMode=!q||a.documentMode>=8,h.boxModel=!q||"CSS1Compat"==a.compatMode||h.stdMode,h.styleSheetLoader=new f(a),h.boundEvents=[],h.settings=e=e||{},h.schema=e.schema?e.schema:new j({}),h.styles=new k({url_converter:e.url_converter,url_converter_scope:e.url_converter_scope},e.schema),h.fixDoc(a),h.events=e.ownEvents?new d(e.proxy):d.Event,h.attrHooks=t(h,e),g=e.schema?e.schema.getBlockElements():{},h.$=c.overrideDefaults(function(){return{context:a,element:h.getRoot()}}),h.isBlock=function(a){if(!a)return!1;var b=a.nodeType;return b?!(1!==b||!g[a.nodeName]):!!g[a]}};return w.prototype={$$:function(a){return"string"==typeof a&&(a=this.get(a)),this.$(a)},root:null,fixDoc:function(a){var b,c=this.settings;if(q&&c.schema){"abbr article aside audio canvas details figcaption figure footer header hgroup mark menu meter nav output progress section summary time video".replace(/\w+/g,function(b){a.createElement(b)});for(b in c.schema.getCustomElements())a.createElement(b)}},clone:function(a,b){var c,d,e=this;return!q||1!==a.nodeType||b?a.cloneNode(b):(d=e.doc,b?c.firstChild:(c=d.createElement(a.nodeName),m(e.getAttribs(a),function(b){e.setAttrib(c,b.nodeName,e.getAttrib(a,b.nodeName))}),c))},getRoot:function(){var a=this;return a.settings.root_element||a.doc.body},getViewPort:function(a){var b,c;return a=a?a:this.win,b=a.document,c=this.boxModel?b.documentElement:b.body,{x:a.pageXOffset||c.scrollLeft,y:a.pageYOffset||c.scrollTop,w:a.innerWidth||c.clientWidth,h:a.innerHeight||c.clientHeight}},getRect:function(a){var b,c,d=this;return a=d.get(a),b=d.getPos(a),c=d.getSize(a),{x:b.x,y:b.y,w:c.w,h:c.h}},getSize:function(a){var b,c,d=this;return a=d.get(a),b=d.getStyle(a,"width"),c=d.getStyle(a,"height"),b.indexOf("px")===-1&&(b=0),c.indexOf("px")===-1&&(c=0),{w:parseInt(b,10)||a.offsetWidth||a.clientWidth,h:parseInt(c,10)||a.offsetHeight||a.clientHeight}},getParent:function(a,b,c){return this.getParents(a,b,c,!1)},getParents:function(a,b,c,d){var e,f=this,g=[];for(a=f.get(a),d=void 0===d,c=c||("BODY"!=f.getRoot().nodeName?f.getRoot().parentNode:null),n(b,"string")&&(e=b,b="*"===b?function(a){return 1==a.nodeType}:function(a){return f.is(a,e)});a&&a!=c&&a.nodeType&&9!==a.nodeType;){if(!b||b(a)){if(!d)return a;g.push(a)}a=a.parentNode}return d?g:null},get:function(a){var b;return a&&this.doc&&"string"==typeof a&&(b=a,a=this.doc.getElementById(a),a&&a.id!==b)?this.doc.getElementsByName(b)[1]:a},getNext:function(a,b){return this._findSib(a,b,"nextSibling")},getPrev:function(a,b){return this._findSib(a,b,"previousSibling")},select:function(a,b){var c=this;return e(a,c.get(b)||c.settings.root_element||c.doc,[])},is:function(a,b){var c;if(!a)return!1;if(void 0===a.length){if("*"===b)return 1==a.nodeType;if(r.test(b)){for(b=b.toLowerCase().split(/,/),a=a.nodeName.toLowerCase(),c=b.length-1;c>=0;c--)if(b[c]==a)return!0;return!1}}if(a.nodeType&&1!=a.nodeType)return!1;var d=a.nodeType?[a]:a;return e(b,d[0].ownerDocument||d[0],null,d).length>0},add:function(a,b,c,d,e){var f=this;return this.run(a,function(a){var g;return g=n(b,"string")?f.doc.createElement(b):b,f.setAttribs(g,c),d&&(d.nodeType?g.appendChild(d):f.setHTML(g,d)),e?g:a.appendChild(g)})},create:function(a,b,c){return this.add(this.doc.createElement(a),a,b,c,1)},createHTML:function(a,b,c){var d,e="";e+="<"+a;for(d in b)b.hasOwnProperty(d)&&null!==b[d]&&"undefined"!=typeof b[d]&&(e+=" "+d+'="'+this.encode(b[d])+'"');return"undefined"!=typeof c?e+">"+c+"</"+a+">":e+" />"},createFragment:function(a){var b,c,d,e=this.doc;for(d=e.createElement("div"),b=e.createDocumentFragment(),a&&(d.innerHTML=a);c=d.firstChild;)b.appendChild(c);return b},remove:function(a,b){return a=this.$$(a),b?a.each(function(){for(var a;a=this.firstChild;)3==a.nodeType&&0===a.data.length?this.removeChild(a):this.parentNode.insertBefore(a,this)}).remove():a.remove(),a.length>1?a.toArray():a[0]},setStyle:function(a,b,c){a=this.$$(a).css(b,c),this.settings.update_styles&&u(this,a)},getStyle:function(a,b,c){return a=this.$$(a),c?a.css(b):(b=b.replace(/-(\D)/g,function(a,b){return b.toUpperCase()}),"float"==b&&(b=h.ie&&h.ie<12?"styleFloat":"cssFloat"),a[0]&&a[0].style?a[0].style[b]:void 0)},setStyles:function(a,b){a=this.$$(a).css(b),this.settings.update_styles&&u(this,a)},removeAllAttribs:function(a){return this.run(a,function(a){var b,c=a.attributes;for(b=c.length-1;b>=0;b--)a.removeAttributeNode(c.item(b))})},setAttrib:function(a,b,c){var d,e,f=this,g=f.settings;""===c&&(c=null),a=f.$$(a),d=a.attr(b),a.length&&(e=f.attrHooks[b],e&&e.set?e.set(a,c,b):a.attr(b,c),d!=c&&g.onSetAttrib&&g.onSetAttrib({attrElm:a,attrName:b,attrValue:c}))},setAttribs:function(a,b){var c=this;c.$$(a).each(function(a,d){m(b,function(a,b){c.setAttrib(d,b,a)})})},getAttrib:function(a,b,c){var d,e,f=this;return a=f.$$(a),a.length&&(d=f.attrHooks[b],e=d&&d.get?d.get(a,b):a.attr(b)),"undefined"==typeof e&&(e=c||""),e},getPos:function(a,b){var d,e,f=this,g=0,h=0,i=f.doc,j=i.body;if(a=f.get(a),b=b||j,a){if(b===j&&a.getBoundingClientRect&&"static"===c(j).css("position"))return e=a.getBoundingClientRect(),b=f.boxModel?i.documentElement:j,g=e.left+(i.documentElement.scrollLeft||j.scrollLeft)-b.clientLeft,h=e.top+(i.documentElement.scrollTop||j.scrollTop)-b.clientTop,{x:g,y:h};for(d=a;d&&d!=b&&d.nodeType;)g+=d.offsetLeft||0,h+=d.offsetTop||0,d=d.offsetParent;for(d=a.parentNode;d&&d!=b&&d.nodeType;)g-=d.scrollLeft||0,h-=d.scrollTop||0,d=d.parentNode}return{x:g,y:h}},parseStyle:function(a){return this.styles.parse(a)},serializeStyle:function(a,b){return this.styles.serialize(a,b)},addStyle:function(b){var c,d,e=this,f=e.doc;if(e!==w.DOM&&f===a){var g=w.DOM.addedStyles;if(g=g||[],g[b])return;g[b]=!0,w.DOM.addedStyles=g}d=f.getElementById("mceDefaultStyles"),d||(d=f.createElement("style"),d.id="mceDefaultStyles",d.type="text/css",c=f.getElementsByTagName("head")[0],c.firstChild?c.insertBefore(d,c.firstChild):c.appendChild(d)),d.styleSheet?d.styleSheet.cssText+=b:d.appendChild(f.createTextNode(b))},loadCSS:function(b){var c,d=this,e=d.doc;return d!==w.DOM&&e===a?void w.DOM.loadCSS(b):(b||(b=""),c=e.getElementsByTagName("head")[0],void m(b.split(","),function(a){var b;a=l._addCacheSuffix(a),d.files[a]||(d.files[a]=!0,b=d.create("link",{rel:"stylesheet",href:a}),q&&e.documentMode&&e.recalc&&(b.onload=function(){e.recalc&&e.recalc(),b.onload=null}),c.appendChild(b))}))},addClass:function(a,b){this.$$(a).addClass(b)},removeClass:function(a,b){this.toggleClass(a,b,!1)},hasClass:function(a,b){return this.$$(a).hasClass(b)},toggleClass:function(a,b,d){this.$$(a).toggleClass(b,d).each(function(){""===this.className&&c(this).attr("class",null)})},show:function(a){this.$$(a).show()},hide:function(a){this.$$(a).hide()},isHidden:function(a){return"none"==this.$$(a).css("display")},uniqueId:function(a){return(a?a:"mce_")+this.counter++},setHTML:function(a,b){a=this.$$(a),q?a.each(function(a,d){if(d.canHaveHTML!==!1){for(;d.firstChild;)d.removeChild(d.firstChild);try{d.innerHTML="<br>"+b,d.removeChild(d.firstChild)}catch(a){c("<div></div>").html("<br>"+b).contents().slice(1).appendTo(d)}return b}}):a.html(b)},getOuterHTML:function(a){return a=this.get(a),1==a.nodeType&&"outerHTML"in a?a.outerHTML:c("<div></div>").append(c(a).clone()).html()},setOuterHTML:function(a,b){var d=this;d.$$(a).each(function(){try{if("outerHTML"in this)return void(this.outerHTML=b)}catch(a){}d.remove(c(this).html(b),!0)})},decode:i.decode,encode:i.encodeAllRaw,insertAfter:function(a,b){return b=this.get(b),this.run(a,function(a){var c,d;return c=b.parentNode,d=b.nextSibling,d?c.insertBefore(a,d):c.appendChild(a),a})},replace:function(a,b,c){var d=this;return d.run(b,function(b){return n(b,"array")&&(a=a.cloneNode(!0)),c&&m(o(b.childNodes),function(b){a.appendChild(b)}),b.parentNode.replaceChild(a,b)})},rename:function(a,b){var c,d=this;return a.nodeName!=b.toUpperCase()&&(c=d.create(b),m(d.getAttribs(a),function(b){d.setAttrib(c,b.nodeName,d.getAttrib(a,b.nodeName))}),d.replace(c,a,1)),c||a},findCommonAncestor:function(a,b){for(var c,d=a;d;){for(c=b;c&&d!=c;)c=c.parentNode;if(d==c)break;d=d.parentNode}return!d&&a.ownerDocument?a.ownerDocument.documentElement:d},toHex:function(a){return this.styles.toHex(l.trim(a))},run:function(a,b,c){var d,e=this;return"string"==typeof a&&(a=e.get(a)),!!a&&(c=c||this,a.nodeType||!a.length&&0!==a.length?b.call(c,a):(d=[],m(a,function(a,f){a&&("string"==typeof a&&(a=e.get(a)),d.push(b.call(c,a,f)))}),d))},getAttribs:function(a){var b;if(a=this.get(a),!a)return[];if(q){if(b=[],"OBJECT"==a.nodeName)return a.attributes;"OPTION"===a.nodeName&&this.getAttrib(a,"selected")&&b.push({specified:1,nodeName:"selected"});var c=/<\/?[\w:\-]+ ?|=[\"][^\"]+\"|=\'[^\']+\'|=[\w\-]+|>/gi;return a.cloneNode(!1).outerHTML.replace(c,"").replace(/[\w:\-]+/gi,function(a){b.push({specified:1,nodeName:a})}),b}return a.attributes},isEmpty:function(a,b){var c,d,e,f,h,i,j=this,k=0;if(a=a.firstChild){h=new g(a,a.parentNode),b=b||(j.schema?j.schema.getNonEmptyElements():null),f=j.schema?j.schema.getWhiteSpaceElements():{};do{if(e=a.nodeType,1===e){var l=a.getAttribute("data-mce-bogus");if(l){a=h.next("all"===l);continue}if(i=a.nodeName.toLowerCase(),b&&b[i]){if("br"===i){k++,a=h.next();continue}return!1}for(d=j.getAttribs(a),c=d.length;c--;)if(i=d[c].nodeName,"name"===i||"data-mce-bookmark"===i)return!1}if(8==e)return!1;if(3===e&&!s.test(a.nodeValue))return!1;if(3===e&&a.parentNode&&f[a.parentNode.nodeName]&&s.test(a.nodeValue))return!1;a=h.next()}while(a)}return k<=1},createRng:function(){return this.doc.createRange()},nodeIndex:v,split:function(a,b,c){var d,e,f,g=this,h=g.createRng(),i=function(a){var b,c=a.childNodes,d=a.nodeType,e=function(a){var b=a.previousSibling&&"SPAN"==a.previousSibling.nodeName,c=a.nextSibling&&"SPAN"==a.nextSibling.nodeName;return b&&c};if(1!=d||"bookmark"!=a.getAttribute("data-mce-type")){for(b=c.length-1;b>=0;b--)i(c[b]);if(9!=d){if(3==d&&a.nodeValue.length>0){var f=p(a.nodeValue).length;if(!g.isBlock(a.parentNode)||f>0||0===f&&e(a))return}else if(1==d&&(c=a.childNodes,1==c.length&&c[0]&&1==c[0].nodeType&&"bookmark"==c[0].getAttribute("data-mce-type")&&a.parentNode.insertBefore(c[0],a),c.length||/^(br|hr|input|img)$/i.test(a.nodeName)))return;g.remove(a)}return a}};if(a&&b)return h.setStart(a.parentNode,g.nodeIndex(a)),h.setEnd(b.parentNode,g.nodeIndex(b)),d=h.extractContents(),h=g.createRng(),h.setStart(b.parentNode,g.nodeIndex(b)+1),h.setEnd(a.parentNode,g.nodeIndex(a)+1),e=h.extractContents(),f=a.parentNode,f.insertBefore(i(d),a),c?f.insertBefore(c,a):f.insertBefore(b,a),f.insertBefore(i(e),a),g.remove(a),c||b},bind:function(a,b,c,d){var e=this;if(l.isArray(a)){for(var f=a.length;f--;)a[f]=e.bind(a[f],b,c,d);return a}return!e.settings.collect||a!==e.doc&&a!==e.win||e.boundEvents.push([a,b,c,d]),e.events.bind(a,b,c,d||e)},unbind:function(a,b,c){var d,e=this;if(l.isArray(a)){for(d=a.length;d--;)a[d]=e.unbind(a[d],b,c);return a}if(e.boundEvents&&(a===e.doc||a===e.win))for(d=e.boundEvents.length;d--;){var f=e.boundEvents[d];a!=f[0]||b&&b!=f[1]||c&&c!=f[2]||this.events.unbind(f[0],f[1],f[2])}return this.events.unbind(a,b,c)},fire:function(a,b,c){return this.events.fire(a,b,c)},getContentEditable:function(a){var b;return a&&1==a.nodeType?(b=a.getAttribute("data-mce-contenteditable"),b&&"inherit"!==b?b:"inherit"!==a.contentEditable?a.contentEditable:null):null},getContentEditableParent:function(a){for(var b=this.getRoot(),c=null;a&&a!==b&&(c=this.getContentEditable(a),null===c);a=a.parentNode);return c},destroy:function(){var a=this;if(a.boundEvents){for(var b=a.boundEvents.length;b--;){var c=a.boundEvents[b];this.events.unbind(c[0],c[1],c[2])}a.boundEvents=null}e.setDocument&&e.setDocument(),a.win=a.doc=a.root=a.events=a.frag=null},isChildOf:function(a,b){for(;a;){if(b===a)return!0;a=a.parentNode}return!1},dumpRng:function(a){return"startContainer: "+a.startContainer.nodeName+", startOffset: "+a.startOffset+", endContainer: "+a.endContainer.nodeName+", endOffset: "+a.endOffset},_findSib:function(a,b,c){var d=this,e=b;if(a)for("string"==typeof e&&(e=function(a){return d.is(a,b)}),a=a[c];a;a=a[c])if(e(a))return a;return null}},w.DOM=new w(a),w.nodeIndex=v,w}),g("g",["1j","d","1e"],function(a,b,c){var d=b.DOM,e=c.each,f=c.grep,g=function(a){return"function"==typeof a},h=function(){var b,h=0,i=1,j=2,k=3,l={},m=[],n={},o=[],p=0,q=function(b,e,f){var h,i,j=d,k=function(){j.remove(i),h&&(h.onreadystatechange=h.onload=h=null),e()},l=function(){g(f)?f():"undefined"!=typeof console&&console.log&&console.log("Failed to load script: "+b)};i=j.uniqueId(),h=a.createElement("script"),h.id=i,h.type="text/javascript",h.src=c._addCacheSuffix(b),"onreadystatechange"in h?h.onreadystatechange=function(){/loaded|complete/.test(h.readyState)&&k()}:h.onload=k,h.onerror=l,(a.getElementsByTagName("head")[0]||a.body).appendChild(h)};this.isDone=function(a){return l[a]==j},this.markDone=function(a){l[a]=j},this.add=this.load=function(a,c,d,e){var f=l[a];f==b&&(m.push(a),l[a]=h),c&&(n[a]||(n[a]=[]),n[a].push({success:c,failure:e,scope:d||this}))},this.remove=function(a){delete l[a],delete n[a]},this.loadQueue=function(a,b,c){this.loadScripts(m,a,b,c)},this.loadScripts=function(a,c,d,h){var m,r=[],s=function(a,c){e(n[c],function(b){g(b[a])&&b[a].call(b.scope)}),n[c]=b};o.push({success:c,failure:h,scope:d||this}),(m=function(){var b=f(a);if(a.length=0,e(b,function(a){return l[a]===j?void s("success",a):l[a]===k?void s("failure",a):void(l[a]!==i&&(l[a]=i,p++,q(a,function(){l[a]=j,p--,s("success",a),m()},function(){l[a]=k,p--,r.push(a),s("failure",a),m()})))}),!p){var c=o.slice(0);o.length=0,e(c,function(a){0===r.length?g(a.success)&&a.success.call(a.scope):g(a.failure)&&a.failure.call(a.scope,r)})}})()}};return h.ScriptLoader=new h,h}),g("6",["1i","g","1e"],function(a,b,c){var d=c.each,e=function(){var a=this;a.items=[],a.urls={},a.lookup={},a._listeners=[]};return e.prototype={get:function(a){if(this.lookup[a])return this.lookup[a].instance},dependencies:function(a){var b;return this.lookup[a]&&(b=this.lookup[a].dependencies),b||[]},requireLangPack:function(a,c){var d=e.language;if(d&&e.languageLoad!==!1){if(c)if(c=","+c+",",c.indexOf(","+d.substr(0,2)+",")!=-1)d=d.substr(0,2);else if(c.indexOf(","+d+",")==-1)return;b.ScriptLoader.add(this.urls[a]+"/langs/"+d+".js")}},add:function(b,c,e){this.items.push(c),this.lookup[b]={instance:c,dependencies:e};var f=a.partition(this._listeners,function(a){return a.name===b});return this._listeners=f.fail,d(f.pass,function(a){a.callback()}),c},remove:function(a){delete this.urls[a],delete this.lookup[a]},createUrl:function(a,b){return"object"==typeof b?b:{prefix:a.prefix,resource:b,suffix:a.suffix}},addComponents:function(a,c){var e=this.urls[a];d(c,function(a){b.ScriptLoader.add(e+"/"+a)})},load:function(a,c,f,g,h){var i=this,j=c,k=function(){var e=i.dependencies(a);d(e,function(a){var b=i.createUrl(c,a);i.load(b.resource,b,void 0,void 0)}),f&&(g?f.call(g):f.call(b))};i.urls[a]||("object"==typeof c&&(j=c.prefix+c.resource+c.suffix),0!==j.indexOf("/")&&j.indexOf("://")==-1&&(j=e.baseURL+"/"+j),i.urls[a]=j.substring(0,j.lastIndexOf("/")),i.lookup[a]?k():b.ScriptLoader.add(j,k,g,h))},waitFor:function(a,b){this.lookup.hasOwnProperty(a)?b():this._listeners.push({name:a,callback:b})}},e.PluginManager=new e,e.ThemeManager=new e,e}),g("1u",[],function(){var a=function(b){var c=b,d=function(){return c},e=function(a){c=a},f=function(){return a(d())};return{get:d,set:e,clone:f}};return a}),g("2b",[],function(){var a=function(a){return function(b){return!!b&&b.nodeType==a}},b=a(1),c=function(a){return a=a.toLowerCase().split(" "),function(b){var c,d;if(b&&b.nodeType)for(d=b.nodeName.toLowerCase(),c=0;c<a.length;c++)if(d===a[c])return!0;return!1}},d=function(a,c){return c=c.toLowerCase().split(" "),function(d){var e,f;if(b(d))for(e=0;e<c.length;e++)if(f=d.ownerDocument.defaultView.getComputedStyle(d,null).getPropertyValue(a),f===c[e])return!0;return!1}},e=function(a,c){return function(d){return b(d)&&d[a]===c}},f=function(a,c){return function(c){return b(c)&&c.hasAttribute(a)}},g=function(a,c){return function(d){return b(d)&&d.getAttribute(a)===c}},h=function(a){return b(a)&&a.hasAttribute("data-mce-bogus")},i=function(a){return function(c){if(b(c)){if(c.contentEditable===a)return!0;if(c.getAttribute("data-mce-contenteditable")===a)return!0}return!1}};return{isText:a(3),isElement:b,isComment:a(8),isBr:c("br"),isContentEditableTrue:i("true"),isContentEditableFalse:i("false"),matchNodeNames:c,hasPropValue:e,hasAttribute:f,hasAttributeValue:g,matchStyleValues:d,isBogus:h}}),g("35",[],function(){var a=[].slice,b=function(a){return function(){return a}},c=function(a){return function(b){return!a(b)}},d=function(a,b){return function(c){return a(b(c))}},e=function(){var b=a.call(arguments);return function(a){for(var c=0;c<b.length;c++)if(b[c](a))return!0;return!1}},f=function(){var b=a.call(arguments);return function(a){for(var c=0;c<b.length;c++)if(!b[c](a))return!1;return!0}},g=function(b){var c=a.call(arguments);return c.length-1>=b.length?b.apply(this,c.slice(1)):function(){var a=c.concat([].slice.call(arguments));return g.apply(this,a)}},h=function(){};return{constant:b,negate:c,and:f,or:e,curry:g,compose:d,noop:h}}),g("2c",[],function(){var a="\ufeff",b=function(b){return b===a},c=function(b){return b.replace(new RegExp(a,"g"),"")};return{isZwsp:b,ZWSP:a,trim:c}}),g("29",["1j","2b","2c"],function(a,b,c){var d=b.isElement,e=b.isText,f=function(a){return e(a)&&(a=a.parentNode),d(a)&&a.hasAttribute("data-mce-caret")},g=function(a){return e(a)&&c.isZwsp(a.data)},h=function(a){return f(a)||g(a)},i=function(a){return a.firstChild!==a.lastChild||!b.isBr(a.firstChild)},j=function(a,b){var d,f,g,i;if(d=a.ownerDocument,g=d.createTextNode(c.ZWSP),i=a.parentNode,b){if(f=a.previousSibling,e(f)){if(h(f))return f;if(r(f))return f.splitText(f.data.length-1)}i.insertBefore(g,a)}else{if(f=a.nextSibling,e(f)){if(h(f))return f;if(q(f))return f.splitText(1),f}a.nextSibling?i.insertBefore(g,a.nextSibling):i.appendChild(g)}return g},k=function(a){if(b.isText(a)){var d=a.data;return d.length>0&&d.charAt(0)!==c.ZWSP&&a.insertData(0,c.ZWSP),a}return null},l=function(a){if(b.isText(a)){var d=a.data;return d.length>0&&d.charAt(d.length-1)!==c.ZWSP&&a.insertData(d.length,c.ZWSP),a}return null},m=function(a){return a&&b.isText(a.container())&&a.container().data.charAt(a.offset())===c.ZWSP},n=function(a){return a&&b.isText(a.container())&&a.container().data.charAt(a.offset()-1)===c.ZWSP},o=function(){var b=a.createElement("br");return b.setAttribute("data-mce-bogus","1"),b},p=function(a,b,c){var d,e,f;return d=b.ownerDocument,e=d.createElement(a),e.setAttribute("data-mce-caret",c?"before":"after"),e.setAttribute("data-mce-bogus","all"),e.appendChild(o()),f=b.parentNode,c?f.insertBefore(e,b):b.nextSibling?f.insertBefore(e,b.nextSibling):f.appendChild(e),e},q=function(a){return e(a)&&a.data[0]==c.ZWSP},r=function(a){return e(a)&&a.data[a.data.length-1]==c.ZWSP},s=function(a){var c=a.getElementsByTagName("br"),d=c[c.length-1];b.isBogus(d)&&d.parentNode.removeChild(d)},t=function(a){return a&&a.hasAttribute("data-mce-caret")?(s(a),a.removeAttribute("data-mce-caret"),a.removeAttribute("data-mce-bogus"),a.removeAttribute("style"),a.removeAttribute("_moz_abspos"),a):null};return{isCaretContainer:h,isCaretContainerBlock:f,isCaretContainerInline:g,showCaretContainerBlock:t,insertInline:j,prependInline:k,appendInline:l,isBeforeInline:m,isAfterInline:n,insertBlock:p,hasContent:i,startsWithCaretContainer:q,endsWithCaretContainer:r}}),g("f",["1e","k","2b","29"],function(a,b,c,d){var e=a.each,f=c.isContentEditableTrue,g=c.isContentEditableFalse,h=d.isCaretContainer,i=function(a){return f(a)||g(a)},j=function(a,b){var c=a.childNodes;return b--,b>c.length-1?b=c.length-1:b<0&&(b=0),c[b]||a},k=function(a,b,c){for(;a&&a!==b;){if(c(a))return a;a=a.parentNode}return null},l=function(a,b,c){return null!==k(a,b,c)},m=function(a,b,c){return l(a,b,function(a){return a.nodeName===c})},n=function(a){return"_mce_caret"===a.id},o=function(a,b){return h(a)&&l(a,b,n)===!1},p=function(a){this.walk=function(b,c){var d,f,g,h,i,k,l,m=b.startContainer,n=b.startOffset,o=b.endContainer,p=b.endOffset;if(l=a.select("td[data-mce-selected],th[data-mce-selected]"),l.length>0)return void e(l,function(a){c([a])});var q=function(a){var b;return b=a[0],3===b.nodeType&&b===m&&n>=b.nodeValue.length&&a.splice(0,1),b=a[a.length-1],0===p&&a.length>0&&b===o&&3===b.nodeType&&a.splice(a.length-1,1),a},r=function(a,b,c){for(var d=[];a&&a!=c;a=a[b])d.push(a);return d},s=function(a,b){do{if(a.parentNode==b)return a;a=a.parentNode}while(a)},t=function(a,b,d){var e=d?"nextSibling":"previousSibling";for(h=a,i=h.parentNode;h&&h!=b;h=i)i=h.parentNode,k=r(h==a?h:h[e],e),k.length&&(d||k.reverse(),c(q(k)))};if(1==m.nodeType&&m.hasChildNodes()&&(m=m.childNodes[n]),1==o.nodeType&&o.hasChildNodes()&&(o=j(o,p)),m==o)return c(q([m]));for(d=a.findCommonAncestor(m,o),h=m;h;h=h.parentNode){if(h===o)return t(m,d,!0);if(h===d)break}for(h=o;h;h=h.parentNode){if(h===m)return t(o,d);if(h===d)break}f=s(m,d)||m,g=s(o,d)||o,t(m,f,!0),k=r(f==m?f:f.nextSibling,"nextSibling",g==o?g.nextSibling:g),k.length&&c(q(k)),t(o,g)},this.split=function(a){var b=a.startContainer,c=a.startOffset,d=a.endContainer,e=a.endOffset,f=function(a,b){return a.splitText(b)};return b==d&&3==b.nodeType?c>0&&c<b.nodeValue.length&&(d=f(b,c),b=d.previousSibling,e>c?(e-=c,b=d=f(d,e).previousSibling,e=d.nodeValue.length,c=0):e=0):(3==b.nodeType&&c>0&&c<b.nodeValue.length&&(b=f(b,c),c=0),3==d.nodeType&&e>0&&e<d.nodeValue.length&&(d=f(d,e).previousSibling,e=d.nodeValue.length)),{startContainer:b,startOffset:c,endContainer:d,endOffset:e}},this.normalize=function(c){var d,e=!1,f=function(f){var i,j,k,l,n,p,q,r=a.getRoot(),s=function(a){return a&&/^(TD|TH|CAPTION)$/.test(a.nodeName)},t=function(c,d){for(var e=new b(c,a.getParent(c.parentNode,a.isBlock)||r);c=e[d?"prev":"next"]();)if("BR"===c.nodeName)return!0},u=function(a){for(;a&&a!=r;){if(g(a))return!0;a=a.parentNode}return!1},v=function(a,b){return a.previousSibling&&a.previousSibling.nodeName==b},w=function(c,f){var g,h,k;if(f=f||i,k=a.getParent(f.parentNode,a.isBlock)||r,c&&"BR"==f.nodeName&&q&&a.isEmpty(k))return i=f.parentNode,j=a.nodeIndex(f),void(e=!0);for(g=new b(f,k);l=g[c?"prev":"next"]();){if("false"===a.getContentEditableParent(l)||o(l,a.getRoot()))return;if(3===l.nodeType&&l.nodeValue.length>0)return void(m(l,r,"A")===!1&&(i=l,j=c?l.nodeValue.length:0,e=!0));if(a.isBlock(l)||n[l.nodeName.toLowerCase()])return;h=l}d&&h&&(i=h,e=!0,j=0)};if(i=c[(f?"start":"end")+"Container"],j=c[(f?"start":"end")+"Offset"],q=1==i.nodeType&&j===i.childNodes.length,n=a.schema.getNonEmptyElements(),p=f,!h(i)){if(1==i.nodeType&&j>i.childNodes.length-1&&(p=!1),9===i.nodeType&&(i=a.getRoot(),j=0),i===r){if(p&&(l=i.childNodes[j>0?j-1:0])){if(h(l))return;if(n[l.nodeName]||"TABLE"==l.nodeName)return}if(i.hasChildNodes()){if(j=Math.min(!p&&j>0?j-1:j,i.childNodes.length-1),i=i.childNodes[j],j=0,!d&&i===r.lastChild&&"TABLE"===i.nodeName)return;if(u(i)||h(i))return;if(i.hasChildNodes()&&!/TABLE/.test(i.nodeName)){l=i,k=new b(i,r);do{if(g(l)||h(l)){e=!1;break}if(3===l.nodeType&&l.nodeValue.length>0){j=p?0:l.nodeValue.length,i=l,e=!0;break}if(n[l.nodeName.toLowerCase()]&&!s(l)){j=a.nodeIndex(l),i=l.parentNode,"IMG"!==l.nodeName&&"PRE"!==l.nodeName||p||j++,e=!0;break}}while(l=p?k.next():k.prev())}}}d&&(3===i.nodeType&&0===j&&w(!0),1===i.nodeType&&(l=i.childNodes[j],l||(l=i.childNodes[j-1]),!l||"BR"!==l.nodeName||v(l,"A")||t(l)||t(l,!0)||w(!0,l))),p&&!d&&3===i.nodeType&&j===i.nodeValue.length&&w(!1),e&&c["set"+(f?"Start":"End")](i,j)}};return d=c.collapsed,f(!0),d||f(),e&&d&&c.collapse(!0),e}};p.compareRanges=function(a,b){return a&&b&&a.startContainer===b.startContainer&&a.startOffset===b.startOffset&&a.endContainer===b.endContainer&&a.endOffset===b.endOffset};var q=function(b,c,d){var e,f,g;if(e=d.elementFromPoint(b,c),f=d.body.createTextRange(),e&&"HTML"!=e.tagName||(e=d.body),f.moveToElementText(e),g=a.toArray(f.getClientRects()),g=g.sort(function(a,b){return a=Math.abs(Math.max(a.top-c,a.bottom-c)),b=Math.abs(Math.max(b.top-c,b.bottom-c)),a-b}),g.length>0){c=(g[0].bottom+g[0].top)/2;try{return f.moveToPoint(b,c),f.collapse(!0),f}catch(a){}}return null},r=function(a,b){var c=a&&a.parentElement?a.parentElement():null;return g(k(c,b,i))?null:a};return p.getCaretRangeFromPoint=function(a,b,c){var d,e;if(c.caretPositionFromPoint)e=c.caretPositionFromPoint(a,b),d=c.createRange(),d.setStart(e.offsetNode,e.offset),d.collapse(!0);else if(c.caretRangeFromPoint)d=c.caretRangeFromPoint(a,b);else if(c.body.createTextRange){d=c.body.createTextRange();try{d.moveToPoint(a,b),d.collapse(!0)}catch(e){d=q(a,b,c)}return r(d,c.body)}return d},p.getSelectedNode=function(a){var b=a.startContainer,c=a.startOffset;return b.hasChildNodes()&&a.endOffset==c+1?b.childNodes[c]:null},p.getNode=function(a,b){return 1===a.nodeType&&a.hasChildNodes()&&(b>=a.childNodes.length&&(b=a.childNodes.length-1),a=a.childNodes[b]),a},p}),g("36",["2b","1r","29"],function(a,b,c){var d=a.isContentEditableTrue,e=a.isContentEditableFalse,f=a.isBr,g=a.isText,h=a.matchNodeNames("script style textarea"),i=a.matchNodeNames("img input textarea hr iframe video audio object"),j=a.matchNodeNames("table"),k=c.isCaretContainer,l=function(a){return!k(a)&&(g(a)?!h(a.parentNode):i(a)||f(a)||j(a)||e(a))},m=function(a,b){for(a=a.parentNode;a&&a!=b;a=a.parentNode){
if(e(a))return!1;if(d(a))return!0}return!0},n=function(a){return!!e(a)&&b.reduce(a.getElementsByTagName("*"),function(a,b){return a||d(b)},!1)!==!0},o=function(a){return i(a)||n(a)},p=function(a,b){return l(a)&&m(a,b)};return{isCaretCandidate:l,isInEditable:m,isAtomic:o,isEditableCaretCandidate:p}}),g("37",[],function(){var a=Math.round,b=function(b){return b?{left:a(b.left),top:a(b.top),bottom:a(b.bottom),right:a(b.right),width:a(b.width),height:a(b.height)}:{left:0,top:0,bottom:0,right:0,width:0,height:0}},c=function(a,c){return a=b(a),c?a.right=a.left:(a.left=a.left+a.width,a.right=a.left),a.width=0,a},d=function(a,b){return a.left===b.left&&a.top===b.top&&a.bottom===b.bottom&&a.right===b.right},e=function(a,b,c){return a>=0&&a<=Math.min(b.height,c.height)/2},f=function(a,b){return a.bottom-a.height/2<b.top||!(a.top>b.bottom)&&e(b.top-a.bottom,a,b)},g=function(a,b){return a.top>b.bottom||!(a.bottom<b.top)&&e(b.bottom-a.top,a,b)},h=function(a,b){return a.left<b.left},i=function(a,b){return a.right>b.right},j=function(a,b){return f(a,b)?-1:g(a,b)?1:h(a,b)?-1:i(a,b)?1:0},k=function(a,b,c){return b>=a.left&&b<=a.right&&c>=a.top&&c<=a.bottom};return{clone:b,collapse:c,isEqual:d,isAbove:f,isBelow:g,isLeft:h,isRight:i,compare:j,containsXY:k}}),g("38",[],function(){var a=new RegExp("[\u0300-\u036f\u0483-\u0487\u0488-\u0489\u0591-\u05bd\u05bf\u05c1-\u05c2\u05c4-\u05c5\u05c7\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7-\u06e8\u06ea-\u06ed\u0711\u0730-\u074a\u07a6-\u07b0\u07eb-\u07f3\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u08e3-\u0902\u093a\u093c\u0941-\u0948\u094d\u0951-\u0957\u0962-\u0963\u0981\u09bc\u09be\u09c1-\u09c4\u09cd\u09d7\u09e2-\u09e3\u0a01-\u0a02\u0a3c\u0a41-\u0a42\u0a47-\u0a48\u0a4b-\u0a4d\u0a51\u0a70-\u0a71\u0a75\u0a81-\u0a82\u0abc\u0ac1-\u0ac5\u0ac7-\u0ac8\u0acd\u0ae2-\u0ae3\u0b01\u0b3c\u0b3e\u0b3f\u0b41-\u0b44\u0b4d\u0b56\u0b57\u0b62-\u0b63\u0b82\u0bbe\u0bc0\u0bcd\u0bd7\u0c00\u0c3e-\u0c40\u0c46-\u0c48\u0c4a-\u0c4d\u0c55-\u0c56\u0c62-\u0c63\u0c81\u0cbc\u0cbf\u0cc2\u0cc6\u0ccc-\u0ccd\u0cd5-\u0cd6\u0ce2-\u0ce3\u0d01\u0d3e\u0d41-\u0d44\u0d4d\u0d57\u0d62-\u0d63\u0dca\u0dcf\u0dd2-\u0dd4\u0dd6\u0ddf\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0eb1\u0eb4-\u0eb9\u0ebb-\u0ebc\u0ec8-\u0ecd\u0f18-\u0f19\u0f35\u0f37\u0f39\u0f71-\u0f7e\u0f80-\u0f84\u0f86-\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102d-\u1030\u1032-\u1037\u1039-\u103a\u103d-\u103e\u1058-\u1059\u105e-\u1060\u1071-\u1074\u1082\u1085-\u1086\u108d\u109d\u135d-\u135f\u1712-\u1714\u1732-\u1734\u1752-\u1753\u1772-\u1773\u17b4-\u17b5\u17b7-\u17bd\u17c6\u17c9-\u17d3\u17dd\u180b-\u180d\u18a9\u1920-\u1922\u1927-\u1928\u1932\u1939-\u193b\u1a17-\u1a18\u1a1b\u1a56\u1a58-\u1a5e\u1a60\u1a62\u1a65-\u1a6c\u1a73-\u1a7c\u1a7f\u1ab0-\u1abd\u1abe\u1b00-\u1b03\u1b34\u1b36-\u1b3a\u1b3c\u1b42\u1b6b-\u1b73\u1b80-\u1b81\u1ba2-\u1ba5\u1ba8-\u1ba9\u1bab-\u1bad\u1be6\u1be8-\u1be9\u1bed\u1bef-\u1bf1\u1c2c-\u1c33\u1c36-\u1c37\u1cd0-\u1cd2\u1cd4-\u1ce0\u1ce2-\u1ce8\u1ced\u1cf4\u1cf8-\u1cf9\u1dc0-\u1df5\u1dfc-\u1dff\u200c-\u200d\u20d0-\u20dc\u20dd-\u20e0\u20e1\u20e2-\u20e4\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302d\u302e-\u302f\u3099-\u309a\ua66f\ua670-\ua672\ua674-\ua67d\ua69e-\ua69f\ua6f0-\ua6f1\ua802\ua806\ua80b\ua825-\ua826\ua8c4\ua8e0-\ua8f1\ua926-\ua92d\ua947-\ua951\ua980-\ua982\ua9b3\ua9b6-\ua9b9\ua9bc\ua9e5\uaa29-\uaa2e\uaa31-\uaa32\uaa35-\uaa36\uaa43\uaa4c\uaa7c\uaab0\uaab2-\uaab4\uaab7-\uaab8\uaabe-\uaabf\uaac1\uaaec-\uaaed\uaaf6\uabe5\uabe8\uabed\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\uff9e-\uff9f]"),b=function(b){return"string"==typeof b&&b.charCodeAt(0)>=768&&a.test(b)};return{isExtendingChar:b}}),g("2a",["35","2b","d","f","36","37","38"],function(a,b,c,d,e,f,g){var h=b.isElement,i=e.isCaretCandidate,j=b.matchStyleValues("display","block table"),k=b.matchStyleValues("float","left right"),l=a.and(h,i,a.negate(k)),m=a.negate(b.matchStyleValues("white-space","pre pre-line pre-wrap")),n=b.isText,o=b.isBr,p=c.nodeIndex,q=d.getNode,r=function(a){return"createRange"in a?a.createRange():c.DOM.createRng()},s=function(a){return a&&/[\r\n\t ]/.test(a)},t=function(a){var b,c=a.startContainer,d=a.startOffset;return!!(s(a.toString())&&m(c.parentNode)&&(b=c.data,s(b[d-1])||s(b[d+1])))},u=function(a){var b,c,d=[],e=function(a){var b,c=a.ownerDocument,d=r(c),e=c.createTextNode("\xa0"),g=a.parentNode;return g.insertBefore(e,a),d.setStart(e,0),d.setEnd(e,1),b=f.clone(d.getBoundingClientRect()),g.removeChild(e),b},i=function(a){var b,c;return c=a.getClientRects(),b=c.length>0?f.clone(c[0]):f.clone(a.getBoundingClientRect()),o(a)&&0===b.left?e(a):b},k=function(a,b){return a=f.collapse(a,b),a.width=1,a.right=a.left+1,a},m=function(a){0!==a.height&&(d.length>0&&f.isEqual(a,d[d.length-1])||d.push(a))},p=function(a,b){var c=r(a.ownerDocument);if(b<a.data.length){if(g.isExtendingChar(a.data[b]))return d;if(g.isExtendingChar(a.data[b-1])&&(c.setStart(a,b),c.setEnd(a,b+1),!t(c)))return m(k(i(c),!1)),d}b>0&&(c.setStart(a,b-1),c.setEnd(a,b),t(c)||m(k(i(c),!1))),b<a.data.length&&(c.setStart(a,b),c.setEnd(a,b+1),t(c)||m(k(i(c),!0)))};if(n(a.container()))return p(a.container(),a.offset()),d;if(h(a.container()))if(a.isAtEnd())c=q(a.container(),a.offset()),n(c)&&p(c,c.data.length),l(c)&&!o(c)&&m(k(i(c),!1));else{if(c=q(a.container(),a.offset()),n(c)&&p(c,0),l(c)&&a.isAtEnd())return m(k(i(c),!1)),d;b=q(a.container(),a.offset()-1),l(b)&&!o(b)&&(j(b)||j(c)||!l(c))&&m(k(i(b),!1)),l(c)&&m(k(i(c),!0))}return d},v=function(b,c,d){var e=function(){return n(b)?0===c:0===c},f=function(){return n(b)?c>=b.data.length:c>=b.childNodes.length},g=function(){var a;return a=r(b.ownerDocument),a.setStart(b,c),a.setEnd(b,c),a},h=function(){return d||(d=u(new v(b,c))),d},i=function(){return h().length>0},j=function(a){return a&&b===a.container()&&c===a.offset()},k=function(a){return q(b,a?c-1:c)};return{container:a.constant(b),offset:a.constant(c),toRange:g,getClientRects:h,isVisible:i,isAtStart:e,isAtEnd:f,isEqual:j,getNode:k}};return v.fromRangeStart=function(a){return new v(a.startContainer,a.startOffset)},v.fromRangeEnd=function(a){return new v(a.endContainer,a.endOffset)},v.after=function(a){return new v(a.parentNode,p(a)+1)},v.before=function(a){return new v(a.parentNode,p(a))},v.isAtStart=function(a){return!!a&&a.isAtStart()},v.isAtEnd=function(a){return!!a&&a.isAtEnd()},v.isTextPosition=function(a){return!!a&&b.isText(a.container())},v}),g("28",["2b","d","35","1r","2a"],function(a,b,c,d,e){var f=a.isText,g=a.isBogus,h=b.nodeIndex,i=function(a){var b=a.parentNode;return g(b)?i(b):b},j=function(a){return a?d.reduce(a.childNodes,function(a,b){return g(b)&&"BR"!=b.nodeName?a=a.concat(j(b)):a.push(b),a},[]):[]},k=function(a,b){for(;(a=a.previousSibling)&&f(a);)b+=a.data.length;return b},l=function(a){return function(b){return a===b}},m=function(b){var c,e,g;return c=j(i(b)),e=d.findIndex(c,l(b),b),c=c.slice(0,e+1),g=d.reduce(c,function(a,b,d){return f(b)&&f(c[d-1])&&a++,a},0),c=d.filter(c,a.matchNodeNames(b.nodeName)),e=d.findIndex(c,l(b),b),e-g},n=function(a){var b;return b=f(a)?"text()":a.nodeName.toLowerCase(),b+"["+m(a)+"]"},o=function(a,b,c){var d=[];for(b=b.parentNode;b!=a&&(!c||!c(b));b=b.parentNode)d.push(b);return d},p=function(b,e){var g,h,i,j,l,m=[];return g=e.container(),h=e.offset(),f(g)?i=k(g,h):(j=g.childNodes,h>=j.length?(i="after",h=j.length-1):i="before",g=j[h]),m.push(n(g)),l=o(b,g),l=d.filter(l,c.negate(a.isBogus)),m=m.concat(d.map(l,function(a){return n(a)})),m.reverse().join("/")+","+i},q=function(b,c,e){var g=j(b);return g=d.filter(g,function(a,b){return!f(a)||!f(g[b-1])}),g=d.filter(g,a.matchNodeNames(c)),g[e]},r=function(a,b){for(var c,d=a,g=0;f(d);){if(c=d.data.length,b>=g&&b<=g+c){a=d,b-=g;break}if(!f(d.nextSibling)){a=d,b=c;break}g+=c,d=d.nextSibling}return b>a.data.length&&(b=a.data.length),new e(a,b)},s=function(a,b){var c,g,i;return b?(c=b.split(","),b=c[0].split("/"),i=c.length>1?c[1]:"before",g=d.reduce(b,function(a,b){return(b=/([\w\-\(\)]+)\[([0-9]+)\]/.exec(b))?("text()"===b[1]&&(b[1]="#text"),q(a,b[1],parseInt(b[2],10))):null},a),g?f(g)?r(g,parseInt(i,10)):(i="after"===i?h(g)+1:h(g),new e(g.parentNode,i)):null):null};return{create:p,resolve:s}}),g("a",["28","29","2a","2b","f","p","2c","1e"],function(a,b,c,d,e,f,g,h){var i=d.isContentEditableFalse,j=function(a,b){var c,d;for(d=g.trim(a.data.slice(0,b)).length,c=a.previousSibling;c&&3===c.nodeType;c=c.previousSibling)d+=g.trim(c.data).length;return d},k=function(a){d.isText(a)&&0===a.data.length&&a.parentNode.removeChild(a)},l=function(g){var l=g.dom;this.getBookmark=function(f,m){var n,o,p,q,r,s,t,u="&#xFEFF;",v=function(a,b){var c=0;return h.each(l.select(a),function(a){if("all"!==a.getAttribute("data-mce-bogus"))return a!=b&&void c++}),c},w=function(a){var b=function(b){var c,d,e,f=b?"start":"end";c=a[f+"Container"],d=a[f+"Offset"],1==c.nodeType&&"TR"==c.nodeName&&(e=c.childNodes,c=e[Math.min(b?d:d-1,e.length-1)],c&&(d=b?0:c.childNodes.length,a["set"+(b?"Start":"End")](c,d)))};return b(!0),b(),a},x=function(a){var b=l.getRoot(),c={},d=function(a,c){var d,e=a[c?"startContainer":"endContainer"],f=a[c?"startOffset":"endOffset"],g=[],h=0;for(3===e.nodeType?g.push(m?j(e,f):f):(d=e.childNodes,f>=d.length&&d.length&&(h=1,f=Math.max(0,d.length-1)),g.push(l.nodeIndex(d[f],m)+h));e&&e!=b;e=e.parentNode)g.push(l.nodeIndex(e,m));return g};return c.start=d(a,!0),g.isCollapsed()||(c.end=d(a)),c},y=function(a){var c=function(a,c){var f;if(d.isElement(a)&&(a=e.getNode(a,c),i(a)))return a;if(b.isCaretContainer(a)){if(d.isText(a)&&b.isCaretContainerBlock(a)&&(a=a.parentNode),f=a.previousSibling,i(f))return f;if(f=a.nextSibling,i(f))return f}};return c(a.startContainer,a.startOffset)||c(a.endContainer,a.endOffset)};if(2==f)return s=g.getNode(),r=s?s.nodeName:null,n=g.getRng(),i(s)||"IMG"==r?{name:r,index:v(r,s)}:(s=y(n),s?(r=s.tagName,{name:r,index:v(r,s)}):x(n));if(3==f)return n=g.getRng(),{start:a.create(l.getRoot(),c.fromRangeStart(n)),end:a.create(l.getRoot(),c.fromRangeEnd(n))};if(f)return{rng:g.getRng()};if(n=g.getRng(),p=l.uniqueId(),q=g.isCollapsed(),t="overflow:hidden;line-height:0px",s=g.getNode(),r=s.nodeName,"IMG"==r)return{name:r,index:v(r,s)};if(o=w(n.cloneRange()),!q){o.collapse(!1);var z=l.create("span",{"data-mce-type":"bookmark",id:p+"_end",style:t},u);o.insertNode(z),k(z.nextSibling)}n=w(n),n.collapse(!0);var A=l.create("span",{"data-mce-type":"bookmark",id:p+"_start",style:t},u);return n.insertNode(A),k(A.previousSibling),g.moveToBookmark({id:p,keep:1}),{id:p}},this.moveToBookmark=function(b){var c,d,e,i,j,k,m=function(a){var e,f,g,h,i=b[a?"start":"end"];if(i){for(g=i[0],f=d,e=i.length-1;e>=1;e--){if(h=f.childNodes,i[e]>h.length-1)return;f=h[i[e]]}3===f.nodeType&&(g=Math.min(i[0],f.nodeValue.length)),1===f.nodeType&&(g=Math.min(i[0],f.childNodes.length)),a?c.setStart(f,g):c.setEnd(f,g)}return!0},n=function(a){var c,d,g,m,n=l.get(b.id+"_"+a),o=b.keep;if(n&&(c=n.parentNode,"start"==a?(o?(c=n.firstChild,d=1):d=l.nodeIndex(n),e=i=c,j=k=d):(o?(c=n.firstChild,d=1):d=l.nodeIndex(n),i=c,k=d),!o)){for(m=n.previousSibling,g=n.nextSibling,h.each(h.grep(n.childNodes),function(a){3==a.nodeType&&(a.nodeValue=a.nodeValue.replace(/\uFEFF/g,""))});n=l.get(b.id+"_"+a);)l.remove(n,1);m&&g&&m.nodeType==g.nodeType&&3==m.nodeType&&!f.opera&&(d=m.nodeValue.length,m.appendData(g.nodeValue),l.remove(g),"start"==a?(e=i=m,j=k=d):(i=m,k=d))}},o=function(a){return!l.isBlock(a)||a.innerHTML||f.ie||(a.innerHTML='<br data-mce-bogus="1" />'),a},p=function(){var c,d;return c=l.createRng(),d=a.resolve(l.getRoot(),b.start),c.setStart(d.container(),d.offset()),d=a.resolve(l.getRoot(),b.end),c.setEnd(d.container(),d.offset()),c};b&&(h.isArray(b.start)?(c=l.createRng(),d=l.getRoot(),m(!0)&&m()&&g.setRng(c)):"string"==typeof b.start?g.setRng(p(b)):b.id?(n("start"),n("end"),e&&(c=l.createRng(),c.setStart(o(e),j),c.setEnd(o(i),k),g.setRng(c))):b.name?g.select(l.select(b.name)[b.index]):b.rng&&g.setRng(b.rng))}};return l.isBookmarkNode=function(a){return a&&"SPAN"===a.tagName&&"bookmark"===a.getAttribute("data-mce-type")},l}),g("4e",["35","k","2b","2a","29","36"],function(a,b,c,d,e,f){var g=c.isContentEditableTrue,h=c.isContentEditableFalse,i=c.matchStyleValues("display","block table table-cell table-caption list-item"),j=e.isCaretContainer,k=e.isCaretContainerBlock,l=a.curry,m=c.isElement,n=f.isCaretCandidate,o=function(a){return a>0},p=function(a){return a<0},q=function(a,b){for(var c;c=a(b);)if(!k(c))return c;return null},r=function(a,c,d,e,f){var g=new b(a,e);if(p(c)){if((h(a)||k(a))&&(a=q(g.prev,!0),d(a)))return a;for(;a=q(g.prev,f);)if(d(a))return a}if(o(c)){if((h(a)||k(a))&&(a=q(g.next,!0),d(a)))return a;for(;a=q(g.next,f);)if(d(a))return a}return null},s=function(a,b){for(a=a.parentNode;a&&a!=b;a=a.parentNode)if(g(a))return a;return b},t=function(a,b){for(;a&&a!=b;){if(i(a))return a;a=a.parentNode}return null},u=function(a,b,c){return t(a.container(),c)==t(b.container(),c)},v=function(a,b,c){return s(a.container(),c)==s(b.container(),c)},w=function(a,b){var c,d;return b?(c=b.container(),d=b.offset(),m(c)?c.childNodes[d+a]:null):null},x=function(a,b){var c=b.ownerDocument.createRange();return a?(c.setStartBefore(b),c.setEndBefore(b)):(c.setStartAfter(b),c.setEndAfter(b)),c},y=function(a,b,c){return t(b,a)==t(c,a)},z=function(a,b,c){var d,e;for(e=a?"previousSibling":"nextSibling";c&&c!=b;){if(d=c[e],j(d)&&(d=d[e]),h(d)){if(y(b,d,c))return d;break}if(n(d))break;c=c.parentNode}return null},A=l(x,!0),B=l(x,!1),C=function(a,b,d){var f,g,i,k,n=l(z,!0,b),o=l(z,!1,b);if(g=d.startContainer,i=d.startOffset,e.isCaretContainerBlock(g)){if(m(g)||(g=g.parentNode),k=g.getAttribute("data-mce-caret"),"before"==k&&(f=g.nextSibling,h(f)))return A(f);if("after"==k&&(f=g.previousSibling,h(f)))return B(f)}if(!d.collapsed)return d;if(c.isText(g)){if(j(g)){if(1===a){if(f=o(g))return A(f);if(f=n(g))return B(f)}if(a===-1){if(f=n(g))return B(f);if(f=o(g))return A(f)}return d}if(e.endsWithCaretContainer(g)&&i>=g.data.length-1)return 1===a&&(f=o(g))?A(f):d;if(e.startsWithCaretContainer(g)&&i<=1)return a===-1&&(f=n(g))?B(f):d;if(i===g.data.length)return f=o(g),f?A(f):d;if(0===i)return f=n(g),f?B(f):d}return d},D=function(a,b){return h(w(a,b))};return{isForwards:o,isBackwards:p,findNode:r,getEditingHost:s,getParentBlock:t,isInSameBlock:u,isInSameEditingHost:v,isBeforeContentEditableFalse:l(D,0),isAfterContentEditableFalse:l(D,-1),normalizeRange:C}}),g("3t",["2b","36","2a","4e","1r","35"],function(a,b,c,d,e,f){var g=a.isContentEditableFalse,h=a.isText,i=a.isElement,j=a.isBr,k=d.isForwards,l=d.isBackwards,m=b.isCaretCandidate,n=b.isAtomic,o=b.isEditableCaretCandidate,p=function(a,b){for(var c=[];a&&a!=b;)c.push(a),a=a.parentNode;return c},q=function(a,b){return a.hasChildNodes()&&b<a.childNodes.length?a.childNodes[b]:null},r=function(a,b){if(k(a)){if(m(b.previousSibling)&&!h(b.previousSibling))return c.before(b);if(h(b))return c(b,0)}if(l(a)){if(m(b.nextSibling)&&!h(b.nextSibling))return c.after(b);if(h(b))return c(b,b.data.length)}return l(a)?j(b)?c.before(b):c.after(b):c.before(b)},s=function(b,e){var f;return!!a.isBr(b)&&(f=t(1,c.after(b),e),!!f&&!d.isInSameBlock(c.before(b),c.before(f),e))},t=function(a,b,u){var v,w,x,y,z,A,B;if(!i(u)||!b)return null;if(b.isEqual(c.after(u))&&u.lastChild){if(B=c.after(u.lastChild),l(a)&&m(u.lastChild)&&i(u.lastChild))return j(u.lastChild)?c.before(u.lastChild):B}else B=b;if(v=B.container(),w=B.offset(),h(v)){if(l(a)&&w>0)return c(v,--w);if(k(a)&&w<v.length)return c(v,++w);x=v}else{if(l(a)&&w>0&&(y=q(v,w-1),m(y)))return!n(y)&&(z=d.findNode(y,a,o,y))?h(z)?c(z,z.data.length):c.after(z):h(y)?c(y,y.data.length):c.before(y);if(k(a)&&w<v.childNodes.length&&(y=q(v,w),m(y)))return s(y,u)?t(a,c.after(y),u):!n(y)&&(z=d.findNode(y,a,o,y))?h(z)?c(z,0):c.before(z):h(y)?c(y,0):c.after(y);x=B.getNode()}return(k(a)&&B.isAtEnd()||l(a)&&B.isAtStart())&&(x=d.findNode(x,a,f.constant(!0),u,!0),o(x))?r(a,x):(y=d.findNode(x,a,o,u),A=e.last(e.filter(p(v,u),g)),!A||y&&A.contains(y)?y?r(a,y):null:B=k(a)?c.after(A):c.before(A))};return function(a){return{next:function(b){return t(1,b,a)},prev:function(b){return t(-1,b,a)}}}}),g("3p",["1","23","36","2a","4e","3t","2b"],function(a,b,c,d,e,f,g){var h=function(a,b,c){var e=a?d.before(c):d.after(c);return o(a,b,e)},i=function(a){return g.isBr(a)?d.before(a):d.after(a)},j=function(a){return d.isTextPosition(a)?0===a.offset():c.isCaretCandidate(a.getNode())},k=function(a){return d.isTextPosition(a)?a.offset()===a.container().data.length:c.isCaretCandidate(a.getNode(!0))},l=function(a,b){return!d.isTextPosition(a)&&!d.isTextPosition(b)&&a.getNode()===b.getNode(!0)},m=function(a){return!d.isTextPosition(a)&&g.isBr(a.getNode())},n=function(a,b,c){return a?!l(b,c)&&!m(b)&&k(b)&&j(c):!l(c,b)&&j(b)&&k(c)},o=function(a,c,d){var e=new f(c);return b.from(a?e.next(d):e.prev(d))},p=function(a,c,d){return o(a,c,d).bind(function(f){return e.isInSameBlock(d,f,c)&&n(a,d,f)?o(a,c,f):b.some(f)})},q=function(a,e){var f=a?e.firstChild:e.lastChild;return g.isText(f)?b.some(new d(f,a?0:f.data.length)):f?c.isCaretCandidate(f)?b.some(a?d.before(f):i(f)):h(a,e,f):b.none()};return{fromPosition:o,nextPosition:a.curry(o,!0),prevPosition:a.curry(o,!1),navigate:p,positionIn:q,firstPositionIn:a.curry(q,!0),lastPositionIn:a.curry(q,!1)}}),g("39",["1j","3p","2a","4e"],function(a,b,c,d){var e=function(b,c,d,e){var f=a.createRange();return f.setStart(b,c),f.setEnd(d,e),f},f=function(a){var f=c.fromRangeStart(a),g=c.fromRangeEnd(a),h=a.commonAncestorContainer;return b.fromPosition(!1,h,g).map(function(b){return!d.isInSameBlock(f,g,h)&&d.isInSameBlock(f,b,h)?e(f.container(),f.offset(),b.container(),b.offset()):a}).getOr(a)},g=function(a){return a.collapsed?a:f(a)},h=function(a){return g(a)};return{normalize:h}}),g("2t",["4","2z"],function(a,b){var c=function(c){if(null===c)return"null";var d=typeof c;return"object"===d&&a.prototype.isPrototypeOf(c)?"array":"object"===d&&b.prototype.isPrototypeOf(c)?"string":d},d=function(a){return function(b){return c(b)===a}};return{isString:d("string"),isObject:d("object"),isArray:d("array"),isNull:d("null"),isBoolean:d("boolean"),isUndefined:d("undefined"),isFunction:d("function"),isNumber:d("number")}}),g("4j",["1i","1","4","5"],function(a,b,c,d){return function(){var e=arguments;return function(){for(var f=new c(arguments.length),g=0;g<f.length;g++)f[g]=arguments[g];if(e.length!==f.length)throw new d('Wrong number of arguments to struct. Expected "['+e.length+']", got '+f.length+" arguments");var h={};return a.each(e,function(a,c){h[a]=b.constant(f[c])}),h}}}),g("43",["23","2y"],function(a,b){var c=function(){var a=b.keys,c=function(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b};return void 0===a?c:a}(),d=function(a,b){for(var d=c(a),e=0,f=d.length;e<f;e++){var g=d[e],h=a[g];b(h,g,a)}},e=function(a,b){return f(a,function(a,c,d){return{k:c,v:b(a,c,d)}})},f=function(a,b){var c={};return d(a,function(d,e){var f=b(d,e,a);c[f.k]=f.v}),c},g=function(a,b){var c={},e={};return d(a,function(a,d){var f=b(a,d)?c:e;f[d]=a}),{t:c,f:e}},h=function(a,b){var c=[];return d(a,function(a,d){c.push(b(a,d))}),c},i=function(b,d){for(var e=c(b),f=0,g=e.length;f<g;f++){var h=e[f],i=b[h];if(d(i,h,b))return a.some(i)}return a.none()},j=function(a){return h(a,function(a){return a})},k=function(a){return j(a).length};return{bifilter:g,each:d,map:e,mapToArray:h,tupleMap:f,find:i,keys:c,values:j,size:k}}),g("5o",["1i","2t","5"],function(a,b,c){var d=function(a){return a.slice(0).sort()},e=function(a,b){throw new c("All required keys ("+d(a).join(", ")+") were not specified. Specified keys were: "+d(b).join(", ")+".")},f=function(a){throw new c("Unsupported keys for object: "+d(a).join(", "))},g=function(d,e){if(!b.isArray(e))throw new c("The "+d+" fields must be an array. Was: "+e+".");a.each(e,function(a){if(!b.isString(a))throw new c("The value "+a+" in the "+d+" fields was not a string.")})},h=function(a,b){throw new c("All values need to be of type: "+b+". Keys ("+d(a).join(", ")+") were not.")},i=function(b){var e=d(b),f=a.find(e,function(a,b){return b<e.length-1&&a===e[b+1]});f.each(function(a){throw new c("The field: "+a+" occurs more than once in the combined fields: ["+e.join(", ")+"].")})};return{sort:d,reqMessage:e,unsuppMessage:f,validateStrArr:g,invalidTypeMessage:h,checkDupes:i}}),g("4k",["1i","1","43","23","5o","5","2y"],function(a,b,c,d,e,f,g){return function(h,i){var j=h.concat(i);if(0===j.length)throw new f("You must specify at least one required or optional field.");return e.validateStrArr("required",h),e.validateStrArr("optional",i),e.checkDupes(j),function(f){var k=c.keys(f),l=a.forall(h,function(b){return a.contains(k,b)});l||e.reqMessage(h,k);var m=a.filter(k,function(b){return!a.contains(j,b)});m.length>0&&e.unsuppMessage(m);var n={};return a.each(h,function(a){n[a]=b.constant(f[a])}),a.each(i,function(a){n[a]=b.constant(g.prototype.hasOwnProperty.call(f,a)?d.some(f[a]):d.none())}),n}}}),g("45",["4j","4k"],function(a,b){return{immutable:a,immutableBag:b}}),g("4l",[],function(){var a=function(a,b){var c=[],d=function(a){return c.push(a),b(a)},e=b(a);do e=e.bind(d);while(e.isSome());return c};return{toArray:a}}),g("3g",["30"],function(a){var b=function(){var b=a.getOrDie("Node");return b},c=function(a,b,c){return 0!==(a.compareDocumentPosition(b)&c)},d=function(a,d){return c(a,d,b().DOCUMENT_POSITION_PRECEDING)},e=function(a,d){return c(a,d,b().DOCUMENT_POSITION_CONTAINED_BY)};return{documentPositionPreceding:d,documentPositionContainedBy:e}}),g("4m",[],function(){var a=function(a){var b,c=!1;return function(){return c||(c=!0,b=a.apply(null,arguments)),b}};return{cached:a}}),h("6t",Number),g("6c",["1i","6t","2z"],function(a,b,c){var d=function(a,b){for(var c=0;c<a.length;c++){var d=a[c];if(d.test(b))return d}},e=function(a,c){var e=d(a,c);if(!e)return{major:0,minor:0};var f=function(a){return b(c.replace(e,"$"+a))};return h(f(1),f(2))},f=function(a,b){var d=c(b).toLowerCase();return 0===a.length?g():e(a,d)},g=function(){return h(0,0)},h=function(a,b){return{major:a,minor:b}};return{nu:h,detect:f,unknown:g}}),g("5p",["1","6c"],function(a,b){var c="Edge",d="Chrome",e="IE",f="Opera",g="Firefox",h="Safari",i=function(a,b){return function(){return b===a}},j=function(){return k({current:void 0,version:b.unknown()})},k=function(a){var b=a.current,j=a.version;return{current:b,version:j,isEdge:i(c,b),isChrome:i(d,b),isIE:i(e,b),isOpera:i(f,b),isFirefox:i(g,b),isSafari:i(h,b)}};return{unknown:j,nu:k,edge:a.constant(c),chrome:a.constant(d),ie:a.constant(e),opera:a.constant(f),firefox:a.constant(g),safari:a.constant(h)}}),g("5q",["1","6c"],function(a,b){var c="Windows",d="iOS",e="Android",f="Linux",g="OSX",h="Solaris",i="FreeBSD",j=function(a,b){return function(){return b===a}},k=function(){return l({current:void 0,version:b.unknown()})},l=function(a){var b=a.current,k=a.version;return{current:b,version:k,isWindows:j(c,b),isiOS:j(d,b),isAndroid:j(e,b),isOSX:j(g,b),isLinux:j(f,b),isSolaris:j(h,b),isFreeBSD:j(i,b)}};return{unknown:k,nu:l,windows:a.constant(c),ios:a.constant(d),android:a.constant(e),linux:a.constant(f),osx:a.constant(g),solaris:a.constant(h),freebsd:a.constant(i)}}),g("5r",["1"],function(a){return function(b,c,d){var e=b.isiOS()&&/ipad/i.test(d)===!0,f=b.isiOS()&&!e,g=b.isAndroid()&&3===b.version.major,h=b.isAndroid()&&4===b.version.major,i=e||g||h&&/mobile/i.test(d)===!0,j=b.isiOS()||b.isAndroid(),k=j&&!i,l=c.isSafari()&&b.isiOS()&&/safari/i.test(d)===!1;return{isiPad:a.constant(e),isiPhone:a.constant(f),isTablet:a.constant(i),isPhone:a.constant(k),isTouch:a.constant(j),isAndroid:b.isAndroid,isiOS:b.isiOS,isWebView:a.constant(l)}}}),g("5s",["1i","6c","2z"],function(a,b,c){var d=function(b,d){var e=c(d).toLowerCase();return a.find(b,function(a){return a.search(e)})},e=function(a,c){return d(a,c).map(function(a){var d=b.detect(a.versionRegexes,c);return{current:a.name,version:d}})},f=function(a,c){return d(a,c).map(function(a){var d=b.detect(a.versionRegexes,c);return{current:a.name,version:d}})};return{detectBrowser:e,detectOs:f}}),g("4r",[],function(){var a=function(a,b){return b+a},b=function(a,b){return a+b},c=function(a,b){return a.substring(b)},d=function(a,b){return a.substring(0,a.length-b)};return{addToStart:a,addToEnd:b,removeFromStart:c,removeFromEnd:d}}),g("4s",["23","5"],function(a,b){var c=function(a,b){return a.substr(0,b)},d=function(a,b){return a.substr(a.length-b,a.length)},e=function(b){return""===b?a.none():a.some(b.substr(0,1))},f=function(b){return""===b?a.none():a.some(b.substring(1))};return{first:c,last:d,head:e,tail:f}}),g("44",["4r","4s","5"],function(a,b,c){var d=function(a,b,c){if(""===b)return!0;if(a.length<b.length)return!1;var d=a.substr(c,c+b.length);return d===b},e=function(a,b){var c=function(a){var b=typeof a;return"string"===b||"number"===b};return a.replace(/\${([^{}]*)}/g,function(a,d){var e=b[d];return c(e)?e:a})},f=function(b,c){return l(b,c)?a.removeFromStart(b,c.length):b},g=function(b,c){return m(b,c)?a.removeFromEnd(b,c.length):b},h=function(b,c){return l(b,c)?b:a.addToStart(b,c)},i=function(b,c){return m(b,c)?b:a.addToEnd(b,c)},j=function(a,b){return a.indexOf(b)!==-1},k=function(a){return b.head(a).bind(function(c){return b.tail(a).map(function(a){return c.toUpperCase()+a})}).getOr(a)},l=function(a,b){return d(a,b,0)},m=function(a,b){return d(a,b,a.length-b.length)},n=function(a){return a.replace(/^\s+|\s+$/g,"")},o=function(a){return a.replace(/^\s+/g,"")},p=function(a){return a.replace(/\s+$/g,"")};return{supplant:e,startsWith:l,removeLeading:f,removeTrailing:g,ensureLeading:h,ensureTrailing:i,endsWith:m,contains:j,trim:n,lTrim:o,rTrim:p,capitalize:k}}),g("5t",["1","44"],function(a,b){var c=/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,d=function(a){return function(c){return b.contains(c,a)}},e=[{name:"Edge",versionRegexes:[/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],search:function(a){var c=b.contains(a,"edge/")&&b.contains(a,"chrome")&&b.contains(a,"safari")&&b.contains(a,"applewebkit");return c}},{name:"Chrome",versionRegexes:[/.*?chrome\/([0-9]+)\.([0-9]+).*/,c],search:function(a){return b.contains(a,"chrome")&&!b.contains(a,"chromeframe")}},{name:"IE",versionRegexes:[/.*?msie\ ?([0-9]+)\.([0-9]+).*/,/.*?rv:([0-9]+)\.([0-9]+).*/],search:function(a){return b.contains(a,"msie")||b.contains(a,"trident")}},{name:"Opera",versionRegexes:[c,/.*?opera\/([0-9]+)\.([0-9]+).*/],search:d("opera")},{name:"Firefox",versionRegexes:[/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],search:d("firefox")},{name:"Safari",versionRegexes:[c,/.*?cpu os ([0-9]+)_([0-9]+).*/],search:function(a){return(b.contains(a,"safari")||b.contains(a,"mobile/"))&&b.contains(a,"applewebkit")}}],f=[{name:"Windows",search:d("win"),versionRegexes:[/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]},{name:"iOS",search:function(a){return b.contains(a,"iphone")||b.contains(a,"ipad")},versionRegexes:[/.*?version\/\ ?([0-9]+)\.([0-9]+).*/,/.*cpu os ([0-9]+)_([0-9]+).*/,/.*cpu iphone os ([0-9]+)_([0-9]+).*/]},{name:"Android",search:d("android"),versionRegexes:[/.*?android\ ?([0-9]+)\.([0-9]+).*/]},{name:"OSX",search:d("os x"),versionRegexes:[/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]},{name:"Linux",search:d("linux"),versionRegexes:[]},{name:"Solaris",search:d("sunos"),versionRegexes:[]},{name:"FreeBSD",search:d("freebsd"),versionRegexes:[]}];return{browsers:a.constant(e),oses:a.constant(f)}}),g("4n",["5p","5q","5r","5s","5t"],function(a,b,c,d,e){var f=function(f){var g=e.browsers(),h=e.oses(),i=d.detectBrowser(g,f).fold(a.unknown,a.nu),j=d.detectOs(h,f).fold(b.unknown,b.nu),k=c(j,i,f);return{browser:i,os:j,deviceType:k}};return{detect:f}}),g("3h",["4m","4n","1m"],function(a,b,c){var d=a.cached(function(){var a=c.userAgent;return b.detect(a)});return{detect:d}}),g("3i",[],function(){return{ATTRIBUTE:2,CDATA_SECTION:4,COMMENT:8,DOCUMENT:9,DOCUMENT_TYPE:10,DOCUMENT_FRAGMENT:11,ELEMENT:1,TEXT:3,PROCESSING_INSTRUCTION:7,ENTITY_REFERENCE:5,ENTITY:6,NOTATION:12}}),g("2d",["1i","23","1t","3i","5","1j"],function(a,b,c,d,e,f){var g=0,h=1,i=2,j=3,k=function(){var a=f.createElement("span");return void 0!==a.matches?g:void 0!==a.msMatchesSelector?h:void 0!==a.webkitMatchesSelector?i:void 0!==a.mozMatchesSelector?j:-1}(),l=d.ELEMENT,m=d.DOCUMENT,n=function(a,b){var c=a.dom();if(c.nodeType!==l)return!1;if(k===g)return c.matches(b);if(k===h)return c.msMatchesSelector(b);if(k===i)return c.webkitMatchesSelector(b);if(k===j)return c.mozMatchesSelector(b);throw new e("Browser lacks native selectors")},o=function(a){return a.nodeType!==l&&a.nodeType!==m||0===a.childElementCount},p=function(b,d){var e=void 0===d?f:d.dom();return o(e)?[]:a.map(e.querySelectorAll(b),c.fromDom)},q=function(a,d){var e=void 0===d?f:d.dom();return o(e)?b.none():b.from(e.querySelector(a)).map(c.fromDom)};return{all:p,is:n,one:q}}),g("2f",["1i","1","3g","3h","2d"],function(a,b,c,d,e){var f=function(a,b){return a.dom()===b.dom()},g=function(a,b){return a.dom().isEqualNode(b.dom())},h=function(c,d){return a.exists(d,b.curry(f,c))},i=function(a,b){var c=a.dom(),d=b.dom();return c!==d&&c.contains(d)},j=function(a,b){return c.documentPositionContainedBy(a.dom(),b.dom())},k=d.detect().browser,l=k.isIE()?j:i;return{eq:f,isEqualNode:g,member:h,contains:l,is:e.is}}),g("3k",["2t","1i","1","23","45","4l","2f","1t"],function(a,b,c,d,e,f,g,h){var i=function(a){return h.fromDom(a.dom().ownerDocument)},j=function(a){var b=i(a);return h.fromDom(b.dom().documentElement)},k=function(a){var b=a.dom(),c=b.ownerDocument.defaultView;return h.fromDom(c)},l=function(a){var b=a.dom();return d.from(b.parentNode).map(h.fromDom)},m=function(a){return l(a).bind(function(c){var d=u(c);return b.findIndex(d,function(b){return g.eq(a,b)})})},n=function(b,d){for(var e=a.isFunction(d)?d:c.constant(!1),f=b.dom(),g=[];null!==f.parentNode&&void 0!==f.parentNode;){var i=f.parentNode,j=h.fromDom(i);if(g.push(j),e(j)===!0)break;f=i}return g},o=function(a){var c=function(c){return b.filter(c,function(b){return!g.eq(a,b)})};return l(a).map(u).map(c).getOr([])},p=function(a){var b=a.dom();return d.from(b.offsetParent).map(h.fromDom)},q=function(a){var b=a.dom();return d.from(b.previousSibling).map(h.fromDom)},r=function(a){var b=a.dom();return d.from(b.nextSibling).map(h.fromDom)},s=function(a){return b.reverse(f.toArray(a,q))},t=function(a){return f.toArray(a,r)},u=function(a){var c=a.dom();return b.map(c.childNodes,h.fromDom)},v=function(a,b){var c=a.dom().childNodes;return d.from(c[b]).map(h.fromDom)},w=function(a){return v(a,0)},x=function(a){return v(a,a.dom().childNodes.length-1)},y=function(a,b){return a.dom().childNodes.length},z=e.immutable("element","offset"),A=function(a,b){var c=u(a);return c.length>0&&b<c.length?z(c[b],0):z(a,b)};return{owner:i,defaultView:k,documentElement:j,parent:l,findIndex:m,parents:n,siblings:o,prevSibling:q,offsetParent:p,prevSiblings:s,nextSibling:r,nextSiblings:t,children:u,child:v,firstChild:w,lastChild:x,childNodesCount:y,leaf:A}}),g("4f",["3k"],function(a){var b=function(b,c){var d=a.parent(b);d.each(function(a){a.dom().insertBefore(c.dom(),b.dom())})},c=function(c,d){var f=a.nextSibling(c);f.fold(function(){var b=a.parent(c);b.each(function(a){e(a,d)})},function(a){b(a,d)})},d=function(b,c){var d=a.firstChild(b);d.fold(function(){e(b,c)},function(a){b.dom().insertBefore(c.dom(),a.dom())})},e=function(a,b){a.dom().appendChild(b.dom())},f=function(c,d,f){a.child(c,f).fold(function(){e(c,d)},function(a){b(a,d)})},g=function(a,c){b(a,c),e(c,a)};return{before:b,after:c,prepend:d,append:e,appendAt:f,wrap:g}}),g("5u",["1i","4f"],function(a,b){var c=function(c,d){a.each(d,function(a){b.before(c,a)})},d=function(c,d){a.each(d,function(a,e){var f=0===e?c:d[e-1];b.after(f,a)})},e=function(c,d){a.each(d.slice().reverse(),function(a){b.prepend(c,a)})},f=function(c,d){a.each(d,function(a){b.append(c,a)})};return{before:c,after:d,prepend:e,append:f}}),g("4g",["1i","5u","3k"],function(a,b,c){var d=function(b){b.dom().textContent="",a.each(c.children(b),function(a){e(a)})},e=function(a){var b=a.dom();null!==b.parentNode&&b.parentNode.removeChild(b)},f=function(a){var d=c.children(a);
d.length>0&&b.before(a,d),e(a)};return{empty:d,remove:e,unwrap:f}}),g("3l",["3i"],function(a){var b=function(a){var b=a.dom().nodeName;return b.toLowerCase()},c=function(a){return a.dom().nodeType},d=function(a){return a.dom().nodeValue},e=function(a){return function(b){return c(b)===a}},f=function(d){return c(d)===a.COMMENT||"#comment"===b(d)},g=e(a.ELEMENT),h=e(a.TEXT),i=e(a.DOCUMENT);return{name:b,type:c,value:d,isElement:g,isText:h,isDocument:i,isComment:f}}),g("4h",["3h","23","5"],function(a,b,c){return function(d,e){var f=function(a){if(!d(a))throw new c("Can only get "+e+" value of a "+e+" node");return j(a).getOr("")},g=function(a){try{return h(a)}catch(a){return b.none()}},h=function(a){return d(a)?b.from(a.dom().nodeValue):b.none()},i=a.detect().browser,j=i.isIE()&&10===i.version.major?g:h,k=function(a,b){if(!d(a))throw new c("Can only set raw "+e+" value of a "+e+" node");a.dom().nodeValue=b};return{get:f,getOption:j,set:k}}}),g("3m",["3l","4h"],function(a,b){var c=b(a.isText,"text"),d=function(a){return c.get(a)},e=function(a){return c.getOption(a)},f=function(a,b){c.set(a,b)};return{get:d,getOption:e,set:f}}),g("4p",["4m","1t","3l","1j"],function(a,b,c,d){var e=function(a){var b=c.isText(a)?a.dom().parentNode:a.dom();return void 0!==b&&null!==b&&b.ownerDocument.body.contains(b)},f=a.cached(function(){return g(b.fromDom(d))}),g=function(a){var c=a.dom().body;if(null===c||void 0===c)throw"Body is not available yet";return b.fromDom(c)};return{body:f,getBody:g,inBody:e}}),g("5v",["1i","4p","3k"],function(a,b,c){var d=function(a){return h(b.body(),a)},e=function(b,d,e){return a.filter(c.parents(b,e),d)},f=function(b,d){return a.filter(c.siblings(b),d)},g=function(b,d){return a.filter(c.children(b),d)},h=function(b,d){var e=[];return a.each(c.children(b),function(a){d(a)&&(e=e.concat([a])),e=e.concat(h(a,d))}),e};return{all:d,ancestors:e,siblings:f,children:g,descendants:h}}),g("4i",["5v","2d"],function(a,b){var c=function(a){return b.all(a)},d=function(c,d,e){return a.ancestors(c,function(a){return b.is(a,d)},e)},e=function(c,d){return a.siblings(c,function(a){return b.is(a,d)})},f=function(c,d){return a.children(c,function(a){return b.is(a,d)})},g=function(a,c){return b.all(c,a)};return{all:c,ancestors:d,siblings:e,children:f,descendants:g}}),g("3r",["1i","1","3l"],function(a,b,c){var d=["article","aside","details","div","dt","figcaption","footer","form","fieldset","header","hgroup","html","main","nav","section","summary","body","p","dl","multicol","dd","figure","address","center","blockquote","h1","h2","h3","h4","h5","h6","listing","xmp","pre","plaintext","menu","dir","ul","ol","li","hr","table","tbody","thead","tfoot","th","tr","td","caption"],e=["area","base","basefont","br","col","frame","hr","img","input","isindex","link","meta","param","embed","source","wbr","track"],f=["td","th"],g=["thead","tbody","tfoot"],h=["h1","h2","h3","h4","h5","h6","p","div","address","pre","form","blockquote","center","dir","fieldset","header","footer","article","section","hgroup","aside","nav","figure"],i=["h1","h2","h3","h4","h5","h6"],j=["li","dd","dt"],k=["ul","ol","dl"],l=function(d){var e;return function(f){return e=e?e:a.mapToObject(d,b.constant(!0)),e.hasOwnProperty(c.name(f))}},m=l(i),n=l(d),o=function(a){return c.isElement(a)&&!n(a)},p=function(a){return c.isElement(a)&&"br"===c.name(a)};return{isBlock:n,isInline:o,isHeading:m,isTextBlock:l(h),isList:l(k),isListItem:l(j),isVoid:l(e),isTableSection:l(g),isTableCell:l(f),isBr:p}}),g("3v",["1i","4f","4g","1t","3l","3m","4i","3k","3r"],function(a,b,c,d,e,f,g,h,i){var j=function(a){for(var b=[],c=a.dom();c;)b.push(d.fromDom(c)),c=c.lastChild;return b},k=function(b){var d=g.descendants(b,"br"),e=a.filter(j(b).slice(-1),i.isBr);d.length===e.length&&a.each(e,c.remove)},l=function(a){c.empty(a),b.append(a,d.fromHtml('<br data-mce-bogus="1">'))},m=function(a){return e.isText(a)?"\xa0"===f.get(a):i.isBr(a)},n=function(b){return 1===a.filter(h.children(b),m).length},o=function(a){h.lastChild(a).each(function(b){h.prevSibling(b).each(function(d){i.isBlock(a)&&i.isBr(b)&&i.isBlock(d)&&c.remove(b)})})};return{removeTrailingBr:k,fillWithPaddingBr:l,isPaddedElement:n,trimBlockTrailingBr:o}}),g("3c",["k"],function(a){var b=function(a){return a&&/^(IMG)$/.test(a.nodeName)},c=function(c,d,e){var f,h,i,j=e.startContainer,k=e.startOffset;if((e.startContainer!==e.endContainer||!b(e.startContainer.childNodes[e.startOffset]))&&(3===j.nodeType&&k>=j.nodeValue.length&&(k=c.nodeIndex(j),j=j.parentNode),1===j.nodeType))for(i=j.childNodes,k<i.length?(j=i[k],f=new a(j,c.getParent(j,c.isBlock))):(j=i[i.length-1],f=new a(j,c.getParent(j,c.isBlock)),f.next(!0)),h=f.current();h;h=f.next())if(3===h.nodeType&&!g(h))return e.setStart(h,0),void d.setRng(e)},d=function(a,b,c){if(a)for(b=b?"nextSibling":"previousSibling",a=c?a:a[b];a;a=a[b])if(1===a.nodeType||!g(a))return a},e=function(a,b){return b.nodeType&&(b=b.nodeName),!!a.schema.getTextBlockElements()[b.toLowerCase()]},f=function(a,b,c){return a.schema.isValidChild(b,c)},g=function(a){return a&&3===a.nodeType&&/^([\t \r\n]+|)$/.test(a.nodeValue)},h=function(a,b){return"string"!=typeof a?a=a(b):b&&(a=a.replace(/%(\w+)/g,function(a,c){return b[c]||a})),a},i=function(a,b){return a=a||"",b=b||"",a=""+(a.nodeName||a),b=""+(b.nodeName||b),a.toLowerCase()===b.toLowerCase()},j=function(a,b,c){return"color"!==c&&"backgroundColor"!==c||(b=a.toHex(b)),"fontWeight"===c&&700===b&&(b="bold"),"fontFamily"===c&&(b=b.replace(/[\'\"]/g,"").replace(/,\s+/g,",")),""+b},k=function(a,b,c){return j(a,a.getStyle(b,c),c)},l=function(a,b){var c;return a.getParent(b,function(b){return c=a.getStyle(b,"text-decoration"),c&&"none"!==c}),c},m=function(a,b,c){return a.getParents(b,c,a.getRoot())};return{isInlineBlock:b,moveStart:c,getNonWhiteSpaceSibling:d,isTextBlock:e,isValid:f,isWhiteSpaceNode:g,replaceVars:h,isEq:i,normalizeStyleValue:j,getStyle:k,getTextDecoration:l,getParents:m}}),g("3b",["a","k","3c"],function(a,b,c){var d=a.isBookmarkNode,e=c.getParents,f=c.isWhiteSpaceNode,g=c.isTextBlock,h=function(a,b){for("undefined"==typeof b&&(b=3===a.nodeType?a.length:a.childNodes.length);a&&a.hasChildNodes();)a=a.childNodes[b],a&&(b=3===a.nodeType?a.length:a.childNodes.length);return{node:a,offset:b}},i=function(a,b){var c=h(a,b);if(c.node){for(;c.node&&0===c.offset&&c.node.previousSibling;)c=h(c.node.previousSibling);c.node&&c.offset>0&&3===c.node.nodeType&&" "===c.node.nodeValue.charAt(c.offset-1)&&c.offset>1&&(a=c.node,a.splitText(c.offset-1))}return a},j=function(a){return"BR"===a.nodeName&&a.getAttribute("data-mce-bogus")&&!a.nextSibling},k=function(a,h,k,l){var m,n,o=h.startContainer,p=h.startOffset,q=h.endContainer,r=h.endOffset,s=a.dom,t=function(a){var b,c,e,g,h;if(b=c=a?o:q,g=a?"previousSibling":"nextSibling",h=s.getRoot(),3===b.nodeType&&!f(b)&&(a?p>0:r<b.nodeValue.length))return b;for(;;){if(!k[0].block_expand&&s.isBlock(c))return c;for(e=c[g];e;e=e[g])if(!d(e)&&!f(e)&&!j(e))return c;if(c===h||c.parentNode===h){b=c;break}c=c.parentNode}return b};1===o.nodeType&&o.hasChildNodes()&&(m=o.childNodes.length-1,o=o.childNodes[p>m?m:p],3===o.nodeType&&(p=0)),1===q.nodeType&&q.hasChildNodes()&&(m=q.childNodes.length-1,q=q.childNodes[r>m?m:r-1],3===q.nodeType&&(r=q.nodeValue.length));var u=function(a){for(var b=a;b;){if(1===b.nodeType&&s.getContentEditable(b))return"false"===s.getContentEditable(b)?b:a;b=b.parentNode}return a},v=function(c,d,e){var f,g,h,i,j=function(a,b){var c,d,f=a.nodeValue;return"undefined"==typeof b&&(b=e?f.length:0),e?(c=f.lastIndexOf(" ",b),d=f.lastIndexOf("\xa0",b),c=c>d?c:d,c===-1||l||c++):(c=f.indexOf(" ",b),d=f.indexOf("\xa0",b),c=c!==-1&&(d===-1||c<d)?c:d),c};if(3===c.nodeType){if(h=j(c,d),h!==-1)return{container:c,offset:h};i=c}for(f=new b(c,s.getParent(c,s.isBlock)||a.getBody());g=f[e?"prev":"next"]();)if(3===g.nodeType){if(i=g,h=j(g),h!==-1)return{container:g,offset:h}}else if(s.isBlock(g))break;if(i)return d=e?0:i.length,{container:i,offset:d}},w=function(a,b){var c,d,f,g;for(3===a.nodeType&&0===a.nodeValue.length&&a[b]&&(a=a[b]),c=e(s,a),d=0;d<c.length;d++)for(f=0;f<k.length;f++)if(g=k[f],!("collapsed"in g&&g.collapsed!==h.collapsed)&&s.is(c[d],g.selector))return c[d];return a},x=function(b,d){var f,h=s.getRoot();if(k[0].wrapper||(f=s.getParent(b,k[0].block,h)),!f){var i=s.getParent(b,"LI,TD,TH");f=s.getParent(3===b.nodeType?b.parentNode:b,function(b){return b!==h&&g(a,b)},i)}if(f&&k[0].wrapper&&(f=e(s,f,"ul,ol").reverse()[0]||f),!f)for(f=b;f[d]&&!s.isBlock(f[d])&&(f=f[d],!c.isEq(f,"br")););return f||b};return o=u(o),q=u(q),(d(o.parentNode)||d(o))&&(o=d(o)?o:o.parentNode,o=o.nextSibling||o,3===o.nodeType&&(p=0)),(d(q.parentNode)||d(q))&&(q=d(q)?q:q.parentNode,q=q.previousSibling||q,3===q.nodeType&&(r=q.length)),k[0].inline&&(h.collapsed&&(n=v(o,p,!0),n&&(o=n.container,p=n.offset),n=v(q,r),n&&(q=n.container,r=n.offset)),q=l?q:i(q,r)),(k[0].inline||k[0].block_expand)&&(k[0].inline&&3===o.nodeType&&0!==p||(o=t(!0)),k[0].inline&&3===q.nodeType&&r!==q.nodeValue.length||(q=t())),k[0].selector&&k[0].expand!==!1&&!k[0].inline&&(o=w(o,"previousSibling"),q=w(q,"nextSibling")),(k[0].block||k[0].selector)&&(o=x(o,"previousSibling"),q=x(q,"nextSibling"),k[0].block&&(s.isBlock(o)||(o=t(!0)),s.isBlock(q)||(q=t()))),1===o.nodeType&&(p=s.nodeIndex(o),o=o.parentNode),1===q.nodeType&&(r=s.nodeIndex(q)+1,q=q.parentNode),{startContainer:o,startOffset:p,endContainer:q,endOffset:r}};return{expandRng:k}}),g("1y",["3c"],function(a){var b=a.isEq,c=function(a,b,c){var d=a.formatter.get(c);if(d)for(var e=0;e<d.length;e++)if(d[e].inherit===!1&&a.dom.is(b,d[e].selector))return!0;return!1},d=function(a,b,d,e){var f=a.dom.getRoot();return b!==f&&(b=a.dom.getParent(b,function(b){return!!c(a,b,d)||(b.parentNode===f||!!g(a,b,d,e,!0))}),g(a,b,d,e))},e=function(a,c,d){return!!b(c,d.inline)||(!!b(c,d.block)||(d.selector?1===c.nodeType&&a.is(c,d.selector):void 0))},f=function(c,d,e,f,g,h){var i,j,k,l=e[f];if(e.onmatch)return e.onmatch(d,e,f);if(l)if("undefined"==typeof l.length){for(i in l)if(l.hasOwnProperty(i)){if(j="attributes"===f?c.getAttrib(d,i):a.getStyle(c,d,i),g&&!j&&!e.exact)return;if((!g||e.exact)&&!b(j,a.normalizeStyleValue(c,a.replaceVars(l[i],h),i)))return}}else for(k=0;k<l.length;k++)if("attributes"===f?c.getAttrib(d,l[k]):a.getStyle(c,d,l[k]))return e;return e},g=function(a,b,c,d,g){var h,i,j,k,l=a.formatter.get(c),m=a.dom;if(l&&b)for(i=0;i<l.length;i++)if(h=l[i],e(a.dom,b,h)&&f(m,b,h,"attributes",g,d)&&f(m,b,h,"styles",g,d)){if(k=h.classes)for(j=0;j<k.length;j++)if(!a.dom.hasClass(b,k[j]))return;return h}},h=function(a,b,c,e){var f;return e?d(a,e,b,c):(e=a.selection.getNode(),!!d(a,e,b,c)||(f=a.selection.getStart(),!(f===e||!d(a,f,b,c))))},i=function(a,b,c){var d,e=[],f={};return d=a.selection.getStart(),a.dom.getParent(d,function(d){var h,i;for(h=0;h<b.length;h++)i=b[h],!f[i]&&g(a,d,i,c)&&(f[i]=!0,e.push(i))},a.dom.getRoot()),e},j=function(b,c){var d,e,f,g,h,i=b.formatter.get(c),j=b.dom;if(i)for(d=b.selection.getStart(),e=a.getParents(j,d),g=i.length-1;g>=0;g--){if(h=i[g].selector,!h||i[g].defaultBlock)return!0;for(f=e.length-1;f>=0;f--)if(j.is(e[f],h))return!0}return!1};return{matchNode:g,matchName:e,match:h,matchAll:i,canApply:j,matchesUnInheritedFormatSelector:c}}),g("3a",["1i","1t","3v","f","k","3b","3c","1y","2c","35","1e"],function(a,b,c,d,e,f,g,h,i,j,k){var l=i.ZWSP,m="_mce_caret",n=!1,o=function(a){return 1===a.nodeType&&a.id===m},p=function(a,b){for(;a;){if(3===a.nodeType&&a.nodeValue!==l||a.childNodes.length>1)return!1;b&&1===a.nodeType&&b.push(a),a=a.firstChild}return!0},q=function(a){var b;if(a)for(b=new e(a,a),a=b.current();a;a=b.next())if(3===a.nodeType)return a;return null},r=function(a,b){var c=a.create("span",{id:m,"data-mce-bogus":"1",style:n?"color:red":""});return b&&c.appendChild(a.doc.createTextNode(l)),c},s=function(a){for(;a;){if(a.id===m)return a;a=a.parentNode}},t=function(a,b){var c;c=s(b.getStart()),c&&!a.isEmpty(c)&&k.walk(c,function(b){1!==b.nodeType||b.id===m||a.isEmpty(b)||a.setAttrib(b,"data-mce-bogus",null)},"childNodes")},u=function(a){var b=q(a);return b&&b.nodeValue.charAt(0)===l&&b.deleteData(0,1),b},v=function(a,d,e,f){var g,h,i;g=d.getRng(!0),h=a.getParent(e,a.isBlock),p(e)?(f!==!1&&(g.setStartBefore(e),g.setEndBefore(e)),a.remove(e)):(i=u(e),g.startContainer===i&&g.startOffset>0&&g.setStart(i,g.startOffset-1),g.endContainer===i&&g.endOffset>0&&g.setEnd(i,g.endOffset-1),a.remove(e,!0)),h&&a.isEmpty(h)&&c.fillWithPaddingBr(b.fromDom(h)),d.setRng(g)},w=function(a,b,c,d){if(c)v(a,b,c,d);else if(c=s(b.getStart()),!c)for(;c=a.get(m);)v(a,b,c,!1)},x=function(a,d,e){var f=a.dom,h=f.getParent(e,j.curry(g.isTextBlock,a));h&&f.isEmpty(h)?e.parentNode.replaceChild(d,e):(c.removeTrailingBr(b.fromDom(e)),f.isEmpty(e)?e.parentNode.replaceChild(d,e):f.insertAfter(d,e))},y=function(a,b){return a.appendChild(b),b},z=function(b,c){var d=a.foldr(b,function(a,b){return y(a,b.cloneNode(!1))},c);return y(d,d.ownerDocument.createTextNode(l))},A=function(a){a._hasCaretEvents||(D(a),a._hasCaretEvents=!0)},B=function(a,b,c){var e,g,h,i,j,k,m,n=a.dom,o=a.selection;A(a),e=o.getRng(!0),i=e.startOffset,k=e.startContainer,m=k.nodeValue,g=s(o.getStart()),g&&(h=q(g));var p=/[^\s\u00a0\u00ad\u200b\ufeff]/;m&&i>0&&i<m.length&&p.test(m.charAt(i))&&p.test(m.charAt(i-1))?(j=o.getBookmark(),e.collapse(!0),e=f.expandRng(a,e,a.formatter.get(b)),e=new d(n).split(e),a.formatter.apply(b,c,e),o.moveToBookmark(j)):(g&&h.nodeValue===l?a.formatter.apply(b,c,g):(g=r(n,!0),h=g.firstChild,e.insertNode(g),i=1,a.formatter.apply(b,c,g)),o.setCursorLocation(h,i))},C=function(a,b,c,e){var g,i,j,k,l,m,n,o=a.dom,p=a.selection,q=p.getRng(!0),t=[];for(A(a),g=q.startContainer,i=q.startOffset,l=g,3===g.nodeType&&(i!==g.nodeValue.length&&(k=!0),l=l.parentNode);l;){if(h.matchNode(a,l,b,c,e)){m=l;break}l.nextSibling&&(k=!0),t.push(l),l=l.parentNode}if(m)if(k)j=p.getBookmark(),q.collapse(!0),q=f.expandRng(a,q,a.formatter.get(b),!0),q=new d(o).split(q),a.formatter.remove(b,c,q),p.moveToBookmark(j);else{n=s(m);var u=r(o,!1),w=z(t,u);n?x(a,u,n):x(a,u,m),v(o,p,n,!1),p.setCursorLocation(w,1),o.isEmpty(m)&&o.remove(m)}},D=function(a){var b=a.dom,c=a.selection;if(!a._hasCaretEvents){var d,e;a.on("BeforeGetContent",function(a){d&&"raw"!==a.format&&d()}),a.on("mouseup keydown",function(a){e&&e(a)}),d=function(){var a,d=[];if(p(s(c.getStart()),d))for(a=d.length;a--;)b.setAttrib(d[a],"data-mce-bogus","1")},e=function(a){var d=a.keyCode;w(b,c,null,!1),8===d&&c.isCollapsed()&&c.getStart().innerHTML===l&&w(b,c,s(c.getStart())),37!==d&&39!==d||w(b,c,s(c.getStart())),t(b,c)},a.on("SetContent",function(a){a.selection&&t(b,c)}),a._hasCaretEvents=!0}};return{applyCaretFormat:B,removeCaretFormat:C,isCaretNode:o}}),g("3d",["1r","2b","c"],function(a,b,c){var d={},e=a.filter,f=a.each,g=function(a,b){var c=d[a];c||(d[a]=c=[]),d[a].push(b)},h=function(a,b){f(d[a],function(a){a(b)})};return g("pre",function(d){var g,h,i=d.selection.getRng(),j=function(b){return g(b.previousSibling)&&a.indexOf(h,b.previousSibling)!==-1},k=function(a,b){c(b).remove(),c(a).append("<br><br>").append(b.childNodes)};g=b.matchNodeNames("pre"),i.collapsed||(h=d.selection.getSelectedBlocks(),f(e(e(h,g),j),function(a){k(a.previousSibling,a)}))}),{postProcess:h}}),g("3u",["a","1e"],function(a,b){var c=b.each,d=function(b){this.compare=function(d,e){if(d.nodeName!=e.nodeName)return!1;var f=function(a){var d={};return c(b.getAttribs(a),function(c){var e=c.nodeName.toLowerCase();0!==e.indexOf("_")&&"style"!==e&&0!==e.indexOf("data-")&&(d[e]=b.getAttrib(a,e))}),d},g=function(a,b){var c,d;for(d in a)if(a.hasOwnProperty(d)){if(c=b[d],"undefined"==typeof c)return!1;if(a[d]!=c)return!1;delete b[d]}for(d in b)if(b.hasOwnProperty(d))return!1;return!0};return!!g(f(d),f(e))&&(!!g(b.parseStyle(b.getAttrib(d,"style")),b.parseStyle(b.getAttrib(e,"style")))&&(!a.isBookmarkNode(d)&&!a.isBookmarkNode(e)))}};return d}),g("20",["1","a","f","k","3a","3b","3c","1y","1e"],function(a,b,c,d,e,f,g,h,i){var j=/^(src|href|style)$/,k=i.each,l=g.isEq,m=function(a){return/^(TH|TD)$/.test(a.nodeName)},n=function(a,b,c){var e,f,g;return e=b[c?"startContainer":"endContainer"],f=b[c?"startOffset":"endOffset"],1===e.nodeType&&(g=e.childNodes.length-1,!c&&f&&f--,e=e.childNodes[f>g?g:f]),3===e.nodeType&&c&&f>=e.nodeValue.length&&(e=new d(e,a.getBody()).next()||e),3!==e.nodeType||c||0!==f||(e=new d(e,a.getBody()).prev()||e),e},o=function(a,b,c,d){var e=a.create(c,d);return b.parentNode.insertBefore(e,b),e.appendChild(b),e},p=function(a,b,c){return!!l(b,c.inline)||(!!l(b,c.block)||(c.selector?1===b.nodeType&&a.is(b,c.selector):void 0))},q=function(a,b){return b.links&&"A"===a.tagName},r=function(a,b,c,d){return b=g.getNonWhiteSpaceSibling(b,c,d),!b||"BR"===b.nodeName||a.isBlock(b)},s=function(a,b,c){var d,e=b.parentNode,f=a.dom,h=a.settings.forced_root_block;c.block&&(h?e===f.getRoot()&&(c.list_block&&l(b,c.list_block)||k(i.grep(b.childNodes),function(b){g.isValid(a,h,b.nodeName.toLowerCase())?d?d.appendChild(b):(d=o(f,b,h),f.setAttribs(d,a.settings.forced_root_block_attrs)):d=0})):f.isBlock(b)&&!f.isBlock(e)&&(r(f,b,!1)||r(f,b.firstChild,!0,1)||b.insertBefore(f.create("br"),b.firstChild),r(f,b,!0)||r(f,b.lastChild,!1,1)||b.appendChild(f.create("br")))),c.selector&&c.inline&&!l(c.inline,b)||f.remove(b,1)},t=function(a,b,c,d,e){var f,h,i,m=a.dom;if(!p(m,d,b)&&!q(d,b))return!1;if("all"!==b.remove)for(k(b.styles,function(a,f){a=g.normalizeStyleValue(m,g.replaceVars(a,c),f),"number"==typeof f&&(f=a,e=0),(b.remove_similar||!e||l(g.getStyle(m,e,f),a))&&m.setStyle(d,f,""),i=1}),i&&""===m.getAttrib(d,"style")&&(d.removeAttribute("style"),d.removeAttribute("data-mce-style")),k(b.attributes,function(a,b){var f;if(a=g.replaceVars(a,c),"number"==typeof b&&(b=a,e=0),!e||l(m.getAttrib(e,b),a)){if("class"===b&&(a=m.getAttrib(d,b),a&&(f="",k(a.split(/\s+/),function(a){/mce\-\w+/.test(a)&&(f+=(f?" ":"")+a)}),f)))return void m.setAttrib(d,b,f);"class"===b&&d.removeAttribute("className"),j.test(b)&&d.removeAttribute("data-mce-"+b),d.removeAttribute(b)}}),k(b.classes,function(a){a=g.replaceVars(a,c),e&&!m.hasClass(e,a)||m.removeClass(d,a)}),h=m.getAttribs(d),f=0;f<h.length;f++){var n=h[f].nodeName;if(0!==n.indexOf("_")&&0!==n.indexOf("data-"))return!1}return"none"!==b.remove?(s(a,d,b),!0):void 0},u=function(a,b,c,d,e){var f;return k(g.getParents(a.dom,b.parentNode).reverse(),function(b){var g;f||"_start"===b.id||"_end"===b.id||(g=h.matchNode(a,b,c,d,e),g&&g.split!==!1&&(f=b))}),f},v=function(a,b,c,d,e,f,g,h){var i,j,k,l,m,n,o=a.dom;if(c){for(n=c.parentNode,i=d.parentNode;i&&i!==n;i=i.parentNode){for(j=o.clone(i,!1),m=0;m<b.length;m++)if(t(a,b[m],h,j,j)){j=0;break}j&&(k&&j.appendChild(k),l||(l=j),k=j)}!f||g.mixed&&o.isBlock(c)||(d=o.split(c,d)),k&&(e.parentNode.insertBefore(k,e),l.appendChild(e))}return d},w=function(a,d,j,l,p){var q,r,s=a.formatter.get(d),w=s[0],x=!0,y=a.dom,z=a.selection,A=function(b){var c=u(a,b,d,j,p);return v(a,s,c,b,b,!0,w,j)},B=function(b){var c,d,e,f,g;if(1===b.nodeType&&y.getContentEditable(b)&&(f=x,x="true"===y.getContentEditable(b),g=!0),c=i.grep(b.childNodes),x&&!g)for(d=0,e=s.length;d<e&&!t(a,s[d],j,b,b);d++);if(w.deep&&c.length){for(d=0,e=c.length;d<e;d++)B(c[d]);g&&(x=f)}},C=function(a){var c=y.get(a?"_start":"_end"),d=c[a?"firstChild":"lastChild"];return b.isBookmarkNode(d)&&(d=d[a?"firstChild":"lastChild"]),3===d.nodeType&&0===d.data.length&&(d=a?c.previousSibling||c.nextSibling:c.nextSibling||c.previousSibling),y.remove(c,!0),d},D=function(b){var d,e,h=b.commonAncestorContainer;if(b=f.expandRng(a,b,s,!0),w.split){if(d=n(a,b,!0),e=n(a,b),d!==e){if(/^(TR|TH|TD)$/.test(d.nodeName)&&d.firstChild&&(d="TR"===d.nodeName?d.firstChild.firstChild||d:d.firstChild||d),h&&/^T(HEAD|BODY|FOOT|R)$/.test(h.nodeName)&&m(e)&&e.firstChild&&(e=e.firstChild||e),y.isChildOf(d,e)&&!y.isBlock(e)&&!m(d)&&!m(e))return d=o(y,d,"span",{id:"_start","data-mce-type":"bookmark"}),A(d),void(d=C(!0));d=o(y,d,"span",{id:"_start","data-mce-type":"bookmark"}),e=o(y,e,"span",{id:"_end","data-mce-type":"bookmark"}),A(d),A(e),d=C(!0),e=C()}else d=e=A(d);b.startContainer=d.parentNode?d.parentNode:d,b.startOffset=y.nodeIndex(d),b.endContainer=e.parentNode?e.parentNode:e,b.endOffset=y.nodeIndex(e)+1}new c(y).walk(b,function(b){k(b,function(b){B(b),1===b.nodeType&&"underline"===a.dom.getStyle(b,"text-decoration")&&b.parentNode&&"underline"===g.getTextDecoration(y,b.parentNode)&&t(a,{deep:!1,exact:!0,inline:"span",styles:{textDecoration:"underline"}},null,b)})})};if(l)return void(l.nodeType?(r=y.createRng(),r.setStartBefore(l),r.setEndAfter(l),D(r)):D(l));if("false"!==y.getContentEditable(z.getNode()))z.isCollapsed()&&w.inline&&!y.select("td[data-mce-selected],th[data-mce-selected]").length?e.removeCaretFormat(a,d,j,p):(q=z.getBookmark(),D(z.getRng(!0)),z.moveToBookmark(q),w.inline&&h.match(a,d,j,z.getStart())&&g.moveStart(y,z,z.getRng(!0)),a.nodeChanged());else{l=z.getNode();for(var E=0,F=s.length;E<F&&(!s[E].ceFalseOverride||!t(a,s[E],j,l,l));E++);}};return{removeFormat:t,remove:w}}),g("3e",["1","a","3u","2b","3a","3c","1y","20","1e"],function(a,b,c,d,e,f,g,h,i){var j=i.each,k=function(a){return a&&1===a.nodeType&&!b.isBookmarkNode(a)&&!e.isCaretNode(a)&&!d.isBogus(a)},l=function(a,c){var d;for(d=a;d;d=d[c]){if(3===d.nodeType&&0!==d.nodeValue.length)return a;if(1===d.nodeType&&!b.isBookmarkNode(d))return d}return a},m=function(a,b,d){var e,f,g=new c(a);if(b&&d&&(b=l(b,"previousSibling"),d=l(d,"nextSibling"),g.compare(b,d))){for(e=b.nextSibling;e&&e!==d;)f=e,e=e.nextSibling,b.appendChild(f);return a.remove(d),i.each(i.grep(d.childNodes),function(a){b.appendChild(a)}),b}return d},n=function(a,b,c){j(a.childNodes,function(a){k(a)&&(b(a)&&c(a),a.hasChildNodes()&&n(a,b,c))})},o=function(b,c){return a.curry(function(a,c){return!(!c||!f.getStyle(b,c,a))},c)},p=function(b,c,d){return a.curry(function(a,c,d){b.setStyle(d,a,c),""===d.getAttribute("style")&&d.removeAttribute("style"),q(b,d)},c,d)},q=function(a,b){"SPAN"===b.nodeName&&0===a.getAttribs(b).length&&a.remove(b,!0)},r=function(a,b){var c;1===b.nodeType&&b.parentNode&&1===b.parentNode.nodeType&&(c=f.getTextDecoration(a,b.parentNode),a.getStyle(b,"color")&&c?a.setStyle(b,"text-decoration",c):a.getStyle(b,"text-decoration")===c&&a.setStyle(b,"text-decoration",null))},s=function(b,c,d,e){(c.styles.color||c.styles.textDecoration)&&(i.walk(e,a.curry(r,b),"childNodes"),r(b,e))},t=function(a,b,c,d){b.styles&&b.styles.backgroundColor&&n(d,o(a,"fontSize"),p(a,"backgroundColor",f.replaceVars(b.styles.backgroundColor,c)))},u=function(a,b,c,d){"sub"!==b.inline&&"sup"!==b.inline||(n(d,o(a,"fontSize"),p(a,"fontSize","")),a.remove(a.select("sup"===b.inline?"sub":"sup",d),!0))},v=function(a,b,c,d){d&&b.merge_siblings!==!1&&(d=m(a,f.getNonWhiteSpaceSibling(d),d),d=m(a,d,f.getNonWhiteSpaceSibling(d,!0)))},w=function(a,b,c){if(b.clear_child_styles){var d=b.links?"*:not(a)":"*";j(a.select(d,c),function(c){k(c)&&j(b.styles,function(b,d){a.setStyle(c,d,"")})})}},x=function(a,b,c,d){j(b,function(b){j(a.dom.select(b.inline,d),function(d){k(d)&&h.removeFormat(a,b,c,d,b.exact?d:null)}),w(a.dom,b,d)})},y=function(a,b,c,d,e){g.matchNode(a,e.parentNode,c,d)&&h.removeFormat(a,b,d,e)||b.merge_with_parents&&a.dom.getParent(e.parentNode,function(f){if(g.matchNode(a,f,c,d))return h.removeFormat(a,b,d,e),!0})};return{mergeWithChildren:x,mergeUnderlineAndColor:s,mergeBackgroundColorAndFontSize:t,mergeSubSup:u,mergeSiblings:v,mergeWithParents:y}}),g("1v",["a","2b","39","f","3a","3b","3c","3d","1y","3e","1e"],function(a,b,c,d,e,f,g,h,i,j,k){var l=k.each,m=function(c){return c&&1===c.nodeType&&!a.isBookmarkNode(c)&&!e.isCaretNode(c)&&!b.isBogus(c)},n=function(b,o,p,q){var r,s,t=b.formatter.get(o),u=t[0],v=!q&&b.selection.isCollapsed(),w=b.dom,x=b.selection,y=function(a,b){if(b=b||u,a){if(b.onformat&&b.onformat(a,b,p,q),l(b.styles,function(b,c){w.setStyle(a,c,g.replaceVars(b,p))}),b.styles){var c=w.getAttrib(a,"style");c&&a.setAttribute("data-mce-style",c)}l(b.attributes,function(b,c){w.setAttrib(a,c,g.replaceVars(b,p))}),l(b.classes,function(b){b=g.replaceVars(b,p),w.hasClass(a,b)||w.addClass(a,b)})}},z=function(a,b){var c=!1;return!!u.selector&&(l(a,function(a){if(!("collapsed"in a&&a.collapsed!==v))return w.is(b,a.selector)&&!e.isCaretNode(b)?(y(b,a),c=!0,!1):void 0}),c)},A=function(c,f,h,n){var q,r,s=[],v=!0;q=u.inline||u.block,r=c.create(q),y(r),new d(c).walk(f,function(a){var d,f=function(a){var h,j,m,w;if(w=v,h=a.nodeName.toLowerCase(),j=a.parentNode.nodeName.toLowerCase(),1===a.nodeType&&c.getContentEditable(a)&&(w=v,v="true"===c.getContentEditable(a),m=!0),g.isEq(h,"br"))return d=0,void(u.block&&c.remove(a));if(u.wrapper&&i.matchNode(b,a,o,p))return void(d=0);if(v&&!m&&u.block&&!u.wrapper&&g.isTextBlock(b,h)&&g.isValid(b,j,q))return a=c.rename(a,q),y(a),s.push(a),void(d=0);if(u.selector){var x=z(t,a);if(!u.inline||x)return void(d=0)}!v||m||!g.isValid(b,q,h)||!g.isValid(b,j,q)||!n&&3===a.nodeType&&1===a.nodeValue.length&&65279===a.nodeValue.charCodeAt(0)||e.isCaretNode(a)||u.inline&&c.isBlock(a)?(d=0,l(k.grep(a.childNodes),f),m&&(v=w),d=0):(d||(d=c.clone(r,!1),a.parentNode.insertBefore(d,a),s.push(d)),d.appendChild(a))};l(a,f)}),u.links===!0&&l(s,function(a){var b=function(a){"A"===a.nodeName&&y(a,u),l(k.grep(a.childNodes),b)};b(a)}),l(s,function(d){var e,f=function(b){var c=0;return l(b.childNodes,function(b){g.isWhiteSpaceNode(b)||a.isBookmarkNode(b)||c++}),c},h=function(a){var b=!1;return l(a.childNodes,function(a){if(m(a))return b=a,!1}),b},k=function(b){var d,e;return d=h(b),d&&!a.isBookmarkNode(d)&&i.matchName(c,d,u)&&(e=c.clone(d,!1),y(e),c.replace(e,b,!0),c.remove(d,1)),e||b};return e=f(d),(s.length>1||!c.isBlock(d))&&0===e?void c.remove(d,1):void((u.inline||u.wrapper)&&(u.exact||1!==e||(d=k(d)),j.mergeWithChildren(b,t,p,d),j.mergeWithParents(b,u,o,p,d),j.mergeBackgroundColorAndFontSize(c,u,p,d),j.mergeSubSup(c,u,p,d),j.mergeSiblings(c,u,p,d)))})};if("false"!==w.getContentEditable(x.getNode())){if(u){if(q)q.nodeType?z(t,q)||(s=w.createRng(),s.setStartBefore(q),s.setEndAfter(q),A(w,f.expandRng(b,s,t),null,!0)):A(w,q,null,!0);else if(v&&u.inline&&!w.select("td[data-mce-selected],th[data-mce-selected]").length)e.applyCaretFormat(b,o,p);else{var B=b.selection.getNode();b.settings.forced_root_block||!t[0].defaultBlock||w.getParent(B,w.isBlock)||n(b,t[0].defaultBlock),b.selection.setRng(c.normalize(b.selection.getRng())),r=x.getBookmark(),A(w,f.expandRng(b,x.getRng(!0),t),r),u.styles&&j.mergeUnderlineAndColor(w,u,p,B),x.moveToBookmark(r),g.moveStart(w,x,x.getRng(!0)),b.nodeChanged()}h.postProcess(o,b)}}else{q=x.getNode();for(var C=0,D=t.length;C<D;C++)if(t[C].ceFalseOverride&&w.is(q,t[C].selector))return void y(q,t[C])}};return{applyFormat:n}}),g("1w",["1u","3c","1y","1e"],function(a,b,c,d){var e=d.each,f=function(a,f){var g={};a.set({}),f.on("NodeChange",function(h){var i=b.getParents(f.dom,h.element),j={};i=d.grep(i,function(a){return 1===a.nodeType&&!a.getAttribute("data-mce-bogus")}),e(a.get(),function(a,b){e(i,function(d){return f.formatter.matchNode(d,b,{},a.similar)?(g[b]||(e(a,function(a){a(!0,{node:d,format:b,parents:i})}),g[b]=a),j[b]=a,!1):!c.matchesUnInheritedFormatSelector(f,d,b)&&void 0})}),e(g,function(a,b){j[b]||(delete g[b],e(a,function(a){a(!1,{node:h.element,format:b,parents:i})}))})})},g=function(a,b,c,d){var f=a.get();e(b.split(","),function(a){f[a]||(f[a]=[],f[a].similar=d),f[a].push(c)}),a.set(f)},h=function(a,b,c,d,e){null===b.get()&&f(b,a),g(b,c,d,e)};return{formatChanged:h}}),g("3f",["1e"],function(a){var b=function(b){var c={valigntop:[{selector:"td,th",styles:{verticalAlign:"top"}}],valignmiddle:[{selector:"td,th",styles:{verticalAlign:"middle"}}],valignbottom:[{selector:"td,th",styles:{verticalAlign:"bottom"}}],alignleft:[{selector:"figure.image",collapsed:!1,classes:"align-left",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"left"},inherit:!1,preview:!1,defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"left"},preview:"font-family font-size"}],aligncenter:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"center"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"figure.image",collapsed:!1,classes:"align-center",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"img",collapsed:!1,styles:{display:"block",marginLeft:"auto",marginRight:"auto"},preview:!1},{selector:"table",collapsed:!1,styles:{marginLeft:"auto",marginRight:"auto"},preview:"font-family font-size"}],alignright:[{selector:"figure.image",collapsed:!1,classes:"align-right",ceFalseOverride:!0,preview:"font-family font-size"},{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"right"},inherit:!1,preview:"font-family font-size",defaultBlock:"div"},{selector:"img,table",collapsed:!1,styles:{"float":"right"},preview:"font-family font-size"}],alignjustify:[{selector:"figure,p,h1,h2,h3,h4,h5,h6,td,th,tr,div,ul,ol,li",styles:{textAlign:"justify"},inherit:!1,defaultBlock:"div",preview:"font-family font-size"}],bold:[{inline:"strong",remove:"all"},{inline:"span",styles:{fontWeight:"bold"}},{inline:"b",remove:"all"}],italic:[{inline:"em",remove:"all"},{inline:"span",styles:{fontStyle:"italic"}},{inline:"i",remove:"all"}],underline:[{inline:"span",styles:{textDecoration:"underline"},exact:!0},{inline:"u",remove:"all"}],strikethrough:[{inline:"span",styles:{textDecoration:"line-through"},exact:!0},{inline:"strike",remove:"all"}],forecolor:{inline:"span",styles:{color:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},hilitecolor:{inline:"span",styles:{backgroundColor:"%value"},links:!0,remove_similar:!0,clear_child_styles:!0},fontname:{inline:"span",styles:{fontFamily:"%value"},clear_child_styles:!0},fontsize:{inline:"span",styles:{fontSize:"%value"},clear_child_styles:!0},fontsize_class:{inline:"span",attributes:{"class":"%value"}},blockquote:{block:"blockquote",wrapper:1,remove:"all"},subscript:{inline:"sub"},superscript:{inline:"sup"},code:{inline:"code"},link:{inline:"a",selector:"a",remove:"all",split:!0,deep:!0,onmatch:function(){return!0},onformat:function(c,d,e){a.each(e,function(a,d){b.setAttrib(c,d,a)})}},removeformat:[{selector:"b,strong,em,i,font,u,strike,sub,sup,dfn,code,samp,kbd,var,cite,mark,q,del,ins",remove:"all",split:!0,expand:!1,block_expand:!0,deep:!0},{selector:"span",attributes:["style","class"],remove:"empty",split:!0,expand:!1,deep:!0},{selector:"*",attributes:["style","class"],split:!1,expand:!1,deep:!0}]};return a.each("p h1 h2 h3 h4 h5 h6 div address pre div dt dd samp".split(/\s/),function(a){c[a]={block:a,remove:"all"}}),c};return{get:b}}),g("1x",["3f","1e"],function(a,b){return function(c){var d={},e=function(a){return a?d[a]:d},f=function(a,c){a&&("string"!=typeof a?b.each(a,function(a,b){f(b,a)}):(c=c.length?c:[c],b.each(c,function(a){"undefined"==typeof a.deep&&(a.deep=!a.selector),"undefined"==typeof a.split&&(a.split=!a.selector||a.inline),"undefined"==typeof a.remove&&a.selector&&!a.inline&&(a.remove="none"),a.selector&&a.inline&&(a.mixed=!0,a.block_expand=!0),"string"==typeof a.classes&&(a.classes=a.classes.split(/\s+/))}),d[a]=c))},g=function(a){return a&&d[a]&&delete d[a],d};return f(a.get(c.dom)),f(c.settings.formats),{get:e,register:f,unregister:g}}}),g("1z",["d","1e","w"],function(a,b,c){var d=b.each,e=a.DOM,f=function(a,d){var f,g,h,i=d&&d.schema||new c({}),j=function(a,b){b.classes.length&&e.addClass(a,b.classes.join(" ")),e.setAttribs(a,b.attrs)},k=function(a){var b;return g="string"==typeof a?{name:a,classes:[],attrs:{}}:a,b=e.create(g.name),j(b,g),b},l=function(a,c){var d="string"!=typeof a?a.nodeName.toLowerCase():a,e=i.getElementRule(d),f=e&&e.parentsRequired;return!(!f||!f.length)&&(c&&b.inArray(f,c)!==-1?c:f[0])},m=function(a,c,d){var f,g,h,i=c.length>0&&c[0],j=i&&i.name;if(h=l(a,j))j===h?(g=c[0],c=c.slice(1)):g=h;else if(i)g=c[0],c=c.slice(1);else if(!d)return a;return g&&(f=k(g),f.appendChild(a)),d&&(f||(f=e.create("div"),
f.appendChild(a)),b.each(d,function(b){var c=k(b);f.insertBefore(c,a)})),m(f,c,g&&g.siblings)};return a&&a.length?(g=a[0],f=k(g),h=e.create("div"),h.appendChild(m(f,a.slice(1),g.siblings)),h):""},g=function(a,b){return f(i(a),b)},h=function(a){var c,d={classes:[],attrs:{}};return a=d.selector=b.trim(a),"*"!==a&&(c=a.replace(/(?:([#\.]|::?)([\w\-]+)|(\[)([^\]]+)\]?)/g,function(a,c,e,f,g){switch(c){case"#":d.attrs.id=e;break;case".":d.classes.push(e);break;case":":b.inArray("checked disabled enabled read-only required".split(" "),e)!==-1&&(d.attrs[e]=e)}if("["===f){var h=g.match(/([\w\-]+)(?:\=\"([^\"]+))?/);h&&(d.attrs[h[1]]=h[2])}return""})),d.name=c||"div",d},i=function(a){return a&&"string"==typeof a?(a=a.split(/\s*,\s*/)[0],a=a.replace(/\s*(~\+|~|\+|>)\s*/g,"$1"),b.map(a.split(/(?:>|\s+(?![^\[\]]+\]))/),function(a){var c=b.map(a.split(/(?:~\+|~|\+)/),h),d=c.pop();return c.length&&(d.siblings=c),d}).reverse()):[]},j=function(a,b){var c,g,h,j,k,l,m="";if(l=a.settings.preview_styles,l===!1)return"";"string"!=typeof l&&(l="font-family font-size font-weight font-style text-decoration text-transform color background-color border border-radius outline text-shadow");var n=function(a){return a.replace(/%(\w+)/g,"")};if("string"==typeof b){if(b=a.formatter.get(b),!b)return;b=b[0]}return"preview"in b&&(l=b.preview,l===!1)?"":(c=b.block||b.inline||"span",j=i(b.selector),j.length?(j[0].name||(j[0].name=c),c=b.selector,g=f(j,a)):g=f([c],a),h=e.select(c,g)[0]||g.firstChild,d(b.styles,function(a,b){a=n(a),a&&e.setStyle(h,b,a)}),d(b.attributes,function(a,b){a=n(a),a&&e.setAttrib(h,b,a)}),d(b.classes,function(a){a=n(a),e.hasClass(h,a)||e.addClass(h,a)}),a.fire("PreviewFormats"),e.setStyles(g,{position:"absolute",left:-65535}),a.getBody().appendChild(g),k=e.getStyle(a.getBody(),"fontSize",!0),k=/px$/.test(k)?parseInt(k,10):0,d(l.split(" "),function(b){var c=e.getStyle(h,b,!0);if(!("background-color"===b&&/transparent|rgba\s*\([^)]+,\s*0\)/.test(c)&&(c=e.getStyle(a.getBody(),b,!0),"#ffffff"===e.toHex(c).toLowerCase())||"color"===b&&"#000000"===e.toHex(c).toLowerCase())){if("font-size"===b&&/em|%$/.test(c)){if(0===k)return;c=parseFloat(c,10)/(/%$/.test(c)?100:1),c=c*k+"px"}"border"===b&&c&&(m+="padding:0 2px;"),m+=b+":"+c+";"}}),a.fire("AfterPreviewFormats"),e.remove(g),m)};return{getCssText:j,parseSelector:i,selectorToHtml:g}}),g("21",["1v","1y","20"],function(a,b,c){var d=function(d,e,f,g,h){var i=e.get(f);!b.match(d,f,g,h)||"toggle"in i[0]&&!i[0].toggle?a.applyFormat(d,f,g,h):c.remove(d,f,g,h)};return{toggle:d}}),g("22",[],function(){var a=function(a){a.addShortcut("meta+b","","Bold"),a.addShortcut("meta+i","","Italic"),a.addShortcut("meta+u","","Underline");for(var b=1;b<=6;b++)a.addShortcut("access+"+b,"",["FormatBlock",!1,"h"+b]);a.addShortcut("access+7","",["FormatBlock",!1,"p"]),a.addShortcut("access+8","",["FormatBlock",!1,"div"]),a.addShortcut("access+9","",["FormatBlock",!1,"address"])};return{setup:a}}),g("7",["1u","1","1v","1w","1x","1y","1z","20","21","22"],function(a,b,c,d,e,f,g,h,i,j){return function(k){var l=e(k),m=a(null);return j.setup(k),{get:l.get,register:l.register,unregister:l.unregister,apply:b.curry(c.applyFormat,k),remove:b.curry(h.remove,k),toggle:b.curry(i.toggle,k,l),match:b.curry(f.match,k),matchAll:b.curry(f.matchAll,k),matchNode:b.curry(f.matchNode,k),canApply:b.curry(f.canApply,k),formatChanged:b.curry(d.formatChanged,k,m),getCssText:b.curry(g.getCssText,k)}}}),g("4o",["2t","1i","43","3l","5","34"],function(a,b,c,d,e,f){var g=function(b,c,d){if(!(a.isString(d)||a.isBoolean(d)||a.isNumber(d)))throw f.error("Invalid call to Attr.set. Key ",c,":: Value ",d,":: Element ",b),new e("Attribute value was not simple");b.setAttribute(c,d+"")},h=function(a,b,c){g(a.dom(),b,c)},i=function(a,b){var d=a.dom();c.each(b,function(a,b){g(d,b,a)})},j=function(a,b){var c=a.dom().getAttribute(b);return null===c?void 0:c},k=function(a,b){var c=a.dom();return!(!c||!c.hasAttribute)&&c.hasAttribute(b)},l=function(a,b){a.dom().removeAttribute(b)},m=function(a){var b=a.dom().attributes;return void 0===b||null===b||0===b.length},n=function(a){return b.foldl(a.dom().attributes,function(a,b){return a[b.name]=b.value,a},{})},o=function(a,b,c){k(a,c)&&!k(b,c)&&h(b,c,j(a,c))},p=function(a,c,e){d.isElement(a)&&d.isElement(c)&&b.each(e,function(b){o(a,c,b)})};return{clone:n,set:h,setAll:i,get:j,has:k,remove:l,hasNone:m,transfer:p}}),g("4q",[],function(){var a=function(a){return void 0!==a.style};return{isSupported:a}}),g("3j",["2t","1i","43","23","4o","4p","1t","3l","4q","44","5","34","2"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=function(b,c,d){if(!a.isString(d))throw l.error("Invalid call to CSS.set. Property ",c,":: Value ",d,":: Element ",b),new k("CSS value must be a string: "+d);i.isSupported(b)&&b.style.setProperty(c,d)},o=function(a,b){i.isSupported(a)&&a.style.removeProperty(b)},p=function(a,b,c){var d=a.dom();n(d,b,c)},q=function(a,b){var d=a.dom();c.each(b,function(a,b){n(d,b,a)})},r=function(a,b){var d=a.dom();c.each(b,function(a,b){a.fold(function(){o(d,b)},function(a){n(d,b,a)})})},s=function(a,b){var c=a.dom(),d=m.getComputedStyle(c),e=d.getPropertyValue(b),g=""!==e||f.inBody(a)?e:t(c,b);return null===g?void 0:g},t=function(a,b){return i.isSupported(a)?a.style.getPropertyValue(b):""},u=function(a,b){var c=a.dom(),e=t(c,b);return d.from(e).filter(function(a){return a.length>0})},v=function(a,b,c){var d=g.fromTag(a);p(d,b,c);var e=u(d,b);return e.isSome()},w=function(a,b){var c=a.dom();o(c,b),e.has(a,"style")&&""===j.trim(e.get(a,"style"))&&e.remove(a,"style")},x=function(a,b){var c=e.get(a,"style"),d=b(a),f=void 0===c?e.remove:e.set;return f(a,"style",c),d},y=function(a,b){var c=a.dom(),d=b.dom();i.isSupported(c)&&i.isSupported(d)&&(d.style.cssText=c.style.cssText)},z=function(a){return a.dom().offsetWidth},A=function(a,b,c){u(a,c).each(function(a){u(b,c).isNone()&&p(b,c,a)})},B=function(a,c,d){h.isElement(a)&&h.isElement(c)&&b.each(d,function(b){A(a,c,b)})};return{copy:y,set:p,preserve:x,setAll:q,setOptions:r,remove:w,get:s,getRaw:u,isValidValue:v,reflow:z,transfer:B}}),g("24",["1","23","2f","1t","3j","3k"],function(a,b,c,d,e,f){var g=function(a,b){var c=b.dom();return c[a]},h=function(a,b){return parseInt(e.get(b,a),10)},i=a.curry(g,"clientWidth"),j=a.curry(g,"clientHeight"),k=a.curry(h,"margin-top"),l=a.curry(h,"margin-left"),m=function(a){return a.dom().getBoundingClientRect()},n=function(a,b,c){var d=i(a),e=j(a);return b>=0&&c>=0&&b<=d&&c<=e},o=function(a,b,c,d){var e=m(b),f=a?e.left+b.dom().clientLeft+l(b):0,g=a?e.top+b.dom().clientTop+k(b):0,h=c-f,i=d-g;return{x:h,y:i}},p=function(a,b,c){var e=d.fromDom(a.getBody()),g=a.inline?e:f.documentElement(e),h=o(a.inline,g,b,c);return n(g,h.x,h.y)},q=function(a){return b.from(a).map(d.fromDom)},r=function(a){var b=a.inline?a.getBody():a.getContentAreaContainer();return q(b).map(function(a){return c.contains(f.owner(a),a)}).getOr(!1)};return{isXYInContentArea:p,isEditorAttachedToDom:r}}),g("25",[],function(){return function(){var a=function(){throw new Error("Theme did not provide a NotificationManager implementation.")};return{open:a,close:a,reposition:a,getArgs:a}}}),g("8",["1i","23","24","25","15"],function(a,b,c,d,e){return function(f){var g=[],h=function(){var a=f.theme;return a&&a.getNotificationManagerImpl?a.getNotificationManagerImpl():d()},i=function(){return b.from(g[0])},j=function(a,b){return!(a.type!==b.type||a.text!==b.text||a.progressBar||a.timeout||b.progressBar||b.timeout)},k=function(){g.length>0&&h().reposition(g)},l=function(a){g.push(a)},m=function(b){a.findIndex(g,function(a){return a===b}).each(function(a){g.splice(a,1)})},n=function(b){if(!f.removed&&c.isEditorAttachedToDom(f))return a.find(g,function(a){return j(h().getArgs(a),b)}).getOrThunk(function(){f.editorManager.setActive(f);var a=h().open(b,function(){m(a),k()});return l(a),k(),a})},o=function(){i().each(function(a){h().close(a),m(a),k()})},p=function(){return g},q=function(b){b.on("SkinLoaded",function(){var a=b.settings.service_message;a&&n({text:a,type:"warning",timeout:0,icon:""})}),b.on("ResizeEditor ResizeWindow",function(){e.requestAnimationFrame(k)}),b.on("remove",function(){a.each(g,function(a){h().close(a)})})};return q(f),{open:n,close:o,getNotifications:p}}}),g("4t",["1i","43","2t","4","5","34"],function(a,b,c,d,e,f){var g=function(g){if(!c.isArray(g))throw new e("cases must be an array");if(0===g.length)throw new e("there must be at least one case");var h=[],i={};return a.each(g,function(j,k){var l=b.keys(j);if(1!==l.length)throw new e("one and only one name per case");var m=l[0],n=j[m];if(void 0!==i[m])throw new e("duplicate key detected:"+m);if("cata"===m)throw new e("cannot have a case named cata (sorry)");if(!c.isArray(n))throw new e("case arguments must be an array");h.push(m),i[m]=function(){var c=arguments.length;if(c!==n.length)throw new e("Wrong number of arguments to case "+m+". Expected "+n.length+" ("+n+"), got "+c);for(var i=new d(c),j=0;j<i.length;j++)i[j]=arguments[j];var l=function(c){var d=b.keys(c);if(h.length!==d.length)throw new e("Wrong number of arguments to match. Expected: "+h.join(",")+"\nActual: "+d.join(","));var f=a.forall(h,function(b){return a.contains(d,b)});if(!f)throw new e("Not all branches were specified when using match. Specified: "+d.join(", ")+"\nRequired: "+h.join(", "));return c[m].apply(null,i)};return{fold:function(){if(arguments.length!==g.length)throw new e("Wrong number of arguments to fold. Expected "+g.length+", got "+arguments.length);var a=arguments[k];return a.apply(null,i)},match:l,log:function(a){f.log(a,{constructors:h,constructor:m,params:i})}}}}),i};return{generate:g}}),g("3n",["4t","45"],function(a,b){var c=a.generate([{domRange:["rng"]},{relative:["startSitu","finishSitu"]},{exact:["start","soffset","finish","foffset"]}]),d=b.immutable("start","soffset","finish","foffset"),e=function(a){return c.exact(a.start(),a.soffset(),a.finish(),a.foffset())};return{domRange:c.domRange,relative:c.relative,exact:c.exact,exactFromRange:e,range:d}}),g("4u",["2f","1t","3k"],function(a,b,c){var d=function(a,b,d,e){var f=c.owner(a),g=f.dom().createRange();return g.setStart(a.dom(),b),g.setEnd(d.dom(),e),g},e=function(a,c,e,f){var g=d(a,c,e,f);return b.fromDom(g.commonAncestorContainer)},f=function(b,c,e,f){var g=d(b,c,e,f),h=a.eq(b,e)&&c===f;return g.collapsed&&!h};return{after:f,commonAncestorContainer:e}}),g("4v",["1i","1t","1j"],function(a,b,c){var d=function(d,e){var f=e||c,g=f.createDocumentFragment();return a.each(d,function(a){g.appendChild(a.dom())}),b.fromDom(g)};return{fromElements:d}}),g("4w",["4t"],function(a){var b=a.generate([{before:["element"]},{on:["element","offset"]},{after:["element"]}]),c=function(a,b,c,d){return a.fold(b,c,d)};return{before:b.before,on:b.on,after:b.after,cata:c}}),g("4x",["1","23","2f","1t"],function(a,b,c,d){var e=function(a,b){var c=a.document.createRange();return f(c,b),c},f=function(a,b){a.selectNodeContents(b.dom())},g=function(a,b){return b.compareBoundaryPoints(a.END_TO_START,a)<1&&b.compareBoundaryPoints(a.START_TO_END,a)>-1},h=function(a){return a.document.createRange()},i=function(a,b){b.fold(function(b){a.setStartBefore(b.dom())},function(b,c){a.setStart(b.dom(),c)},function(b){a.setStartAfter(b.dom())})},j=function(a,b){b.fold(function(b){a.setEndBefore(b.dom())},function(b,c){a.setEnd(b.dom(),c)},function(b){a.setEndAfter(b.dom())})},k=function(a,b){o(a),a.insertNode(b.dom())},l=function(a,b,d,e){return c.eq(a,d)&&b===e},m=function(a,b,c){var d=a.document.createRange();return i(d,b),j(d,c),d},n=function(a,b,c,d,e){var f=a.document.createRange();return f.setStart(b.dom(),c),f.setEnd(d.dom(),e),f},o=function(a){a.deleteContents()},p=function(a){var b=a.cloneContents();return d.fromDom(b)},q=function(b){return{left:a.constant(b.left),top:a.constant(b.top),right:a.constant(b.right),bottom:a.constant(b.bottom),width:a.constant(b.width),height:a.constant(b.height)}},r=function(a){var c=a.getClientRects(),d=c.length>0?c[0]:a.getBoundingClientRect();return d.width>0||d.height>0?b.some(d).map(q):b.none()},s=function(a){var c=a.getBoundingClientRect();return c.width>0||c.height>0?b.some(c).map(q):b.none()},t=function(a){return a.toString()};return{create:h,replaceWith:k,selectNodeContents:e,selectNodeContentsUsing:f,isCollapsed:l,relativeToNative:m,exactToNative:n,deleteContents:o,cloneFragment:p,getFirstRect:r,getBounds:s,isWithin:g,toString:t}}),g("4y",["4t","1","23","4m","1t","4x"],function(a,b,c,d,e,f){var g=a.generate([{ltr:["start","soffset","finish","foffset"]},{rtl:["start","soffset","finish","foffset"]}]),h=function(a,b,c){return b(e.fromDom(c.startContainer),c.startOffset,e.fromDom(c.endContainer),c.endOffset)},i=function(a,e){return e.match({domRange:function(a){return{ltr:b.constant(a),rtl:c.none}},relative:function(b,e){return{ltr:d.cached(function(){return f.relativeToNative(a,b,e)}),rtl:d.cached(function(){return c.some(f.relativeToNative(a,e,b))})}},exact:function(b,e,g,h){return{ltr:d.cached(function(){return f.exactToNative(a,b,e,g,h)}),rtl:d.cached(function(){return c.some(f.exactToNative(a,g,h,b,e))})}}})},j=function(a,b){var c=b.ltr();if(c.collapsed){var d=b.rtl().filter(function(a){return a.collapsed===!1});return d.map(function(a){return g.rtl(e.fromDom(a.endContainer),a.endOffset,e.fromDom(a.startContainer),a.startOffset)}).getOrThunk(function(){return h(a,g.ltr,c)})}return h(a,g.ltr,c)},k=function(a,b){var c=i(a,b);return j(a,c)},l=function(a,b){var c=k(a,b);return c.match({ltr:function(b,c,d,e){var f=a.document.createRange();return f.setStart(b.dom(),c),f.setEnd(d.dom(),e),f},rtl:function(b,c,d,e){var f=a.document.createRange();return f.setStart(d.dom(),e),f.setEnd(b.dom(),c),f}})};return{ltr:g.ltr,rtl:g.rtl,diagnose:k,asLtrRange:l}}),g("5b",["23"],function(a){var b=function(a){for(var b=[],c=function(a){b.push(a)},d=0;d<a.length;d++)a[d].each(c);return b},c=function(b,c){for(var d=0;d<b.length;d++){var e=c(b[d],d);if(e.isSome())return e}return a.none()},d=function(b,c){for(var d=[],e=0;e<b.length;e++){var f=b[e];if(!f.isSome())return a.none();d.push(f.getOrDie())}return a.some(c.apply(null,d))};return{cat:b,findMap:c,liftN:d}}),h("5y",Math),g("6d",["5y"],function(a){var b=function(b,c,d,e,f){if(0===f)return 0;if(c===e)return f-1;for(var g=e,h=1;h<f;h++){var i=b(h),j=a.abs(c-i.left);if(d>i.bottom);else{if(d<i.top||j>g)return h-1;g=j}}return 0},c=function(a,b,c){return b>=a.left&&b<=a.right&&c>=a.top&&c<=a.bottom};return{inRect:c,searchForPoint:b}}),g("6e",["23","5b","3m","6d","5y"],function(a,b,c,d,e){var f=function(a,b,e,f,g){var h=function(c){var d=a.dom().createRange();return d.setStart(b.dom(),c),d.collapse(!0),d},i=function(a){var b=h(a);return b.getBoundingClientRect()},j=c.get(b).length,k=d.searchForPoint(i,e,f,g.right,j);return h(k)},g=function(c,e,g,h){var i=c.dom().createRange();i.selectNode(e.dom());var j=i.getClientRects(),k=b.findMap(j,function(b){return d.inRect(b,g,h)?a.some(b):a.none()});return k.map(function(a){return f(c,e,g,h,a)})};return{locate:g}}),g("5w",["23","5b","3l","3k","6d","6e","5y"],function(a,b,c,d,e,f,g){var h=function(c,f,g,h){var j=c.dom().createRange(),k=d.children(f);return b.findMap(k,function(b){return j.selectNode(b.dom()),e.inRect(j.getBoundingClientRect(),g,h)?i(c,b,g,h):a.none()})},i=function(a,b,d,e){var g=c.isText(b)?f.locate:h;return g(a,b,d,e)},j=function(a,b,c,d){var e=a.dom().createRange();e.selectNode(b.dom());var f=e.getBoundingClientRect(),h=g.max(f.left,g.min(f.right,c)),j=g.max(f.top,g.min(f.bottom,d));return i(a,b,h,j)};return{locate:j}}),g("5z",["2t","23"],function(a,b){return function(c,d,e,f,g){return c(e,f)?b.some(e):a.isFunction(g)&&g(e)?b.none():d(e,f,g)}}),g("5c",["2t","1i","1","23","4p","2f","1t","5z"],function(a,b,c,d,e,f,g,h){var i=function(a){return n(e.body(),a)},j=function(b,e,f){for(var h=b.dom(),i=a.isFunction(f)?f:c.constant(!1);h.parentNode;){h=h.parentNode;var j=g.fromDom(h);if(e(j))return d.some(j);if(i(j))break}return d.none()},k=function(a,b,c){var d=function(a){return b(a)};return h(d,j,a,b,c)},l=function(a,b){var c=a.dom();return c.parentNode?m(g.fromDom(c.parentNode),function(c){return!f.eq(a,c)&&b(c)}):d.none()},m=function(a,d){var e=b.find(a.dom().childNodes,c.compose(d,g.fromDom));return e.map(g.fromDom)},n=function(a,b){var c=function(a){for(var e=0;e<a.childNodes.length;e++){if(b(g.fromDom(a.childNodes[e])))return d.some(g.fromDom(a.childNodes[e]));var f=c(a.childNodes[e]);if(f.isSome())return f}return d.none()};return c(a.dom())};return{first:i,ancestor:j,closest:k,sibling:l,child:m,descendant:n}}),g("6u",["1i","3l","3m","3k"],function(a,b,c,d){var e=function(a){return"img"===b.name(a)?1:c.getOption(a).fold(function(){return d.children(a).length},function(a){return a.length})},f=function(a,b){return e(a)===b},g=function(a,b){return 0===b},h="\xa0",i=function(a){return c.getOption(a).filter(function(a){return 0!==a.trim().length||a.indexOf(h)>-1}).isSome()},j=["img","br"],k=function(c){var d=i(c);return d||a.contains(j,b.name(c))};return{getEnd:e,isEnd:f,isStart:g,isCursorPosition:k}}),g("6f",["23","5c","3k","6u"],function(a,b,c,d){var e=function(a){return b.descendant(a,d.isCursorPosition)},f=function(a){return g(a,d.isCursorPosition)},g=function(b,d){var e=function(b){for(var f=c.children(b),g=f.length-1;g>=0;g--){var h=f[g];if(d(h))return a.some(h);var i=e(h);if(i.isSome())return i}return a.none()};return e(b)};return{first:e,last:f}}),g("5x",["23","3k","6f"],function(a,b,c){var d=!0,e=!1,f=function(a,b){return b-a.left<a.right-b?d:e},g=function(a,b,c){var d=a.dom().createRange();return d.selectNode(b.dom()),d.collapse(c),d},h=function(a,b,e){var h=a.dom().createRange();h.selectNode(b.dom());var i=h.getBoundingClientRect(),j=f(i,e),k=j===d?c.first:c.last;return k(b).map(function(b){return g(a,b,j)})},i=function(b,c,d){var e=c.dom().getBoundingClientRect(),h=f(e,d);return a.some(g(b,c,h))},j=function(a,c,d){var e=0===b.children(c).length?i:h;return e(a,c,d)};return{search:j}}),g("4z",["23","1t","3k","3n","5w","5x","1j","5y"],function(a,b,c,d,e,f,g,h){var i=function(b,c,d){return a.from(b.dom().caretPositionFromPoint(c,d)).bind(function(c){if(null===c.offsetNode)return a.none();var d=b.dom().createRange();return d.setStart(c.offsetNode,c.offset),d.collapse(),a.some(d)})},j=function(b,c,d){return a.from(b.dom().caretRangeFromPoint(c,d))},k=function(a,b,c,d){var f=a.dom().createRange();f.selectNode(b.dom());var g=f.getBoundingClientRect(),i=h.max(g.left,h.min(g.right,c)),j=h.max(g.top,h.min(g.bottom,d));return e.locate(a,b,i,j)},l=function(d,e,g){return a.from(d.dom().elementFromPoint(e,g)).map(b.fromDom).bind(function(a){var b=function(){return f.search(d,a,e)};return 0===c.children(a).length?b():k(d,a,e,g).orThunk(b)})},m=g.caretPositionFromPoint?i:g.caretRangeFromPoint?j:l,n=function(a,c,e){var f=b.fromDom(a.document);return m(f,c,e).map(function(a){return d.range(b.fromDom(a.startContainer),a.startOffset,b.fromDom(a.endContainer),a.endOffset)})};return{fromPoint:n}}),g("50",["1i","1t","3l","4i","2d","4x","4y"],function(a,b,c,d,e,f,g){var h=function(b,c,g,h){var i=f.create(b),j=e.is(c,h)?[c]:[],k=j.concat(d.descendants(c,h));return a.filter(k,function(a){return f.selectNodeContentsUsing(i,a),f.isWithin(g,i)})},i=function(a,d,e){var f=g.asLtrRange(a,d),i=b.fromDom(f.commonAncestorContainer);return c.isElement(i)?h(a,i,f,e):[]};return{find:i}}),g("51",["1i","3l","3n","4w"],function(a,b,c,d){var e=function(c,e){var f=b.name(c);return"input"===f?d.after(c):a.contains(["br","img"],f)?0===e?d.before(c):d.after(c):d.on(c,e)},f=function(a,b){var f=a.fold(d.before,e,d.after),g=b.fold(d.before,e,d.after);return c.relative(f,g)};return{beforeSpecial:e,preprocess:f}}),g("3o",["23","4u","1t","4v","3n","4w","4x","4y","4z","50","51"],function(a,b,c,d,e,f,g,h,i,j,k){var l=function(a,b){var c=a.getSelection();c.removeAllRanges(),c.addRange(b)},m=function(a,b,c,d,e){var f=g.exactToNative(a,b,c,d,e);l(a,f)},n=function(a,b,c){return j.find(a,b,c)},o=function(a,b,c,d,e){p(a,f.on(b,c),f.on(d,e))},p=function(a,b,c){var d=k.preprocess(b,c);return h.diagnose(a,d).match({ltr:function(b,c,d,e){m(a,b,c,d,e)},rtl:function(b,c,d,e){var f=a.getSelection();f.extend?(f.collapse(b.dom(),c),f.extend(d.dom(),e)):m(a,d,e,b,c)}})},q=function(b){var d=a.from(b.getRangeAt(0));return d.map(function(a){return e.range(c.fromDom(a.startContainer),a.startOffset,c.fromDom(a.endContainer),a.endOffset)})},r=function(d){var f=c.fromDom(d.anchorNode),g=c.fromDom(d.focusNode);return b.after(f,d.anchorOffset,g,d.focusOffset)?a.some(e.range(c.fromDom(d.anchorNode),d.anchorOffset,c.fromDom(d.focusNode),d.focusOffset)):q(d)},s=function(a,b){var c=g.selectNodeContents(a,b);l(a,c)},t=function(a,b){var d=g.selectNodeContents(a,b);return e.range(c.fromDom(d.startContainer),d.startOffset,c.fromDom(d.endContainer),d.endOffset)},u=function(b){var c=b.getSelection();return c.rangeCount>0?r(c):a.none()},v=function(a){return u(a).map(function(a){return e.exact(a.start(),a.soffset(),a.finish(),a.foffset())})},w=function(a,b){var c=h.asLtrRange(a,b);return g.getFirstRect(c)},x=function(a,b){var c=h.asLtrRange(a,b);return g.getBounds(c)},y=function(a,b,c){return i.fromPoint(a,b,c)},z=function(a,b){var c=h.asLtrRange(a,b);return g.toString(c)},A=function(a){var b=a.getSelection();b.removeAllRanges()},B=function(a,b){var c=h.asLtrRange(a,b);return g.cloneFragment(c)},C=function(a,b,c){var e=h.asLtrRange(a,b),f=d.fromElements(c);g.replaceWith(e,f)},D=function(a,b){var c=h.asLtrRange(a,b);g.deleteContents(c)};return{setExact:o,getExact:u,get:v,setRelative:p,setToElement:s,clear:A,clone:B,replace:C,deleteAt:D,forElement:t,getFirstRect:w,getBounds:x,getAtPoint:y,findWithin:n,getAsString:z}}),g("26",["1","23","2f","1t","3l","3m","3k","3n","3o","1j","3p"],function(a,b,c,d,e,f,g,h,i,j,k){var l=function(a,b){var c=e.isText(b)?f.get(b).length:g.children(b).length+1;return a>c?c:a<0?0:a},m=function(a){return h.range(a.start(),l(a.soffset(),a.start()),a.finish(),l(a.foffset(),a.finish()))},n=function(a,b){return c.contains(a,b)||c.eq(a,b)},o=function(a){return function(b){return n(a,b.start())&&n(a,b.finish())}},p=function(a){var c=a.getSelection(),e=0===c.rangeCount?b.none():b.from(c.getRangeAt(0));return e.map(function(a){return h.range(d.fromDom(a.startContainer),a.startOffset,d.fromDom(a.endContainer),a.endOffset)})},q=function(a){var b=g.defaultView(a);return p(b.dom()).filter(o(a))},r=function(a,c){return b.from(c).filter(o(a)).map(m)},s=function(a){var c=j.createRange();return c.setStart(a.start().dom(),a.soffset()),c.setEnd(a.finish().dom(),a.foffset()),b.some(c)},t=function(a){var b=q(d.fromDom(a.getBody()));a.bookmark=b.isSome()?b:a.bookmark},u=function(c){var e=c.bookmark?c.bookmark:b.none();return e.bind(a.curry(r,d.fromDom(c.getBody()))).bind(s)},v=function(a){u(a).each(function(b){a.selection.setRng(b)})};return{store:t,restore:v,getRng:u,getBookmark:q,validate:r}}),g("27",[],function(){return function(){var a=function(){throw new Error("Theme did not provide a WindowManager implementation.")};return{open:a,alert:a,confirm:a,close:a,getParams:a,setParams:a}}}),g("9",["1i","23","26","27"],function(a,b,c,d){return function(e){var f=[],g=function(){var a=e.theme;return a&&a.getWindowManagerImpl?a.getWindowManagerImpl():d()},h=function(a,b){return function(){return b?b.apply(a,arguments):void 0}},i=function(a){e.fire("OpenWindow",{win:a})},j=function(a){e.fire("CloseWindow",{win:a})},k=function(a){f.push(a),i(a)},l=function(b){a.findIndex(f,function(a){return a===b}).each(function(a){f.splice(a,1),j(b),0===f.length&&e.focus()})},m=function(){return b.from(f[f.length-1])},n=function(a,b){e.editorManager.setActive(e),c.store(e);var d=g().open(a,b,l);return k(d),d},o=function(a,b,c){var d=g().alert(a,h(c?c:this,b),l);k(d)},p=function(a,b,c){var d=g().confirm(a,h(c?c:this,b),l);k(d)},q=function(){m().each(function(a){g().close(a),l(a)})},r=function(){return m().map(g().getParams).getOr(null)},s=function(a){m().each(function(b){g().setParams(b,a)})},t=function(){return f};return e.on("remove",function(){a.each(f.slice(0),function(a){g().close(a)})}),{windows:f,open:n,alert:o,confirm:p,close:q,getParams:r,setParams:s,getWindows:t}}}),g("2e",["1i","37"],function(a,b){var c=function(c,d,e){return!e.collapsed&&a.foldl(e.getClientRects(),function(a,e){return a||b.containsXY(e,c,d)},!1)};return{isXYWithinRange:c}}),g("1g",["p"],function(a){return{BACKSPACE:8,DELETE:46,DOWN:40,ENTER:13,LEFT:37,RIGHT:39,SPACEBAR:32,TAB:9,UP:38,modifierPressed:function(a){return a.shiftKey||a.ctrlKey||a.altKey||this.metaKeyPressed(a)},metaKeyPressed:function(b){return a.mac?b.metaKey:b.ctrlKey&&!b.altKey}}}),g("b",["1","1t","2d","1j","2b","2e","p","15","1e","1g"],function(a,b,c,d,e,f,g,h,i,j){var k=e.isContentEditableFalse,l=e.isContentEditableTrue,m=function(a,b){for(;b&&b!=a;){if(l(b)||k(b))return b;b=b.parentNode}return null},n=function(a){return a&&"IMG"===a.nodeName},o=function(a,b){return n(a.target)&&!f.isXYWithinRange(a.clientX,a.clientY,b)},p=function(a,b){var c=b.target;o(b,a.selection.getRng())&&!b.isDefaultPrevented()&&(b.preventDefault(),a.selection.select(c))};return function(e,f){var l,n,o,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F=f.dom,G=i.each,H=f.getDoc(),I=d,J=g.ie&&g.ie<11,K=Math.abs,L=Math.round,M=f.getBody();q={nw:[0,0,-1,-1],ne:[1,0,1,-1],se:[1,1,1,1],sw:[0,1,-1,1]};var N=".mce-content-body";f.contentStyles.push(N+" div.mce-resizehandle {position: absolute;border: 1px solid black;box-sizing: box-sizing;background: #FFF;width: 7px;height: 7px;z-index: 10000}"+N+" .mce-resizehandle:hover {background: #000}"+N+" img[data-mce-selected],"+N+" hr[data-mce-selected] {outline: 1px solid black;resize: none}"+N+" .mce-clonedresizable {position: absolute;"+(g.gecko?"":"outline: 1px dashed black;")+"opacity: .5;filter: alpha(opacity=50);z-index: 10000}"+N+" .mce-resize-helper {background: #555;background: rgba(0,0,0,0.75);border-radius: 3px;border: 1px;color: white;display: none;font-family: sans-serif;font-size: 12px;white-space: nowrap;line-height: 14px;margin: 5px 10px;padding: 5px;position: absolute;z-index: 10001}");var O=function(a){var d=f.settings.object_resizing;return d!==!1&&!g.iOS&&("string"!=typeof d&&(d="table,img,div"),"false"!==a.getAttribute("data-mce-resize")&&(a!=f.getBody()&&c.is(b.fromDom(a),d)))},P=function(a){var b,c,d,e,g;b=a.screenX-t,c=a.screenY-u,B=b*r[2]+x,C=c*r[3]+y,B=B<5?5:B,C=C<5?5:C,d="IMG"==l.nodeName&&f.settings.resize_img_proportional!==!1?!j.modifierPressed(a):j.modifierPressed(a)||"IMG"==l.nodeName&&r[2]*r[3]!==0,d&&(K(b)>K(c)?(C=L(B*z),B=L(C/z)):(B=L(C/z),C=L(B*z))),F.setStyles(n,{width:B,height:C}),e=r.startPos.x+b,g=r.startPos.y+c,e=e>0?e:0,g=g>0?g:0,F.setStyles(o,{left:e,top:g,display:"block"}),o.innerHTML=B+" &times; "+C,r[2]<0&&n.clientWidth<=B&&F.setStyle(n,"left",v+(x-B)),r[3]<0&&n.clientHeight<=C&&F.setStyle(n,"top",w+(y-C)),b=M.scrollWidth-D,c=M.scrollHeight-E,b+c!==0&&F.setStyles(o,{left:e-b,top:g-c}),A||(f.fire("ObjectResizeStart",{target:l,width:x,height:y}),A=!0)},Q=function(){A=!1;var a=function(a,b){b&&(l.style[a]||!f.schema.isValid(l.nodeName.toLowerCase(),a)?F.setStyle(l,a,b):F.setAttrib(l,a,b))};a("width",B),a("height",C),F.unbind(H,"mousemove",P),F.unbind(H,"mouseup",Q),I!=H&&(F.unbind(I,"mousemove",P),F.unbind(I,"mouseup",Q)),F.remove(n),F.remove(o),J&&"TABLE"!=l.nodeName||R(l),f.fire("ObjectResized",{target:l,width:B,height:C}),F.setAttrib(l,"style",F.getAttrib(l,"style")),f.nodeChanged()},R=function(a,b,c){var d,e,h,i,j;S(),_(),d=F.getPos(a,M),v=d.x,w=d.y,j=a.getBoundingClientRect(),e=j.width||j.right-j.left,h=j.height||j.bottom-j.top,l!=a&&($(),l=a,B=C=0),i=f.fire("ObjectSelected",{target:a}),O(a)&&!i.isDefaultPrevented()?G(q,function(a,d){var f,i=function(b){t=b.screenX,u=b.screenY,x=l.clientWidth,y=l.clientHeight,z=y/x,r=a,a.startPos={x:e*a[0]+v,y:h*a[1]+w},D=M.scrollWidth,E=M.scrollHeight,n=l.cloneNode(!0),F.addClass(n,"mce-clonedresizable"),F.setAttrib(n,"data-mce-bogus","all"),n.contentEditable=!1,n.unSelectabe=!0,F.setStyles(n,{left:v,top:w,margin:0}),n.removeAttribute("data-mce-selected"),M.appendChild(n),F.bind(H,"mousemove",P),F.bind(H,"mouseup",Q),I!=H&&(F.bind(I,"mousemove",P),F.bind(I,"mouseup",Q)),o=F.add(M,"div",{"class":"mce-resize-helper","data-mce-bogus":"all"},x+" &times; "+y)};return b?void(d==b&&i(c)):(f=F.get("mceResizeHandle"+d),f&&F.remove(f),f=F.add(M,"div",{id:"mceResizeHandle"+d,"data-mce-bogus":"all","class":"mce-resizehandle",unselectable:!0,style:"cursor:"+d+"-resize; margin:0; padding:0"}),g.ie&&(f.contentEditable=!1),F.bind(f,"mousedown",function(a){a.stopImmediatePropagation(),a.preventDefault(),i(a)}),a.elm=f,void F.setStyles(f,{left:e*a[0]+v-f.offsetWidth/2,top:h*a[1]+w-f.offsetHeight/2}))}):S(),l.setAttribute("data-mce-selected","1")},S=function(){var a,b;_(),l&&l.removeAttribute("data-mce-selected");for(a in q)b=F.get("mceResizeHandle"+a),b&&(F.unbind(b),F.remove(b))},T=function(a){var b,c,d=function(a,b){if(a)do if(a===b)return!0;while(a=a.parentNode)};if(!A&&!f.removed)return G(F.select("img[data-mce-selected],hr[data-mce-selected]"),function(a){a.removeAttribute("data-mce-selected")}),c="mousedown"==a.type?a.target:e.getNode(),c=F.$(c).closest(J?"table":"table,img,hr")[0],d(c,M)&&(aa(),b=e.getStart(!0),d(b,c)&&d(e.getEnd(!0),c)&&(!J||c!=b&&"IMG"!==b.nodeName))?void R(c):void S()},U=function(a,b,c){a&&a.attachEvent&&a.attachEvent("on"+b,c)},V=function(a,b,c){a&&a.detachEvent&&a.detachEvent("on"+b,c)},W=function(a){var b,c,d,e,g,h,i,j=a.srcElement;b=j.getBoundingClientRect(),h=s.clientX-b.left,i=s.clientY-b.top;for(c in q)if(d=q[c],e=j.offsetWidth*d[0],g=j.offsetHeight*d[1],K(e-h)<8&&K(g-i)<8){r=d;break}A=!0,f.fire("ObjectResizeStart",{target:l,width:l.clientWidth,height:l.clientHeight}),f.getDoc().selection.empty(),R(j,c,s)},X=function(a){a.preventDefault?a.preventDefault():a.returnValue=!1},Y=function(a){return k(m(f.getBody(),a))},Z=function(a){var b=a.srcElement;if(Y(b))return void X(a);if(b!=l){if(f.fire("ObjectSelected",{target:b}),$(),0===b.id.indexOf("mceResizeHandle"))return void(a.returnValue=!1);"IMG"!=b.nodeName&&"TABLE"!=b.nodeName||(S(),l=b,U(b,"resizestart",W))}},$=function(){V(l,"resizestart",W)},_=function(){for(var a in q){var b=q[a];b.elm&&(F.unbind(b.elm),delete b.elm)}},aa=function(){try{f.getDoc().execCommand("enableObjectResizing",!1,!1)}catch(a){}},ba=function(a){var b;if(J){b=H.body.createControlRange();try{return b.addElement(a),b.select(),!0}catch(a){}}};f.on("init",function(){J?(f.on("ObjectResized",function(a){"TABLE"!=a.target.nodeName&&(S(),ba(a.target))}),U(M,"controlselect",Z),f.on("mousedown",function(a){s=a})):(aa(),g.ie>=11&&(f.on("mousedown click",function(a){var b=a.target,c=b.nodeName;A||!/^(TABLE|IMG|HR)$/.test(c)||Y(b)||(2!==a.button&&f.selection.select(b,"TABLE"==c),"mousedown"==a.type&&f.nodeChanged())}),f.dom.bind(M,"mscontrolselect",function(a){var b=function(a){h.setEditorTimeout(f,function(){f.selection.select(a)})};return Y(a.target)?(a.preventDefault(),void b(a.target)):void(/^(TABLE|IMG|HR)$/.test(a.target.nodeName)&&(a.preventDefault(),"IMG"==a.target.tagName&&b(a.target)))})));var b=h.throttle(function(a){f.composing||T(a)});f.on("nodechange ResizeEditor ResizeWindow drop",b),f.on("keyup compositionend",function(a){l&&"TABLE"==l.nodeName&&b(a)}),f.on("hide blur",S),f.on("contextmenu",a.curry(p,f))}),f.on("remove",_);var ca=function(){l=n=null,J&&($(),V(M,"controlselect",Z))};return{isResizable:O,showResizeRect:R,hideResizeRect:S,updateResizeRect:T,controlSelect:ba,destroy:ca}}}),g("52",["5c"],function(a){var b=function(b){return a.first(b).isSome()},c=function(b,c,d){return a.ancestor(b,c,d).isSome()},d=function(b,c,d){return a.closest(b,c,d).isSome()},e=function(b,c){return a.sibling(b,c).isSome()},f=function(b,c){return a.child(b,c).isSome()},g=function(b,c){return a.descendant(b,c).isSome()};return{any:b,ancestor:c,closest:d,sibling:e,child:f,descendant:g}}),g("3q",["1","23","2f","1t","52","3k","1j"],function(a,b,c,d,e,f,g){var h=function(a){a.dom().focus()},i=function(a){a.dom().blur()},j=function(a){
var b=f.owner(a).dom();return a.dom()===b.activeElement},k=function(a){var c=void 0!==a?a.dom():g;return b.from(c.activeElement).map(d.fromDom)},l=function(b){var d=f.owner(b),g=k(d).filter(function(d){return e.closest(d,a.curry(c.eq,b))});g.fold(function(){h(b)},a.noop)},m=function(a){return k(f.owner(a)).filter(function(b){return a.dom().contains(b.dom())})};return{hasFocus:j,focus:h,blur:i,active:k,search:m,focusInside:l}}),g("2g",["23","2f","3q","1t","p","3p","3r","f","26"],function(a,b,c,d,e,f,g,h,i){var j=function(a,b){return a.dom.getParent(b,function(b){return"true"===a.dom.getContentEditable(b)})},k=function(b){return b.collapsed?a.from(h.getNode(b.startContainer,b.startOffset)).map(d.fromDom):a.none()},l=function(c,d){return k(d).bind(function(d){return g.isTableSection(d)?a.some(d):b.contains(c,d)===!1?a.some(c):a.none()})},m=function(a,b){l(d.fromDom(a.getBody()),b).bind(function(a){return f.firstPositionIn(a.dom())}).fold(function(){a.selection.normalize()},function(b){a.selection.setRng(b.toRange())})},n=function(a){if(a.setActive)try{a.setActive()}catch(b){a.focus()}else a.focus()},o=function(a){return c.hasFocus(a)||c.search(a).isSome()},p=function(a){return a.iframeElement&&c.hasFocus(d.fromDom(a.iframeElement))},q=function(a){var b=a.getBody();return b&&o(d.fromDom(b))},r=function(a){return a.inline?q(a):p(a)},s=function(a){var b,c=a.selection,d=a.settings.content_editable,f=a.getBody(),g=c.getRng();return a.quirks.refreshContentEditable(),b=j(a,c.getNode()),a.$.contains(f,b)?(n(b),m(a,g),void t(a)):(void 0!==a.bookmark&&r(a)===!1&&i.getRng(a).each(function(b){a.selection.setRng(b),g=b}),d||(e.opera||n(f),a.getWin().focus()),(e.gecko||d)&&(n(f),m(a,g)),void t(a))},t=function(a){a.editorManager.setActive(a)},u=function(a,b){a.removed||(b?t(a):s(a))};return{focus:u,hasFocus:r}}),g("2h",["2b"],function(a){var b=function(a){for(var b=0,c=0,d=a;d&&d.nodeType;)b+=d.offsetLeft||0,c+=d.offsetTop||0,d=d.offsetParent;return{x:b,y:c}},c=function(a,b,c){var d={elm:b,alignToTop:c};return a.fire("scrollIntoView",d),d.isDefaultPrevented()},d=function(d,e,f){var g,h,i,j,k=d.dom,l=k.getRoot(),m=0;if(!c(d,e,f)&&a.isElement(e)){if(f===!1&&(m=e.offsetHeight),"BODY"!==l.nodeName){var n=d.selection.getScrollContainer();if(n)return g=b(e).y-b(n).y+m,j=n.clientHeight,i=n.scrollTop,void((g<i||g+25>i+j)&&(n.scrollTop=g<i?g:g-j+25))}h=k.getViewPort(d.getWin()),g=k.getPos(e).y+m,i=h.y,j=h.h,(g<h.y||g+25>i+j)&&d.getWin().scrollTo(0,g<i?g:g-j+25)}};return{scrollIntoView:d}}),g("2i",["1i"],function(a){var b=function(b,c){return a.map(c,function(a){var c=b.fire("GetSelectionRange",{range:a});return c.range!==a?c.range:a})};return{processRanges:b}}),g("53",["4o","1t","4f","5u","4g","3k"],function(a,b,c,d,e,f){var g=function(a,c){return b.fromDom(a.dom().cloneNode(c))},h=function(a){return g(a,!1)},i=function(a){return g(a,!0)},j=function(c,d){var e=b.fromTag(d),f=a.clone(c);return a.setAll(e,f),e},k=function(a,b){var c=j(a,b),e=f.children(i(a));return d.append(c,e),c},l=function(a,b){var g=j(a,b);c.before(a,g);var h=f.children(a);return d.append(g,h),e.remove(a),g};return{shallow:h,shallowAs:j,deep:i,copy:k,mutate:l}}),g("54",["5c","2d","5z"],function(a,b,c){var d=function(a){return b.one(a)},e=function(c,d,e){return a.ancestor(c,function(a){return b.is(a,d)},e)},f=function(c,d){return a.sibling(c,function(a){return b.is(a,d)})},g=function(c,d){return a.child(c,function(a){return b.is(a,d)})},h=function(a,c){return b.one(c,a)},i=function(a,d,f){return c(b.is,e,a,d,f)};return{first:d,ancestor:e,sibling:f,child:g,descendant:h,closest:i}}),g("55",["1","2f","3k"],function(a,b,c){var d=function(a){return a.slice(0,-1)},e=function(a,e,f){return b.contains(e,a)?d(c.parents(a,function(a){return f(a)||b.eq(a,e)})):[]},f=function(b,c){return e(b,c,a.constant(!1))},g=function(a,b){return[a].concat(f(a,b))};return{parentsUntil:e,parents:f,parentsAndSelf:g}}),g("56",["1i","1","23","5b","2f","1t","3l","3k","2b"],function(a,b,c,d,e,f,g,h,i){var j=function(a){var b=a.startContainer,d=a.startOffset;return i.isText(b)?0===d?c.some(f.fromDom(b)):c.none():c.from(b.childNodes[d]).map(f.fromDom)},k=function(a){var b=a.endContainer,d=a.endOffset;return i.isText(b)?d===b.data.length?c.some(f.fromDom(b)):c.none():c.from(b.childNodes[d-1]).map(f.fromDom)},l=function(a){return h.firstChild(a).fold(b.constant([a]),function(b){return[a].concat(l(b))})},m=function(a){return h.lastChild(a).fold(b.constant([a]),function(b){return"br"===g.name(b)?h.prevSibling(b).map(function(b){return[a].concat(m(b))}).getOr([]):[a].concat(m(b))})},n=function(c,f){return d.liftN([j(f),k(f)],function(d,f){var g=a.find(l(c),b.curry(e.eq,d)),h=a.find(m(c),b.curry(e.eq,f));return g.isSome()&&h.isSome()}).getOr(!1)};return{hasAllContentsSelected:n}}),g("57",["1i","23","45","2f","4f","5u","53","1t","4o","4i"],function(a,b,c,d,e,f,g,h,i,j){var k=c.immutable("element","width","rows"),l=c.immutable("element","cells"),m=c.immutable("x","y"),n=function(a,b){var c=parseInt(i.get(a,b),10);return isNaN(c)?1:c},o=function(a,b,c,d,e){for(var f=n(e,"rowspan"),h=n(e,"colspan"),i=a.rows(),j=c;j<c+f;j++){i[j]||(i[j]=l(g.deep(d),[]));for(var k=b;k<b+h;k++){var m=i[j].cells();m[k]=j==c&&k==b?e:g.shallow(e)}}},p=function(a,b,c){var d=a.rows(),e=d[c]?d[c].cells():[];return!!e[b]},q=function(a,b,c){for(;p(a,b,c);)b++;return b},r=function(b){return a.foldl(b,function(a,b){return b.cells().length>a?b.cells().length:a},0)},s=function(a,c){for(var e=a.rows(),f=0;f<e.length;f++)for(var g=e[f].cells(),h=0;h<g.length;h++)if(d.eq(g[h],c))return b.some(m(h,f));return b.none()},t=function(a,b,c,d,e){for(var f=[],g=a.rows(),h=c;h<=e;h++){var i=g[h].cells(),j=b<d?i.slice(b,d+1):i.slice(d,b+1);f.push(l(g[h].element(),j))}return f},u=function(a,b,c){var d=b.x(),e=b.y(),f=c.x(),g=c.y(),h=e<g?t(a,d,e,f,g):t(a,d,g,f,e);return k(a.element(),r(h),h)},v=function(a,b){var c=g.shallow(a.element()),d=h.fromTag("tbody");return f.append(d,b),e.append(c,d),c},w=function(b){return a.map(b.rows(),function(b){var c=a.map(b.cells(),function(a){var b=g.deep(a);return i.remove(b,"colspan"),i.remove(b,"rowspan"),b}),d=g.shallow(b.element());return f.append(d,c),d})},x=function(b){var c=k(g.shallow(b),0,[]);return a.each(j.descendants(b,"tr"),function(b,d){a.each(j.descendants(b,"td,th"),function(a,e){o(c,q(c,e,d),d,b,a)})}),k(c.element(),r(c.rows()),c.rows())},y=function(a){return v(a,w(a))},z=function(a,b,c){return s(a,b).bind(function(b){return s(a,c).map(function(c){return u(a,b,c)})})};return{fromDom:x,toDom:y,subsection:z}}),g("2k",["1i","1t","f"],function(a,b,c){var d=function(a){for(var b=[],c=0;c<a.rangeCount;c++)b.push(a.getRangeAt(c));return b},e=function(d){return a.bind(d,function(a){var d=c.getSelectedNode(a);return d?[b.fromDom(d)]:[]})},f=function(a){return d(a).length>1};return{getRanges:d,getSelectedNodes:e,hasMultipleRanges:f}}),g("58",["1i","1t","4i","3r","2k"],function(a,b,c,d,e){var f=function(b){return a.filter(e.getSelectedNodes(b),d.isTableCell)},g=function(a){var b=c.descendants(a,"td[data-mce-selected],th[data-mce-selected]");return b},h=function(a,b){var c=g(b),d=f(a);return c.length>0?c:d},i=function(a){return h(e.getRanges(a.selection.getSel()),b.fromDom(a.getBody()))};return{getCellsFromRanges:f,getCellsFromElement:g,getCellsFromElementOrRanges:h,getCellsFromEditor:i}}),g("3s",["1i","1","2f","4f","53","1t","4v","3l","54","3k","3r","55","56","57","58"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=function(b){return a.find(b,function(a){return"ul"===h.name(a)||"ol"===h.name(a)})},q=function(c,d){return a.find(c,function(a){return"li"===h.name(a)&&m.hasAllContentsSelected(a,d)}).fold(b.constant([]),function(a){return p(c).map(function(a){return[f.fromTag("li"),f.fromTag(h.name(a))]}).getOr([])})},r=function(b,c){var e=a.foldl(c,function(a,b){return d.append(b,a),b},b);return c.length>0?g.fromElements([e]):e},s=function(a){return k.isListItem(a)?j.parent(a).filter(k.isList).fold(b.constant([]),function(b){return[a,b]}):k.isList(a)?[a]:[]},t=function(b,c){var d=f.fromDom(c.commonAncestorContainer),g=l.parentsAndSelf(d,b),h=a.filter(g,function(a){return k.isInline(a)||k.isHeading(a)}),i=q(g,c),j=h.concat(i.length?i:s(d));return a.map(j,e.shallow)},u=function(){return g.fromElements([])},v=function(a,b){return r(f.fromDom(b.cloneContents()),t(a,b))},w=function(a,d){return i.ancestor(d,"table",b.curry(c.eq,a))},x=function(a,b){return w(a,b[0]).bind(function(a){var c=b[0],d=b[b.length-1],e=n.fromDom(a);return n.subsection(e,c,d).map(function(a){return g.fromElements([n.toDom(a)])})}).getOrThunk(u)},y=function(a,b){return b.length>0&&b[0].collapsed?u():v(a,b[0])},z=function(a,b){var c=o.getCellsFromElementOrRanges(b,a);return c.length>0?x(a,c):y(a,b)};return{read:z}}),g("2j",["1t","2i","3s","2k","2c"],function(a,b,c,d,e){var f=function(f,g){var h,i,j,k=f.selection.getRng(),l=f.dom.create("body"),m=f.selection.getSel(),n=b.processRanges(f,d.getRanges(m));return g=g||{},h=i="",g.get=!0,g.format=g.format||"html",g.selection=!0,g=f.fire("BeforeGetContent",g),g.isDefaultPrevented()?(f.fire("GetContent",g),g.content):"text"===g.format?f.selection.isCollapsed()?"":e.trim(k.text||(m.toString?m.toString():"")):(k.cloneContents?(j=g.contextual?c.read(a.fromDom(f.getBody()),n).dom():k.cloneContents(),j&&l.appendChild(j)):void 0!==k.item||void 0!==k.htmlText?(l.innerHTML="<br>"+(k.item?k.item(0).outerHTML:k.htmlText),l.removeChild(l.firstChild)):l.innerHTML=k.toString(),/^\s/.test(l.innerHTML)&&(h=" "),/\s+$/.test(l.innerHTML)&&(i=" "),g.getInner=!0,g.content=f.selection.isCollapsed()?"":h+f.selection.serializer.serialize(l,g)+i,f.fire("GetContent",g),g.content)};return{getContent:f}}),g("2l",[],function(){var a=function(a,b,c){var d,e,f,g=a.selection.getRng(),h=a.getDoc();if(c=c||{format:"html"},c.set=!0,c.selection=!0,c.content=b,!c.no_events&&(c=a.fire("BeforeSetContent",c),c.isDefaultPrevented()))return void a.fire("SetContent",c);if(b=c.content,g.insertNode){b+='<span id="__caret">_</span>',g.startContainer==h&&g.endContainer==h?h.body.innerHTML=b:(g.deleteContents(),0===h.body.childNodes.length?h.body.innerHTML=b:g.createContextualFragment?g.insertNode(g.createContextualFragment(b)):(e=h.createDocumentFragment(),f=h.createElement("div"),e.appendChild(f),f.outerHTML=b,g.insertNode(e))),d=a.dom.get("__caret"),g=h.createRange(),g.setStartBefore(d),g.setEndBefore(d),a.selection.setRng(g),a.dom.remove("__caret");try{a.selection.setRng(g)}catch(a){}}else g.item&&(h.execCommand("Delete",!1,null),g=a.getRng()),/^\s+/.test(b)?(g.pasteHTML('<span id="__mce_tmp">_</span>'+b),a.dom.remove("__mce_tmp")):g.pasteHTML(b);c.no_events||a.fire("SetContent",c)};return{setContent:a}}),g("h",["2f","1t","2g","p","2a","a","b","f","2h","k","2i","2j","2k","26","2l","1e"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=p.each,r=p.trim,s=function(c){return!(!c||!c.ownerDocument)&&a.contains(b.fromDom(c.ownerDocument),b.fromDom(c))},t=function(a){return!!a&&(!!a.select||s(a.startContainer)&&s(a.endContainer))},u=function(a,b,c,d){var e=this;e.dom=a,e.win=b,e.serializer=c,e.editor=d,e.bookmarkManager=new f(e),e.controlSelection=new g(e,d)};return u.prototype={setCursorLocation:function(a,b){var c=this,d=c.dom.createRng();a?(d.setStart(a,b),d.setEnd(a,b),c.setRng(d),c.collapse(!1)):(c._moveEndPoint(d,c.editor.getBody(),!0),c.setRng(d))},getContent:function(a){return l.getContent(this.editor,a)},setContent:function(a,b){o.setContent(this.editor,a,b)},getStart:function(a){var b,c=this,d=c.getRng();return b=d.startContainer,1==b.nodeType&&b.hasChildNodes()&&(a&&d.collapsed||(b=b.childNodes[Math.min(b.childNodes.length-1,d.startOffset)])),b&&3==b.nodeType?b.parentNode:b},getEnd:function(a){var b,c,d=this,e=d.getRng();return b=e.endContainer,c=e.endOffset,1==b.nodeType&&b.hasChildNodes()&&(a&&e.collapsed||(b=b.childNodes[c>0?c-1:c])),b&&3==b.nodeType?b.parentNode:b},getBookmark:function(a,b){return this.bookmarkManager.getBookmark(a,b)},moveToBookmark:function(a){return this.bookmarkManager.moveToBookmark(a)},select:function(a,b){var c,d=this,e=d.dom,f=e.createRng();if(a){if(!b&&d.controlSelection.controlSelect(a))return;c=e.nodeIndex(a),f.setStart(a.parentNode,c),f.setEnd(a.parentNode,c+1),b&&(d._moveEndPoint(f,a,!0),d._moveEndPoint(f,a)),d.setRng(f)}return a},isCollapsed:function(){var a=this,b=a.getRng(),c=a.getSel();return!(!b||b.item)&&(b.compareEndPoints?0===b.compareEndPoints("StartToEnd",b):!c||b.collapsed)},collapse:function(a){var b=this,c=b.getRng();c.collapse(!!a),b.setRng(c)},getSel:function(){var a=this.win;return a.getSelection?a.getSelection():a.document.selection},getRng:function(a){var b,d,e,f,g=this,h=function(a,b,c){try{return b.compareBoundaryPoints(a,c)}catch(a){return-1}};if(!g.win)return null;if(f=g.win.document,"undefined"==typeof f||null===f)return null;if(void 0!==g.editor.bookmark&&c.hasFocus(g.editor)===!1){var i=n.getRng(g.editor);if(i.isSome())return i.getOr(f.createRange())}try{(b=g.getSel())&&(d=b.rangeCount>0?b.getRangeAt(0):b.createRange?b.createRange():f.createRange())}catch(a){}return d=k.processRanges(g.editor,[d])[0],d||(d=f.createRange?f.createRange():f.body.createTextRange()),d.setStart&&9===d.startContainer.nodeType&&d.collapsed&&(e=g.dom.getRoot(),d.setStart(e,0),d.setEnd(e,0)),g.selectedRange&&g.explicitRange&&(0===h(d.START_TO_START,d,g.selectedRange)&&0===h(d.END_TO_END,d,g.selectedRange)?d=g.explicitRange:(g.selectedRange=null,g.explicitRange=null)),d},setRng:function(a,b){var c,e,f,g=this;if(t(a))if(a.select){g.explicitRange=null;try{a.select()}catch(a){}}else{if(c=g.getSel(),f=g.editor.fire("SetSelectionRange",{range:a,forward:b}),a=f.range,c){g.explicitRange=a;try{c.removeAllRanges(),c.addRange(a)}catch(a){}b===!1&&c.extend&&(c.collapse(a.endContainer,a.endOffset),c.extend(a.startContainer,a.startOffset)),g.selectedRange=c.rangeCount>0?c.getRangeAt(0):null}a.collapsed||a.startContainer!==a.endContainer||!c.setBaseAndExtent||d.ie||a.endOffset-a.startOffset<2&&a.startContainer.hasChildNodes()&&(e=a.startContainer.childNodes[a.startOffset],e&&"IMG"===e.tagName&&(c.setBaseAndExtent(a.startContainer,a.startOffset,a.endContainer,a.endOffset),c.anchorNode===a.startContainer&&c.focusNode===a.endContainer||c.setBaseAndExtent(e,0,e,1))),g.editor.fire("AfterSetSelectionRange",{range:a,forward:b})}},setNode:function(a){var b=this;return b.setContent(b.dom.getOuterHTML(a)),a},getNode:function(){var a,b,c,d,e,f=this,g=f.getRng(),h=f.dom.getRoot(),i=function(a,b){for(var c=a;a&&3===a.nodeType&&0===a.length;)a=b?a.nextSibling:a.previousSibling;return a||c};return g?(b=g.startContainer,c=g.endContainer,d=g.startOffset,e=g.endOffset,a=g.commonAncestorContainer,!g.collapsed&&(b==c&&e-d<2&&b.hasChildNodes()&&(a=b.childNodes[d]),3===b.nodeType&&3===c.nodeType&&(b=b.length===d?i(b.nextSibling,!0):b.parentNode,c=0===e?i(c.previousSibling,!1):c.parentNode,b&&b===c))?b:a&&3==a.nodeType?a.parentNode:a):h},getSelectedBlocks:function(a,b){var c,d,e=this,f=e.dom,g=[];if(d=f.getRoot(),a=f.getParent(a||e.getStart(),f.isBlock),b=f.getParent(b||e.getEnd(),f.isBlock),a&&a!=d&&g.push(a),a&&b&&a!=b){c=a;for(var h=new j(a,d);(c=h.next())&&c!=b;)f.isBlock(c)&&g.push(c)}return b&&a!=b&&b!=d&&g.push(b),g},isForward:function(){var a,b,c=this.dom,d=this.getSel();return!(d&&d.anchorNode&&d.focusNode)||(a=c.createRng(),a.setStart(d.anchorNode,d.anchorOffset),a.collapse(!0),b=c.createRng(),b.setStart(d.focusNode,d.focusOffset),b.collapse(!0),a.compareBoundaryPoints(a.START_TO_START,b)<=0)},normalize:function(){var a=this,b=a.getRng();return new h(a.dom).normalize(b)&&!m.hasMultipleRanges(a.getSel())&&a.setRng(b,a.isForward()),b},selectorChanged:function(a,b){var c,d=this;return d.selectorChangedData||(d.selectorChangedData={},c={},d.editor.on("NodeChange",function(a){var b=a.element,e=d.dom,f=e.getParents(b,null,e.getRoot()),g={};q(d.selectorChangedData,function(a,b){q(f,function(d){if(e.is(d,b))return c[b]||(q(a,function(a){a(!0,{node:d,selector:b,parents:f})}),c[b]=a),g[b]=a,!1})}),q(c,function(a,d){g[d]||(delete c[d],q(a,function(a){a(!1,{node:b,selector:d,parents:f})}))})})),d.selectorChangedData[a]||(d.selectorChangedData[a]=[]),d.selectorChangedData[a].push(b),d},getScrollContainer:function(){for(var a,b=this.dom.getRoot();b&&"BODY"!=b.nodeName;){if(b.scrollHeight>b.clientHeight){a=b;break}b=b.parentNode}return a},scrollIntoView:function(a,b){i.scrollIntoView(this.editor,a,b)},placeCaretAt:function(a,b){this.setRng(h.getCaretRangeFromPoint(a,b,this.editor.getDoc()))},_moveEndPoint:function(a,b,c){var e=b,f=new j(b,e),g=this.dom.schema.getNonEmptyElements();do{if(3==b.nodeType&&0!==r(b.nodeValue).length)return void(c?a.setStart(b,0):a.setEnd(b,b.nodeValue.length));if(g[b.nodeName]&&!/^(TD|TH)$/.test(b.nodeName))return void(c?a.setStartBefore(b):"BR"==b.nodeName?a.setEndBefore(b):a.setEndAfter(b));if(d.ie&&d.ie<11&&this.dom.isBlock(b)&&this.dom.isEmpty(b))return void(c?a.setStart(b,0):a.setEnd(b,0))}while(b=c?f.next():f.prev());"BODY"==e.nodeName&&(c?a.setStart(e,0):a.setEnd(e,e.childNodes.length))},getBoundingClientRect:function(){var a=this.getRng();return a.collapsed?e.fromRangeStart(a).getClientRects()[0]:a.getBoundingClientRect()},destroy:function(){this.win=null,this.controlSelection.destroy()}},u}),g("u",[],function(){var a=/^[ \t\r\n]*$/,b={"#text":3,"#comment":8,"#cdata":4,"#pi":7,"#doctype":10,"#document-fragment":11},c=function(a,b,c){var d,e,f=c?"lastChild":"firstChild",g=c?"prev":"next";if(a[f])return a[f];if(a!==b){if(d=a[g])return d;for(e=a.parent;e&&e!==b;e=e.parent)if(d=e[g])return d}},d=function(a,b){this.name=a,this.type=b,1===b&&(this.attributes=[],this.attributes.map={})};return d.prototype={replace:function(a){var b=this;return a.parent&&a.remove(),b.insert(a,b),b.remove(),b},attr:function(a,b){var c,d,e,f=this;if("string"!=typeof a){for(d in a)f.attr(d,a[d]);return f}if(c=f.attributes){if(b!==e){if(null===b){if(a in c.map)for(delete c.map[a],d=c.length;d--;)if(c[d].name===a)return c=c.splice(d,1),f;return f}if(a in c.map){for(d=c.length;d--;)if(c[d].name===a){c[d].value=b;break}}else c.push({name:a,value:b});return c.map[a]=b,f}return c.map[a]}},clone:function(){var a,b,c,e,f,g=this,h=new d(g.name,g.type);if(c=g.attributes){for(f=[],f.map={},a=0,b=c.length;a<b;a++)e=c[a],"id"!==e.name&&(f[f.length]={name:e.name,value:e.value},f.map[e.name]=e.value);h.attributes=f}return h.value=g.value,h.shortEnded=g.shortEnded,h},wrap:function(a){var b=this;return b.parent.insert(a,b),a.append(b),b},unwrap:function(){var a,b,c=this;for(a=c.firstChild;a;)b=a.next,c.insert(a,c,!0),a=b;c.remove()},remove:function(){var a=this,b=a.parent,c=a.next,d=a.prev;return b&&(b.firstChild===a?(b.firstChild=c,c&&(c.prev=null)):d.next=c,b.lastChild===a?(b.lastChild=d,d&&(d.next=null)):c.prev=d,a.parent=a.next=a.prev=null),a},append:function(a){var b,c=this;return a.parent&&a.remove(),b=c.lastChild,b?(b.next=a,a.prev=b,c.lastChild=a):c.lastChild=c.firstChild=a,a.parent=c,a},insert:function(a,b,c){var d;return a.parent&&a.remove(),d=b.parent||this,c?(b===d.firstChild?d.firstChild=a:b.prev.next=a,a.prev=b.prev,a.next=b,b.prev=a):(b===d.lastChild?d.lastChild=a:b.next.prev=a,a.next=b.next,a.prev=b,b.next=a),a.parent=d,a},getAll:function(a){var b,d=this,e=[];for(b=d.firstChild;b;b=c(b,d))b.name===a&&e.push(b);return e},empty:function(){var a,b,d,e=this;if(e.firstChild){for(a=[],d=e.firstChild;d;d=c(d,e))a.push(d);for(b=a.length;b--;)d=a[b],d.parent=d.firstChild=d.lastChild=d.next=d.prev=null}return e.firstChild=e.lastChild=null,e},isEmpty:function(b,d,e){var f,g,h=this,i=h.firstChild;if(d=d||{},i)do{if(1===i.type){if(i.attributes.map["data-mce-bogus"])continue;if(b[i.name])return!1;for(f=i.attributes.length;f--;)if(g=i.attributes[f].name,"name"===g||0===g.indexOf("data-mce-bookmark"))return!1}if(8===i.type)return!1;if(3===i.type&&!a.test(i.value))return!1;if(3===i.type&&i.parent&&d[i.parent.name]&&a.test(i.value))return!1;if(e&&e(i))return!1}while(i=c(i,h));return!0},walk:function(a){return c(this,null,a)}},d.create=function(a,c){var e,f;if(e=new d(a,b[a]||1),c)for(f in c)e.attr(f,c[f]);return e},d}),g("v",["w","t","1e"],function(a,b,c){var d=c.each,e=function(a){return 0===a.indexOf("data-")||0===a.indexOf("aria-")},f=function(a){return a.replace(/<!--|-->/g,"")},g=function(a,b,c){var d,e,f,g,h=1;for(g=a.getShortEndedElements(),f=/<([!?\/])?([A-Za-z0-9\-_\:\.]+)((?:\s+[^"\'>]+(?:(?:"[^"]*")|(?:\'[^\']*\')|[^>]*))*|\/|\s+)>/g,f.lastIndex=d=c;e=f.exec(b);){if(d=f.lastIndex,"/"===e[1])h--;else if(!e[1]){if(e[2]in g)continue;h++}if(0===h)break}return d},h=function(h,i){var j=this,k=function(){};h=h||{},j.schema=i=i||new a,h.fix_self_closing!==!1&&(h.fix_self_closing=!0),d("comment cdata text start end pi doctype".split(" "),function(a){a&&(j[a]=h[a]||k)}),j.parse=function(a){var d,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M=this,N=0,O=[],P=0,Q=b.decode,R=c.makeMap("src,href,data,background,formaction,poster"),S=/((java|vb)script|mhtml):/i,T=/^data:/i,U=function(a){var b,c;for(b=O.length;b--&&O[b].name!==a;);if(b>=0){for(c=O.length-1;c>=b;c--)a=O[c],a.valid&&M.end(a.name);O.length=b}},V=function(a,b,c,d,f){var g,i,j=/[\s\u0000-\u001F]+/g;if(b=b.toLowerCase(),c=b in s?b:Q(c||d||f||""),u&&!p&&e(b)===!1){if(g=z[b],!g&&A){for(i=A.length;i--&&(g=A[i],!g.pattern.test(b)););i===-1&&(g=null)}if(!g)return;if(g.validValues&&!(c in g.validValues))return}if(R[b]&&!h.allow_script_urls){var k=c.replace(j,"");try{k=decodeURIComponent(k)}catch(a){k=unescape(k)}if(S.test(k))return;if(!h.allow_html_data_urls&&T.test(k)&&!/^data:image\//i.test(k))return}p&&(b in R||0===b.indexOf("on"))||(l.map[b]=c,l.push({name:b,value:c}))};for(H=new RegExp("<(?:(?:!--([\\w\\W]*?)-->)|(?:!\\[CDATA\\[([\\w\\W]*?)\\]\\]>)|(?:!DOCTYPE([\\w\\W]*?)>)|(?:\\?([^\\s\\/<>]+) ?([\\w\\W]*?)[?/]>)|(?:\\/([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)>)|(?:([A-Za-z][A-Za-z0-9\\-_\\:\\.]*)((?:\\s+[^\"'>]+(?:(?:\"[^\"]*\")|(?:'[^']*')|[^>]*))*|\\/|\\s+)>))","g"),I=/([\w:\-]+)(?:\s*=\s*(?:(?:\"((?:[^\"])*)\")|(?:\'((?:[^\'])*)\')|([^>\s]+)))?/g,r=i.getShortEndedElements(),G=h.self_closing_elements||i.getSelfClosingElements(),s=i.getBoolAttrs(),u=h.validate,q=h.remove_internals,L=h.fix_self_closing,J=i.getSpecialElements(),E=a+">";d=H.exec(E);){if(N<d.index&&M.text(Q(a.substr(N,d.index-N))),j=d[6])j=j.toLowerCase(),":"===j.charAt(0)&&(j=j.substr(1)),U(j);else if(j=d[7]){if(d.index+d[0].length>a.length){M.text(Q(a.substr(d.index))),N=d.index+d[0].length;continue}if(j=j.toLowerCase(),":"===j.charAt(0)&&(j=j.substr(1)),t=j in r,L&&G[j]&&O.length>0&&O[O.length-1].name===j&&U(j),!u||(v=i.getElementRule(j))){if(w=!0,u&&(z=v.attributes,A=v.attributePatterns),(y=d[8])?(p=y.indexOf("data-mce-type")!==-1,p&&q&&(w=!1),l=[],l.map={},y.replace(I,V)):(l=[],l.map={}),u&&!p){if(B=v.attributesRequired,C=v.attributesDefault,D=v.attributesForced,F=v.removeEmptyAttrs,F&&!l.length&&(w=!1),D)for(m=D.length;m--;)x=D[m],o=x.name,K=x.value,"{$uid}"===K&&(K="mce_"+P++),l.map[o]=K,l.push({name:o,value:K});if(C)for(m=C.length;m--;)x=C[m],o=x.name,o in l.map||(K=x.value,"{$uid}"===K&&(K="mce_"+P++),l.map[o]=K,l.push({name:o,value:K}));if(B){for(m=B.length;m--&&!(B[m]in l.map););m===-1&&(w=!1)}if(x=l.map["data-mce-bogus"]){if("all"===x){N=g(i,a,H.lastIndex),H.lastIndex=N;continue}w=!1}}w&&M.start(j,l,t)}else w=!1;if(k=J[j]){k.lastIndex=N=d.index+d[0].length,(d=k.exec(a))?(w&&(n=a.substr(N,d.index-N)),N=d.index+d[0].length):(n=a.substr(N),N=a.length),w&&(n.length>0&&M.text(n,!0),M.end(j)),H.lastIndex=N;continue}t||(y&&y.indexOf("/")==y.length-1?w&&M.end(j):O.push({name:j,valid:w}))}else(j=d[1])?(">"===j.charAt(0)&&(j=" "+j),h.allow_conditional_comments||"[if"!==j.substr(0,3).toLowerCase()||(j=" "+j),M.comment(j)):(j=d[2])?M.cdata(f(j)):(j=d[3])?M.doctype(j):(j=d[4])&&M.pi(j,d[5]);N=d.index+d[0].length}for(N<a.length&&M.text(Q(a.substr(N))),m=O.length-1;m>=0;m--)j=O[m],j.valid&&M.end(j.name)}};return h.findEndTag=g,h}),g("s",["u","w","v","1e"],function(a,b,c,d){var e=d.makeMap,f=d.each,g=d.explode,h=d.extend,i=function(b,c){b.padd_empty_with_br?c.empty().append(new a("br","1")).shortEnded=!0:c.empty().append(new a("#text","3")).value="\xa0"},j=function(a,b){return a&&a.firstChild===a.lastChild&&a.firstChild.name===b},k=function(a,b){var c=a.getElementRule(b.name);return c&&c.paddEmpty},l=function(a,b,c,d){return d.isEmpty(b,c,function(b){return k(a,b)})};return function(k,m){var n=this,o={},p=[],q={},r={};k=k||{},k.validate=!("validate"in k)||k.validate,k.root_name=k.root_name||"body",n.schema=m=m||new b;var s=function(b){var c,d,f,g,h,i,k,o,p,q,r,s,t,u,v,w;for(s=e("tr,td,th,tbody,thead,tfoot,table"),q=m.getNonEmptyElements(),r=m.getWhiteSpaceElements(),t=m.getTextBlockElements(),u=m.getSpecialElements(),c=0;c<b.length;c++)if(d=b[c],d.parent&&!d.fixed)if(t[d.name]&&"li"==d.parent.name){for(v=d.next;v&&t[v.name];)v.name="li",v.fixed=!0,d.parent.insert(v,d.parent),v=v.next;d.unwrap(d)}else{for(g=[d],f=d.parent;f&&!m.isValidChild(f.name,d.name)&&!s[f.name];f=f.parent)g.push(f);if(f&&g.length>1){for(g.reverse(),h=i=n.filterNode(g[0].clone()),p=0;p<g.length-1;p++){for(m.isValidChild(i.name,g[p].name)?(k=n.filterNode(g[p].clone()),i.append(k)):k=i,o=g[p].firstChild;o&&o!=g[p+1];)w=o.next,k.append(o),o=w;i=k}l(m,q,r,h)?f.insert(d,g[0],!0):(f.insert(h,g[0],!0),f.insert(d,h)),f=g[0],(l(m,q,r,f)||j(f,"br"))&&f.empty().remove()}else if(d.parent){if("li"===d.name){if(v=d.prev,v&&("ul"===v.name||"ul"===v.name)){v.append(d);continue}if(v=d.next,v&&("ul"===v.name||"ul"===v.name)){v.insert(d,v.firstChild,!0);continue}d.wrap(n.filterNode(new a("ul",1)));continue}m.isValidChild(d.parent.name,"div")&&m.isValidChild("div",d.name)?d.wrap(n.filterNode(new a("div",1))):u[d.name]?d.empty().remove():d.unwrap()}}};n.filterNode=function(a){var b,c,d;c in o&&(d=q[c],d?d.push(a):q[c]=[a]),b=p.length;for(;b--;)c=p[b].name,c in a.attributes.map&&(d=r[c],d?d.push(a):r[c]=[a]);return a},n.addNodeFilter=function(a,b){f(g(a),function(a){var c=o[a];c||(o[a]=c=[]),c.push(b)})},n.addAttributeFilter=function(a,b){f(g(a),function(a){var c;for(c=0;c<p.length;c++)if(p[c].name===a)return void p[c].callbacks.push(b);p.push({name:a,callbacks:[b]})})},n.parse=function(b,d){var f,g,j,n,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K=[];d=d||{},q={},r={},A=h(e("script,style,head,html,body,title,meta,param"),m.getBlockElements()),I=m.getNonEmptyElements(),H=m.children,z=k.validate,J="forced_root_block"in d?d.forced_root_block:k.forced_root_block,G=m.getWhiteSpaceElements(),B=/^[ \t\r\n]+/,D=/[ \t\r\n]+$/,E=/[ \t\r\n]+/g,F=/^[ \t\r\n]+$/;var L=function(){var a,b,c=g.firstChild,d=function(a){a&&(c=a.firstChild,c&&3==c.type&&(c.value=c.value.replace(B,"")),c=a.lastChild,c&&3==c.type&&(c.value=c.value.replace(D,"")))};if(m.isValidChild(g.name,J.toLowerCase())){for(;c;)a=c.next,3==c.type||1==c.type&&"p"!==c.name&&!A[c.name]&&!c.attr("data-mce-type")?b?b.append(c):(b=M(J,1),b.attr(k.forced_root_block_attrs),g.insert(b,c),b.append(c)):(d(b),b=null),c=a;d(b)}},M=function(b,c){var d,e=new a(b,c);return b in o&&(d=q[b],d?d.push(e):q[b]=[e]),e},N=function(a){var b,c,d,e,f=m.getBlockElements();for(b=a.prev;b&&3===b.type;){if(d=b.value.replace(D,""),d.length>0)return void(b.value=d);if(c=b.next){if(3==c.type&&c.value.length){b=b.prev;continue}if(!f[c.name]&&"script"!=c.name&&"style"!=c.name){b=b.prev;continue}}e=b.prev,b.remove(),b=e}},O=function(a){var b,c={};for(b in a)"li"!==b&&"p"!=b&&(c[b]=a[b]);return c};if(f=new c({validate:z,allow_script_urls:k.allow_script_urls,allow_conditional_comments:k.allow_conditional_comments,self_closing_elements:O(m.getSelfClosingElements()),cdata:function(a){j.append(M("#cdata",4)).value=a},text:function(a,b){var c;C||(a=a.replace(E," "),j.lastChild&&A[j.lastChild.name]&&(a=a.replace(B,""))),0!==a.length&&(c=M("#text",3),c.raw=!!b,j.append(c).value=a)},comment:function(a){j.append(M("#comment",8)).value=a},pi:function(a,b){j.append(M(a,7)).value=b,N(j)},doctype:function(a){var b;b=j.append(M("#doctype",10)),b.value=a,N(j)},start:function(a,b,c){var d,e,f,g,h;if(f=z?m.getElementRule(a):{}){for(d=M(f.outputName||a,1),d.attributes=b,d.shortEnded=c,j.append(d),h=H[j.name],h&&H[d.name]&&!h[d.name]&&K.push(d),e=p.length;e--;)g=p[e].name,g in b.map&&(x=r[g],x?x.push(d):r[g]=[d]);A[a]&&N(d),c||(j=d),!C&&G[a]&&(C=!0)}},end:function(a){var b,c,d,e,f;if(c=z?m.getElementRule(a):{}){if(A[a]&&!C){if(b=j.firstChild,b&&3===b.type)if(d=b.value.replace(B,""),d.length>0)b.value=d,b=b.next;else for(e=b.next,b.remove(),b=e;b&&3===b.type;)d=b.value,e=b.next,(0===d.length||F.test(d))&&(b.remove(),b=e),b=e;if(b=j.lastChild,b&&3===b.type)if(d=b.value.replace(D,""),d.length>0)b.value=d,b=b.prev;else for(e=b.prev,b.remove(),b=e;b&&3===b.type;)d=b.value,e=b.prev,(0===d.length||F.test(d))&&(b.remove(),b=e),b=e}if(C&&G[a]&&(C=!1),(c.removeEmpty||c.paddEmpty)&&l(m,I,G,j))if(c.paddEmpty)i(k,j);else if(!j.attributes.map.name&&!j.attributes.map.id)return f=j.parent,A[j.name]?j.empty().remove():j.unwrap(),void(j=f);j=j.parent}}},m),g=j=new a(d.context||k.root_name,11),f.parse(b),z&&K.length&&(d.context?d.invalid=!0:s(K)),J&&("body"==g.name||d.isRootContent)&&L(),!d.invalid){for(y in q){for(x=o[y],n=q[y],v=n.length;v--;)n[v].parent||n.splice(v,1);for(t=0,u=x.length;t<u;t++)x[t](n,y,d)}for(t=0,u=p.length;t<u;t++)if(x=p[t],x.name in r){for(n=r[x.name],v=n.length;v--;)n[v].parent||n.splice(v,1);for(v=0,w=x.callbacks.length;v<w;v++)x.callbacks[v](n,x.name,d)}}return g},k.remove_trailing_brs&&n.addNodeFilter("br",function(b){var c,d,e,f,g,j,n,o,p=b.length,q=h({},m.getBlockElements()),r=m.getNonEmptyElements(),s=m.getNonEmptyElements();for(q.body=1,c=0;c<p;c++)if(d=b[c],e=d.parent,q[d.parent.name]&&d===e.lastChild){for(g=d.prev;g;){if(j=g.name,"span"!==j||"bookmark"!==g.attr("data-mce-type")){if("br"!==j)break;if("br"===j){d=null;break}}g=g.prev}d&&(d.remove(),l(m,r,s,e)&&(n=m.getElementRule(e.name),n&&(n.removeEmpty?e.remove():n.paddEmpty&&i(k,e))))}else{for(f=d;e&&e.firstChild===f&&e.lastChild===f&&(f=e,!q[e.name]);)e=e.parent;f===e&&k.padd_empty_with_br!==!0&&(o=new a("#text",3),o.value="\xa0",d.replace(o))}}),n.addAttributeFilter("href",function(a){var b,c=a.length,e=function(a){var b=a.split(" ").filter(function(a){return a.length>0});return b.concat(["noopener"]).sort().join(" ")},f=function(a){var b=a?d.trim(a):"";return/\b(noopener)\b/g.test(b)?b:e(b)};if(!k.allow_unsafe_link_target)for(;c--;)b=a[c],"a"===b.name&&"_blank"===b.attr("target")&&b.attr("rel",f(b.attr("rel")))}),k.allow_html_in_named_anchor||n.addAttributeFilter("id,name",function(a){for(var b,c,d,e,f=a.length;f--;)if(e=a[f],"a"===e.name&&e.firstChild&&!e.attr("href")){d=e.parent,b=e.lastChild;do c=b.prev,d.insert(b,e),b=c;while(b)}}),k.fix_list_elements&&n.addNodeFilter("ul,ol",function(b){for(var c,d,e=b.length;e--;)if(c=b[e],d=c.parent,"ul"===d.name||"ol"===d.name)if(c.prev&&"li"===c.prev.name)c.prev.append(c);else{var f=new a("li",1);f.attr("style","list-style-type: none"),c.wrap(f)}}),k.validate&&m.getValidClasses()&&n.addAttributeFilter("class",function(a){for(var b,c,d,e,f,g,h,i=a.length,j=m.getValidClasses();i--;){for(b=a[i],c=b.attr("class").split(" "),f="",d=0;d<c.length;d++)e=c[d],h=!1,g=j["*"],g&&g[e]&&(h=!0),g=j[b.name],!h&&g&&g[e]&&(h=!0),h&&(f&&(f+=" "),f+=e);f.length||(f=null),b.attr("class",f)}})}}),g("z",["t","1e"],function(a,b){var c=b.makeMap;return function(b){var d,e,f,g,h,i=[];return b=b||{},d=b.indent,e=c(b.indent_before||""),f=c(b.indent_after||""),g=a.getEncodeFunc(b.entity_encoding||"raw",b.entities),h="html"==b.element_format,{start:function(a,b,c){var j,k,l,m;if(d&&e[a]&&i.length>0&&(m=i[i.length-1],m.length>0&&"\n"!==m&&i.push("\n")),i.push("<",a),b)for(j=0,k=b.length;j<k;j++)l=b[j],i.push(" ",l.name,'="',g(l.value,!0),'"');!c||h?i[i.length]=">":i[i.length]=" />",c&&d&&f[a]&&i.length>0&&(m=i[i.length-1],m.length>0&&"\n"!==m&&i.push("\n"))},end:function(a){var b;i.push("</",a,">"),d&&f[a]&&i.length>0&&(b=i[i.length-1],b.length>0&&"\n"!==b&&i.push("\n"))},text:function(a,b){a.length>0&&(i[i.length]=b?a:g(a))},cdata:function(a){i.push("<![CDATA[",a,"]]>")},comment:function(a){i.push("<!--",a,"-->");
},pi:function(a,b){b?i.push("<?",a," ",g(b),"?>"):i.push("<?",a,"?>"),d&&i.push("\n")},doctype:function(a){i.push("<!DOCTYPE",a,">",d?"\n":"")},reset:function(){i.length=0},getContent:function(){return i.join("").replace(/\n$/,"")}}}}),g("x",["z","w"],function(a,b){return function(c,d){var e=this,f=new a(c);c=c||{},c.validate=!("validate"in c)||c.validate,e.schema=d=d||new b,e.writer=f,e.serialize=function(a){var b,e;e=c.validate,b={3:function(a){f.text(a.value,a.raw)},8:function(a){f.comment(a.value)},7:function(a){f.pi(a.name,a.value)},10:function(a){f.doctype(a.value)},4:function(a){f.cdata(a.value)},11:function(a){if(a=a.firstChild)do g(a);while(a=a.next)}},f.reset();var g=function(a){var c,h,i,j,k,l,m,n,o,p=b[a.type];if(p)p(a);else{if(c=a.name,h=a.shortEnded,i=a.attributes,e&&i&&i.length>1&&(l=[],l.map={},o=d.getElementRule(a.name))){for(m=0,n=o.attributesOrder.length;m<n;m++)j=o.attributesOrder[m],j in i.map&&(k=i.map[j],l.map[j]=k,l.push({name:j,value:k}));for(m=0,n=i.length;m<n;m++)j=i[m].name,j in l.map||(k=i.map[j],l.map[j]=k,l.push({name:j,value:k}));i=l}if(f.start(a.name,i,h),!h){if(a=a.firstChild)do g(a);while(a=a.next);f.end(c)}}};return 1!=a.type||c.inner?b[11](a):g(a),f.getContent()}}}),g("i",["1j","d","p","s","t","u","v","w","x","2c","1e"],function(a,b,c,d,e,f,g,h,i,j,k){var l=k.each,m=k.trim,n=b.DOM,o=function(a){var b,c,d=function(a){return a&&"br"===a.name};b=a.lastChild,d(b)&&(c=b.prev,d(c)&&(b.remove(),c.remove()))};return function(b,f){var p,q,r,s=["data-mce-selected"];f&&(p=f.dom,q=f.schema);var t=function(a){var b=new RegExp(["<span[^>]+data-mce-bogus[^>]+>[\u200b\ufeff]+<\\/span>","\\s?("+s.join("|")+')="[^"]+"'].join("|"),"gi");return a=j.trim(a.replace(b,""))},u=function(a){var b,c,d,e,h,i=a,j=/<(\w+) [^>]*data-mce-bogus="all"[^>]*>/g,k=f.schema;for(i=t(i),h=k.getShortEndedElements();e=j.exec(i);)c=j.lastIndex,d=e[0].length,b=h[e[1]]?c:g.findEndTag(k,i,c),i=i.substring(0,c-d)+i.substring(b),j.lastIndex=c-d;return i},v=function(){return u(f.getBody().innerHTML)},w=function(a){k.inArray(s,a)===-1&&(r.addAttributeFilter(a,function(a,b){for(var c=a.length;c--;)a[c].attr(b,null)}),s.push(a))};return p=p||n,q=q||new h(b),b.entity_encoding=b.entity_encoding||"named",b.remove_trailing_brs=!("remove_trailing_brs"in b)||b.remove_trailing_brs,r=new d(b,q),r.addAttributeFilter("data-mce-tabindex",function(a,b){for(var c,d=a.length;d--;)c=a[d],c.attr("tabindex",c.attributes.map["data-mce-tabindex"]),c.attr(b,null)}),r.addAttributeFilter("src,href,style",function(a,c){for(var d,e,f,g=a.length,h="data-mce-"+c,i=b.url_converter,j=b.url_converter_scope;g--;)d=a[g],e=d.attributes.map[h],e!==f?(d.attr(c,e.length>0?e:null),d.attr(h,null)):(e=d.attributes.map[c],"style"===c?e=p.serializeStyle(p.parseStyle(e),d.name):i&&(e=i.call(j,e,c,d.name)),d.attr(c,e.length>0?e:null))}),r.addAttributeFilter("class",function(a){for(var b,c,d=a.length;d--;)b=a[d],c=b.attr("class"),c&&(c=b.attr("class").replace(/(?:^|\s)mce-item-\w+(?!\S)/g,""),b.attr("class",c.length>0?c:null))}),r.addAttributeFilter("data-mce-type",function(a,b,c){for(var d,e=a.length;e--;)d=a[e],"bookmark"!==d.attributes.map["data-mce-type"]||c.cleanup||d.remove()}),r.addNodeFilter("noscript",function(a){for(var b,c=a.length;c--;)b=a[c].firstChild,b&&(b.value=e.decode(b.value))}),r.addNodeFilter("script,style",function(a,b){for(var c,d,e,f=a.length,g=function(a){return a.replace(/(<!--\[CDATA\[|\]\]-->)/g,"\n").replace(/^[\r\n]*|[\r\n]*$/g,"").replace(/^\s*((<!--)?(\s*\/\/)?\s*<!\[CDATA\[|(<!--\s*)?\/\*\s*<!\[CDATA\[\s*\*\/|(\/\/)?\s*<!--|\/\*\s*<!--\s*\*\/)\s*[\r\n]*/gi,"").replace(/\s*(\/\*\s*\]\]>\s*\*\/(-->)?|\s*\/\/\s*\]\]>(-->)?|\/\/\s*(-->)?|\]\]>|\/\*\s*-->\s*\*\/|\s*-->\s*)\s*$/g,"")};f--;)c=a[f],d=c.firstChild?c.firstChild.value:"","script"===b?(e=c.attr("type"),e&&c.attr("type","mce-no/type"==e?null:e.replace(/^mce\-/,"")),d.length>0&&(c.firstChild.value="// <![CDATA[\n"+g(d)+"\n// ]]>")):d.length>0&&(c.firstChild.value="<!--\n"+g(d)+"\n-->")}),r.addNodeFilter("#comment",function(a){for(var b,c=a.length;c--;)b=a[c],0===b.value.indexOf("[CDATA[")?(b.name="#cdata",b.type=4,b.value=b.value.replace(/^\[CDATA\[|\]\]$/g,"")):0===b.value.indexOf("mce:protected ")&&(b.name="#text",b.type=3,b.raw=!0,b.value=unescape(b.value).substr(14))}),r.addNodeFilter("xml:namespace,input",function(a,b){for(var c,d=a.length;d--;)c=a[d],7===c.type?c.remove():1===c.type&&("input"!==b||"type"in c.attributes.map||c.attr("type","text"))}),r.addAttributeFilter("data-mce-src,data-mce-href,data-mce-style,data-mce-selected,data-mce-expando,data-mce-type,data-mce-resize",function(a,b){for(var c=a.length;c--;)a[c].attr(b,null)}),{schema:q,addNodeFilter:r.addNodeFilter,addAttributeFilter:r.addAttributeFilter,serialize:function(d,e){var f,g,h,k,n,s,t=this;return c.ie&&p.select("script,style,select,map").length>0?(n=d.innerHTML,d=d.cloneNode(!1),p.setHTML(d,n)):d=d.cloneNode(!0),f=a.implementation,f.createHTMLDocument&&(g=f.createHTMLDocument(""),l("BODY"==d.nodeName?d.childNodes:[d],function(a){g.body.appendChild(g.importNode(a,!0))}),d="BODY"!=d.nodeName?g.body.firstChild:g.body,h=p.doc,p.doc=g),e=e||{},e.format=e.format||"html",e.selection&&(e.forced_root_block=""),e.no_events||(e.node=d,t.onPreProcess(e)),n=j.trim(m(e.getInner?d.innerHTML:p.getOuterHTML(d))),s=r.parse(n,e),o(s),k=new i(b,q),e.content=k.serialize(s),e.no_events||t.onPostProcess(e),h&&(p.doc=h),e.node=null,e.content},addRules:function(a){q.addValidElements(a)},setRules:function(a){q.setValidElements(a)},onPreProcess:function(a){f&&f.fire("PreProcess",a)},onPostProcess:function(a){f&&f.fire("PostProcess",a)},addTempAttr:w,trimHtml:t,getTrimmedContent:v,trimContent:u}}}),g("3w",["1e","3t","2a"],function(a,b,c){var d=function(a){return a.firstChild&&a.firstChild===a.lastChild},e=function(a){return"br"===a.name||"\xa0"===a.value},f=function(a,b){var c=a.getBlockElements();return c[b.name]&&d(b)&&e(b.firstChild)},g=function(a,b){var c=a.getNonEmptyElements();return b&&(b.isEmpty(c)||f(a,b))},h=function(a,b){var c=b.firstChild,d=b.lastChild;return c&&"meta"===c.name&&(c=c.next),d&&"mce_marker"===d.attr("id")&&(d=d.prev),g(a,d)&&(d=d.prev),!(!c||c!==d)&&("ul"===c.name||"ol"===c.name)},i=function(a){var b=a.firstChild,c=a.lastChild;return b&&"META"===b.nodeName&&b.parentNode.removeChild(b),c&&"mce_marker"===c.id&&c.parentNode.removeChild(c),a},j=function(a,b,c){var d=b.serialize(c),e=a.createFragment(d);return i(e)},k=function(b){return a.grep(b.childNodes,function(a){return"LI"===a.nodeName})},l=function(a){return!a.firstChild},m=function(a){return a.length>0&&l(a[a.length-1])?a.slice(0,-1):a},n=function(a,b){var c=a.getParent(b,a.isBlock);return c&&"LI"===c.nodeName?c:null},o=function(a,b){return!!n(a,b)},p=function(a,b){var c=b.cloneRange(),d=b.cloneRange();return c.setStartBefore(a),d.setEndAfter(a),[c.cloneContents(),d.cloneContents()]},q=function(a,d){var e=c.before(a),f=new b(d),g=f.next(e);return g?g.toRange():null},r=function(a,d){var e=c.after(a),f=new b(d),g=f.prev(e);return g?g.toRange():null},s=function(b,c,d,e){var f=p(b,e),g=b.parentNode;return g.insertBefore(f[0],b),a.each(c,function(a){g.insertBefore(a,b)}),g.insertBefore(f[1],b),g.removeChild(b),r(c[c.length-1],d)},t=function(b,c,d){var e=b.parentNode;return a.each(c,function(a){e.insertBefore(a,b)}),q(b,d)},u=function(a,b,c,d){return d.insertAfter(b.reverse(),a),r(b[0],c)},v=function(a,d,e,f){var g=j(d,a,f),h=n(d,e.startContainer),i=m(k(g.firstChild)),l=1,o=2,p=d.getRoot(),q=function(a){var f=c.fromRangeStart(e),g=new b(d.getRoot()),i=a===l?g.prev(f):g.next(f);return!i||n(d,i.getNode())!==h};return q(l)?t(h,i,p):q(o)?u(h,i,p,d):s(h,i,p,e)};return{isListFragment:h,insertAtCaret:v,isParentBlockLi:o,trimListItems:m,listItems:k}}),g("2m",["23","1t","2a","3t","3u","2b","3v","39","p","x","3w","1e"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=f.matchNodeNames("td th"),n=function(a,b,c){if("all"===c.getAttribute("data-mce-bogus"))c.parentNode.insertBefore(a.dom.createFragment(b),c);else{var d=c.firstChild,e=c.lastChild;!d||d===e&&"BR"===d.nodeName?a.dom.setHTML(c,b):a.selection.setContent(b)}},o=function(c,d){a.from(c.getParent(d,"td,th")).map(b.fromDom).each(g.trimBlockTrailingBr)},p=function(a,b,f){var g,p,q,r,s,t,u,v,w,x,y,z,A=a.schema.getTextInlineElements(),B=a.selection,C=a.dom,D=function(a){var b,c,d;b=B.getRng(!0),c=b.startContainer,d=b.startOffset;var e=function(a){return c[a]&&3==c[a].nodeType};return 3==c.nodeType&&(d>0?a=a.replace(/^&nbsp;/," "):e("previousSibling")||(a=a.replace(/^ /,"&nbsp;")),d<c.length?a=a.replace(/&nbsp;(<br>|)$/," "):e("nextSibling")||(a=a.replace(/(&nbsp;| )(<br>|)$/,"&nbsp;"))),a},E=function(){var a,c,d;a=B.getRng(!0),c=a.startContainer,d=a.startOffset,3==c.nodeType&&a.collapsed&&("\xa0"===c.data[d]?(c.deleteData(d,1),/[\u00a0| ]$/.test(b)||(b+=" ")):"\xa0"===c.data[d-1]&&(c.deleteData(d-1,1),/[\u00a0| ]$/.test(b)||(b=" "+b)))},F=function(){if(z){var b=a.getBody(),c=new e(C);l.each(C.select("*[data-mce-fragment]"),function(a){for(var d=a.parentNode;d&&d!=b;d=d.parentNode)A[a.nodeName.toLowerCase()]&&c.compare(d,a)&&C.remove(a,!0)})}},G=function(a){for(var b=a;b=b.walk();)1===b.type&&b.attr("data-mce-fragment","1")},H=function(a){l.each(a.getElementsByTagName("*"),function(a){a.removeAttribute("data-mce-fragment")})},I=function(a){return!!a.getAttribute("data-mce-fragment")},J=function(b){return b&&!a.schema.getShortEndedElements()[b.nodeName]},K=function(b){var e,f,g,h=function(b){for(var c=a.getBody();b&&b!==c;b=b.parentNode)if("false"===a.dom.getContentEditable(b))return b;return null};if(b){if(B.scrollIntoView(b),e=h(b))return C.remove(b),void B.select(e);v=C.createRng(),w=b.previousSibling,w&&3==w.nodeType?(v.setStart(w,w.nodeValue.length),i.ie||(x=b.nextSibling,x&&3==x.nodeType&&(w.appendData(x.data),x.parentNode.removeChild(x)))):(v.setStartBefore(b),v.setEndBefore(b));var j=function(b){var e=c.fromRangeStart(b),f=new d(a.getBody());if(e=f.next(e))return e.toRange()};f=C.getParent(b,C.isBlock),C.remove(b),f&&C.isEmpty(f)&&(a.$(f).empty(),v.setStart(f,0),v.setEnd(f,0),m(f)||I(f)||!(g=j(v))?C.add(f,C.create("br",{"data-mce-bogus":"1"})):(v=g,C.remove(f))),B.setRng(v)}};if(/^ | $/.test(b)&&(b=D(b)),g=a.parser,z=f.merge,p=new j({validate:a.settings.validate},a.schema),y='<span id="mce_marker" data-mce-type="bookmark">&#xFEFF;&#x200B;</span>',t={content:b,format:"html",selection:!0,paste:f.paste},t=a.fire("BeforeSetContent",t),t.isDefaultPrevented())return void a.fire("SetContent",{content:t.content,format:"html",selection:!0,paste:f.paste});b=t.content,b.indexOf("{$caret}")==-1&&(b+="{$caret}"),b=b.replace(/\{\$caret\}/,y),v=B.getRng();var L=v.startContainer||(v.parentElement?v.parentElement():null),M=a.getBody();L===M&&B.isCollapsed()&&C.isBlock(M.firstChild)&&J(M.firstChild)&&C.isEmpty(M.firstChild)&&(v=C.createRng(),v.setStart(M.firstChild,0),v.setEnd(M.firstChild,0),B.setRng(v)),B.isCollapsed()||(a.selection.setRng(h.normalize(a.selection.getRng())),a.getDoc().execCommand("Delete",!1,null),E()),q=B.getNode();var N={context:q.nodeName.toLowerCase(),data:f.data};if(s=g.parse(b,N),f.paste===!0&&k.isListFragment(a.schema,s)&&k.isParentBlockLi(C,q))return v=k.insertAtCaret(p,C,a.selection.getRng(!0),s),a.selection.setRng(v),void a.fire("SetContent",t);if(G(s),w=s.lastChild,"mce_marker"==w.attr("id"))for(u=w,w=w.prev;w;w=w.walk(!0))if(3==w.type||!C.isBlock(w.name)){a.schema.isValidChild(w.parent.name,"span")&&w.parent.insert(u,w,"br"===w.name);break}if(a._selectionOverrides.showBlockCaretContainer(q),N.invalid){for(B.setContent(y),q=B.getNode(),r=a.getBody(),9==q.nodeType?q=w=r:w=q;w!==r;)q=w,w=w.parentNode;b=q==r?r.innerHTML:C.getOuterHTML(q),b=p.serialize(g.parse(b.replace(/<span (id="mce_marker"|id=mce_marker).+?<\/span>/i,function(){return p.serialize(s)}))),q==r?C.setHTML(r,b):C.setOuterHTML(q,b)}else b=p.serialize(s),n(a,b,q);F(),K(C.get("mce_marker")),H(a.getBody()),o(a.dom,a.selection.getStart()),a.fire("SetContent",t),a.addVisual()},q=function(a){var b;return"string"!=typeof a?(b=l.extend({paste:a.paste,data:{paste:a.paste}},a),{content:a.content,details:b}):{content:a,details:{}}},r=function(a,b){var c=q(b);p(a,c.content,c.details)};return{insertAtCaret:r}}),g("40",["23","2f","1t","5c","3r"],function(a,b,c,d,e){var f=function(a){return function(d){return b.eq(a,c.fromDom(d.dom().parentNode))}},g=function(c,g){return b.contains(c,g)?d.closest(g,function(a){return e.isTextBlock(a)||e.isListItem(a)},f(c)):a.none()},h=function(a){var b=a.getBody(),c=b.firstChild&&a.dom.isBlock(b.firstChild)?b.firstChild:b;a.selection.setCursorLocation(c,0)},i=function(a){a.dom.isEmpty(a.getBody())&&(a.setContent(""),h(a))};return{getParentBlock:g,paddEmptyBody:i}}),g("60",["54"],function(a){var b=function(b){return a.first(b).isSome()},c=function(b,c,d){return a.ancestor(b,c,d).isSome()},d=function(b,c){return a.sibling(b,c).isSome()},e=function(b,c){return a.child(b,c).isSome()},f=function(b,c){return a.descendant(b,c).isSome()},g=function(b,c,d){return a.closest(b,c,d).isSome()};return{any:b,ancestor:c,sibling:d,child:e,descendant:f,closest:g}}),g("5k",["1","2f","1t","60","36","2b","k"],function(a,b,c,d,e,f,g){var h=function(e,f){var g=c.fromDom(e),h=c.fromDom(f);return d.ancestor(h,"pre,code",a.curry(b.eq,g))},i=function(a,b){return f.isText(b)&&/^[ \t\r\n]*$/.test(b.data)&&h(a,b)===!1},j=function(a){return f.isElement(a)&&"A"===a.nodeName&&a.hasAttribute("name")},k=function(a,b){return e.isCaretCandidate(b)&&i(a,b)===!1||j(b)||l(b)},l=f.hasAttribute("data-mce-bookmark"),m=f.hasAttribute("data-mce-bogus"),n=f.hasAttributeValue("data-mce-bogus","all"),o=function(a){var b,c,d=0;if(k(a,a))return!1;if(c=a.firstChild,!c)return!0;b=new g(c,a);do if(n(c))c=b.next(!0);else if(m(c))c=b.next();else if(f.isBr(c))d++,c=b.next();else{if(k(a,c))return!1;c=b.next()}while(c);return d<=1},p=function(a){return o(a.dom())};return{isEmpty:p}}),g("59",["1i","1","23","5b","45","2f","1t","3l","5c","3k","3p","2a","40","5k","2b"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=e.immutable("block","position"),q=e.immutable("from","to"),r=function(a,b){var c=g.fromDom(a),d=g.fromDom(b.container());return m.getParentBlock(c,d).map(function(a){return p(a,b)})},s=function(a){return f.eq(a.from().block(),a.to().block())===!1},t=function(a){return j.parent(a.from().block()).bind(function(b){return j.parent(a.to().block()).filter(function(a){return f.eq(b,a)})}).isSome()},u=function(a){return o.isContentEditableFalse(a.from().block())===!1&&o.isContentEditableFalse(a.to().block())===!1},v=function(a,b,d){return o.isBr(d.position().getNode())&&n.isEmpty(d.block())===!1?k.positionIn(!1,d.block().dom()).bind(function(e){return e.isEqual(d.position())?k.fromPosition(b,a,e).bind(function(b){return r(a,b)}):c.some(d)}).getOr(d):d},w=function(a,b,c){var e=r(a,l.fromRangeStart(c)),f=e.bind(function(c){return k.fromPosition(b,a,c.position()).bind(function(c){return r(a,c).map(function(c){return v(a,b,c)})})});return d.liftN([e,f],q).filter(function(a){return s(a)&&t(a)&&u(a)})},x=function(a,b,d){return d.collapsed?w(a,b,d):c.none()};return{read:x}}),g("5a",["1i","23","2f","4f","4g","1t","3k","3p","2a","3r","5k","2b","55"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=function(b){var c=g.children(b);return a.findIndex(c,j.isBlock).fold(function(){return c},function(a){return c.slice(0,a)})},o=function(b){var c=n(b);return a.each(c,function(a){e.remove(a)}),c},p=function(a,b){h.positionIn(a,b.dom()).each(function(a){var b=a.getNode();l.isBr(b)&&e.remove(f.fromDom(b))})},q=function(b,c){var d=m.parentsAndSelf(c,b);return a.find(d.reverse(),k.isEmpty).each(e.remove)},r=function(a,d){var e=g.parents(d,function(b){return c.eq(b,a)});return b.from(e[e.length-2])},s=function(a,d){return c.contains(d,a)?g.parent(a).bind(function(e){return c.eq(e,d)?b.some(a):r(d,a)}):b.none()},t=function(b,c,f){if(k.isEmpty(f))return e.remove(f),h.firstPositionIn(c.dom());p(!0,c),p(!1,f);var g=o(c);return s(c,f).fold(function(){q(b,c);var e=h.lastPositionIn(f.dom());return a.each(g,function(a){d.append(f,a)}),e},function(e){var j=h.prevPosition(f.dom(),i.before(e.dom()));return a.each(g,function(a){d.before(e,a)}),q(b,c),j})},u=function(a,b,c,d){return b?t(a,d,c):t(a,c,d)};return{mergeBlocks:u}}),g("3x",["1t","59","5a"],function(a,b,c){var d=function(d,e){var f,g=a.fromDom(d.getBody());return f=b.read(g.dom(),e,d.selection.getRng()).bind(function(a){return c.mergeBlocks(g,e,a.from().block(),a.to().block())}),f.each(function(a){d.selection.setRng(a.toRange())}),f.isSome()};return{backspaceDelete:d}}),g("3y",["5b","2f","1t","3p","2a","40","5a"],function(a,b,c,d,e,f,g){var h=function(d,e){var h=e.getRng();return a.liftN([f.getParentBlock(d,c.fromDom(h.startContainer)),f.getParentBlock(d,c.fromDom(h.endContainer))],function(a,c){return b.eq(a,c)===!1&&(h.deleteContents(),g.mergeBlocks(d,!0,a,c).each(function(a){e.setRng(a.toRange())}),!0)}).getOr(!1)},i=function(a,b){var c=d.prevPosition(a.dom(),e.fromRangeStart(b)).isNone(),f=d.nextPosition(a.dom(),e.fromRangeEnd(b)).isNone();return c&&f},j=function(a){return a.setContent(""),a.selection.setCursorLocation(),!0},k=function(a){var b=c.fromDom(a.getBody()),d=a.selection.getRng();return i(b,d)?j(a):h(b,a.selection)},l=function(a,b){return!a.selection.isCollapsed()&&k(a,a.selection.getRng())};return{backspaceDelete:l}}),g("5d",["4t","23","1t","3p","2a","4e","40","5k","2b"],function(a,b,c,d,e,f,g,h,i){var j=a.generate([{remove:["element"]},{moveToElement:["element"]},{moveToPosition:["position"]}]),k=function(a,b){var c=b.getNode(a===!1),d=a?"after":"before";return i.isElement(c)&&c.getAttribute("data-mce-caret")===d},l=function(a,d,e,f){var i=f.getNode(d===!1);return g.getParentBlock(c.fromDom(a),c.fromDom(e.getNode())).map(function(a){return h.isEmpty(a)?j.remove(a.dom()):j.moveToElement(i)}).orThunk(function(){return b.some(j.moveToElement(i))})},m=function(a,c,e){return d.fromPosition(c,a,e).bind(function(d){return c&&i.isContentEditableFalse(d.getNode())?l(a,c,e,d):c===!1&&i.isContentEditableFalse(d.getNode(!0))?l(a,c,e,d):c&&f.isAfterContentEditableFalse(e)?b.some(j.moveToPosition(d)):c===!1&&f.isBeforeContentEditableFalse(e)?b.some(j.moveToPosition(d)):b.none()})},n=function(a,c){return a&&i.isContentEditableFalse(c.nextSibling)?b.some(j.moveToElement(c.nextSibling)):a===!1&&i.isContentEditableFalse(c.previousSibling)?b.some(j.moveToElement(c.previousSibling)):b.none()},o=function(a,c,d){return k(c,d)?n(c,d.getNode(c===!1)).fold(function(){return m(a,c,d)},b.some):m(a,c,d)},p=function(a,c,d){var g=f.normalizeRange(c?1:-1,a,d),h=e.fromRangeStart(g);return c===!1&&f.isAfterContentEditableFalse(h)?b.some(j.remove(h.getNode(!0))):c&&f.isBeforeContentEditableFalse(h)?b.some(j.remove(h.getNode())):o(a,c,h)};return{read:p}}),g("5e",["1","23","5b","4f","4g","1t","3l","5c","3k","36","3p","2a","5k","2b"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o=function(a,b){var c=a.container(),d=a.offset();return l.isTextPosition(a)===!1&&c===b.parentNode&&d>l.before(b).offset()},p=function(a,b){return o(b,a)?new l(b.container(),b.offset()-1):b},q=function(a){return n.isText(a)?new l(a,0):l.before(a)},r=function(a){return n.isText(a)?new l(a,a.data.length):l.after(a)},s=function(a){return j.isCaretCandidate(a.previousSibling)?b.some(r(a.previousSibling)):a.previousSibling?k.lastPositionIn(a.previousSibling):b.none()},t=function(a){return j.isCaretCandidate(a.nextSibling)?b.some(q(a.nextSibling)):a.nextSibling?k.firstPositionIn(a.nextSibling):b.none()},u=function(a,c){var d=l.before(c.previousSibling?c.previousSibling:c.parentNode);return k.prevPosition(a,d).fold(function(){return k.nextPosition(a,l.after(c))},b.some)},v=function(a,c){return k.nextPosition(a,l.after(c)).fold(function(){return k.prevPosition(a,l.before(c))},b.some)},w=function(a,b){return s(b).orThunk(function(){return t(b)}).orThunk(function(){return u(a,b)})},x=function(a,b){return t(b).orThunk(function(){return s(b)}).orThunk(function(){return v(a,b)})},y=function(a,b,c){return a?x(b,c):w(b,c)},z=function(b,c,d){return y(b,c,d).map(a.curry(p,d))},A=function(a,b,c){c.fold(function(){a.focus()},function(c){a.selection.setRng(c.toRange(),b)})},B=function(a){return function(b){return b.dom()===a}},C=function(a,b){return b&&a.schema.getBlockElements().hasOwnProperty(g.name(b))},D=function(a){if(m.isEmpty(a)){var c=f.fromHtml('<br data-mce-bogus="1">');return e.empty(a),d.append(a,c),b.some(l.before(c.dom()))}return b.none()},E=function(a,b){return c.liftN([i.prevSibling(a),i.nextSibling(a),b],function(b,c,d){var f,g=b.dom(),h=c.dom();return n.isText(g)&&n.isText(h)?(f=g.data.length,g.appendData(h.data),e.remove(c),e.remove(a),d.container()===h?new l(g,f):d):(e.remove(a),d)}).orThunk(function(){return e.remove(a),b})},F=function(c,d,e){var f=z(d,c.getBody(),e.dom()),g=h.ancestor(e,a.curry(C,c),B(c.getBody())),i=E(e,f);g.bind(D).fold(function(){A(c,d,i)},function(a){A(c,d,b.some(a))})};return{deleteElement:F}}),g("3z",["1i","4g","1t","4i","2a","5d","5e","40","2b"],function(a,b,c,d,e,f,g,h,i){var j=function(a,b){return function(d){return g.deleteElement(a,b,c.fromDom(d)),!0}},k=function(a,b){return function(c){var d=b?e.before(c):e.after(c);return a.selection.setRng(d.toRange()),!0}},l=function(a){return function(b){return a.selection.setRng(b.toRange()),!0}},m=function(a,b){var c=f.read(a.getBody(),b,a.selection.getRng()).map(function(c){return c.fold(j(a,b),k(a,b),l(a))});return c.getOr(!1)},n=function(c){a.each(d.descendants(c,".mce-offscreen-selection"),b.remove)},o=function(a,b){var d=a.selection.getNode();return!!i.isContentEditableFalse(d)&&(n(c.fromDom(a.getBody())),g.deleteElement(a,b,c.fromDom(a.selection.getNode())),h.paddEmptyBody(a),!0)},p=function(a,b){for(;b&&b!==a;){if(i.isContentEditableTrue(b)||i.isContentEditableFalse(b))return b;b=b.parentNode}return null},q=function(a){var b,c=p(a.getBody(),a.selection.getNode());return i.isContentEditableTrue(c)&&a.dom.isBlock(c)&&a.dom.isEmpty(c)&&(b=a.dom.create("br",{"data-mce-bogus":"1"}),a.dom.setHTML(c,""),c.appendChild(b),a.selection.setRng(e.before(b).toRange())),!0},r=function(a,b){return a.selection.isCollapsed()?m(a,b):o(a,b)};return{backspaceDelete:r,paddEmptyElement:q}}),g("61",["1","2b","2c"],function(a,b,c){var d=b.isText,e=function(a){return d(a)&&a.data[0]===c.ZWSP},f=function(a){return d(a)&&a.data[a.data.length-1]===c.ZWSP},g=function(a){return a.ownerDocument.createTextNode(c.ZWSP)},h=function(a){if(d(a.previousSibling))return f(a.previousSibling)?a.previousSibling:(a.previousSibling.appendData(c.ZWSP),a.previousSibling);if(d(a))return e(a)?a:(a.insertData(0,c.ZWSP),a);var b=g(a);return a.parentNode.insertBefore(b,a),b},i=function(a){if(d(a.nextSibling))return e(a.nextSibling)?a.nextSibling:(a.nextSibling.insertData(0,c.ZWSP),a.nextSibling);if(d(a))return f(a)?a:(a.appendData(c.ZWSP),a);var b=g(a);return a.nextSibling?a.parentNode.insertBefore(b,a.nextSibling):a.parentNode.appendChild(b),b},j=function(a,b){return a?h(b):i(b)};return{insertInline:j,insertInlineBefore:a.curry(j,!0),insertInlineAfter:a.curry(j,!1)}}),g("62",["1i","29","2a","2b","2c"],function(a,b,c,d,e){var f=d.isElement,g=d.isText,h=function(a){var b=a.parentNode;b&&b.removeChild(a)},i=function(a){try{return a.nodeValue}catch(a){return""}},j=function(a,b){0===b.length?h(a):a.nodeValue=b},k=function(a){var b=e.trim(a);return{count:a.length-b.length,text:b}},l=function(a,b){return r(a),b},m=function(a,b){var d=k(a.data.substr(0,b.offset())),e=k(a.data.substr(b.offset())),f=d.text+e.text;return f.length>0?(j(a,f),new c(a,b.offset()-d.count)):b},n=function(b,d){var e=d.container(),f=a.indexOf(e.childNodes,b).map(function(a){return a<d.offset()?new c(e,d.offset()-1):d}).getOr(d);return r(b),f},o=function(a,b){return b.container()===a?m(a,b):l(a,b)},p=function(a,b){return b.container()===a.parentNode?n(a,b):l(a,b)},q=function(a,b){return c.isTextPosition(b)?o(a,b):p(a,b)},r=function(a){if(f(a)&&b.isCaretContainer(a)&&(b.hasContent(a)?a.removeAttribute("data-mce-caret"):h(a)),g(a)){var c=e.trim(i(a));j(a,c)}};return{removeAndReposition:q,remove:r}}),g("2o",["1i","1","43","23","44","45","2t","3h","1e"],function(a,b,c,d,e,f,g,h,i){var j=f.immutable("sections","settings"),k=h.detect(),l=k.deviceType.isTouch(),m=["lists","autolink","autosave"],n={theme:"mobile"},o=function(b){var c=g.isArray(b)?b.join(" "):b,d=a.map(g.isString(c)?c.split(" "):[],e.trim);return a.filter(d,function(a){return a.length>0})},p=function(c){return a.filter(c,b.curry(a.contains,m))},q=function(b,d){var e=c.bifilter(d,function(c,d){return a.contains(b,d)});return j(e.t,e.f)},r=function(a,b,c){var d=a.sections(),e=d.hasOwnProperty(b)?d[b]:{};return i.extend({},c,e)},s=function(a,b){return a.sections().hasOwnProperty(b)},t=function(a,b,c){return{id:a,theme:"modern",delta_width:0,delta_height:0,popup_css:"",plugins:"",document_base_url:b,add_form_submit_trigger:!0,submit_patch:!0,add_unload_trigger:!0,convert_urls:!0,relative_urls:!0,remove_script_host:!0,object_resizing:!0,doctype:"<!DOCTYPE html>",visual:!0,font_size_style_values:"xx-small,x-small,small,medium,large,x-large,xx-large",font_size_legacy_values:"xx-small,small,medium,large,x-large,xx-large,300%",forced_root_block:"p",hidden_input:!0,padd_empty_editor:!0,render_ui:!0,indentation:"30px",inline_styles:!0,convert_fonts_to_spans:!0,indent:"simple",indent_before:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",indent_after:"p,h1,h2,h3,h4,h5,h6,blockquote,div,title,style,pre,script,td,th,ul,ol,li,dl,dt,dd,area,table,thead,tfoot,tbody,tr,section,article,hgroup,aside,figure,figcaption,option,optgroup,datalist",entity_encoding:"named",url_converter:c.convertURL,url_converter_scope:c,ie7_compat:!0}},u=function(a,b){var c=b.external_plugins?b.external_plugins:{};return a&&a.external_plugins?i.extend({},a.external_plugins,c):c},v=function(a,b){return[].concat(o(a)).concat(o(b))},w=function(a,b,c,d){var e=o(c.forced_plugins),f=o(d.plugins),g=a&&s(b,"mobile")?p(f):f,h=v(e,g);return i.extend(d,{plugins:h.join(" ")})},x=function(a,b){var c=b.settings().inline;return a&&s(b,"mobile")&&!c},y=function(a,b,c,d){var e=q(["mobile"],d),f=i.extend(b,c,e.settings(),x(a,e)?r(e,"mobile",n):{},{validate:!0,content_editable:e.settings().inline,external_plugins:u(c,e.settings())});return w(a,e,c,f)},z=function(a,b,c,d,e){var f=t(b,c,a);return y(l,f,d,e)},A=function(a,b){return d.from(a.settings[b])},B=function(a,b,c){return d.from(b.settings[c]).filter(a)};return{getEditorSettings:z,get:A,getString:b.curry(B,g.isString),combineSettings:y}}),g("63",[],function(){var a=/[\u0591-\u07FF\uFB1D-\uFDFF\uFE70-\uFEFC]/,b=function(b){return a.test(b)};return{hasStrongRtl:b}}),g("5i",["1i","1","23","5b","2t","1t","2d","29","3p","2a","4e","3t","d","2b","2o","63"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=function(a,b){var c=o.getString(a,"inline_boundaries_selector").getOr("a[href],code");return g.is(f.fromDom(b),c)},r=function(a){return"rtl"===m.DOM.getStyle(a,"direction",!0)||p.hasStrongRtl(a.textContent)},s=function(b,c,d){return a.filter(m.DOM.getParents(d.container(),"*",c),b)},t=function(a,b,d){var e=s(a,b,d);return c.from(e[e.length-1])},u=function(a,b,c){var d=k.getParentBlock(b,a),e=k.getParentBlock(c,a);return d&&d===e},v=function(a){return h.isBeforeInline(a)||h.isAfterInline(a)},w=function(a,b){var c=b.container(),d=b.offset();return a?h.isCaretContainerInline(c)?n.isText(c.nextSibling)?new j(c.nextSibling,0):j.after(c):h.isBeforeInline(b)?new j(c,d+1):b:h.isCaretContainerInline(c)?n.isText(c.previousSibling)?new j(c.previousSibling,c.previousSibling.data.length):j.before(c):h.isAfterInline(b)?new j(c,d-1):b},x=b.curry(w,!0),y=b.curry(w,!1);return{isInlineTarget:q,findRootInline:t,isRtl:r,isAtZwsp:v,normalizePosition:w,normalizeForwards:x,normalizeBackwards:y,hasSameParentBlock:u}}),g("5f",["23","29","61","62","3p","2a","2b","5i"],function(a,b,c,d,e,f,g,h){var i=function(a,b){return g.isText(a.container())?c.insertInline(b,a.container()):c.insertInline(b,a.getNode())},j=function(a,c){var d=c.get();return d&&a.container()===d&&b.isCaretContainerInline(d)},k=function(b,g){return g.fold(function(e){d.remove(b.get());var g=c.insertInlineBefore(e);return b.set(g),a.some(new f(g,g.length-1))},function(a){return e.firstPositionIn(a).map(function(a){if(j(a,b))return new f(b.get(),1);d.remove(b.get());var c=i(a,!0);return b.set(c),new f(c,1)})},function(a){return e.lastPositionIn(a).map(function(a){if(j(a,b))return new f(b.get(),b.get().length-1);d.remove(b.get());var c=i(a,!1);return b.set(c),new f(c,c.length-1)})},function(e){d.remove(b.get());var g=c.insertInlineAfter(e);return b.set(g),a.some(new f(g,1))})};return{renderCaret:k}}),g("64",["23"],function(a){var b=function(b,c){for(var d=0;d<b.length;d++){var e=b[d].apply(null,c);if(e.isSome())return e}return a.none()};return{evaluateUntil:b}}),g("5g",["4t","1","23","5b","29","3p","2a","4e","2b","5i","64"],function(a,b,c,d,e,f,g,h,i,j,k){var l=a.generate([{before:["element"]},{start:["element"]},{end:["element"]},{after:["element"]}]),m=function(a,b){var c=h.getParentBlock(b,a);return c?c:a},n=function(a,d,e){var g=j.normalizeForwards(e),h=m(d,g.container());return j.findRootInline(a,h,g).fold(function(){return f.nextPosition(h,g).bind(b.curry(j.findRootInline,a,h)).map(function(a){return l.before(a)})},c.none)},o=function(a,b,d){var e=j.normalizeBackwards(d);return j.findRootInline(a,b,e).bind(function(a){var b=f.prevPosition(a,e);return b.isNone()?c.some(l.start(a)):c.none()})},p=function(a,b,d){var e=j.normalizeForwards(d);return j.findRootInline(a,b,e).bind(function(a){var b=f.nextPosition(a,e);return b.isNone()?c.some(l.end(a)):c.none()})},q=function(a,d,e){var g=j.normalizeBackwards(e),h=m(d,g.container());return j.findRootInline(a,h,g).fold(function(){return f.prevPosition(h,g).bind(b.curry(j.findRootInline,a,h)).map(function(a){return l.after(a)})},c.none)},r=function(a){return j.isRtl(t(a))===!1},s=function(a,b,c){var d=k.evaluateUntil([n,o,p,q],[a,b,c]);return d.filter(r)},t=function(a){return a.fold(b.identity,b.identity,b.identity,b.identity)},u=function(a){return a.fold(b.constant("before"),b.constant("start"),b.constant("end"),b.constant("after"))},v=function(a){return a.fold(l.before,l.before,l.after,l.after)},w=function(a){return a.fold(l.start,l.start,l.end,l.end)},x=function(a,b){return u(a)===u(b)&&t(a)===t(b)},y=function(a,b,c,e,f,g){return d.liftN([j.findRootInline(b,c,e),j.findRootInline(b,c,f)],function(b,d){return b!==d&&j.hasSameParentBlock(c,b,d)?l.after(a?b:d):g}).getOr(g)},z=function(a,c){return a.fold(b.constant(!0),function(a){return!x(a,c)})},A=function(a,c,d,e,g){var h=j.normalizePosition(a,g),i=f.fromPosition(a,d,h).map(b.curry(j.normalizePosition,a)),k=i.fold(function(){return e.map(v)},function(f){return s(c,d,f).map(b.curry(y,a,c,d,h,f)).filter(b.curry(z,e))});return k.filter(r)},B=function(a,d){return a?d.fold(b.compose(c.some,l.start),c.none,b.compose(c.some,l.after),c.none):d.fold(c.none,b.compose(c.some,l.before),c.none,b.compose(c.some,l.end))},C=function(a,c,d,e){var f=j.normalizePosition(a,e),g=s(c,d,f);return s(c,d,f).bind(b.curry(B,a)).orThunk(function(){return A(a,c,d,g,e)})};return{readLocation:s,findLocation:C,prevLocation:b.curry(C,!1),nextLocation:b.curry(C,!0),getElement:t,outside:v,inside:w}}),g("5h",["1i","1u","1","62","2a","5f","5g","5i"],function(a,b,c,d,e,f,g,h){var i=function(a,b){var c=a.dom.createRng();c.setStart(b.container(),b.offset()),c.setEnd(b.container(),b.offset()),a.selection.setRng(c)},j=function(a){return a.settings.inline_boundaries!==!1},k=function(a,b){a?b.setAttribute("data-mce-selected","1"):b.removeAttribute("data-mce-selected","1")},l=function(a,b,c){return f.renderCaret(b,c).map(function(b){return i(a,b),c})},m=function(a,b,d){var f=a.getBody(),i=e.fromRangeStart(a.selection.getRng()),j=c.curry(h.isInlineTarget,a),k=g.findLocation(d,j,f,i);return k.bind(function(c){return l(a,b,c)})},n=function(b,d,e){
var f=a.filter(d.select("*[data-mce-selected]"),b),g=a.filter(e,b);a.each(a.difference(f,g),c.curry(k,!1)),a.each(a.difference(g,f),c.curry(k,!0))},o=function(a,b){if(a.selection.isCollapsed()&&a.composing!==!0&&b.get()){var c=e.fromRangeStart(a.selection.getRng());e.isTextPosition(c)&&h.isAtZwsp(c)===!1&&(i(a,d.removeAndReposition(b.get(),c)),b.set(null))}},p=function(b,c,d,f){if(c.selection.isCollapsed()){var h=a.filter(f,b);a.each(h,function(a){var f=e.fromRangeStart(c.selection.getRng());g.readLocation(b,c.getBody(),f).bind(function(a){return l(c,d,a)})})}},q=function(a,b,c){return function(){return!!j(a)&&m(a,b,c).isSome()}},r=function(a){var d=new b(null),e=c.curry(h.isInlineTarget,a);return a.on("NodeChange",function(b){j(a)&&(n(e,a.dom,b.parents),o(a,d),p(e,a,d,b.parents))}),d};return{move:q,setupSelectedState:r,setCaretPosition:i}}),g("41",["1","23","5b","1t","1j","29","3p","2a","4e","5e","5f","5g","5h","5i"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){var o=function(a){return a.settings.inline_boundaries!==!1},p=function(a,b){var c=e.createRange();return c.setStart(a.container(),a.offset()),c.setEnd(b.container(),b.offset()),c},q=function(a){return c.liftN([g.firstPositionIn(a),g.lastPositionIn(a)],function(b,c){var d=n.normalizePosition(!0,b),e=n.normalizePosition(!1,c);return g.nextPosition(a,d).map(function(a){return a.isEqual(e)}).getOr(!0)}).getOr(!0)},r=function(a,b){return function(c){return k.renderCaret(b,c).map(function(b){return m.setCaretPosition(a,b),!0}).getOr(!1)}},s=function(b,c,d,e){var f=b.getBody(),g=a.curry(n.isInlineTarget,b);b.undoManager.ignore(function(){b.selection.setRng(p(d,e)),b.execCommand("Delete"),l.readLocation(g,f,h.fromRangeStart(b.selection.getRng())).map(l.inside).map(r(b,c))}),b.nodeChanged()},t=function(a,b){var c=i.getParentBlock(b,a);return c?c:a},u=function(c,e,f,h){var i=t(c.getBody(),h.container()),k=a.curry(n.isInlineTarget,c),m=l.readLocation(k,i,h);return m.bind(function(c){return f?c.fold(a.constant(b.some(l.inside(c))),b.none,a.constant(b.some(l.outside(c))),b.none):c.fold(b.none,a.constant(b.some(l.outside(c))),b.none,a.constant(b.some(l.inside(c))))}).map(r(c,e)).getOrThunk(function(){var a=g.navigate(f,i,h),b=a.bind(function(a){return l.readLocation(k,i,a)});return m.isSome()&&b.isSome()?n.findRootInline(k,i,h).map(function(a){return!!q(a)&&(j.deleteElement(c,f,d.fromDom(a)),!0)}).getOr(!1):b.bind(function(b){return a.map(function(a){return f?s(c,e,h,a):s(c,e,a,h),!0})}).getOr(!1)})},v=function(a,b,c){if(a.selection.isCollapsed()&&o(a)){var d=h.fromRangeStart(a.selection.getRng());return u(a,b,c,d)}return!1};return{backspaceDelete:v}}),g("5j",["4t","1i","1","23","5b","45","2f","1t","4i","54"],function(a,b,c,d,e,f,g,h,i,j){var k=f.immutable("start","end"),l=f.immutable("rng","table","cells"),m=a.generate([{removeTable:["element"]},{emptyCells:["cells"]}]),n=function(a,b){return j.closest(h.fromDom(a),"td,th",b)},o=function(a,b){return j.ancestor(a,"table",b)},p=function(a){return g.eq(a.start(),a.end())===!1},q=function(a,b){return o(a.start(),b).bind(function(c){return o(a.end(),b).bind(function(a){return g.eq(c,a)?d.some(c):d.none()})})},r=function(a,b){return e.liftN([n(a.startContainer,b),n(a.endContainer,b)],k).filter(p)},s=function(a,b){return q(a,b).bind(function(b){var c=i.descendants(b,"td,th");return l(a,b,c)})},t=function(a,b){var d=c.curry(g.eq,a);return r(b,d).map(function(a){return s(a,d)})},u=function(a,c){return b.findIndex(a,function(a){return g.eq(a,c)})},v=function(a){return e.liftN([u(a.cells(),a.rng().start()),u(a.cells(),a.rng().end())],function(b,c){return a.cells().slice(b,c+1)})},w=function(a){return v(a).bind(function(b){var c=a.cells();return b.length===c.length?m.removeTable(a.table()):m.emptyCells(b)})},x=function(a){return m.emptyCells(a)},y=function(a,b){return t(a,b).map(w)};return{getActionFromRange:y,getActionFromCells:x}}),g("42",["1i","1","23","2f","1t","3l","3p","2a","5e","5j","3r","5k","3v","55","58"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o){var p=function(b,c){return a.each(c,m.fillWithPaddingBr),b.selection.setCursorLocation(c[0].dom(),0),!0},q=function(a,b){return i.deleteElement(a,!1,b),!0},r=function(a,c,d){return j.getActionFromRange(c,d).map(function(c){return c.fold(b.curry(q,a),b.curry(p,a))})},s=function(a,b){return y(a,b)},t=function(a,b,c,d){return w(b,d).fold(function(){return r(a,b,c)},function(b){return s(a,b)}).getOr(!1)},u=function(a,b){var c=e.fromDom(a.getBody()),d=a.selection.getRng(),f=o.getCellsFromEditor(a);return 0!==f.length?p(a,f):t(a,c,d,b)},v=function(b,c){return a.find(n.parentsAndSelf(c,b),k.isTableCell)},w=function(b,c){return a.find(n.parentsAndSelf(c,b),function(a){return"caption"===f.name(a)})},x=function(a,b,c,f,h){return g.navigate(c,a.getBody(),h).bind(function(a){return v(b,e.fromDom(a.getNode())).map(function(a){return d.eq(a,f)===!1})})},y=function(a,b){return m.fillWithPaddingBr(b),a.selection.setCursorLocation(b.dom(),0),c.some(!0)},z=function(a,b,c,d){return g.firstPositionIn(a.dom()).bind(function(e){return g.lastPositionIn(a.dom()).map(function(a){return b?c.isEqual(e)&&d.isEqual(a):c.isEqual(a)&&d.isEqual(e)})}).getOr(!0)},A=function(a,b){return y(a,b)},B=function(a,b,c){return w(a,e.fromDom(c.getNode())).map(function(a){return d.eq(a,b)===!1})},C=function(a,b,d,e,f){return g.navigate(d,a.getBody(),f).bind(function(c){return z(e,d,f,c)?A(a,e):B(b,e,c)}).or(c.some(!0))},D=function(a,b,c,d){var e=h.fromRangeStart(a.selection.getRng());return v(c,d).bind(function(d){return l.isEmpty(d)?y(a,d):x(a,c,b,d,e)})},E=function(a,b,c,d){var e=h.fromRangeStart(a.selection.getRng());return l.isEmpty(d)?y(a,d):C(a,c,b,d,e)},F=function(a,b,c){var d=e.fromDom(a.getBody());return w(d,c).fold(function(){return D(a,b,d,c)},function(c){return E(a,b,d,c)}).getOr(!1)},G=function(a,b){var c=e.fromDom(a.selection.getStart(!0));return a.selection.isCollapsed()?F(a,b,c):u(a,c)};return{backspaceDelete:G}}),g("2n",["3x","3y","3z","40","41","42"],function(a,b,c,d,e,f){var g=function(a,b){a.getDoc().execCommand(b,!1,null)},h=function(h){c.backspaceDelete(h,!1)||e.backspaceDelete(h,!1)||a.backspaceDelete(h,!1)||f.backspaceDelete(h)||b.backspaceDelete(h,!1)||(g(h,"Delete"),d.paddEmptyBody(h))},i=function(d){c.backspaceDelete(d,!0)||e.backspaceDelete(d,!0)||a.backspaceDelete(d,!0)||f.backspaceDelete(d)||b.backspaceDelete(d,!0)||g(d,"ForwardDelete")};return{deleteCommand:h,forwardDeleteCommand:i}}),g("m",["p","2m","2n","2b","f","k","26","1e"],function(a,b,c,d,e,f,g,h){var i=h.each,j=h.extend,k=h.map,l=h.inArray,m=h.explode,n=a.ie&&a.ie<11,o=!0,p=!1;return function(h){var q,r,s,t,u={state:{},exec:{},value:{}},v=h.settings;h.on("PreInit",function(){q=h.dom,r=h.selection,v=h.settings,s=h.formatter});var w=function(a,b,c,d){var e,f,j=0;if(!h.removed){if(/^(mceAddUndoLevel|mceEndUndoLevel|mceBeginUndoLevel|mceRepaint)$/.test(a)||d&&d.skip_focus?g.restore(h):h.focus(),d=h.fire("BeforeExecCommand",{command:a,ui:b,value:c}),d.isDefaultPrevented())return!1;if(f=a.toLowerCase(),e=u.exec[f])return e(f,b,c),h.fire("ExecCommand",{command:a,ui:b,value:c}),!0;if(i(h.plugins,function(d){if(d.execCommand&&d.execCommand(a,b,c))return h.fire("ExecCommand",{command:a,ui:b,value:c}),j=!0,!1}),j)return j;if(h.theme&&h.theme.execCommand&&h.theme.execCommand(a,b,c))return h.fire("ExecCommand",{command:a,ui:b,value:c}),!0;try{j=h.getDoc().execCommand(a,b,c)}catch(a){}return!!j&&(h.fire("ExecCommand",{command:a,ui:b,value:c}),!0)}},x=function(a){var b;if(!h.quirks.isHidden()&&!h.removed){if(a=a.toLowerCase(),b=u.state[a])return b(a);try{return h.getDoc().queryCommandState(a)}catch(a){}return!1}},y=function(a){var b;if(!h.quirks.isHidden()&&!h.removed){if(a=a.toLowerCase(),b=u.value[a])return b(a);try{return h.getDoc().queryCommandValue(a)}catch(a){}}},z=function(a,b){b=b||"exec",i(a,function(a,c){i(c.toLowerCase().split(","),function(c){u[b][c]=a})})},A=function(a,b,c){a=a.toLowerCase(),u.exec[a]=function(a,d,e,f){return b.call(c||h,d,e,f)}},B=function(a){if(a=a.toLowerCase(),u.exec[a])return!0;try{return h.getDoc().queryCommandSupported(a)}catch(a){}return!1},C=function(a,b,c){a=a.toLowerCase(),u.state[a]=function(){return b.call(c||h)}},D=function(a,b,c){a=a.toLowerCase(),u.value[a]=function(){return b.call(c||h)}},E=function(a){return a=a.toLowerCase(),!!u.exec[a]};j(this,{execCommand:w,queryCommandState:x,queryCommandValue:y,queryCommandSupported:B,addCommands:z,addCommand:A,addQueryStateHandler:C,addQueryValueHandler:D,hasCustomCommand:E});var F=function(a,b,c){return void 0===b&&(b=p),void 0===c&&(c=null),h.getDoc().execCommand(a,b,c)},G=function(a){return s.match(a)},H=function(a,b){s.toggle(a,b?{value:b}:void 0),h.nodeChanged()},I=function(a){t=r.getBookmark(a)},J=function(){r.moveToBookmark(t)};z({"mceResetDesignMode,mceBeginUndoLevel":function(){},"mceEndUndoLevel,mceAddUndoLevel":function(){h.undoManager.add()},"Cut,Copy,Paste":function(b){var c,d=h.getDoc();try{F(b)}catch(a){c=o}if("paste"!==b||d.queryCommandEnabled(b)||(c=!0),c||!d.queryCommandSupported(b)){var e=h.translate("Your browser doesn't support direct access to the clipboard. Please use the Ctrl+X/C/V keyboard shortcuts instead.");a.mac&&(e=e.replace(/Ctrl\+/g,"\u2318+")),h.notificationManager.open({text:e,type:"error"})}},unlink:function(){if(r.isCollapsed()){var a=h.dom.getParent(h.selection.getStart(),"a");return void(a&&h.dom.remove(a,!0))}s.remove("link")},"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull,JustifyNone":function(a){var b=a.substring(7);"full"==b&&(b="justify"),i("left,center,right,justify".split(","),function(a){b!=a&&s.remove("align"+a)}),"none"!=b&&H("align"+b)},"InsertUnorderedList,InsertOrderedList":function(a){var b,c;F(a),b=q.getParent(r.getNode(),"ol,ul"),b&&(c=b.parentNode,/^(H[1-6]|P|ADDRESS|PRE)$/.test(c.nodeName)&&(I(),q.split(c,b),J()))},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(a){H(a)},"ForeColor,HiliteColor,FontName":function(a,b,c){H(a,c)},FontSize:function(a,b,c){var d,e;c>=1&&c<=7&&(e=m(v.font_size_style_values),d=m(v.font_size_classes),c=d?d[c-1]||c:e[c-1]||c),H(a,c)},RemoveFormat:function(a){s.remove(a)},mceBlockQuote:function(){H("blockquote")},FormatBlock:function(a,b,c){return H(c||"p")},mceCleanup:function(){var a=r.getBookmark();h.setContent(h.getContent({cleanup:o}),{cleanup:o}),r.moveToBookmark(a)},mceRemoveNode:function(a,b,c){var d=c||r.getNode();d!=h.getBody()&&(I(),h.dom.remove(d,o),J())},mceSelectNodeDepth:function(a,b,c){var d=0;q.getParent(r.getNode(),function(a){if(1==a.nodeType&&d++==c)return r.select(a),p},h.getBody())},mceSelectNode:function(a,b,c){r.select(c)},mceInsertContent:function(a,c,d){b.insertAtCaret(h,d)},mceInsertRawHTML:function(a,b,c){r.setContent("tiny_mce_marker"),h.setContent(h.getContent().replace(/tiny_mce_marker/g,function(){return c}))},mceToggleFormat:function(a,b,c){H(c)},mceSetContent:function(a,b,c){h.setContent(c)},"Indent,Outdent":function(a){var b,c,d;b=v.indentation,c=/[a-z%]+$/i.exec(b),b=parseInt(b,10),x("InsertUnorderedList")||x("InsertOrderedList")?F(a):(v.forced_root_block||q.getParent(r.getNode(),q.isBlock)||s.apply("div"),i(r.getSelectedBlocks(),function(e){if("false"!==q.getContentEditable(e)&&"LI"!==e.nodeName){var f=h.getParam("indent_use_margin",!1)?"margin":"padding";f="TABLE"===e.nodeName?"margin":f,f+="rtl"==q.getStyle(e,"direction",!0)?"Right":"Left","outdent"==a?(d=Math.max(0,parseInt(e.style[f]||0,10)-b),q.setStyle(e,f,d?d+c:"")):(d=parseInt(e.style[f]||0,10)+b+c,q.setStyle(e,f,d))}}))},mceRepaint:function(){},InsertHorizontalRule:function(){h.execCommand("mceInsertContent",!1,"<hr />")},mceToggleVisualAid:function(){h.hasVisual=!h.hasVisual,h.addVisual()},mceReplaceContent:function(a,b,c){h.execCommand("mceInsertContent",!1,c.replace(/\{\$selection\}/g,r.getContent({format:"text"})))},mceInsertLink:function(a,b,c){var d;"string"==typeof c&&(c={href:c}),d=q.getParent(r.getNode(),"a"),c.href=c.href.replace(" ","%20"),d&&c.href||s.remove("link"),c.href&&s.apply("link",c,d)},selectAll:function(){var a=q.getParent(r.getStart(),d.isContentEditableTrue);if(a){var b=q.createRng();b.selectNodeContents(a),r.setRng(b)}},"delete":function(){c.deleteCommand(h)},forwardDelete:function(){c.forwardDeleteCommand(h)},mceNewDocument:function(){h.setContent("")},InsertLineBreak:function(a,b,c){var d,g,i,j=c,k=r.getRng(!0);new e(q).normalize(k);var l=k.startOffset,m=k.startContainer;if(1==m.nodeType&&m.hasChildNodes()){var p=l>m.childNodes.length-1;m=m.childNodes[Math.min(l,m.childNodes.length-1)]||m,l=p&&3==m.nodeType?m.nodeValue.length:0}var s=q.getParent(m,q.isBlock),t=s?s.nodeName.toUpperCase():"",u=s?q.getParent(s.parentNode,q.isBlock):null,v=u?u.nodeName.toUpperCase():"",w=j&&j.ctrlKey;"LI"!=v||w||(s=u,t=v);var x=function(){for(var a,b=new f(m,s),c=h.schema.getNonEmptyElements();a=b.next();)if(c[a.nodeName.toLowerCase()]||a.length>0)return!0};m&&3==m.nodeType&&l>=m.nodeValue.length&&(n||x()||(d=q.create("br"),k.insertNode(d),k.setStartAfter(d),k.setEndAfter(d),g=!0)),d=q.create("br"),k.insertNode(d);var y=q.doc.documentMode;return n&&"PRE"==t&&(!y||y<8)&&d.parentNode.insertBefore(q.doc.createTextNode("\r"),d),i=q.create("span",{},"&nbsp;"),d.parentNode.insertBefore(i,d),r.scrollIntoView(i),q.remove(i),g?(k.setStartBefore(d),k.setEndBefore(d)):(k.setStartAfter(d),k.setEndAfter(d)),r.setRng(k),h.undoManager.add(),o}}),z({"JustifyLeft,JustifyCenter,JustifyRight,JustifyFull":function(a){var b="align"+a.substring(7),c=r.isCollapsed()?[q.getParent(r.getNode(),q.isBlock)]:r.getSelectedBlocks(),d=k(c,function(a){return!!s.matchNode(a,b)});return l(d,o)!==-1},"Bold,Italic,Underline,Strikethrough,Superscript,Subscript":function(a){return G(a)},mceBlockQuote:function(){return G("blockquote")},Outdent:function(){var a;if(v.inline_styles){if((a=q.getParent(r.getStart(),q.isBlock))&&parseInt(a.style.paddingLeft,10)>0)return o;if((a=q.getParent(r.getEnd(),q.isBlock))&&parseInt(a.style.paddingLeft,10)>0)return o}return x("InsertUnorderedList")||x("InsertOrderedList")||!v.inline_styles&&!!q.getParent(r.getNode(),"BLOCKQUOTE")},"InsertUnorderedList,InsertOrderedList":function(a){var b=q.getParent(r.getNode(),"ul,ol");return b&&("insertunorderedlist"===a&&"UL"===b.tagName||"insertorderedlist"===a&&"OL"===b.tagName)}},"state"),z({"FontSize,FontName":function(a){var b,c=0;return(b=q.getParent(r.getNode(),"span"))&&(c="fontsize"==a?b.style.fontSize:b.style.fontFamily.replace(/, /g,",").replace(/[\'\"]/g,"").toLowerCase()),c}},"value"),z({Undo:function(){h.undoManager.undo()},Redo:function(){h.undoManager.redo()}})}}),g("16",["1e"],function(a){var b=a.makeMap("focus blur focusin focusout click dblclick mousedown mouseup mousemove mouseover beforepaste paste cut copy selectionchange mouseout mouseenter mouseleave wheel keydown keypress keyup input contextmenu dragstart dragend dragover draggesture dragdrop drop drag submit compositionstart compositionend compositionupdate touchstart touchmove touchend"," "),c=function(b){var c,d,e=this,f={},g=function(){return!1},h=function(){return!0};b=b||{},c=b.scope||e,d=b.toggleEvent||g;var i=function(a,d){var e,i,j,l;if(a=a.toLowerCase(),d=d||{},d.type=a,d.target||(d.target=c),d.preventDefault||(d.preventDefault=function(){d.isDefaultPrevented=h},d.stopPropagation=function(){d.isPropagationStopped=h},d.stopImmediatePropagation=function(){d.isImmediatePropagationStopped=h},d.isDefaultPrevented=g,d.isPropagationStopped=g,d.isImmediatePropagationStopped=g),b.beforeFire&&b.beforeFire(d),e=f[a])for(i=0,j=e.length;i<j;i++){if(l=e[i],l.once&&k(a,l.func),d.isImmediatePropagationStopped())return d.stopPropagation(),d;if(l.func.call(c,d)===!1)return d.preventDefault(),d}return d},j=function(b,c,h,i){var j,k,l;if(c===!1&&(c=g),c)for(c={func:c},i&&a.extend(c,i),k=b.toLowerCase().split(" "),l=k.length;l--;)b=k[l],j=f[b],j||(j=f[b]=[],d(b,!0)),h?j.unshift(c):j.push(c);return e},k=function(a,b){var c,g,h,i,j;if(a)for(i=a.toLowerCase().split(" "),c=i.length;c--;){if(a=i[c],g=f[a],!a){for(h in f)d(h,!1),delete f[h];return e}if(g){if(b)for(j=g.length;j--;)g[j].func===b&&(g=g.slice(0,j).concat(g.slice(j+1)),f[a]=g);else g.length=0;g.length||(d(a,!1),delete f[a])}}else{for(a in f)d(a,!1);f={}}return e},l=function(a,b,c){return j(a,b,c,{once:!0})},m=function(a){return a=a.toLowerCase(),!(!f[a]||0===f[a].length)};e.fire=i,e.on=j,e.off=k,e.once=l,e.has=m};return c.isNative=function(a){return!!b[a.toLowerCase()]},c}),g("1c",["16"],function(a){var b=function(b){return b._eventDispatcher||(b._eventDispatcher=new a({scope:b,toggleEvent:function(c,d){a.isNative(c)&&b.toggleNativeEvent&&b.toggleNativeEvent(c,d)}})),b._eventDispatcher};return{fire:function(a,c,d){var e=this;if(e.removed&&"remove"!==a)return c;if(c=b(e).fire(a,c,d),d!==!1&&e.parent)for(var f=e.parent();f&&!c.isPropagationStopped();)f.fire(a,c,!1),f=f.parent();return c},on:function(a,c,d){return b(this).on(a,c,d)},off:function(a,c){return b(this).off(a,c)},once:function(a,c){return b(this).once(a,c)},hasEventListeners:function(a){return b(this).has(a)}}}),g("o",["1c","d","1e"],function(a,b,c){var d,e=b.DOM,f=function(a,b){return"selectionchange"==b?a.getDoc():!a.inline&&/^mouse|touch|click|contextmenu|drop|dragover|dragend/.test(b)?a.getDoc().documentElement:a.settings.event_root?(a.eventRoot||(a.eventRoot=e.select(a.settings.event_root)[0]),a.eventRoot):a.getBody()},g=function(a,b){var c,g,h=function(a){return!a.hidden&&!a.readonly};if(a.delegates||(a.delegates={}),!a.delegates[b]&&!a.removed)if(c=f(a,b),a.settings.event_root){if(d||(d={},a.editorManager.on("removeEditor",function(){var b;if(!a.editorManager.activeEditor&&d){for(b in d)a.dom.unbind(f(a,b));d=null}})),d[b])return;g=function(c){for(var d=c.target,f=a.editorManager.get(),g=f.length;g--;){var i=f[g].getBody();(i===d||e.isChildOf(d,i))&&h(f[g])&&f[g].fire(b,c)}},d[b]=g,e.bind(c,b,g)}else g=function(c){h(a)&&a.fire(b,c)},e.bind(c,b,g),a.delegates[b]=g},h={bindPendingEventDelegates:function(){var a=this;c.each(a._pendingNativeEvents,function(b){g(a,b)})},toggleNativeEvent:function(a,b){var c=this;"focus"!=a&&"blur"!=a&&(b?c.initialized?g(c,a):c._pendingNativeEvents?c._pendingNativeEvents.push(a):c._pendingNativeEvents=[a]:c.initialized&&(c.dom.unbind(f(c,a),a,c.delegates[a]),delete c.delegates[a]))},unbindAllNativeEvents:function(){var a,b=this;if(b.delegates){for(a in b.delegates)b.dom.unbind(f(b,a),a,b.delegates[a]);delete b.delegates}b.inline||(b.getBody().onload=null,b.dom.unbind(b.getWin()),b.dom.unbind(b.getDoc())),b.dom.unbind(b.getBody()),b.dom.unbind(b.getContainer())}};return h=c.extend({},a,h)}),g("2u",["2","6"],function(a,b){var c=b.PluginManager,d=function(a,b){for(var d in c.urls){var e=c.urls[d]+"/plugin"+b+".js";if(e===a)return d}return null},e=function(a,b){var c=d(b,a.suffix);return c?"Failed to load plugin: "+c+" from url "+b:"Failed to load plugin url: "+b},f=function(a,b){a.notificationManager.open({type:"error",text:b})},g=function(a,b){a._skinLoaded?f(a,b):a.on("SkinLoaded",function(){f(a,b)})},h=function(a,b){g(a,"Failed to upload image: "+b)},i=function(a,b){g(a,e(a,b))},j=function(b){var c=a.console;c&&!a.test&&(c.error?c.error.apply(c,arguments):c.log.apply(c,arguments))};return{pluginLoadError:i,uploadError:h,displayError:g,initError:j}}),g("65",["1","1t","54","29"],function(a,b,c,d){var e=function(d){return c.descendant(b.fromDom(d.getBody()),"*[data-mce-caret]").fold(a.constant(null),function(a){return a.dom()})},f=function(a){a.selection.setRng(a.selection.getRng())},g=function(a,b){b.hasAttribute("data-mce-caret")&&(d.showCaretContainerBlock(b),f(a),a.selection.scrollIntoView(b))},h=function(a,b){var c=e(a);if(c)return"compositionstart"===b.type?(b.preventDefault(),b.stopPropagation(),void g(c)):void(d.hasContent(c)&&g(a,c))},i=function(b){b.on("keyup compositionstart",a.curry(h,b))};return{setup:i}}),g("2x",["30"],function(a){return function(){var b=a.getOrDie("XMLHttpRequest");return new b}}),g("6g",["2x","2","35","1d","1e"],function(a,b,c,d,e){return function(c,f){var g={},h=function(a,b){return a?a.replace(/\/$/,"")+"/"+b.replace(/^\//,""):b},i=function(c,d,e,g){var i,j;i=new a,i.open("POST",f.url),i.withCredentials=f.credentials,i.upload.onprogress=function(a){g(a.loaded/a.total*100)},i.onerror=function(){e("Image upload failed due to a XHR Transport error. Code: "+i.status)},i.onload=function(){var a;return i.status<200||i.status>=300?void e("HTTP Error: "+i.status):(a=JSON.parse(i.responseText),a&&"string"==typeof a.location?void d(h(f.basePath,a.location)):void e("Invalid JSON: "+i.responseText))},j=new b.FormData,j.append("file",c.blob(),c.filename()),i.send(j)},j=function(){return new d(function(a){a([])})},k=function(a,b){return{url:b,blobInfo:a,status:!0}},l=function(a,b){return{url:"",blobInfo:a,status:!1,error:b}},m=function(a,b){e.each(g[a],function(a){a(b)}),delete g[a]},n=function(a,b,e){return c.markPending(a.blobUri()),new d(function(d){var f,g,h=function(){};try{var i=function(){f&&(f.close(),g=h)},j=function(b){i(),c.markUploaded(a.blobUri(),b),m(a.blobUri(),k(a,b)),d(k(a,b))},n=function(b){i(),c.removeFailed(a.blobUri()),m(a.blobUri(),l(a,b)),d(l(a,b))};g=function(a){a<0||a>100||(f||(f=e()),f.progressBar.value(a))},b(a,j,n,g)}catch(b){d(l(a,b.message))}})},o=function(a){return a===i},p=function(a){var b=a.blobUri();return new d(function(a){g[b]=g[b]||[],g[b].push(a)})},q=function(a,b){return a=e.grep(a,function(a){return!c.isUploaded(a.blobUri())}),d.all(e.map(a,function(a){return c.isPending(a.blobUri())?p(a):n(a,f.handler,b)}))},r=function(a,b){return!f.url&&o(f.handler)?j():q(a,b)};return f=e.extend({credentials:!1,handler:i},f),{upload:r}}}),g("72",["30"],function(a){return function(b,c){var d=a.getOrDie("Blob");return new d(b,c)}});g("73",["30"],function(a){return function(){var b=a.getOrDie("FileReader");return new b}});g("74",["30"],function(a){return function(b){var c=a.getOrDie("Uint8Array");return new c(b)}}),g("75",["30"],function(a){var b=function(b){var c=a.getOrDie("requestAnimationFrame");c(b)},c=function(b){var c=a.getOrDie("atob");return c(b)};return{atob:c,requestAnimationFrame:b}}),g("6v",["72","73","74","75","2x","1d"],function(a,b,c,d,e,f){var g=function(a){return new f(function(b,c){var d=function(){c("Cannot convert "+a+" to Blob. Resource might not exist or is inaccessible.")};try{var f=new e;f.open("GET",a,!0),f.responseType="blob",f.onload=function(){200==this.status?b(this.response):d()},f.onerror=d,f.send()}catch(a){d()}})},h=function(a){var b,c;return a=decodeURIComponent(a).split(","),c=/data:([^;]+)/.exec(a[0]),c&&(b=c[1]),{type:b,data:a[1]}},i=function(b){return new f(function(e){var f,g,i;b=h(b);try{f=d.atob(b.data)}catch(b){return void e(new a([]))}for(g=new c(f.length),i=0;i<g.length;i++)g[i]=f.charCodeAt(i);e(new a([g],{type:b.type}))})},j=function(a){return 0===a.indexOf("blob:")?g(a):0===a.indexOf("data:")?i(a):null},k=function(a){return new f(function(c){var d=new b;d.onloadend=function(){c(d.result)},d.readAsDataURL(a)})};return{uriToBlob:j,blobToDataUri:k,parseDataUri:h}}),g("6h",["1d","1r","35","6v","p"],function(a,b,c,d,e){var f=0,g=function(a){return(a||"blobid")+f++},h=function(a,b,c,e){var f,h;return 0===b.src.indexOf("blob:")?(h=a.getByUri(b.src),void(h?c({image:b,blobInfo:h}):d.uriToBlob(b.src).then(function(e){d.blobToDataUri(e).then(function(i){f=d.parseDataUri(i).data,h=a.create(g(),e,f),a.add(h),c({image:b,blobInfo:h})})},function(a){e(a)}))):(f=d.parseDataUri(b.src).data,h=a.findFirst(function(a){return a.base64()===f}),void(h?c({image:b,blobInfo:h}):d.uriToBlob(b.src).then(function(d){h=a.create(g(),d,f),a.add(h),c({image:b,blobInfo:h})},function(a){e(a)})))},i=function(a){return a?a.getElementsByTagName("img"):[]};return function(d,f){var g={},j=function(j,k){var l,m;return k||(k=c.constant(!0)),l=b.filter(i(j),function(a){var b=a.src;return!!e.fileApi&&(!a.hasAttribute("data-mce-bogus")&&(!a.hasAttribute("data-mce-placeholder")&&(!(!b||b==e.transparentSrc)&&(0===b.indexOf("blob:")?!d.isUploaded(b):0===b.indexOf("data:")&&k(a)))))}),m=b.map(l,function(b){var c;return g[b.src]?new a(function(a){g[b.src].then(function(c){return"string"==typeof c?c:void a({image:b,blobInfo:c.blobInfo})})}):(c=new a(function(a,c){h(f,b,a,c)}).then(function(a){return delete g[a.image.src],a})["catch"](function(a){return delete g[b.src],a}),g[b.src]=c,c)}),a.all(m)};return{findAll:j}}}),g("2s",[],function(){var a=0,b=function(){var a=function(){return Math.round(4294967295*Math.random()).toString(36)},b=(new Date).getTime();return"s"+b.toString(36)+a()+a()+a()},c=function(c){return c+a++ +b()};return{uuid:c}}),g("6i",["1k","1r","35","2s"],function(a,b,c,d){return function(){var e=[],f=c.constant,g=function(a){var b={"image/jpeg":"jpg","image/jpg":"jpg","image/gif":"gif","image/png":"png"};return b[a.toLowerCase()]||"dat"},h=function(a,b,c,d){return i("object"==typeof a?a:{id:a,name:d,blob:b,base64:c})},i=function(b){var c,e;if(!b.blob||!b.base64)throw"blob and base64 representations of the image are required for BlobInfo to be created";return c=b.id||d.uuid("blobid"),e=b.name||c,{id:f(c),name:f(e),filename:f(e+"."+g(b.blob.type)),blob:f(b.blob),base64:f(b.base64),blobUri:f(b.blobUri||a.createObjectURL(b.blob)),uri:f(b.uri)}},j=function(a){k(a.id())||e.push(a)},k=function(a){return l(function(b){return b.id()===a})},l=function(a){return b.filter(e,a)[0]},m=function(a){return l(function(b){return b.blobUri()==a})},n=function(c){e=b.filter(e,function(b){return b.blobUri()!==c||(a.revokeObjectURL(b.blobUri()),!1)})},o=function(){b.each(e,function(b){a.revokeObjectURL(b.blobUri())}),e=[]};return{create:h,add:j,get:k,getByUri:m,findFirst:l,removeByUri:n,destroy:o}}}),g("6j",[],function(){return function(){var a=1,b=2,c={},d=function(a,b){return{status:a,resultUri:b}},e=function(a){return a in c},f=function(a){var b=c[a];return b?b.resultUri:null},g=function(b){return!!e(b)&&c[b].status===a},h=function(a){return!!e(a)&&c[a].status===b},i=function(b){c[b]=d(a,null)},j=function(a,e){c[a]=d(b,e)},k=function(a){delete c[a]},l=function(){c={}};return{hasBlobUri:e,getResultUri:f,isPending:g,isUploaded:h,markPending:i,markUploaded:j,removeFailed:k,destroy:l}}}),g("66",["1r","6g","6h","6i","6j","2u"],function(a,b,c,d,e,f){return function(g){var h,i,j=new d,k=g.settings,l=new e,m=function(a){return function(b){return g.selection?a(b):[]}},n=function(){return"?"+(new Date).getTime()},o=function(a,b,c){var d=0;do d=a.indexOf(b,d),d!==-1&&(a=a.substring(0,d)+c+a.substr(d+b.length),d+=c.length-b.length+1);while(d!==-1);return a},p=function(a,b,c){return a=o(a,'src="'+b+'"','src="'+c+'"'),a=o(a,'data-mce-src="'+b+'"','data-mce-src="'+c+'"')},q=function(b,c){a.each(g.undoManager.data,function(d){"fragmented"===d.type?d.fragments=a.map(d.fragments,function(a){return p(a,b,c)}):d.content=p(d.content,b,c)})},r=function(){return g.notificationManager.open({text:g.translate("Image uploading..."),type:"info",timeout:-1,progressBar:!0})},s=function(a,b){j.removeByUri(a.src),q(a.src,b),g.$(a).attr({src:k.images_reuse_filename?b+n():b,"data-mce-src":g.convertURL(b,"src")})},t=function(c){return h||(h=new b(l,{url:k.images_upload_url,basePath:k.images_upload_base_path,credentials:k.images_upload_credentials,handler:k.images_upload_handler})),w().then(m(function(b){var d;return d=a.map(b,function(a){return a.blobInfo}),h.upload(d,r).then(m(function(d){var e=a.map(d,function(a,c){var d=b[c].image;return a.status&&g.settings.images_replace_blob_uris!==!1?s(d,a.url):a.error&&f.uploadError(g,a.error),{element:d,status:a.status}});return c&&c(e),e}))}))},u=function(a){if(k.automatic_uploads!==!1)return t(a)},v=function(a){return!k.images_dataimg_filter||k.images_dataimg_filter(a)},w=function(){return i||(i=new c(l,j)),i.findAll(g.getBody(),v).then(m(function(b){return b=a.filter(b,function(a){return"string"!=typeof a||(f.displayError(g,a),!1)}),a.each(b,function(a){q(a.image.src,a.blobInfo.blobUri()),a.image.src=a.blobInfo.blobUri(),a.image.removeAttribute("data-mce-src")}),b}))},x=function(){j.destroy(),l.destroy(),i=h=null},y=function(b){return b.replace(/src="(blob:[^"]+)"/g,function(b,c){var d=l.getResultUri(c);if(d)return'src="'+d+'"';var e=j.getByUri(c);return e||(e=a.reduce(g.editorManager.get(),function(a,b){return a||b.editorUpload&&b.editorUpload.blobCache.getByUri(c)},null)),e?'src="data:'+e.blob().type+";base64,"+e.base64()+'"':b})};return g.on("setContent",function(){g.settings.automatic_uploads!==!1?u():w()}),g.on("RawSaveContent",function(a){a.content=y(a.content)}),g.on("getContent",function(a){a.source_view||"raw"==a.format||(a.content=y(a.content))}),g.on("PostRender",function(){g.parser.addNodeFilter("img",function(b){a.each(b,function(a){var b=a.attr("src");if(!j.getByUri(b)){var c=l.getResultUri(b);c&&a.attr("src",c)}})})}),{blobCache:j,uploadImages:t,uploadImagesAuto:u,scanForImages:w,destroy:x}}}),g("67",["1"],function(a){var b=function(a){var b,c,d,e,f,g,h,i,j,k,l,m=a.settings,n=a.dom,o=a.selection,p=a.schema,q=p.getBlockElements(),r=o.getStart(),s=a.getBody();if(l=m.forced_root_block,r&&1===r.nodeType&&l){for(;r&&r!==s;){if(q[r.nodeName])return;r=r.parentNode}b=o.getRng(),c=b.startContainer,d=b.startOffset,e=b.endContainer,f=b.endOffset;try{j=a.getDoc().activeElement===s}catch(a){}for(r=s.firstChild,k=s.nodeName.toLowerCase();r;)if((3===r.nodeType||1==r.nodeType&&!q[r.nodeName])&&p.isValidChild(k,l.toLowerCase())){if(3===r.nodeType&&0===r.nodeValue.length){h=r,r=r.nextSibling,n.remove(h);continue}g||(g=n.create(l,a.settings.forced_root_block_attrs),r.parentNode.insertBefore(g,r),i=!0),h=r,r=r.nextSibling,g.appendChild(h)}else g=null,r=r.nextSibling;i&&j&&(b.setStart(c,d),b.setEnd(e,f),o.setRng(b),a.nodeChanged())}},c=function(c){c.settings.forced_root_block&&c.on("NodeChange",a.curry(b,c))};return{setup:c}}),g("71",["1r","2b","37"],function(a,b,c){var d=function(e){var f=function(b){return a.map(b,function(a){return a=c.clone(a),a.node=e,a})};if(a.isArray(e))return a.reduce(e,function(a,b){return a.concat(d(b))},[]);if(b.isElement(e))return f(e.getClientRects());if(b.isText(e)){var g=e.ownerDocument.createRange();return g.setStart(e,0),g.setEnd(e,e.data.length),f(g.getClientRects())}};return{getClientRects:d}}),g("6q",["35","1r","2b","71","37","4e","36"],function(a,b,c,d,e,f,g){var h=c.isContentEditableFalse,i=f.findNode,j=a.curry,k=function(a,b){return Math.abs(a.left-b)},l=function(a,b){return Math.abs(a.right-b)},m=function(a,c){var d=function(a,b){return a>=b.left&&a<=b.right};return b.reduce(a,function(a,b){var e,f;return e=Math.min(k(a,c),l(a,c)),f=Math.min(k(b,c),l(b,c)),d(c,b)?b:d(c,a)?a:f==e&&h(b.node)?b:f<e?b:a})},n=function(a,b,c,d){for(;d=i(d,a,g.isEditableCaretCandidate,b);)if(c(d))return},o=function(a,c){var f=[],g=function(a,e){var g;return g=b.filter(d.getClientRects(e),function(b){return!a(b,c)}),f=f.concat(g),0===g.length};return f.push(c),n(-1,a,j(g,e.isAbove),c.node),n(1,a,j(g,e.isBelow),c.node),f},p=function(a){return b.filter(b.toArray(a.getElementsByTagName("*")),h)},q=function(a,b){return{node:a.node,before:k(a,b)<l(a,b)}},r=function(a,c,e){var f,g;return f=d.getClientRects(p(a)),f=b.filter(f,function(a){return e>=a.top&&e<=a.bottom}),g=m(f,c),g&&(g=m(o(a,g),c),g&&h(g.node))?q(g,c):null};return{findClosestClientRect:m,findLineNodeRects:o,closestCaret:r}}),g("76",["35","1r","71","36","4e","3t","2a","37"],function(a,b,c,d,e,f,g,h){var i=a.curry,j=function(a,b,c,f){for(;f=e.findNode(f,a,d.isEditableCaretCandidate,b);)if(c(f))return},k=function(a,d,e,f,g,h){var i,k,l=0,m=[],n=function(f){var h,i,j;for(j=c.getClientRects(f),a==-1&&(j=j.reverse()),h=0;h<j.length;h++)if(i=j[h],!e(i,k)){if(m.length>0&&d(i,b.last(m))&&l++,i.line=l,g(i))return!0;m.push(i)}};return(k=b.last(h.getClientRects()))?(i=h.getNode(),n(i),j(a,f,n,i),m):m},l=function(a,b){return b.line>a},m=function(a,b){return b.line===a},n=i(k,-1,h.isAbove,h.isBelow),o=i(k,1,h.isBelow,h.isAbove),p=function(a,c,d,e){var i,j,k,l,m,n,o=new f(c),p=[],q=0,r=function(c){return 1==a?b.last(c.getClientRects()):b.last(c.getClientRects())};1==a?(i=o.next,j=h.isBelow,k=h.isAbove,
l=g.after(e)):(i=o.prev,j=h.isAbove,k=h.isBelow,l=g.before(e)),n=r(l);do if(l.isVisible()&&(m=r(l),!k(m,n))){if(p.length>0&&j(m,b.last(p))&&q++,m=h.clone(m),m.position=l,m.line=q,d(m))return p;p.push(m)}while(l=i(l));return p};return{upUntil:n,downUntil:o,positionsUntil:p,isAboveLine:i(l),isLine:i(m)}}),g("6r",["2a","4e","2b","35"],function(a,b,c,d){var e=c.isContentEditableTrue,f=c.isContentEditableFalse,g=function(a,b,c,d){return b._selectionOverrides.showCaret(a,c,d)},h=function(a){var b=a.ownerDocument.createRange();return b.selectNode(a),b},i=function(a,b){var c;return c=a.fire("BeforeObjectSelected",{target:b}),c.isDefaultPrevented()?null:h(b)},j=function(c,h){var i,j;return h=b.normalizeRange(1,c.getBody(),h),i=a.fromRangeStart(h),f(i.getNode())?g(1,c,i.getNode(),!i.isAtEnd()):f(i.getNode(!0))?g(1,c,i.getNode(!0),!1):(j=c.dom.getParent(i.getNode(),d.or(f,e)),f(j)?g(1,c,j,!1):null)},k=function(a,b){var c;return b&&b.collapsed?(c=j(a,b),c?c:b):b};return{showCaret:g,selectNode:i,renderCaretAtRange:j,renderRangeCaret:k}}),g("6w",["29","2a","4e","3t","6q","76","2b","f","p","6r","1r","35"],function(a,b,c,d,e,f,g,h,i,j,k,l){var m=g.isContentEditableFalse,n=h.getSelectedNode,o=c.isAfterContentEditableFalse,p=c.isBeforeContentEditableFalse,q=function(a,b){for(;b=a(b);)if(b.isVisible())return b;return b},r=function(a,b){var d=c.isInSameBlock(a,b);return!(d||!g.isBr(a.getNode()))||d},s=function(b){return a.isCaretContainerBlock(b.startContainer)},t=function(a,d,e){return e=c.normalizeRange(a,d,e),a===-1?b.fromRangeStart(e):b.fromRangeEnd(e)},u=function(a,b,c,d,e){var f,g,h,i;return!e.collapsed&&(f=n(e),m(f))?j.showCaret(a,b,f,a===-1):(i=s(e),g=t(a,b.getBody(),e),d(g)?j.selectNode(b,g.getNode(a===-1)):(g=c(g))?d(g)?j.showCaret(a,b,g.getNode(a===-1),1===a):(h=c(g),d(h)&&r(g,h)?j.showCaret(a,b,h.getNode(a===-1),1===a):i?j.renderRangeCaret(b,g.toRange()):null):i?e:null)},v=function(a,b,c,d){var g,h,i,l,q,r,s,u,v;if(v=n(d),g=t(a,b.getBody(),d),h=c(b.getBody(),f.isAboveLine(1),g),i=k.filter(h,f.isLine(1)),q=k.last(g.getClientRects()),p(g)&&(v=g.getNode()),o(g)&&(v=g.getNode(!0)),!q)return null;if(r=q.left,l=e.findClosestClientRect(i,r),l&&m(l.node))return s=Math.abs(r-l.left),u=Math.abs(r-l.right),j.showCaret(a,b,l.node,s<u);if(v){var w=f.positionsUntil(a,b.getBody(),f.isAboveLine(1),v);if(l=e.findClosestClientRect(k.filter(w,f.isLine(1)),r))return j.renderRangeCaret(b,l.position.toRange());if(l=k.last(k.filter(w,f.isLine(0))))return j.renderRangeCaret(b,l.position.toRange())}},w=function(a){var b=a.dom.create(a.settings.forced_root_block);return(!i.ie||i.ie>=11)&&(b.innerHTML='<br data-mce-bogus="1">'),b},x=function(a,c,e){var f,g,h,i=new d(a.getBody()),j=l.curry(q,i.next),k=l.curry(q,i.prev);if(e.collapsed&&a.settings.forced_root_block){if(f=a.dom.getParent(e.startContainer,"PRE"),!f)return;g=1===c?j(b.fromRangeStart(e)):k(b.fromRangeStart(e)),g||(h=w(a),1===c?a.$(f).after(h):a.$(f).before(h),a.selection.select(h,!0),a.selection.collapse())}},y=function(a,b){var c,e=new d(a.getBody()),f=l.curry(q,e.next),g=l.curry(q,e.prev),h=b?1:-1,i=b?f:g,j=b?p:o,k=a.selection.getRng();return(c=u(h,a,i,j,k))?c:(c=x(a,h,k),c?c:null)},z=function(a,b){var c,d=b?1:-1,e=b?f.downUntil:f.upUntil,g=a.selection.getRng();return(c=v(d,a,e,g))?c:(c=x(a,d,g),c?c:null)},A=function(a,b){return function(){var c=y(a,b);return!!c&&(a.selection.setRng(c),!0)}},B=function(a,b){return function(){var c=z(a,b);return!!c&&(a.selection.setRng(c),!0)}};return{moveH:A,moveV:B}}),g("77",["2t","4","5"],function(a,b,c){var d=function(a,b){return b},e=function(b,c){var d=a.isObject(b)&&a.isObject(c);return d?g(b,c):c},f=function(a){return function(){for(var d=new b(arguments.length),e=0;e<d.length;e++)d[e]=arguments[e];if(0===d.length)throw new c("Can't merge zero objects");for(var f={},g=0;g<d.length;g++){var h=d[g];for(var i in h)h.hasOwnProperty(i)&&(f[i]=a(f[i],h[i]))}return f}},g=f(e),h=f(d);return{deepMerge:g,merge:h}}),g("6x",["1i","1","77"],function(a,b,c){var d=function(d){return a.map(d,function(a){return c.merge({shiftKey:!1,altKey:!1,ctrlKey:!1,metaKey:!1,keyCode:0,action:b.noop},a)})},e=function(a,b){return b.keyCode===a.keyCode&&b.shiftKey===a.shiftKey&&b.altKey===a.altKey&&b.ctrlKey===a.ctrlKey&&b.metaKey===a.metaKey},f=function(b,c){return a.bind(d(b),function(a){return e(a,c)?[a]:[]})},g=function(a){var b=Array.prototype.slice.call(arguments,1);return function(){return a.apply(null,b)}},h=function(b,c){return a.find(f(b,c),function(a){return a.action()})};return{match:f,action:g,execute:h}}),g("6k",["5h","6w","6x","1g"],function(a,b,c,d){var e=function(e,f,g){c.execute([{keyCode:d.RIGHT,action:b.moveH(e,!0)},{keyCode:d.LEFT,action:b.moveH(e,!1)},{keyCode:d.UP,action:b.moveV(e,!1)},{keyCode:d.DOWN,action:b.moveV(e,!0)},{keyCode:d.RIGHT,action:a.move(e,f,!0)},{keyCode:d.LEFT,action:a.move(e,f,!1)}],g).each(function(a){g.preventDefault()})},f=function(a,b){a.on("keydown",function(c){c.isDefaultPrevented()===!1&&e(a,b,c)})};return{setup:f}}),g("6l",["3x","3y","3z","41","42","6x","1g"],function(a,b,c,d,e,f,g){var h=function(h,i,j){f.execute([{keyCode:g.BACKSPACE,action:f.action(c.backspaceDelete,h,!1)},{keyCode:g.DELETE,action:f.action(c.backspaceDelete,h,!0)},{keyCode:g.BACKSPACE,action:f.action(d.backspaceDelete,h,i,!1)},{keyCode:g.DELETE,action:f.action(d.backspaceDelete,h,i,!0)},{keyCode:g.BACKSPACE,action:f.action(b.backspaceDelete,h,!1)},{keyCode:g.DELETE,action:f.action(b.backspaceDelete,h,!0)},{keyCode:g.BACKSPACE,action:f.action(a.backspaceDelete,h,!1)},{keyCode:g.DELETE,action:f.action(a.backspaceDelete,h,!0)},{keyCode:g.BACKSPACE,action:f.action(e.backspaceDelete,h,!1)},{keyCode:g.DELETE,action:f.action(e.backspaceDelete,h,!0)}],j).each(function(a){j.preventDefault()})},i=function(a,b){f.execute([{keyCode:g.BACKSPACE,action:f.action(c.paddEmptyElement,a)},{keyCode:g.DELETE,action:f.action(c.paddEmptyElement,a)}],b)},j=function(a,b){a.on("keydown",function(c){c.isDefaultPrevented()===!1&&h(a,b,c)}),a.on("keyup",function(b){b.isDefaultPrevented()===!1&&i(a,b)})};return{setup:j}}),g("6y",["29","2b","f","k","2c","1e"],function(a,b,c,d,e,f){var g=function(a){return a&&"A"===a.nodeName&&0===f.trim(e.trim(a.innerText||a.textContent)).length},h=function(a){return a&&/^(TD|TH|CAPTION)$/.test(a.nodeName)},i=function(a,b){return a.firstChild&&a.firstChild.nodeName==b},j=function(a,b){return a&&a.parentNode&&a.parentNode.nodeName===b},k=function(a){a.innerHTML='<br data-mce-bogus="1">'},l=function(a,b){return a.nodeName===b||a.previousSibling&&a.previousSibling.nodeName===b},m=function(a){return a&&/^(OL|UL|LI)$/.test(a.nodeName)},n=function(a){return m(a)&&m(a.parentNode)},o=function(a,b){return b&&a.isBlock(b)&&!/^(TD|TH|CAPTION|FORM)$/.test(b.nodeName)&&!/^(fixed|absolute)/i.test(b.style.position)&&"true"!==a.getContentEditable(b)},p=function(a,b,c){var d,e=c,f=[];if(e){for(;e=e.firstChild;){if(a.isBlock(e))return;1!=e.nodeType||b[e.nodeName.toLowerCase()]||f.push(e)}for(d=f.length;d--;)e=f[d],!e.hasChildNodes()||e.firstChild==e.lastChild&&""===e.firstChild.nodeValue?a.remove(e):g(e)&&a.remove(e)}},q=function(a,c,d){return b.isText(c)===!1?d:a?1===d&&c.data.charAt(d-1)===e.ZWSP?0:d:d===c.data.length-1&&c.data.charAt(d)===e.ZWSP?c.data.length:d},r=function(a){var b=a.cloneRange();return b.setStart(a.startContainer,q(!0,a.startContainer,a.startOffset)),b.setEnd(a.endContainer,q(!1,a.endContainer,a.endOffset)),b},s=function(a){for(;a;){if(1===a.nodeType||3===a.nodeType&&a.data&&/[\r\n\s]/.test(a.data))return a;a=a.nextSibling}},t=function(a,b){a.execCommand("InsertLineBreak",!1,b)},u=function(a){do 3===a.nodeType&&(a.nodeValue=a.nodeValue.replace(/^[\r\n]+/,"")),a=a.firstChild;while(a)},v=function(a,b){var c,d,e=a.getRoot();for(c=b;c!==e&&"false"!==a.getContentEditable(c);)"true"===a.getContentEditable(c)&&(d=c),c=c.parentNode;return c!==e?d:e},w=function(a,b){var c=a.settings.forced_root_block;c&&c.toLowerCase()===b.tagName.toLowerCase()&&a.dom.setAttribs(b,a.settings.forced_root_block_attrs)},x=function(a,b,c,d,e){var f,g,i,j,k,l,m=b||"P",n=a.dom,p=v(n,d);if(g=n.getParent(d,n.isBlock),!g||!o(n,g)){if(g=g||p,l=g==a.getBody()||h(g)?g.nodeName.toLowerCase():g.parentNode.nodeName.toLowerCase(),!g.hasChildNodes())return f=n.create(m),w(a,f),g.appendChild(f),c.setStart(f,0),c.setEnd(f,0),f;for(j=d;j.parentNode!=g;)j=j.parentNode;for(;j&&!n.isBlock(j);)i=j,j=j.previousSibling;if(i&&a.schema.isValidChild(l,m.toLowerCase())){for(f=n.create(m),w(a,f),i.parentNode.insertBefore(f,i),j=i;j&&!n.isBlock(j);)k=j.nextSibling,f.appendChild(j),j=k;c.setStart(d,e),c.setEnd(d,e)}}return d},y=function(a,b){var c;b.normalize(),c=b.lastChild,c&&!/^(left|right)$/gi.test(a.getStyle(c,"float",!0))||a.add(b,"br")},z=function(a){var b=a.parentNode;return/^(LI|DT|DD)$/.test(b.nodeName)?b:a},A=function(a,b,c){for(var d=a[c?"firstChild":"lastChild"];d&&1!=d.nodeType;)d=d[c?"nextSibling":"previousSibling"];return d===b},B=function(b,e){var f,g,h,m,B,C,D,E,F,G,H,I,J,K=b.dom,L=b.selection,M=b.settings,N=b.schema,O=N.getNonEmptyElements(),P=b.selection.getRng(),Q=function(a){var b,c,e,f,g=a,h=N.getMoveCaretBeforeOnEnterElements();if(a){if(/^(LI|DT|DD)$/.test(a.nodeName)){var i=s(a.firstChild);i&&/^(UL|OL|DL)$/.test(i.nodeName)&&a.insertBefore(K.doc.createTextNode("\xa0"),a.firstChild)}if(e=K.createRng(),a.normalize(),a.hasChildNodes()){for(b=new d(a,a);c=b.current();){if(3==c.nodeType){e.setStart(c,0),e.setEnd(c,0);break}if(h[c.nodeName.toLowerCase()]){e.setStartBefore(c),e.setEndBefore(c);break}g=c,c=b.next()}c||(e.setStart(g,0),e.setEnd(g,0))}else"BR"==a.nodeName?a.nextSibling&&K.isBlock(a.nextSibling)?(e.setStartBefore(a),e.setEndBefore(a)):(e.setStartAfter(a),e.setEndAfter(a)):(e.setStart(a,0),e.setEnd(a,0));L.setRng(e),K.remove(f),L.scrollIntoView(a)}},R=function(a){var c,d,e,f=h,i=N.getTextInlineElements();if(a||"TABLE"==G||"HR"==G?(c=K.create(a||I),w(b,c)):c=B.cloneNode(!1),e=c,M.keep_styles===!1)K.setAttrib(c,"style",null),K.setAttrib(c,"class",null);else do if(i[f.nodeName]){if("_mce_caret"==f.id)continue;d=f.cloneNode(!1),K.setAttrib(d,"id",""),c.hasChildNodes()?(d.appendChild(c.firstChild),c.appendChild(d)):(e=d,c.appendChild(d))}while((f=f.parentNode)&&f!=g);return k(e),c},S=function(a){var b,c,e,f;if(f=q(a,h,m),3==h.nodeType&&(a?f>0:f<h.nodeValue.length))return!1;if(h.parentNode==B&&J&&!a)return!0;if(a&&1==h.nodeType&&h==B.firstChild)return!0;if(l(h,"TABLE")||l(h,"HR"))return J&&!a||!J&&a;for(b=new d(h,B),3==h.nodeType&&(a&&0===f?b.prev():a||f!=h.nodeValue.length||b.next());c=b.current();){if(1===c.nodeType){if(!c.getAttribute("data-mce-bogus")&&(e=c.nodeName.toLowerCase(),O[e]&&"br"!==e))return!1}else if(3===c.nodeType&&!/^[ \t\r\n]*$/.test(c.nodeValue))return!1;a?b.prev():b.next()}return!0},T=function(){F!=b.getBody()&&(n(F)&&(I="LI"),D=I?R(I):K.create("BR"),A(F,B,!0)&&A(F,B,!1)?j(F,"LI")?K.insertAfter(D,z(F)):K.replace(D,F):A(F,B,!0)?j(F,"LI")?(K.insertAfter(D,z(F)),D.appendChild(K.doc.createTextNode(" ")),D.appendChild(F)):F.parentNode.insertBefore(D,F):A(F,B,!1)?K.insertAfter(D,z(F)):(F=z(F),f=P.cloneRange(),f.setStartAfter(B),f.setEndAfter(F),E=f.extractContents(),"LI"===I&&i(E,"LI")?(D=E.firstChild,K.insertAfter(E,F)):(K.insertAfter(E,F),K.insertAfter(D,F))),K.remove(B),Q(D))},U=function(){D=/^(H[1-6]|PRE|FIGURE)$/.test(G)&&"HGROUP"!=H?R(I):R(),M.end_container_on_empty_block&&o(K,F)&&K.isEmpty(B)?D=K.split(F,B):K.insertAfter(D,B),Q(D)};if(new c(K).normalize(P),h=P.startContainer,m=P.startOffset,I=(M.force_p_newlines?"p":"")||M.forced_root_block,I=I?I.toUpperCase():"",C=e.shiftKey,1==h.nodeType&&h.hasChildNodes()&&(J=m>h.childNodes.length-1,h=h.childNodes[Math.min(m,h.childNodes.length-1)]||h,m=J&&3==h.nodeType?h.nodeValue.length:0),g=v(K,h)){if(!K.isBlock(g)&&g!=K.getRoot())return void(I&&!C||t(b,e));if((I&&!C||!I&&C)&&(h=x(b,I,P,h,m)),B=K.getParent(h,K.isBlock),F=B?K.getParent(B.parentNode,K.isBlock):null,G=B?B.nodeName.toUpperCase():"",H=F?F.nodeName.toUpperCase():"","LI"!=H||e.ctrlKey||(B=F,F=F.parentNode,G=H),/^(LI|DT|DD)$/.test(G)){if(!I&&C)return void t(b,e);if(K.isEmpty(B))return void T()}if("PRE"==G&&M.br_in_pre!==!1){if(!C)return void t(b,e)}else if(!I&&!C&&"LI"!=G||I&&C)return void t(b,e);I&&B===b.getBody()||(I=I||"P",a.isCaretContainerBlock(B)?(D=a.showCaretContainerBlock(B),K.isEmpty(B)&&k(B),Q(D)):S()?U():S(!0)?(D=B.parentNode.insertBefore(R(),B),Q(l(B,"HR")?D:B)):(f=r(P).cloneRange(),f.setEndAfter(B),E=f.extractContents(),u(E),D=E.firstChild,K.insertAfter(E,B),p(K,O,D),y(K,B),K.isEmpty(B)&&k(B),D.normalize(),K.isEmpty(D)?(K.remove(D),U()):Q(D)),K.setAttrib(D,"id",""),b.fire("NewBlock",{newBlock:D}))}};return{insert:B}}),g("6m",["6y","1g"],function(a,b){var c=function(a){a.typing&&(a.typing=!1,a.add())},d=function(b,d){d.isDefaultPrevented()||(d.preventDefault(),c(b.undoManager),b.undoManager.transact(function(){b.selection.isCollapsed()===!1&&b.execCommand("Delete"),a.insert(b,d)}))},e=function(a){a.on("keydown",function(c){c.keyCode===b.ENTER&&d(a,c)})};return{setup:e}}),g("6z",["1","2a","2b","5g","5i"],function(a,b,c,d,e){var f=function(a,b){return j(a)&&c.isText(b.container())},g=function(a,b){var c=b.container(),d=b.offset();c.insertData(d,"\xa0"),a.selection.setCursorLocation(c,d+1)},h=function(a,b,c){return!!f(c,b)&&(g(a,b),!0)},i=function(c){var f=a.curry(e.isInlineTarget,c),g=b.fromRangeStart(c.selection.getRng()),i=d.readLocation(f,c.getBody(),g);return i.map(a.curry(h,c,g)).getOr(!1)},j=function(b){return b.fold(a.constant(!1),a.constant(!0),a.constant(!0),a.constant(!1))},k=function(a){return!!a.selection.isCollapsed()&&i(a)};return{insertAtSelection:k}}),g("6n",["6z","6x","1g"],function(a,b,c){var d=function(d,e){b.execute([{keyCode:c.SPACEBAR,action:b.action(a.insertAtSelection,d)}],e).each(function(a){e.preventDefault()})},e=function(a){a.on("keydown",function(b){b.isDefaultPrevented()===!1&&d(a,b)})};return{setup:e}}),g("68",["6k","5h","6l","6m","6n"],function(a,b,c,d,e){var f=function(f){var g=b.setupSelectedState(f);a.setup(f,g),c.setup(f,g),d.setup(f),e.setup(f)};return{setup:f}}),g("69",["f","p","15"],function(a,b,c){return function(d){var e,f=[],g=function(a){var b,c;if(c=d.$(a).parentsUntil(d.getBody()).add(a),c.length===f.length){for(b=c.length;b>=0&&c[b]===f[b];b--);if(b===-1)return f=c,!0}return f=c,!1};"onselectionchange"in d.getDoc()||d.on("NodeChange Click MouseUp KeyUp Focus",function(b){var c,f;c=d.selection.getRng(),f={startContainer:c.startContainer,startOffset:c.startOffset,endContainer:c.endContainer,endOffset:c.endOffset},"nodechange"!=b.type&&a.compareRanges(f,e)||d.fire("SelectionChange"),e=f}),d.on("contextmenu",function(){d.fire("SelectionChange")}),d.on("SelectionChange",function(){var a=d.selection.getStart(!0);!a||!b.range&&d.selection.isCollapsed()||!g(a)&&d.dom.isChildOf(a,d.getBody())&&d.nodeChanged({selectionChange:!0})}),d.on("MouseUp",function(a){a.isDefaultPrevented()||("IMG"==d.selection.getNode().nodeName?c.setEditorTimeout(d,function(){d.nodeChanged()}):d.nodeChanged())}),this.nodeChanged=function(a){var b,c,e,f=d.selection;d.initialized&&f&&!d.settings.disable_nodechange&&!d.readonly&&(e=d.getBody(),b=f.getStart(!0)||e,b.ownerDocument==d.getDoc()&&d.dom.isChildOf(b,e)||(b=e),c=[],d.dom.getParent(b,function(a){return a===e||void c.push(a)}),a=a||{},a.element=b,a.parents=c,d.fire("NodeChange",a))}}}),g("70",[],function(){var a=function(a){var b,c,d,e;return e=a.getBoundingClientRect(),b=a.ownerDocument,c=b.documentElement,d=b.defaultView,{top:e.top+d.pageYOffset-c.clientTop,left:e.left+d.pageXOffset-c.clientLeft}},b=function(b){return b.inline?a(b.getBody()):{left:0,top:0}},c=function(a){var b=a.getBody();return a.inline?{left:b.scrollLeft,top:b.scrollTop}:{left:0,top:0}},d=function(a){var b=a.getBody(),c=a.getDoc().documentElement,d={left:b.scrollLeft,top:b.scrollTop},e={left:b.scrollLeft||c.scrollLeft,top:b.scrollTop||c.scrollTop};return a.inline?d:e},e=function(b,c){if(c.target.ownerDocument!==b.getDoc()){var e=a(b.getContentAreaContainer()),f=d(b);return{left:c.pageX-e.left+f.left,top:c.pageY-e.top+f.top}}return{left:c.pageX,top:c.pageY}},f=function(a,b,c){return{pageX:c.left-a.left+b.left,pageY:c.top-a.top+b.top}},g=function(a,d){return f(b(a),c(a),e(a,d))};return{calc:g}}),g("6o",["1j","d","70","2b","1r","15","35"],function(a,b,c,d,e,f,g){var h=d.isContentEditableFalse,i=d.isContentEditableTrue,j=function(a,b){return h(b)&&b!==a},k=function(a,b,c){return b!==c&&!a.dom.isChildOf(b,c)&&!h(b)},l=function(a){var b=a.cloneNode(!0);return b.removeAttribute("data-mce-selected"),b},m=function(a,b,c,d){var e=b.cloneNode(!0);a.dom.setStyles(e,{width:c,height:d}),a.dom.setAttrib(e,"data-mce-selected",null);var f=a.dom.create("div",{"class":"mce-drag-container","data-mce-bogus":"all",unselectable:"on",contenteditable:"false"});return a.dom.setStyles(f,{position:"absolute",opacity:.5,overflow:"hidden",border:0,padding:0,margin:0,width:c,height:d}),a.dom.setStyles(e,{margin:0,boxSizing:"border-box"}),f.appendChild(e),f},n=function(a,b){a.parentNode!==b&&b.appendChild(a)},o=function(a,b,c,d,e,f){var g=0,h=0;a.style.left=b.pageX+"px",a.style.top=b.pageY+"px",b.pageX+c>e&&(g=b.pageX+c-e),b.pageY+d>f&&(h=b.pageY+d-f),a.style.width=c-g+"px",a.style.height=d-h+"px"},p=function(a){a&&a.parentNode&&a.parentNode.removeChild(a)},q=function(a){return 0===a.button},r=function(a){return a.element},s=function(a,b){return{pageX:b.pageX-a.relX,pageY:b.pageY+5}},t=function(a,b){return function(c){if(q(c)){var d=e.find(b.dom.getParents(c.target),g.or(h,i));if(j(b.getBody(),d)){var f=b.dom.getPos(d),k=b.getBody(),l=b.getDoc().documentElement;a.element=d,a.screenX=c.screenX,a.screenY=c.screenY,a.maxX=(b.inline?k.scrollWidth:l.offsetWidth)-2,a.maxY=(b.inline?k.scrollHeight:l.offsetHeight)-2,a.relX=c.pageX-f.x,a.relY=c.pageY-f.y,a.width=d.offsetWidth,a.height=d.offsetHeight,a.ghost=m(b,d,a.width,a.height)}}}},u=function(a,b){var d=f.throttle(function(a,c){b._selectionOverrides.hideFakeCaret(),b.selection.placeCaretAt(a,c)},0);return function(e){var f=Math.max(Math.abs(e.screenX-a.screenX),Math.abs(e.screenY-a.screenY));if(r(a)&&!a.dragging&&f>10){var g=b.fire("dragstart",{target:a.element});if(g.isDefaultPrevented())return;a.dragging=!0,b.focus()}if(a.dragging){var h=s(a,c.calc(b,e));n(a.ghost,b.getBody()),o(a.ghost,h,a.width,a.height,a.maxX,a.maxY),d(e.clientX,e.clientY)}}},v=function(a){var b=a.getSel().getRangeAt(0),c=b.startContainer;return 3===c.nodeType?c.parentNode:c},w=function(a,b){return function(c){if(a.dragging&&k(b,v(b.selection),a.element)){var d=l(a.element),e=b.fire("drop",{targetClone:d,clientX:c.clientX,clientY:c.clientY});e.isDefaultPrevented()||(d=e.targetClone,b.undoManager.transact(function(){p(a.element),b.insertContent(b.dom.getOuterHTML(d)),b._selectionOverrides.hideFakeCaret()}))}y(a)}},x=function(a,b){return function(){y(a),a.dragging&&b.fire("dragend")}},y=function(a){a.dragging=!1,a.element=null,p(a.ghost)},z=function(c){var d,e,f,g,h,i,j={};d=b.DOM,i=a,e=t(j,c),f=u(j,c),g=w(j,c),h=x(j,c),c.on("mousedown",e),c.on("mousemove",f),c.on("mouseup",g),d.bind(i,"mousemove",f),d.bind(i,"mouseup",h),c.on("remove",function(){d.unbind(i,"mousemove",f),d.unbind(i,"mouseup",h)})},A=function(a){a.on("drop",function(b){var c="undefined"!=typeof b.clientX?a.getDoc().elementFromPoint(b.clientX,b.clientY):null;(h(c)||h(a.dom.getContentEditableParent(c)))&&b.preventDefault()})},B=function(a){z(a),A(a)};return{init:B}}),g("6p",["1n","29","62","c","2b","37","15"],function(a,b,c,d,e,f,g){var h=e.isContentEditableFalse,i=function(a){return a&&/^(TD|TH)$/i.test(a.nodeName)};return function(e,j){var k,l,m=null,n=function(a,b){var c,d,g,h,i,j=f.collapse(a.getBoundingClientRect(),b);return"BODY"==e.tagName?(c=e.ownerDocument.documentElement,d=e.scrollLeft||c.scrollLeft,g=e.scrollTop||c.scrollTop):(i=e.getBoundingClientRect(),d=e.scrollLeft-i.left,g=e.scrollTop-i.top),j.left+=d,j.right+=d,j.top+=g,j.bottom+=g,j.width=1,h=a.offsetWidth-a.clientWidth,h>0&&(b&&(h*=-1),j.left+=h,j.right+=h),j},o=function(){var a,c,f,g,h;for(a=d("*[contentEditable=false]",e),g=0;g<a.length;g++)c=a[g],f=c.previousSibling,b.endsWithCaretContainer(f)&&(h=f.data,1==h.length?f.parentNode.removeChild(f):f.deleteData(h.length-1,1)),f=c.nextSibling,b.startsWithCaretContainer(f)&&(h=f.data,1==h.length?f.parentNode.removeChild(f):f.deleteData(0,1));return null},p=function(a,c){var f,g;return q(),i(c)?null:j(c)?(l=b.insertBlock("p",c,a),f=n(c,a),d(l).css("top",f.top),m=d('<div class="mce-visual-caret" data-mce-bogus="all"></div>').css(f).appendTo(e),a&&m.addClass("mce-visual-caret-before"),s(),g=c.ownerDocument.createRange(),g.setStart(l,0),g.setEnd(l,0),g):(l=b.insertInline(c,a),g=c.ownerDocument.createRange(),h(l.nextSibling)?(g.setStart(l,0),g.setEnd(l,0)):(g.setStart(l,1),g.setEnd(l,1)),g)},q=function(){o(),l&&(c.remove(l),l=null),m&&(m.remove(),m=null),a(k)},r=function(){return e.ownerDocument.activeElement===e},s=function(){k=g.setInterval(function(){r()?d("div.mce-visual-caret",e).toggleClass("mce-visual-caret-hidden"):d("div.mce-visual-caret",e).addClass("mce-visual-caret-hidden")},500)},t=function(){g.clearInterval(k)},u=function(){return".mce-visual-caret {position: absolute;background-color: black;background-color: currentcolor;}.mce-visual-caret-hidden {display: none;}*[data-mce-caret] {position: absolute;left: -1000px;right: auto;top: 0;margin: 0;padding: 0;}"};return{show:p,hide:q,getCss:u,destroy:t}}}),g("6a",["1i","4g","1t","4o","4i","54","6o","24","p","29","2a","4e","3t","6p","6q","3r","2b","2e","6r","15","1g"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u){var v=q.isContentEditableTrue,w=q.isContentEditableFalse,x=l.isAfterContentEditableFalse,y=l.isBeforeContentEditableFalse,z=function(q){var z,A=function(a){return q.dom.isBlock(a)},B=q.getBody(),C=new n(q.getBody(),A),D="sel-"+q.dom.uniqueId(),E=function(a){return q.dom.hasClass(a,"mce-offscreen-selection")},F=function(){var a=q.dom.get(D);return a?a.getElementsByTagName("*")[0]:a},G=function(a){a&&q.selection.setRng(a)},H=function(){return q.selection.getRng()},I=function(a,b){q.selection.scrollIntoView(a,b)},J=function(a,b,c){var d;return d=q.fire("ShowCaret",{target:b,direction:a,before:c}),d.isDefaultPrevented()?null:(I(b,a===-1),C.show(c,b))},K=function(a,b){return b=l.normalizeRange(a,B,b),a==-1?k.fromRangeStart(b):k.fromRangeEnd(b)},L=function(a){a.hasAttribute("data-mce-caret")&&(j.showCaretContainerBlock(a),G(H()),I(a[0]))},M=function(){var a=function(a){for(var b=q.getBody();a&&a!=b;){if(v(a)||w(a))return a;a=a.parentNode}return null};q.on("mouseup",function(a){var b=H();b.collapsed&&h.isXYInContentArea(q,a.clientX,a.clientY)&&G(s.renderCaretAtRange(q,b))}),q.on("click",function(b){var c;c=a(b.target),c&&(w(c)&&(b.preventDefault(),q.focus()),v(c)&&q.dom.isChildOf(c,q.selection.getNode())&&R())}),q.on("blur NewBlock",function(){R()});var b=function(b){var c=!1;b.on("touchstart",function(){c=!1}),b.on("touchmove",function(){c=!0}),b.on("touchend",function(d){var e=a(d.target);w(e)&&(c||(d.preventDefault(),Q(s.selectNode(b,e))))})},d=function(a){var b=new m(a);if(!a.firstChild)return!1;var c=k.before(a.firstChild),d=b.next(c);return d&&!y(d)&&!x(d)},e=function(a,b){var c=q.dom.getParent(a,q.dom.isBlock),d=q.dom.getParent(b,q.dom.isBlock);return c===d},f=function(a,b){var c=q.dom.getParent(a,q.dom.isBlock),f=q.dom.getParent(b,q.dom.isBlock);return c&&!e(c,f)&&d(c)};b(q),q.on("mousedown",function(b){var d;if(h.isXYInContentArea(q,b.clientX,b.clientY)!==!1)if(d=a(b.target))w(d)?(b.preventDefault(),Q(s.selectNode(q,d))):(R(),v(d)&&b.shiftKey||r.isXYWithinRange(b.clientX,b.clientY,q.selection.getRng())||(p.isVoid(c.fromDom(b.target))?q.selection.select(b.target):q.selection.placeCaretAt(b.clientX,b.clientY)));else{R(),T();var e=o.closestCaret(B,b.clientX,b.clientY);e&&(f(b.target,e.node)||(b.preventDefault(),q.getBody().focus(),G(J(1,e.node,e.before))))}}),q.on("keypress",function(a){if(!u.modifierPressed(a))switch(a.keyCode){default:w(q.selection.getNode())&&a.preventDefault()}}),q.on("getSelectionRange",function(a){var b=a.range;if(z){if(!z.parentNode)return void(z=null);b=b.cloneRange(),b.selectNode(z),a.range=b}}),q.on("setSelectionRange",function(a){var b;b=Q(a.range,a.forward),b&&(a.range=b)}),q.on("AfterSetSelectionRange",function(a){var b=a.range;P(b)||T(),E(b.startContainer.parentNode)||R()}),q.on("focus",function(){t.setEditorTimeout(q,function(){q.selection.setRng(s.renderRangeCaret(q,q.selection.getRng()))},0)}),q.on("copy",function(a){var b=a.clipboardData;if(!a.isDefaultPrevented()&&a.clipboardData&&!i.ie){var c=F();c&&(a.preventDefault(),b.clearData(),b.setData("text/html",c.outerHTML),b.setData("text/plain",c.outerText))}}),g.init(q)},N=function(){var a=q.contentStyles,b=".mce-content-body";a.push(C.getCss()),a.push(b+" .mce-offscreen-selection {position: absolute;left: -9999999999px;max-width: 1000000px;}"+b+" *[contentEditable=false] {cursor: default;}"+b+" *[contentEditable=true] {cursor: text;}")},O=function(a){return j.isCaretContainer(a)||j.startsWithCaretContainer(a)||j.endsWithCaretContainer(a)},P=function(a){return O(a.startContainer)||O(a.endContainer)},Q=function(b,g){var h,j,k,l,m,n,o,p,r,s,t=q.$,u=q.dom;if(!b)return null;if(b.collapsed){if(!P(b))if(g===!1){if(p=K(-1,b),w(p.getNode(!0)))return J(-1,p.getNode(!0),!1);if(w(p.getNode()))return J(-1,p.getNode(),!p.isAtEnd())}else{if(p=K(1,b),w(p.getNode()))return J(1,p.getNode(),!p.isAtEnd());if(w(p.getNode(!0)))return J(1,p.getNode(!0),!1)}return null}return l=b.startContainer,m=b.startOffset,n=b.endOffset,3==l.nodeType&&0==m&&w(l.parentNode)&&(l=l.parentNode,m=u.nodeIndex(l),l=l.parentNode),1!=l.nodeType?null:(n==m+1&&(h=l.childNodes[m]),w(h)?(r=s=h.cloneNode(!0),o=q.fire("ObjectSelected",{target:h,targetClone:r}),o.isDefaultPrevented()?null:(j=f.descendant(c.fromDom(q.getBody()),"#"+D).fold(function(){return t([])},function(a){return t([a.dom()])}),r=o.targetClone,0===j.length&&(j=t('<div data-mce-bogus="all" class="mce-offscreen-selection"></div>').attr("id",D),j.appendTo(q.getBody())),b=q.dom.createRng(),r===s&&i.ie?(j.empty().append('<p style="font-size: 0" data-mce-bogus="all">\xa0</p>').append(r),b.setStartAfter(j[0].firstChild.firstChild),b.setEndAfter(r)):(j.empty().append("\xa0").append(r).append("\xa0"),b.setStart(j[0].firstChild,1),b.setEnd(j[0].lastChild,0)),j.css({top:u.getPos(h,q.getBody()).y}),j[0].focus(),k=q.selection.getSel(),k.removeAllRanges(),k.addRange(b),a.each(e.descendants(c.fromDom(q.getBody()),"*[data-mce-selected]"),function(a){d.remove(a,"data-mce-selected")}),h.setAttribute("data-mce-selected",1),z=h,T(),b)):null)},R=function(){z&&(z.removeAttribute("data-mce-selected"),f.descendant(c.fromDom(q.getBody()),"#"+D).each(b.remove),z=null)},S=function(){C.destroy(),z=null},T=function(){C.hide()};return i.ceFalse&&(M(),N()),{showCaret:J,showBlockCaretContainer:L,hideFakeCaret:T,destroy:S}};return z}),g("5m",[],function(){var a=0,b=1,c=2,d=function(d,e){var f=d.length+e.length+2,g=new Array(f),h=new Array(f),i=function(a,b,c){return{start:a,end:b,diag:c}},j=function(f,g,h,i,k){var m=l(f,g,h,i);if(null===m||m.start===g&&m.diag===g-i||m.end===f&&m.diag===f-h)for(var n=f,o=h;n<g||o<i;)n<g&&o<i&&d[n]===e[o]?(k.push([a,d[n]]),++n,++o):g-f>i-h?(k.push([c,d[n]]),++n):(k.push([b,e[o]]),++o);else{j(f,m.start,h,m.start-m.diag,k);for(var p=m.start;p<m.end;++p)k.push([a,d[p]]);j(m.end,g,m.end-m.diag,i,k)}},k=function(a,b,c,f){for(var g=a;g-b<f&&g<c&&d[g]===e[g-b];)++g;return i(a,g,b)},l=function(a,b,c,f){var i=b-a,j=f-c;if(0===i||0===j)return null;var l=i-j,m=j+i,n=(m%2===0?m:m+1)/2;g[1+n]=a,h[1+n]=b+1;for(var o=0;o<=n;++o){for(var p=-o;p<=o;p+=2){var q=p+n;p===-o||p!=o&&g[q-1]<g[q+1]?g[q]=g[q+1]:g[q]=g[q-1]+1;for(var r=g[q],s=r-a+c-p;r<b&&s<f&&d[r]===e[s];)g[q]=++r,++s;if(l%2!=0&&l-o<=p&&p<=l+o&&h[q-l]<=g[q])return k(h[q-l],p+a-c,b,f)}for(p=l-o;p<=l+o;p+=2){for(q=p+n-l,p===l-o||p!=l+o&&h[q+1]<=h[q-1]?h[q]=h[q+1]-1:h[q]=h[q-1],r=h[q]-1,s=r-a+c-p;r>=a&&s>=c&&d[r]===e[s];)h[q]=r--,s--;if(l%2===0&&-o<=p&&p<=o&&h[q]<=g[q+l])return k(h[q],p+a-c,b,f)}}},m=[];return j(0,d.length,0,e.length,m),m};return{KEEP:a,DELETE:c,INSERT:b,diff:d}}),g("49",["1j","t","5m","1r"],function(a,b,c,d){var e=function(a){return 1===a.nodeType?a.outerHTML:3===a.nodeType?b.encodeRaw(a.data,!1):8===a.nodeType?"<!--"+a.data+"-->":""},f=function(b){var c,d,e;for(e=a.createElement("div"),c=a.createDocumentFragment(),b&&(e.innerHTML=b);d=e.firstChild;)c.appendChild(d);return c},g=function(a,b,c){var d=f(b);if(a.hasChildNodes()&&c<a.childNodes.length){var e=a.childNodes[c];e.parentNode.insertBefore(d,e)}else a.appendChild(d)},h=function(a,b){if(a.hasChildNodes()&&b<a.childNodes.length){var c=a.childNodes[b];c.parentNode.removeChild(c)}},i=function(a,b){var e=0;d.each(a,function(a){a[0]===c.KEEP?e++:a[0]===c.INSERT?(g(b,a[1],e),e++):a[0]===c.DELETE&&h(b,e)})},j=function(a){return d.filter(d.map(a.childNodes,e),function(a){return a.length>0})},k=function(a,b){var f=d.map(b.childNodes,e);return i(c.diff(f,a),b),b};return{read:j,write:k}}),g("2w",["1r","49"],function(a,b){var c=function(a){return a.indexOf("</iframe>")!==-1},d=function(a){return{type:"fragmented",fragments:a,content:"",bookmark:null,beforeBookmark:null}},e=function(a){return{type:"complete",fragments:null,content:a,bookmark:null,beforeBookmark:null}},f=function(f){var g,h,i;return g=b.read(f.getBody()),i=a.map(g,function(a){return f.serializer.trimContent(a)}),h=i.join(""),c(h)?d(i):e(h)},g=function(a,c,d){"fragmented"===c.type?b.write(c.fragments,a.getBody()):a.setContent(c.content,{format:"raw"}),a.selection.moveToBookmark(d?c.beforeBookmark:c.bookmark)},h=function(a){return"fragmented"===a.type?a.fragments.join(""):a.content},i=function(a,b){return!!a&&!!b&&h(a)===h(b)};return{createFragmentedLevel:d,createCompleteLevel:e,createFromEditor:f,applyToEditor:g,isEq:i}}),g("12",["1g","1e","2w"],function(a,b,c){return function(a){var d,e,f=this,g=0,h=[],i=0,j=function(){return 0===i},k=function(a){j()&&(f.typing=a)},l=function(b){a.setDirty(b)},m=function(a){k(!1),f.add({},a)},n=function(){f.typing&&(k(!1),f.add())};return a.on("init",function(){f.add()}),a.on("BeforeExecCommand",function(a){var b=a.command;"Undo"!==b&&"Redo"!==b&&"mceRepaint"!==b&&(n(),f.beforeChange())}),a.on("ExecCommand",function(a){var b=a.command;"Undo"!==b&&"Redo"!==b&&"mceRepaint"!==b&&m(a)}),a.on("ObjectResizeStart Cut",function(){f.beforeChange()}),a.on("SaveContent ObjectResized blur",m),a.on("DragEnd",m),a.on("KeyUp",function(b){var d=b.keyCode;b.isDefaultPrevented()||((d>=33&&d<=36||d>=37&&d<=40||45===d||b.ctrlKey)&&(m(),a.nodeChanged()),46!==d&&8!==d||a.nodeChanged(),e&&f.typing&&c.isEq(c.createFromEditor(a),h[0])===!1&&(a.isDirty()===!1&&(l(!0),a.fire("change",{level:h[0],lastLevel:null})),a.fire("TypingUndo"),e=!1,a.nodeChanged()))}),a.on("KeyDown",function(a){var b=a.keyCode;if(!a.isDefaultPrevented()){if(b>=33&&b<=36||b>=37&&b<=40||45===b)return void(f.typing&&m(a));var c=a.ctrlKey&&!a.altKey||a.metaKey;!(b<16||b>20)||224===b||91===b||f.typing||c||(f.beforeChange(),k(!0),f.add({},a),e=!0)}}),a.on("MouseDown",function(a){f.typing&&m(a)}),a.addShortcut("meta+z","","Undo"),a.addShortcut("meta+y,meta+shift+z","","Redo"),a.on("AddUndo Undo Redo ClearUndos",function(b){b.isDefaultPrevented()||a.nodeChanged()}),f={data:h,typing:!1,beforeChange:function(){j()&&(d=a.selection.getBookmark(2,!0))},add:function(e,f){var i,k,m,n=a.settings;if(m=c.createFromEditor(a),e=e||{},e=b.extend(e,m),j()===!1||a.removed)return null;if(k=h[g],a.fire("BeforeAddUndo",{level:e,lastLevel:k,originalEvent:f}).isDefaultPrevented())return null;if(k&&c.isEq(k,e))return null;if(h[g]&&(h[g].beforeBookmark=d),n.custom_undo_redo_levels&&h.length>n.custom_undo_redo_levels){for(i=0;i<h.length-1;i++)h[i]=h[i+1];h.length--,g=h.length}e.bookmark=a.selection.getBookmark(2,!0),g<h.length-1&&(h.length=g+1),h.push(e),g=h.length-1;var o={level:e,lastLevel:k,originalEvent:f};return a.fire("AddUndo",o),g>0&&(l(!0),a.fire("change",o)),e},undo:function(){var b;return f.typing&&(f.add(),f.typing=!1,k(!1)),g>0&&(b=h[--g],
c.applyToEditor(a,b,!0),l(!0),a.fire("undo",{level:b})),b},redo:function(){var b;return g<h.length-1&&(b=h[++g],c.applyToEditor(a,b,!1),l(!0),a.fire("redo",{level:b})),b},clear:function(){h=[],g=0,f.typing=!1,f.data=h,a.fire("ClearUndos")},hasUndo:function(){return g>0||f.typing&&h[0]&&!c.isEq(c.createFromEditor(a),h[0])},hasRedo:function(){return g<h.length-1&&!f.typing},transact:function(a){return n(),f.beforeChange(),f.ignore(a),f.add()},ignore:function(a){try{i++,a()}finally{i--}},extra:function(b,d){var e,i;f.transact(b)&&(i=h[g].bookmark,e=h[g-1],c.applyToEditor(a,e,!0),f.transact(d)&&(h[g-1].beforeBookmark=i))}}}}),g("6s",["d"],function(a){var b=function(b,c,d){for(var e=[];c&&c!=b;c=c.parentNode)e.push(a.nodeIndex(c,d));return e},c=function(a,b){var c,d,e;for(d=a,c=b.length-1;c>=0;c--){if(e=d.childNodes,b[c]>e.length-1)return null;d=e[b[c]]}return d};return{create:b,resolve:c}}),g("6b",["1j","2","29","2a","3t","6s","f","k","p","t","u","15","1e","1g"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n){return function(d){var e=m.each,f=n.BACKSPACE,h=n.DELETE,j=d.dom,k=d.selection,o=d.settings,p=d.parser,q=i.gecko,r=i.ie,s=i.webkit,t="data:text/mce-internal,",u=r?"Text":"URL",v=function(a,b){try{d.getDoc().execCommand(a,!1,b)}catch(a){}},w=function(a){return a.isDefaultPrevented()},x=function(a){var b,c;a.dataTransfer&&(d.selection.isCollapsed()&&"IMG"==a.target.tagName&&k.select(a.target),b=d.selection.getContent(),b.length>0&&(c=t+escape(d.id)+","+escape(b),a.dataTransfer.setData(u,c)))},y=function(a){var b;return a.dataTransfer&&(b=a.dataTransfer.getData(u),b&&b.indexOf(t)>=0)?(b=b.substr(t.length).split(","),{id:unescape(b[0]),html:unescape(b[1])}):null},z=function(a,b){d.queryCommandSupported("mceInsertClipboardContent")?d.execCommand("mceInsertClipboardContent",!1,{content:a,internal:b}):d.execCommand("mceInsertContent",!1,a)},A=function(){var a=function(a){var b=j.create("body"),c=a.cloneContents();return b.appendChild(c),k.serializer.serialize(b,{format:"html"})},b=function(b){var c=a(b),e=j.createRng();e.selectNode(d.getBody());var f=a(e);return c===f};d.on("keydown",function(a){var c,e,g=a.keyCode;if(!w(a)&&(g==h||g==f)){if(c=d.selection.isCollapsed(),e=d.getBody(),c&&!j.isEmpty(e))return;if(!c&&!b(d.selection.getRng()))return;a.preventDefault(),d.setContent(""),e.firstChild&&j.isBlock(e.firstChild)?d.selection.setCursorLocation(e.firstChild,0):d.selection.setCursorLocation(e,0),d.nodeChanged()}})},B=function(){d.shortcuts.add("meta+a",null,"SelectAll")},C=function(){d.settings.content_editable||j.bind(d.getDoc(),"mousedown mouseup",function(a){var b;if(a.target==d.getDoc().documentElement)if(b=k.getRng(),d.getBody().focus(),"mousedown"==a.type){if(c.isCaretContainer(b.startContainer))return;k.placeCaretAt(a.clientX,a.clientY)}else k.setRng(b)})},D=function(){d.on("keydown",function(a){if(!w(a)&&a.keyCode===f){if(!d.getBody().getElementsByTagName("hr").length)return;if(k.isCollapsed()&&0===k.getRng(!0).startOffset){var b=k.getNode(),c=b.previousSibling;if("HR"==b.nodeName)return j.remove(b),void a.preventDefault();c&&c.nodeName&&"hr"===c.nodeName.toLowerCase()&&(j.remove(c),a.preventDefault())}}})},E=function(){b.Range.prototype.getClientRects||d.on("mousedown",function(a){if(!w(a)&&"HTML"===a.target.nodeName){var b=d.getBody();b.blur(),l.setEditorTimeout(d,function(){b.focus()})}})},F=function(){d.on("click",function(a){var b=a.target;/^(IMG|HR)$/.test(b.nodeName)&&"false"!==j.getContentEditableParent(b)&&(a.preventDefault(),d.selection.select(b),d.nodeChanged()),"A"==b.nodeName&&j.hasClass(b,"mce-item-anchor")&&(a.preventDefault(),k.select(b))})},G=function(){var a=function(){var a=j.getAttribs(k.getStart().cloneNode(!1));return function(){var b=k.getStart();b!==d.getBody()&&(j.setAttrib(b,"style",null),e(a,function(a){b.setAttributeNode(a.cloneNode(!0))}))}},b=function(){return!k.isCollapsed()&&j.getParent(k.getStart(),j.isBlock)!=j.getParent(k.getEnd(),j.isBlock)};d.on("keypress",function(c){var e;if(!w(c)&&(8==c.keyCode||46==c.keyCode)&&b())return e=a(),d.getDoc().execCommand("delete",!1,null),e(),c.preventDefault(),!1}),j.bind(d.getDoc(),"cut",function(c){var e;!w(c)&&b()&&(e=a(),l.setEditorTimeout(d,function(){e()}))})},H=function(){d.on("keydown",function(a){if(!w(a)&&a.keyCode===f&&k.isCollapsed()&&0===k.getRng(!0).startOffset){var b=k.getNode().previousSibling;if(b&&b.nodeName&&"table"===b.nodeName.toLowerCase())return a.preventDefault(),!1}})},I=function(){d.on("keydown",function(a){var b,c,e,f,g;if(!w(a)&&a.keyCode==n.BACKSPACE&&(b=k.getRng(),c=b.startContainer,e=b.startOffset,f=j.getRoot(),g=c,b.collapsed&&0===e)){for(;g&&g.parentNode&&g.parentNode.firstChild==g&&g.parentNode!=f;)g=g.parentNode;"BLOCKQUOTE"===g.tagName&&(d.formatter.toggle("blockquote",null,g),b=j.createRng(),b.setStart(c,0),b.setEnd(c,0),k.setRng(b))}})},J=function(){var a=function(){W(),v("StyleWithCSS",!1),v("enableInlineTableEditing",!1),o.object_resizing||v("enableObjectResizing",!1)};o.readonly||d.on("BeforeExecCommand MouseDown",a)},K=function(){var a=function(){e(j.select("a"),function(a){var b=a.parentNode,c=j.getRoot();if(b.lastChild===a){for(;b&&!j.isBlock(b);){if(b.parentNode.lastChild!==b||b===c)return;b=b.parentNode}j.add(b,"br",{"data-mce-bogus":1})}})};d.on("SetContent ExecCommand",function(b){"setcontent"!=b.type&&"mceInsertLink"!==b.command||a()})},L=function(){o.forced_root_block&&d.on("init",function(){v("DefaultParagraphSeparator",o.forced_root_block)})},M=function(){d.on("keyup focusin mouseup",function(a){65==a.keyCode&&n.metaKeyPressed(a)||("keyup"!==a.type||d.selection.isCollapsed())&&k.normalize()},!0)},N=function(){d.contentStyles.push("img:-moz-broken {-moz-force-broken-image-icon:1;min-width:24px;min-height:24px}")},O=function(){d.inline||d.on("keydown",function(){a.activeElement==a.body&&d.getWin().focus()})},P=function(){d.inline||(d.contentStyles.push("body {min-height: 150px}"),d.on("click",function(a){var b;if("HTML"==a.target.nodeName){if(i.ie>11)return void d.getBody().focus();b=d.selection.getRng(),d.getBody().focus(),d.selection.setRng(b),d.selection.normalize(),d.nodeChanged()}}))},Q=function(){i.mac&&d.on("keydown",function(a){!n.metaKeyPressed(a)||a.shiftKey||37!=a.keyCode&&39!=a.keyCode||(a.preventDefault(),d.selection.getSel().modify("move",37==a.keyCode?"backward":"forward","lineboundary"))})},R=function(){v("AutoUrlDetect",!1)},S=function(){d.on("click",function(a){var b=a.target;do if("A"===b.tagName)return void a.preventDefault();while(b=b.parentNode)}),d.contentStyles.push(".mce-content-body {-webkit-touch-callout: none}")},T=function(){d.on("init",function(){d.dom.bind(d.getBody(),"submit",function(a){a.preventDefault()})})},U=function(){p.addNodeFilter("br",function(a){for(var b=a.length;b--;)"Apple-interchange-newline"==a[b].attr("class")&&a[b].remove()})},V=function(){d.on("dragstart",function(a){x(a)}),d.on("drop",function(a){if(!w(a)){var b=y(a);if(b&&b.id!=d.id){a.preventDefault();var c=g.getCaretRangeFromPoint(a.x,a.y,d.getDoc());k.setRng(c),z(b.html,!0)}}})},W=function(){},X=function(){var a;return!q||d.removed?0:(a=d.selection.getSel(),!a||!a.rangeCount||0===a.rangeCount)};return I(),A(),i.windowsPhone||M(),s&&(C(),F(),L(),T(),H(),U(),i.iOS?(O(),P(),S()):B()),i.ie>=11&&(P(),H()),i.ie&&(B(),R(),V()),q&&(D(),E(),G(),J(),K(),N(),Q(),H()),{refreshContentEditable:W,isHidden:X}}}),g("5l",["4f","1t","4o","1j","2","7","65","d","h","i","66","2u","67","s","u","w","68","69","6a","12","15","6b","1e"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w){var x=h.DOM,y=function(d,e){var f=b.fromDom(d.getDoc().head),g=b.fromTag("style");c.set(g,"type","text/css"),a.append(g,b.fromText(e)),a.append(f,g)},z=function(a){var b=new n(a.settings,a.schema);return b.addAttributeFilter("src,href,style,tabindex",function(b,c){for(var d,e,f,g=b.length,h=a.dom;g--;)if(d=b[g],e=d.attr(c),f="data-mce-"+c,!d.attributes.map[f]){if(0===e.indexOf("data:")||0===e.indexOf("blob:"))continue;"style"===c?(e=h.serializeStyle(h.parseStyle(e),d.name),e.length||(e=null),d.attr(f,e),d.attr(c,e)):"tabindex"===c?(d.attr(f,e),d.attr(c,null)):d.attr(f,a.convertURL(e,c,d.name))}}),b.addNodeFilter("script",function(a){for(var b,c,d=a.length;d--;)b=a[d],c=b.attr("type")||"no/type",0!==c.indexOf("mce-")&&b.attr("type","mce-"+c)}),b.addNodeFilter("#cdata",function(a){for(var b,c=a.length;c--;)b=a[c],b.type=8,b.name="#comment",b.value="[CDATA["+b.value+"]]"}),b.addNodeFilter("p,h1,h2,h3,h4,h5,h6,div",function(b){for(var c,d=b.length,e=a.schema.getNonEmptyElements();d--;)c=b[d],c.isEmpty(e)&&0===c.getAll("br").length&&(c.append(new o("br",1)).shortEnded=!0)}),b},A=function(a){a.settings.auto_focus&&u.setEditorTimeout(a,function(){var b;b=a.settings.auto_focus===!0?a:a.editorManager.get(a.settings.auto_focus),b.destroyed||b.focus()},100)},B=function(a){a.bindPendingEventDelegates(),a.initialized=!0,a.fire("init"),a.focus(!0),a.nodeChanged({initial:!0}),a.execCallback("init_instance_callback",a),A(a)},C=function(a){return a.inline?x.styleSheetLoader:a.dom.styleSheetLoader},D=function(a,b){var c,l,n=a.settings,o=a.getElement(),u=a.getDoc();n.inline||(a.getElement().style.visibility=a.orgVisibility),b||n.content_editable||(u.open(),u.write(a.iframeHTML),u.close()),n.content_editable&&(a.on("remove",function(){var a=this.getBody();x.removeClass(a,"mce-content-body"),x.removeClass(a,"mce-edit-focus"),x.setAttrib(a,"contentEditable",null)}),x.addClass(o,"mce-content-body"),a.contentDocument=u=n.content_document||d,a.contentWindow=n.content_window||e,a.bodyElement=o,n.content_document=n.content_window=null,n.root_name=o.nodeName.toLowerCase()),c=a.getBody(),c.disabled=!0,a.readonly=n.readonly,a.readonly||(a.inline&&"static"===x.getStyle(c,"position",!0)&&(c.style.position="relative"),c.contentEditable=a.getParam("content_editable_state",!0)),c.disabled=!1,a.editorUpload=new k(a),a.schema=new p(n),a.dom=new h(u,{keep_values:!0,url_converter:a.convertURL,url_converter_scope:a,hex_colors:n.force_hex_style_colors,class_filter:n.class_filter,update_styles:!0,root_element:a.inline?a.getBody():null,collect:n.content_editable,schema:a.schema,onSetAttrib:function(b){a.fire("SetAttrib",b)}}),a.parser=z(a),a.serializer=new j(n,a),a.selection=new i(a.dom,a.getWin(),a.serializer,a),a.formatter=new f(a),a.undoManager=new t(a),a._nodeChangeDispatcher=new r(a),a._selectionOverrides=new s(a),g.setup(a),q.setup(a),m.setup(a),a.fire("PreInit"),n.browser_spellcheck||n.gecko_spellcheck||(u.body.spellcheck=!1,x.setAttrib(c,"spellcheck","false")),a.quirks=new v(a),a.fire("PostRender"),n.directionality&&(c.dir=n.directionality),n.nowrap&&(c.style.whiteSpace="nowrap"),n.protect&&a.on("BeforeSetContent",function(a){w.each(n.protect,function(b){a.content=a.content.replace(b,function(a){return"<!--mce:protected "+escape(a)+"-->"})})}),a.on("SetContent",function(){a.addVisual(a.getBody())}),n.padd_empty_editor&&a.on("PostProcess",function(a){a.content=a.content.replace(/^(<p[^>]*>(&nbsp;|&#160;|\s|\u00a0|<br \/>|)<\/p>[\r\n]*|<br \/>[\r\n]*)$/,"")}),a.load({initial:!0,format:"html"}),a.startContent=a.getContent({format:"raw"}),a.on("compositionstart compositionend",function(b){a.composing="compositionstart"===b.type}),a.contentStyles.length>0&&(l="",w.each(a.contentStyles,function(a){l+=a+"\r\n"}),a.dom.addStyle(l)),C(a).loadAll(a.contentCSS,function(b){B(a)},function(b){B(a)}),n.content_style&&y(a,n.content_style)};return{initContentBody:D}}),g("47",["6"],function(a){return a.PluginManager}),g("48",["6"],function(a){return a.ThemeManager}),g("46",["2t","1j","2","d","p","5l","47","48","1e","2s"],function(a,b,c,d,e,f,g,h,i,j){var k=d.DOM,l=function(a,b,c){var d,e,f=g.get(c);if(d=g.urls[c]||a.documentBaseUrl.replace(/\/$/,""),c=i.trim(c),f&&i.inArray(b,c)===-1){if(i.each(g.dependencies(c),function(c){l(a,b,c)}),a.plugins[c])return;e=new f(a,d,a.$),a.plugins[c]=e,e.init&&(e.init(a,d),b.push(c))}},m=function(a){return a.replace(/^\-/,"")},n=function(a){var b=[];i.each(a.settings.plugins.split(/[ ,]/),function(c){l(a,b,m(c))})},o=function(b){var c,d=b.settings.theme;a.isString(d)?(b.settings.theme=m(d),c=h.get(d),b.theme=new c(b,h.urls[d]),b.theme.init&&b.theme.init(b,h.urls[d]||b.documentBaseUrl.replace(/\/$/,""),b.$)):b.theme={}},p=function(a){var b,c,d,e,f,g=a.settings,h=a.getElement();return b=g.width||k.getStyle(h,"width")||"100%",c=g.height||k.getStyle(h,"height")||h.offsetHeight,d=g.min_height||100,e=/^[0-9\.]+(|px)$/i,e.test(""+b)&&(b=Math.max(parseInt(b,10),100)),e.test(""+c)&&(c=Math.max(parseInt(c,10),d)),f=a.theme.renderUI({targetNode:h,width:b,height:c,deltaWidth:g.delta_width,deltaHeight:g.delta_height}),g.content_editable||(c=(f.iframeHeight||c)+("number"==typeof c?f.deltaHeight||0:""),c<d&&(c=d)),f.height=c,f},q=function(a){var b,c=a.getElement();return b=a.settings.theme(a,c),b.editorContainer.nodeType&&(b.editorContainer.id=b.editorContainer.id||a.id+"_parent"),b.iframeContainer&&b.iframeContainer.nodeType&&(b.iframeContainer.id=b.iframeContainer.id||a.id+"_iframecontainer"),b.height=b.iframeHeight?b.iframeHeight:c.offsetHeight,b},r=function(a){return{editorContainer:a,iframeContainer:a}},s=function(a){var b=k.create("div");return k.insertAfter(b,a),r(b)},t=function(a){var b=a.getElement();return a.inline?r(b):s(b)},u=function(b){var c=b.settings,d=b.getElement();return b.orgDisplay=d.style.display,a.isString(c.theme)?p(b):a.isFunction(c.theme)?q(b):t(b)},v=function(a,d){if(b.domain!==c.location.hostname&&e.ie&&e.ie<12){var g=j.uuid("mce");a[g]=function(){f.initContentBody(a)};var h='javascript:(function(){document.open();document.domain="'+b.domain+'";var ed = window.parent.tinymce.get("'+a.id+'");document.write(ed.iframeHTML);document.close();ed.'+g+"(true);})()";return k.setAttrib(d,"src",h),!0}return!1},w=function(a,b){var c,d,f=a.settings;a.iframeHTML=f.doctype+"<html><head>",f.document_base_url!=a.documentBaseUrl&&(a.iframeHTML+='<base href="'+a.documentBaseURI.getURI()+'" />'),!e.caretAfter&&f.ie7_compat&&(a.iframeHTML+='<meta http-equiv="X-UA-Compatible" content="IE=7" />'),a.iframeHTML+='<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',c=f.body_id||"tinymce",c.indexOf("=")!=-1&&(c=a.getParam("body_id","","hash"),c=c[a.id]||c),d=f.body_class||"",d.indexOf("=")!=-1&&(d=a.getParam("body_class","","hash"),d=d[a.id]||""),f.content_security_policy&&(a.iframeHTML+='<meta http-equiv="Content-Security-Policy" content="'+f.content_security_policy+'" />'),a.iframeHTML+='</head><body id="'+c+'" class="mce-content-body '+d+'" data-id="'+a.id+'"><br></body></html>';var g=k.create("iframe",{id:a.id+"_ifr",frameBorder:"0",allowTransparency:"true",title:a.editorManager.translate("Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help"),style:{width:"100%",height:b.height,display:"block"}});g.onload=function(){g.onload=null,a.fire("load")};var h=v(a,g);return a.contentAreaContainer=b.iframeContainer,a.iframeElement=g,k.add(b.iframeContainer,g),h},x=function(a){var b,c=a.settings,d=a.getElement();if(a.rtl=c.rtl_ui||a.editorManager.i18n.rtl,a.editorManager.i18n.setCode(c.language),c.aria_label=c.aria_label||k.getAttrib(d,"aria-label",a.getLang("aria.rich_text_area")),a.fire("ScriptsLoaded"),o(a),n(a),b=u(a),a.editorContainer=b.editorContainer,c.content_css&&i.each(i.explode(c.content_css),function(b){a.contentCSS.push(a.documentBaseURI.toAbsolute(b))}),c.content_editable)return f.initContentBody(a);var e=w(a,b);b.editorContainer&&(k.get(b.editorContainer).style.display=a.orgDisplay,a.hidden=k.isHidden(b.editorContainer)),a.getElement().style.display="none",k.setAttrib(a.id,"aria-hidden",!0),e||f.initContentBody(a)};return{init:x}}),g("2p",["2t","2","8","9","d","e","g","p","2u","46","47","48","1e"],function(a,b,c,d,e,f,g,h,i,j,k,l,m){var n=e.DOM,o=function(a){return"-"===a.charAt(0)},p=function(a,b){var c=b.settings;c.language&&"en"!==c.language&&!c.language_url&&(c.language_url=b.editorManager.baseURL+"/langs/"+c.language+".js"),c.language_url&&a.add(c.language_url)},q=function(b,c,d,e){var f=c.settings,g=f.theme;if(a.isString(g)){if(!o(g)&&!l.urls.hasOwnProperty(g)){var h=f.theme_url;h?l.load(g,c.documentBaseURI.toAbsolute(h)):l.load(g,"themes/"+g+"/theme"+d+".js")}b.loadQueue(function(){l.waitFor(g,e)})}else e()},r=function(a,b){m.isArray(a.plugins)&&(a.plugins=a.plugins.join(" ")),m.each(a.external_plugins,function(b,c){k.load(c,b),a.plugins+=" "+c}),m.each(a.plugins.split(/[ ,]/),function(a){if(a=m.trim(a),a&&!k.urls[a])if(o(a)){a=a.substr(1,a.length);var c=k.dependencies(a);m.each(c,function(a){var c={prefix:"plugins/",resource:a,suffix:"/plugin"+b+".js"};a=k.createUrl(c,a),k.load(a.resource,a)})}else k.load(a,{prefix:"plugins/",resource:a,suffix:"/plugin"+b+".js"})})},s=function(a,b){var c=g.ScriptLoader;q(c,a,b,function(){p(c,a),r(a.settings,b),c.loadQueue(function(){a.removed||j.init(a)},a,function(b){i.pluginLoadError(a,b[0]),a.removed||j.init(a)})})},t=function(a){var e=a.settings,g=a.id,i=function(){n.unbind(b,"ready",i),a.render()};if(!f.Event.domLoaded)return void n.bind(b,"ready",i);if(a.getElement()&&h.contentEditable){e.inline?a.inline=!0:(a.orgVisibility=a.getElement().style.visibility,a.getElement().style.visibility="hidden");var j=a.getElement().form||n.getParent(g,"form");j&&(a.formElement=j,e.hidden_input&&!/TEXTAREA|INPUT/i.test(a.getElement().nodeName)&&(n.insertAfter(n.create("input",{type:"hidden",name:g}),g),a.hasHiddenInput=!0),a.formEventDelegate=function(b){a.fire(b.type,b)},n.bind(j,"submit reset",a.formEventDelegate),a.on("reset",function(){a.setContent(a.startContent,{format:"raw"})}),!e.submit_patch||j.submit.nodeType||j.submit.length||j._mceOldSubmit||(j._mceOldSubmit=j.submit,j.submit=function(){return a.editorManager.triggerSave(),a.setDirty(!1),j._mceOldSubmit(j)})),a.windowManager=new d(a),a.notificationManager=new c(a),"xml"===e.encoding&&a.on("GetContent",function(a){a.save&&(a.content=n.encode(a.content))}),e.add_form_submit_trigger&&a.on("submit",function(){a.initialized&&a.save()}),e.add_unload_trigger&&(a._beforeUnload=function(){!a.initialized||a.destroyed||a.isHidden()||a.save({format:"raw",no_events:!0,set_dirty:!1})},a.editorManager.on("BeforeUnload",a._beforeUnload)),a.editorManager.add(a),s(a,a.suffix)}};return{render:t}}),g("2q",[],function(){var a=function(a,b,c){try{a.getDoc().execCommand(b,!1,c)}catch(a){}},b=function(a){var b,c;return b=a.getBody(),c=function(b){a.dom.getParents(b.target,"a").length>0&&b.preventDefault()},a.dom.bind(b,"click",c),{unbind:function(){a.dom.unbind(b,"click",c)}}},c=function(c,d){c._clickBlocker&&(c._clickBlocker.unbind(),c._clickBlocker=null),d?(c._clickBlocker=b(c),c.selection.controlSelection.hideResizeRect(),c.readonly=!0,c.getBody().contentEditable=!1):(c.readonly=!1,c.getBody().contentEditable=!0,a(c,"StyleWithCSS",!1),a(c,"enableInlineTableEditing",!1),a(c,"enableObjectResizing",!1),c.focus(),c.nodeChanged())},d=function(a,b){var d=a.readonly?"readonly":"design";b!=d&&(a.initialized?c(a,"readonly"==b):a.on("init",function(){c(a,"readonly"==b)}),a.fire("SwitchMode",{mode:b}))};return{setMode:d}}),g("10",["1e","p"],function(a,b){var c=a.each,d=a.explode,e={f9:120,f10:121,f11:122},f=a.makeMap("alt,ctrl,shift,meta,access");return function(g){var h=this,i={},j=[],k=function(a){var g,h,i={};c(d(a,"+"),function(a){a in f?i[a]=!0:/^[0-9]{2,}$/.test(a)?i.keyCode=parseInt(a,10):(i.charCode=a.charCodeAt(0),i.keyCode=e[a]||a.toUpperCase().charCodeAt(0))}),g=[i.keyCode];for(h in f)i[h]?g.push(h):i[h]=!1;return i.id=g.join(","),i.access&&(i.alt=!0,b.mac?i.ctrl=!0:i.shift=!0),i.meta&&(b.mac?i.meta=!0:(i.ctrl=!0,i.meta=!1)),i},l=function(b,c,e,f){var h;return h=a.map(d(b,">"),k),h[h.length-1]=a.extend(h[h.length-1],{func:e,scope:f||g}),a.extend(h[0],{desc:g.translate(c),subpatterns:h.slice(1)})},m=function(a){return a.altKey||a.ctrlKey||a.metaKey},n=function(a){return"keydown"===a.type&&a.keyCode>=112&&a.keyCode<=123},o=function(a,b){return!!b&&(b.ctrl==a.ctrlKey&&b.meta==a.metaKey&&(b.alt==a.altKey&&b.shift==a.shiftKey&&(!!(a.keyCode==b.keyCode||a.charCode&&a.charCode==b.charCode)&&(a.preventDefault(),!0))))},p=function(a){return a.func?a.func.call(a.scope):null};g.on("keyup keypress keydown",function(a){!m(a)&&!n(a)||a.isDefaultPrevented()||(c(i,function(b){if(o(a,b))return j=b.subpatterns.slice(0),"keydown"==a.type&&p(b),!0}),o(a,j[0])&&(1===j.length&&"keydown"==a.type&&p(j[0]),j.shift()))}),h.add=function(b,e,f,h){var j;return j=f,"string"==typeof f?f=function(){g.execCommand(j,!1,null)}:a.isArray(j)&&(f=function(){g.execCommand(j[0],j[1],j[2])}),c(d(a.trim(b.toLowerCase())),function(a){var b=l(a,e,f,h);i[b.id]=b}),!0},h.remove=function(a){var b=l(a);return!!i[b.id]&&(delete i[b.id],!0)}}}),g("2r",[],function(){var a=function(a,b,c){var d=a.sidebars?a.sidebars:[];d.push({name:b,settings:c}),a.sidebars=d};return{add:a}}),g("1f",["1j","1e"],function(a,b){var c=b.each,d=b.trim,e="source protocol authority userInfo user password host port relative path directory file query anchor".split(" "),f={ftp:21,http:80,https:443,mailto:25},g=function(b,f){var h,i,j=this;if(b=d(b),f=j.settings=f||{},h=f.base_uri,/^([\w\-]+):([^\/]{2})/i.test(b)||/^\s*#/.test(b))return void(j.source=b);var k=0===b.indexOf("//");0!==b.indexOf("/")||k||(b=(h?h.protocol||"http":"http")+"://mce_host"+b),/^[\w\-]*:?\/\//.test(b)||(i=f.base_uri?f.base_uri.path:new g(a.location.href).directory,""===f.base_uri.protocol?b="//mce_host"+j.toAbsPath(i,b):(b=/([^#?]*)([#?]?.*)/.exec(b),b=(h&&h.protocol||"http")+"://mce_host"+j.toAbsPath(i,b[1])+b[2])),b=b.replace(/@@/g,"(mce_at)"),b=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@\/]*):?([^:@\/]*))?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/.exec(b),c(e,function(a,c){var d=b[c];d&&(d=d.replace(/\(mce_at\)/g,"@@")),j[a]=d}),h&&(j.protocol||(j.protocol=h.protocol),j.userInfo||(j.userInfo=h.userInfo),j.port||"mce_host"!==j.host||(j.port=h.port),j.host&&"mce_host"!==j.host||(j.host=h.host),j.source=""),k&&(j.protocol="")};return g.prototype={setPath:function(a){var b=this;a=/^(.*?)\/?(\w+)?$/.exec(a),b.path=a[0],b.directory=a[1],b.file=a[2],b.source="",b.getURI()},toRelative:function(a){var b,c=this;if("./"===a)return a;if(a=new g(a,{base_uri:c}),"mce_host"!=a.host&&c.host!=a.host&&a.host||c.port!=a.port||c.protocol!=a.protocol&&""!==a.protocol)return a.getURI();var d=c.getURI(),e=a.getURI();return d==e||"/"==d.charAt(d.length-1)&&d.substr(0,d.length-1)==e?d:(b=c.toRelPath(c.path,a.path),a.query&&(b+="?"+a.query),a.anchor&&(b+="#"+a.anchor),b)},toAbsolute:function(a,b){return a=new g(a,{base_uri:this}),a.getURI(b&&this.isSameOrigin(a))},isSameOrigin:function(a){if(this.host==a.host&&this.protocol==a.protocol){if(this.port==a.port)return!0;var b=f[this.protocol];if(b&&(this.port||b)==(a.port||b))return!0}return!1},toRelPath:function(a,b){var c,d,e,f=0,g="";if(a=a.substring(0,a.lastIndexOf("/")),a=a.split("/"),c=b.split("/"),a.length>=c.length)for(d=0,e=a.length;d<e;d++)if(d>=c.length||a[d]!=c[d]){f=d+1;break}if(a.length<c.length)for(d=0,e=c.length;d<e;d++)if(d>=a.length||a[d]!=c[d]){f=d+1;break}if(1===f)return b;for(d=0,e=a.length-(f-1);d<e;d++)g+="../";for(d=f-1,e=c.length;d<e;d++)g+=d!=f-1?"/"+c[d]:c[d];return g},toAbsPath:function(a,b){var d,e,f,g=0,h=[];for(e=/\/$/.test(b)?"/":"",a=a.split("/"),b=b.split("/"),c(a,function(a){a&&h.push(a)}),a=h,d=b.length-1,h=[];d>=0;d--)0!==b[d].length&&"."!==b[d]&&(".."!==b[d]?g>0?g--:h.push(b[d]):g++);return d=a.length-g,f=d<=0?h.reverse().join("/"):a.slice(0,d).join("/")+"/"+h.reverse().join("/"),0!==f.indexOf("/")&&(f="/"+f),e&&f.lastIndexOf("/")!==f.length-1&&(f+=e),f},getURI:function(a){var b,c=this;return c.source&&!a||(b="",a||(b+=c.protocol?c.protocol+"://":"//",c.userInfo&&(b+=c.userInfo+"@"),c.host&&(b+=c.host),c.port&&(b+=":"+c.port)),c.path&&(b+=c.path),c.query&&(b+="?"+c.query),c.anchor&&(b+="#"+c.anchor),c.source=b),c.source}},g.parseDataUri=function(a){var b,c;return a=decodeURIComponent(a).split(","),c=/data:([^;]+)/.exec(a[0]),c&&(b=c[1]),{type:b,data:a[1]}},g.getDocumentBaseUrl=function(a){var b;return b=0!==a.protocol.indexOf("http")&&"file:"!==a.protocol?a.href:a.protocol+"//"+a.host+a.pathname,/^[^:]+:\/\/\/?[^\/]+\//.test(b)&&(b=b.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(b)||(b+="/")),b},g}),g("l",["6","c","d","m","2g","o","2o","p","x","2p","2q","10","2r","1e","1f","2s"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p){var q=c.DOM,r=n.extend,s=n.each,t=n.trim,u=n.resolve,v=h.ie,w=function(c,e,f){var i,j,k=this;i=k.documentBaseUrl=f.documentBaseURL,j=f.baseURI,e=g.getEditorSettings(k,c,i,f.defaultSettings,e),k.settings=e,a.language=e.language||"en",a.languageLoad=e.language_load,a.baseURL=f.baseURL,k.id=c,k.setDirty(!1),k.plugins={},k.documentBaseURI=new o(e.document_base_url,{base_uri:j}),k.baseURI=j,k.contentCSS=[],k.contentStyles=[],k.shortcuts=new l(k),k.loadedCSS={},k.editorCommands=new d(k),k.suffix=f.suffix,k.editorManager=f,k.inline=e.inline,k.buttons={},k.menuItems={},e.cache_suffix&&(h.cacheSuffix=e.cache_suffix.replace(/^[\?\&]+/,"")),e.override_viewport===!1&&(h.overrideViewPort=!1),f.fire("SetupEditor",k),k.execCallback("setup",k),k.$=b.overrideDefaults(function(){return{context:k.inline?k.getBody():k.getDoc(),element:k.getBody()}})};return w.prototype={render:function(){j.render(this)},focus:function(a){e.focus(this,a)},execCallback:function(a){var b,c=this,d=c.settings[a];if(d)return c.callbackLookup&&(b=c.callbackLookup[a])&&(d=b.func,b=b.scope),"string"==typeof d&&(b=d.replace(/\.\w+$/,""),b=b?u(b):0,d=u(d),c.callbackLookup=c.callbackLookup||{},c.callbackLookup[a]={func:d,scope:b}),d.apply(b||c,Array.prototype.slice.call(arguments,1))},translate:function(a){if(a&&n.is(a,"string")){var b=this.settings.language||"en",c=this.editorManager.i18n;a=c.data[b+"."+a]||a.replace(/\{\#([^\}]+)\}/g,function(a,d){return c.data[b+"."+d]||"{#"+d+"}"})}return this.editorManager.translate(a)},getLang:function(a,b){return this.editorManager.i18n.data[(this.settings.language||"en")+"."+a]||(void 0!==b?b:"{#"+a+"}")},getParam:function(a,b,c){var d,e=a in this.settings?this.settings[a]:b;return"hash"===c?(d={},"string"==typeof e?s(e.indexOf("=")>0?e.split(/[;,](?![^=;,]*(?:[;,]|$))/):e.split(","),function(a){a=a.split("="),a.length>1?d[t(a[0])]=t(a[1]):d[t(a[0])]=t(a)}):d=e,d):e},nodeChanged:function(a){this._nodeChangeDispatcher.nodeChanged(a)},addButton:function(a,b){var c=this;b.cmd&&(b.onclick=function(){c.execCommand(b.cmd)}),b.text||b.icon||(b.icon=a),c.buttons=c.buttons,b.tooltip=b.tooltip||b.title,c.buttons[a]=b},addSidebar:function(a,b){return m.add(this,a,b)},addMenuItem:function(a,b){var c=this;b.cmd&&(b.onclick=function(){c.execCommand(b.cmd)}),c.menuItems=c.menuItems,c.menuItems[a]=b},addContextToolbar:function(a,b){var c,d=this;d.contextToolbars=d.contextToolbars||[],"string"==typeof a&&(c=a,a=function(a){return d.dom.is(a,c)}),d.contextToolbars.push({id:p.uuid("mcet"),predicate:a,items:b})},addCommand:function(a,b,c){this.editorCommands.addCommand(a,b,c)},addQueryStateHandler:function(a,b,c){this.editorCommands.addQueryStateHandler(a,b,c)},addQueryValueHandler:function(a,b,c){this.editorCommands.addQueryValueHandler(a,b,c)},addShortcut:function(a,b,c,d){this.shortcuts.add(a,b,c,d)},execCommand:function(a,b,c,d){return this.editorCommands.execCommand(a,b,c,d)},queryCommandState:function(a){return this.editorCommands.queryCommandState(a)},queryCommandValue:function(a){return this.editorCommands.queryCommandValue(a)},queryCommandSupported:function(a){return this.editorCommands.queryCommandSupported(a)},show:function(){var a=this;a.hidden&&(a.hidden=!1,a.inline?a.getBody().contentEditable=!0:(q.show(a.getContainer()),q.hide(a.id)),a.load(),a.fire("show"))},hide:function(){var a=this,b=a.getDoc();a.hidden||(v&&b&&!a.inline&&b.execCommand("SelectAll"),a.save(),a.inline?(a.getBody().contentEditable=!1,a==a.editorManager.focusedEditor&&(a.editorManager.focusedEditor=null)):(q.hide(a.getContainer()),q.setStyle(a.id,"display",a.orgDisplay)),a.hidden=!0,a.fire("hide"))},isHidden:function(){return!!this.hidden},setProgressState:function(a,b){this.fire("ProgressState",{state:a,time:b})},load:function(a){var b,c=this,d=c.getElement();return c.removed?"":d?(a=a||{},a.load=!0,b=c.setContent(void 0!==d.value?d.value:d.innerHTML,a),a.element=d,a.no_events||c.fire("LoadContent",a),a.element=d=null,b):void 0},save:function(a){var b,c,d=this,e=d.getElement();if(e&&d.initialized&&!d.removed)return a=a||{},a.save=!0,a.element=e,b=a.content=d.getContent(a),a.no_events||d.fire("SaveContent",a),"raw"==a.format&&d.fire("RawSaveContent",a),b=a.content,/TEXTAREA|INPUT/i.test(e.nodeName)?e.value=b:(d.inline||(e.innerHTML=b),(c=q.getParent(d.id,"form"))&&s(c.elements,function(a){if(a.name==d.id)return a.value=b,!1})),a.element=e=null,a.set_dirty!==!1&&d.setDirty(!1),b},setContent:function(a,b){var c,d,e=this,f=e.getBody();return b=b||{},b.format=b.format||"html",b.set=!0,b.content=a,b.no_events||e.fire("BeforeSetContent",b),a=b.content,0===a.length||/^\s+$/.test(a)?(d=v&&v<11?"":'<br data-mce-bogus="1">',"TABLE"==f.nodeName?a="<tr><td>"+d+"</td></tr>":/^(UL|OL)$/.test(f.nodeName)&&(a="<li>"+d+"</li>"),c=e.settings.forced_root_block,c&&e.schema.isValidChild(f.nodeName.toLowerCase(),c.toLowerCase())?(a=d,a=e.dom.createHTML(c,e.settings.forced_root_block_attrs,a)):v||a||(a='<br data-mce-bogus="1">'),e.dom.setHTML(f,a),e.fire("SetContent",b)):("raw"!==b.format&&(a=new i({validate:e.validate},e.schema).serialize(e.parser.parse(a,{isRootContent:!0}))),b.content=t(a),e.dom.setHTML(f,b.content),b.no_events||e.fire("SetContent",b)),b.content},getContent:function(a){var b,c=this,d=c.getBody();return c.removed?"":(a=a||{},a.format=a.format||"html",a.get=!0,a.getInner=!0,a.no_events||c.fire("BeforeGetContent",a),b="raw"==a.format?n.trim(c.serializer.getTrimmedContent()):"text"==a.format?d.innerText||d.textContent:c.serializer.serialize(d,a),"text"!=a.format?a.content=t(b):a.content=b,a.no_events||c.fire("GetContent",a),a.content)},insertContent:function(a,b){b&&(a=r({content:a},b)),this.execCommand("mceInsertContent",!1,a)},isDirty:function(){return!this.isNotDirty},setDirty:function(a){var b=!this.isNotDirty;this.isNotDirty=!a,a&&a!=b&&this.fire("dirty")},setMode:function(a){k.setMode(this,a)},getContainer:function(){var a=this;return a.container||(a.container=q.get(a.editorContainer||a.id+"_parent")),a.container},getContentAreaContainer:function(){return this.contentAreaContainer},getElement:function(){return this.targetElm||(this.targetElm=q.get(this.id)),this.targetElm},getWin:function(){var a,b=this;return b.contentWindow||(a=b.iframeElement,a&&(b.contentWindow=a.contentWindow)),b.contentWindow},getDoc:function(){var a,b=this;return b.contentDocument||(a=b.getWin(),a&&(b.contentDocument=a.document)),b.contentDocument},getBody:function(){var a=this.getDoc();return this.bodyElement||(a?a.body:null)},convertURL:function(a,b,c){var d=this,e=d.settings;return e.urlconverter_callback?d.execCallback("urlconverter_callback",a,c,!0,b):!e.convert_urls||c&&"LINK"==c.nodeName||0===a.indexOf("file:")||0===a.length?a:e.relative_urls?d.documentBaseURI.toRelative(a):a=d.documentBaseURI.toAbsolute(a,e.remove_script_host)},addVisual:function(a){var b,c=this,d=c.settings,e=c.dom;a=a||c.getBody(),void 0===c.hasVisual&&(c.hasVisual=d.visual),s(e.select("table,a",a),function(a){var f;switch(a.nodeName){case"TABLE":return b=d.visual_table_class||"mce-item-table",f=e.getAttrib(a,"border"),void(f&&"0"!=f||!c.hasVisual?e.removeClass(a,b):e.addClass(a,b));case"A":return void(e.getAttrib(a,"href",!1)||(f=e.getAttrib(a,"name")||a.id,b=d.visual_anchor_class||"mce-item-anchor",f&&c.hasVisual?e.addClass(a,b):e.removeClass(a,b)))}}),c.fire("VisualAid",{element:a,hasVisual:c.hasVisual})},remove:function(){var a=this;a.removed||(a.save(),a.removed=1,a.unbindAllNativeEvents(),a.hasHiddenInput&&q.remove(a.getElement().nextSibling),a.inline||(v&&v<10&&a.getDoc().execCommand("SelectAll",!1,null),q.setStyle(a.id,"display",a.orgDisplay),
a.getBody().onload=null),a.fire("remove"),a.editorManager.remove(a),q.remove(a.getContainer()),a._selectionOverrides.destroy(),a.editorUpload.destroy(),a.destroy())},destroy:function(a){var b,c=this;if(!c.destroyed){if(!a&&!c.removed)return void c.remove();a||(c.editorManager.off("beforeunload",c._beforeUnload),c.theme&&c.theme.destroy&&c.theme.destroy(),c.selection.destroy(),c.dom.destroy()),b=c.formElement,b&&(b._mceOldSubmit&&(b.submit=b._mceOldSubmit,b._mceOldSubmit=null),q.unbind(b,"submit reset",c.formEventDelegate)),c.contentAreaContainer=c.formElement=c.container=c.editorContainer=null,c.bodyElement=c.contentDocument=c.contentWindow=null,c.iframeElement=c.targetElm=null,c.selection&&(c.selection=c.selection.win=c.selection.dom=c.selection.dom.doc=null),c.destroyed=1}},uploadImages:function(a){return this.editorUpload.uploadImages(a)},_scanForImages:function(){return this.editorUpload.scanForImages()}},r(w.prototype,f),w}),g("q",["1t","1j","d","26","15"],function(a,b,c,d,e){var f,g,h,i=c.DOM,j=function(a,b){var c=a?a.settings.custom_ui_selector:"",d=i.getParent(b,function(b){return k.isEditorUIElement(b)||!!c&&a.dom.is(b,c)});return null!==d},k=function(a){var c=function(){try{return b.activeElement}catch(a){return b.body}},k=function(f){var h=f.editor;h.on("init",function(){h.on("keyup mouseup touchend nodechange",function(a){"nodechange"===a.type&&a.selectionChange||d.store(h)})}),h.on("focusin",function(){var b=a.focusedEditor;b!=h&&(b&&b.fire("blur",{focusedEditor:h}),a.setActive(h),a.focusedEditor=h,h.fire("focus",{blurredEditor:b}),h.focus(!0))}),h.on("focusout",function(){e.setEditorTimeout(h,function(){var b=a.focusedEditor;j(h,c())||b!=h||(h.fire("blur",{focusedEditor:null}),a.focusedEditor=null)})}),g||(g=function(c){var d,e=a.activeEditor;d=c.target,e&&d.ownerDocument===b&&(d===b.body||j(e,d)||a.focusedEditor!==e||(e.fire("blur",{focusedEditor:null}),a.focusedEditor=null))},i.bind(b,"focusin",g))},l=function(c){a.focusedEditor==c.editor&&(a.focusedEditor=null),a.activeEditor||(i.unbind(b,"selectionchange",f),i.unbind(b,"focusin",g),i.unbind(b,"mouseup",h),f=g=h=null)};a.on("AddEditor",k),a.on("RemoveEditor",l)};return k.isEditorUIElement=function(a){return a.className.toString().indexOf("mce-")!==-1},k._isUIElement=j,k}),g("2v",["1e"],function(a){var b=a.each,c=a.explode,d=function(a){a.on("AddEditor",function(a){var d=a.editor;d.on("preInit",function(){var a,e,f,g=d.settings,h=function(a,c){b(c,function(b,c){b&&f.setStyle(a,c,b)}),f.rename(a,"span")},i=function(c){f=d.dom,g.convert_fonts_to_spans&&b(f.select("font,u,strike",c.node),function(b){a[b.nodeName.toLowerCase()](f,b)})};g.inline_styles&&(e=c(g.font_size_legacy_values),a={font:function(a,b){h(b,{backgroundColor:b.style.backgroundColor,color:b.color,fontFamily:b.face,fontSize:e[parseInt(b.size,10)-1]})},u:function(a,b){"html4"===d.settings.schema&&h(b,{textDecoration:"underline"})},strike:function(a,b){h(b,{textDecoration:"line-through"})}},d.on("PreProcess SetContent",i))})})};return{register:d}}),g("17",["1e"],function(a){"use strict";var b={},c="en";return{setCode:function(a){a&&(c=a,this.rtl=!!this.data[a]&&"rtl"===this.data[a]._dir)},getCode:function(){return c},rtl:!1,add:function(a,c){var d=b[a];d||(b[a]=d={});for(var e in c)d[e]=c[e];this.setCode(a)},translate:function(d){var e=b[c]||{},f=function(b){return a.is(b,"function")?Object.prototype.toString.call(b):g(b)?"":""+b},g=function(b){return""===b||null===b||a.is(b,"undefined")},h=function(b){return b=f(b),a.hasOwn(e,b)?f(e[b]):b};if(g(d))return"";if(a.is(d,"object")&&a.hasOwn(d,"raw"))return f(d.raw);if(a.is(d,"array")){var i=d.slice(1);d=h(d[0]).replace(/\{([0-9]+)\}/g,function(b,c){return a.hasOwn(i,c)?f(i[c]):b})}return h(d).replace(/{context:\w+}$/,"")},data:b}}),g("n",["1i","2t","1j","2","6","c","d","l","p","2u","q","2v","17","1c","1d","1e","1f"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q){var r,s,t=g.DOM,u=p.explode,v=p.each,w=p.extend,x=0,y=!1,z=[],A=[],B=function(a){return"length"!==a},C=function(a){v(s.get(),function(b){"scroll"===a.type?b.fire("ScrollWindow",a):b.fire("ResizeWindow",a)})},D=function(a){a!==y&&(a?f(d).on("resize scroll",C):f(d).off("resize scroll",C),y=a)},E=function(b){var c=A;delete z[b.id];for(var d=0;d<z.length;d++)if(z[d]===b){z.splice(d,1);break}return A=a.filter(A,function(a){return b!==a}),s.activeEditor===b&&(s.activeEditor=A.length>0?A[0]:null),s.focusedEditor===b&&(s.focusedEditor=null),c.length!==A.length},F=function(a){return a&&a.initialized&&!(a.getContainer()||a.getBody()).parentNode&&(E(a),a.unbindAllNativeEvents(),a.destroy(!0),a.removed=!0,a=null),a};return s={defaultSettings:{},$:f,majorVersion:"4",minorVersion:"7.1",releaseDate:"2017-10-09",editors:z,i18n:m,activeEditor:null,settings:{},setup:function(){var a,b,e,f,g=this,h="";if(b=q.getDocumentBaseUrl(c.location),/^[^:]+:\/\/\/?[^\/]+\//.test(b)&&(b=b.replace(/[\?#].*$/,"").replace(/[\/\\][^\/]+$/,""),/[\/\\]$/.test(b)||(b+="/")),e=d.tinymce||d.tinyMCEPreInit)a=e.base||e.baseURL,h=e.suffix;else{for(var i=c.getElementsByTagName("script"),j=0;j<i.length;j++){f=i[j].src;var l=f.substring(f.lastIndexOf("/"));if(/tinymce(\.full|\.jquery|)(\.min|\.dev|)\.js/.test(f)){l.indexOf(".min")!=-1&&(h=".min"),a=f.substring(0,f.lastIndexOf("/"));break}}!a&&c.currentScript&&(f=c.currentScript.src,f.indexOf(".min")!=-1&&(h=".min"),a=f.substring(0,f.lastIndexOf("/")))}g.baseURL=new q(b).toAbsolute(a),g.documentBaseURL=b,g.baseURI=new q(g.baseURL),g.suffix=h,g.focusManager=new k(g)},overrideDefaults:function(a){var b,c;b=a.base_url,b&&(this.baseURL=new q(this.documentBaseURL).toAbsolute(b.replace(/\/+$/,"")),this.baseURI=new q(this.baseURL)),c=a.suffix,a.suffix&&(this.suffix=c),this.defaultSettings=a;var d=a.plugin_base_urls;for(var f in d)e.PluginManager.urls[f]=d[f]},init:function(a){var b,e,g=this;e=p.makeMap("area base basefont br col frame hr img input isindex link meta param embed source wbr track colgroup option tbody tfoot thead tr script noscript style textarea video audio iframe object menu"," ");var k=function(a,b){return a.inline&&b.tagName.toLowerCase()in e},l=function(a){var b=a.id;return b||(b=a.name,b=b&&!t.get(b)?a.name:t.uniqueId(),a.setAttribute("id",b)),b},m=function(b){var c=a[b];if(c)return c.apply(g,Array.prototype.slice.call(arguments,2))},n=function(a,b){return b.constructor===RegExp?b.test(a.className):t.hasClass(a,b)},q=function(a){var b,d=[];if(i.ie&&i.ie<11)return j.initError("TinyMCE does not support the browser you are using. For a list of supported browsers please see: https://www.tinymce.com/docs/get-started/system-requirements/"),[];if(a.types)return v(a.types,function(a){d=d.concat(t.select(a.selector))}),d;if(a.selector)return t.select(a.selector);if(a.target)return[a.target];switch(a.mode){case"exact":b=a.elements||"",b.length>0&&v(u(b),function(a){var b;(b=t.get(a))?d.push(b):v(c.forms,function(b){v(b.elements,function(b){b.name===a&&(a="mce_editor_"+x++,t.setAttrib(b,"id",a),d.push(b))})})});break;case"textareas":case"specific_textareas":v(t.select("textarea"),function(b){a.editor_deselector&&n(b,a.editor_deselector)||a.editor_selector&&!n(b,a.editor_selector)||d.push(b)})}return d},r=function(a){b=a},s=function(){var b,c=0,e=[],i=function(a,d,f){var i=new h(a,d,g);e.push(i),i.on("init",function(){++c===b.length&&r(e)}),i.targetElm=i.targetElm||f,i.render()};return t.unbind(d,"ready",s),m("onpageload"),b=f.unique(q(a)),a.types?void v(a.types,function(c){p.each(b,function(b){return!t.is(b,c.selector)||(i(l(b),w({},a,c),b),!1)})}):(p.each(b,function(a){F(g.get(a.id))}),b=p.grep(b,function(a){return!g.get(a.id)}),void(0===b.length?r([]):v(b,function(b){k(a,b)?j.initError("Could not initialize inline editor on invalid inline target element",b):i(l(b),a,b)})))};return g.settings=a,t.bind(d,"ready",s),new o(function(a){b?a(b):r=function(b){a(b)}})},get:function(c){return 0===arguments.length?A.slice(0):b.isString(c)?a.find(A,function(a){return a.id===c}).getOr(null):b.isNumber(c)&&A[c]?A[c]:null},add:function(a){var b,c=this;return b=z[a.id],b===a?a:(null===c.get(a.id)&&(B(a.id)&&(z[a.id]=a),z.push(a),A.push(a)),D(!0),c.activeEditor=a,c.fire("AddEditor",{editor:a}),r||(r=function(){c.fire("BeforeUnload")},t.bind(d,"beforeunload",r)),a)},createEditor:function(a,b){return this.add(new h(a,b,this))},remove:function(a){var c,e,f=this;{if(a)return b.isString(a)?(a=a.selector||a,void v(t.select(a),function(a){e=f.get(a.id),e&&f.remove(e)})):(e=a,b.isNull(f.get(e.id))?null:(E(e)&&f.fire("RemoveEditor",{editor:e}),0===A.length&&t.unbind(d,"beforeunload",r),e.remove(),D(A.length>0),e));for(c=A.length-1;c>=0;c--)f.remove(A[c])}},execCommand:function(a,b,c){var d=this,e=d.get(c);switch(a){case"mceAddEditor":return d.get(c)||new h(c,d.settings,d).render(),!0;case"mceRemoveEditor":return e&&e.remove(),!0;case"mceToggleEditor":return e?(e.isHidden()?e.show():e.hide(),!0):(d.execCommand("mceAddEditor",0,c),!0)}return!!d.activeEditor&&d.activeEditor.execCommand(a,b,c)},triggerSave:function(){v(A,function(a){a.save()})},addI18n:function(a,b){m.add(a,b)},translate:function(a){return m.translate(a)},setActive:function(a){var b=this.activeEditor;this.activeEditor!=a&&(b&&b.fire("deactivate",{relatedTarget:a}),a.fire("activate",{relatedTarget:b})),this.activeEditor=a}},w(s,n),s.setup(),l.register(s),s}),g("r",[],function(){"use strict";var a=Math.min,b=Math.max,c=Math.round,d=function(a,b,d){var e,f,g,h,j,k;return e=b.x,f=b.y,g=a.w,h=a.h,j=b.w,k=b.h,d=(d||"").split(""),"b"===d[0]&&(f+=k),"r"===d[1]&&(e+=j),"c"===d[0]&&(f+=c(k/2)),"c"===d[1]&&(e+=c(j/2)),"b"===d[3]&&(f-=h),"r"===d[4]&&(e-=g),"c"===d[3]&&(f-=c(h/2)),"c"===d[4]&&(e-=c(g/2)),i(e,f,g,h)},e=function(a,b,c,e){var f,g;for(g=0;g<e.length;g++)if(f=d(a,b,e[g]),f.x>=c.x&&f.x+f.w<=c.w+c.x&&f.y>=c.y&&f.y+f.h<=c.h+c.y)return e[g];return null},f=function(a,b,c){return i(a.x-b,a.y-c,a.w+2*b,a.h+2*c)},g=function(c,d){var e,f,g,h;return e=b(c.x,d.x),f=b(c.y,d.y),g=a(c.x+c.w,d.x+d.w),h=a(c.y+c.h,d.y+d.h),g-e<0||h-f<0?null:i(e,f,g-e,h-f)},h=function(a,c,d){var e,f,g,h,j,k,l,m,n,o;return j=a.x,k=a.y,l=a.x+a.w,m=a.y+a.h,n=c.x+c.w,o=c.y+c.h,e=b(0,c.x-j),f=b(0,c.y-k),g=b(0,l-n),h=b(0,m-o),j+=e,k+=f,d&&(l+=e,m+=f,j-=g,k-=h),l-=g,m-=h,i(j,k,l-j,m-k)},i=function(a,b,c,d){return{x:a,y:b,w:c,h:d}},j=function(a){return i(a.left,a.top,a.width,a.height)};return{inflate:f,relativePosition:d,findBestRelativePosition:e,intersect:g,clamp:h,create:i,fromClientRect:j}}),g("11",[],function(){"use strict";var a={};return{add:function(b,c){a[b.toLowerCase()]=c},has:function(b){return!!a[b.toLowerCase()]},get:function(b){var c=b.toLowerCase(),d=a.hasOwnProperty(c)?a[c]:null;if(null===d)throw new Error("Could not find module for type: "+b);return d},create:function(b,c){var d;if("string"==typeof b?(c=c||{},c.type=b):(c=b,b=c.type),b=b.toLowerCase(),d=a[b],!d)throw new Error("Could not find control by type: "+b);return d=new d(c),d.type=b,d}}}),g("13",["1e"],function(a){var b,c,d=a.each,e=a.extend,f=function(){};return f.extend=b=function(a){var f,g,h,i=this,j=i.prototype,k=function(){var a,b,d,e=this;if(!c&&(e.init&&e.init.apply(e,arguments),b=e.Mixins))for(a=b.length;a--;)d=b[a],d.init&&d.init.apply(e,arguments)},l=function(){return this},m=function(a,b){return function(){var c,d=this,e=d._super;return d._super=j[a],c=b.apply(d,arguments),d._super=e,c}};c=!0,f=new i,c=!1,a.Mixins&&(d(a.Mixins,function(b){for(var c in b)"init"!==c&&(a[c]=b[c])}),j.Mixins&&(a.Mixins=j.Mixins.concat(a.Mixins))),a.Methods&&d(a.Methods.split(","),function(b){a[b]=l}),a.Properties&&d(a.Properties.split(","),function(b){var c="_"+b;a[b]=function(a){var b,d=this;return a!==b?(d[c]=a,d):d[c]}}),a.Statics&&d(a.Statics,function(a,b){k[b]=a}),a.Defaults&&j.Defaults&&(a.Defaults=e({},j.Defaults,a.Defaults));for(g in a)h=a[g],"function"==typeof h&&j[g]?f[g]=m(g,h):f[g]=h;return k.prototype=f,k.constructor=k,k.extend=b,k},f}),g("14",[],function(){var a=Math.min,b=Math.max,c=Math.round,d=function(d){var e=this,f=0,g=0,h=0,i=function(d,e,f){var g,h,i,j,k,l;return g=0,h=0,i=0,d/=255,e/=255,f/=255,k=a(d,a(e,f)),l=b(d,b(e,f)),k==l?(i=k,{h:0,s:0,v:100*i}):(j=d==k?e-f:f==k?d-e:f-d,g=d==k?3:f==k?1:5,g=60*(g-j/(l-k)),h=(l-k)/l,i=l,{h:c(g),s:c(100*h),v:c(100*i)})},j=function(d,e,i){var j,k,l,m;if(d=(parseInt(d,10)||0)%360,e=parseInt(e,10)/100,i=parseInt(i,10)/100,e=b(0,a(e,1)),i=b(0,a(i,1)),0===e)return void(f=g=h=c(255*i));switch(j=d/60,k=i*e,l=k*(1-Math.abs(j%2-1)),m=i-k,Math.floor(j)){case 0:f=k,g=l,h=0;break;case 1:f=l,g=k,h=0;break;case 2:f=0,g=k,h=l;break;case 3:f=0,g=l,h=k;break;case 4:f=l,g=0,h=k;break;case 5:f=k,g=0,h=l;break;default:f=g=h=0}f=c(255*(f+m)),g=c(255*(g+m)),h=c(255*(h+m))},k=function(){var a=function(a){return a=parseInt(a,10).toString(16),a.length>1?a:"0"+a};return"#"+a(f)+a(g)+a(h)},l=function(){return{r:f,g:g,b:h}},m=function(){return i(f,g,h)},n=function(a){var b;return"object"==typeof a?"r"in a?(f=a.r,g=a.g,h=a.b):"v"in a&&j(a.h,a.s,a.v):(b=/rgb\s*\(\s*([0-9]+)\s*,\s*([0-9]+)\s*,\s*([0-9]+)[^\)]*\)/gi.exec(a))?(f=parseInt(b[1],10),g=parseInt(b[2],10),h=parseInt(b[3],10)):(b=/#([0-F]{2})([0-F]{2})([0-F]{2})/gi.exec(a))?(f=parseInt(b[1],16),g=parseInt(b[2],16),h=parseInt(b[3],16)):(b=/#([0-F])([0-F])([0-F])/gi.exec(a))&&(f=parseInt(b[1]+b[1],16),g=parseInt(b[2]+b[2],16),h=parseInt(b[3]+b[3],16)),f=f<0?0:f>255?255:f,g=g<0?0:g>255?255:g,h=h<0?0:h>255?255:h,e};d&&n(d),e.toRgb=l,e.toHsv=m,e.toHex=k,e.parse=n};return d}),g("18",["2"],function(a){var b=function(a,c){var d,e,f,g;if(c=c||'"',null===a)return"null";if(f=typeof a,"string"==f)return e="\bb\tt\nn\ff\rr\"\"''\\\\",c+a.replace(/([\u0080-\uFFFF\x00-\x1f\"\'\\])/g,function(a,b){return'"'===c&&"'"===a?a:(d=e.indexOf(b),d+1?"\\"+e.charAt(d+1):(a=b.charCodeAt().toString(16),"\\u"+"0000".substring(a.length)+a))})+c;if("object"==f){if(a.hasOwnProperty&&"[object Array]"===Object.prototype.toString.call(a)){for(d=0,e="[";d<a.length;d++)e+=(d>0?",":"")+b(a[d],c);return e+"]"}e="{";for(g in a)a.hasOwnProperty(g)&&(e+="function"!=typeof a[g]?(e.length>1?","+c:c)+g+c+":"+b(a[g],c):"");return e+"}"}return""+a};return{serialize:b,parse:function(b){try{return a[String.fromCharCode(101)+"val"]("("+b+")")}catch(a){}}}}),g("19",["d"],function(a){return{callbacks:{},count:0,send:function(b){var c=this,d=a.DOM,e=void 0!==b.count?b.count:c.count,f="tinymce_jsonp_"+e;c.callbacks[e]=function(a){d.remove(f),delete c.callbacks[e],b.callback(a)},d.add(d.doc.body,"script",{id:f,src:b.url,type:"text/javascript"}),c.count++}}}),g("1h",["2x","1q","1c","1e"],function(a,b,c,d){var e={send:function(c){var f,g=0,h=function(){!c.async||4==f.readyState||g++>1e4?(c.success&&g<1e4&&200==f.status?c.success.call(c.success_scope,""+f.responseText,f,c):c.error&&c.error.call(c.error_scope,g>1e4?"TIMED_OUT":"GENERAL",f,c),f=null):b(h,10)};if(c.scope=c.scope||this,c.success_scope=c.success_scope||c.scope,c.error_scope=c.error_scope||c.scope,c.async=c.async!==!1,c.data=c.data||"",e.fire("beforeInitialize",{settings:c}),f=new a){if(f.overrideMimeType&&f.overrideMimeType(c.content_type),f.open(c.type||(c.data?"POST":"GET"),c.url,c.async),c.crossDomain&&(f.withCredentials=!0),c.content_type&&f.setRequestHeader("Content-Type",c.content_type),c.requestheaders&&d.each(c.requestheaders,function(a){f.setRequestHeader(a.key,a.value)}),f.setRequestHeader("X-Requested-With","XMLHttpRequest"),f=e.fire("beforeSend",{xhr:f,settings:c}).xhr,f.send(c.data),!c.async)return h();b(h,10)}}};return d.extend(e,c),e}),g("1a",["18","1h","1e"],function(a,b,c){var d=c.extend,e=function(a){this.settings=d({},a),this.count=0};return e.sendRPC=function(a){return(new e).send(a)},e.prototype={send:function(c){var e=c.error,f=c.success;c=d(this.settings,c),c.success=function(b,d){b=a.parse(b),"undefined"==typeof b&&(b={error:"JSON Parse error."}),b.error?e.call(c.error_scope||c.scope,b.error,d):f.call(c.success_scope||c.scope,b.result)},c.error=function(a,b){e&&e.call(c.error_scope||c.scope,a,b)},c.data=a.serialize({id:c.id||"c"+this.count++,method:c.method,params:c.params}),c.content_type="application/json",b.send(c)}},e}),g("1b",["1j","2"],function(a,b){var c,d,e,f,g,h;try{if(b.localStorage)return b.localStorage}catch(a){}g="tinymce",d=a.documentElement,h=!!d.addBehavior,h&&d.addBehavior("#default#userData");var i=function(){f=[];for(var a in e)f.push(a);c.length=f.length},j=function(){var a,b,c,f=0;if(e={},h){var j=function(a){var c,d;return d=void 0!==a?f+a:b.indexOf(",",f),d===-1||d>b.length?null:(c=b.substring(f,d),f=d+1,c)};d.load(g),b=d.getAttribute(g)||"";do{var k=j();if(null===k)break;if(a=j(parseInt(k,32)||0),null!==a){if(k=j(),null===k)break;c=j(parseInt(k,32)||0),a&&(e[a]=c)}}while(null!==a);i()}},k=function(){var a,b="";if(h){for(var c in e)a=e[c],b+=(b?",":"")+c.length.toString(32)+","+c+","+a.length.toString(32)+","+a;d.setAttribute(g,b);try{d.save(g)}catch(a){}i()}};return c={key:function(a){return f[a]},getItem:function(a){return a in e?e[a]:null},setItem:function(a,b){e[a]=""+b,k()},removeItem:function(a){delete e[a],k()},clear:function(){e={},k()}},j(),c}),g("3",["6","7","8","9","a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","1g","1h"],function(a,b,c,d,e,f,g,h,i,j,k,l,m,n,o,p,q,r,s,t,u,v,w,x,y,z,A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V){var W=r,X={geom:{Rect:v},util:{Promise:R,Delay:J,Tools:S,VK:U,URI:T,Class:H,EventDispatcher:K,Observable:Q,I18n:L,XHR:V,JSON:M,JSONRequest:O,JSONP:N,LocalStorage:P,Color:I},dom:{EventUtils:i,Sizzle:n,DomQuery:g,TreeWalker:o,DOMUtils:h,ScriptLoader:k,RangeUtils:j,Serializer:m,ControlSelection:f,BookmarkManager:e,Selection:l,Event:i.Event},html:{Styles:C,Entities:x,Node:y,Schema:A,SaxParser:z,DomParser:w,Writer:D,Serializer:B},ui:{Factory:F},Env:t,AddOnManager:a,Formatter:b,UndoManager:G,EditorCommands:q,WindowManager:d,NotificationManager:c,EditorObservable:s,Shortcuts:E,Editor:p,FocusManager:u,EditorManager:r,DOM:h.DOM,ScriptLoader:k.ScriptLoader,PluginManager:a.PluginManager,ThemeManager:a.ThemeManager,trim:S.trim,isArray:S.isArray,is:S.is,toArray:S.toArray,makeMap:S.makeMap,each:S.each,map:S.map,grep:S.grep,inArray:S.inArray,extend:S.extend,create:S.create,walk:S.walk,createNS:S.createNS,resolve:S.resolve,explode:S.explode,_addCacheSuffix:S._addCacheSuffix,isOpera:t.opera,isWebKit:t.webkit,isIE:t.ie,isGecko:t.gecko,isMac:t.mac};return W=S.extend(W,X)}),g("0",["1","2","3"],function(a,b,c){var d=this||b,e=function(b){"function"!=typeof d.define||d.define.amd||(d.define("ephox/tinymce",[],a.constant(b)),d.define("n",[],a.constant(b))),"object"==typeof module&&(module.exports=b)},f=function(a){b.tinymce=a,b.tinyMCE=a};return function(){return f(c),e(c),c}}),d("0")()}();
!function(){var a={},b=function(b){for(var c=a[b],e=c.deps,f=c.defn,g=e.length,h=new Array(g),i=0;i<g;++i)h[i]=d(e[i]);var j=f.apply(null,h);if(void 0===j)throw"module ["+b+"] returned undefined";c.instance=j},c=function(b,c,d){if("string"!=typeof b)throw"module id must be a string";if(void 0===c)throw"no dependencies for "+b;if(void 0===d)throw"no definition function for "+b;a[b]={deps:c,defn:d,instance:void 0}},d=function(c){var d=a[c];if(void 0===d)throw"module ["+c+"] was undefined";return void 0===d.instance&&b(c),d.instance},e=function(a,b){for(var c=a.length,e=new Array(c),f=0;f<c;++f)e[f]=d(a[f]);b.apply(null,e)},f={};f.bolt={module:{api:{define:c,require:e,demand:d}}};var g=c,h=function(a,b){g(a,[],function(){return b})};h("1",document),h("2",window),g("0",["1","2"],function(a,b){return function(c){var d,e,f,g,h,i=[];h=c?c:b,g=h.jQuery;var j=function(){return h.tinymce};g.fn.tinymce=function(c){var d,l,m,n=this,o="";if(!n.length)return n;if(!c)return j()?j().get(n[0].id):null;n.css("visibility","hidden");var p=function(){var a=[],b=0;f||(k(),f=!0),n.each(function(d,e){var f,g=e.id,h=c.oninit;g||(e.id=g=j().DOM.uniqueId()),j().get(g)||(f=j().createEditor(g,c),a.push(f),f.on("init",function(){var c,d=h;n.css("visibility",""),h&&++b==a.length&&("string"==typeof d&&(c=d.indexOf(".")===-1?null:j().resolve(d.replace(/\.\w+$/,"")),d=j().resolve(d)),d.apply(c||j(),a))}))}),g.each(a,function(a,b){b.render()})};if(h.tinymce||e||!(d=c.script_url))1===e?i.push(p):p();else{e=1,l=d.substring(0,d.lastIndexOf("/")),d.indexOf(".min")!=-1&&(o=".min"),h.tinymce=h.tinyMCEPreInit||{base:l,suffix:o},d.indexOf("gzip")!=-1&&(m=c.language||"en",d=d+(/\?/.test(d)?"&":"?")+"js=true&core=true&suffix="+escape(o)+"&themes="+escape(c.theme||"modern")+"&plugins="+escape(c.plugins||"")+"&languages="+(m||""),h.tinyMCE_GZ||(h.tinyMCE_GZ={start:function(){var a=function(a){j().ScriptLoader.markDone(j().baseURI.toAbsolute(a))};a("langs/"+m+".js"),a("themes/"+c.theme+"/theme"+o+".js"),a("themes/"+c.theme+"/langs/"+m+".js"),g.each(c.plugins.split(","),function(b,c){c&&(a("plugins/"+c+"/plugin"+o+".js"),a("plugins/"+c+"/langs/"+m+".js"))})},end:function(){}}));var q=a.createElement("script");q.type="text/javascript",q.onload=q.onreadystatechange=function(a){a=a||b.event,2===e||"load"!=a.type&&!/complete|loaded/.test(q.readyState)||(j().dom.Event.domLoaded=1,e=2,c.script_loaded&&c.script_loaded(),p(),g.each(i,function(a,b){b()}))},q.src=d,a.body.appendChild(q)}return n},g.extend(g.expr[":"],{tinymce:function(a){var b;return!!(a.id&&"tinymce"in h&&(b=j().get(a.id),b&&b.editorManager===j()))}});var k=function(){var a=function(a){"remove"===a&&this.each(function(a,b){var d=c(b);d&&d.remove()}),this.find("span.mceEditor,div.mceEditor").each(function(a,b){var c=j().get(b.id.replace(/_parent$/,""));c&&c.remove()})},b=function(b){var c,d=this;if(null!=b)a.call(d),d.each(function(a,c){var d;(d=j().get(c.id))&&d.setContent(b)});else if(d.length>0&&(c=j().get(d[0].id)))return c.getContent()},c=function(a){var b=null;return a&&a.id&&h.tinymce&&(b=j().get(a.id)),b},e=function(a){return!!(a&&a.length&&h.tinymce&&a.is(":tinymce"))},f={};g.each(["text","html","val"],function(a,h){var i=f[h]=g.fn[h],j="text"===h;g.fn[h]=function(a){var f=this;if(!e(f))return i.apply(f,arguments);if(a!==d)return b.call(f.filter(":tinymce"),a),i.apply(f.not(":tinymce"),arguments),f;var h="",k=arguments;return(j?f:f.eq(0)).each(function(a,b){var d=c(b);h+=d?j?d.getContent().replace(/<(?:"[^"]*"|'[^']*'|[^'">])*>/g,""):d.getContent({save:!0}):i.apply(g(b),k)}),h}}),g.each(["append","prepend"],function(a,b){var h=f[b]=g.fn[b],i="prepend"===b;g.fn[b]=function(a){var b=this;return e(b)?a!==d?("string"==typeof a&&b.filter(":tinymce").each(function(b,d){var e=c(d);e&&e.setContent(i?a+e.getContent():e.getContent()+a)}),h.apply(b.not(":tinymce"),arguments),b):void 0:h.apply(b,arguments)}}),g.each(["remove","replaceWith","replaceAll","empty"],function(b,c){var d=f[c]=g.fn[c];g.fn[c]=function(){return a.call(this,c),d.apply(this,arguments)}}),f.attr=g.fn.attr,g.fn.attr=function(a,h){var i=this,j=arguments;if(!a||"value"!==a||!e(i))return h!==d?f.attr.apply(i,j):f.attr.apply(i,j);if(h!==d)return b.call(i.filter(":tinymce"),h),f.attr.apply(i.not(":tinymce"),j),i;var k=i[0],l=c(k);return l?l.getContent({save:!0}):f.attr.apply(g(k),j)}}}}),d("0")()}();
/*!
 * Bootstrap v3.3.7 (http://getbootstrap.com)
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under the MIT license
 */

if (typeof jQuery === 'undefined') {
  throw new Error('Bootstrap\'s JavaScript requires jQuery')
}

+function ($) {
  'use strict';
  var version = $.fn.jquery.split(' ')[0].split('.')
  if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] == 9 && version[2] < 1) || (version[0] > 3)) {
    throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or higher, but lower than version 4')
  }
}(jQuery);

/* ========================================================================
 * Bootstrap: transition.js v3.3.7
 * http://getbootstrap.com/javascript/#transitions
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      WebkitTransition : 'webkitTransitionEnd',
      MozTransition    : 'transitionend',
      OTransition      : 'oTransitionEnd otransitionend',
      transition       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }

    return false // explicit for ie8 (  ._.)
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false
    var $el = this
    $(this).one('bsTransitionEnd', function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()

    if (!$.support.transition) return

    $.event.special.bsTransitionEnd = {
      bindType: $.support.transition.end,
      delegateType: $.support.transition.end,
      handle: function (e) {
        if ($(e.target).is(this)) return e.handleObj.handler.apply(this, arguments)
      }
    }
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.3.7
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.3.7'

  Alert.TRANSITION_DURATION = 150

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector === '#' ? [] : selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.closest('.alert')
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(Alert.TRANSITION_DURATION) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.3.7
 * http://getbootstrap.com/javascript/#buttons
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element  = $(element)
    this.options   = $.extend({}, Button.DEFAULTS, options)
    this.isLoading = false
  }

  Button.VERSION  = '3.3.7'

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state += 'Text'

    if (data.resetText == null) $el.data('resetText', $el[val]())

    // push to event loop to allow forms to submit
    setTimeout($.proxy(function () {
      $el[val](data[state] == null ? this.options[state] : data[state])

      if (state == 'loadingText') {
        this.isLoading = true
        $el.addClass(d).attr(d, d).prop(d, true)
      } else if (this.isLoading) {
        this.isLoading = false
        $el.removeClass(d).removeAttr(d).prop(d, false)
      }
    }, this), 0)
  }

  Button.prototype.toggle = function () {
    var changed = true
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
      if ($input.prop('type') == 'radio') {
        if ($input.prop('checked')) changed = false
        $parent.find('.active').removeClass('active')
        this.$element.addClass('active')
      } else if ($input.prop('type') == 'checkbox') {
        if (($input.prop('checked')) !== this.$element.hasClass('active')) changed = false
        this.$element.toggleClass('active')
      }
      $input.prop('checked', this.$element.hasClass('active'))
      if (changed) $input.trigger('change')
    } else {
      this.$element.attr('aria-pressed', !this.$element.hasClass('active'))
      this.$element.toggleClass('active')
    }
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  var old = $.fn.button

  $.fn.button             = Plugin
  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document)
    .on('click.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      var $btn = $(e.target).closest('.btn')
      Plugin.call($btn, 'toggle')
      if (!($(e.target).is('input[type="radio"], input[type="checkbox"]'))) {
        // Prevent double click on radios, and the double selections (so cancellation) on checkboxes
        e.preventDefault()
        // The target component still receive the focus
        if ($btn.is('input,button')) $btn.trigger('focus')
        else $btn.find('input:visible,button:visible').first().trigger('focus')
      }
    })
    .on('focus.bs.button.data-api blur.bs.button.data-api', '[data-toggle^="button"]', function (e) {
      $(e.target).closest('.btn').toggleClass('focus', /^focus(in)?$/.test(e.type))
    })

}(jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.3.7
 * http://getbootstrap.com/javascript/#carousel
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      = null
    this.sliding     = null
    this.interval    = null
    this.$active     = null
    this.$items      = null

    this.options.keyboard && this.$element.on('keydown.bs.carousel', $.proxy(this.keydown, this))

    this.options.pause == 'hover' && !('ontouchstart' in document.documentElement) && this.$element
      .on('mouseenter.bs.carousel', $.proxy(this.pause, this))
      .on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
  }

  Carousel.VERSION  = '3.3.7'

  Carousel.TRANSITION_DURATION = 600

  Carousel.DEFAULTS = {
    interval: 5000,
    pause: 'hover',
    wrap: true,
    keyboard: true
  }

  Carousel.prototype.keydown = function (e) {
    if (/input|textarea/i.test(e.target.tagName)) return
    switch (e.which) {
      case 37: this.prev(); break
      case 39: this.next(); break
      default: return
    }

    e.preventDefault()
  }

  Carousel.prototype.cycle = function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getItemIndex = function (item) {
    this.$items = item.parent().children('.item')
    return this.$items.index(item || this.$active)
  }

  Carousel.prototype.getItemForDirection = function (direction, active) {
    var activeIndex = this.getItemIndex(active)
    var willWrap = (direction == 'prev' && activeIndex === 0)
                || (direction == 'next' && activeIndex == (this.$items.length - 1))
    if (willWrap && !this.options.wrap) return active
    var delta = direction == 'prev' ? -1 : 1
    var itemIndex = (activeIndex + delta) % this.$items.length
    return this.$items.eq(itemIndex)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getItemIndex(this.$active = this.$element.find('.item.active'))

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid.bs.carousel', function () { that.to(pos) }) // yes, "slid"
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', this.$items.eq(pos))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || this.getItemForDirection(type, $active)
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var that      = this

    if ($next.hasClass('active')) return (this.sliding = false)

    var relatedTarget = $next[0]
    var slideEvent = $.Event('slide.bs.carousel', {
      relatedTarget: relatedTarget,
      direction: direction
    })
    this.$element.trigger(slideEvent)
    if (slideEvent.isDefaultPrevented()) return

    this.sliding = true

    isCycling && this.pause()

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      var $nextIndicator = $(this.$indicators.children()[this.getItemIndex($next)])
      $nextIndicator && $nextIndicator.addClass('active')
    }

    var slidEvent = $.Event('slid.bs.carousel', { relatedTarget: relatedTarget, direction: direction }) // yes, "slid"
    if ($.support.transition && this.$element.hasClass('slide')) {
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one('bsTransitionEnd', function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () {
            that.$element.trigger(slidEvent)
          }, 0)
        })
        .emulateTransitionEnd(Carousel.TRANSITION_DURATION)
    } else {
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger(slidEvent)
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  var old = $.fn.carousel

  $.fn.carousel             = Plugin
  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  var clickHandler = function (e) {
    var href
    var $this   = $(this)
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
    if (!$target.hasClass('carousel')) return
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    Plugin.call($target, options)

    if (slideIndex) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  }

  $(document)
    .on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
    .on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      Plugin.call($carousel, $carousel.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.3.7
 * http://getbootstrap.com/javascript/#collapse
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */

/* jshint latedef: false */

+function ($) {
  'use strict';

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.$trigger      = $('[data-toggle="collapse"][href="#' + element.id + '"],' +
                           '[data-toggle="collapse"][data-target="#' + element.id + '"]')
    this.transitioning = null

    if (this.options.parent) {
      this.$parent = this.getParent()
    } else {
      this.addAriaAndCollapsedClass(this.$element, this.$trigger)
    }

    if (this.options.toggle) this.toggle()
  }

  Collapse.VERSION  = '3.3.7'

  Collapse.TRANSITION_DURATION = 350

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var activesData
    var actives = this.$parent && this.$parent.children('.panel').children('.in, .collapsing')

    if (actives && actives.length) {
      activesData = actives.data('bs.collapse')
      if (activesData && activesData.transitioning) return
    }

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    if (actives && actives.length) {
      Plugin.call(actives, 'hide')
      activesData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')[dimension](0)
      .attr('aria-expanded', true)

    this.$trigger
      .removeClass('collapsed')
      .attr('aria-expanded', true)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('collapse in')[dimension]('')
      this.transitioning = 0
      this.$element
        .trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element[dimension](this.$element[dimension]())[0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse in')
      .attr('aria-expanded', false)

    this.$trigger
      .addClass('collapsed')
      .attr('aria-expanded', false)

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .removeClass('collapsing')
        .addClass('collapse')
        .trigger('hidden.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one('bsTransitionEnd', $.proxy(complete, this))
      .emulateTransitionEnd(Collapse.TRANSITION_DURATION)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }

  Collapse.prototype.getParent = function () {
    return $(this.options.parent)
      .find('[data-toggle="collapse"][data-parent="' + this.options.parent + '"]')
      .each($.proxy(function (i, element) {
        var $element = $(element)
        this.addAriaAndCollapsedClass(getTargetFromTrigger($element), $element)
      }, this))
      .end()
  }

  Collapse.prototype.addAriaAndCollapsedClass = function ($element, $trigger) {
    var isOpen = $element.hasClass('in')

    $element.attr('aria-expanded', isOpen)
    $trigger
      .toggleClass('collapsed', !isOpen)
      .attr('aria-expanded', isOpen)
  }

  function getTargetFromTrigger($trigger) {
    var href
    var target = $trigger.attr('data-target')
      || (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') // strip for ie7

    return $(target)
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data && options.toggle && /show|hide/.test(option)) options.toggle = false
      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.collapse

  $.fn.collapse             = Plugin
  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]', function (e) {
    var $this   = $(this)

    if (!$this.attr('data-target')) e.preventDefault()

    var $target = getTargetFromTrigger($this)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()

    Plugin.call($target, option)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.3.7
 * http://getbootstrap.com/javascript/#dropdowns
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle="dropdown"]'
  var Dropdown = function (element) {
    $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.VERSION = '3.3.7'

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }

  function clearMenus(e) {
    if (e && e.which === 3) return
    $(backdrop).remove()
    $(toggle).each(function () {
      var $this         = $(this)
      var $parent       = getParent($this)
      var relatedTarget = { relatedTarget: this }

      if (!$parent.hasClass('open')) return

      if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName) && $.contains($parent[0], e.target)) return

      $parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this.attr('aria-expanded', 'false')
      $parent.removeClass('open').trigger($.Event('hidden.bs.dropdown', relatedTarget))
    })
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we use a backdrop because click events don't delegate
        $(document.createElement('div'))
          .addClass('dropdown-backdrop')
          .insertAfter($(this))
          .on('click', clearMenus)
      }

      var relatedTarget = { relatedTarget: this }
      $parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))

      if (e.isDefaultPrevented()) return

      $this
        .trigger('focus')
        .attr('aria-expanded', 'true')

      $parent
        .toggleClass('open')
        .trigger($.Event('shown.bs.dropdown', relatedTarget))
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27|32)/.test(e.which) || /input|textarea/i.test(e.target.tagName)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive && e.which != 27 || isActive && e.which == 27) {
      if (e.which == 27) $parent.find(toggle).trigger('focus')
      return $this.trigger('click')
    }

    var desc = ' li:not(.disabled):visible a'
    var $items = $parent.find('.dropdown-menu' + desc)

    if (!$items.length) return

    var index = $items.index(e.target)

    if (e.which == 38 && index > 0)                 index--         // up
    if (e.which == 40 && index < $items.length - 1) index++         // down
    if (!~index)                                    index = 0

    $items.eq(index).trigger('focus')
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.dropdown')

      if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.dropdown

  $.fn.dropdown             = Plugin
  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
    .on('keydown.bs.dropdown.data-api', '.dropdown-menu', Dropdown.prototype.keydown)

}(jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.3.7
 * http://getbootstrap.com/javascript/#modals
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options             = options
    this.$body               = $(document.body)
    this.$element            = $(element)
    this.$dialog             = this.$element.find('.modal-dialog')
    this.$backdrop           = null
    this.isShown             = null
    this.originalBodyPad     = null
    this.scrollbarWidth      = 0
    this.ignoreBackdropClick = false

    if (this.options.remote) {
      this.$element
        .find('.modal-content')
        .load(this.options.remote, $.proxy(function () {
          this.$element.trigger('loaded.bs.modal')
        }, this))
    }
  }

  Modal.VERSION  = '3.3.7'

  Modal.TRANSITION_DURATION = 300
  Modal.BACKDROP_TRANSITION_DURATION = 150

  Modal.DEFAULTS = {
    backdrop: true,
    keyboard: true,
    show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this.isShown ? this.hide() : this.show(_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.checkScrollbar()
    this.setScrollbar()
    this.$body.addClass('modal-open')

    this.escape()
    this.resize()

    this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.$dialog.on('mousedown.dismiss.bs.modal', function () {
      that.$element.one('mouseup.dismiss.bs.modal', function (e) {
        if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
      })
    })

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(that.$body) // don't move modals dom position
      }

      that.$element
        .show()
        .scrollTop(0)

      that.adjustDialog()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element.addClass('in')

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$dialog // wait for modal to slide in
          .one('bsTransitionEnd', function () {
            that.$element.trigger('focus').trigger(e)
          })
          .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
        that.$element.trigger('focus').trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()
    this.resize()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .off('click.dismiss.bs.modal')
      .off('mouseup.dismiss.bs.modal')

    this.$dialog.off('mousedown.dismiss.bs.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one('bsTransitionEnd', $.proxy(this.hideModal, this))
        .emulateTransitionEnd(Modal.TRANSITION_DURATION) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (document !== e.target &&
            this.$element[0] !== e.target &&
            !this.$element.has(e.target).length) {
          this.$element.trigger('focus')
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keydown.dismiss.bs.modal')
    }
  }

  Modal.prototype.resize = function () {
    if (this.isShown) {
      $(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
    } else {
      $(window).off('resize.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.$body.removeClass('modal-open')
      that.resetAdjustments()
      that.resetScrollbar()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $(document.createElement('div'))
        .addClass('modal-backdrop ' + animate)
        .appendTo(this.$body)

      this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
        if (this.ignoreBackdropClick) {
          this.ignoreBackdropClick = false
          return
        }
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus()
          : this.hide()
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one('bsTransitionEnd', callback)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      var callbackRemove = function () {
        that.removeBackdrop()
        callback && callback()
      }
      $.support.transition && this.$element.hasClass('fade') ?
        this.$backdrop
          .one('bsTransitionEnd', callbackRemove)
          .emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
        callbackRemove()

    } else if (callback) {
      callback()
    }
  }

  // these following methods are used to handle overflowing modals

  Modal.prototype.handleUpdate = function () {
    this.adjustDialog()
  }

  Modal.prototype.adjustDialog = function () {
    var modalIsOverflowing = this.$element[0].scrollHeight > document.documentElement.clientHeight

    this.$element.css({
      paddingLeft:  !this.bodyIsOverflowing && modalIsOverflowing ? this.scrollbarWidth : '',
      paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ? this.scrollbarWidth : ''
    })
  }

  Modal.prototype.resetAdjustments = function () {
    this.$element.css({
      paddingLeft: '',
      paddingRight: ''
    })
  }

  Modal.prototype.checkScrollbar = function () {
    var fullWindowWidth = window.innerWidth
    if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
      var documentElementRect = document.documentElement.getBoundingClientRect()
      fullWindowWidth = documentElementRect.right - Math.abs(documentElementRect.left)
    }
    this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
    this.scrollbarWidth = this.measureScrollbar()
  }

  Modal.prototype.setScrollbar = function () {
    var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
    this.originalBodyPad = document.body.style.paddingRight || ''
    if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad + this.scrollbarWidth)
  }

  Modal.prototype.resetScrollbar = function () {
    this.$body.css('padding-right', this.originalBodyPad)
  }

  Modal.prototype.measureScrollbar = function () { // thx walsh
    var scrollDiv = document.createElement('div')
    scrollDiv.className = 'modal-scrollbar-measure'
    this.$body.append(scrollDiv)
    var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
    this.$body[0].removeChild(scrollDiv)
    return scrollbarWidth
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  function Plugin(option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  var old = $.fn.modal

  $.fn.modal             = Plugin
  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
    var option  = $target.data('bs.modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    if ($this.is('a')) e.preventDefault()

    $target.one('show.bs.modal', function (showEvent) {
      if (showEvent.isDefaultPrevented()) return // only register focus restorer if modal will actually get shown
      $target.one('hidden.bs.modal', function () {
        $this.is(':visible') && $this.trigger('focus')
      })
    })
    Plugin.call($target, option, this)
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.3.7
 * http://getbootstrap.com/javascript/#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       = null
    this.options    = null
    this.enabled    = null
    this.timeout    = null
    this.hoverState = null
    this.$element   = null
    this.inState    = null

    this.init('tooltip', element, options)
  }

  Tooltip.VERSION  = '3.3.7'

  Tooltip.TRANSITION_DURATION = 150

  Tooltip.DEFAULTS = {
    animation: true,
    placement: 'top',
    selector: false,
    template: '<div class="tooltip" role="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
    trigger: 'hover focus',
    title: '',
    delay: 0,
    html: false,
    container: false,
    viewport: {
      selector: 'body',
      padding: 0
    }
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled   = true
    this.type      = type
    this.$element  = $(element)
    this.options   = this.getOptions(options)
    this.$viewport = this.options.viewport && $($.isFunction(this.options.viewport) ? this.options.viewport.call(this, this.$element) : (this.options.viewport.selector || this.options.viewport))
    this.inState   = { click: false, hover: false, focus: false }

    if (this.$element[0] instanceof document.constructor && !this.options.selector) {
      throw new Error('`selector` option must be specified when initializing ' + this.type + ' on the window.document object!')
    }

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focusin'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay,
        hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
    }

    if (self.tip().hasClass('in') || self.hoverState == 'in') {
      self.hoverState = 'in'
      return
    }

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.isInStateTrue = function () {
    for (var key in this.inState) {
      if (this.inState[key]) return true
    }

    return false
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget).data('bs.' + this.type)

    if (!self) {
      self = new this.constructor(obj.currentTarget, this.getDelegateOptions())
      $(obj.currentTarget).data('bs.' + this.type, self)
    }

    if (obj instanceof $.Event) {
      self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
    }

    if (self.isInStateTrue()) return

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.' + this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      var inDom = $.contains(this.$element[0].ownerDocument.documentElement, this.$element[0])
      if (e.isDefaultPrevented() || !inDom) return
      var that = this

      var $tip = this.tip()

      var tipId = this.getUID(this.type)

      this.setContent()
      $tip.attr('id', tipId)
      this.$element.attr('aria-describedby', tipId)

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)
        .data('bs.' + this.type, this)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$element)
      this.$element.trigger('inserted.bs.' + this.type)

      var pos          = this.getPosition()
      var actualWidth  = $tip[0].offsetWidth
      var actualHeight = $tip[0].offsetHeight

      if (autoPlace) {
        var orgPlacement = placement
        var viewportDim = this.getPosition(this.$viewport)

        placement = placement == 'bottom' && pos.bottom + actualHeight > viewportDim.bottom ? 'top'    :
                    placement == 'top'    && pos.top    - actualHeight < viewportDim.top    ? 'bottom' :
                    placement == 'right'  && pos.right  + actualWidth  > viewportDim.width  ? 'left'   :
                    placement == 'left'   && pos.left   - actualWidth  < viewportDim.left   ? 'right'  :
                    placement

        $tip
          .removeClass(orgPlacement)
          .addClass(placement)
      }

      var calculatedOffset = this.getCalculatedOffset(placement, pos, actualWidth, actualHeight)

      this.applyPlacement(calculatedOffset, placement)

      var complete = function () {
        var prevHoverState = that.hoverState
        that.$element.trigger('shown.bs.' + that.type)
        that.hoverState = null

        if (prevHoverState == 'out') that.leave(that)
      }

      $.support.transition && this.$tip.hasClass('fade') ?
        $tip
          .one('bsTransitionEnd', complete)
          .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
        complete()
    }
  }

  Tooltip.prototype.applyPlacement = function (offset, placement) {
    var $tip   = this.tip()
    var width  = $tip[0].offsetWidth
    var height = $tip[0].offsetHeight

    // manually read margins because getBoundingClientRect includes difference
    var marginTop = parseInt($tip.css('margin-top'), 10)
    var marginLeft = parseInt($tip.css('margin-left'), 10)

    // we must check for NaN for ie 8/9
    if (isNaN(marginTop))  marginTop  = 0
    if (isNaN(marginLeft)) marginLeft = 0

    offset.top  += marginTop
    offset.left += marginLeft

    // $.fn.offset doesn't round pixel values
    // so we use setOffset directly with our own function B-0
    $.offset.setOffset($tip[0], $.extend({
      using: function (props) {
        $tip.css({
          top: Math.round(props.top),
          left: Math.round(props.left)
        })
      }
    }, offset), 0)

    $tip.addClass('in')

    // check to see if placing tip in new offset caused the tip to resize itself
    var actualWidth  = $tip[0].offsetWidth
    var actualHeight = $tip[0].offsetHeight

    if (placement == 'top' && actualHeight != height) {
      offset.top = offset.top + height - actualHeight
    }

    var delta = this.getViewportAdjustedDelta(placement, offset, actualWidth, actualHeight)

    if (delta.left) offset.left += delta.left
    else offset.top += delta.top

    var isVertical          = /top|bottom/.test(placement)
    var arrowDelta          = isVertical ? delta.left * 2 - width + actualWidth : delta.top * 2 - height + actualHeight
    var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'

    $tip.offset(offset)
    this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
  }

  Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
    this.arrow()
      .css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
      .css(isVertical ? 'top' : 'left', '')
  }

  Tooltip.prototype.setContent = function () {
    var $tip  = this.tip()
    var title = this.getTitle()

    $tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
    $tip.removeClass('fade in top bottom left right')
  }

  Tooltip.prototype.hide = function (callback) {
    var that = this
    var $tip = $(this.$tip)
    var e    = $.Event('hide.bs.' + this.type)

    function complete() {
      if (that.hoverState != 'in') $tip.detach()
      if (that.$element) { // TODO: Check whether guarding this code with this `if` is really necessary.
        that.$element
          .removeAttr('aria-describedby')
          .trigger('hidden.bs.' + that.type)
      }
      callback && callback()
    }

    this.$element.trigger(e)

    if (e.isDefaultPrevented()) return

    $tip.removeClass('in')

    $.support.transition && $tip.hasClass('fade') ?
      $tip
        .one('bsTransitionEnd', complete)
        .emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
      complete()

    this.hoverState = null

    return this
  }

  Tooltip.prototype.fixTitle = function () {
    var $e = this.$element
    if ($e.attr('title') || typeof $e.attr('data-original-title') != 'string') {
      $e.attr('data-original-title', $e.attr('title') || '').attr('title', '')
    }
  }

  Tooltip.prototype.hasContent = function () {
    return this.getTitle()
  }

  Tooltip.prototype.getPosition = function ($element) {
    $element   = $element || this.$element

    var el     = $element[0]
    var isBody = el.tagName == 'BODY'

    var elRect    = el.getBoundingClientRect()
    if (elRect.width == null) {
      // width and height are missing in IE8, so compute them manually; see https://github.com/twbs/bootstrap/issues/14093
      elRect = $.extend({}, elRect, { width: elRect.right - elRect.left, height: elRect.bottom - elRect.top })
    }
    var isSvg = window.SVGElement && el instanceof window.SVGElement
    // Avoid using $.offset() on SVGs since it gives incorrect results in jQuery 3.
    // See https://github.com/twbs/bootstrap/issues/20280
    var elOffset  = isBody ? { top: 0, left: 0 } : (isSvg ? null : $element.offset())
    var scroll    = { scroll: isBody ? document.documentElement.scrollTop || document.body.scrollTop : $element.scrollTop() }
    var outerDims = isBody ? { width: $(window).width(), height: $(window).height() } : null

    return $.extend({}, elRect, scroll, outerDims, elOffset)
  }

  Tooltip.prototype.getCalculatedOffset = function (placement, pos, actualWidth, actualHeight) {
    return placement == 'bottom' ? { top: pos.top + pos.height,   left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'top'    ? { top: pos.top - actualHeight, left: pos.left + pos.width / 2 - actualWidth / 2 } :
           placement == 'left'   ? { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth } :
        /* placement == 'right' */ { top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width }

  }

  Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos, actualWidth, actualHeight) {
    var delta = { top: 0, left: 0 }
    if (!this.$viewport) return delta

    var viewportPadding = this.options.viewport && this.options.viewport.padding || 0
    var viewportDimensions = this.getPosition(this.$viewport)

    if (/right|left/.test(placement)) {
      var topEdgeOffset    = pos.top - viewportPadding - viewportDimensions.scroll
      var bottomEdgeOffset = pos.top + viewportPadding - viewportDimensions.scroll + actualHeight
      if (topEdgeOffset < viewportDimensions.top) { // top overflow
        delta.top = viewportDimensions.top - topEdgeOffset
      } else if (bottomEdgeOffset > viewportDimensions.top + viewportDimensions.height) { // bottom overflow
        delta.top = viewportDimensions.top + viewportDimensions.height - bottomEdgeOffset
      }
    } else {
      var leftEdgeOffset  = pos.left - viewportPadding
      var rightEdgeOffset = pos.left + viewportPadding + actualWidth
      if (leftEdgeOffset < viewportDimensions.left) { // left overflow
        delta.left = viewportDimensions.left - leftEdgeOffset
      } else if (rightEdgeOffset > viewportDimensions.right) { // right overflow
        delta.left = viewportDimensions.left + viewportDimensions.width - rightEdgeOffset
      }
    }

    return delta
  }

  Tooltip.prototype.getTitle = function () {
    var title
    var $e = this.$element
    var o  = this.options

    title = $e.attr('data-original-title')
      || (typeof o.title == 'function' ? o.title.call($e[0]) :  o.title)

    return title
  }

  Tooltip.prototype.getUID = function (prefix) {
    do prefix += ~~(Math.random() * 1000000)
    while (document.getElementById(prefix))
    return prefix
  }

  Tooltip.prototype.tip = function () {
    if (!this.$tip) {
      this.$tip = $(this.options.template)
      if (this.$tip.length != 1) {
        throw new Error(this.type + ' `template` option must consist of exactly 1 top-level element!')
      }
    }
    return this.$tip
  }

  Tooltip.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
  }

  Tooltip.prototype.enable = function () {
    this.enabled = true
  }

  Tooltip.prototype.disable = function () {
    this.enabled = false
  }

  Tooltip.prototype.toggleEnabled = function () {
    this.enabled = !this.enabled
  }

  Tooltip.prototype.toggle = function (e) {
    var self = this
    if (e) {
      self = $(e.currentTarget).data('bs.' + this.type)
      if (!self) {
        self = new this.constructor(e.currentTarget, this.getDelegateOptions())
        $(e.currentTarget).data('bs.' + this.type, self)
      }
    }

    if (e) {
      self.inState.click = !self.inState.click
      if (self.isInStateTrue()) self.enter(self)
      else self.leave(self)
    } else {
      self.tip().hasClass('in') ? self.leave(self) : self.enter(self)
    }
  }

  Tooltip.prototype.destroy = function () {
    var that = this
    clearTimeout(this.timeout)
    this.hide(function () {
      that.$element.off('.' + that.type).removeData('bs.' + that.type)
      if (that.$tip) {
        that.$tip.detach()
      }
      that.$tip = null
      that.$arrow = null
      that.$viewport = null
      that.$element = null
    })
  }


  // TOOLTIP PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.tooltip')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.tooltip', (data = new Tooltip(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tooltip

  $.fn.tooltip             = Plugin
  $.fn.tooltip.Constructor = Tooltip


  // TOOLTIP NO CONFLICT
  // ===================

  $.fn.tooltip.noConflict = function () {
    $.fn.tooltip = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: popover.js v3.3.7
 * http://getbootstrap.com/javascript/#popovers
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // POPOVER PUBLIC CLASS DEFINITION
  // ===============================

  var Popover = function (element, options) {
    this.init('popover', element, options)
  }

  if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')

  Popover.VERSION  = '3.3.7'

  Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
    placement: 'right',
    trigger: 'click',
    content: '',
    template: '<div class="popover" role="tooltip"><div class="arrow"></div><h3 class="popover-title"></h3><div class="popover-content"></div></div>'
  })


  // NOTE: POPOVER EXTENDS tooltip.js
  // ================================

  Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)

  Popover.prototype.constructor = Popover

  Popover.prototype.getDefaults = function () {
    return Popover.DEFAULTS
  }

  Popover.prototype.setContent = function () {
    var $tip    = this.tip()
    var title   = this.getTitle()
    var content = this.getContent()

    $tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
    $tip.find('.popover-content').children().detach().end()[ // we use append for html objects to maintain js events
      this.options.html ? (typeof content == 'string' ? 'html' : 'append') : 'text'
    ](content)

    $tip.removeClass('fade top bottom left right in')

    // IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to do
    // this manually by checking the contents.
    if (!$tip.find('.popover-title').html()) $tip.find('.popover-title').hide()
  }

  Popover.prototype.hasContent = function () {
    return this.getTitle() || this.getContent()
  }

  Popover.prototype.getContent = function () {
    var $e = this.$element
    var o  = this.options

    return $e.attr('data-content')
      || (typeof o.content == 'function' ?
            o.content.call($e[0]) :
            o.content)
  }

  Popover.prototype.arrow = function () {
    return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
  }


  // POPOVER PLUGIN DEFINITION
  // =========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.popover')
      var options = typeof option == 'object' && option

      if (!data && /destroy|hide/.test(option)) return
      if (!data) $this.data('bs.popover', (data = new Popover(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.popover

  $.fn.popover             = Plugin
  $.fn.popover.Constructor = Popover


  // POPOVER NO CONFLICT
  // ===================

  $.fn.popover.noConflict = function () {
    $.fn.popover = old
    return this
  }

}(jQuery);

/* ========================================================================
 * Bootstrap: scrollspy.js v3.3.7
 * http://getbootstrap.com/javascript/#scrollspy
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // SCROLLSPY CLASS DEFINITION
  // ==========================

  function ScrollSpy(element, options) {
    this.$body          = $(document.body)
    this.$scrollElement = $(element).is(document.body) ? $(window) : $(element)
    this.options        = $.extend({}, ScrollSpy.DEFAULTS, options)
    this.selector       = (this.options.target || '') + ' .nav li > a'
    this.offsets        = []
    this.targets        = []
    this.activeTarget   = null
    this.scrollHeight   = 0

    this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process, this))
    this.refresh()
    this.process()
  }

  ScrollSpy.VERSION  = '3.3.7'

  ScrollSpy.DEFAULTS = {
    offset: 10
  }

  ScrollSpy.prototype.getScrollHeight = function () {
    return this.$scrollElement[0].scrollHeight || Math.max(this.$body[0].scrollHeight, document.documentElement.scrollHeight)
  }

  ScrollSpy.prototype.refresh = function () {
    var that          = this
    var offsetMethod  = 'offset'
    var offsetBase    = 0

    this.offsets      = []
    this.targets      = []
    this.scrollHeight = this.getScrollHeight()

    if (!$.isWindow(this.$scrollElement[0])) {
      offsetMethod = 'position'
      offsetBase   = this.$scrollElement.scrollTop()
    }

    this.$body
      .find(this.selector)
      .map(function () {
        var $el   = $(this)
        var href  = $el.data('target') || $el.attr('href')
        var $href = /^#./.test(href) && $(href)

        return ($href
          && $href.length
          && $href.is(':visible')
          && [[$href[offsetMethod]().top + offsetBase, href]]) || null
      })
      .sort(function (a, b) { return a[0] - b[0] })
      .each(function () {
        that.offsets.push(this[0])
        that.targets.push(this[1])
      })
  }

  ScrollSpy.prototype.process = function () {
    var scrollTop    = this.$scrollElement.scrollTop() + this.options.offset
    var scrollHeight = this.getScrollHeight()
    var maxScroll    = this.options.offset + scrollHeight - this.$scrollElement.height()
    var offsets      = this.offsets
    var targets      = this.targets
    var activeTarget = this.activeTarget
    var i

    if (this.scrollHeight != scrollHeight) {
      this.refresh()
    }

    if (scrollTop >= maxScroll) {
      return activeTarget != (i = targets[targets.length - 1]) && this.activate(i)
    }

    if (activeTarget && scrollTop < offsets[0]) {
      this.activeTarget = null
      return this.clear()
    }

    for (i = offsets.length; i--;) {
      activeTarget != targets[i]
        && scrollTop >= offsets[i]
        && (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
        && this.activate(targets[i])
    }
  }

  ScrollSpy.prototype.activate = function (target) {
    this.activeTarget = target

    this.clear()

    var selector = this.selector +
      '[data-target="' + target + '"],' +
      this.selector + '[href="' + target + '"]'

    var active = $(selector)
      .parents('li')
      .addClass('active')

    if (active.parent('.dropdown-menu').length) {
      active = active
        .closest('li.dropdown')
        .addClass('active')
    }

    active.trigger('activate.bs.scrollspy')
  }

  ScrollSpy.prototype.clear = function () {
    $(this.selector)
      .parentsUntil(this.options.target, '.active')
      .removeClass('active')
  }


  // SCROLLSPY PLUGIN DEFINITION
  // ===========================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.scrollspy')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.scrollspy

  $.fn.scrollspy             = Plugin
  $.fn.scrollspy.Constructor = ScrollSpy


  // SCROLLSPY NO CONFLICT
  // =====================

  $.fn.scrollspy.noConflict = function () {
    $.fn.scrollspy = old
    return this
  }


  // SCROLLSPY DATA-API
  // ==================

  $(window).on('load.bs.scrollspy.data-api', function () {
    $('[data-spy="scroll"]').each(function () {
      var $spy = $(this)
      Plugin.call($spy, $spy.data())
    })
  })

}(jQuery);

/* ========================================================================
 * Bootstrap: tab.js v3.3.7
 * http://getbootstrap.com/javascript/#tabs
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // TAB CLASS DEFINITION
  // ====================

  var Tab = function (element) {
    // jscs:disable requireDollarBeforejQueryAssignment
    this.element = $(element)
    // jscs:enable requireDollarBeforejQueryAssignment
  }

  Tab.VERSION = '3.3.7'

  Tab.TRANSITION_DURATION = 150

  Tab.prototype.show = function () {
    var $this    = this.element
    var $ul      = $this.closest('ul:not(.dropdown-menu)')
    var selector = $this.data('target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    if ($this.parent('li').hasClass('active')) return

    var $previous = $ul.find('.active:last a')
    var hideEvent = $.Event('hide.bs.tab', {
      relatedTarget: $this[0]
    })
    var showEvent = $.Event('show.bs.tab', {
      relatedTarget: $previous[0]
    })

    $previous.trigger(hideEvent)
    $this.trigger(showEvent)

    if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented()) return

    var $target = $(selector)

    this.activate($this.closest('li'), $ul)
    this.activate($target, $target.parent(), function () {
      $previous.trigger({
        type: 'hidden.bs.tab',
        relatedTarget: $this[0]
      })
      $this.trigger({
        type: 'shown.bs.tab',
        relatedTarget: $previous[0]
      })
    })
  }

  Tab.prototype.activate = function (element, container, callback) {
    var $active    = container.find('> .active')
    var transition = callback
      && $.support.transition
      && ($active.length && $active.hasClass('fade') || !!container.find('> .fade').length)

    function next() {
      $active
        .removeClass('active')
        .find('> .dropdown-menu > .active')
          .removeClass('active')
        .end()
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', false)

      element
        .addClass('active')
        .find('[data-toggle="tab"]')
          .attr('aria-expanded', true)

      if (transition) {
        element[0].offsetWidth // reflow for transition
        element.addClass('in')
      } else {
        element.removeClass('fade')
      }

      if (element.parent('.dropdown-menu').length) {
        element
          .closest('li.dropdown')
            .addClass('active')
          .end()
          .find('[data-toggle="tab"]')
            .attr('aria-expanded', true)
      }

      callback && callback()
    }

    $active.length && transition ?
      $active
        .one('bsTransitionEnd', next)
        .emulateTransitionEnd(Tab.TRANSITION_DURATION) :
      next()

    $active.removeClass('in')
  }


  // TAB PLUGIN DEFINITION
  // =====================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.tab')

      if (!data) $this.data('bs.tab', (data = new Tab(this)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.tab

  $.fn.tab             = Plugin
  $.fn.tab.Constructor = Tab


  // TAB NO CONFLICT
  // ===============

  $.fn.tab.noConflict = function () {
    $.fn.tab = old
    return this
  }


  // TAB DATA-API
  // ============

  var clickHandler = function (e) {
    e.preventDefault()
    Plugin.call($(this), 'show')
  }

  $(document)
    .on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
    .on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)

}(jQuery);

/* ========================================================================
 * Bootstrap: affix.js v3.3.7
 * http://getbootstrap.com/javascript/#affix
 * ========================================================================
 * Copyright 2011-2016 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // AFFIX CLASS DEFINITION
  // ======================

  var Affix = function (element, options) {
    this.options = $.extend({}, Affix.DEFAULTS, options)

    this.$target = $(this.options.target)
      .on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
      .on('click.bs.affix.data-api',  $.proxy(this.checkPositionWithEventLoop, this))

    this.$element     = $(element)
    this.affixed      = null
    this.unpin        = null
    this.pinnedOffset = null

    this.checkPosition()
  }

  Affix.VERSION  = '3.3.7'

  Affix.RESET    = 'affix affix-top affix-bottom'

  Affix.DEFAULTS = {
    offset: 0,
    target: window
  }

  Affix.prototype.getState = function (scrollHeight, height, offsetTop, offsetBottom) {
    var scrollTop    = this.$target.scrollTop()
    var position     = this.$element.offset()
    var targetHeight = this.$target.height()

    if (offsetTop != null && this.affixed == 'top') return scrollTop < offsetTop ? 'top' : false

    if (this.affixed == 'bottom') {
      if (offsetTop != null) return (scrollTop + this.unpin <= position.top) ? false : 'bottom'
      return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false : 'bottom'
    }

    var initializing   = this.affixed == null
    var colliderTop    = initializing ? scrollTop : position.top
    var colliderHeight = initializing ? targetHeight : height

    if (offsetTop != null && scrollTop <= offsetTop) return 'top'
    if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight - offsetBottom)) return 'bottom'

    return false
  }

  Affix.prototype.getPinnedOffset = function () {
    if (this.pinnedOffset) return this.pinnedOffset
    this.$element.removeClass(Affix.RESET).addClass('affix')
    var scrollTop = this.$target.scrollTop()
    var position  = this.$element.offset()
    return (this.pinnedOffset = position.top - scrollTop)
  }

  Affix.prototype.checkPositionWithEventLoop = function () {
    setTimeout($.proxy(this.checkPosition, this), 1)
  }

  Affix.prototype.checkPosition = function () {
    if (!this.$element.is(':visible')) return

    var height       = this.$element.height()
    var offset       = this.options.offset
    var offsetTop    = offset.top
    var offsetBottom = offset.bottom
    var scrollHeight = Math.max($(document).height(), $(document.body).height())

    if (typeof offset != 'object')         offsetBottom = offsetTop = offset
    if (typeof offsetTop == 'function')    offsetTop    = offset.top(this.$element)
    if (typeof offsetBottom == 'function') offsetBottom = offset.bottom(this.$element)

    var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)

    if (this.affixed != affix) {
      if (this.unpin != null) this.$element.css('top', '')

      var affixType = 'affix' + (affix ? '-' + affix : '')
      var e         = $.Event(affixType + '.bs.affix')

      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      this.affixed = affix
      this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null

      this.$element
        .removeClass(Affix.RESET)
        .addClass(affixType)
        .trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
    }

    if (affix == 'bottom') {
      this.$element.offset({
        top: scrollHeight - height - offsetBottom
      })
    }
  }


  // AFFIX PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.affix')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  var old = $.fn.affix

  $.fn.affix             = Plugin
  $.fn.affix.Constructor = Affix


  // AFFIX NO CONFLICT
  // =================

  $.fn.affix.noConflict = function () {
    $.fn.affix = old
    return this
  }


  // AFFIX DATA-API
  // ==============

  $(window).on('load', function () {
    $('[data-spy="affix"]').each(function () {
      var $spy = $(this)
      var data = $spy.data()

      data.offset = data.offset || {}

      if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
      if (data.offsetTop    != null) data.offset.top    = data.offsetTop

      Plugin.call($spy, data)
    })
  })

}(jQuery);

/*
 * jQuery FlexSlider v2.6.4
 * Copyright 2012 WooThemes
 * Contributing Author: Tyler Smith
 */
;
(function ($) {

  var focused = true;

  //FlexSlider: Object Instance
  $.flexslider = function(el, options) {
    var slider = $(el);

    // making variables public
    slider.vars = $.extend({}, $.flexslider.defaults, options);

    var namespace = slider.vars.namespace,
        msGesture = window.navigator && window.navigator.msPointerEnabled && window.MSGesture,
        touch = (( "ontouchstart" in window ) || msGesture || window.DocumentTouch && document instanceof DocumentTouch) && slider.vars.touch,
        // deprecating this idea, as devices are being released with both of these events
        eventType = "click touchend MSPointerUp keyup",
        watchedEvent = "",
        watchedEventClearTimer,
        vertical = slider.vars.direction === "vertical",
        reverse = slider.vars.reverse,
        carousel = (slider.vars.itemWidth > 0),
        fade = slider.vars.animation === "fade",
        asNav = slider.vars.asNavFor !== "",
        methods = {};

    // Store a reference to the slider object
    $.data(el, "flexslider", slider);

    // Private slider methods
    methods = {
      init: function() {
        slider.animating = false;
        // Get current slide and make sure it is a number
        slider.currentSlide = parseInt( ( slider.vars.startAt ? slider.vars.startAt : 0), 10 );
        if ( isNaN( slider.currentSlide ) ) { slider.currentSlide = 0; }
        slider.animatingTo = slider.currentSlide;
        slider.atEnd = (slider.currentSlide === 0 || slider.currentSlide === slider.last);
        slider.containerSelector = slider.vars.selector.substr(0,slider.vars.selector.search(' '));
        slider.slides = $(slider.vars.selector, slider);
        slider.container = $(slider.containerSelector, slider);
        slider.count = slider.slides.length;
        // SYNC:
        slider.syncExists = $(slider.vars.sync).length > 0;
        // SLIDE:
        if (slider.vars.animation === "slide") { slider.vars.animation = "swing"; }
        slider.prop = (vertical) ? "top" : "marginLeft";
        slider.args = {};
        // SLIDESHOW:
        slider.manualPause = false;
        slider.stopped = false;
        //PAUSE WHEN INVISIBLE
        slider.started = false;
        slider.startTimeout = null;
        // TOUCH/USECSS:
        slider.transitions = !slider.vars.video && !fade && slider.vars.useCSS && (function() {
          var obj = document.createElement('div'),
              props = ['perspectiveProperty', 'WebkitPerspective', 'MozPerspective', 'OPerspective', 'msPerspective'];
          for (var i in props) {
            if ( obj.style[ props[i] ] !== undefined ) {
              slider.pfx = props[i].replace('Perspective','').toLowerCase();
              slider.prop = "-" + slider.pfx + "-transform";
              return true;
            }
          }
          return false;
        }());
        slider.ensureAnimationEnd = '';
        // CONTROLSCONTAINER:
        if (slider.vars.controlsContainer !== "") slider.controlsContainer = $(slider.vars.controlsContainer).length > 0 && $(slider.vars.controlsContainer);
        // MANUAL:
        if (slider.vars.manualControls !== "") slider.manualControls = $(slider.vars.manualControls).length > 0 && $(slider.vars.manualControls);

        // CUSTOM DIRECTION NAV:
        if (slider.vars.customDirectionNav !== "") slider.customDirectionNav = $(slider.vars.customDirectionNav).length === 2 && $(slider.vars.customDirectionNav);

        // RANDOMIZE:
        if (slider.vars.randomize) {
          slider.slides.sort(function() { return (Math.round(Math.random())-0.5); });
          slider.container.empty().append(slider.slides);
        }

        slider.doMath();

        // INIT
        slider.setup("init");

        // CONTROLNAV:
        if (slider.vars.controlNav) { methods.controlNav.setup(); }

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.setup(); }

        // KEYBOARD:
        if (slider.vars.keyboard && ($(slider.containerSelector).length === 1 || slider.vars.multipleKeyboard)) {
          $(document).bind('keyup', function(event) {
            var keycode = event.keyCode;
            if (!slider.animating && (keycode === 39 || keycode === 37)) {
              var target = (keycode === 39) ? slider.getTarget('next') :
                           (keycode === 37) ? slider.getTarget('prev') : false;
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }
          });
        }
        // MOUSEWHEEL:
        if (slider.vars.mousewheel) {
          slider.bind('mousewheel', function(event, delta, deltaX, deltaY) {
            event.preventDefault();
            var target = (delta < 0) ? slider.getTarget('next') : slider.getTarget('prev');
            slider.flexAnimate(target, slider.vars.pauseOnAction);
          });
        }

        // PAUSEPLAY
        if (slider.vars.pausePlay) { methods.pausePlay.setup(); }

        //PAUSE WHEN INVISIBLE
        if (slider.vars.slideshow && slider.vars.pauseInvisible) { methods.pauseInvisible.init(); }

        // SLIDSESHOW
        if (slider.vars.slideshow) {
          if (slider.vars.pauseOnHover) {
            slider.hover(function() {
              if (!slider.manualPlay && !slider.manualPause) { slider.pause(); }
            }, function() {
              if (!slider.manualPause && !slider.manualPlay && !slider.stopped) { slider.play(); }
            });
          }
          // initialize animation
          //If we're visible, or we don't use PageVisibility API
          if(!slider.vars.pauseInvisible || !methods.pauseInvisible.isHidden()) {
            (slider.vars.initDelay > 0) ? slider.startTimeout = setTimeout(slider.play, slider.vars.initDelay) : slider.play();
          }
        }

        // ASNAV:
        if (asNav) { methods.asNav.setup(); }

        // TOUCH
        if (touch && slider.vars.touch) { methods.touch(); }

        // FADE&&SMOOTHHEIGHT || SLIDE:
        if (!fade || (fade && slider.vars.smoothHeight)) { $(window).bind("resize orientationchange focus", methods.resize()); }

        slider.find("img").attr("draggable", "false");

        // API: start() Callback
        setTimeout(function(){
          slider.vars.start(slider);
        }, 200);
      },
      asNav: {
        setup: function() {
          slider.asNav = true;
          slider.animatingTo = Math.floor(slider.currentSlide/slider.move);
          slider.currentItem = slider.currentSlide;
          slider.slides.removeClass(namespace + "active-slide").eq(slider.currentItem).addClass(namespace + "active-slide");
          if(!msGesture){
              slider.slides.on(eventType, function(e){
                e.preventDefault();
                var $slide = $(this),
                    target = $slide.index();
                var posFromLeft = $slide.offset().left - $(slider).scrollLeft(); // Find position of slide relative to left of slider container
                if( posFromLeft <= 0 && $slide.hasClass( namespace + 'active-slide' ) ) {
                  slider.flexAnimate(slider.getTarget("prev"), true);
                } else if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass(namespace + "active-slide")) {
                  slider.direction = (slider.currentItem < target) ? "next" : "prev";
                  slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                }
              });
          }else{
              el._slider = slider;
              slider.slides.each(function (){
                  var that = this;
                  that._gesture = new MSGesture();
                  that._gesture.target = that;
                  that.addEventListener("MSPointerDown", function (e){
                      e.preventDefault();
                      if(e.currentTarget._gesture) {
                        e.currentTarget._gesture.addPointer(e.pointerId);
                      }
                  }, false);
                  that.addEventListener("MSGestureTap", function (e){
                      e.preventDefault();
                      var $slide = $(this),
                          target = $slide.index();
                      if (!$(slider.vars.asNavFor).data('flexslider').animating && !$slide.hasClass('active')) {
                          slider.direction = (slider.currentItem < target) ? "next" : "prev";
                          slider.flexAnimate(target, slider.vars.pauseOnAction, false, true, true);
                      }
                  });
              });
          }
        }
      },
      controlNav: {
        setup: function() {
          if (!slider.manualControls) {
            methods.controlNav.setupPaging();
          } else { // MANUALCONTROLS:
            methods.controlNav.setupManual();
          }
        },
        setupPaging: function() {
          var type = (slider.vars.controlNav === "thumbnails") ? 'control-thumbs' : 'control-paging',
              j = 1,
              item,
              slide;

          slider.controlNavScaffold = $('<ol class="'+ namespace + 'control-nav ' + namespace + type + '"></ol>');

          if (slider.pagingCount > 1) {
            for (var i = 0; i < slider.pagingCount; i++) {
              slide = slider.slides.eq(i);
              if ( undefined === slide.attr( 'data-thumb-alt' ) ) { slide.attr( 'data-thumb-alt', '' ); }
              var altText = ( '' !== slide.attr( 'data-thumb-alt' ) ) ? altText = ' alt="' + slide.attr( 'data-thumb-alt' ) + '"' : '';
              item = (slider.vars.controlNav === "thumbnails") ? '<img src="' + slide.attr( 'data-thumb' ) + '"' + altText + '/>' : '<a href="#">' + j + '</a>';
              if ( 'thumbnails' === slider.vars.controlNav && true === slider.vars.thumbCaptions ) {
                var captn = slide.attr( 'data-thumbcaption' );
                if ( '' !== captn && undefined !== captn ) { item += '<span class="' + namespace + 'caption">' + captn + '</span>'; }
              }
              slider.controlNavScaffold.append('<li>' + item + '</li>');
              j++;
            }
          }

          // CONTROLSCONTAINER:
          (slider.controlsContainer) ? $(slider.controlsContainer).append(slider.controlNavScaffold) : slider.append(slider.controlNavScaffold);
          methods.controlNav.set();

          methods.controlNav.active();

          slider.controlNavScaffold.delegate('a, img', eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                slider.direction = (target > slider.currentSlide) ? "next" : "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();

          });
        },
        setupManual: function() {
          slider.controlNav = slider.manualControls;
          methods.controlNav.active();

          slider.controlNav.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              var $this = $(this),
                  target = slider.controlNav.index($this);

              if (!$this.hasClass(namespace + 'active')) {
                (target > slider.currentSlide) ? slider.direction = "next" : slider.direction = "prev";
                slider.flexAnimate(target, slider.vars.pauseOnAction);
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        set: function() {
          var selector = (slider.vars.controlNav === "thumbnails") ? 'img' : 'a';
          slider.controlNav = $('.' + namespace + 'control-nav li ' + selector, (slider.controlsContainer) ? slider.controlsContainer : slider);
        },
        active: function() {
          slider.controlNav.removeClass(namespace + "active").eq(slider.animatingTo).addClass(namespace + "active");
        },
        update: function(action, pos) {
          if (slider.pagingCount > 1 && action === "add") {
            slider.controlNavScaffold.append($('<li><a href="#">' + slider.count + '</a></li>'));
          } else if (slider.pagingCount === 1) {
            slider.controlNavScaffold.find('li').remove();
          } else {
            slider.controlNav.eq(pos).closest('li').remove();
          }
          methods.controlNav.set();
          (slider.pagingCount > 1 && slider.pagingCount !== slider.controlNav.length) ? slider.update(pos, action) : methods.controlNav.active();
        }
      },
      directionNav: {
        setup: function() {
          var directionNavScaffold = $('<ul class="' + namespace + 'direction-nav"><li class="' + namespace + 'nav-prev"><a class="' + namespace + 'prev" href="#">' + slider.vars.prevText + '</a></li><li class="' + namespace + 'nav-next"><a class="' + namespace + 'next" href="#">' + slider.vars.nextText + '</a></li></ul>');

          // CUSTOM DIRECTION NAV:
          if (slider.customDirectionNav) {
            slider.directionNav = slider.customDirectionNav;
          // CONTROLSCONTAINER:
          } else if (slider.controlsContainer) {
            $(slider.controlsContainer).append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider.controlsContainer);
          } else {
            slider.append(directionNavScaffold);
            slider.directionNav = $('.' + namespace + 'direction-nav li a', slider);
          }

          methods.directionNav.update();

          slider.directionNav.bind(eventType, function(event) {
            event.preventDefault();
            var target;

            if (watchedEvent === "" || watchedEvent === event.type) {
              target = ($(this).hasClass(namespace + 'next')) ? slider.getTarget('next') : slider.getTarget('prev');
              slider.flexAnimate(target, slider.vars.pauseOnAction);
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function() {
          var disabledClass = namespace + 'disabled';
          if (slider.pagingCount === 1) {
            slider.directionNav.addClass(disabledClass).attr('tabindex', '-1');
          } else if (!slider.vars.animationLoop) {
            if (slider.animatingTo === 0) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "prev").addClass(disabledClass).attr('tabindex', '-1');
            } else if (slider.animatingTo === slider.last) {
              slider.directionNav.removeClass(disabledClass).filter('.' + namespace + "next").addClass(disabledClass).attr('tabindex', '-1');
            } else {
              slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
            }
          } else {
            slider.directionNav.removeClass(disabledClass).removeAttr('tabindex');
          }
        }
      },
      pausePlay: {
        setup: function() {
          var pausePlayScaffold = $('<div class="' + namespace + 'pauseplay"><a href="#"></a></div>');

          // CONTROLSCONTAINER:
          if (slider.controlsContainer) {
            slider.controlsContainer.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider.controlsContainer);
          } else {
            slider.append(pausePlayScaffold);
            slider.pausePlay = $('.' + namespace + 'pauseplay a', slider);
          }

          methods.pausePlay.update((slider.vars.slideshow) ? namespace + 'pause' : namespace + 'play');

          slider.pausePlay.bind(eventType, function(event) {
            event.preventDefault();

            if (watchedEvent === "" || watchedEvent === event.type) {
              if ($(this).hasClass(namespace + 'pause')) {
                slider.manualPause = true;
                slider.manualPlay = false;
                slider.pause();
              } else {
                slider.manualPause = false;
                slider.manualPlay = true;
                slider.play();
              }
            }

            // setup flags to prevent event duplication
            if (watchedEvent === "") {
              watchedEvent = event.type;
            }
            methods.setToClearWatchedEvent();
          });
        },
        update: function(state) {
          (state === "play") ? slider.pausePlay.removeClass(namespace + 'pause').addClass(namespace + 'play').html(slider.vars.playText) : slider.pausePlay.removeClass(namespace + 'play').addClass(namespace + 'pause').html(slider.vars.pauseText);
        }
      },
      touch: function() {
        var startX,
          startY,
          offset,
          cwidth,
          dx,
          startT,
          onTouchStart,
          onTouchMove,
          onTouchEnd,
          scrolling = false,
          localX = 0,
          localY = 0,
          accDx = 0;

        if(!msGesture){
            onTouchStart = function(e) {
              if (slider.animating) {
                e.preventDefault();
              } else if ( ( window.navigator.msPointerEnabled ) || e.touches.length === 1 ) {
                slider.pause();
                // CAROUSEL:
                cwidth = (vertical) ? slider.h : slider. w;
                startT = Number(new Date());
                // CAROUSEL:

                // Local vars for X and Y points.
                localX = e.touches[0].pageX;
                localY = e.touches[0].pageY;

                offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                         (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                         (carousel && slider.currentSlide === slider.last) ? slider.limit :
                         (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                         (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                startX = (vertical) ? localY : localX;
                startY = (vertical) ? localX : localY;

                el.addEventListener('touchmove', onTouchMove, false);
                el.addEventListener('touchend', onTouchEnd, false);
              }
            };

            onTouchMove = function(e) {
              // Local vars for X and Y points.

              localX = e.touches[0].pageX;
              localY = e.touches[0].pageY;

              dx = (vertical) ? startX - localY : startX - localX;
              scrolling = (vertical) ? (Math.abs(dx) < Math.abs(localX - startY)) : (Math.abs(dx) < Math.abs(localY - startY));

              var fxms = 500;

              if ( ! scrolling || Number( new Date() ) - startT > fxms ) {
                e.preventDefault();
                if (!fade && slider.transitions) {
                  if (!slider.vars.animationLoop) {
                    dx = dx/((slider.currentSlide === 0 && dx < 0 || slider.currentSlide === slider.last && dx > 0) ? (Math.abs(dx)/cwidth+2) : 1);
                  }
                  slider.setProps(offset + dx, "setTouch");
                }
              }
            };

            onTouchEnd = function(e) {
              // finish the touch by undoing the touch session
              el.removeEventListener('touchmove', onTouchMove, false);

              if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                var updateDx = (reverse) ? -dx : dx,
                    target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                  slider.flexAnimate(target, slider.vars.pauseOnAction);
                } else {
                  if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                }
              }
              el.removeEventListener('touchend', onTouchEnd, false);

              startX = null;
              startY = null;
              dx = null;
              offset = null;
            };

            el.addEventListener('touchstart', onTouchStart, false);
        }else{
            el.style.msTouchAction = "none";
            el._gesture = new MSGesture();
            el._gesture.target = el;
            el.addEventListener("MSPointerDown", onMSPointerDown, false);
            el._slider = slider;
            el.addEventListener("MSGestureChange", onMSGestureChange, false);
            el.addEventListener("MSGestureEnd", onMSGestureEnd, false);

            function onMSPointerDown(e){
                e.stopPropagation();
                if (slider.animating) {
                    e.preventDefault();
                }else{
                    slider.pause();
                    el._gesture.addPointer(e.pointerId);
                    accDx = 0;
                    cwidth = (vertical) ? slider.h : slider. w;
                    startT = Number(new Date());
                    // CAROUSEL:

                    offset = (carousel && reverse && slider.animatingTo === slider.last) ? 0 :
                        (carousel && reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                            (carousel && slider.currentSlide === slider.last) ? slider.limit :
                                (carousel) ? ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.currentSlide :
                                    (reverse) ? (slider.last - slider.currentSlide + slider.cloneOffset) * cwidth : (slider.currentSlide + slider.cloneOffset) * cwidth;
                }
            }

            function onMSGestureChange(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                var transX = -e.translationX,
                    transY = -e.translationY;

                //Accumulate translations.
                accDx = accDx + ((vertical) ? transY : transX);
                dx = accDx;
                scrolling = (vertical) ? (Math.abs(accDx) < Math.abs(-transX)) : (Math.abs(accDx) < Math.abs(-transY));

                if(e.detail === e.MSGESTURE_FLAG_INERTIA){
                    setImmediate(function (){
                        el._gesture.stop();
                    });

                    return;
                }

                if (!scrolling || Number(new Date()) - startT > 500) {
                    e.preventDefault();
                    if (!fade && slider.transitions) {
                        if (!slider.vars.animationLoop) {
                            dx = accDx / ((slider.currentSlide === 0 && accDx < 0 || slider.currentSlide === slider.last && accDx > 0) ? (Math.abs(accDx) / cwidth + 2) : 1);
                        }
                        slider.setProps(offset + dx, "setTouch");
                    }
                }
            }

            function onMSGestureEnd(e) {
                e.stopPropagation();
                var slider = e.target._slider;
                if(!slider){
                    return;
                }
                if (slider.animatingTo === slider.currentSlide && !scrolling && !(dx === null)) {
                    var updateDx = (reverse) ? -dx : dx,
                        target = (updateDx > 0) ? slider.getTarget('next') : slider.getTarget('prev');

                    if (slider.canAdvance(target) && (Number(new Date()) - startT < 550 && Math.abs(updateDx) > 50 || Math.abs(updateDx) > cwidth/2)) {
                        slider.flexAnimate(target, slider.vars.pauseOnAction);
                    } else {
                        if (!fade) { slider.flexAnimate(slider.currentSlide, slider.vars.pauseOnAction, true); }
                    }
                }

                startX = null;
                startY = null;
                dx = null;
                offset = null;
                accDx = 0;
            }
        }
      },
      resize: function() {
        if (!slider.animating && slider.is(':visible')) {
          if (!carousel) { slider.doMath(); }

          if (fade) {
            // SMOOTH HEIGHT:
            methods.smoothHeight();
          } else if (carousel) { //CAROUSEL:
            slider.slides.width(slider.computedW);
            slider.update(slider.pagingCount);
            slider.setProps();
          }
          else if (vertical) { //VERTICAL:
            slider.viewport.height(slider.h);
            slider.setProps(slider.h, "setTotal");
          } else {
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
            slider.newSlides.width(slider.computedW);
            slider.setProps(slider.computedW, "setTotal");
          }
        }
      },
      smoothHeight: function(dur) {
        if (!vertical || fade) {
          var $obj = (fade) ? slider : slider.viewport;
          (dur) ? $obj.animate({"height": slider.slides.eq(slider.animatingTo).innerHeight()}, dur) : $obj.innerHeight(slider.slides.eq(slider.animatingTo).innerHeight());
        }
      },
      sync: function(action) {
        var $obj = $(slider.vars.sync).data("flexslider"),
            target = slider.animatingTo;

        switch (action) {
          case "animate": $obj.flexAnimate(target, slider.vars.pauseOnAction, false, true); break;
          case "play": if (!$obj.playing && !$obj.asNav) { $obj.play(); } break;
          case "pause": $obj.pause(); break;
        }
      },
      uniqueID: function($clone) {
        // Append _clone to current level and children elements with id attributes
        $clone.filter( '[id]' ).add($clone.find( '[id]' )).each(function() {
          var $this = $(this);
          $this.attr( 'id', $this.attr( 'id' ) + '_clone' );
        });
        return $clone;
      },
      pauseInvisible: {
        visProp: null,
        init: function() {
          var visProp = methods.pauseInvisible.getHiddenProp();
          if (visProp) {
            var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';
            document.addEventListener(evtname, function() {
              if (methods.pauseInvisible.isHidden()) {
                if(slider.startTimeout) {
                  clearTimeout(slider.startTimeout); //If clock is ticking, stop timer and prevent from starting while invisible
                } else {
                  slider.pause(); //Or just pause
                }
              }
              else {
                if(slider.started) {
                  slider.play(); //Initiated before, just play
                } else {
                  if (slider.vars.initDelay > 0) {
                    setTimeout(slider.play, slider.vars.initDelay);
                  } else {
                    slider.play(); //Didn't init before: simply init or wait for it
                  }
                }
              }
            });
          }
        },
        isHidden: function() {
          var prop = methods.pauseInvisible.getHiddenProp();
          if (!prop) {
            return false;
          }
          return document[prop];
        },
        getHiddenProp: function() {
          var prefixes = ['webkit','moz','ms','o'];
          // if 'hidden' is natively supported just return it
          if ('hidden' in document) {
            return 'hidden';
          }
          // otherwise loop over all the known prefixes until we find one
          for ( var i = 0; i < prefixes.length; i++ ) {
              if ((prefixes[i] + 'Hidden') in document) {
                return prefixes[i] + 'Hidden';
              }
          }
          // otherwise it's not supported
          return null;
        }
      },
      setToClearWatchedEvent: function() {
        clearTimeout(watchedEventClearTimer);
        watchedEventClearTimer = setTimeout(function() {
          watchedEvent = "";
        }, 3000);
      }
    };

    // public methods
    slider.flexAnimate = function(target, pause, override, withSync, fromNav) {
      if (!slider.vars.animationLoop && target !== slider.currentSlide) {
        slider.direction = (target > slider.currentSlide) ? "next" : "prev";
      }

      if (asNav && slider.pagingCount === 1) slider.direction = (slider.currentItem < target) ? "next" : "prev";

      if (!slider.animating && (slider.canAdvance(target, fromNav) || override) && slider.is(":visible")) {
        if (asNav && withSync) {
          var master = $(slider.vars.asNavFor).data('flexslider');
          slider.atEnd = target === 0 || target === slider.count - 1;
          master.flexAnimate(target, true, false, true, fromNav);
          slider.direction = (slider.currentItem < target) ? "next" : "prev";
          master.direction = slider.direction;

          if (Math.ceil((target + 1)/slider.visible) - 1 !== slider.currentSlide && target !== 0) {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            target = Math.floor(target/slider.visible);
          } else {
            slider.currentItem = target;
            slider.slides.removeClass(namespace + "active-slide").eq(target).addClass(namespace + "active-slide");
            return false;
          }
        }

        slider.animating = true;
        slider.animatingTo = target;

        // SLIDESHOW:
        if (pause) { slider.pause(); }

        // API: before() animation Callback
        slider.vars.before(slider);

        // SYNC:
        if (slider.syncExists && !fromNav) { methods.sync("animate"); }

        // CONTROLNAV
        if (slider.vars.controlNav) { methods.controlNav.active(); }

        // !CAROUSEL:
        // CANDIDATE: slide active class (for add/remove slide)
        if (!carousel) { slider.slides.removeClass(namespace + 'active-slide').eq(target).addClass(namespace + 'active-slide'); }

        // INFINITE LOOP:
        // CANDIDATE: atEnd
        slider.atEnd = target === 0 || target === slider.last;

        // DIRECTIONNAV:
        if (slider.vars.directionNav) { methods.directionNav.update(); }

        if (target === slider.last) {
          // API: end() of cycle Callback
          slider.vars.end(slider);
          // SLIDESHOW && !INFINITE LOOP:
          if (!slider.vars.animationLoop) { slider.pause(); }
        }

        // SLIDE:
        if (!fade) {
          var dimension = (vertical) ? slider.slides.filter(':first').height() : slider.computedW,
              margin, slideString, calcNext;

          // INFINITE LOOP / REVERSE:
          if (carousel) {
            margin = slider.vars.itemMargin;
            calcNext = ((slider.itemW + margin) * slider.move) * slider.animatingTo;
            slideString = (calcNext > slider.limit && slider.visible !== 1) ? slider.limit : calcNext;
          } else if (slider.currentSlide === 0 && target === slider.count - 1 && slider.vars.animationLoop && slider.direction !== "next") {
            slideString = (reverse) ? (slider.count + slider.cloneOffset) * dimension : 0;
          } else if (slider.currentSlide === slider.last && target === 0 && slider.vars.animationLoop && slider.direction !== "prev") {
            slideString = (reverse) ? 0 : (slider.count + 1) * dimension;
          } else {
            slideString = (reverse) ? ((slider.count - 1) - target + slider.cloneOffset) * dimension : (target + slider.cloneOffset) * dimension;
          }
          slider.setProps(slideString, "", slider.vars.animationSpeed);
          if (slider.transitions) {
            if (!slider.vars.animationLoop || !slider.atEnd) {
              slider.animating = false;
              slider.currentSlide = slider.animatingTo;
            }

            // Unbind previous transitionEnd events and re-bind new transitionEnd event
            slider.container.unbind("webkitTransitionEnd transitionend");
            slider.container.bind("webkitTransitionEnd transitionend", function() {
              clearTimeout(slider.ensureAnimationEnd);
              slider.wrapup(dimension);
            });

            // Insurance for the ever-so-fickle transitionEnd event
            clearTimeout(slider.ensureAnimationEnd);
            slider.ensureAnimationEnd = setTimeout(function() {
              slider.wrapup(dimension);
            }, slider.vars.animationSpeed + 100);

          } else {
            slider.container.animate(slider.args, slider.vars.animationSpeed, slider.vars.easing, function(){
              slider.wrapup(dimension);
            });
          }
        } else { // FADE:
          if (!touch) {
            slider.slides.eq(slider.currentSlide).css({"zIndex": 1}).animate({"opacity": 0}, slider.vars.animationSpeed, slider.vars.easing);
            slider.slides.eq(target).css({"zIndex": 2}).animate({"opacity": 1}, slider.vars.animationSpeed, slider.vars.easing, slider.wrapup);
          } else {
            slider.slides.eq(slider.currentSlide).css({ "opacity": 0, "zIndex": 1 });
            slider.slides.eq(target).css({ "opacity": 1, "zIndex": 2 });
            slider.wrapup(dimension);
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(slider.vars.animationSpeed); }
      }
    };
    slider.wrapup = function(dimension) {
      // SLIDE:
      if (!fade && !carousel) {
        if (slider.currentSlide === 0 && slider.animatingTo === slider.last && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpEnd");
        } else if (slider.currentSlide === slider.last && slider.animatingTo === 0 && slider.vars.animationLoop) {
          slider.setProps(dimension, "jumpStart");
        }
      }
      slider.animating = false;
      slider.currentSlide = slider.animatingTo;
      // API: after() animation Callback
      slider.vars.after(slider);
    };

    // SLIDESHOW:
    slider.animateSlides = function() {
      if (!slider.animating && focused ) { slider.flexAnimate(slider.getTarget("next")); }
    };
    // SLIDESHOW:
    slider.pause = function() {
      clearInterval(slider.animatedSlides);
      slider.animatedSlides = null;
      slider.playing = false;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("play"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("pause"); }
    };
    // SLIDESHOW:
    slider.play = function() {
      if (slider.playing) { clearInterval(slider.animatedSlides); }
      slider.animatedSlides = slider.animatedSlides || setInterval(slider.animateSlides, slider.vars.slideshowSpeed);
      slider.started = slider.playing = true;
      // PAUSEPLAY:
      if (slider.vars.pausePlay) { methods.pausePlay.update("pause"); }
      // SYNC:
      if (slider.syncExists) { methods.sync("play"); }
    };
    // STOP:
    slider.stop = function () {
      slider.pause();
      slider.stopped = true;
    };
    slider.canAdvance = function(target, fromNav) {
      // ASNAV:
      var last = (asNav) ? slider.pagingCount - 1 : slider.last;
      return (fromNav) ? true :
             (asNav && slider.currentItem === slider.count - 1 && target === 0 && slider.direction === "prev") ? true :
             (asNav && slider.currentItem === 0 && target === slider.pagingCount - 1 && slider.direction !== "next") ? false :
             (target === slider.currentSlide && !asNav) ? false :
             (slider.vars.animationLoop) ? true :
             (slider.atEnd && slider.currentSlide === 0 && target === last && slider.direction !== "next") ? false :
             (slider.atEnd && slider.currentSlide === last && target === 0 && slider.direction === "next") ? false :
             true;
    };
    slider.getTarget = function(dir) {
      slider.direction = dir;
      if (dir === "next") {
        return (slider.currentSlide === slider.last) ? 0 : slider.currentSlide + 1;
      } else {
        return (slider.currentSlide === 0) ? slider.last : slider.currentSlide - 1;
      }
    };

    // SLIDE:
    slider.setProps = function(pos, special, dur) {
      var target = (function() {
        var posCheck = (pos) ? pos : ((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo,
            posCalc = (function() {
              if (carousel) {
                return (special === "setTouch") ? pos :
                       (reverse && slider.animatingTo === slider.last) ? 0 :
                       (reverse) ? slider.limit - (((slider.itemW + slider.vars.itemMargin) * slider.move) * slider.animatingTo) :
                       (slider.animatingTo === slider.last) ? slider.limit : posCheck;
              } else {
                switch (special) {
                  case "setTotal": return (reverse) ? ((slider.count - 1) - slider.currentSlide + slider.cloneOffset) * pos : (slider.currentSlide + slider.cloneOffset) * pos;
                  case "setTouch": return (reverse) ? pos : pos;
                  case "jumpEnd": return (reverse) ? pos : slider.count * pos;
                  case "jumpStart": return (reverse) ? slider.count * pos : pos;
                  default: return pos;
                }
              }
            }());

            return (posCalc * -1) + "px";
          }());

      if (slider.transitions) {
        target = (vertical) ? "translate3d(0," + target + ",0)" : "translate3d(" + target + ",0,0)";
        dur = (dur !== undefined) ? (dur/1000) + "s" : "0s";
        slider.container.css("-" + slider.pfx + "-transition-duration", dur);
         slider.container.css("transition-duration", dur);
      }

      slider.args[slider.prop] = target;
      if (slider.transitions || dur === undefined) { slider.container.css(slider.args); }

      slider.container.css('transform',target);
    };

    slider.setup = function(type) {
      // SLIDE:
      if (!fade) {
        var sliderOffset, arr;

        if (type === "init") {
          slider.viewport = $('<div class="' + namespace + 'viewport"></div>').css({"overflow": "hidden", "position": "relative"}).appendTo(slider).append(slider.container);
          // INFINITE LOOP:
          slider.cloneCount = 0;
          slider.cloneOffset = 0;
          // REVERSE:
          if (reverse) {
            arr = $.makeArray(slider.slides).reverse();
            slider.slides = $(arr);
            slider.container.empty().append(slider.slides);
          }
        }
        // INFINITE LOOP && !CAROUSEL:
        if (slider.vars.animationLoop && !carousel) {
          slider.cloneCount = 2;
          slider.cloneOffset = 1;
          // clear out old clones
          if (type !== "init") { slider.container.find('.clone').remove(); }
          slider.container.append(methods.uniqueID(slider.slides.first().clone().addClass('clone')).attr('aria-hidden', 'true'))
                          .prepend(methods.uniqueID(slider.slides.last().clone().addClass('clone')).attr('aria-hidden', 'true'));
        }
        slider.newSlides = $(slider.vars.selector, slider);

        sliderOffset = (reverse) ? slider.count - 1 - slider.currentSlide + slider.cloneOffset : slider.currentSlide + slider.cloneOffset;
        // VERTICAL:
        if (vertical && !carousel) {
          slider.container.height((slider.count + slider.cloneCount) * 200 + "%").css("position", "absolute").width("100%");
          setTimeout(function(){
            slider.newSlides.css({"display": "block"});
            slider.doMath();
            slider.viewport.height(slider.h);
            slider.setProps(sliderOffset * slider.h, "init");
          }, (type === "init") ? 100 : 0);
        } else {
          slider.container.width((slider.count + slider.cloneCount) * 200 + "%");
          slider.setProps(sliderOffset * slider.computedW, "init");
          setTimeout(function(){
            slider.doMath();
            slider.newSlides.css({"width": slider.computedW, "marginRight" : slider.computedM, "float": "left", "display": "block"});
            // SMOOTH HEIGHT:
            if (slider.vars.smoothHeight) { methods.smoothHeight(); }
          }, (type === "init") ? 100 : 0);
        }
      } else { // FADE:
        slider.slides.css({"width": "100%", "float": "left", "marginRight": "-100%", "position": "relative"});
        if (type === "init") {
          if (!touch) {
            //slider.slides.eq(slider.currentSlide).fadeIn(slider.vars.animationSpeed, slider.vars.easing);
            if (slider.vars.fadeFirstSlide == false) {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).css({"opacity": 1});
            } else {
              slider.slides.css({ "opacity": 0, "display": "block", "zIndex": 1 }).eq(slider.currentSlide).css({"zIndex": 2}).animate({"opacity": 1},slider.vars.animationSpeed,slider.vars.easing);
            }
          } else {
            slider.slides.css({ "opacity": 0, "display": "block", "webkitTransition": "opacity " + slider.vars.animationSpeed / 1000 + "s ease", "zIndex": 1 }).eq(slider.currentSlide).css({ "opacity": 1, "zIndex": 2});
          }
        }
        // SMOOTH HEIGHT:
        if (slider.vars.smoothHeight) { methods.smoothHeight(); }
      }
      // !CAROUSEL:
      // CANDIDATE: active slide
      if (!carousel) { slider.slides.removeClass(namespace + "active-slide").eq(slider.currentSlide).addClass(namespace + "active-slide"); }

      //FlexSlider: init() Callback
      slider.vars.init(slider);
    };

    slider.doMath = function() {
      var slide = slider.slides.first(),
          slideMargin = slider.vars.itemMargin,
          minItems = slider.vars.minItems,
          maxItems = slider.vars.maxItems;

      slider.w = (slider.viewport===undefined) ? slider.width() : slider.viewport.width();
      slider.h = slide.height();
      slider.boxPadding = slide.outerWidth() - slide.width();

      // CAROUSEL:
      if (carousel) {
        slider.itemT = slider.vars.itemWidth + slideMargin;
        slider.itemM = slideMargin;
        slider.minW = (minItems) ? minItems * slider.itemT : slider.w;
        slider.maxW = (maxItems) ? (maxItems * slider.itemT) - slideMargin : slider.w;
        slider.itemW = (slider.minW > slider.w) ? (slider.w - (slideMargin * (minItems - 1)))/minItems :
                       (slider.maxW < slider.w) ? (slider.w - (slideMargin * (maxItems - 1)))/maxItems :
                       (slider.vars.itemWidth > slider.w) ? slider.w : slider.vars.itemWidth;

        slider.visible = Math.floor(slider.w/(slider.itemW));
        slider.move = (slider.vars.move > 0 && slider.vars.move < slider.visible ) ? slider.vars.move : slider.visible;
        slider.pagingCount = Math.ceil(((slider.count - slider.visible)/slider.move) + 1);
        slider.last =  slider.pagingCount - 1;
        slider.limit = (slider.pagingCount === 1) ? 0 :
                       (slider.vars.itemWidth > slider.w) ? (slider.itemW * (slider.count - 1)) + (slideMargin * (slider.count - 1)) : ((slider.itemW + slideMargin) * slider.count) - slider.w - slideMargin;
      } else {
        slider.itemW = slider.w;
        slider.itemM = slideMargin;
        slider.pagingCount = slider.count;
        slider.last = slider.count - 1;
      }
      slider.computedW = slider.itemW - slider.boxPadding;
      slider.computedM = slider.itemM;
    };

    slider.update = function(pos, action) {
      slider.doMath();

      // update currentSlide and slider.animatingTo if necessary
      if (!carousel) {
        if (pos < slider.currentSlide) {
          slider.currentSlide += 1;
        } else if (pos <= slider.currentSlide && pos !== 0) {
          slider.currentSlide -= 1;
        }
        slider.animatingTo = slider.currentSlide;
      }

      // update controlNav
      if (slider.vars.controlNav && !slider.manualControls) {
        if ((action === "add" && !carousel) || slider.pagingCount > slider.controlNav.length) {
          methods.controlNav.update("add");
        } else if ((action === "remove" && !carousel) || slider.pagingCount < slider.controlNav.length) {
          if (carousel && slider.currentSlide > slider.last) {
            slider.currentSlide -= 1;
            slider.animatingTo -= 1;
          }
          methods.controlNav.update("remove", slider.last);
        }
      }
      // update directionNav
      if (slider.vars.directionNav) { methods.directionNav.update(); }

    };

    slider.addSlide = function(obj, pos) {
      var $obj = $(obj);

      slider.count += 1;
      slider.last = slider.count - 1;

      // append new slide
      if (vertical && reverse) {
        (pos !== undefined) ? slider.slides.eq(slider.count - pos).after($obj) : slider.container.prepend($obj);
      } else {
        (pos !== undefined) ? slider.slides.eq(pos).before($obj) : slider.container.append($obj);
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.update(pos, "add");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      //FlexSlider: added() Callback
      slider.vars.added(slider);
    };
    slider.removeSlide = function(obj) {
      var pos = (isNaN(obj)) ? slider.slides.index($(obj)) : obj;

      // update count
      slider.count -= 1;
      slider.last = slider.count - 1;

      // remove slide
      if (isNaN(obj)) {
        $(obj, slider.slides).remove();
      } else {
        (vertical && reverse) ? slider.slides.eq(slider.last).remove() : slider.slides.eq(obj).remove();
      }

      // update currentSlide, animatingTo, controlNav, and directionNav
      slider.doMath();
      slider.update(pos, "remove");

      // update slider.slides
      slider.slides = $(slider.vars.selector + ':not(.clone)', slider);
      // re-setup the slider to accomdate new slide
      slider.setup();

      // FlexSlider: removed() Callback
      slider.vars.removed(slider);
    };

    //FlexSlider: Initialize
    methods.init();
  };

  // Ensure the slider isn't focussed if the window loses focus.
  $( window ).blur( function ( e ) {
    focused = false;
  }).focus( function ( e ) {
    focused = true;
  });

  //FlexSlider: Default Settings
  $.flexslider.defaults = {
    namespace: "flex-",             //{NEW} String: Prefix string attached to the class of every element generated by the plugin
    selector: ".slides > li",       //{NEW} Selector: Must match a simple pattern. '{container} > {slide}' -- Ignore pattern at your own peril
    animation: "fade",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",                //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    direction: "horizontal",        //String: Select the sliding direction, "horizontal" or "vertical"
    reverse: false,                 //{NEW} Boolean: Reverse the animation direction
    animationLoop: true,            //Boolean: Should the animation loop? If false, directionNav will received "disable" classes at either end
    smoothHeight: false,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode
    startAt: 0,                     //Integer: The slide that the slider should start on. Array notation (0 = first slide)
    slideshow: true,                //Boolean: Animate slider automatically
    slideshowSpeed: 7000,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 600,            //Integer: Set the speed of animations, in milliseconds
    initDelay: 0,                   //{NEW} Integer: Set an initialization delay, in milliseconds
    randomize: false,               //Boolean: Randomize slide order
    fadeFirstSlide: true,           //Boolean: Fade in the first slide when animation type is "fade"
    thumbCaptions: false,           //Boolean: Whether or not to put captions on thumbnails when using the "thumbnails" controlNav.

    // Usability features
    pauseOnAction: true,            //Boolean: Pause the slideshow when interacting with control elements, highly recommended.
    pauseOnHover: false,            //Boolean: Pause the slideshow when hovering over slider, then resume when no longer hovering
    pauseInvisible: true,   		//{NEW} Boolean: Pause the slideshow when tab is invisible, resume when visible. Provides better UX, lower CPU usage.
    useCSS: true,                   //{NEW} Boolean: Slider will use CSS3 transitions if available
    touch: true,                    //{NEW} Boolean: Allow touch swipe navigation of the slider on touch-enabled devices
    video: false,                   //{NEW} Boolean: If using video in the slider, will prevent CSS3 3D Transforms to avoid graphical glitches

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each slide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item

    // Secondary Navigation
    keyboard: true,                 //Boolean: Allow slider navigating via keyboard left/right keys
    multipleKeyboard: false,        //{NEW} Boolean: Allow keyboard navigation to affect multiple sliders. Default behavior cuts out keyboard navigation with more than one slider present.
    mousewheel: false,              //{UPDATED} Boolean: Requires jquery.mousewheel.js (https://github.com/brandonaaron/jquery-mousewheel) - Allows slider navigating via mousewheel
    pausePlay: false,               //Boolean: Create pause/play dynamic element
    pauseText: "Pause",             //String: Set the text for the "pause" pausePlay item
    playText: "Play",               //String: Set the text for the "play" pausePlay item

    // Special properties
    controlsContainer: "",          //{UPDATED} jQuery Object/Selector: Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be $(".flexslider-container"). Property is ignored if given element is not found.
    manualControls: "",             //{UPDATED} jQuery Object/Selector: Declare custom control navigation. Examples would be $(".flex-control-nav li") or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
    customDirectionNav: "",         //{NEW} jQuery Object/Selector: Custom prev / next button. Must be two jQuery elements. In order to make the events work they have to have the classes "prev" and "next" (plus namespace)
    sync: "",                       //{NEW} Selector: Mirror the actions performed on this slider with another slider. Use with care.
    asNavFor: "",                   //{NEW} Selector: Internal property exposed for turning the slider into a thumbnail navigation for another slider

    // Carousel Options
    itemWidth: 0,                   //{NEW} Integer: Box-model width of individual carousel items, including horizontal borders and padding.
    itemMargin: 0,                  //{NEW} Integer: Margin between carousel items.
    minItems: 1,                    //{NEW} Integer: Minimum number of carousel items that should be visible. Items will resize fluidly when below this.
    maxItems: 0,                    //{NEW} Integer: Maxmimum number of carousel items that should be visible. Items will resize fluidly when above this limit.
    move: 0,                        //{NEW} Integer: Number of carousel items that should move on animation. If 0, slider will move all visible items.
    allowOneSlide: true,           //{NEW} Boolean: Whether or not to allow a slider comprised of a single slide

    // Callback API
    start: function(){},            //Callback: function(slider) - Fires when the slider loads the first slide
    before: function(){},           //Callback: function(slider) - Fires asynchronously with each slider animation
    after: function(){},            //Callback: function(slider) - Fires after each slider animation completes
    end: function(){},              //Callback: function(slider) - Fires when the slider reaches the last slide (asynchronous)
    added: function(){},            //{NEW} Callback: function(slider) - Fires after a slide is added
    removed: function(){},           //{NEW} Callback: function(slider) - Fires after a slide is removed
    init: function() {}             //{NEW} Callback: function(slider) - Fires after the slider is initially setup
  };

  //FlexSlider: Plugin Function
  $.fn.flexslider = function(options) {
    if (options === undefined) { options = {}; }

    if (typeof options === "object") {
      return this.each(function() {
        var $this = $(this),
            selector = (options.selector) ? options.selector : ".slides > li",
            $slides = $this.find(selector);

      if ( ( $slides.length === 1 && options.allowOneSlide === false ) || $slides.length === 0 ) {
          $slides.fadeIn(400);
          if (options.start) { options.start($this); }
        } else if ($this.data('flexslider') === undefined) {
          new $.flexslider(this, options);
        }
      });
    } else {
      // Helper strings to quickly perform functions on the slider
      var $slider = $(this).data('flexslider');
      switch (options) {
        case "play": $slider.play(); break;
        case "pause": $slider.pause(); break;
        case "stop": $slider.stop(); break;
        case "next": $slider.flexAnimate($slider.getTarget("next"), true); break;
        case "prev":
        case "previous": $slider.flexAnimate($slider.getTarget("prev"), true); break;
        default: if (typeof options === "number") { $slider.flexAnimate(options, true); }
      }
    }
  };
})(jQuery);


/* **********************************************
     Begin prism-core.js
********************************************** */

var _self = (typeof window !== 'undefined')
	? window   // if in browser
	: (
		(typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)
		? self // if in worker
		: {}   // if in node js
	);

/**
 * Prism: Lightweight, robust, elegant syntax highlighting
 * MIT license http://www.opensource.org/licenses/mit-license.php/
 * @author Lea Verou http://lea.verou.me
 */

var Prism = (function(){

// Private helper vars
var lang = /\blang(?:uage)?-(\w+)\b/i;
var uniqueId = 0;

var _ = _self.Prism = {
	manual: _self.Prism && _self.Prism.manual,
	disableWorkerMessageHandler: _self.Prism && _self.Prism.disableWorkerMessageHandler,
	util: {
		encode: function (tokens) {
			if (tokens instanceof Token) {
				return new Token(tokens.type, _.util.encode(tokens.content), tokens.alias);
			} else if (_.util.type(tokens) === 'Array') {
				return tokens.map(_.util.encode);
			} else {
				return tokens.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/\u00a0/g, ' ');
			}
		},

		type: function (o) {
			return Object.prototype.toString.call(o).match(/\[object (\w+)\]/)[1];
		},

		objId: function (obj) {
			if (!obj['__id']) {
				Object.defineProperty(obj, '__id', { value: ++uniqueId });
			}
			return obj['__id'];
		},

		// Deep clone a language definition (e.g. to extend it)
		clone: function (o) {
			var type = _.util.type(o);

			switch (type) {
				case 'Object':
					var clone = {};

					for (var key in o) {
						if (o.hasOwnProperty(key)) {
							clone[key] = _.util.clone(o[key]);
						}
					}

					return clone;

				case 'Array':
					return o.map(function(v) { return _.util.clone(v); });
			}

			return o;
		}
	},

	languages: {
		extend: function (id, redef) {
			var lang = _.util.clone(_.languages[id]);

			for (var key in redef) {
				lang[key] = redef[key];
			}

			return lang;
		},

		/**
		 * Insert a token before another token in a language literal
		 * As this needs to recreate the object (we cannot actually insert before keys in object literals),
		 * we cannot just provide an object, we need anobject and a key.
		 * @param inside The key (or language id) of the parent
		 * @param before The key to insert before. If not provided, the function appends instead.
		 * @param insert Object with the key/value pairs to insert
		 * @param root The object that contains `inside`. If equal to Prism.languages, it can be omitted.
		 */
		insertBefore: function (inside, before, insert, root) {
			root = root || _.languages;
			var grammar = root[inside];

			if (arguments.length == 2) {
				insert = arguments[1];

				for (var newToken in insert) {
					if (insert.hasOwnProperty(newToken)) {
						grammar[newToken] = insert[newToken];
					}
				}

				return grammar;
			}

			var ret = {};

			for (var token in grammar) {

				if (grammar.hasOwnProperty(token)) {

					if (token == before) {

						for (var newToken in insert) {

							if (insert.hasOwnProperty(newToken)) {
								ret[newToken] = insert[newToken];
							}
						}
					}

					ret[token] = grammar[token];
				}
			}

			// Update references in other language definitions
			_.languages.DFS(_.languages, function(key, value) {
				if (value === root[inside] && key != inside) {
					this[key] = ret;
				}
			});

			return root[inside] = ret;
		},

		// Traverse a language definition with Depth First Search
		DFS: function(o, callback, type, visited) {
			visited = visited || {};
			for (var i in o) {
				if (o.hasOwnProperty(i)) {
					callback.call(o, i, o[i], type || i);

					if (_.util.type(o[i]) === 'Object' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, null, visited);
					}
					else if (_.util.type(o[i]) === 'Array' && !visited[_.util.objId(o[i])]) {
						visited[_.util.objId(o[i])] = true;
						_.languages.DFS(o[i], callback, i, visited);
					}
				}
			}
		}
	},
	plugins: {},

	highlightAll: function(async, callback) {
		var env = {
			callback: callback,
			selector: 'code[class*="language-"], [class*="language-"] code, code[class*="lang-"], [class*="lang-"] code'
		};

		_.hooks.run("before-highlightall", env);

		var elements = env.elements || document.querySelectorAll(env.selector);

		for (var i=0, element; element = elements[i++];) {
			_.highlightElement(element, async === true, env.callback);
		}
	},

	highlightElement: function(element, async, callback) {
		// Find language
		var language, grammar, parent = element;

		while (parent && !lang.test(parent.className)) {
			parent = parent.parentNode;
		}

		if (parent) {
			language = (parent.className.match(lang) || [,''])[1].toLowerCase();
			grammar = _.languages[language];
		}

		// Set language on the element, if not present
		element.className = element.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;

		if (element.parentNode) {
			// Set language on the parent, for styling
			parent = element.parentNode;

			if (/pre/i.test(parent.nodeName)) {
				parent.className = parent.className.replace(lang, '').replace(/\s+/g, ' ') + ' language-' + language;
			}
		}

		var code = element.textContent;

		var env = {
			element: element,
			language: language,
			grammar: grammar,
			code: code
		};

		_.hooks.run('before-sanity-check', env);

		if (!env.code || !env.grammar) {
			if (env.code) {
				_.hooks.run('before-highlight', env);
				env.element.textContent = env.code;
				_.hooks.run('after-highlight', env);
			}
			_.hooks.run('complete', env);
			return;
		}

		_.hooks.run('before-highlight', env);

		if (async && _self.Worker) {
			var worker = new Worker(_.filename);

			worker.onmessage = function(evt) {
				env.highlightedCode = evt.data;

				_.hooks.run('before-insert', env);

				env.element.innerHTML = env.highlightedCode;

				callback && callback.call(env.element);
				_.hooks.run('after-highlight', env);
				_.hooks.run('complete', env);
			};

			worker.postMessage(JSON.stringify({
				language: env.language,
				code: env.code,
				immediateClose: true
			}));
		}
		else {
			env.highlightedCode = _.highlight(env.code, env.grammar, env.language);

			_.hooks.run('before-insert', env);

			env.element.innerHTML = env.highlightedCode;

			callback && callback.call(element);

			_.hooks.run('after-highlight', env);
			_.hooks.run('complete', env);
		}
	},

	highlight: function (text, grammar, language) {
		var tokens = _.tokenize(text, grammar);
		return Token.stringify(_.util.encode(tokens), language);
	},

	matchGrammar: function (text, strarr, grammar, index, startPos, oneshot, target) {
		var Token = _.Token;

		for (var token in grammar) {
			if(!grammar.hasOwnProperty(token) || !grammar[token]) {
				continue;
			}

			if (token == target) {
				return;
			}

			var patterns = grammar[token];
			patterns = (_.util.type(patterns) === "Array") ? patterns : [patterns];

			for (var j = 0; j < patterns.length; ++j) {
				var pattern = patterns[j],
					inside = pattern.inside,
					lookbehind = !!pattern.lookbehind,
					greedy = !!pattern.greedy,
					lookbehindLength = 0,
					alias = pattern.alias;

				if (greedy && !pattern.pattern.global) {
					// Without the global flag, lastIndex won't work
					var flags = pattern.pattern.toString().match(/[imuy]*$/)[0];
					pattern.pattern = RegExp(pattern.pattern.source, flags + "g");
				}

				pattern = pattern.pattern || pattern;

				// Don’t cache length as it changes during the loop
				for (var i = index, pos = startPos; i < strarr.length; pos += strarr[i].length, ++i) {

					var str = strarr[i];

					if (strarr.length > text.length) {
						// Something went terribly wrong, ABORT, ABORT!
						return;
					}

					if (str instanceof Token) {
						continue;
					}

					pattern.lastIndex = 0;

					var match = pattern.exec(str),
					    delNum = 1;

					// Greedy patterns can override/remove up to two previously matched tokens
					if (!match && greedy && i != strarr.length - 1) {
						pattern.lastIndex = pos;
						match = pattern.exec(text);
						if (!match) {
							break;
						}

						var from = match.index + (lookbehind ? match[1].length : 0),
						    to = match.index + match[0].length,
						    k = i,
						    p = pos;

						for (var len = strarr.length; k < len && (p < to || (!strarr[k].type && !strarr[k - 1].greedy)); ++k) {
							p += strarr[k].length;
							// Move the index i to the element in strarr that is closest to from
							if (from >= p) {
								++i;
								pos = p;
							}
						}

						/*
						 * If strarr[i] is a Token, then the match starts inside another Token, which is invalid
						 * If strarr[k - 1] is greedy we are in conflict with another greedy pattern
						 */
						if (strarr[i] instanceof Token || strarr[k - 1].greedy) {
							continue;
						}

						// Number of tokens to delete and replace with the new match
						delNum = k - i;
						str = text.slice(pos, p);
						match.index -= pos;
					}

					if (!match) {
						if (oneshot) {
							break;
						}

						continue;
					}

					if(lookbehind) {
						lookbehindLength = match[1].length;
					}

					var from = match.index + lookbehindLength,
					    match = match[0].slice(lookbehindLength),
					    to = from + match.length,
					    before = str.slice(0, from),
					    after = str.slice(to);

					var args = [i, delNum];

					if (before) {
						++i;
						pos += before.length;
						args.push(before);
					}

					var wrapped = new Token(token, inside? _.tokenize(match, inside) : match, alias, match, greedy);

					args.push(wrapped);

					if (after) {
						args.push(after);
					}

					Array.prototype.splice.apply(strarr, args);

					if (delNum != 1)
						_.matchGrammar(text, strarr, grammar, i, pos, true, token);

					if (oneshot)
						break;
				}
			}
		}
	},

	tokenize: function(text, grammar, language) {
		var strarr = [text];

		var rest = grammar.rest;

		if (rest) {
			for (var token in rest) {
				grammar[token] = rest[token];
			}

			delete grammar.rest;
		}

		_.matchGrammar(text, strarr, grammar, 0, 0, false);

		return strarr;
	},

	hooks: {
		all: {},

		add: function (name, callback) {
			var hooks = _.hooks.all;

			hooks[name] = hooks[name] || [];

			hooks[name].push(callback);
		},

		run: function (name, env) {
			var callbacks = _.hooks.all[name];

			if (!callbacks || !callbacks.length) {
				return;
			}

			for (var i=0, callback; callback = callbacks[i++];) {
				callback(env);
			}
		}
	}
};

var Token = _.Token = function(type, content, alias, matchedStr, greedy) {
	this.type = type;
	this.content = content;
	this.alias = alias;
	// Copy of the full string this token was created from
	this.length = (matchedStr || "").length|0;
	this.greedy = !!greedy;
};

Token.stringify = function(o, language, parent) {
	if (typeof o == 'string') {
		return o;
	}

	if (_.util.type(o) === 'Array') {
		return o.map(function(element) {
			return Token.stringify(element, language, o);
		}).join('');
	}

	var env = {
		type: o.type,
		content: Token.stringify(o.content, language, parent),
		tag: 'span',
		classes: ['token', o.type],
		attributes: {},
		language: language,
		parent: parent
	};

	if (o.alias) {
		var aliases = _.util.type(o.alias) === 'Array' ? o.alias : [o.alias];
		Array.prototype.push.apply(env.classes, aliases);
	}

	_.hooks.run('wrap', env);

	var attributes = Object.keys(env.attributes).map(function(name) {
		return name + '="' + (env.attributes[name] || '').replace(/"/g, '&quot;') + '"';
	}).join(' ');

	return '<' + env.tag + ' class="' + env.classes.join(' ') + '"' + (attributes ? ' ' + attributes : '') + '>' + env.content + '</' + env.tag + '>';

};

if (!_self.document) {
	if (!_self.addEventListener) {
		// in Node.js
		return _self.Prism;
	}

	if (!_.disableWorkerMessageHandler) {
		// In worker
		_self.addEventListener('message', function (evt) {
			var message = JSON.parse(evt.data),
				lang = message.language,
				code = message.code,
				immediateClose = message.immediateClose;

			_self.postMessage(_.highlight(code, _.languages[lang], lang));
			if (immediateClose) {
				_self.close();
			}
		}, false);
	}

	return _self.Prism;
}

//Get current script and highlight
var script = document.currentScript || [].slice.call(document.getElementsByTagName("script")).pop();

if (script) {
	_.filename = script.src;

	if (!_.manual && !script.hasAttribute('data-manual')) {
		if(document.readyState !== "loading") {
			if (window.requestAnimationFrame) {
				window.requestAnimationFrame(_.highlightAll);
			} else {
				window.setTimeout(_.highlightAll, 16);
			}
		}
		else {
			document.addEventListener('DOMContentLoaded', _.highlightAll);
		}
	}
}

return _self.Prism;

})();

if (typeof module !== 'undefined' && module.exports) {
	module.exports = Prism;
}

// hack for components to work correctly in node.js
if (typeof global !== 'undefined') {
	global.Prism = Prism;
}


/* **********************************************
     Begin prism-markup.js
********************************************** */

Prism.languages.markup = {
	'comment': /<!--[\s\S]*?-->/,
	'prolog': /<\?[\s\S]+?\?>/,
	'doctype': /<!DOCTYPE[\s\S]+?>/i,
	'cdata': /<!\[CDATA\[[\s\S]*?]]>/i,
	'tag': {
		pattern: /<\/?(?!\d)[^\s>\/=$<]+(?:\s+[^\s>\/=]+(?:=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+))?)*\s*\/?>/i,
		inside: {
			'tag': {
				pattern: /^<\/?[^\s>\/]+/i,
				inside: {
					'punctuation': /^<\/?/,
					'namespace': /^[^\s>\/:]+:/
				}
			},
			'attr-value': {
				pattern: /=(?:("|')(?:\\[\s\S]|(?!\1)[^\\])*\1|[^\s'">=]+)/i,
				inside: {
					'punctuation': [
						/^=/,
						{
							pattern: /(^|[^\\])["']/,
							lookbehind: true
						}
					]
				}
			},
			'punctuation': /\/?>/,
			'attr-name': {
				pattern: /[^\s>\/]+/,
				inside: {
					'namespace': /^[^\s>\/:]+:/
				}
			}

		}
	},
	'entity': /&#?[\da-z]{1,8};/i
};

Prism.languages.markup['tag'].inside['attr-value'].inside['entity'] =
	Prism.languages.markup['entity'];

// Plugin to make entity title show the real entity, idea by Roman Komarov
Prism.hooks.add('wrap', function(env) {

	if (env.type === 'entity') {
		env.attributes['title'] = env.content.replace(/&amp;/, '&');
	}
});

Prism.languages.xml = Prism.languages.markup;
Prism.languages.html = Prism.languages.markup;
Prism.languages.mathml = Prism.languages.markup;
Prism.languages.svg = Prism.languages.markup;


/* **********************************************
     Begin prism-css.js
********************************************** */

Prism.languages.css = {
	'comment': /\/\*[\s\S]*?\*\//,
	'atrule': {
		pattern: /@[\w-]+?.*?(?:;|(?=\s*\{))/i,
		inside: {
			'rule': /@[\w-]+/
			// See rest below
		}
	},
	'url': /url\((?:(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1|.*?)\)/i,
	'selector': /[^{}\s][^{};]*?(?=\s*\{)/,
	'string': {
		pattern: /("|')(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'property': /[\w-]+(?=\s*:)/i,
	'important': /\B!important\b/i,
	'function': /[-a-z0-9]+(?=\()/i,
	'punctuation': /[(){};:]/
};

Prism.languages.css['atrule'].inside.rest = Prism.util.clone(Prism.languages.css);

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'style': {
			pattern: /(<style[\s\S]*?>)[\s\S]*?(?=<\/style>)/i,
			lookbehind: true,
			inside: Prism.languages.css,
			alias: 'language-css'
		}
	});
	
	Prism.languages.insertBefore('inside', 'attr-value', {
		'style-attr': {
			pattern: /\s*style=("|')(?:\\[\s\S]|(?!\1)[^\\])*\1/i,
			inside: {
				'attr-name': {
					pattern: /^\s*style/i,
					inside: Prism.languages.markup.tag.inside
				},
				'punctuation': /^\s*=\s*['"]|['"]\s*$/,
				'attr-value': {
					pattern: /.+/i,
					inside: Prism.languages.css
				}
			},
			alias: 'language-css'
		}
	}, Prism.languages.markup.tag);
}

/* **********************************************
     Begin prism-clike.js
********************************************** */

Prism.languages.clike = {
	'comment': [
		{
			pattern: /(^|[^\\])\/\*[\s\S]*?(?:\*\/|$)/,
			lookbehind: true
		},
		{
			pattern: /(^|[^\\:])\/\/.*/,
			lookbehind: true
		}
	],
	'string': {
		pattern: /(["'])(?:\\(?:\r\n|[\s\S])|(?!\1)[^\\\r\n])*\1/,
		greedy: true
	},
	'class-name': {
		pattern: /((?:\b(?:class|interface|extends|implements|trait|instanceof|new)\s+)|(?:catch\s+\())[\w.\\]+/i,
		lookbehind: true,
		inside: {
			punctuation: /[.\\]/
		}
	},
	'keyword': /\b(?:if|else|while|do|for|return|in|instanceof|function|new|try|throw|catch|finally|null|break|continue)\b/,
	'boolean': /\b(?:true|false)\b/,
	'function': /[a-z0-9_]+(?=\()/i,
	'number': /\b-?(?:0x[\da-f]+|\d*\.?\d+(?:e[+-]?\d+)?)\b/i,
	'operator': /--?|\+\+?|!=?=?|<=?|>=?|==?=?|&&?|\|\|?|\?|\*|\/|~|\^|%/,
	'punctuation': /[{}[\];(),.:]/
};


/* **********************************************
     Begin prism-javascript.js
********************************************** */

Prism.languages.javascript = Prism.languages.extend('clike', {
	'keyword': /\b(?:as|async|await|break|case|catch|class|const|continue|debugger|default|delete|do|else|enum|export|extends|finally|for|from|function|get|if|implements|import|in|instanceof|interface|let|new|null|of|package|private|protected|public|return|set|static|super|switch|this|throw|try|typeof|var|void|while|with|yield)\b/,
	'number': /\b-?(?:0[xX][\dA-Fa-f]+|0[bB][01]+|0[oO][0-7]+|\d*\.?\d+(?:[Ee][+-]?\d+)?|NaN|Infinity)\b/,
	// Allow for all non-ASCII characters (See http://stackoverflow.com/a/2008444)
	'function': /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*\()/i,
	'operator': /-[-=]?|\+[+=]?|!=?=?|<<?=?|>>?>?=?|=(?:==?|>)?|&[&=]?|\|[|=]?|\*\*?=?|\/=?|~|\^=?|%=?|\?|\.{3}/
});

Prism.languages.insertBefore('javascript', 'keyword', {
	'regex': {
		pattern: /(^|[^/])\/(?!\/)(\[[^\]\r\n]+]|\\.|[^/\\\[\r\n])+\/[gimyu]{0,5}(?=\s*($|[\r\n,.;})]))/,
		lookbehind: true,
		greedy: true
	},
	// This must be declared before keyword because we use "function" inside the look-forward
	'function-variable': {
		pattern: /[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*(?=\s*=\s*(?:function\b|(?:\([^()]*\)|[_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)\s*=>))/i,
		alias: 'function'
	}
});

Prism.languages.insertBefore('javascript', 'string', {
	'template-string': {
		pattern: /`(?:\\[\s\S]|[^\\`])*`/,
		greedy: true,
		inside: {
			'interpolation': {
				pattern: /\$\{[^}]+\}/,
				inside: {
					'interpolation-punctuation': {
						pattern: /^\$\{|\}$/,
						alias: 'punctuation'
					},
					rest: Prism.languages.javascript
				}
			},
			'string': /[\s\S]+/
		}
	}
});

if (Prism.languages.markup) {
	Prism.languages.insertBefore('markup', 'tag', {
		'script': {
			pattern: /(<script[\s\S]*?>)[\s\S]*?(?=<\/script>)/i,
			lookbehind: true,
			inside: Prism.languages.javascript,
			alias: 'language-javascript'
		}
	});
}

Prism.languages.js = Prism.languages.javascript;


/* **********************************************
     Begin prism-file-highlight.js
********************************************** */

(function () {
	if (typeof self === 'undefined' || !self.Prism || !self.document || !document.querySelector) {
		return;
	}

	self.Prism.fileHighlight = function() {

		var Extensions = {
			'js': 'javascript',
			'py': 'python',
			'rb': 'ruby',
			'ps1': 'powershell',
			'psm1': 'powershell',
			'sh': 'bash',
			'bat': 'batch',
			'h': 'c',
			'tex': 'latex'
		};

		Array.prototype.slice.call(document.querySelectorAll('pre[data-src]')).forEach(function (pre) {
			var src = pre.getAttribute('data-src');

			var language, parent = pre;
			var lang = /\blang(?:uage)?-(?!\*)(\w+)\b/i;
			while (parent && !lang.test(parent.className)) {
				parent = parent.parentNode;
			}

			if (parent) {
				language = (pre.className.match(lang) || [, ''])[1];
			}

			if (!language) {
				var extension = (src.match(/\.(\w+)$/) || [, ''])[1];
				language = Extensions[extension] || extension;
			}

			var code = document.createElement('code');
			code.className = 'language-' + language;

			pre.textContent = '';

			code.textContent = 'Loading…';

			pre.appendChild(code);

			var xhr = new XMLHttpRequest();

			xhr.open('GET', src, true);

			xhr.onreadystatechange = function () {
				if (xhr.readyState == 4) {

					if (xhr.status < 400 && xhr.responseText) {
						code.textContent = xhr.responseText;

						Prism.highlightElement(code);
					}
					else if (xhr.status >= 400) {
						code.textContent = '✖ Error ' + xhr.status + ' while fetching file: ' + xhr.statusText;
					}
					else {
						code.textContent = '✖ Error: File does not exist or is empty';
					}
				}
			};

			xhr.send(null);
		});

	};

	document.addEventListener('DOMContentLoaded', self.Prism.fileHighlight);

})();

/*!
 * Bootstrap-select v1.12.4 (http://silviomoreto.github.io/bootstrap-select)
 *
 * Copyright 2013-2017 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
!function(a,b){"function"==typeof define&&define.amd?define(["jquery"],function(a){return b(a)}):"object"==typeof module&&module.exports?module.exports=b(require("jquery")):b(a.jQuery)}(this,function(a){!function(a){"use strict";function b(b){var c=[{re:/[\xC0-\xC6]/g,ch:"A"},{re:/[\xE0-\xE6]/g,ch:"a"},{re:/[\xC8-\xCB]/g,ch:"E"},{re:/[\xE8-\xEB]/g,ch:"e"},{re:/[\xCC-\xCF]/g,ch:"I"},{re:/[\xEC-\xEF]/g,ch:"i"},{re:/[\xD2-\xD6]/g,ch:"O"},{re:/[\xF2-\xF6]/g,ch:"o"},{re:/[\xD9-\xDC]/g,ch:"U"},{re:/[\xF9-\xFC]/g,ch:"u"},{re:/[\xC7-\xE7]/g,ch:"c"},{re:/[\xD1]/g,ch:"N"},{re:/[\xF1]/g,ch:"n"}];return a.each(c,function(){b=b?b.replace(this.re,this.ch):""}),b}function c(b){var c=arguments,d=b;[].shift.apply(c);var e,f=this.each(function(){var b=a(this);if(b.is("select")){var f=b.data("selectpicker"),g="object"==typeof d&&d;if(f){if(g)for(var h in g)g.hasOwnProperty(h)&&(f.options[h]=g[h])}else{var i=a.extend({},l.DEFAULTS,a.fn.selectpicker.defaults||{},b.data(),g);i.template=a.extend({},l.DEFAULTS.template,a.fn.selectpicker.defaults?a.fn.selectpicker.defaults.template:{},b.data().template,g.template),b.data("selectpicker",f=new l(this,i))}"string"==typeof d&&(e=f[d]instanceof Function?f[d].apply(f,c):f.options[d])}});return"undefined"!=typeof e?e:f}String.prototype.includes||!function(){var a={}.toString,b=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),c="".indexOf,d=function(b){if(null==this)throw new TypeError;var d=String(this);if(b&&"[object RegExp]"==a.call(b))throw new TypeError;var e=d.length,f=String(b),g=f.length,h=arguments.length>1?arguments[1]:void 0,i=h?Number(h):0;i!=i&&(i=0);var j=Math.min(Math.max(i,0),e);return!(g+j>e)&&c.call(d,f,i)!=-1};b?b(String.prototype,"includes",{value:d,configurable:!0,writable:!0}):String.prototype.includes=d}(),String.prototype.startsWith||!function(){var a=function(){try{var a={},b=Object.defineProperty,c=b(a,a,a)&&b}catch(a){}return c}(),b={}.toString,c=function(a){if(null==this)throw new TypeError;var c=String(this);if(a&&"[object RegExp]"==b.call(a))throw new TypeError;var d=c.length,e=String(a),f=e.length,g=arguments.length>1?arguments[1]:void 0,h=g?Number(g):0;h!=h&&(h=0);var i=Math.min(Math.max(h,0),d);if(f+i>d)return!1;for(var j=-1;++j<f;)if(c.charCodeAt(i+j)!=e.charCodeAt(j))return!1;return!0};a?a(String.prototype,"startsWith",{value:c,configurable:!0,writable:!0}):String.prototype.startsWith=c}(),Object.keys||(Object.keys=function(a,b,c){c=[];for(b in a)c.hasOwnProperty.call(a,b)&&c.push(b);return c});var d={useDefault:!1,_set:a.valHooks.select.set};a.valHooks.select.set=function(b,c){return c&&!d.useDefault&&a(b).data("selected",!0),d._set.apply(this,arguments)};var e=null,f=function(){try{return new Event("change"),!0}catch(a){return!1}}();a.fn.triggerNative=function(a){var b,c=this[0];c.dispatchEvent?(f?b=new Event(a,{bubbles:!0}):(b=document.createEvent("Event"),b.initEvent(a,!0,!1)),c.dispatchEvent(b)):c.fireEvent?(b=document.createEventObject(),b.eventType=a,c.fireEvent("on"+a,b)):this.trigger(a)},a.expr.pseudos.icontains=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.ibegins=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())},a.expr.pseudos.aicontains=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.includes(d[3].toUpperCase())},a.expr.pseudos.aibegins=function(b,c,d){var e=a(b).find("a"),f=(e.data("tokens")||e.data("normalizedText")||e.text()).toString().toUpperCase();return f.startsWith(d[3].toUpperCase())};var g={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","`":"&#x60;"},h={"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#x27;":"'","&#x60;":"`"},i=function(a){var b=function(b){return a[b]},c="(?:"+Object.keys(a).join("|")+")",d=RegExp(c),e=RegExp(c,"g");return function(a){return a=null==a?"":""+a,d.test(a)?a.replace(e,b):a}},j=i(g),k=i(h),l=function(b,c){d.useDefault||(a.valHooks.select.set=d._set,d.useDefault=!0),this.$element=a(b),this.$newElement=null,this.$button=null,this.$menu=null,this.$lis=null,this.options=c,null===this.options.title&&(this.options.title=this.$element.attr("title"));var e=this.options.windowPadding;"number"==typeof e&&(this.options.windowPadding=[e,e,e,e]),this.val=l.prototype.val,this.render=l.prototype.render,this.refresh=l.prototype.refresh,this.setStyle=l.prototype.setStyle,this.selectAll=l.prototype.selectAll,this.deselectAll=l.prototype.deselectAll,this.destroy=l.prototype.destroy,this.remove=l.prototype.remove,this.show=l.prototype.show,this.hide=l.prototype.hide,this.init()};l.VERSION="1.12.4",l.DEFAULTS={noneSelectedText:"Nothing selected",noneResultsText:"No results matched {0}",countSelectedText:function(a,b){return 1==a?"{0} item selected":"{0} items selected"},maxOptionsText:function(a,b){return[1==a?"Limit reached ({n} item max)":"Limit reached ({n} items max)",1==b?"Group limit reached ({n} item max)":"Group limit reached ({n} items max)"]},selectAllText:"Select All",deselectAllText:"Deselect All",doneButton:!1,doneButtonText:"Close",multipleSeparator:", ",styleBase:"btn",style:"btn-default",size:"auto",title:null,selectedTextFormat:"values",width:!1,container:!1,hideDisabled:!1,showSubtext:!1,showIcon:!0,showContent:!0,dropupAuto:!0,header:!1,liveSearch:!1,liveSearchPlaceholder:null,liveSearchNormalize:!1,liveSearchStyle:"contains",actionsBox:!1,iconBase:"glyphicon",tickIcon:"glyphicon-ok",showTick:!1,template:{caret:'<span class="caret"></span>'},maxOptions:!1,mobile:!1,selectOnTab:!1,dropdownAlignRight:!1,windowPadding:0},l.prototype={constructor:l,init:function(){var b=this,c=this.$element.attr("id");this.$element.addClass("bs-select-hidden"),this.liObj={},this.multiple=this.$element.prop("multiple"),this.autofocus=this.$element.prop("autofocus"),this.$newElement=this.createView(),this.$element.after(this.$newElement).appendTo(this.$newElement),this.$button=this.$newElement.children("button"),this.$menu=this.$newElement.children(".dropdown-menu"),this.$menuInner=this.$menu.children(".inner"),this.$searchbox=this.$menu.find("input"),this.$element.removeClass("bs-select-hidden"),this.options.dropdownAlignRight===!0&&this.$menu.addClass("dropdown-menu-right"),"undefined"!=typeof c&&(this.$button.attr("data-id",c),a('label[for="'+c+'"]').click(function(a){a.preventDefault(),b.$button.focus()})),this.checkDisabled(),this.clickListener(),this.options.liveSearch&&this.liveSearchListener(),this.render(),this.setStyle(),this.setWidth(),this.options.container&&this.selectPosition(),this.$menu.data("this",this),this.$newElement.data("this",this),this.options.mobile&&this.mobile(),this.$newElement.on({"hide.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!1),b.$element.trigger("hide.bs.select",a)},"hidden.bs.dropdown":function(a){b.$element.trigger("hidden.bs.select",a)},"show.bs.dropdown":function(a){b.$menuInner.attr("aria-expanded",!0),b.$element.trigger("show.bs.select",a)},"shown.bs.dropdown":function(a){b.$element.trigger("shown.bs.select",a)}}),b.$element[0].hasAttribute("required")&&this.$element.on("invalid",function(){b.$button.addClass("bs-invalid"),b.$element.on({"focus.bs.select":function(){b.$button.focus(),b.$element.off("focus.bs.select")},"shown.bs.select":function(){b.$element.val(b.$element.val()).off("shown.bs.select")},"rendered.bs.select":function(){this.validity.valid&&b.$button.removeClass("bs-invalid"),b.$element.off("rendered.bs.select")}}),b.$button.on("blur.bs.select",function(){b.$element.focus().blur(),b.$button.off("blur.bs.select")})}),setTimeout(function(){b.$element.trigger("loaded.bs.select")})},createDropdown:function(){var b=this.multiple||this.options.showTick?" show-tick":"",c=this.$element.parent().hasClass("input-group")?" input-group-btn":"",d=this.autofocus?" autofocus":"",e=this.options.header?'<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>'+this.options.header+"</div>":"",f=this.options.liveSearch?'<div class="bs-searchbox"><input type="text" class="form-control" autocomplete="off"'+(null===this.options.liveSearchPlaceholder?"":' placeholder="'+j(this.options.liveSearchPlaceholder)+'"')+' role="textbox" aria-label="Search"></div>':"",g=this.multiple&&this.options.actionsBox?'<div class="bs-actionsbox"><div class="btn-group btn-group-sm btn-block"><button type="button" class="actions-btn bs-select-all btn btn-default">'+this.options.selectAllText+'</button><button type="button" class="actions-btn bs-deselect-all btn btn-default">'+this.options.deselectAllText+"</button></div></div>":"",h=this.multiple&&this.options.doneButton?'<div class="bs-donebutton"><div class="btn-group btn-block"><button type="button" class="btn btn-sm btn-default">'+this.options.doneButtonText+"</button></div></div>":"",i='<div class="btn-group bootstrap-select'+b+c+'"><button type="button" class="'+this.options.styleBase+' dropdown-toggle" data-toggle="dropdown"'+d+' role="button"><span class="filter-option pull-left"></span>&nbsp;<span class="bs-caret">'+this.options.template.caret+'</span></button><div class="dropdown-menu open" role="combobox">'+e+f+g+'<ul class="dropdown-menu inner" role="listbox" aria-expanded="false"></ul>'+h+"</div></div>";return a(i)},createView:function(){var a=this.createDropdown(),b=this.createLi();return a.find("ul")[0].innerHTML=b,a},reloadLi:function(){var a=this.createLi();this.$menuInner[0].innerHTML=a},createLi:function(){var c=this,d=[],e=0,f=document.createElement("option"),g=-1,h=function(a,b,c,d){return"<li"+("undefined"!=typeof c&&""!==c?' class="'+c+'"':"")+("undefined"!=typeof b&&null!==b?' data-original-index="'+b+'"':"")+("undefined"!=typeof d&&null!==d?'data-optgroup="'+d+'"':"")+">"+a+"</li>"},i=function(d,e,f,g){return'<a tabindex="0"'+("undefined"!=typeof e?' class="'+e+'"':"")+(f?' style="'+f+'"':"")+(c.options.liveSearchNormalize?' data-normalized-text="'+b(j(a(d).html()))+'"':"")+("undefined"!=typeof g||null!==g?' data-tokens="'+g+'"':"")+' role="option">'+d+'<span class="'+c.options.iconBase+" "+c.options.tickIcon+' check-mark"></span></a>'};if(this.options.title&&!this.multiple&&(g--,!this.$element.find(".bs-title-option").length)){var k=this.$element[0];f.className="bs-title-option",f.innerHTML=this.options.title,f.value="",k.insertBefore(f,k.firstChild);var l=a(k.options[k.selectedIndex]);void 0===l.attr("selected")&&void 0===this.$element.data("selected")&&(f.selected=!0)}var m=this.$element.find("option");return m.each(function(b){var f=a(this);if(g++,!f.hasClass("bs-title-option")){var k,l=this.className||"",n=j(this.style.cssText),o=f.data("content")?f.data("content"):f.html(),p=f.data("tokens")?f.data("tokens"):null,q="undefined"!=typeof f.data("subtext")?'<small class="text-muted">'+f.data("subtext")+"</small>":"",r="undefined"!=typeof f.data("icon")?'<span class="'+c.options.iconBase+" "+f.data("icon")+'"></span> ':"",s=f.parent(),t="OPTGROUP"===s[0].tagName,u=t&&s[0].disabled,v=this.disabled||u;if(""!==r&&v&&(r="<span>"+r+"</span>"),c.options.hideDisabled&&(v&&!t||u))return k=f.data("prevHiddenIndex"),f.next().data("prevHiddenIndex",void 0!==k?k:b),void g--;if(f.data("content")||(o=r+'<span class="text">'+o+q+"</span>"),t&&f.data("divider")!==!0){if(c.options.hideDisabled&&v){if(void 0===s.data("allOptionsDisabled")){var w=s.children();s.data("allOptionsDisabled",w.filter(":disabled").length===w.length)}if(s.data("allOptionsDisabled"))return void g--}var x=" "+s[0].className||"";if(0===f.index()){e+=1;var y=s[0].label,z="undefined"!=typeof s.data("subtext")?'<small class="text-muted">'+s.data("subtext")+"</small>":"",A=s.data("icon")?'<span class="'+c.options.iconBase+" "+s.data("icon")+'"></span> ':"";y=A+'<span class="text">'+j(y)+z+"</span>",0!==b&&d.length>0&&(g++,d.push(h("",null,"divider",e+"div"))),g++,d.push(h(y,null,"dropdown-header"+x,e))}if(c.options.hideDisabled&&v)return void g--;d.push(h(i(o,"opt "+l+x,n,p),b,"",e))}else if(f.data("divider")===!0)d.push(h("",b,"divider"));else if(f.data("hidden")===!0)k=f.data("prevHiddenIndex"),f.next().data("prevHiddenIndex",void 0!==k?k:b),d.push(h(i(o,l,n,p),b,"hidden is-hidden"));else{var B=this.previousElementSibling&&"OPTGROUP"===this.previousElementSibling.tagName;if(!B&&c.options.hideDisabled&&(k=f.data("prevHiddenIndex"),void 0!==k)){var C=m.eq(k)[0].previousElementSibling;C&&"OPTGROUP"===C.tagName&&!C.disabled&&(B=!0)}B&&(g++,d.push(h("",null,"divider",e+"div"))),d.push(h(i(o,l,n,p),b))}c.liObj[b]=g}}),this.multiple||0!==this.$element.find("option:selected").length||this.options.title||this.$element.find("option").eq(0).prop("selected",!0).attr("selected","selected"),d.join("")},findLis:function(){return null==this.$lis&&(this.$lis=this.$menu.find("li")),this.$lis},render:function(b){var c,d=this,e=this.$element.find("option");b!==!1&&e.each(function(a){var b=d.findLis().eq(d.liObj[a]);d.setDisabled(a,this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled,b),d.setSelected(a,this.selected,b)}),this.togglePlaceholder(),this.tabIndex();var f=e.map(function(){if(this.selected){if(d.options.hideDisabled&&(this.disabled||"OPTGROUP"===this.parentNode.tagName&&this.parentNode.disabled))return;var b,c=a(this),e=c.data("icon")&&d.options.showIcon?'<i class="'+d.options.iconBase+" "+c.data("icon")+'"></i> ':"";return b=d.options.showSubtext&&c.data("subtext")&&!d.multiple?' <small class="text-muted">'+c.data("subtext")+"</small>":"","undefined"!=typeof c.attr("title")?c.attr("title"):c.data("content")&&d.options.showContent?c.data("content").toString():e+c.html()+b}}).toArray(),g=this.multiple?f.join(this.options.multipleSeparator):f[0];if(this.multiple&&this.options.selectedTextFormat.indexOf("count")>-1){var h=this.options.selectedTextFormat.split(">");if(h.length>1&&f.length>h[1]||1==h.length&&f.length>=2){c=this.options.hideDisabled?", [disabled]":"";var i=e.not('[data-divider="true"], [data-hidden="true"]'+c).length,j="function"==typeof this.options.countSelectedText?this.options.countSelectedText(f.length,i):this.options.countSelectedText;g=j.replace("{0}",f.length.toString()).replace("{1}",i.toString())}}void 0==this.options.title&&(this.options.title=this.$element.attr("title")),"static"==this.options.selectedTextFormat&&(g=this.options.title),g||(g="undefined"!=typeof this.options.title?this.options.title:this.options.noneSelectedText),this.$button.attr("title",k(a.trim(g.replace(/<[^>]*>?/g,"")))),this.$button.children(".filter-option").html(g),this.$element.trigger("rendered.bs.select")},setStyle:function(a,b){this.$element.attr("class")&&this.$newElement.addClass(this.$element.attr("class").replace(/selectpicker|mobile-device|bs-select-hidden|validate\[.*\]/gi,""));var c=a?a:this.options.style;"add"==b?this.$button.addClass(c):"remove"==b?this.$button.removeClass(c):(this.$button.removeClass(this.options.style),this.$button.addClass(c))},liHeight:function(b){if(b||this.options.size!==!1&&!this.sizeInfo){var c=document.createElement("div"),d=document.createElement("div"),e=document.createElement("ul"),f=document.createElement("li"),g=document.createElement("li"),h=document.createElement("a"),i=document.createElement("span"),j=this.options.header&&this.$menu.find(".popover-title").length>0?this.$menu.find(".popover-title")[0].cloneNode(!0):null,k=this.options.liveSearch?document.createElement("div"):null,l=this.options.actionsBox&&this.multiple&&this.$menu.find(".bs-actionsbox").length>0?this.$menu.find(".bs-actionsbox")[0].cloneNode(!0):null,m=this.options.doneButton&&this.multiple&&this.$menu.find(".bs-donebutton").length>0?this.$menu.find(".bs-donebutton")[0].cloneNode(!0):null;if(i.className="text",c.className=this.$menu[0].parentNode.className+" open",d.className="dropdown-menu open",e.className="dropdown-menu inner",f.className="divider",i.appendChild(document.createTextNode("Inner text")),h.appendChild(i),g.appendChild(h),e.appendChild(g),e.appendChild(f),j&&d.appendChild(j),k){var n=document.createElement("input");k.className="bs-searchbox",n.className="form-control",k.appendChild(n),d.appendChild(k)}l&&d.appendChild(l),d.appendChild(e),m&&d.appendChild(m),c.appendChild(d),document.body.appendChild(c);var o=h.offsetHeight,p=j?j.offsetHeight:0,q=k?k.offsetHeight:0,r=l?l.offsetHeight:0,s=m?m.offsetHeight:0,t=a(f).outerHeight(!0),u="function"==typeof getComputedStyle&&getComputedStyle(d),v=u?null:a(d),w={vert:parseInt(u?u.paddingTop:v.css("paddingTop"))+parseInt(u?u.paddingBottom:v.css("paddingBottom"))+parseInt(u?u.borderTopWidth:v.css("borderTopWidth"))+parseInt(u?u.borderBottomWidth:v.css("borderBottomWidth")),horiz:parseInt(u?u.paddingLeft:v.css("paddingLeft"))+parseInt(u?u.paddingRight:v.css("paddingRight"))+parseInt(u?u.borderLeftWidth:v.css("borderLeftWidth"))+parseInt(u?u.borderRightWidth:v.css("borderRightWidth"))},x={vert:w.vert+parseInt(u?u.marginTop:v.css("marginTop"))+parseInt(u?u.marginBottom:v.css("marginBottom"))+2,horiz:w.horiz+parseInt(u?u.marginLeft:v.css("marginLeft"))+parseInt(u?u.marginRight:v.css("marginRight"))+2};document.body.removeChild(c),this.sizeInfo={liHeight:o,headerHeight:p,searchHeight:q,actionsHeight:r,doneButtonHeight:s,dividerHeight:t,menuPadding:w,menuExtras:x}}},setSize:function(){if(this.findLis(),this.liHeight(),this.options.header&&this.$menu.css("padding-top",0),this.options.size!==!1){var b,c,d,e,f,g,h,i,j=this,k=this.$menu,l=this.$menuInner,m=a(window),n=this.$newElement[0].offsetHeight,o=this.$newElement[0].offsetWidth,p=this.sizeInfo.liHeight,q=this.sizeInfo.headerHeight,r=this.sizeInfo.searchHeight,s=this.sizeInfo.actionsHeight,t=this.sizeInfo.doneButtonHeight,u=this.sizeInfo.dividerHeight,v=this.sizeInfo.menuPadding,w=this.sizeInfo.menuExtras,x=this.options.hideDisabled?".disabled":"",y=function(){var b,c=j.$newElement.offset(),d=a(j.options.container);j.options.container&&!d.is("body")?(b=d.offset(),b.top+=parseInt(d.css("borderTopWidth")),b.left+=parseInt(d.css("borderLeftWidth"))):b={top:0,left:0};var e=j.options.windowPadding;f=c.top-b.top-m.scrollTop(),g=m.height()-f-n-b.top-e[2],h=c.left-b.left-m.scrollLeft(),i=m.width()-h-o-b.left-e[1],f-=e[0],h-=e[3]};if(y(),"auto"===this.options.size){var z=function(){var m,n=function(b,c){return function(d){return c?d.classList?d.classList.contains(b):a(d).hasClass(b):!(d.classList?d.classList.contains(b):a(d).hasClass(b))}},u=j.$menuInner[0].getElementsByTagName("li"),x=Array.prototype.filter?Array.prototype.filter.call(u,n("hidden",!1)):j.$lis.not(".hidden"),z=Array.prototype.filter?Array.prototype.filter.call(x,n("dropdown-header",!0)):x.filter(".dropdown-header");y(),b=g-w.vert,c=i-w.horiz,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height"),k.data("width")||k.data("width",k.width()),e=k.data("width")):(d=k.height(),e=k.width()),j.options.dropupAuto&&j.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),j.$newElement.hasClass("dropup")&&(b=f-w.vert),"auto"===j.options.dropdownAlignRight&&k.toggleClass("dropdown-menu-right",h>i&&c-w.horiz<e-o),m=x.length+z.length>3?3*p+w.vert-2:0,k.css({"max-height":b+"px",overflow:"hidden","min-height":m+q+r+s+t+"px"}),l.css({"max-height":b-q-r-s-t-v.vert+"px","overflow-y":"auto","min-height":Math.max(m-v.vert,0)+"px"})};z(),this.$searchbox.off("input.getSize propertychange.getSize").on("input.getSize propertychange.getSize",z),m.off("resize.getSize scroll.getSize").on("resize.getSize scroll.getSize",z)}else if(this.options.size&&"auto"!=this.options.size&&this.$lis.not(x).length>this.options.size){var A=this.$lis.not(".divider").not(x).children().slice(0,this.options.size).last().parent().index(),B=this.$lis.slice(0,A+1).filter(".divider").length;b=p*this.options.size+B*u+v.vert,j.options.container?(k.data("height")||k.data("height",k.height()),d=k.data("height")):d=k.height(),j.options.dropupAuto&&this.$newElement.toggleClass("dropup",f>g&&b-w.vert<d),k.css({"max-height":b+q+r+s+t+"px",overflow:"hidden","min-height":""}),l.css({"max-height":b-v.vert+"px","overflow-y":"auto","min-height":""})}}},setWidth:function(){if("auto"===this.options.width){this.$menu.css("min-width","0");var a=this.$menu.parent().clone().appendTo("body"),b=this.options.container?this.$newElement.clone().appendTo("body"):a,c=a.children(".dropdown-menu").outerWidth(),d=b.css("width","auto").children("button").outerWidth();a.remove(),b.remove(),this.$newElement.css("width",Math.max(c,d)+"px")}else"fit"===this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width","").addClass("fit-width")):this.options.width?(this.$menu.css("min-width",""),this.$newElement.css("width",this.options.width)):(this.$menu.css("min-width",""),this.$newElement.css("width",""));this.$newElement.hasClass("fit-width")&&"fit"!==this.options.width&&this.$newElement.removeClass("fit-width")},selectPosition:function(){this.$bsContainer=a('<div class="bs-container" />');var b,c,d,e=this,f=a(this.options.container),g=function(a){e.$bsContainer.addClass(a.attr("class").replace(/form-control|fit-width/gi,"")).toggleClass("dropup",a.hasClass("dropup")),b=a.offset(),f.is("body")?c={top:0,left:0}:(c=f.offset(),c.top+=parseInt(f.css("borderTopWidth"))-f.scrollTop(),c.left+=parseInt(f.css("borderLeftWidth"))-f.scrollLeft()),d=a.hasClass("dropup")?0:a[0].offsetHeight,e.$bsContainer.css({top:b.top-c.top+d,left:b.left-c.left,width:a[0].offsetWidth})};this.$button.on("click",function(){var b=a(this);e.isDisabled()||(g(e.$newElement),e.$bsContainer.appendTo(e.options.container).toggleClass("open",!b.hasClass("open")).append(e.$menu))}),a(window).on("resize scroll",function(){g(e.$newElement)}),this.$element.on("hide.bs.select",function(){e.$menu.data("height",e.$menu.height()),e.$bsContainer.detach()})},setSelected:function(a,b,c){c||(this.togglePlaceholder(),c=this.findLis().eq(this.liObj[a])),c.toggleClass("selected",b).find("a").attr("aria-selected",b)},setDisabled:function(a,b,c){c||(c=this.findLis().eq(this.liObj[a])),b?c.addClass("disabled").children("a").attr("href","#").attr("tabindex",-1).attr("aria-disabled",!0):c.removeClass("disabled").children("a").removeAttr("href").attr("tabindex",0).attr("aria-disabled",!1)},isDisabled:function(){return this.$element[0].disabled},checkDisabled:function(){var a=this;this.isDisabled()?(this.$newElement.addClass("disabled"),this.$button.addClass("disabled").attr("tabindex",-1).attr("aria-disabled",!0)):(this.$button.hasClass("disabled")&&(this.$newElement.removeClass("disabled"),this.$button.removeClass("disabled").attr("aria-disabled",!1)),this.$button.attr("tabindex")!=-1||this.$element.data("tabindex")||this.$button.removeAttr("tabindex")),this.$button.click(function(){return!a.isDisabled()})},togglePlaceholder:function(){var a=this.$element.val();this.$button.toggleClass("bs-placeholder",null===a||""===a||a.constructor===Array&&0===a.length)},tabIndex:function(){this.$element.data("tabindex")!==this.$element.attr("tabindex")&&this.$element.attr("tabindex")!==-98&&"-98"!==this.$element.attr("tabindex")&&(this.$element.data("tabindex",this.$element.attr("tabindex")),this.$button.attr("tabindex",this.$element.data("tabindex"))),this.$element.attr("tabindex",-98)},clickListener:function(){var b=this,c=a(document);c.data("spaceSelect",!1),this.$button.on("keyup",function(a){/(32)/.test(a.keyCode.toString(10))&&c.data("spaceSelect")&&(a.preventDefault(),c.data("spaceSelect",!1))}),this.$button.on("click",function(){b.setSize()}),this.$element.on("shown.bs.select",function(){if(b.options.liveSearch||b.multiple){if(!b.multiple){var a=b.liObj[b.$element[0].selectedIndex];if("number"!=typeof a||b.options.size===!1)return;var c=b.$lis.eq(a)[0].offsetTop-b.$menuInner[0].offsetTop;c=c-b.$menuInner[0].offsetHeight/2+b.sizeInfo.liHeight/2,b.$menuInner[0].scrollTop=c}}else b.$menuInner.find(".selected a").focus()}),this.$menuInner.on("click","li a",function(c){var d=a(this),f=d.parent().data("originalIndex"),g=b.$element.val(),h=b.$element.prop("selectedIndex"),i=!0;if(b.multiple&&1!==b.options.maxOptions&&c.stopPropagation(),c.preventDefault(),!b.isDisabled()&&!d.parent().hasClass("disabled")){var j=b.$element.find("option"),k=j.eq(f),l=k.prop("selected"),m=k.parent("optgroup"),n=b.options.maxOptions,o=m.data("maxOptions")||!1;if(b.multiple){if(k.prop("selected",!l),b.setSelected(f,!l),d.blur(),n!==!1||o!==!1){var p=n<j.filter(":selected").length,q=o<m.find("option:selected").length;if(n&&p||o&&q)if(n&&1==n)j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected"),b.setSelected(f,!0);else if(o&&1==o){m.find("option:selected").prop("selected",!1),k.prop("selected",!0);var r=d.parent().data("optgroup");b.$menuInner.find('[data-optgroup="'+r+'"]').removeClass("selected"),b.setSelected(f,!0)}else{var s="string"==typeof b.options.maxOptionsText?[b.options.maxOptionsText,b.options.maxOptionsText]:b.options.maxOptionsText,t="function"==typeof s?s(n,o):s,u=t[0].replace("{n}",n),v=t[1].replace("{n}",o),w=a('<div class="notify"></div>');t[2]&&(u=u.replace("{var}",t[2][n>1?0:1]),v=v.replace("{var}",t[2][o>1?0:1])),k.prop("selected",!1),b.$menu.append(w),n&&p&&(w.append(a("<div>"+u+"</div>")),i=!1,b.$element.trigger("maxReached.bs.select")),o&&q&&(w.append(a("<div>"+v+"</div>")),i=!1,b.$element.trigger("maxReachedGrp.bs.select")),setTimeout(function(){b.setSelected(f,!1)},10),w.delay(750).fadeOut(300,function(){a(this).remove()})}}}else j.prop("selected",!1),k.prop("selected",!0),b.$menuInner.find(".selected").removeClass("selected").find("a").attr("aria-selected",!1),b.setSelected(f,!0);!b.multiple||b.multiple&&1===b.options.maxOptions?b.$button.focus():b.options.liveSearch&&b.$searchbox.focus(),i&&(g!=b.$element.val()&&b.multiple||h!=b.$element.prop("selectedIndex")&&!b.multiple)&&(e=[f,k.prop("selected"),l],b.$element.triggerNative("change"))}}),this.$menu.on("click","li.disabled a, .popover-title, .popover-title :not(.close)",function(c){c.currentTarget==this&&(c.preventDefault(),c.stopPropagation(),b.options.liveSearch&&!a(c.target).hasClass("close")?b.$searchbox.focus():b.$button.focus())}),this.$menuInner.on("click",".divider, .dropdown-header",function(a){a.preventDefault(),a.stopPropagation(),b.options.liveSearch?b.$searchbox.focus():b.$button.focus()}),this.$menu.on("click",".popover-title .close",function(){b.$button.click()}),this.$searchbox.on("click",function(a){a.stopPropagation()}),this.$menu.on("click",".actions-btn",function(c){b.options.liveSearch?b.$searchbox.focus():b.$button.focus(),c.preventDefault(),c.stopPropagation(),a(this).hasClass("bs-select-all")?b.selectAll():b.deselectAll()}),this.$element.change(function(){b.render(!1),b.$element.trigger("changed.bs.select",e),e=null})},liveSearchListener:function(){var c=this,d=a('<li class="no-results"></li>');this.$button.on("click.dropdown.data-api",function(){c.$menuInner.find(".active").removeClass("active"),c.$searchbox.val()&&(c.$searchbox.val(""),c.$lis.not(".is-hidden").removeClass("hidden"),d.parent().length&&d.remove()),c.multiple||c.$menuInner.find(".selected").addClass("active"),setTimeout(function(){c.$searchbox.focus()},10)}),this.$searchbox.on("click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api",function(a){a.stopPropagation()}),this.$searchbox.on("input propertychange",function(){if(c.$lis.not(".is-hidden").removeClass("hidden"),c.$lis.filter(".active").removeClass("active"),d.remove(),c.$searchbox.val()){var e,f=c.$lis.not(".is-hidden, .divider, .dropdown-header");if(e=c.options.liveSearchNormalize?f.not(":a"+c._searchStyle()+'("'+b(c.$searchbox.val())+'")'):f.not(":"+c._searchStyle()+'("'+c.$searchbox.val()+'")'),e.length===f.length)d.html(c.options.noneResultsText.replace("{0}",'"'+j(c.$searchbox.val())+'"')),c.$menuInner.append(d),c.$lis.addClass("hidden");else{e.addClass("hidden");var g,h=c.$lis.not(".hidden");h.each(function(b){var c=a(this);c.hasClass("divider")?void 0===g?c.addClass("hidden"):(g&&g.addClass("hidden"),g=c):c.hasClass("dropdown-header")&&h.eq(b+1).data("optgroup")!==c.data("optgroup")?c.addClass("hidden"):g=null}),g&&g.addClass("hidden"),f.not(".hidden").first().addClass("active"),c.$menuInner.scrollTop(0)}}})},_searchStyle:function(){var a={begins:"ibegins",startsWith:"ibegins"};return a[this.options.liveSearchStyle]||"icontains"},val:function(a){return"undefined"!=typeof a?(this.$element.val(a),this.render(),this.$element):this.$element.val()},changeAll:function(b){if(this.multiple){"undefined"==typeof b&&(b=!0),this.findLis();var c=this.$element.find("option"),d=this.$lis.not(".divider, .dropdown-header, .disabled, .hidden"),e=d.length,f=[];if(b){if(d.filter(".selected").length===d.length)return}else if(0===d.filter(".selected").length)return;d.toggleClass("selected",b);for(var g=0;g<e;g++){var h=d[g].getAttribute("data-original-index");f[f.length]=c.eq(h)[0]}a(f).prop("selected",b),this.render(!1),this.togglePlaceholder(),this.$element.triggerNative("change")}},selectAll:function(){return this.changeAll(!0)},deselectAll:function(){return this.changeAll(!1)},toggle:function(a){a=a||window.event,a&&a.stopPropagation(),this.$button.trigger("click")},keydown:function(b){var c,d,e,f,g=a(this),h=g.is("input")?g.parent().parent():g.parent(),i=h.data("this"),j=":not(.disabled, .hidden, .dropdown-header, .divider)",k={32:" ",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",59:";",65:"a",66:"b",67:"c",68:"d",69:"e",70:"f",71:"g",72:"h",73:"i",74:"j",75:"k",76:"l",77:"m",78:"n",79:"o",80:"p",81:"q",82:"r",83:"s",84:"t",85:"u",86:"v",87:"w",88:"x",89:"y",90:"z",96:"0",97:"1",98:"2",99:"3",100:"4",101:"5",102:"6",103:"7",104:"8",105:"9"};if(f=i.$newElement.hasClass("open"),!f&&(b.keyCode>=48&&b.keyCode<=57||b.keyCode>=96&&b.keyCode<=105||b.keyCode>=65&&b.keyCode<=90))return i.options.container?i.$button.trigger("click"):(i.setSize(),i.$menu.parent().addClass("open"),f=!0),void i.$searchbox.focus();if(i.options.liveSearch&&/(^9$|27)/.test(b.keyCode.toString(10))&&f&&(b.preventDefault(),b.stopPropagation(),i.$menuInner.click(),i.$button.focus()),/(38|40)/.test(b.keyCode.toString(10))){if(c=i.$lis.filter(j),!c.length)return;d=i.options.liveSearch?c.index(c.filter(".active")):c.index(c.find("a").filter(":focus").parent()),e=i.$menuInner.data("prevIndex"),38==b.keyCode?(!i.options.liveSearch&&d!=e||d==-1||d--,d<0&&(d+=c.length)):40==b.keyCode&&((i.options.liveSearch||d==e)&&d++,d%=c.length),i.$menuInner.data("prevIndex",d),i.options.liveSearch?(b.preventDefault(),g.hasClass("dropdown-toggle")||(c.removeClass("active").eq(d).addClass("active").children("a").focus(),g.focus())):c.eq(d).children("a").focus()}else if(!g.is("input")){var l,m,n=[];c=i.$lis.filter(j),c.each(function(c){a.trim(a(this).children("a").text().toLowerCase()).substring(0,1)==k[b.keyCode]&&n.push(c)}),l=a(document).data("keycount"),l++,a(document).data("keycount",l),m=a.trim(a(":focus").text().toLowerCase()).substring(0,1),m!=k[b.keyCode]?(l=1,a(document).data("keycount",l)):l>=n.length&&(a(document).data("keycount",0),l>n.length&&(l=1)),c.eq(n[l-1]).children("a").focus()}if((/(13|32)/.test(b.keyCode.toString(10))||/(^9$)/.test(b.keyCode.toString(10))&&i.options.selectOnTab)&&f){if(/(32)/.test(b.keyCode.toString(10))||b.preventDefault(),i.options.liveSearch)/(32)/.test(b.keyCode.toString(10))||(i.$menuInner.find(".active a").click(),g.focus());else{var o=a(":focus");o.click(),o.focus(),b.preventDefault(),a(document).data("spaceSelect",!0)}a(document).data("keycount",0)}(/(^9$|27)/.test(b.keyCode.toString(10))&&f&&(i.multiple||i.options.liveSearch)||/(27)/.test(b.keyCode.toString(10))&&!f)&&(i.$menu.parent().removeClass("open"),i.options.container&&i.$newElement.removeClass("open"),i.$button.focus())},mobile:function(){this.$element.addClass("mobile-device")},refresh:function(){this.$lis=null,this.liObj={},this.reloadLi(),this.render(),this.checkDisabled(),this.liHeight(!0),this.setStyle(),
this.setWidth(),this.$lis&&this.$searchbox.trigger("propertychange"),this.$element.trigger("refreshed.bs.select")},hide:function(){this.$newElement.hide()},show:function(){this.$newElement.show()},remove:function(){this.$newElement.remove(),this.$element.remove()},destroy:function(){this.$newElement.before(this.$element).remove(),this.$bsContainer?this.$bsContainer.remove():this.$menu.remove(),this.$element.off(".bs.select").removeData("selectpicker").removeClass("bs-select-hidden selectpicker")}};var m=a.fn.selectpicker;a.fn.selectpicker=c,a.fn.selectpicker.Constructor=l,a.fn.selectpicker.noConflict=function(){return a.fn.selectpicker=m,this},a(document).data("keycount",0).on("keydown.bs.select",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',l.prototype.keydown).on("focusin.modal",'.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role="listbox"], .bs-searchbox input',function(a){a.stopPropagation()}),a(window).on("load.bs.select.data-api",function(){a(".selectpicker").each(function(){var b=a(this);c.call(b,b.data())})})}(a)});
//# sourceMappingURL=bootstrap-select.js.map
/**!
 * Sortable
 * @author	RubaXa   <trash@rubaxa.org>
 * @license MIT
 */

(function sortableModule(factory) {
	"use strict";

	if (typeof define === "function" && define.amd) {
		define(factory);
	}
	else if (typeof module != "undefined" && typeof module.exports != "undefined") {
		module.exports = factory();
	}
	else {
		/* jshint sub:true */
		window["Sortable"] = factory();
	}
})(function sortableFactory() {
	"use strict";

	if (typeof window == "undefined" || !window.document) {
		return function sortableError() {
			throw new Error("Sortable.js requires a window with a document");
		};
	}

	var dragEl,
		parentEl,
		ghostEl,
		cloneEl,
		rootEl,
		nextEl,
		lastDownEl,

		scrollEl,
		scrollParentEl,
		scrollCustomFn,

		lastEl,
		lastCSS,
		lastParentCSS,

		oldIndex,
		newIndex,

		activeGroup,
		putSortable,

		autoScroll = {},

		tapEvt,
		touchEvt,

		moved,

		/** @const */
		R_SPACE = /\s+/g,
		R_FLOAT = /left|right|inline/,

		expando = 'Sortable' + (new Date).getTime(),

		win = window,
		document = win.document,
		parseInt = win.parseInt,

		$ = win.jQuery || win.Zepto,
		Polymer = win.Polymer,

		captureMode = false,

		supportDraggable = !!('draggable' in document.createElement('div')),
		supportCssPointerEvents = (function (el) {
			// false when IE11
			if (!!navigator.userAgent.match(/Trident.*rv[ :]?11\./)) {
				return false;
			}
			el = document.createElement('x');
			el.style.cssText = 'pointer-events:auto';
			return el.style.pointerEvents === 'auto';
		})(),

		_silent = false,

		abs = Math.abs,
		min = Math.min,

		savedInputChecked = [],
		touchDragOverListeners = [],

		_autoScroll = _throttle(function (/**Event*/evt, /**Object*/options, /**HTMLElement*/rootEl) {
			// Bug: https://bugzilla.mozilla.org/show_bug.cgi?id=505521
			if (rootEl && options.scroll) {
				var _this = rootEl[expando],
					el,
					rect,
					sens = options.scrollSensitivity,
					speed = options.scrollSpeed,

					x = evt.clientX,
					y = evt.clientY,

					winWidth = window.innerWidth,
					winHeight = window.innerHeight,

					vx,
					vy,

					scrollOffsetX,
					scrollOffsetY
				;

				// Delect scrollEl
				if (scrollParentEl !== rootEl) {
					scrollEl = options.scroll;
					scrollParentEl = rootEl;
					scrollCustomFn = options.scrollFn;

					if (scrollEl === true) {
						scrollEl = rootEl;

						do {
							if ((scrollEl.offsetWidth < scrollEl.scrollWidth) ||
								(scrollEl.offsetHeight < scrollEl.scrollHeight)
							) {
								break;
							}
							/* jshint boss:true */
						} while (scrollEl = scrollEl.parentNode);
					}
				}

				if (scrollEl) {
					el = scrollEl;
					rect = scrollEl.getBoundingClientRect();
					vx = (abs(rect.right - x) <= sens) - (abs(rect.left - x) <= sens);
					vy = (abs(rect.bottom - y) <= sens) - (abs(rect.top - y) <= sens);
				}


				if (!(vx || vy)) {
					vx = (winWidth - x <= sens) - (x <= sens);
					vy = (winHeight - y <= sens) - (y <= sens);

					/* jshint expr:true */
					(vx || vy) && (el = win);
				}


				if (autoScroll.vx !== vx || autoScroll.vy !== vy || autoScroll.el !== el) {
					autoScroll.el = el;
					autoScroll.vx = vx;
					autoScroll.vy = vy;

					clearInterval(autoScroll.pid);

					if (el) {
						autoScroll.pid = setInterval(function () {
							scrollOffsetY = vy ? vy * speed : 0;
							scrollOffsetX = vx ? vx * speed : 0;

							if ('function' === typeof(scrollCustomFn)) {
								return scrollCustomFn.call(_this, scrollOffsetX, scrollOffsetY, evt);
							}

							if (el === win) {
								win.scrollTo(win.pageXOffset + scrollOffsetX, win.pageYOffset + scrollOffsetY);
							} else {
								el.scrollTop += scrollOffsetY;
								el.scrollLeft += scrollOffsetX;
							}
						}, 24);
					}
				}
			}
		}, 30),

		_prepareGroup = function (options) {
			function toFn(value, pull) {
				if (value === void 0 || value === true) {
					value = group.name;
				}

				if (typeof value === 'function') {
					return value;
				} else {
					return function (to, from) {
						var fromGroup = from.options.group.name;

						return pull
							? value
							: value && (value.join
								? value.indexOf(fromGroup) > -1
								: (fromGroup == value)
							);
					};
				}
			}

			var group = {};
			var originalGroup = options.group;

			if (!originalGroup || typeof originalGroup != 'object') {
				originalGroup = {name: originalGroup};
			}

			group.name = originalGroup.name;
			group.checkPull = toFn(originalGroup.pull, true);
			group.checkPut = toFn(originalGroup.put);
			group.revertClone = originalGroup.revertClone;

			options.group = group;
		}
	;


	/**
	 * @class  Sortable
	 * @param  {HTMLElement}  el
	 * @param  {Object}       [options]
	 */
	function Sortable(el, options) {
		if (!(el && el.nodeType && el.nodeType === 1)) {
			throw 'Sortable: `el` must be HTMLElement, and not ' + {}.toString.call(el);
		}

		this.el = el; // root element
		this.options = options = _extend({}, options);


		// Export instance
		el[expando] = this;

		// Default options
		var defaults = {
			group: Math.random(),
			sort: true,
			disabled: false,
			store: null,
			handle: null,
			scroll: true,
			scrollSensitivity: 30,
			scrollSpeed: 10,
			draggable: /[uo]l/i.test(el.nodeName) ? 'li' : '>*',
			ghostClass: 'sortable-ghost',
			chosenClass: 'sortable-chosen',
			dragClass: 'sortable-drag',
			ignore: 'a, img',
			filter: null,
			preventOnFilter: true,
			animation: 0,
			setData: function (dataTransfer, dragEl) {
				dataTransfer.setData('Text', dragEl.textContent);
			},
			dropBubble: false,
			dragoverBubble: false,
			dataIdAttr: 'data-id',
			delay: 0,
			forceFallback: false,
			fallbackClass: 'sortable-fallback',
			fallbackOnBody: false,
			fallbackTolerance: 0,
			fallbackOffset: {x: 0, y: 0}
		};


		// Set default options
		for (var name in defaults) {
			!(name in options) && (options[name] = defaults[name]);
		}

		_prepareGroup(options);

		// Bind all private methods
		for (var fn in this) {
			if (fn.charAt(0) === '_' && typeof this[fn] === 'function') {
				this[fn] = this[fn].bind(this);
			}
		}

		// Setup drag mode
		this.nativeDraggable = options.forceFallback ? false : supportDraggable;

		// Bind events
		_on(el, 'mousedown', this._onTapStart);
		_on(el, 'touchstart', this._onTapStart);
		_on(el, 'pointerdown', this._onTapStart);

		if (this.nativeDraggable) {
			_on(el, 'dragover', this);
			_on(el, 'dragenter', this);
		}

		touchDragOverListeners.push(this._onDragOver);

		// Restore sorting
		options.store && this.sort(options.store.get(this));
	}


	Sortable.prototype = /** @lends Sortable.prototype */ {
		constructor: Sortable,

		_onTapStart: function (/** Event|TouchEvent */evt) {
			var _this = this,
				el = this.el,
				options = this.options,
				preventOnFilter = options.preventOnFilter,
				type = evt.type,
				touch = evt.touches && evt.touches[0],
				target = (touch || evt).target,
				originalTarget = evt.target.shadowRoot && evt.path[0] || target,
				filter = options.filter,
				startIndex;

			_saveInputCheckedState(el);


			// Don't trigger start event when an element is been dragged, otherwise the evt.oldindex always wrong when set option.group.
			if (dragEl) {
				return;
			}

			if (type === 'mousedown' && evt.button !== 0 || options.disabled) {
				return; // only left button or enabled
			}


			target = _closest(target, options.draggable, el);

			if (!target) {
				return;
			}

			if (lastDownEl === target) {
				// Ignoring duplicate `down`
				return;
			}

			// Get the index of the dragged element within its parent
			startIndex = _index(target, options.draggable);

			// Check filter
			if (typeof filter === 'function') {
				if (filter.call(this, evt, target, this)) {
					_dispatchEvent(_this, originalTarget, 'filter', target, el, startIndex);
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}
			else if (filter) {
				filter = filter.split(',').some(function (criteria) {
					criteria = _closest(originalTarget, criteria.trim(), el);

					if (criteria) {
						_dispatchEvent(_this, criteria, 'filter', target, el, startIndex);
						return true;
					}
				});

				if (filter) {
					preventOnFilter && evt.preventDefault();
					return; // cancel dnd
				}
			}

			if (options.handle && !_closest(originalTarget, options.handle, el)) {
				return;
			}

			// Prepare `dragstart`
			this._prepareDragStart(evt, touch, target, startIndex);
		},

		_prepareDragStart: function (/** Event */evt, /** Touch */touch, /** HTMLElement */target, /** Number */startIndex) {
			var _this = this,
				el = _this.el,
				options = _this.options,
				ownerDocument = el.ownerDocument,
				dragStartFn;

			if (target && !dragEl && (target.parentNode === el)) {
				tapEvt = evt;

				rootEl = el;
				dragEl = target;
				parentEl = dragEl.parentNode;
				nextEl = dragEl.nextSibling;
				lastDownEl = target;
				activeGroup = options.group;
				oldIndex = startIndex;

				this._lastX = (touch || evt).clientX;
				this._lastY = (touch || evt).clientY;

				dragEl.style['will-change'] = 'transform';

				dragStartFn = function () {
					// Delayed drag has been triggered
					// we can re-enable the events: touchmove/mousemove
					_this._disableDelayedDrag();

					// Make the element draggable
					dragEl.draggable = _this.nativeDraggable;

					// Chosen item
					_toggleClass(dragEl, options.chosenClass, true);

					// Bind the events: dragstart/dragend
					_this._triggerDragStart(evt, touch);

					// Drag start event
					_dispatchEvent(_this, rootEl, 'choose', dragEl, rootEl, oldIndex);
				};

				// Disable "draggable"
				options.ignore.split(',').forEach(function (criteria) {
					_find(dragEl, criteria.trim(), _disableDraggable);
				});

				_on(ownerDocument, 'mouseup', _this._onDrop);
				_on(ownerDocument, 'touchend', _this._onDrop);
				_on(ownerDocument, 'touchcancel', _this._onDrop);
				_on(ownerDocument, 'pointercancel', _this._onDrop);
				_on(ownerDocument, 'selectstart', _this);

				if (options.delay) {
					// If the user moves the pointer or let go the click or touch
					// before the delay has been reached:
					// disable the delayed drag
					_on(ownerDocument, 'mouseup', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchend', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchcancel', _this._disableDelayedDrag);
					_on(ownerDocument, 'mousemove', _this._disableDelayedDrag);
					_on(ownerDocument, 'touchmove', _this._disableDelayedDrag);
					_on(ownerDocument, 'pointermove', _this._disableDelayedDrag);

					_this._dragStartTimer = setTimeout(dragStartFn, options.delay);
				} else {
					dragStartFn();
				}


			}
		},

		_disableDelayedDrag: function () {
			var ownerDocument = this.el.ownerDocument;

			clearTimeout(this._dragStartTimer);
			_off(ownerDocument, 'mouseup', this._disableDelayedDrag);
			_off(ownerDocument, 'touchend', this._disableDelayedDrag);
			_off(ownerDocument, 'touchcancel', this._disableDelayedDrag);
			_off(ownerDocument, 'mousemove', this._disableDelayedDrag);
			_off(ownerDocument, 'touchmove', this._disableDelayedDrag);
			_off(ownerDocument, 'pointermove', this._disableDelayedDrag);
		},

		_triggerDragStart: function (/** Event */evt, /** Touch */touch) {
			touch = touch || (evt.pointerType == 'touch' ? evt : null);

			if (touch) {
				// Touch device support
				tapEvt = {
					target: dragEl,
					clientX: touch.clientX,
					clientY: touch.clientY
				};

				this._onDragStart(tapEvt, 'touch');
			}
			else if (!this.nativeDraggable) {
				this._onDragStart(tapEvt, true);
			}
			else {
				_on(dragEl, 'dragend', this);
				_on(rootEl, 'dragstart', this._onDragStart);
			}

			try {
				if (document.selection) {
					// Timeout neccessary for IE9
					setTimeout(function () {
						document.selection.empty();
					});
				} else {
					window.getSelection().removeAllRanges();
				}
			} catch (err) {
			}
		},

		_dragStarted: function () {
			if (rootEl && dragEl) {
				var options = this.options;

				// Apply effect
				_toggleClass(dragEl, options.ghostClass, true);
				_toggleClass(dragEl, options.dragClass, false);

				Sortable.active = this;

				// Drag start event
				_dispatchEvent(this, rootEl, 'start', dragEl, rootEl, oldIndex);
			} else {
				this._nulling();
			}
		},

		_emulateDragOver: function () {
			if (touchEvt) {
				if (this._lastX === touchEvt.clientX && this._lastY === touchEvt.clientY) {
					return;
				}

				this._lastX = touchEvt.clientX;
				this._lastY = touchEvt.clientY;

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', 'none');
				}

				var target = document.elementFromPoint(touchEvt.clientX, touchEvt.clientY),
					parent = target,
					i = touchDragOverListeners.length;

				if (parent) {
					do {
						if (parent[expando]) {
							while (i--) {
								touchDragOverListeners[i]({
									clientX: touchEvt.clientX,
									clientY: touchEvt.clientY,
									target: target,
									rootEl: parent
								});
							}

							break;
						}

						target = parent; // store last element
					}
					/* jshint boss:true */
					while (parent = parent.parentNode);
				}

				if (!supportCssPointerEvents) {
					_css(ghostEl, 'display', '');
				}
			}
		},


		_onTouchMove: function (/**TouchEvent*/evt) {
			if (tapEvt) {
				var	options = this.options,
					fallbackTolerance = options.fallbackTolerance,
					fallbackOffset = options.fallbackOffset,
					touch = evt.touches ? evt.touches[0] : evt,
					dx = (touch.clientX - tapEvt.clientX) + fallbackOffset.x,
					dy = (touch.clientY - tapEvt.clientY) + fallbackOffset.y,
					translate3d = evt.touches ? 'translate3d(' + dx + 'px,' + dy + 'px,0)' : 'translate(' + dx + 'px,' + dy + 'px)';

				// only set the status to dragging, when we are actually dragging
				if (!Sortable.active) {
					if (fallbackTolerance &&
						min(abs(touch.clientX - this._lastX), abs(touch.clientY - this._lastY)) < fallbackTolerance
					) {
						return;
					}

					this._dragStarted();
				}

				// as well as creating the ghost element on the document body
				this._appendGhost();

				moved = true;
				touchEvt = touch;

				_css(ghostEl, 'webkitTransform', translate3d);
				_css(ghostEl, 'mozTransform', translate3d);
				_css(ghostEl, 'msTransform', translate3d);
				_css(ghostEl, 'transform', translate3d);

				evt.preventDefault();
			}
		},

		_appendGhost: function () {
			if (!ghostEl) {
				var rect = dragEl.getBoundingClientRect(),
					css = _css(dragEl),
					options = this.options,
					ghostRect;

				ghostEl = dragEl.cloneNode(true);

				_toggleClass(ghostEl, options.ghostClass, false);
				_toggleClass(ghostEl, options.fallbackClass, true);
				_toggleClass(ghostEl, options.dragClass, true);

				_css(ghostEl, 'top', rect.top - parseInt(css.marginTop, 10));
				_css(ghostEl, 'left', rect.left - parseInt(css.marginLeft, 10));
				_css(ghostEl, 'width', rect.width);
				_css(ghostEl, 'height', rect.height);
				_css(ghostEl, 'opacity', '0.8');
				_css(ghostEl, 'position', 'fixed');
				_css(ghostEl, 'zIndex', '100000');
				_css(ghostEl, 'pointerEvents', 'none');

				options.fallbackOnBody && document.body.appendChild(ghostEl) || rootEl.appendChild(ghostEl);

				// Fixing dimensions.
				ghostRect = ghostEl.getBoundingClientRect();
				_css(ghostEl, 'width', rect.width * 2 - ghostRect.width);
				_css(ghostEl, 'height', rect.height * 2 - ghostRect.height);
			}
		},

		_onDragStart: function (/**Event*/evt, /**boolean*/useFallback) {
			var dataTransfer = evt.dataTransfer,
				options = this.options;

			this._offUpEvents();

			if (activeGroup.checkPull(this, this, dragEl, evt)) {
				cloneEl = _clone(dragEl);

				cloneEl.draggable = false;
				cloneEl.style['will-change'] = '';

				_css(cloneEl, 'display', 'none');
				_toggleClass(cloneEl, this.options.chosenClass, false);

				rootEl.insertBefore(cloneEl, dragEl);
				_dispatchEvent(this, rootEl, 'clone', dragEl);
			}

			_toggleClass(dragEl, options.dragClass, true);

			if (useFallback) {
				if (useFallback === 'touch') {
					// Bind touch events
					_on(document, 'touchmove', this._onTouchMove);
					_on(document, 'touchend', this._onDrop);
					_on(document, 'touchcancel', this._onDrop);
					_on(document, 'pointermove', this._onTouchMove);
					_on(document, 'pointerup', this._onDrop);
				} else {
					// Old brwoser
					_on(document, 'mousemove', this._onTouchMove);
					_on(document, 'mouseup', this._onDrop);
				}

				this._loopId = setInterval(this._emulateDragOver, 50);
			}
			else {
				if (dataTransfer) {
					dataTransfer.effectAllowed = 'move';
					options.setData && options.setData.call(this, dataTransfer, dragEl);
				}

				_on(document, 'drop', this);
				setTimeout(this._dragStarted, 0);
			}
		},

		_onDragOver: function (/**Event*/evt) {
			var el = this.el,
				target,
				dragRect,
				targetRect,
				revert,
				options = this.options,
				group = options.group,
				activeSortable = Sortable.active,
				isOwner = (activeGroup === group),
				isMovingBetweenSortable = false,
				canSort = options.sort;

			if (evt.preventDefault !== void 0) {
				evt.preventDefault();
				!options.dragoverBubble && evt.stopPropagation();
			}

			if (dragEl.animated) {
				return;
			}

			moved = true;

			if (activeSortable && !options.disabled &&
				(isOwner
					? canSort || (revert = !rootEl.contains(dragEl)) // Reverting item into the original list
					: (
						putSortable === this ||
						(
							(activeSortable.lastPullMode = activeGroup.checkPull(this, activeSortable, dragEl, evt)) &&
							group.checkPut(this, activeSortable, dragEl, evt)
						)
					)
				) &&
				(evt.rootEl === void 0 || evt.rootEl === this.el) // touch fallback
			) {
				// Smart auto-scrolling
				_autoScroll(evt, options, this.el);

				if (_silent) {
					return;
				}

				target = _closest(evt.target, options.draggable, el);
				dragRect = dragEl.getBoundingClientRect();

				if (putSortable !== this) {
					putSortable = this;
					isMovingBetweenSortable = true;
				}

				if (revert) {
					_cloneHide(activeSortable, true);
					parentEl = rootEl; // actualization

					if (cloneEl || nextEl) {
						rootEl.insertBefore(dragEl, cloneEl || nextEl);
					}
					else if (!canSort) {
						rootEl.appendChild(dragEl);
					}

					return;
				}


				if ((el.children.length === 0) || (el.children[0] === ghostEl) ||
					(el === evt.target) && (_ghostIsLast(el, evt))
				) {
					//assign target only if condition is true
					if (el.children.length !== 0 && el.children[0] !== ghostEl && el === evt.target) {
						target = el.lastElementChild;
					}

					if (target) {
						if (target.animated) {
							return;
						}

						targetRect = target.getBoundingClientRect();
					}

					_cloneHide(activeSortable, isOwner);

					if (_onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt) !== false) {
						if (!dragEl.contains(el)) {
							el.appendChild(dragEl);
							parentEl = el; // actualization
						}

						this._animate(dragRect, dragEl);
						target && this._animate(targetRect, target);
					}
				}
				else if (target && !target.animated && target !== dragEl && (target.parentNode[expando] !== void 0)) {
					if (lastEl !== target) {
						lastEl = target;
						lastCSS = _css(target);
						lastParentCSS = _css(target.parentNode);
					}

					targetRect = target.getBoundingClientRect();

					var width = targetRect.right - targetRect.left,
						height = targetRect.bottom - targetRect.top,
						floating = R_FLOAT.test(lastCSS.cssFloat + lastCSS.display)
							|| (lastParentCSS.display == 'flex' && lastParentCSS['flex-direction'].indexOf('row') === 0),
						isWide = (target.offsetWidth > dragEl.offsetWidth),
						isLong = (target.offsetHeight > dragEl.offsetHeight),
						halfway = (floating ? (evt.clientX - targetRect.left) / width : (evt.clientY - targetRect.top) / height) > 0.5,
						nextSibling = target.nextElementSibling,
						after = false
					;

					if (floating) {
						var elTop = dragEl.offsetTop,
							tgTop = target.offsetTop;

						if (elTop === tgTop) {
							after = (target.previousElementSibling === dragEl) && !isWide || halfway && isWide;
						}
						else if (target.previousElementSibling === dragEl || dragEl.previousElementSibling === target) {
							after = (evt.clientY - targetRect.top) / height > 0.5;
						} else {
							after = tgTop > elTop;
						}
						} else if (!isMovingBetweenSortable) {
						after = (nextSibling !== dragEl) && !isLong || halfway && isLong;
					}

					var moveVector = _onMove(rootEl, el, dragEl, dragRect, target, targetRect, evt, after);

					if (moveVector !== false) {
						if (moveVector === 1 || moveVector === -1) {
							after = (moveVector === 1);
						}

						_silent = true;
						setTimeout(_unsilent, 30);

						_cloneHide(activeSortable, isOwner);

						if (!dragEl.contains(el)) {
							if (after && !nextSibling) {
								el.appendChild(dragEl);
							} else {
								target.parentNode.insertBefore(dragEl, after ? nextSibling : target);
							}
						}

						parentEl = dragEl.parentNode; // actualization

						this._animate(dragRect, dragEl);
						this._animate(targetRect, target);
					}
				}
			}
		},

		_animate: function (prevRect, target) {
			var ms = this.options.animation;

			if (ms) {
				var currentRect = target.getBoundingClientRect();

				if (prevRect.nodeType === 1) {
					prevRect = prevRect.getBoundingClientRect();
				}

				_css(target, 'transition', 'none');
				_css(target, 'transform', 'translate3d('
					+ (prevRect.left - currentRect.left) + 'px,'
					+ (prevRect.top - currentRect.top) + 'px,0)'
				);

				target.offsetWidth; // repaint

				_css(target, 'transition', 'all ' + ms + 'ms');
				_css(target, 'transform', 'translate3d(0,0,0)');

				clearTimeout(target.animated);
				target.animated = setTimeout(function () {
					_css(target, 'transition', '');
					_css(target, 'transform', '');
					target.animated = false;
				}, ms);
			}
		},

		_offUpEvents: function () {
			var ownerDocument = this.el.ownerDocument;

			_off(document, 'touchmove', this._onTouchMove);
			_off(document, 'pointermove', this._onTouchMove);
			_off(ownerDocument, 'mouseup', this._onDrop);
			_off(ownerDocument, 'touchend', this._onDrop);
			_off(ownerDocument, 'pointerup', this._onDrop);
			_off(ownerDocument, 'touchcancel', this._onDrop);
			_off(ownerDocument, 'pointercancel', this._onDrop);
			_off(ownerDocument, 'selectstart', this);
		},

		_onDrop: function (/**Event*/evt) {
			var el = this.el,
				options = this.options;

			clearInterval(this._loopId);
			clearInterval(autoScroll.pid);
			clearTimeout(this._dragStartTimer);

			// Unbind events
			_off(document, 'mousemove', this._onTouchMove);

			if (this.nativeDraggable) {
				_off(document, 'drop', this);
				_off(el, 'dragstart', this._onDragStart);
			}

			this._offUpEvents();

			if (evt) {
				if (moved) {
					evt.preventDefault();
					!options.dropBubble && evt.stopPropagation();
				}

				ghostEl && ghostEl.parentNode && ghostEl.parentNode.removeChild(ghostEl);

				if (rootEl === parentEl || Sortable.active.lastPullMode !== 'clone') {
					// Remove clone
					cloneEl && cloneEl.parentNode && cloneEl.parentNode.removeChild(cloneEl);
				}

				if (dragEl) {
					if (this.nativeDraggable) {
						_off(dragEl, 'dragend', this);
					}

					_disableDraggable(dragEl);
					dragEl.style['will-change'] = '';

					// Remove class's
					_toggleClass(dragEl, this.options.ghostClass, false);
					_toggleClass(dragEl, this.options.chosenClass, false);

					// Drag stop event
					_dispatchEvent(this, rootEl, 'unchoose', dragEl, rootEl, oldIndex);

					if (rootEl !== parentEl) {
						newIndex = _index(dragEl, options.draggable);

						if (newIndex >= 0) {
							// Add event
							_dispatchEvent(null, parentEl, 'add', dragEl, rootEl, oldIndex, newIndex);

							// Remove event
							_dispatchEvent(this, rootEl, 'remove', dragEl, rootEl, oldIndex, newIndex);

							// drag from one list and drop into another
							_dispatchEvent(null, parentEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
						}
					}
					else {
						if (dragEl.nextSibling !== nextEl) {
							// Get the index of the dragged element within its parent
							newIndex = _index(dragEl, options.draggable);

							if (newIndex >= 0) {
								// drag & drop within the same list
								_dispatchEvent(this, rootEl, 'update', dragEl, rootEl, oldIndex, newIndex);
								_dispatchEvent(this, rootEl, 'sort', dragEl, rootEl, oldIndex, newIndex);
							}
						}
					}

					if (Sortable.active) {
						/* jshint eqnull:true */
						if (newIndex == null || newIndex === -1) {
							newIndex = oldIndex;
						}

						_dispatchEvent(this, rootEl, 'end', dragEl, rootEl, oldIndex, newIndex);

						// Save sorting
						this.save();
					}
				}

			}

			this._nulling();
		},

		_nulling: function() {
			rootEl =
			dragEl =
			parentEl =
			ghostEl =
			nextEl =
			cloneEl =
			lastDownEl =

			scrollEl =
			scrollParentEl =

			tapEvt =
			touchEvt =

			moved =
			newIndex =

			lastEl =
			lastCSS =

			putSortable =
			activeGroup =
			Sortable.active = null;

			savedInputChecked.forEach(function (el) {
				el.checked = true;
			});
			savedInputChecked.length = 0;
		},

		handleEvent: function (/**Event*/evt) {
			switch (evt.type) {
				case 'drop':
				case 'dragend':
					this._onDrop(evt);
					break;

				case 'dragover':
				case 'dragenter':
					if (dragEl) {
						this._onDragOver(evt);
						_globalDragOver(evt);
					}
					break;

				case 'selectstart':
					evt.preventDefault();
					break;
			}
		},


		/**
		 * Serializes the item into an array of string.
		 * @returns {String[]}
		 */
		toArray: function () {
			var order = [],
				el,
				children = this.el.children,
				i = 0,
				n = children.length,
				options = this.options;

			for (; i < n; i++) {
				el = children[i];
				if (_closest(el, options.draggable, this.el)) {
					order.push(el.getAttribute(options.dataIdAttr) || _generateId(el));
				}
			}

			return order;
		},


		/**
		 * Sorts the elements according to the array.
		 * @param  {String[]}  order  order of the items
		 */
		sort: function (order) {
			var items = {}, rootEl = this.el;

			this.toArray().forEach(function (id, i) {
				var el = rootEl.children[i];

				if (_closest(el, this.options.draggable, rootEl)) {
					items[id] = el;
				}
			}, this);

			order.forEach(function (id) {
				if (items[id]) {
					rootEl.removeChild(items[id]);
					rootEl.appendChild(items[id]);
				}
			});
		},


		/**
		 * Save the current sorting
		 */
		save: function () {
			var store = this.options.store;
			store && store.set(this);
		},


		/**
		 * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
		 * @param   {HTMLElement}  el
		 * @param   {String}       [selector]  default: `options.draggable`
		 * @returns {HTMLElement|null}
		 */
		closest: function (el, selector) {
			return _closest(el, selector || this.options.draggable, this.el);
		},


		/**
		 * Set/get option
		 * @param   {string} name
		 * @param   {*}      [value]
		 * @returns {*}
		 */
		option: function (name, value) {
			var options = this.options;

			if (value === void 0) {
				return options[name];
			} else {
				options[name] = value;

				if (name === 'group') {
					_prepareGroup(options);
				}
			}
		},


		/**
		 * Destroy
		 */
		destroy: function () {
			var el = this.el;

			el[expando] = null;

			_off(el, 'mousedown', this._onTapStart);
			_off(el, 'touchstart', this._onTapStart);
			_off(el, 'pointerdown', this._onTapStart);

			if (this.nativeDraggable) {
				_off(el, 'dragover', this);
				_off(el, 'dragenter', this);
			}

			// Remove draggable attributes
			Array.prototype.forEach.call(el.querySelectorAll('[draggable]'), function (el) {
				el.removeAttribute('draggable');
			});

			touchDragOverListeners.splice(touchDragOverListeners.indexOf(this._onDragOver), 1);

			this._onDrop();

			this.el = el = null;
		}
	};


	function _cloneHide(sortable, state) {
		if (sortable.lastPullMode !== 'clone') {
			state = true;
		}

		if (cloneEl && (cloneEl.state !== state)) {
			_css(cloneEl, 'display', state ? 'none' : '');

			if (!state) {
				if (cloneEl.state) {
					if (sortable.options.group.revertClone) {
						rootEl.insertBefore(cloneEl, nextEl);
						sortable._animate(dragEl, cloneEl);
					} else {
						rootEl.insertBefore(cloneEl, dragEl);
					}
				}
			}

			cloneEl.state = state;
		}
	}


	function _closest(/**HTMLElement*/el, /**String*/selector, /**HTMLElement*/ctx) {
		if (el) {
			ctx = ctx || document;

			do {
				if ((selector === '>*' && el.parentNode === ctx) || _matches(el, selector)) {
					return el;
				}
				/* jshint boss:true */
			} while (el = _getParentOrHost(el));
		}

		return null;
	}


	function _getParentOrHost(el) {
		var parent = el.host;

		return (parent && parent.nodeType) ? parent : el.parentNode;
	}


	function _globalDragOver(/**Event*/evt) {
		if (evt.dataTransfer) {
			evt.dataTransfer.dropEffect = 'move';
		}
		evt.preventDefault();
	}


	function _on(el, event, fn) {
		el.addEventListener(event, fn, captureMode);
	}


	function _off(el, event, fn) {
		el.removeEventListener(event, fn, captureMode);
	}


	function _toggleClass(el, name, state) {
		if (el) {
			if (el.classList) {
				el.classList[state ? 'add' : 'remove'](name);
			}
			else {
				var className = (' ' + el.className + ' ').replace(R_SPACE, ' ').replace(' ' + name + ' ', ' ');
				el.className = (className + (state ? ' ' + name : '')).replace(R_SPACE, ' ');
			}
		}
	}


	function _css(el, prop, val) {
		var style = el && el.style;

		if (style) {
			if (val === void 0) {
				if (document.defaultView && document.defaultView.getComputedStyle) {
					val = document.defaultView.getComputedStyle(el, '');
				}
				else if (el.currentStyle) {
					val = el.currentStyle;
				}

				return prop === void 0 ? val : val[prop];
			}
			else {
				if (!(prop in style)) {
					prop = '-webkit-' + prop;
				}

				style[prop] = val + (typeof val === 'string' ? '' : 'px');
			}
		}
	}


	function _find(ctx, tagName, iterator) {
		if (ctx) {
			var list = ctx.getElementsByTagName(tagName), i = 0, n = list.length;

			if (iterator) {
				for (; i < n; i++) {
					iterator(list[i], i);
				}
			}

			return list;
		}

		return [];
	}



	function _dispatchEvent(sortable, rootEl, name, targetEl, fromEl, startIndex, newIndex) {
		sortable = (sortable || rootEl[expando]);

		var evt = document.createEvent('Event'),
			options = sortable.options,
			onName = 'on' + name.charAt(0).toUpperCase() + name.substr(1);

		evt.initEvent(name, true, true);

		evt.to = rootEl;
		evt.from = fromEl || rootEl;
		evt.item = targetEl || rootEl;
		evt.clone = cloneEl;

		evt.oldIndex = startIndex;
		evt.newIndex = newIndex;

		rootEl.dispatchEvent(evt);

		if (options[onName]) {
			options[onName].call(sortable, evt);
		}
	}


	function _onMove(fromEl, toEl, dragEl, dragRect, targetEl, targetRect, originalEvt, willInsertAfter) {
		var evt,
			sortable = fromEl[expando],
			onMoveFn = sortable.options.onMove,
			retVal;

		evt = document.createEvent('Event');
		evt.initEvent('move', true, true);

		evt.to = toEl;
		evt.from = fromEl;
		evt.dragged = dragEl;
		evt.draggedRect = dragRect;
		evt.related = targetEl || toEl;
		evt.relatedRect = targetRect || toEl.getBoundingClientRect();
		evt.willInsertAfter = willInsertAfter;

		fromEl.dispatchEvent(evt);

		if (onMoveFn) {
			retVal = onMoveFn.call(sortable, evt, originalEvt);
		}

		return retVal;
	}


	function _disableDraggable(el) {
		el.draggable = false;
	}


	function _unsilent() {
		_silent = false;
	}


	/** @returns {HTMLElement|false} */
	function _ghostIsLast(el, evt) {
		var lastEl = el.lastElementChild,
			rect = lastEl.getBoundingClientRect();

		// 5 — min delta
		// abs — нельзя добавлять, а то глюки при наведении сверху
		return (evt.clientY - (rect.top + rect.height) > 5) ||
			(evt.clientX - (rect.left + rect.width) > 5);
	}


	/**
	 * Generate id
	 * @param   {HTMLElement} el
	 * @returns {String}
	 * @private
	 */
	function _generateId(el) {
		var str = el.tagName + el.className + el.src + el.href + el.textContent,
			i = str.length,
			sum = 0;

		while (i--) {
			sum += str.charCodeAt(i);
		}

		return sum.toString(36);
	}

	/**
	 * Returns the index of an element within its parent for a selected set of
	 * elements
	 * @param  {HTMLElement} el
	 * @param  {selector} selector
	 * @return {number}
	 */
	function _index(el, selector) {
		var index = 0;

		if (!el || !el.parentNode) {
			return -1;
		}

		while (el && (el = el.previousElementSibling)) {
			if ((el.nodeName.toUpperCase() !== 'TEMPLATE') && (selector === '>*' || _matches(el, selector))) {
				index++;
			}
		}

		return index;
	}

	function _matches(/**HTMLElement*/el, /**String*/selector) {
		if (el) {
			selector = selector.split('.');

			var tag = selector.shift().toUpperCase(),
				re = new RegExp('\\s(' + selector.join('|') + ')(?=\\s)', 'g');

			return (
				(tag === '' || el.nodeName.toUpperCase() == tag) &&
				(!selector.length || ((' ' + el.className + ' ').match(re) || []).length == selector.length)
			);
		}

		return false;
	}

	function _throttle(callback, ms) {
		var args, _this;

		return function () {
			if (args === void 0) {
				args = arguments;
				_this = this;

				setTimeout(function () {
					if (args.length === 1) {
						callback.call(_this, args[0]);
					} else {
						callback.apply(_this, args);
					}

					args = void 0;
				}, ms);
			}
		};
	}

	function _extend(dst, src) {
		if (dst && src) {
			for (var key in src) {
				if (src.hasOwnProperty(key)) {
					dst[key] = src[key];
				}
			}
		}

		return dst;
	}

	function _clone(el) {
		return $
			? $(el).clone(true)[0]
			: (Polymer && Polymer.dom
				? Polymer.dom(el).cloneNode(true)
				: el.cloneNode(true)
			);
	}

	function _saveInputCheckedState(root) {
		var inputs = root.getElementsByTagName('input');
		var idx = inputs.length;

		while (idx--) {
			var el = inputs[idx];
			el.checked && savedInputChecked.push(el);
		}
	}

	// Fixed #973: 
	_on(document, 'touchmove', function (evt) {
		if (Sortable.active) {
			evt.preventDefault();
		}
	});

	try {
		window.addEventListener('test', null, Object.defineProperty({}, 'passive', {
			get: function () {
				captureMode = {
					capture: false,
					passive: false
				};
			}
		}));
	} catch (err) {}

	// Export utils
	Sortable.utils = {
		on: _on,
		off: _off,
		css: _css,
		find: _find,
		is: function (el, selector) {
			return !!_closest(el, selector, el);
		},
		extend: _extend,
		throttle: _throttle,
		closest: _closest,
		toggleClass: _toggleClass,
		clone: _clone,
		index: _index
	};


	/**
	 * Create sortable instance
	 * @param {HTMLElement}  el
	 * @param {Object}      [options]
	 */
	Sortable.create = function (el, options) {
		return new Sortable(el, options);
	};


	// Export
	Sortable.version = '1.6.0';
	return Sortable;
});

//# sourceMappingURL=dependencies.js.map
