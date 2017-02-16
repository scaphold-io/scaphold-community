---
title: "Scaphold.io: Initial Impressions"
date: 2016-02-04 00:00:00 -0700
categories: Scaphold
description: "Scaphold takes advantage of Facebook’s GraphQL in order to create a robust backend service that works across any platform."
photo: "https://assets.scaphold.io/images/scaphold-white.jpg"
headshot: "https://assets.scaphold.io/images/fred.jpg"
author: "Frederick Daso"
---

# Scaphold.io: Initial Impressions

Setting up your backend for your app, webpage, and other types of software can be a difficult, tedious exercise. You will need to learn the syntax and code for a database management system as well as database’s particular strengths and weaknesses. If your software is featured on a variety of different platforms, such as an app offered on Android, iOS, and Windows Phones, then there is dealing with the additional problem of your database storing and retrieving data from multiple sources. For developers who want to power and scale their products rapidly, they unfortunately have to deal with the immediate limitations of the database management system they use. Fortunately, Scaphold, a backend-as-a-service platform, bundles all the tools you need to quickly build production-grade applications using GraphQL.

![Scaphold](https://assets.scaphold.io/community/blog/initial-impressions-scaphold/scaphold.png)

Scaphold takes advantage of Facebook’s GraphQL in order to create a robust backend service that works across any platform. GraphQL is a query language for APIs to store and retrieve the data that is queried with little issue. Scaphold utilizes GraphQL’s functionality to “easily define complex data models that are instantly deployed to a production GraphQL API backed by a highly available SQL cluster.”

![GraphQL](https://assets.scaphold.io/community/blog/initial-impressions-scaphold/graphql-banner.png)

What impressed me most about Scaphold is how they use ‘schemas’ to coherently organize different ‘types’ of data and show their linkages between one another. These schemas are helpful in a user visually understanding how one piece of data interacts within another within GraphQL, giving them the ability to better organize their information for when an API queries it. Scaphold tries to do all of the heavy lifting for organizing your data types via their Schema Designer. Their Schema Designer helps craft complex schemas so you can represent your data exactly as you like. Typical queries to a database such as authentication do not have to be a hassle anymore with Scaphold, as they automatically add a model for storing and retrieving user data.

<div class="col-md-6" style="padding: 0">
  <p>
    Scaphold’s biggest advantage is its versatility across platforms. GraphQL is able to respond to any client networking library requests against its API. This flexibility in its response to different libraries allows for use across any “Web, iOS, Android, or IOT app.” Imagine having to manage several different networking libraries in order to allow for efficient storage and retrieval of user data and other relevant memory. This is what most developers do today! Now that is all simplified with a seamless interface and infrastructure provided by Scaphold. If you want to build and scale your app fast across multiple platforms, Scaphold is the clear provider in enabling you to accomplishing that.
  </p>
</div>

<div class="col-md-6">
  <img src="https://assets.scaphold.io/community/blog/initial-impressions-scaphold/schema.png" alt="Schema" />
</div>

The backend-as-a-service’s versatility isn’t just located in the platform, but also across a diverse set of programming languages. It doesn’t matter if you’re working in Java or Ruby. Any programming language will have the same equivalent structure in GraphQL.

![GraphQL Code](https://assets.scaphold.io/community/blog/initial-impressions-scaphold/graphql-code.png)

On the left, you have a GraphQL schema with only one type named Character. In the screenshots immediately to the right, you have equivalent snippets of Java and
Python that correspond to the portion of GraphQL code. GraphQL’s ability to work with different languages to store and retrieve the same outside allows the query language to form the basis of your product, regardless of the primary programming language you use.

Scaphold’s biggest contribution is not just this backend-as-a-service they are providing, but rather the potential for GraphQL to be the standard platform from which a majority of applications are built. The benefits of this potential are two-fold: one, individuals who want their app to interface or draw information from another app will find it easy as both use Scaphold/GraphQL to organize their data. Two, is that Scaphold has done a great job of connecting users to one another via Slack. This open form of communication amongst the Scaphold product team and its users allows for rapid iteration of and feedback about the service, as well as veteran users helping newer users get acquainted with all the features that Scaphold offers through GraphQL.

Scaphold’s promise is evident in the early adopters of GraphQL. Facebook, Twitter, Coursera, Salesforce, and other prominent Silicon Valley tech firms are relying on GraphQL for seamless integration with third party apps, as well as making sure their database is easily accessible with convenient storage and retrieval.

![GraphQL Users](https://assets.scaphold.io/community/blog/initial-impressions-scaphold/graphql-users.png)

With Scaphold leading the charge for GraphQL to be the backend for your application, you won’t regret using it too.

Thanks for reading!
