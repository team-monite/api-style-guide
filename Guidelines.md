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

