---
title: "Introducing Scaphold Logic"
date: 2016-01-11 00:01:37 -0700
categories: GraphQL, Logic, App
description: "Today, we're happy to announce the release of Scaphold Logic. We built logic to let you easily implement and connect your own business logic to your Scaphold APIs. Getting started is easy!"
photo: "https://assets.scaphold.io/community/blog/custom-logic/mailchimp-webtask.png"
headshot: "https://assets.scaphold.io/images/michael.jpg"
author: "Michael Paris"
---

# Introducing Scaphold Logic

Today, we're happy to announce the release of Scaphold Logic. We built logic to let
you easily implement and connect your own business logic to your Scaphold APIs.

We had a few key guidelines in mind while we were building Logic.

1) Choose your tooling. You can use whatever tools/stack work best for your business.
2) Transparency. That means robust logs so you can quickly debug errors.
3) Complete coverage. You can bind logic to any and all events in your API. That means both data that we manage as well as your integration events.

We think we nailed all three, but you are the real judges! Here's how it works.

Let's start with a common but critical use case. Every business needs email. It helps you better
engage your customers, lock down leads, and improve conversions. There are tons of tools around the
web that can help you better engage your customers via email. One of our personal favorites at
Scaphold is [Mailchimp](https://mailchimp.com/).

How then might we keep our user information hosted on Scaphold in sync with our business critical
mailing lists? The first option is to equip each of clients (iOS, Android, Web, etc.) with the
smarts to ping Mailchimp each time a user gets created in the app. That means we have to recreate
the same auth flow on each of our client platforms. That doesn't sound very scalable and sounds
like even less fun.

### Enter Scaphold Logic

This is a perfect use case for Logic! Getting started is a simple 3 step process.

1) Write a simple microservice using your favorite language.

2) Deploy your microservice using your favorite hosting provider. We recommend [AWS Lambda](https://aws.amazon.com/lambda/),
[Azure Functions](https://azure.microsoft.com/en-us/services/functions/), or [Webtask.io](https://webtask.io/). You can also
host your services on premise or in the cloud as long as they are internet accessible.

3) Create a Logic Function in your app's portal on Scaphold. Provide a URL, choose an event to bind it to,
and then configure the payload, HTTP method, and headers. Custom headers provide a convenient way to
authorize requests.

This whole process only takes a couple of minutes! I'll prove it!

Follow along as I walk through how you can start automatically subscribing your users to Mailchimp!

<iframe width="720" height="424" src="https://www.youtube.com/embed/hv3FQY6iipQ" frameborder="0" allowfullscreen></iframe>

### Thanks for reading!

We'd love to hear what you think and are even more excited to see what you build!

[Join us on slack](http://slack.scaphold.io)!