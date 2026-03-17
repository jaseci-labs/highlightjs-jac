/*
Language: Jac
Description: Jac is the primary programming language of the Jaseci runtime, blending
  Python-compatible syntax with Object-Spatial Programming constructs such as walkers,
  nodes, and edges for building agentic AI applications.
Website: https://www.jac-lang.org
Category: scripting
*/

export default function(hljs) {
  const regex = hljs.regex;

  // Identifier pattern (same Unicode rules as Python)
  const IDENT_RE = /[\p{XID_Start}_]\p{XID_Continue}*/u;

  // ── Keywords ──────────────────────────────────────────────────────────────

  // Archetype / declaration keywords
  const ARCHETYPE_KEYWORDS = [
    'class',
    'edge',
    'enum',
    'impl',
    'node',
    'obj',
    'test',
    'walker'
  ];

  // Ability / function keywords
  const ABILITY_KEYWORDS = [
    'can',
    'def'
  ];

  // Access modifiers
  const ACCESS_KEYWORDS = [
    'abs',
    'abstract',
    'override',
    'priv',
    'protect',
    'pub',
    'static'
  ];

  // Control-flow keywords
  const CONTROL_KEYWORDS = [
    'as',
    'assert',
    'break',
    'case',
    'continue',
    'default',
    'del',
    'elif',
    'else',
    'except',
    'finally',
    'for',
    'if',
    'match',
    'pass',
    'raise',
    'return',
    'switch',
    'try',
    'while',
    'with',
    'yield'
  ];

  // Import keywords
  const IMPORT_KEYWORDS = [
    'from',
    'import',
    'include'
  ];

  // Async keywords
  const ASYNC_KEYWORDS = [
    'async',
    'await'
  ];

  // Jac Object-Spatial Programming keywords
  const OSP_KEYWORDS = [
    'disengage',
    'entry',
    'exit',
    'ignore',
    'report',
    'revisit',
    'skip',
    'spawn',
    'visit'
  ];

  // Declarative / misc keywords
  const MISC_KEYWORDS = [
    'by',
    'check',
    'glob',
    'global',
    'has',
    'lambda',
    'let',
    'nonlocal',
    'sem',
    'to'
  ];

  // Word-level operator keywords
  const OPERATOR_KEYWORDS = [
    'and',
    'in',
    'is',
    'not',
    'or'
  ];

  const RESERVED_WORDS = [
    ...ARCHETYPE_KEYWORDS,
    ...ABILITY_KEYWORDS,
    ...ACCESS_KEYWORDS,
    ...CONTROL_KEYWORDS,
    ...IMPORT_KEYWORDS,
    ...ASYNC_KEYWORDS,
    ...OSP_KEYWORDS,
    ...MISC_KEYWORDS,
    ...OPERATOR_KEYWORDS
  ];

  // Built-in names and special references
  const BUILT_INS = [
    '__import__',
    'abs',
    'aiter',
    'all',
    'anext',
    'any',
    'ascii',
    'basestring',
    'bin',
    'bool',
    'breakpoint',
    'bytearray',
    'bytes',
    'callable',
    'chr',
    'classmethod',
    'cmp',
    'compile',
    'complex',
    'copyright',
    'credits',
    'delattr',
    'dict',
    'dir',
    'divmod',
    'enumerate',
    'eval',
    'exec',
    'execfile',
    'exit',
    'file',
    'filter',
    'float',
    'format',
    'frozenset',
    'getattr',
    'globals',
    'hasattr',
    'hash',
    'help',
    'hex',
    'id',
    'input',
    'int',
    'intern',
    'isinstance',
    'issubclass',
    'iter',
    'len',
    'license',
    'list',
    'locals',
    'long',
    'map',
    'max',
    'memoryview',
    'min',
    'next',
    'object',
    'oct',
    'open',
    'ord',
    'pow',
    'print',
    'property',
    'quit',
    'range',
    'raw_input',
    'reduce',
    'reload',
    'repr',
    'reversed',
    'round',
    'set',
    'setattr',
    'slice',
    'sorted',
    'str',
    'sum',
    'super',
    'tuple',
    'type',
    'unicode',
    'vars',
    'xrange',
    'zip'
  ];

  const LITERALS = [
    'False',
    'None',
    'True'
  ];

  // Jac-specific language-level variable references
  const LANGUAGE_VARS = [
    'here',
    'init',
    'postinit',
    'root',
    'self',
    'super',
    'visitor'
  ];

  const KEYWORDS = {
    $pattern: /[A-Za-z_]\w*/,
    keyword: RESERVED_WORDS,
    built_in: BUILT_INS,
    literal: LITERALS,
    operator: OPERATOR_KEYWORDS
  };

  // ── Strings ───────────────────────────────────────────────────────────────

  const SUBST = {
    className: 'subst',
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    illegal: /#/
  };

  const LITERAL_BRACKET = {
    begin: /\{\{/,
    relevance: 0
  };

  const STRING = {
    className: 'string',
    contains: [ hljs.BACKSLASH_ESCAPE ],
    variants: [
      // Triple-quoted non-f strings (highest relevance)
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,
        end: /'''/,
        contains: [ hljs.BACKSLASH_ESCAPE ],
        relevance: 10
      },
      {
        begin: /([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,
        end: /"""/,
        contains: [ hljs.BACKSLASH_ESCAPE ],
        relevance: 10
      },
      // Triple-quoted f-strings
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'''/,
        end: /'''/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"""/,
        end: /"""/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      // Single-quoted raw/unicode
      {
        begin: /([uU]|[rR])'/,
        end: /'/,
        relevance: 10
      },
      {
        begin: /([uU]|[rR])"/,
        end: /"/,
        relevance: 10
      },
      // Bytes
      {
        begin: /([bB]|[bB][rR]|[rR][bB])'/,
        end: /'/
      },
      {
        begin: /([bB]|[bB][rR]|[rR][bB])"/,
        end: /"/
      },
      // f-strings
      {
        begin: /([fF][rR]|[rR][fF]|[fF])'/,
        end: /'/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      {
        begin: /([fF][rR]|[rR][fF]|[fF])"/,
        end: /"/,
        contains: [
          hljs.BACKSLASH_ESCAPE,
          LITERAL_BRACKET,
          SUBST
        ]
      },
      hljs.APOS_STRING_MODE,
      hljs.QUOTE_STRING_MODE
    ]
  };

  // ── Numbers ───────────────────────────────────────────────────────────────
  // https://docs.python.org/3.9/reference/lexical_analysis.html#numeric-literals
  const digitpart = '[0-9](_?[0-9])*';
  const pointfloat = `(\\b(${digitpart}))?\\.(${digitpart})|\\b(${digitpart})\\.`;
  const lookahead = `\\b|${RESERVED_WORDS.join('|')}`;
  const NUMBER = {
    className: 'number',
    relevance: 0,
    variants: [
      { begin: `(\\b(${digitpart})|(${pointfloat}))[eE][+-]?(${digitpart})(?=${lookahead})` },
      { begin: `(${pointfloat})` },
      { begin: `\\b([1-9](_?[0-9])*|0+(_?0)*)(?=${lookahead})` },
      { begin: `\\b0[bB](_?[01])+(?=${lookahead})` },
      { begin: `\\b0[oO](_?[0-7])+(?=${lookahead})` },
      { begin: `\\b0[xX](_?[0-9a-fA-F])+(?=${lookahead})` }
    ]
  };

  // ── Comments ──────────────────────────────────────────────────────────────

  // Jac block comment: #* ... *#
  const BLOCK_COMMENT = hljs.COMMENT(
    '#\\*',
    '\\*#',
    { relevance: 10 }
  );

  // Jac/Python line comment: # ...
  const LINE_COMMENT = hljs.HASH_COMMENT_MODE;

  // Jac/JS line comment: // ...
  const JS_LINE_COMMENT = hljs.C_LINE_COMMENT_MODE;

  // Keyword escape: <>identifier
  const KEYWORD_ESCAPE = {
    match: [
      /<>/,
      IDENT_RE
    ],
    scope: {
      1: 'operator',
      2: 'title'
    }
  };

  // JSX-like tags used in Jac templates.
  const JSX_EXPR = {
    begin: /\{/,
    end: /\}/,
    keywords: KEYWORDS,
    contains: [
      STRING,
      NUMBER,
      BLOCK_COMMENT,
      LINE_COMMENT,
      JS_LINE_COMMENT
    ]
  };

  const JSX_TAG_OPEN = {
    match: /<\/?[A-Za-z][A-Za-z0-9_$-]*/,
    className: 'tag'
  };

  const JSX_FRAGMENT = {
    match: /<\/?>/,
    className: 'tag'
  };

  const JSX_TAG_CLOSE = {
    match: /\/?>/,
    className: 'tag'
  };

  const JSX_ATTR = {
    match: /\b[_$A-Za-z][-$\w]*(?=\s*=)/,
    className: 'attr'
  };

  const JSX_ATTR_STRING = {
    className: 'string',
    variants: [
      { begin: /"/, end: /"/ },
      { begin: /'/, end: /'/ }
    ]
  };

  // ── Params ────────────────────────────────────────────────────────────────

  const PARAMS = {
    className: 'params',
    variants: [
      {
        className: '',
        begin: /\(\s*\)/,
        skip: true
      },
      {
        begin: /\(/,
        end: /\)/,
        excludeBegin: true,
        excludeEnd: true,
        keywords: KEYWORDS,
        contains: [
          'self',
          NUMBER,
          STRING,
          BLOCK_COMMENT,
          LINE_COMMENT,
          JS_LINE_COMMENT
        ]
      }
    ]
  };

  SUBST.contains = [ STRING, NUMBER ];

  // ── Main definition ───────────────────────────────────────────────────────

  return {
    name: 'Jac',
    aliases: [ 'jac' ],
    unicodeRegex: true,
    keywords: KEYWORDS,
    illegal: /=>/,
    contains: [
      // Comments
      BLOCK_COMMENT,
      LINE_COMMENT,
      JS_LINE_COMMENT,

      // Numbers before keywords to handle numeric literals correctly
      NUMBER,

      // Jac Object-Spatial language variables (here, visitor, root)
      {
        scope: 'variable.language',
        match: regex.either(...LANGUAGE_VARS.map(v => `\\b${v}\\b`))
      },

      // Strings
      STRING,

      // Escape reserved words in identifiers: <>if
      KEYWORD_ESCAPE,

      // JSX-style tag syntax
      JSX_FRAGMENT,
      JSX_TAG_OPEN,
      JSX_ATTR,
      JSX_ATTR_STRING,
      JSX_EXPR,
      JSX_TAG_CLOSE,

      // Archetype declarations: walker Foo { ... }
      {
        match: [
          /\b(?:walker|node|edge|obj|class|enum|test)\b/,
          /\s+/,
          IDENT_RE
        ],
        scope: {
          1: 'keyword',
          3: 'title.class'
        }
      },

      // Ability declarations: can foo(...) { ... }  /  def foo(...) { ... }
      // Also handles: static can foo, override def foo
      {
        match: [
          /\b(?:(?:static|override|abs)\s+)?(?:can|def)\b/,
          /\s+/,
          IDENT_RE
        ],
        scope: {
          1: 'keyword',
          3: 'title.function'
        },
        contains: [ PARAMS ]
      },

      // Decorators: @decorator_name
      {
        className: 'meta',
        begin: /^[\t ]*@/,
        end: /(?=#)|$/,
        contains: [ NUMBER, PARAMS, STRING ]
      }
    ]
  };
}
