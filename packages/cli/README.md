# @citation-js/cli
CLI for Citation.js.

[![NPM version](https://img.shields.io/npm/v/@citation-js/cli.svg)](https://npmjs.org/package/@citation-js/cli)
[![NPM total downloads](https://img.shields.io/npm/dt/@citation-js/cli.svg)](https://npmcharts.com/compare/@citation-js%2Fcli?minimal=true)
![License](https://img.shields.io/npm/l/@citation-js/cli.svg)
![Dependency status](https://david-dm.org/citation-js/citation-js/status.svg?path=packages%2Fcli)
---

## Install

    npm install --global @citation-js/cli

## Usage

    Usage: citation-js [options]

    Options:
      -h, --help                         output usage information
      -V, --version                      output the version number

      -i, --input <path>                 Input file. If all input options are omitted, it uses stdin
      -t, --text <string>                Input text. If all input options are omitted, it uses stdin
      -u, --url <string>                 Deprecated in favor of -t, --text. If all input options are omitted, it uses stdin
      -o, --output <path>                Output file (omit file extension). If this option is omitted, the output is written to stdout
      --pipe                             Pipe and transform from stdin to stdout

      -R, --output-non-real              Output as a text file
      -f, --output-type <option>         Output structure type: string, html, json (default: "json")
      -s, --output-style <option>        Output scheme. A combination of --output-format json and --output-style citation-* is considered invalid. Options: csl (Citation Style Lanugage JSON), bibtex, citation-* (where * is any formatting style) (default: "csl")
      -l, --output-language <option>     Output language. [RFC 5646](https://tools.ietf.org/html/rfc5646) codes (default: "en-US")

      --log-level <level>                Log level: silent, error, warn, info, debug, http (default: "warn")

      --plugins <names>                  Plugin names (@citation-js/plugin-NAME); bibjson, bibtex, csl, doi, ris & wikidata are preloaded (default: [])
      --plugin-config <config>           @plugin.property.path=value;... (default: [])
      --formatter-options <config>       property.path=value;... (default: [])

      --no-input-generate-graph          Do not include the parsing graph in CSL output
      --input-force-type <type>          Force parsing as a certain type
      --input-max-chain-length <number>  Set the maximal number of parsing iterations
      --no-input-strict                  Do not use the strict parsing mode
      --input-target <type>              Stop parsing when a certain type is reached

## Input

Input can be read from `stdin`, passed as a file with `-i, --input <path>` or, for simple IDs, as plain text with `-t, --text` or the deprecated alias `-u, --url`.

    $ echo "Q30000000" > input.txt

    $ cat input.txt | citation-js
    [{"title": "The Synergistic Activity ...", ...}]

    $ citation-js --input input.txt
    [{"title": "The Synergistic Activity ...", ...}]

    $ citation-js --text Q30000000
    [{"title": "The Synergistic Activity ...", ...}]

## Output

The CLI outputs to `stdout` by default, but can write to a file with the `-o, --output` option.

    $ citation-js --text Q30000000
    [{"title": "The Synergistic Activity ...", ...}]

    $ citation-js -t Q30000000 -o output
    $ more output.json
    [{"title": "The Synergistic Activity ...", ...}]

> Note: the file extension is determined automatically, and should therefore be omitted in the `-o` option. To force a file extension, simply omit `-o` and redirect `stdout` to the preferred file.

## Output Format

To format the output, use the `-R`, `-s`, `-f` and `-l` options. These options map to the old output options.

| CLI option              | Default value    | Other values         |
|-------------------------|------------------|----------------------|
| `-R, --output-non-real` | omitted (`real`) | present (`string`, plain text) |
| `-f, --output-type`     | `json`           | `json`, `string`     |
| `-s, --output-style`    | `csl`            | `citation-*`, `bibtex`, `bibtxt`, `data` |
| `-l, --output-language` | `en-US`          | `es-ES`, `fr-FR`, `du-DU`, `nl-NL` |

For example, to format [doi:10.5281/zenodo.1005176](https://doi.org/10.5281/zenodo.1005176) in French in the APA format:

    $ citation-js -t 10.5281/zenodo.1005176 -f string -s citation-apa -l fr-FR

    Willighagen, L., & Willighagen, E. (2017,  octobre 9). Larsgw/Citation.Js V0.3.3. Zenodo. https://doi.org/10.5281/zenodo.1005176
