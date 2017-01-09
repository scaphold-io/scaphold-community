---
title:  "State of GraphQL 2016"
description: "Everything you need to know about the current updates and trends about GraphQL."
date:   2016-10-31 00:00:00 -0700
categories:
photo: "https://s3-us-west-2.amazonaws.com/scaphold-assets/white-house.jpeg"
headshot: "http://assets.scaphold.io/images/vince.jpg"
author: "Vince Ning"
---

## Everything you need to know about the current updates and trends about GraphQL.

![State of GraphQL](https://s3-us-west-2.amazonaws.com/scaphold-assets/white-house.jpeg)

### Introduction

As the tech industry marches forward in building better apps, the tools that we depend upon have also vastly improved at a rapid pace. The core of such powerful and novel apps within their well-designed shells is their data. That’s value. Tech giants like Facebook and Google have both made fortunes from their data, from synthesizing human behavior, to constructing the infrastructure for our information highway that we call The Internet. With this sublime flow of data, it’s important to pay attention to just HOW our data is transmitted. As an industry, we’ve come up with all sorts of ways to standardize large volumes of data so that computers and applications across the world can join this ever-expanding network. In recent past, standards like XML and JSON have been used frivolously across apps, using architectures like SOAP and REST to achieve scalable development. But modern computing has evolved and architectural requirements have changed. We constantly face issues from cross-platform compatibility, areas with weak network connectivity, and dangerous hacking attempts. And as such apps scale, these concerns become quite unwieldy to manage.

Which brings us to today. Many of the concerns of years past in development have been addressed with the newest tech on the block known as [**GraphQL**](http://graphql.org/). It’s generated massive buzz from large companies to the latest tech blogs across the world.

*So what’s all the excitement?*

### First-ever GraphQL Summit

On October 26, 2016, the first ever [GraphQL Summit](http://graphqlsummit.com/#) took place in San Francisco, hosted by the Meteor Development Group. It was a full-day affair with representatives from popular companies like Pinterest, Docker, Atlassian, and many more.

The calibre of the companies that attended were incredible. Executives and lead engineers from these companies traveled from across the world to speak at GraphQL Summit:
- [Meteor/Apollo](http://www.apollodata.com/)
- [Facebook](https://facebook.com)
- [GitHub](https://github.com)
- [Google](https://www.google.com/)
- [Shopify](https://www.shopify.com/)
- [GatsbyJS](https://github.com/gatsbyjs)
- [Stem](https://stem.is/#hiwerestem)
- [Credit Karma](https://www.creditkarma.com/)
- [Coursera](https://www.coursera.org/)
- [Hudl](http://www.hudl.com/)
- [Concur](https://www.concur.com/)
- [Conde Nast](http://creativity.condenast.com/)
- [Samsara](https://www.samsara.com/)
- [PostGraphQL](https://github.com/calebmer/postgraphql)

*OH... And this happened...*

> “All three OG GraphQL co-creators were together for the GraphQL Summit” - Lee Byron, Facebook

![Lee Byron](https://pbs.twimg.com/media/CvtGcxjUAAEN8bi.jpg:large)

The theme was "**GraphQL First**", referring to companies that have developed a culture of building GraphQL-centric infrastructure. Throughout the day, speakers revealed major updates regarding their platform and how they were already using a flavor of GraphQL in production. For instance, Github had been using GraphQL Ruby completely in production to power their API for months and now is the first to release their API publicly for programmatic interaction with their source control platform. Other companies like Coursera are also involved with GraphQL and are incrementally incorporating it into their stack. Even better is the culture of giving back, with many open source projects and tools that will be made available by these companies in the near future.

*This slide says it all...*

![GraphQL stats](https://s3-us-west-2.amazonaws.com/scaphold-assets/IMG_6701.JPG)

The growth of the GraphQL community at large is undoubtedly under way.

### [GraphQL](https://facebook.github.io/graphql/)

The current version of the official GraphQL-JS library is 0.7.0.

#### Schema

The library features many new updates for how to write your schemas. What's becoming highly popular is the condensed format for creating your types know as the schema syntax.

**Types:**

```
type Blog {
    id: ID!
    name: String!
    description: String
    posts: [Post]
}

type Post {
    id: ID!
    title: String
    body: String
    likes: Int = 0
}
```

**Queries & Mutations**

```
type Queries {
    getBlog(id: ID!): Blog
    allBlogs(
        first: Int,
        after: String,
        last: Int,
        before: String
    ): [Blog]
    getPost(id: ID!): Post
    allPosts(
        first: Int,
        after: String,
        last: Int,
        before: String
    ): [Post]
}

type Mutations {
    createBlog(
        name: String!
        description: String
    ): Blog
    updateBlog(
        id: ID!
        name: String
        description: String
    ): Blog
    deleteBlog(id: ID!): Blog
    createPost(
        title: String!
        body: String!
        likes: Int
    ): Post
    updatePost(
        id: ID!
        title: String
        body: String
        likes: Int
    ): Post
    deletePost(id: ID!): Post
}
```

You can use packages like [GraphQL tools](https://github.com/apollostack/graphql-tools) to help you parse this schema and map resolvers to each of these fields to fetch data. Facebook is actually currently undertaking a project to convert their entire schema into the schema syntax to improve development efficiency.

#### Subscriptions

GraphQL Subscriptions are an intriguing topic since the development community is debating which transport to use as a standard for web sockets. It's a way to add real-time functionality for your API by listening to changes in your data. Much like Query and Mutation, Subscription is a type that exists directly under the Root type of your schema and produces a live feed of the data that you want. Essentially, it is a pub-sub system that allows developers to produce reactive apps with live data for use cases like messaging and gaming.

Currently, a good way to start using subscriptions is through Apollo Client [here](https://github.com/apollostack/graphql-subscriptions). You can learn more about it [here](https://dev-blog.apollodata.com/graphql-subscriptions-in-apollo-client-9a2457f015fb#.xml0djtz7).

#### Directives

Ways to fine-tune your GraphQL query to reduce writing additional code and optimize performance for rendering UI. The GraphQL spec defines these two directives:
- *@skip*: allows for conditional exclusion of fields during execution
- *@include*: allows for conditional inclusion of fields during execution

Recent talks have announced new directives like these that aren't open source yet, but Facebook has been using them internally.
- *@export*: ability to declare dependencies between two GraphQL queries in one request
- *@defer*: fetch fields that may have slow response times so other more essential data can arrive first for a better user experience
- *@stream*: provides a way to fetch items as a stream so that each item in a list arrives one at a time
- *@live*: patch parts of results that have already been sent

In addition, you can now add custom directives but you'll still have to interpret them yourself.

#### Implementations & Languages

While JavaScript is the implementation of GraphQL that's currently used within Facebook, the enthusiasm for GraphQL is unparalleled, to the point that there's an implementation of the original GraphQL spec for almost every popular language:
- [Python](https://github.com/graphql-python/graphene)
- [.NET](https://github.com/graphql-dotnet/graphql-dotnet)
- [Java](https://github.com/graphql-java/graphql-java)
- [C/C++](https://github.com/graphql/libgraphqlparser)
- [Typescript](https://github.com/nitintutlani/typed-graphql)
- [Ruby](https://github.com/rmosolgo/graphql-ruby)
- [Go](https://github.com/graphql-go/graphql)
- [Scala](https://github.com/sangria-graphql/sangria)
- [PHP](https://github.com/webonyx/graphql-php)
- [Elixir](https://github.com/graphql-elixir/graphql)

Go try them out!

### Best Practices

At GraphQL Summit, the community has been up to creating standards for app development. As mentioned before, **GraphQL First** is the new direction for app development.

![Best Practices for GraphQL development](https://s3-us-west-2.amazonaws.com/scaphold-assets/navigating-your-transition-to-graphql-with-graphql-first-development-4-638.jpg)*Source: Sashko Stubailo, Meteor Development Group*

#### 1. Design the schema

Start by designing the schema. This will determine how the rest of your app looks, and how data feeds into your app's UI components. The schema entails how you want your data to be shaped and how you want your data to relate to each other. This will affect how you want your database to be structured from the backend side as well as what cloud services you'll need to fetch data from. On the other hand, you'll also be defining what queries, mutations, and subscriptions you want to be made available for your frontend for displaying data.

#### 2. Streamline workflow

Use GraphQL tools to help you standardize your development process. Previously in REST, for every database change you made, you have to update every endpoint that was affected, and API teams had to wait for database administrators to finish their changes before changing the API. Now, you can develop teams to work in parallel since new updates to the database will only lead to changes in one resolver function.

#### 3. Load data with queries

Populate your app with data with GraphQL queries, mutations, and subscriptions. The beauty of GraphQL is that you don't have to use any sort of client-side library for making GraphQL requests since your queries are strings. However, there is the highly-recommended option to use a GraphQL client library for client-side caching to achieve better performance. In addition, you can utilize the type system of your GraphQL schema to provide type-checking on the frontend to reduce invalid fetching which could lead to unwanted behavior in your app. Apollo Client and Relay are the best ways to do so right now for JavaScript apps. Native mobile apps will have more support like this soon.

#### 4. Monitor in production

Make sure you're always keeping track of how your app is running in production. Log your requests, and make sure to reflect on which parts of your queries are slow. Use tools like [Apollo Optics](http://www.apollodata.com/optics) to understand how your GraphQL API is fetching data.

Read more about GraphQL First development [here](http://www.slideshare.net/sashko1/navigating-your-transition-to-graphql-with-graphql-first-development)!

### Frontend Libraries

#### [Apollo Client](https://github.com/apollostack/apollo-client)

Created by the Meteor Development Group, Apollo Client is the frontend component of the larger GraphQL tools library known as Apollo Stack. It's a networking library that works with any JavaScript app and helps you issue GraphQL requests to any GraphQL server. As revealed at GraphQL Summit, the Apollo team is working hard to expand their reach into mobile apps with an iOS and Android version. Features frontend caching.

#### [Relay](https://facebook.github.io/relay/)
The current version of Relay is 1.0, and Facebook has yet to announce the release date of 2.0.

Facebook's Relay was the original way to send GraphQL requests from React apps. This is what Facebook uses internally, and performs well with its frontend caching capabilities. One caveat is that this library only works with React and React Native apps. However, it does provide a lot of utility from fetching data, highly-optimized caching layer, as well as optimistic UI.

### Tools

#### [GraphiQL](https://github.com/graphql/graphiql)

One of the beauties of GraphQL development is the availability of GraphiQL. It's a lightweight editor tool that Facebook open sourced and maintains to help you issue GraphQL requests to any GraphQL server. In addition, it will introspect your schema to help you understand how to construct your queries, mutations, and subscriptions. And even beyond that, the editor is fully-featured with auto-completion and linting based on your schema that it understands.

Hands down - one of the best tools for GraphQL development.

#### [Apollo Optics](http://www.apollodata.com/optics)

Analytics tool for your GraphQL server to help you gain insights on your GraphQL requests so that you can optimize them for better performance. This is actually a service that's provided by the Apollo team, but is not standalone. It needs a GraphQL server as it exposes a middleware component to send data to its servers.

### Learning Resources

- Facebook's [GraphQL.org](http://graphql.org)

- Kadira's [LearnGraphQL.com](https://learngraphql.com/)

- Apollo's [GraphQL.com](http://www.graphql.com/)

- [The Fastest Way to Get Started](https://scaphold.io/blog/2016/06/14/fastest-way-to-get-started.html)

- [GraphQL vs. REST](https://medium.com/chute-engineering/graphql-in-the-age-of-rest-apis-b10f2bf09bba#.el99enbvh)

- Clay Allsopp's [GraphQLHub.com](https://www.graphqlhub.com/)

- [Official GraphQL Slack](https://graphql-slack.herokuapp.com/)

- [Scaphold Slack](https://scapholdslackin.herokuapp.com)

- [Other Community Sites](http://graphql.org/community/)

- [Unofficial List of Resources](https://github.com/chentsulin/awesome-graphql)

If you have other additions to this list that you'd like to add, feel free to contact us at our [Slack channel](https://scapholdslackin.herokuapp.com). Message either @vince or @michael.

### Look Out For...

- More public GraphQL APIs
- Relay 2.0!
- GraphQL Subscriptions updates
- Open source tooling released by companies that are using it internally
- More mobile support

### Itching For More?

[Follow our blog](https://scaphold.io/blog) or [get started today](https://scaphold.io) with the service we created called Scaphold to help make GraphQL development simple and fun!

Scaphold is the most productive backend as a service powered by GraphQL. The fully-featured platform provides a sleek interface that allows you to build and deploy your GraphQL server instantly without writing any server-side code. You can also use Scaphold's integrations for Stripe payments, Auth0 social authentication, iOS push, and many more, to append large chunks of functionality into your GraphQL API with just a few clicks. Scaphold also provides GraphQL Subscriptions that works well with Apollo Client for real-time capabilities so you can make messaging and gaming apps easily. The features come full circle with an analytics platform that helps you track the performance of your GraphQL API so you can always feel at peace with your production app.

### Have Questions?

[Join our Slack channel](https://scapholdslackin.herokuapp.com) to ask us directly!

And most importantly, **GraphQL First**.
