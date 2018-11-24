To add plugins to Citation.js, use the following method:

```js
const {plugins} = require('@citation-js/core')

plugins.add(ref, {
  input: {
    format: {...},
    ...
  },
  output: {
    format () { ... },
    ...
  },
  ...
})
```

Here `ref` is the plugin name, and the second argument is an object with collections of specific plugins. For example, this plugin registers an input format aptly named `format`, and an output format named `format` as well.

## Supported plugins

Currently, Citation.js supports the following types of plugins:

  * `input`: {@tutorial input_plugins} add to or change the parsing process
  * `output`: {@tutorial output_plugins} add or change output formats
  * `dict`: {@tutorial output_plugins_dict} extend CSL with different locales and templates

## Config

It is also possible to set configuration options, like this:

```js
plugins.add(ref, {
  input: {
    someApiFormat: {...}
  },
  config: {
    apiVersion: 'v2'
  }
})
```

These can then be retrieved like below by the user to configure the plugin.

```js
let config = plugins.config.get(ref)

config.apiVersion = 'v1'
```

For example, this theoretical plugin allows the user to change the API version used when fetching data. Of course, the plugin module could also expose configuration options in the exports, but the module might not always be accessible by the user.
