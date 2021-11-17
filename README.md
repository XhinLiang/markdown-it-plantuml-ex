# markdown-it-plantuml-ex

[![npm version](https://img.shields.io/npm/v/markdown-it-plantuml-ex.svg)](https://www.npmjs.com/package/markdown-it-plantuml-ex)
[![CircleCI build](https://img.shields.io/circleci/project/github/xhinliang/markdown-it-plantuml-ex.svg)](https://circleci.com/gh/xhinliang/markdown-it-plantuml/tree/master)

> Plugin for creating block-level uml diagrams for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser using offline `plantuml.jar`.

Using this plugin and you can create uml diagrams inside your markdown files. 

Differ with [markdown-it-plantuml](https://github.com/gmunguia/markdown-it-plantuml), markdown-it-plantuml-ex is using offline `plantuml.jar` to redner your diagrams, means two things:
1. You can safety use it in your secret project or some internal docs in your employer, coz markdown-it-plantuml-ex will not upload any of your data to any server, it's just offline;
2. You can enjoy a better render performance.

# UML example:

The diagrams you can use in your markdown file just like codes below.


    ```plantuml
    @startuml
    Bob -> Alice : hello
    @enduml
    ```

You can visit [plantuml website](https://plantuml.com) for more details.

## Installation

Just install via npm or any other package manager of Node.

```bash
$ npm i markdown-it-plantuml-ex --save
```

## Basic usage

As we all known, markdown-it-plantuml-ex is a plugin of markdown-it, so you should setup markdown-it before you use markdown-it-plantuml-ex.

```js
const md = require('markdown-it')()
           .use(require('markdown-it-plantuml-ex'));
```

See [markdown-it repository](https://github.com/markdown-it/markdown-it) for more details.

**NOTICE: You should install Java by yourself before you start rendering.**

## Advanced usage

```js
const md = require('markdown-it')()
           .use(require('markdown-it-plantuml-ex'), options);
```

Options:
  - __openMarker__ - optional, defaults to "```plantuml". String to use as oppening delimiter.
  - __closeMarker__ - optional, defaults to "```" . String to use as closing delimiter.
  - __diagramName__ - optional, defaults to `uml`.
  - __render__ - optional, defaults to markdown-it image renderer. Renderer function for opening/closing tokens.

## License

[MIT](https://github.com/xhinliang/markdown-it-plantuml-ex/blob/master/LICENSE)
