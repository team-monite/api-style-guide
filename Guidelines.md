# Monite API Style Guide

These are the guidelines we use at Monite to design and develop our APIs. We aim to apply the same set of rules both
to our public and internal APIs to make it easier for us to achieve consistency and make high-quality APIs from
the get go. However, we can sometimes apply certain rules differently to our internal APIs, if our technology
or security considerations require us to do so.


## Summary

* REST, but not always HATEOAS
* Security is super important
* American English
* Mostly snake_case
* API First, based on OpenAPI


## Requirement level keywords

The requirement level keywords "MUST", "MUST NOT", "SHOULD", "SHOULD NOT", "MAY", and "OPTIONAL" used in this document should be interpreted as described in [RFC 2119](https://tools.ietf.org/html/rfc2119).

* **MUST** and **MUST NOT** mean that it is a critical rule that we must always follow.
* **SHOULD** and **SHOULD NOT** mean that there are exceptions to the rule, but we should be very careful when applying those exceptions. Sometimes we start with these keywords and eventually change them to **MUST** and **MUST NOT**.


## Section 1: General

### MUST follow the API-First principle

When working on a new product on our platform, or expanding an existing product, we always start with an API. In practice, this means the following:

* We build an API before building the corresponding UI.
* We design future APIs extensively (API-Design-First) by including all relevant stakeholders in the discussion and getting as much feedback as possible, before starting implementing the API.
* We strive to make every API externalizable from the very beginning, to make it easier to publish it in the future, if needed.

<details>
  <summary>Why</summary>
  <p>The recent experience from successful tech companies prove that following the API-First principle can significantly improve the quality of API design decisions, hence saving development time and reducing integration friction during the API lifecycle.</p>
</details>

<details>
  <summary>Q&A</summary>
  <p>Q: Is API-First contradicting modern agile development practices and introducing waterfall processes?<br/>
  A: No. API-First, when implemented properly, implies a lot of iterations, evolution of API prototypes, and building common understanding of the API design through collaboration and early feedback from multiple parties.</p>
</details>

<details>
  <summary>See also</summary>
  <ul>
     <li><a href="https://swagger.io/resources/articles/adopting-an-api-first-approach/">Understanding the API-First Approach to Building Products</a></li>
     <li><a href="https://auth0.com/blog/the-business-value-of-api-first-design/">The Business Value of API-First Design</a></li>
     <li><a href="https://blog.stoplight.io/api-first-vs.-api-design-first-a-comprehensive-guide">API-First vs. API Design-First: A Comprehensive Guide</a></li>
     <li><a href="https://www.postman.com/state-of-api/api-first-strategies/#api-first-strategies">2022 State of the API Report from Postman</a></li>
  </ul>
</details>

### MUST follow REST

Our public APIs must follow the [REST architectural style](https://en.wikipedia.org/wiki/Representational_state_transfer). This means implementing [REST principles (constraints)](https://en.wikipedia.org/wiki/Representational_state_transfer#Architectural_constraints): Client–server architecture, Statelessness, Cacheability, Layered system, Code on demand, and Uniform interface.

**Note**: Although REST is extremely widespread, there is no official standard that defines **exactly** every part of the REST architectural style. We want to follow the most common and most logical best practices that already exist around REST, while also staying pragmatic in our choices. This style guide is our attempt to formalize how we see REST and how we implement it with our APIs.

<details>
  <summary>Why</summary>
  <p>REST is the most popular architectural style at the moment (<a href="https://www.postman.com/state-of-api/api-technologies/#api-technologies">2022 State of the API | Postman</a>). This means that this architectural style is very well-known by the majority of developers in the world; there are already a lot of tools, frameworks, libraries and best practices around REST – and therefore it provides the flattest learning curve and best developer experience for most of the developers who will be integrating with Monite.</p>
</details>

<details>
  <summary>Q&A</summary>
  <p>Q: What about other styles (SOAP, GraphQL, gRPC)?<br/>
  A: We will never support SOAP, but will consider introducing more modern styles/frameworks in the future, if this is needed for our API consumers and there is a clear benefit for it.</p>
  <p>Q: What about Level 3 REST and HATEOAS?<br/>
  A: At the moment, we are not planning to support HATEOAS in all parts of our API. However, we aim to introduce HATEOAS where it makes sense.</p>
</details>

<details>
  <summary>See also</summary>
  <ul>
    <li><a href="https://en.wikipedia.org/wiki/Representational_state_transfer">REST on Wikipedia</a></li>
    <li><a href="https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm">REST Dissertation by Roy Fielding</a></li>
    <li><a href="https://www.amazon.com/REST-Practice-Hypermedia-Systems-Architecture/dp/0596805829/">REST in Practice</a></li>
  </ul>
</details>

### MUST follow the YAGNI and Robustness principles

In general, our APIs must expose only what is really necessary for our API clients. This is an important best practice, which allows us to keep the minimal API surface – to document, maintain, monitor, and protect – depending on the real use cases of our API clients.

This practice is usually referred to as the [YAGNI principle](https://martinfowler.com/bliki/Yagni.html) and is often extended by Postel's law ([Robustness principle](https://en.wikipedia.org/wiki/Robustness_principle)):

> Be conservative in what you send, be liberal in what you accept.

In practice, this means that our APIs should not expose resources, parameters, actions, headers, data unless it's really clear why and how they will be used. 

Note: However, we cannot expect that our API clients will follow the same principle. So, me must build our API in a way that is tolerant to accepting something that is not part of the API contract.

<details>
  <summary>See also</summary>
  <ul>
    <li><a href="https://martinfowler.com/bliki/TolerantReader.html">tolerant reader</a></li>
    <li><a href="https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html">OWASP: Attack Surface Analysis</a></li>
    <li><a href="https://datatracker.ietf.org/doc/html/rfc1122">RFC 1122</a></li>
 </ul>
</details>

### SHOULD NOT expose internal implementation specifics to external API consumers

Similar to the [abstraction principle in OOP](https://en.wikipedia.org/wiki/Object-oriented_programming#Data_Abstraction), API abstraction allows API providers to achieve several goals:

- The reason for API consumers to use our APIs lies in the fact that they want to rely on our expertise in a specific field and use our services instead of building themselves. Therefore, our APIs must be easy to understand and integrate for API clients who don't know and should not know all the internal details of how the API platforms works under the hood.
- Exposing internal details can give extra information to potential attackers, since this is not only increasing the [API attack surface](https://cheatsheetseries.owasp.org/cheatsheets/Attack_Surface_Analysis_Cheat_Sheet.html), but also gives invaluable details on how the system is built and works internally.
- Decoupling internal implementation from public APIs is crucial for us to have full control on this implementation and easily evolve it, if necessary, without breaking the public API contract. On the contrary, if API internals are exposed to API clients who start using these APIs for some reason, it would be much more difficult to migrate these clients from the API parts that were not intended for the public use.

_Spectral rule_: [monite-general-exposing-internals](spectral/monite.section1-general.yaml)


## Section 2: Language

### MUST use U.S. English for naming

We use the U.S. English (or American English) for all the parts of our APIs (like API URIs, field names, parameter names, header names, etc.).

To decide whether a certain term belongs to the U.S. English or not, we consult with [Wikipedia](https://en.wikipedia.org/wiki/American_and_British_English_spelling_differences) and most renowned English dictionaries.

<details>
  <summary>Why</summary>
  <p>The U.S. version of English is now being commonly used in modern software products and programming frameworks. On the contrary, British English definitely has a much smaller scope in Tech. As for using languages other than English, we don't want to use them in our API names because this might cause a lot of confusion and other problems with API adoption.</p>
</details>

_Spectral rules_:

* [monite-language-spelling-names](spectral/monite.section2-language.yaml)
* [monite-language-spelling-texts](spectral/monite.section2-language.yaml)


### SHOULD avoid industry jargon and use simple, unambiguous terms

We should strive to create our API that can be consumed by a wide variety of audiences, with no or very limited expertise in our API's business domain.

For this, we should try to use the terms that are easier to follow, easier to understand, and more common in different parts of the world.

| :x: &nbsp; Not recommended | :+1: &nbsp; Recommended |
|----------------------------|-------------------------|
| `card.pan`                 | `card.number`           |

_Spectral rule_: [monite-language-avoid-jargon](spectral/monite.section2-language.yaml)


### SHOULD use inclusive and bias-free language and API design

The language used in our APIs must reflect the modern understanding of inclusive, gender-neutral and bias-free communication. We should constantly educate ourselves on the topics of diversity, equity and inclusion, and make sure our APIs represent these values.

For more information on this, read [Bias-free communications](https://docs.microsoft.com/en-us/style-guide/bias-free-communication) and [Avoid unnecessarily gendered language](https://developers.google.com/style/inclusive-documentation).

| :x: &nbsp; Not recommended           | :+1: &nbsp; Recommended                                                                         | Comment                                                                                                        |
|--------------------------------------|-------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------|
| `blackList`, `whiteList`             | `blockList`, `allowList`                                                                        |                                                                                                                |
| `master/slave`                       | `primary/replica` (in case of identical instances) or `primary/secondary` (for other use cases) |                                                                                                                |
| `master`                             | `master` -> `main` (for example, see [GitHub](https://github.com/github/renaming))              |                                                                                                                |
| `person.gender` = {`male`, `female`} | `shopper.gender` = {`male`, `female`, `unknown`, `unspecified`}                                 | Provide more options, and also critically assess if collecting gender information is even needed in this case. |

_Spectral rule_: [monite-language-non-inclusive](spectral/monite.section2-language.yaml)


### SHOULD NOT use "filler" words in field names

When naming fields or other elements of an API, avoid using unnecessary filler words like "code", "details", or "info". Usually the same name works well without additional filler words, which are redundant in most of the cases.

| :x: &nbsp; Not recommended | :+1: &nbsp; Recommended |
|----------------------------|-------------------------|
| `company_info`             | `company`               |
| `address_details`          | `address`               |
| `country_code`             | `country`               |

_Spectral rule_: [monite-language-filler-words](spectral/monite.section2-language.yaml)


## Section 3: Security

Read first:

* [OWASP API Security Project](https://owasp.org/www-project-api-security/)
* [API Security Checklist](https://github.com/shieldfy/API-Security-Checklist)

### MUST use HTTPs with TLS 1.2+ on all endpoints

HTTP is not secure and its scope must be very limited. For our APIs we must always use encrypted connections, and unencrypted API calls must be rejected.

_Spectral rule_: [monite-security-https-only](spectral/monite.section3-security.yaml)


### MUST require authentication for all endpoints (except for the Auth service)

All API endpoints must be protected behind authentication to avoid [broken authentication](https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication) issues.

The only exception to this requirement is the OAuth 2.0 service, which exposes endpoints like `/auth/token` and `/auth/revoke` that by design might be accessible without any authentication.


### SHOULD NOT use Basic Authentication

Use standard authentication instead (e.g., JWT, OAuth).

_Spectral rule_: [monite-security-no-http-basic](spectral/monite.section3-security.yaml)


### MUST NOT expose any sensitive data in the URL

If you have any sensitive data in a URL, there is a high chance that this data might be intercepted/recorded/modified by a malicious actor. URLs can be exposed in many ways, like browsers, emails, UI and so on. Even if they are not displayed in a web browser and used only for backend-to-backend interaction in an encrypted HTTPs connection, such URLs can still appear in server logs and other places.

For sensitive data like credentials, passwords, security tokens, API keys and similar:

* use the standard Authorization header.

For sensitive data like [PCI](https://www.pcisecuritystandards.org/) or [PII](https://en.wikipedia.org/wiki/Personal_data):

* use request/response body.

_Spectral rule_: [monite-security-no-secrets-in-path-or-query-parameters](spectral/monite.section3-security.yaml)


## Section 4: Data types and formats

### MUST use only allowed data types

To achieve high consistency between different parts of our API and improve its interoperability, we want to limit the variety of data types we use for API elements (request and response fields, parameters and HTTP headers) and use one of the allowed data types.

We achieve this by mostly using data types and formats commonly adopted by other industry specifications, such as [JSON Schema](https://datatracker.ietf.org/doc/html/draft-bhutton-json-schema-validation-00#section-7.3), [OpenAPI](https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.1.0.md#data-types), and various ISO and IETF standards.

| **Type**           | **OpenAPI type** | **OpenAPI format** | **Description**                                                                                                                                   | **Example**                            |
|--------------------|------------------|--------------------|---------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------|
| Boolean            | `boolean`        |                    | One of the two Boolean values (**true** or **false**).                                                                                            | true                                   |
| Object             | `object`         |                    | A complex object consisting of one or several fields.                                                                                             |                                        |
| Array              | `array`          |                    | An array containing values of the same type.                                                                                                      |                                        |
| Integer            | `integer`        | `int32`            | A 4-byte signed integer in the range -2,147,483,648 to 2,147,483,647 (inclusive).                                                                 | 7721071004                             |
| Long integer       | `integer`        | `int64`            | A 8-byte signed integer in the range -9,223,372,036,854,775,808 to 9,223,372,036,854,775,807 (inclusive).                                         | 772107100456824                        |
| Float number       | `number`         | `float`            | A single precision decimal number (**binary32** in [IEEE 754-2008/ISO 60559:2011](https://en.wikipedia.org/wiki/IEEE_754)).                       | 3.1415927                              |
| Double             | `number`         | `double`           | A double precision decimal number (**binary64** in [IEEE 754-2008/ISO 60559:2011](https://en.wikipedia.org/wiki/IEEE_754)).                       | 3.141592653589793                      |
| Decimal            | `string`         | `decimal`          | An arbitrarily precise signed decimal number.                                                                                                     | "3.141592653589793238462643383279"     |
| String             | `string`         |                    | An arbitrary string of characters.                                                                                                                | "Monite rocks!"                        |
| Date & time        | `string`         | `date-time`        | A timestamp following [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) (a subset of [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)). | "2022-07-17T08:26:40.252Z"             | 
| Date               | `string`         | `date`             | A date following [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) (a subset of [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).      | "2022-07-17"                           |
| Time               | `string`         | `time`             | Time value following [RFC 3339](https://datatracker.ietf.org/doc/html/rfc3339) (a subset of [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601)).  | "08:26:40.252Z"                        |
| Email              | `string`         | `email`            | An email address following [RFC 5322](https://tools.ietf.org/html/rfc5322).                                                                       | "someone@example.com"                  | 
| URI                | `string`         | `uri`              | A web URI following [RFC 3986](https://tools.ietf.org/html/rfc3986).                                                                              | "https://www.example.com"              |
| UUID               | `string`         | `uuid`             | A Universally Unique Identifier following [RFC 4122](https://tools.ietf.org/html/rfc4122).                                                        | "279fc665-d04d-4dba-bcad-17c865489dfa" |
| Base64 string      | `string`         | `base64`           | A string that contains Base64-encoded data following [RFC 4648 Section 4](https://www.rfc-editor.org/rfc/rfc4648#section-4).                      | "VGVzdA=="                             |
| Binary             | `string`         | `binary`           | Arbitrary binary data, such as the contents of an image file. Typically used for file uploads and downloads.                                      |                                        |
| Regular expression | `string`         | `regex`            | A regular expression following [ECMA 262](http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf).                             | "^[a-z0-9]+$"                          |

**Note**: If you want to use a data type that is not part of the table above, make a suggestion to this API Style Guide.

_Spectral rules_:

* [monite-data-incorrect-integer-format](spectral/monite.section4-data-types.yaml)
* [monite-data-incorrect-number-format](spectral/monite.section4-data-types.yaml)
* [monite-data-incorrect-string-format](spectral/monite.section4-data-types.yaml)


### SHOULD use standard types for Language, Country and Currency values

For some data types (related to localization and regionality), it's common to use enumerations with limited sets of predefined string values, based on corresponding ISO standards.

To easily find all API elements of such data types and treat these elements in the same way, we should use `string` as their type and corresponding format values from the table below.

| **Type**           | **OpenAPI type** | **OpenAPI format** | **Description**                                                                                             | **Example**                            |
|--------------------|------------------|--------------------|-------------------------------------------------------------------------------------------------------------|----------------------------------------|
| Language           | `string`         | `lang`             | A two-letter language code following [ISO 639-1](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes).    | "en"                                   |
| Country            | `string`         | `country`          | A two-letter country code following [ISO 3166-1 alpha-2](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2). | "DE"                                   |
| Currency           | `string`         | `currency`         | A three-letter currency code following [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217).                  | "EUR"                                  |

:+1: &nbsp; Recommended

``` yaml
country:
  type: string
  format: country
  enum:
  - AF
  - AX
  - AL
  - DZ
  - AS
  - ...
  description: Country of a customer.
```

### SHOULD specify data formats in schema models

For all data types that support providing their `format`, we should specify this format in schema models. This will allow API consumers to better understand what values can be represented by our API elements and therefore build better validation logic on their side.

Once specified in schema models, this format should be propagated to OpenAPI files, technical documentation, server-side libraries, and other artifacts that improve developer experience of API consumers.

:x: &nbsp; Not recommended

``` yaml
website:
  type: string
  description: Customer website.
```

:+1: &nbsp; Recommended

``` yaml
website:
  type: string
  description: Customer website.
  format: uri
```

_Spectral rules_:

* [monite-data-missing-integer-format](spectral/monite.section4-data-types.yaml)
* [monite-data-missing-number-format](spectral/monite.section4-data-types.yaml)


### SHOULD use the common Address object

For unification purposes, we should use the same schema for all objects representing a postal address. This object should contain the following fields, and their presence should be either required or not depending on the context where this address is used in the API.

| **Field Name** | **OpenAPI type** | **OpenAPI format** | **Description**                                                                                 | 
|----------------|------------------|--------------------|-------------------------------------------------------------------------------------------------|
| `postal_code`  | `string`         |                    | Also referred to as a "ZIP code".                                                               | 
| `country`      | `string`         | `country`          | Specified by a country code.                                                                    |
| `state`        | `string`         |                    | Also referred to as a "province" or "county".                                                   |
| `city`         | `string`         |                    |                                                                                                 | 
| `line1`        | `string`         |                    | Combines a street address, house number, apartment number and any other suffixes of the address | 
| `line2`        | `string`         |                    | Usually optional and being used only if the address is very long and doesn't fit into `line1`.  | 


### SHOULD use the common Money object

For unification purposes, we should use the same schema for all objects representing money values. This object should contain the following fields, both are always required:

| **Field Name** | **OpenAPI type** | **OpenAPI format** | **Description**                             | 
|----------------|------------------|--------------------|---------------------------------------------|
| `amount`       | `integer`        | `int64`            | Represented in "minor units"                | 
| `currency`     | `string`         | `currency`         | "Minor units" depend on the currency value. | 

**Note**: Minor units are specified according to [ISO 4217](https://en.wikipedia.org/wiki/ISO_4217#Minor_units_of_currency) and can be found in [this table](https://en.wikipedia.org/wiki/ISO_4217#Active_codes).

**Note**: We strongly recommend against using string, float or double values for representing amounts, because of arising problems around precision and serialization/deserialization from JSON. Storing amount values as long integers is a common best practice, adopted by API payment providers like [Adyen](https://docs.adyen.com/development-resources/currency-codes) and [Stripe](https://stripe.com/docs/currencies).

<details>
  <summary>See also</summary>
  <ul>
     <li>[JSON can safely represent integers only in the [- 2^53+1, 2^53-1] range](https://datatracker.ietf.org/doc/html/rfc7159#section-6)</li>
     <li>[OpenAPI incompatible with I-JSON](https://github.com/OAI/OpenAPI-Specification/issues/1517)</li>
     <li>[Google API: Type and format summary](https://developers.google.com/discovery/v1/type-format)</li>
  </ul>
</details>
