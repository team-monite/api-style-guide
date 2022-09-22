# How to use Spectral

To automate every rule we have in our API style guide, we use [Spectral](https://stoplight.io/open-source/spectral), which is an open-source framework that allows to "lint" [OpenAPI](https://www.openapis.org/) files and check their validity. 

Spectral rules can be used both for ensuring that the OpenAPI file is compliant with the OpenAPI specification, as well as to validate the design and behavior of the API itself.

The current versions we support:

* Spectral: 6.5.0
* OpenAPI: 3.0.2

## Getting started

Spectral in an NPM package, so you need to [install Node.js and NPM](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) first.

Then, you can install Spectral [in different ways](https://meta.stoplight.io/docs/spectral/b8391e051b7d8-installation). For example, do the following:

```bash
npm install -g @stoplight/spectral-cli
```

Additionally, you might want to install a [spellchecker](https://www.npmjs.com/package/spellchecker) package to check spelling of API names and descriptions:

```bash
npm install spellchecker
```

After that, you are ready to validate your OpenAPI file with the rulesets in this repository:

```bash
spectral lint spectral/test-openapi.yaml -r spectral/monite.all.yaml
```

## Constructing your style guide

We publish our API style guide in a modular way, which allows you to choose yourself what rules you want to apply in your case. 

### Choose style guide sections

First of all, you can decide which sections to include or exclude from the checks. For that, customize the `extends` section of the root `monite.all.yaml` file and remove unnecessary sections or mark them with `#`:

```yaml
extends:
  - "spectral:oas"
  - monite.openapi-structure.yaml
  - monite.section1-general.yaml
#  - monite.section2-language.yaml
#  - monite.section3-security.yaml
  - monite.section4-data-types.yaml
```

### Change rule severity level

If you want to change the importance of a specific rule, just add it to the `rules` section of the root `monite.all.yaml` file and set the desired severity level. For example:

```yaml
rules:
  monite-language-spelling-names: warn
```

### Turn of some rules

If you want to completely disable a certain rule, set its severity to `off`.

```yaml
rules:
  monite-language-spelling-names: off
```

### Choose your versioning scheme

We have a few predefined versioning schemes you can choose from. Depending on your needs, you can enable one and disable another.

```yaml
rules:
  monite-versioning-date-format: off
  monite-versioning-semantic: error
```

### Edit a spellcheker's dictionary

You can also add or remove terms from the custom dictionary used by a spell checker. To do this, go to the `/spectral/functions/check-spelling.js` and `/spectral/functions/check-spelling-code.js` files and customize the `exceptions` array:

```
const exceptions = ["asc","bic","iban"];
```

## Help us improve!

Obviously, there are still so many things we can do to cover the entire style guide and make all the rules more efficient. 

If you see any opportunity we can improve this style guide, please don't hesitate to raise an issue and make a suggestion.

Many thanks in advance, and we hope you will find this repo useful for your projects.