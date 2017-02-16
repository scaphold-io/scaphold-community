import React from 'react';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import GraphQLLogo from '../images/graphql.png';

export default [
  {
    title: 'The fastest way to get started with GraphQL.',
    author: 'Michael Paris',
    url: prefixLink('/blog/fastest-way-to-get-started/'),
    description: 'First things first: GraphQL is awesome. If you’re not already building on it, right now is a great time to start! As a quick introduction, GraphQL is an application layer query language designed by Facebook that is used to power many of their web and mobile applications.',
    createdAt: '2016-06-14 14:23:37',
    tags: ['GraphQL', 'Tutorial'],
  },
  {
    title: 'Learn GraphQL',
    author: 'Kadira',
    url: 'https://learngraphql.com/',
    description: 'Learn GraphQL with an hour-long guide that will walk you through how GraphQL fits into your architecture, creating a schema, and executing queries.',
    createdAt: '2015-06-01 00:00:00',
    tags: ['GraphQL', 'Tutorial'],
    img: GraphQLLogo,
  },
  {
    title: 'Social Authentication with OAuth + GraphQL',
    author: 'Vince Ning',
    url: prefixLink('/blog/social-auth-graphql/'),
    description: 'Quick guide on how to use OAuth with Scaphold\'s GraphQL platform. Social authentication has been a hot topic for developers and users alike. There are many guides on how to implement it for traditional REST-based APIs, so here’s one for the good guys.',
    createdAt: '2016-06-28 14:23:37',
    tags: ['GraphQL', 'OAuth'],
  },
  {
    title: 'Pokémon Go and GraphQL with AWS Lambda',
    author: 'Vince Ning',
    url: prefixLink('/blog/pokemon-go-graphql-with-aws-lambda/'),
    description: 'Quick guide on how to notify the nearest Pokémon Trainer with event-based triggers on Scaphold’s GraphQL platform. Want to get notified every time a new rare Pokémon appears near you in Pokémon Go? Excited to have them join you in the ultimate nostalgia-filled quest to catch them all? Here’s a simple way to get started with GraphQL!',
    createdAt: '2016-07-14 14:23:37',
    tags: ['GraphQL', 'Pokémon', 'Lambda'],
  },
  {
    title: 'Build a Payments API with Stripe and GraphQL',
    author: 'Michael Paris',
    url: prefixLink('/blog/payments-api-with-graphql/'),
    description: 'Today we are going to design, build, and deploy a website into production. Even better, we are going to do it using GraphQL, Angular JS 2.0, Apollo Client, and Scaphold.io. Forget the “Hello, world” tutorial, we’re going to build the “Save the world” tutorial. Check out the final product at https://give.scaphold.io/!',
    createdAt: '2016-07-17 12:00:00',
    tags: ['GraphQL', 'Stripe', 'Donation'],
  },
  {
    title: 'Build Better Websites with Angular2 and GraphQL',
    author: 'Michael Paris',
    url: prefixLink('/blog/build-better-websites-with-angular2-and-graphql/'),
    description: 'GraphQL is the best way to build modern applications. To prove it, let\'s build a production GraphQL powered application with Angular2, Apollo Client, and Webpack.',
    createdAt: '2016-07-21 11:59:00',
    tags: ['GraphQL', 'Angular2', 'Apollo'],
  },
  {
    title: 'How to Build Realtime Apps with GraphQL Subscriptions',
    author: 'Michael Paris',
    url: prefixLink('/blog/build-realtime-apps-with-subs/'),
    description: 'When Facebook open-sourced GraphQL, they described how applications can perform reads with queries, and writes with mutations. However, often times clients want to get pushed updates from the server when data they care about changes. Enter GraphQL Subscriptions. Subscriptions make real-time functionality a first class citizen in GraphQL!',
    createdAt: '2016-11-10 00:00:00',
    tags: ['GraphQL', 'Subscriptions', 'Real-Time'],
  },
  {
    title: 'Apollo: How Scaphold Works!',
    author: 'Apollo GraphQL',
    url: 'https://www.youtube.com/watch?v=U2NKoStGBvE',
    description: 'Scaphold.io founders Michael Paris and Vincent Ning present at our GraphQL in Production meetup on 8/25/16 in San Francisco at Meteor Development Group.',
    createdAt: '2016-08-25 00:00:00',
    tags: ['GraphQL', 'Apollo', 'Scaphold', 'Tech Talk'],
  },
  {
    title: 'The Official GraphQL Site',
    author: 'Facebook',
    url: 'http://graphql.org/',
    description: 'GraphQL is a query language for APIs and a runtime for fulfilling those queries with your existing data. GraphQL provides a complete and understandable description of the data in your API, gives clients the power to ask for exactly what they need and nothing more, makes it easier to evolve APIs over time, and enables powerful developer tools.',
    createdAt: '2015-01-01 00:00:00',
    tags: ['GraphQL', 'Facebook'],
  },
  {
    title: 'Apollo Client: A flexible fully-featured GraphQL client for every platform',
    author: 'Meteor',
    url: 'http://dev.apollodata.com/',
    description: 'Apollo Client can be used in any JavaScript frontend where you want to use data from a GraphQL server. It\'s incrementally adoptable, universally compatible, simple to get started with, inspectable and understandable, built for interactive apps, small and flexible, and community-driven.',
    createdAt: '2016-02-21 00:00:00',
    tags: ['GraphQL', 'Apollo'],
  },
  {
    title: 'Relay: The Official Site',
    author: 'Facebook',
    url: 'https://facebook.github.io/relay/',
    description: 'A JavaScript framework for building data-driven React applications',
    createdAt: '2015-01-01 00:00:00',
    tags: ['GraphQL', 'Facebook', 'Relay'],
  },
  {
    title: 'Software Engineering Daily: Building Scalable GraphQL APIs',
    author: 'Jeff Meyerson',
    url: 'https://www.youtube.com/watch?v=U2NKoStGBvE',
    description: 'Scaphold.io provides GraphQL as a service, and today’s guests are the creators of Scaphold, Vince Ning and Michael Paris. Scaphold.io lets developers configure their schema, and hosts their data. Vince and Michael explain the basics of GraphQL, and also discuss how they are building a GraphQL as a service platform.',
    createdAt: '2016-08-08 00:00:00',
    tags: ['GraphQL', 'Software', 'Podcast'],
  },
  {
    title: 'How We Built GraphQL Subscriptions With Apollo',
    author: 'Michael Paris',
    url: 'https://dev-blog.apollodata.com/how-we-used-apollo-to-build-graphql-subscriptions-ed5caa14d51b#.1d4fy0spy',
    description: 'This post is a high-level overview of how we leverage Apollo to rapidly build features at Scaphold.io!',
    createdAt: '2016-05-14 00:00:00',
    tags: ['GraphQL', 'JavaScript', 'React', 'Nodejs', 'AngularJS'],
  },
  {
    title: 'GraphQL Explained',
    author: 'Jonas Helfer',
    url: 'https://dev-blog.apollodata.com/graphql-explained-5844742f195e#.qegyqwtma',
    description: 'In this post, I’m going to answer one simple question: How does a GraphQL server turn a query into a response?',
    createdAt: '2016-05-23 00:00:00',
    tags: ['GraphQL', 'JavaScript', 'Web Development'],
  },
  {
    title: 'Exploring GraphQL at react-europe 2015',
    author: 'Lee Byron',
    url: 'https://www.youtube.com/watch?v=WQLzZf34FJ8',
    description: 'At React.js Conf last January, we introduced the idea of GraphQL: a data fetching language that allows clients to declaratively describe their data requirements. Let\'s explore more of GraphQL, it\'s core principles, how it works, and what makes it a powerful tool.',
    createdAt: '2016-06-14 00:00:00',
    tags: ['GraphQL', 'React', 'Europe'],
  },
  {
    title: 'Building native mobile apps with GraphQL at react-europe 2016',
    author: 'Martijn Walraven',
    url: 'https://www.youtube.com/watch?v=z5rz3saDPJ8',
    description: 'GraphQL was conceived almost four years ago to serve the needs of Facebook\'s iOS developers. Outside of Facebook however, non-JavaScript GraphQL clients haven\'t received as much attention. In this talk, I will explore the use of GraphQL to build native mobile apps. I will discuss some of the design decisions faced when developing a native GraphQL client, and illustrate these with examples from a Swift client. Among other things, I will show how to exploit code generation and the strongly typed nature of GraphQL to present a typed interface to query results.',
    createdAt: '2016-06-14 00:00:00',
    tags: ['GraphQL', 'React', 'Europe', 'mobile'],
  },
  {
    title: 'Apollo Client: Put GraphQL data in your UI',
    author: 'Sashko Stubailo',
    url: 'https://www.youtube.com/watch?v=u1E0CbGeICo',
    description: 'At GraphQL San Francisco\'s first meetup, Apollo Stack\'s Sashko Stubailo talks about how you can easily build full-stack apps with GraphQL, Apollo, and Redux.',
    createdAt: '2016-06-14 00:00:00',
    tags: ['Apollo', 'GraphQL', 'Redux'],
  },
  {
    title: 'Build Slack in 15 Minutes',
    author: 'Michael Paris',
    url: 'https://www.youtube.com/embed/yaacnYUqY1Q',
    description: (
      <span>
        Curious how to build Slack in 15 minutes?
        Follow this video tutorial and start chatting with your friends!
      </span>
    ),
    createdAt: '2017-01-06 00:00:00',
    tags: ['GraphQL', 'Slack', 'Real-Time', 'Subscriptions'],
  },
  {
    title: 'Add Custom Business Logic To Your GraphQL API',
    author: 'Michael Paris',
    url: 'https://www.youtube.com/watch?v=hv3FQY6iipQ',
    description: 'This tutorial covers how you can instantly add business logic to your Scaphold API. We implement a simple microservice that is critical to every business. What is it? We\'ll show you how to instantly add your user\'s to a MailChimp email list so you can start marketing and growing your business!',
    createdAt: '2017-01-09 00:00:00',
    tags: ['GraphQL', 'Custom', 'Business', 'Logic', 'MailChimp'],
  },
  {
    title: 'How To Define Your GraphQL Schema',
    author: 'Michael Paris',
    url: 'https://www.youtube.com/watch?v=sgHckUwEWRw',
    description: 'Learn how to use the schema designer to painless define your API\'s GraphQL Schema. In a matter of minutes you can create complex data models that are instantly configured and deployed to production. No coding required!',
    createdAt: '2017-01-09 00:00:00',
    tags: ['GraphQL', 'Schema'],
  },
  {
    title: 'Using Zapier with Scaphold',
    author: 'Rohit Ravikoti',
    url: 'https://medium.com/@rohit_67628/add-every-new-scaphold-io-user-to-a-mailchimp-email-list-using-zapier-9b9a97b98bf3#.54fcsi1g3',
    description: 'Add every new Scaphold.io user to a mailchimp email list using Zapier',
    createdAt: '2017-01-11 00:00:00',
    tags: ['Zapier', 'Logic', 'Scaphold'],
  },
  {
    title: 'GraphQL vs. REST',
    author: 'Jacob Gillespie',
    url: prefixLink('/questions/graphql-vs-rest/'),
    description: 'Main differences between GraphQL and REST.',
    createdAt: '2017-01-11 00:00:00',
    tags: ['GraphQL', 'REST', 'API'],
  },
  {
    title: 'Apollo vs. Relay',
    author: 'Codazen',
    url: 'http://www.codazen.com/choosing-graphql-client-apollo-vs-relay/',
    description: 'Tips on how to go about choosing a GraphQL client.',
    createdAt: '2016-09-08 00:00:00',
    tags: ['Apollo', 'Relay'],
  },
  {
    title: 'Made With GraphQL!',
    author: 'Vince Ning',
    url: 'https://medium.com/madewithgraphql',
    description: 'Check out awesome apps made with GraphQL.',
    createdAt: '2017-01-15 00:00:00',
    tags: ['GraphQL', 'Apps', 'Software'],
  },
  {
    title: 'How to Pitch GraphQL to your CTO',
    author: 'John J Masse',
    url: 'https://medium.com/ecmastack/how-to-pitch-graphql-to-your-cto-7f6823d7a4f3#.rzflja36a',
    description: 'Unless you are working at a startup or a technology agency, it is unlikely that you, as an engineer, get to make the decisions regarding how your team solves problems with technology. Over the last couple of years, GraphQL has been growing in popularity...',
    createdAt: '2017-01-16 00:00:00',
    tags: ['GraphQL', 'CTO', 'Adoption'],
  },
  {
    title: 'Udemy: Building Better APIs with GraphQL',
    author: 'Matthew Mueller',
    url: 'https://www.udemy.com/building-better-apis-with-graphql/',
    description: 'Step-by-step guide to building a better and faster API with GraphQL',
    createdAt: '2017-01-17 00:00:00',
    tags: ['GraphQL', 'Udemy', 'API'],
  },
  {
    title: '10 GraphQL Consoles in Action',
    author: 'Bill Doerrfeld',
    url: 'http://nordicapis.com/10-graphql-consoles-in-action/',
    description: 'Outside of Facebook, the founders of GraphQL, there are actually quite a few API providers actually implementing GraphQL in practice.',
    createdAt: '2016-06-14 00:00:00',
    tags: ['GraphQL', 'API'],
  },
  {
    title: 'Authentication with GraphQL.',
    author: 'Michael Paris',
    url: prefixLink('/blog/authentication-in-graphql/'),
    description: 'Learn how to authenticate your own GraphQL APIs and use Scaphold\'s built in authentication & authorization',
    createdAt: '2017-02-07 14:23:37',
    tags: ['GraphQL', 'Tutorial', 'Authentication', 'Security'],
  },
  {
    title: 'Advanced Querying With Scaphold',
    author: 'Michael Paris',
    url: prefixLink('/blog/querying-relational-data-with-graphql/'),
    description: 'GraphQL is an awesome way to query data and optimize relational logic, and Scaphold provides a lot of different ways to query data. Learn how to get started.',
    createdAt: '2017-02-06 14:23:37',
    img: 'https://cdn0.iconfinder.com/data/icons/superuser-extension-dark/512/675172-data_database_sql_query-128.png',
    tags: ['GraphQL', 'SQL', 'Tutorial', 'Connections'],
  },
  {
    title: 'Aggregations in GraphQL.',
    author: 'Michael Paris',
    url: prefixLink('/blog/aggregations-in-graphql/'),
    description: 'A quick crash course on how to start building powerful data-driven applications with GraphQL aggregations',
    createdAt: '2017-02-03 14:23:37',
    img: 'https://assets.scaphold.io/community/blog/aggregations-in-graphql/BigData.jpg',
    tags: ['GraphQL', 'Tutorial', 'Aggregations', 'Analytics'],
  },
  {
    title: 'SFNode Meetup: Development of real-time apps with GraphQL Node.js',
    author: 'SFNode',
    url: 'https://youtu.be/yh_A6CEqsSM',
    description: 'Learn about how to develop real-time apps with GraphQL',
    createdAt: '2017-02-11 00:00:00',
    tags: ['GraphQL', 'Tech Talk', 'Node', 'JS'],
  },
  {
    title: 'Public GraphQL APIs',
    author: 'APIs-guru',
    url: 'https://github.com/APIs-guru/graphql-apis',
    description: 'A collective list of public GraphQL APIs',
    createdAt: '2017-02-12 00:00:00',
    tags: ['GraphQL', 'API'],
  },
  {
    title: 'Interview with Scaphold.io',
    author: 'Simple Programmer',
    url: 'https://www.youtube.com/watch?v=Ah6GSCK5Rfs',
    description: 'GraphQL Backend Made Easy',
    createdAt: '2017-02-15 00:00:00',
    tags: ['GraphQL', 'Podcast', 'Backend'],
  },
  // {
  //   title: '',
  //   author: '',
  //   url: '',
  //   description: '',
  //   createdAt: '2016-06-14 00:00:00',
  //   tags: [],
  // },
];
