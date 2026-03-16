# Jac — a language grammar for [highlight.js](https://highlightjs.org/)

[![npm version](https://badgen.net/npm/v/highlightjs-jac)](https://www.npmjs.com/package/highlightjs-jac)
[![license](https://badgen.net/badge/license/BSD-3-Clause/blue)](./LICENSE)

[Jac](https://www.jac-lang.org) is the primary programming language of the [Jaseci](https://github.com/Jaseci-Labs/jaseci) runtime, featuring Python-compatible syntax extended with **Object-Spatial Programming** constructs — walkers, nodes, and edges — for building agentic AI applications.

## Features

Highlights all Jac language constructs including:

- Archetype declarations: `walker`, `node`, `edge`, `obj`, `class`, `enum`
- Ability declarations: `can`, `def`
- Access modifiers: `pub`, `priv`, `protect`, `static`, `override`, `abs`
- Object-Spatial keywords: `visit`, `disengage`, `report`, `spawn`, `here`, `visitor`, `root`
- Property declarations: `has`, `glob`
- Single-line `#` and block `#* ... *#` comments
- f-strings, triple-quoted strings, raw strings, bytes
- Numeric literals with underscores, hex, binary, octal

## Installation

### npm

```bash
npm install highlightjs-jac
```

### CDN

```html
<script src="https://unpkg.com/highlightjs-jac/dist/jac.min.js"></script>
```

## Usage

### Browser (CDN / static site)

Load after `highlight.js` — the grammar self-registers via the CDN build.

```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/styles/github.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.11.1/highlight.min.js"></script>
<script src="https://unpkg.com/highlightjs-jac/dist/jac.min.js"></script>
<script>hljs.highlightAll();</script>
```

Then mark your code blocks with the `jac` language class:

```html
<pre><code class="language-jac">
walker MyWalker {
    can walk with `root entry {
        visit [-->];
    }
}
</code></pre>
```

### Node.js / ESM bundler (Webpack, Rollup, Vite)

```js
import hljs from 'highlight.js/lib/core';
import jac from 'highlightjs-jac';

hljs.registerLanguage('jac', jac);

const result = hljs.highlight('walker Foo { can walk; }', { language: 'jac' });
console.log(result.value);
```

## Example

```jac
import:py from math { sqrt }

node Person {
    has name: str;
    has age: int = 0;
}

edge Knows {
    has since: int = 2020;
}

walker Greeter {
    can greet with Person entry {
        :g: msg = f"Hello, {here.name}!";
        report msg;
    }

    can travel with `root entry {
        visit [-->];
        disengage;
    }
}
```

## Development

This package follows the [highlight.js third-party language contribution guide](https://highlightjs.readthedocs.io/en/latest/language-contribution.html).

To develop locally:

```bash
git clone https://github.com/jaseci-labs/highlightjs-jac
cd highlightjs-jac
npm install
npm run build
```

To run fixture tests with the highlight.js test harness, clone this repository inside a local
highlight.js checkout under `extra/highlightjs-jac` and execute the highlight.js test commands.

## License

[BSD 3-Clause](./LICENSE) © Jaseci Labs

## Links

- [Jac language documentation](https://www.jac-lang.org)
- [Jaseci GitHub](https://github.com/Jaseci-Labs/jaseci)
- [highlight.js](https://highlightjs.org/)
- [highlight.js GitHub](https://github.com/highlightjs/highlight.js)
