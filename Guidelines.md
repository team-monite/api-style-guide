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


## Section 5: URIs

### MUST use the forward slash to indicate hierarchical relationships

The forward-slash (`/`) character is used in the path portion of the URI to indicate a hierarchical relationship between resources, for example:

* `https://api.example.com/v1/invoices`
* `https://api.example.com/v1/invoices/{id}`
* `https://api.example.com/v1/invoices/{id}/parts`
* `https://api.example.com/v1/invoices/{id}/parts/{id}`

_Spectral rule_: [monite-uri-no-backslash](spectral/monite.section5-uri.yaml)


### MUST NOT use the trailing forward slash in URIs

As the last character within a URI's path, a forward slash (`/`) adds no extra value and might cause confusion. So, it's better to drop it completely from the URI.

| :x: &nbsp; Not recommended            | :+1: &nbsp; Recommended              |
|---------------------------------------|--------------------------------------|
| https://api.example.com/v1/resources/ | https://api.example.com/v1/resources |

_Spectral rule_: [OAS: path-keys-no-trailing-slash](https://meta.stoplight.io/docs/spectral/4dec24461f3af-open-api-rules#path-keys-no-trailing-slash)


### MUST NOT have empty segments in a path

Empty path segments could cause a lot of ambiguity, so we must not have them in a path.

| :x: &nbsp; Not recommended                         | :+1: &nbsp; Recommended                                |
|----------------------------------------------------|--------------------------------------------------------|
| https://api.example.com/v1/resources//subresources | https://api.example.com/v1/resources/{id}/subresources |
| https://api.example.com/v1/resources//my_profile   | https://api.example.com/v1/resources/my_profile        |

_Spectral rule_: [monite-uri-no-empty-path-segments](spectral/monite.section5-uri.yaml)


### MUST use lowercase letters in URIs

Always prefer lowercase letters in URI paths, for simplicity and consistency.

| :x: &nbsp; Not recommended           | :+1: &nbsp; Recommended              |
|--------------------------------------|--------------------------------------|
| HTTPS://API.EXAMPLE.COM/v1/resources | https://api.example.com/v1/resources |
| https://api.example.com/V1/Resources | https://api.example.com/v1/resources |

_Spectral rule_: [monite-uri-no-uppercase](spectral/monite.section5-uri.yaml)


### MUST NOT use "api" in a path

We want the "api" suffix to be part of the host name (e.g. https://api.sandbox.monite.com). This means that using "api" in a base path is redundant, and we MUST NOT do this.

| :x: &nbsp; Not recommended                     | :+1: &nbsp; Recommended                    |
|------------------------------------------------|--------------------------------------------|
| https://api.example.com/v1/api/resources       | https://api.example.com/v1/resources       |
| https://api.example.com/v1/payments-api/orders | https://api.example.com/v1/payments/orders |

_Spectral rule_: [monite-uri-no-api-suffix](spectral/monite.section5-uri.yaml)


### MUST NOT add file extensions to URIs

File extensions look bad and do not add any advantage. Removing them decreases the length of URIs as well. No reason to keep them.

Apart from the above reason, if you want to highlight the media type of API using file extension, then you should rely on the media type, as communicated through the `Content-Type` header, to determine how to process the body's content.

| :x: &nbsp; Not recommended                 | :+1: &nbsp; Recommended                |
|--------------------------------------------|----------------------------------------|
| https://api.example.com/v1/me/document.xml | https://api.example.com/v1/me/document |

_Spectral rule_: [monite-uri-no-file-extensions](spectral/monite.section5-uri.yaml)


### MUST use lower snake_case for path segments and query parameters

We restrict path segments and query parameter names to ASCII snake_case strings matching regex `^[a-z][a-z\_0-9]*$`. The first character must be a lowercase letter and subsequent characters can be letters, underscores (`_`), and numbers.

We prefer snake_case over kebab-case because we use snake_case for resource and field names, and resource names can be exposed in segment paths, query parameters and request/response payloads. If we decide to use kebab-case for resources in a URI and keep snake_case in payloads, this will cause a lot of inconsistencies.

| :x: &nbsp; Not recommended                                 | :+1: &nbsp; Recommended                                    |
|------------------------------------------------------------|------------------------------------------------------------|
| https://api.example.com/v1/sales-orders                    | https://api.example.com/v1/sales_orders                    |
| https://api.example.com/v1/salesOrders                     | https://api.example.com/v1/sales_orders                    |
| https://api.example.com/v1/transactions?customer-name=Test | https://api.example.com/v1/transactions?customer_name=Test |

Spectral rules:

* [monite-uri-path-snake-case](spectral/monite.section5-uri.yaml)
* [monite-uri-query-parameters-snake-case](spectral/monite.section5-uri.yaml)


## Section 6: REST & Resources

### MUST build APIs around resources

When designing a REST API, always start with identifying resources – the main notions (objects) around which an API client performs various actions. These actions can be either CRUD (typically represented with POST/GET/PATCH/DELETE HTTP methods), or some other (e.g. resulting in changing a resource's state).

>>>
The key abstraction of information in REST is a resource. Any information that can be named can be a resource: a document or image, a temporal service (e.g. "today's weather in Los Angeles"), a collection of other resources, a non-virtual object (e.g., a person), and so on.

In other words, any concept that might be the target of an author's hypertext reference must fit within the definition of a resource.

A resource is a conceptual mapping to a set of entities, not the entity that corresponds to the mapping at any particular point in time.
>>>
([Roy Fielding's dissertation](https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm#sec_5_2_1_1))

#### Collection and singleton resources

A resource can be either a part of a resource collection (with other resources of the same type in the same collection) or a singleton resource (exactly one instance of the resource always exists within any given parent).

For example, `customers` is a collection of resources accessible via the `/customers` URI, where each individual resource can be accessed by its `id` via `/customers/{id}`.

A common example of a singleton resource can be a `config` object that always exists for a given project and is accessible via `/projects/{id}/config`.

**Note**: Singleton resources must not have an ID field, because there is always only one singleton resource for any parent resource.

**Note**: Singleton resources must not define the CREATE or DELETE standard methods. The singleton is implicitly created or deleted when its parent is created or deleted.

**Note**: Singleton resources should define the GET and PATCH methods.

**Note**: Singleton resource names are always singular.

#### Resources and sub-resources

A resource may contain sub-resources (either a collection or singleton).

For example, a `customer` resource can have an `accounts` collection of sub-resources, which is accessible via `/customers/{customer_id}/accounts`.

This way, a single `account` sub-resource can be accessed via `/customers/{customer_id}/accounts/{account_id}`.


### MUST provide access to resources via URI path segments

To get access to a collection of resources or a singleton resource, an API client must navigate using path segments of API URIs.

For example, this is how one can retrieve a collection of invoice resources:

* `https://api.example.com/v1/invoices`

This is how one can retrieve a collection of subresources:

* `https://api.example.com/v1/resources/{id}/subresources`

### MUST use nouns to represent resources

REST URIs should refer to a resource that is a thing (noun) instead of referring to an action (verb). Actions are also possible, but only around a specific resource.

| :x: &nbsp; Not recommended          | :+1: &nbsp; Recommended                 |
|-------------------------------------|-----------------------------------------|
| https://api.example.com/v1/navigate | https://api.example.com/v1/directions   |
| https://api.example.com/v1/similar  | https://api.example.com/v1/similarities |

### MAY use verbs for actions on a resource (but avoid when possible)

In some cases, we can use verbs in a URI to represent actions performed on a resource. This is mostly for actions that cannot be represented with standard HTTP methods (POST, GET, PATCH, PUT, DELETE) and, for example, result in an asynchronous change of a resource state.

| :x: &nbsp; Not recommended                  | :+1: &nbsp; Recommended                            |
|---------------------------------------------|----------------------------------------------------|
| POST https://api.example.com/v1/archiveUser | POST https://api.example.com/v1/users/{id}/archive |

### SHOULD NOT use CRUD function names in URIs

Do not use URIs to indicate a CRUD (Create, Read, Update, Delete) function. URIs should only be used to uniquely identify the resources and not any action upon them.

Use the corresponding HTTP methods instead.

| :x: &nbsp; Not recommended                  | :+1: &nbsp; Recommended                      |
|---------------------------------------------|----------------------------------------------|
| POST https://api.example.com/v1/createUser  | POST https://api.example.com/v1/users        |
| POST https://api.example.com/v1/getUser     | GET https://api.example.com/v1/users/{id}    |
| POST https://api.example.com/v1/updateUser  | PATCH https://api.example.com/v1/users/{id}  |
| POST https://api.example.com/v1/replaceUser | PUT https://api.example.com/v1/users/{id}    |
| POST https://api.example.com/v1/deleterUser | DELETE https://api.example.com/v1/users/{id} |

_Spectral rule_: [monite-rest-no-crud-in-uri-names](spectral/monite.section6-rest.yaml)


### MUST pluralize resource names, unless it's a singleton resource

When naming a collection of resources, use the plural version of a noun. An exception is a singleton resource, which is always unique and only one in the entire API context.

| :+1: &nbsp; Recommended                     | Explanation                                                                                                                                                                                                                           |
|---------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| https://api.example.com/v1/invoices         | There might be multiple invoices to be processed by this API.                                                                                                                                                                         |
| https://api.example.com/v1/invoices/{id}    | A single invoice can be retrieved from a collection by its ID.                                                                                                                                                                        |
| https://api.example.com/v1/users            | There might be multiple users to be processed by this API.                                                                                                                                                                            |
| https://api.example.com/v1/me               | Here, `me` is a singleton resource pointing to the API user.                                                                                                                                                                          |
| https://api.example.com/v1/company          | If there is only one company that can be accessed by an API user, it is also a singleton resource, because an API user cannot access any other company.                                                                               |
| https://api.example.com/v1/company/settings | Although `settings` is plural, it's a singleton resource because there can be only one set of settings for a company (unless there is an API design that allows for multiple sets of different settings to be provided for a company. |

### SHOULD limit the number of subresource levels

We don't want to have too many nested levels for API URLs, because it leads to unnecessary complexity in understanding the API, as well as might result it too long URLs not fitting the browser limitations.

_Spectral rule_: [monite-rest-limited-resource-levels](spectral/monite.section6-rest.yaml)


### MUST expose id, created_at and updated_at fields in collection resources

For unification and consistency, every collection resource should have these fields:

* `id`: a unique ID that allows API consumers to refer to this resource instance.
* `created_at`: a date-time value indicating when this resource instance was created.
* `updated_at`: a date-time value indicating when this resource instance was modified last time.

**Note**: These fields MUST NOT be exposed in singleton resources. The `id` field is not necessary because there is always only one instance for a singleton resource per its parent resource; while `created_at` and `updated_at` are always the same as its parent resource.

### MUST follow these rules for resource identifies (resource IDs)

#### Resource IDs MUST be URL-friendly

Since IDs should be used in API URIs (to refer to a specific resource instance), they must be URL-friendly.

#### Resource IDs MUST be globally unique

A resource ID value should uniquely identify a specific resource instance within the scope of the entire API platform. No resources should have the same value as their ID, as it can cause a lot of confusion.

#### Resource IDs MUST be generated by an API provider

To make sure all resource IDs meet our requirements, we must always generate them ourselves and assign them to each specific resource instance upon resource creation.

#### Resource IDs MUST NOT be submitted by an API consumer

Because all resource IDs must be generated by us, we don't allow API consumers to generate such IDs (even if they use exactly the same ID format as we do).

However, we understand that our API consumers might also need to store some IDs assigned to resource instances by their platform. In this case, we allow API consumers to store their own IDs in a `partner_internal_id` field.

#### Resource IDs MUST be opaque strings

API consumers must never build any business logic based on the ID format and must always treat resource IDs as random strings. To fulfill this requirement, resource IDs should look like opaque strings, even if there is some logic and format behind the ID generation algorithm.

#### Resource IDs SHOULD NOT have variable length

Once we settle on the format of resource IDs, we should try to do our best to make sure these IDs always have the same length. The reason is that API consumers set a fixed column length in their code and databases to process and store such IDs, and changing the length (especially increasing the length) can have a drastic impact on their integration with our API platform.

If changing the length of resource IDs is inevitable, treat it as a breaking change and prepare your API consumers in advance, with additional communication and fuzzy testing.

#### Resource IDs MUST NOT be sequential numbers

Using sequential numbers for resource IDs is considered an awful development practice. The main reasons are:

* In this case, resource IDs are easily guessable. This makes it much easier for a malicious user to attempt to access resources that they shouldn't have to.
* The last generated resource ID gives any API client information of how many resources of a certain type exist on an API platform. This might expose some critical business information (like the total number of API clients, the total number of payment transactions, etc.), which in a normal situation should never be available for people outside an organization owning this API platform.
* Quite often these IDs directly correspond to the auto-incremented database indexes from a data table storing information about these resources. This gives even more information to a potential attacker in case they can get access to the internal systems.

#### Resource IDs MAY use either UUID or Snowflake formats

One of the easiest ways to get an opaque string that is guaranteed to be unique and hence can be used as resource IDs is to generate UUID values.

An alternative (and more powerful) option is to generate so-called [Snowflake IDs](https://en.wikipedia.org/wiki/Snowflake_ID) that follow some generation format, which is unknown to API consumers. Since API consumers don't know the exact format of such IDs, they still treat them as opaque and unique. However, this makes it possible for API producers to de-construct such IDs and decode some values from it. For example, in the case of distributed systems, such IDs can be used for smart routing and data storage decisions.

#### Resource IDs MAY use prefixes indicating resource types

To make it faster to determine which resource type a specific resource ID is referring to, some API producers add predefined prefixes to each resource ID value. These prefixes can be 2, 3, or 4 characters long and uniquely correspond to a specific resource type on an API platform.

For example, all resource IDs for a `payment` resource can follow either the `PA_*` or `PAY_*` or `PYMT_*` format.

Using such IDs makes it much quicker to troubleshoot different cases and identify a situation when some IDs are being used in the wrong context.

#### Resource IDs MUST be stable and never change their value for a given resource instance

Each resource ID uniquely identifies a specific resource instance. This means that once a resource ID has been generated and assigned to a specific resource instance, it becomes an inherent part of that resource.

#### Resource IDs MUST follow the "resource_id" format when being referred in payloads of other resources

For example, if an API has the following `product` resource:

```json
{
  "id" : "e675f59e-ddd1-4835-8bc2-edd76c54fad4",
  "name" : "Tomato"
}
```

The invoice resource should link to it by the `product_id` field:

```json
{
  "line_items" : [
    {
      "product_id" : "e675f59e-ddd1-4835-8bc2-edd76c54fad4",
      "number" : 1200
    }
  ]
}
```
