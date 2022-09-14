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

