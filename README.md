## Guidelines

To access the complete Monite API Style Guide, please see [Guidelines](Guidelines.md).


## Purpose

As an API-First company, we put extremely high expectations on the quality of our APIs. That's why we need to have solid guidance on how we should build our APIs, how they should behave, and why we are making certain choices around our APIs.

Although there are already a lot of good APIs and knowledge around building APIs in the industry, there is no single standard way of building Web APIs. This means that every company needs to make their own choices on what makes their API good, and we are not an exception to that.

Our API Style Guide is a representation of our choices, and we want to keep it public to share our knowledge with our customers and anyone else who is interested in building modern Web APIs.


## Scope

This style guide should be applied by our development teams to both **public**/**partner** and **internal** APIs. The main reasons for that:

* The fewer differences we have between our internal and public API layers, the easier it will be for us to develop our platform.
* Any API, even if it's internal at the moment, might be tasked to become public in the future. With this mindset we should build all our APIs externalizable from the beginning, so having a shared style guide will help us avoid unnecessary changes in the future.


## Target audiences

Most of these guidelines are focused on technical aspects of API design and implementation, and therefore are points of interest mostly for software developers. 

However, there are certain aspects of these guidelines that are addressing more common issues and should be valuable for a broader group, including product managers, technical writers, technical support, developer experience engineers, and people in many other roles.


## Spectral

We believe that nobody can remember all the rules in the API style, so it's key to be able to validate automatically as many rules as possible.

For that purpose we are using [Spectral](https://stoplight.io/open-source/spectral/) that can lint API contracts in the [OpenAPI](https://www.openapis.org/) format.

To start with Spectral, you can install it as an npm package or use other installation methods:

```bash
npm install -g @stoplight/spectral-cli
```

Additionally, you might want to install a [spellchecker](https://www.npmjs.com/package/spellchecker) package to check spelling of API names and descriptions:

```bash
npm install spellchecker
```

After that, you are ready to validate your OpenAPI file with the rulesets in this repository:

``` bash
spectral lint spectral/test-openapi.yaml -r spectral/monite.all.yaml
```


## Contributing

We encourage everybody to contribute to this API Style Guide. Only together we can achieve high quality and clarity of all the guidelines, as well as keep them up-to-date and useful for the API community.

It doesn't matter whether your official job title is an engineer or not - if you have some feedback and want to make this style guide better, please share with us.

You can contribute in the following ways:
* Create an issue (if you spotted a problem but not sure how to solve it best).
* Create a merge request (if you have a good idea on how we should change our style guide).
* Star, fork, and share the link to this repository with your network.


## See also

There are a lot of other resources created and shared by some companies and API enthusiasts. In some of our work, we were relying on these resources; while others are listed here just to help you build the bigger picture.

The list below is not the most comprehensive list of other API style guides, but can give you good insights on where else you can look for inspiration.

* [Zalando RESTful API and Event Guidelines](https://opensource.zalando.com/restful-api-guidelines/)
* [Microsoft REST API Guidelines](https://github.com/microsoft/api-guidelines)
* [adidas API Guidelines](https://adidas.gitbook.io/api-guidelines)
* [Google API Improvement Proposals](https://google.aip.dev/)
* [API style book](http://apistylebook.com/design/guidelines/)
* [SAP API Style Guide](https://help.sap.com/viewer/53e39c8b7c924c28a2575be50bc09786/PUBLIC/en-US/01e4b09a0bb24235b3618deb0618e1af.html)
* [API Style Guides | Guidelines and Best Practices](https://stoplight.io/api-style-guides-guidelines-and-best-practices/)
* [OpenAPI Community Style Guide](https://github.com/openapi-contrib/style-guides)
* [Spectral Spelling and Grammar Ruleset](https://github.com/api-stuff/spectral-spelling-grammar)
* [Postman Open Technologies - Governance Rules](https://www.postman.com/postman/workspace/postman-open-technologies-governance-rules/overview)
* [API Guidelines in the Wild](https://dret.github.io/guidelines/)

