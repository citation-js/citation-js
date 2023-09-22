import { plugins, util } from '@citation-js/core'

plugins.add('@url', {
  input: {
    '@else/url': {
      parse: util.fetchFile,
      parseAsync: util.fetchFileAsync
    }
  }
})
