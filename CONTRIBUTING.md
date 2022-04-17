# Contributing

First of all, thanks for considering contributing. Contributions are very welcome! Below is some helpful information.

## Reporting issues

You can report issues in [the Issue Tracker](https://github.com/citation-js/citation-js/issues). When filing an issue, be sure to provide some basic information for people to work with:

  1. What version of Citation.js are you using?
  2. How are you running Citation.js (npm package, browser bundle, self-rolled bundle, webpack)?
  3. Where are you running Citation.js?
    * The OS usually will not matter much, but the browser really does.
  4. What is your input data and code?
  5. What did you expect to happen, and what actually happened?

## Contributing code

For general tips on how to work with Git and making pull requests, check out [this guide on how to make pull requests in GitHub](https://git-scm.com/book/en/v2/GitHub-Contributing-to-a-Project).

### Installing

To install for development, it's probably best to clone this repo:

    git clone https://github.com/citation-js/citation-js.git

Then install dependencies:

    npm install
    lerna bootstrap

### Editing

Code for the different formats are in the `src/` directories of the various packages in `packages/`. We use the StandardJS code style. You can check your code with

    npm run lint

and autofix some formatting with

    npm run lint -- --fix

To install new packages, please use `lerna add` instead of `npm install`:

    lerna add --scope '@citation-js/plugin-...' package-name

### Commits

Commits follow the [Angular commits convention](https://github.com/angular/angular/blob/master/CONTRIBUTING.md#commit). For examples, take a look in [the recent commits](https://github.com/citation-js/citation-js/commits).

### Testing

New test go in the `test/` directories of the various packages in `packages/`. To run tests in the entire package, run

    npm test

If you want to test single packages, run

    npm test -- --scope '@citation-js/plugin-...'

If you want to run single test cases, run

    npm test -- --scope '@citation-js/plugin-...' -- --grep 'pattern'

`@citation-js/cli` depends on all the plugins, and the plugins all depend on `@citation-js/core`. To test changes in `@citation-js` dependencies on different packages, first run

    npm run babel

Examples of this are when you made changes to `@citation-js/core`s `util.fetchFile` function and you want to see if the DOI plugin still works, or if you added shortDOIs to the DOI plugin and want to check if the CLI still recognizes it properly.

The tests for Wikidata and DOIs use cached data, to save time and take it easier on their APIs. If you want to bypass the caches for Wikidata and DOIs, run

    npm run test:live

To update the caches, run

    npm run test:update

If you need new Wikidata or DOI data in the cache, check out the scripts in `scripts/`. Note that for the Wikidata cache, you would also need to add sub-items such as authors and journals, as the code has to fetch their labels separately.

Additionally, coverage can be checked with

    npm run coverage

### Release

#### `citation-js/citation-js`

```sh
lerna version
lerna publish from-packages
```

#### `larsgw/citation.js`

```sh
./tools/update-components.sh
git commit -am "[package] Update deps"
npm version
npm publish
git push
```

#### `citation-js/bundle-tool`

```sh
./update-components.sh
git commit -am "..."
git push
```
