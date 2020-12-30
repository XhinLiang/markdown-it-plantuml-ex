# markdown-it-plantuml-ex

[![npm version](https://img.shields.io/npm/v/markdown-it-plantuml-ex.svg)](https://www.npmjs.com/package/markdown-it-plantuml-ex)
[![CircleCI build](https://img.shields.io/circleci/project/github/xhinliang/markdown-it-plantuml-ex.svg)](https://circleci.com/gh/xhinliang/markdown-it-plantuml/tree/master)

> Plugin for creating block-level uml diagrams for [markdown-it](https://github.com/markdown-it/markdown-it) markdown parser using offline `plantuml.jar`.

With this plugin you can create uml diagrams inside your markdown files.

# UML example:


    ```plantuml
    @startuml
    Bob -> Alice : hello
    @enduml
    ```

See [plantuml website](https://plantuml.com) for more details.

## Installation

node.js, browser:

```bash
$ npm i markdown-it-plantuml-ex --save
```

## Basic usage

```js
const md = require('markdown-it')()
           .use(require('markdown-it-plantuml-ex'));
```

See [markdown-it repository](https://github.com/markdown-it/markdown-it) for more details.

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
