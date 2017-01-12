---
title:  "Build Better Websites with Angular2 and GraphQL"
description: "GraphQL is the best way to build modern applications. To prove it, let's build a production GraphQL powered application with Angular2, Apollo Client, and Webpack."
date:   2016-07-21 11:59:00 -0700
categories:
photo: "http://assets.scaphold.io/images/blog/angular-scaphold-apollo.png"
headshot: "http://assets.scaphold.io/images/mike.jpg"
author: "Michael Paris"
---

![Angular2, Apollo Client, Scaphold.io, and Webpack](http://assets.scaphold.io/images/blog/angular-scaphold-apollo.png)

## Introduction

Today we are going to finish what we started in [Part 1](https://scaphold.io/blog/2016/07/17/payments-api-with-graphql.html)
of this tutorial. Last time we created a GraphQL API on Scaphold and then integrated
[Stripe](https://www.stripe.com) and [Mailgun](https://www.mailgun.com) to add secure payments and email
to our API.

With a GraphQL API ready, its time to build our client app using Angular2, Apollo Client, and Webpack.
We will begin with a high level overview of our stack and then dive into some examples.
Also, to help get you started, we have created a [GraphQL ready, Angular2 starter kit](https://github.com/scaphold-io/angular2-apollo-client-webpack-starter)
for you to download :)

In no time, you will have a HOT application that handles payments, sends email, and is deployed
in production on [Amazon Web Services](https://aws.amazon.com/). Let's get going!

## The Angular2 Starter Kit

Angular2 is a open-source framework started at Google that helps you build powerful single-page web apps.
Angular2 applications use TypeScript, a typed superset of JavaScript, which encourages you to write maintainable,
modular applications. To help you get started, we have created a GraphQL ready Angular2 application that uses
Apollo Client to interface with GraphQL APIs.

Getting started is easy!

**Prerequisites**

You will need node.js to run our application. If you haven’t,

[Install node.js and npm](https://nodejs.org/en/download/)

**Quick Start**

1. Get the AngularMaterial branch of the [**Starter Kit**!](https://github.com/scaphold-io/angular2-apollo-client-webpack-starter)

        git clone -b AngularMaterial https://github.com/scaphold-io/angular2-apollo-client-webpack-starter.git save-the-world-tutorial

2. Point the application to your Scaphold API

        cd save-the-world-tutorial
        vi src/config.ts

        // Change the contents of src/config.ts for your url
        const config = {
            url: 'https://api.scaphold.io/graphql/save-the-world'
        };

        export default config;

3. Install the dependencies

        npm install

4. Start the development server

        npm start

You can see your barebones application by navigating a browser to [http://localhost:8080](https://localhost:8080)! The starter kit comes with and authentication service called **AuthService** that handles user registration and authentication for your app. Try creating a user. You should then be able to see it in the admin portal on [Scaphold](https://scaphold.io).

## Project Structure

```
angular2-apollo-webpack-starter/
├── src/                # Project Root
│   ├── app/            # Angular2 Application
│   │   ├── about/      # Angular2 components
│   │   ├── home/
│   │   ├── login/
│   │   ├── register/
│   │   ├── shared/     # Angular2 services.
│   │   ├── app.component.html
│   │   ├── app.component.scss   # Component specific sass styling
│   │   ├── app.component.ts     # The component controller
│   │   ├── app.component.e2e-spec.js   # Integration tests
│   │   ├── app.component.spec.ts       # Unit tests
│   │   ├── app.routes.ts        # Angular application router
│   │   └── client.ts/           # Apollo client initialization
│   ├── public/          # Public static assets
│   │   ├── img/
│   │   └── index.html
│   ├── style/           # Application wide sass styling
│   │   └── app.scss
│   ├── config.ts        # Contains your API's url.
│   ├── main.ts          # Application entry point
│   ├── polyfills.ts
│   └── vendor.ts        # Links application dependencies
├── typings/             # TypeScript definitions
│   ├── globals/
│   ├── modules/
│   └── index.d.ts
├── package.json
├── karma-shim.js
├── karma-conf.js
├── protractor.conf.js
├── tsconfig.json
├── tslint.json
├── typedoc.json
├── typings.json
├── webpack.config.js
├── LICENSE
└── README.md
```

The starter kit is written in TypeScript and uses Angular2, Webpack, Apollo Client, and SCSS. It also
bundles [Karma](https://karma-runner.github.io/1.0/index.html) for unit testing, [Protractor](http://www.protractortest.org/#/)
for integration tests, and [JSLint](http://www.jslint.com/) for code styling rules. Let’s begin by going
over some Angular2 concepts.

## Webpack

[Webpack](http://webpack.github.io/) is a module bundler. That means it takes *modules* with dependencies and turns
them into static assets representing those modules. In our case, it takes our Angular2 application (written
in TypeScript) and its dependencies (written in js, coffeescript, typescript, etc.) and then transpiles,
packages, and optimizes them such that they play nicely with your web browser.

Before moving on lets take a quick look at how Webpack builds our application.

**Useful Commands**

- `npm start` - Runs the [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) for debugging. This will watch and rerender the site when files change.
- `npm run build` - Kicks of the production build process. This will minify, optimize, and package your assets into the `dist` directory.
- `npm run debug-webpack` - Will launch webpack in verbose mode to help you find pesky build bugs.
- `npm run e2e` - Launches integration tests with [`protractor`](http://www.protractortest.org/#/)
- `npm run test` - Launch unit tests with [`karma`](https://karma-runner.github.io/)
- `npm run docs` - Generate static documentation for your website using [typedoc](http://typedoc.io/).

**Webpack Config**

You can customize Webpack's behavior by editting `webpack.config.js` in the root of the project directory.
Lets take a look at some of the important sections of `webpack.config.js`.

**The "entry point"** is where your application will start, and where webpack will start
tracking dependencies between modules. Providing an object as an "entry point" will cause
Webpack to build multiple bundles at once. Each entry point is bundled into its own module
and webpack configures them to talk to one another.

```javascript
// Line 51
config.entry = isTest ? {} : {
    'polyfills': './src/polyfills.ts', // Browser fallbacks.
    'vendor': './src/vendor.ts', // our dependencies
    'app': './src/main.ts' // our angular app
};
```

* * *

**config.output** sets options affecting the output of the compilation. Output will tell webpack how to write
the compiled files to disk. There is only ever one output configuration. Running `npm run build` sets
the isProd flag to true.

```javascript
// Line 61
config.output = isTest ? {} : {
    path: root('dist'),
    publicPath: isProd ? '/' : 'http://localhost:8080/',
    filename: isProd ? 'js/[name].[hash].js' : 'js/[name].js',
    chunkFilename: isProd ? '[id].[hash].chunk.js' : '[id].chunk.js'
};
```

* * *

**config.resolve** tells webpack where to look for files to include in the build.
'root' sets the project root directory, 'extensions' is an array of file extensions to
include, and 'alias' allows you to replace modules with other modules or paths.

```javascript
// Line 72
config.resolve = {
    cache: !isTest,
    root: root(),
    // only discover files that have those extensions
    extensions: ['', '.ts', '.js', '.json', '.css', '.scss', '.html', '.coffee'],
    alias: {
        'app': 'src/app',
        'common': 'src/common'
    }
};
```

* * *

**config.module** lets us specify which webpack 'loader' should be used for each file
type. A 'loader' in webpack is a function that knows how to take a source file and
transform it into a new source file that the browser can understand.
We use loaders to transpile our TypeScript and SASS code into plain old javascript and CSS
that can be run by a browser. You can use many loaders for many different file types.

```javascript
// Line 89
config.module = {
    preLoaders: isTest ? [] : [{test: /\.ts$/, loader: 'tslint'}],
    loaders: [
        // The TypeScript loader. Handles transpiling our Angular2 application to plan JavaScript.
        {
            test: /\.ts$/,
            loaders: ['ts', 'angular2-template-loader'],
            exclude: [isTest ? /\.(e2e)\.ts$/ : /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/]
        }

        ...

    ]
}
```

# Angular Architecture Overview

The team behind Angular sums up the framework:

> #### With Angular, we write applications by composing HTML templates with Angularized-markup, writing component classes to manage those templates, adding application logic in services, and handing the top root component to Angular’s bootstrapper.

This is what it looks like

![Angular2 Application Architecture](https://medium2.global.ssl.fastly.net/max/2000/1*3It6Um9bEgN0fvgBPA4MVw.png)*Angular2 Application Architecture*

To better understand how an angular application fits together, we'll begin by looking at a single, simple component.

### Component

An Angular component is the basic building block of an application. Each component is associated with a template
and is responsible for controlling a portion of the screen. At its core, an Angular application is made up of a
tree of these Components. Every Angular app has at least one root component. The starter kit defines its root
component in **src/app/app.component.ts** and its associated template is at **src/app/app.component.html** .

To create a component, we import and annotate a TypeScript class with the `Component` decorator function.
Take a look at our AppComponent. We define a TypeScript class called AppComponent and then apply the
`Component` decorator to it using the `@` syntax. The `Component` decorator takes a single metadata
object as an argument that tells Angular how to handle and present this component.

```typescript
import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { MD_TOOLBAR_DIRECTIVES } from '@angular2-material/toolbar';

import '../style/app.scss';

/*
* App Top Level Component
*/
@Component({
  // Component will replace <my-app></my-app> tags
  selector: 'my-app',

  // Where to find the component's template
  templateUrl: './app.component.html',

  // Styling specific to this component
  styleUrls: ['./app.component.scss'],

  // inject services into the component
  providers: [AuthService],

  // inject directives to look for when rendering the view
  directives: [ROUTER_DIRECTIVES, MD_TOOLBAR_DIRECTIVES],
})

export class AppComponent {
  url = 'https://scaphold.io';

  constructor(auth: AuthService) {}
}
```

As you can see our AppComponent doesn’t do much. Actually, it pretty much only acts as a wrapper for the rest
of our application.

Note how we are importing our stylesheets and specifying a template.
Angular2 prides itself in how it encourages writing modular code. Part of this means we need to write modular views.
The `styleUrls` and `templateUrl` attributes in the `@Component` decorator allows us to do just that.
We have adopted the convention that each component lives in its own folder containing a `X.component.ts`,
`X.component.html`, and `X.component.scss` file. Each component should be as
focused as possible and having a controller, template, and stylesheet per component leads to a maintainable code base.

Now, let’s take a look at our app.component.html template.

### Templates

A Component has a template that it uses to render itself in the dom.
Our AppComponent’s template (found in ***src/app/app.component.html***) looks like this

```html
<md-toolbar [color]="myColor">
    <span>Angular2, Apollo Client, Webpack Starter Kit</span>
    <span class="md-toolbar-fill-remaining-space"></span>
    <a md-button [routerLink]="['']">Home</a>
    <a md-button [routerLink]="['about']">About</a>
</md-toolbar>
<main>
    <router-outlet></router-outlet>
</main>
<footer>
    <h4>
        <a target="_blank" [href]="url">scaphold.io</a>
    </h4>
</footer>
```

Angular uses html to markup a component’s view. Angular uses template tags and directives to
specify how the DOM should behave as well as how data should be bound between a templates and
its component class.

There are a few important things to note in this template.

* `<md-toolbar>` : Available because we injected `MD_TOOLBAR_DIRECTIVES` via the `directives` attribute
in our @Component decorator

* `<router-outlet>` : Available due to the *ROUTER_DIRECTIVES* in the @Component decorator's `directives`.
The router lets you swap in and out different components when the browser url changes. We have defined
routes for */home* and */about* in in **src/app/app.routes.ts**.

* `[href]` : The `[…]` syntax specifies a template expression. In other words, it’s a way to push data in a single direction from the component to the view. `[href]=”url”` says set the href equal our AppComponent’s class attribute url. This is ‘Property Binding’ in the diagram above.

> Note: There is also a `(…)` syntax that denotes a *template statement*. A template statement pushes data the other way and will update a value in the component with a value from the view. For example, to call a component function every time an element was clicked, we would set `(click)=”someComponentMethod()”`. This is the ‘Event Binding’ in the diagram above. For more information on Angular’s template syntax [see the docs](https://angular.io/docs/ts/latest/guide/template-syntax.html#)

**Templates are inserted into the element specified by the Components `selector`**

We have setup our *AppComponent* with a selector of `my-app`. That means that whenever
Angular finds a `<my-app></my-app>` it will create an instance of our AppComponent, binds
it with its template, and then replaces the content of `<my-app></my-app>` with the newly
created DOM element.

### Services

Angular applications use Services to implement application logic that might need to be passed between components.

Implementing services in Angular2 is as simple is annotating a TypeScript class with the `@Injectable` decorator.
Let's create a service to hold our configuration options.

```typescript
import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  env: string;

  constructor() {
    // Load custom configuration here
    this.env = 'dev';
  }
}
```

To make services available to other Components and Services, we use Angular [dependency injection](https://angular.io/docs/ts/latest/guide/dependency-injection.html).
Angular comes with a powerful dependency injection system that makes sure your services are available to the
Components that need them. To inject a service, you specify a *provider* (an object that knows
how to create instances of our service) in the metadata of a `@Component` decorator function. Classes marked with
the `@Injectable` decorator can be used as their own provider.

For example, we can provide the **ConfigService** to our a component by adding

```typescript
import { ConfigService } from './shared';
@Component({
  // inject services into the component
  providers: [ConfigService]
})
class SomeComponent {
  constructor(config: ConfigService) {
    console.log(`SomeComponent instantiated with env: ${config.env}`);
  }
}
```

Services are made available to both the component and its children. We can also make a service
globally available by supplying it to angular's `bootstrap` function in `src/main.ts`. This prevents
having to explicitly specify a provider in each of your components that need a common service.

```typescript
bootstrap(AppComponent, [
  // Providers for global dependencies of your App
  ConfigService,
  ...
])
```

> Note: There is an amount of *magic* happening here. Just remember that Angular will handle the process of making
sure your services are available to the constructor as long as your supply the necessary provider.

It is generally considered best practice to keep your components as thin as possible and to implement the majority
of your application logic in tightly focused Services. The AuthService, for example, handles creating, getting,
and storing authentication credentials that can be used throughout the rest of your application.

### Directives

When Angular is rendering the DOM, it does so according to the rules given by directives.
In fact, a **Component** is simply a **Directive** that has a template. There are 3 types of directives:

1. Components - A directive with a template. The most common type of directive.
2. Structural Directives - Change the DOM by adding and removing elements. Examples are `*ngFor`
3. Attribute Directives - Changes the appearance or behavior of an element. Examples are `ngModel`

> You will often see the `ngModel` directive written like this `[(ngModel)]="someExpression"`. Angular2 uses this
syntax to declare that a Directive is bi-directionally bound to its component expression. An element tagged
with this directive will propogate changes to and react to changes in the component expression.

# Connect to our API

Now that we understand the fundamentals of our Angular application lets start building some features.
We're going to need a way to interact with the server we made in [Part 1](https://scaphold.io/blog/2016/07/17/payments-api-with-graphql.html)
of this tutorial. To do this we are going to use library called [Apollo Client](https://github.com/apollostack/apollo-client).

[Apollo Client](https://github.com/apollostack/apollo-client) is a GraphQL client library that can be
easily dropped into an JavaScript frontend. In our experience it can be friendlier than [Relay](https://facebook.github.io/relay/)
and happily integrates with Angular2 via the [angular2-apollo](https://github.com/apollostack/angular2-apollo) project.

## Apollo Client setup

Remember when I asked you to change the url in `src/config.ts`? We're going to use this url to
configure Apollo Client.

```typescript
// src/client.ts
import config from '../config';
import ApolloClient, {
  createNetworkInterface
} from 'apollo-client';

const networkInterface = createNetworkInterface(config.url);
networkInterface.use([
  {
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      if (localStorage.getItem('SCAPHOLD_AUTH_TOKEN')) {
        req.options.headers['Authorization'] = `Bearer ${localStorage.getItem('SCAPHOLD_AUTH_TOKEN')}`;
      }
      next();
    }
  }
]);

const apolloClient = new ApolloClient({
  networkInterface
});

export default apolloClient;
```

A couple things are happening here:

1. We are creating a network interface with our API's url for Apollo Client to attach to.
2. We are adding a middleware function to our network interface that will set the 'Authorization' header
in each of our requests. The **AuthService** puts the auth token in localstorage after a successful login.

> Scaphold, like many modern APIs, uses [JSON Web Tokens](https://jwt.io) (JWT) to authenticate users.
This allows the server to implement complex access control rules to make sure users are only able to
access data they are authorized to.

3. We instantiate an ApolloClient instance using our network interface and then export that client to be
used by the rest of our application.

## Connect to our GraphQL API

Let's use everything we just learned to make a component that lists our user's Donations.

1. Create a folder at `src/app/donation`
2. Add 3 files to the new directory
    - `donation.list.component.ts`
    - `donation.list.component.html`
    - `donation.list.component.scss`
3. Create a `DonationListComponent` (below)
4. Create our component template (below)

```typescript
// src/app/donation/donation.list.component.ts
import { Component, OnInit } from '@angular/core';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { Apollo } from 'angular2-apollo';
import client from '../client';
import gql from 'graphql-tag';
import has = require('lodash.has');

@Component({
    selector: 'donation-list',
    templateUrl: './donation.list.component.html',
    styleUrls: ['./donation.list.component.scss'],
    directives: [MD_CARD_DIRECTIVES, MD_BUTTON_DIRECTIVES]
})
export class DonationListComponent implements OnInit {

    // We will use this.data to hold the data we get back from our API
    data: any;

    // Pagination arguments.
    defaultPageSize: number = 6;
    first: number = this.defaultPageSize;
    last: number = null;
    after: string = null;
    before: string = null;

    constructor() {
        // Do stuff
    }

    ngOnInit() {
    }

    /**
    * If pageInfo says we have a next page OR first is null then try to grab a next page.
    * We have the check for this.first === null due a contraint in the relay spec for connections.
    * If first is not set in a request then pageInfo.hasNextPage is always false.
    * See https://facebook.github.io/relay/graphql/connections.htm for more info
    */
    getNextPage() {
        const mayHaveNextPage = has(this.data, 'viewer.allDonations.pageInfo')
            && this.data.viewer.allDonations.pageInfo.hasNextPage
            || this.first === null;
        if (mayHaveNextPage) {
            const edgeCount = this.data.viewer.allDonations.edges.length;
            const afterCursor = (edgeCount > 0) ? this.data.viewer.allDonations.edges[edgeCount - 1]['cursor'] : null;
            this.after = afterCursor;
            this.first = this.defaultPageSize;
            this.before = null;
            this.last = null;
        }
    }

    getPreviousPage() {
        const mayHavePreviousPage = has(this.data, 'viewer.allDonations.pageInfo')
            && this.data.viewer.allDonations.pageInfo.hasPreviousPage
            || this.last === null;
        if (mayHavePreviousPage) {
            const edgeCount = this.data.viewer.allDonations.edges.length;
            const beforeCursor = (edgeCount > 0) ? this.data.viewer.allDonations.edges[0]['cursor'] : null;
            this.before = beforeCursor;
            this.last = this.defaultPageSize;
            this.after = null;
            this.first = null;
        }
    }
}
```

```html
<!-- src/app/donation.list.component.html -->
<md-card class="pagination">
    <md-card-title>
        Recent Donations
    </md-card-title>
    <md-card-actions>
        <button md-button (click)="getPreviousPage()" class="btn">Previous</button>
        <button md-button (click)="getNextPage()" class="btn">Next</button>
    </md-card-actions>
</md-card>
<div *ngIf="data.viewer && data.viewer.allDonations">
    <div *ngFor="let edge of data.viewer.allDonations.edges">
        <md-card>
            <md-card-title *ngIf="edge.node.charity">
                <a target="_blank" [href]="edge.node.charity.url">{{edge.node.charity.name}}</a>
            </md-card-title>
            <md-card-content>
                <div>{{edge.node.description}}</div>
                <br>
                <span>$ {{edge.node.amount / 100}}</span>
                <!-- The '|' is an Angular pipe. Pipes allow us
                     to transform values directly from our html. For more info see
                     https://angular.io/docs/ts/latest/guide/pipes.html -->
                <span style="float: right;">{{ edge.node.createdAt | date:"MM/dd/yy"}}</span>
            </md-card-content>
        </md-card>
    </div>
</div>
```

We haven't hooked up our data yet, but it will soon be bound to the `data` attribute in
our Component. Note how we use **\*ngFor** to iterate through `data.viewer.allDonations`, **\*ngIf**
to conditionally place an element in the DOM, and {{ ... }} to present data from our component in our html.

> *ngIf actually removes and inserts an element from the DOM. If you want to simply hide
an element, use **[hidden]="someExpression"** instead.

Let's add some data to this component. In [part 1](https://scaphold.io/blog/2016/07/17/payments-api-with-graphql.html#create-a-donation)
of this tutorial we created a Charity, charged our stripe account for a $5 donation, and registered the charge
as a donation to "Teach for America".

To pull that data into our app, apply the @Apollo decorator to our component class.

```typescript
@Apollo({
  client,
    queries(context) {
      return {
        data: {
          query: gql`
            query AllDonations($first: Int, $after: String, $last: Int, $before: String) {
              viewer {
                allDonations(first: $first, after: $after, last: $last, before: $before) {
                  edges {
                    node {
                      id
                      description
                      amount
                      createdAt
                      charity {
                          name
                          mission
                          url
                          imageUrl
                      }
                    }
                    cursor
                  }
                  pageInfo {
                    hasNextPage
                    hasPreviousPage
                  }
                }
              }
            }
          `,
          variables: {
              first: context.first,
              after: context.after,
              last: context.last,
              before: context.before
          },
          forceFetch: false,
          returnPartialData: true,
          pollInterval: 10000
      }
    };
  }
})
// ... our component class declaration from above starts here
@Component({
    selector: 'donation-list',
    ...
```

The @Apollo decorator binds data from a GraphQL query to a Component and makes it reactive.
That is to say that when properties in the component change, so will the data
made available by Apollo. The `context` that is passed into the queries() function
is bound to the state of the component class. Use context to use information
from the component in your GraphQL queries.

The attributes of the object returned from the decorator's `queries(context){ return { ... } }` function
will also be made available on your component class. In our case we can access the results
of our query through the `data` property. Note that we never explicitly make a call to our query.
Apollo handles maintaining the state of the data returned by this query as the state of our component
changes.

> Apollo Client uses [Redux](https://github.com/reactjs/redux) to cache data and maintain
the state of our data. It doesn't stop there though.
See that funny ```gql`query { ... }` ``` syntax? That may look like magic, but it's actually just a
[tagged template literal](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals).
A *tagged template literal* is a just fancy term for a function that takes a template literal
(a string wrapped in backticks) as an argument and processes it somehow. Apollo uses the `gql` template tag
to better understand your queries so that it can optimize the Redux cache and fetching characteristics.

**Add our DonationsList component to our app**

The DonationsListComponent specifies a selector of **donation-list**. To add an instance of our component
we need to add a **<donation-list></donation-list>** directive to our html somewhere. To make Angular
aware of our **donation-list** directive, we need to inject it into the parent component. We're going
to show our **donation-list** from our home page so go ahead and inject the DonationListComponent by adding
it to our HomeComponent's directives list.

```
import {DonationListComponent} from '../donation';
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [
    ...
    DonationListComponent
    ...
  ]
})
export class HomeComponent implements OnInit {
```

If you're starting with the [angular2-apollo-client-webpack-starter](https://github.com/scaphold-io/angular2-apollo-client-webpack-starter),
there is already some html in `src/app/home/home.component.html`. Replace it with the following.

```html
<div class="home container">
  <div class="row">
    <div class="col-md-8 col-sm-12">
      <section>
        <md-card>
          <md-card-title>
            Welcome to our awesome GraphQL powered, Angular2 application
          </md-card-title>
        </md-card>
      </section>
      <section>
        <!-- This is next -->
        <!-- <donation-form></donation-form> -->
      </section>
    </div>
    <div class="col-md-4 col-sm-12">
      <donation-list></donation-list>
    </div>
  </div>
</div>
```

> We are using bootstrap-grid to make our app responsive. We made this available by installing it via
npm `npm install bootstrap-grid` and then importing it in `src\app\vendor.ts` with `import 'bootstrap-grid';`.
Part of our webpack config looks at this vendor.ts file and then packages all its dependencies in the
vendor.js chunk. You can follow a similar process to add your own third party dependencies.

There is already some logic in our HomeComponent showing how to paginate through users.
We just replicated most of that logic for donations in our DonationListComponent
so lets clean that up. Our `src/app/home/home.component.ts` looks like this

```typescript
import { Component, OnInit } from '@angular/core';
import {
  Angular2Apollo,
  Apollo
} from 'angular2-apollo';
import gql from 'graphql-tag';
import has = require('lodash.has');
import {DonationFormComponent, DonationListComponent} from '../donation';
import {AuthService} from '../shared';
import client from '../client';
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';

@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    DonationListComponent,
    // DonationFormComponent
  ]
})
export class HomeComponent implements OnInit {

  constructor(private auth: AuthService) {
    this.auth = auth;
  }

  ngOnInit() {/* Do stuff after the component template is done loading.*/}
}
```

**Run your app**

If you aren't already, go ahead and start your app with `npm start`. If you have followed along through
both parts of this tutorial, you should see the donation you made in part 1 in your browser. If you haven't
already created a donation, don't worry. Let's make a way to create donations from our app.

## The DonationFormComponent

Reading data from our API is great, but we're also going to need a way to create donations.
To do this, we're going to use [forms](https://docs.angularjs.org/guide/forms). Forms are html's way
of allowing user input and Angular2 includes a lot of tooling for making powerful forms. We're going to
start simple.

1. Create files for our new component
    - `src/app/donation/donation.form.component.ts`
    - `src/app/donation/donation.form.component.html`
    - `src/app/donation/donation.form.component.scss`

2. We're going to need a few mutations to handle creating donations, stripe charges, and sending receipts.
We'll be using another @Apollo decorator to implement our query logic.
3. Our DonationFormComponent will bind properties to our queries in the @Apollo decorator as well as handle
some view logic.
4. When all is said and done, `src/app/donation/donation.form.component.ts` should look like this

```typescript
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {
  Apollo
} from 'angular2-apollo';
import gql from 'graphql-tag';
import has = require('lodash.has');
import {GraphQLResult, GraphQLError} from 'graphql';
import {AuthService} from '../shared';
import client from '../client';
import {CharityComponent, Charity} from '../charity';
import {LoginComponent} from '../login';
import {RegisterComponent} from '../register';

// Angular Material
import { MD_CARD_DIRECTIVES } from '@angular2-material/card';
import { MD_BUTTON_DIRECTIVES } from '@angular2-material/button';
import { MD_INPUT_DIRECTIVES } from '@angular2-material/input';
import { MD_GRID_LIST_DIRECTIVES } from '@angular2-material/grid-list';

class CreditCard {
  constructor(
    public name: string,
    public number: string,
    public expiry: string,
    public expMonth: number,
    public expYear: number,
    public cvc: number
  ) { }
}

export class Donation {
    constructor(
        public charity: Charity,
        public description: string,
        public amount: number,
        public card: CreditCard
    ) { }
}

export class Email {
  constructor(
    public to: string[],
    public from: string,
    public subject: string,
    public text: string,
    public isHtml: boolean
  ) {}
}

@Apollo({
  client,
  queries(context) {
    return {
      charities: {
        query: gql`
          query AllCharities($first: Int) {
            viewer {
              allCharitys(first: $first) {
                edges {
                  node {
                    id
                    name
                    mission
                    imageUrl
                    url
                    createdAt
                    modifiedAt
                  }
                  cursor
                }
                pageInfo {
                  hasNextPage
                  hasPreviousPage
                }
              }
            }
          }
        `,
        variables: {
          first: 20
        },
        returnPartialData: true,
        pollInterval: 360000
      }
    };
  },
  mutations(context) {
    return {
      createStripeToken: () => ({
        mutation: gql`
          mutation CreateStripeToken($input: _CreateStripeCardTokenInput!) {
            createStripeCardToken(input: $input) {
              token {
                id
                created
                livemode
                type
                used
                card {
                  id
                  brand
                  exp_year
                }
              }
            }
          }
        `,
        variables: {
          input: {
            card: {
              exp_month: context.donation.card.expMonth,
              exp_year: context.donation.card.expYear,
              number: context.donation.card.number.split(' ').join('').trim(),
              cvc: context.donation.card.cvc,
              name: context.donation.card.name
            }
          }
        }
      }),
      createStripeCharge: (token) => ({
        mutation: gql`
          mutation CreateStripeCharge($input: _CreateStripeChargeInput!) {
            createStripeCharge(input: $input) {
              charge {
                id
                amount
                captured
                created
                currency
                description
                status
              }
            }
          }
        `,
        variables: {
          input: {
            amount: context.donation.amount * 100,
            currency: 'USD',
            source: token,
            receipt_email: (has(context.auth, 'user.username')) ? context.auth.user.username : '',
            capture: true
          }
        }
      }),
      createDonation: (stripeChargeId) => ({
        mutation: gql`
          mutation CreateDonation($input: _CreateDonationInput!) {
            createDonation(input: $input) {
              changedDonation {
                id
                description
                charity {
                  id
                  name
                }
              }
            }
          }
        `,
        variables: {
          input: {
            description: context.donation.description,
            amount: context.donation.amount * 100,
            stripeChargeId: stripeChargeId,
            charityId: context.donation.charity.id,
            userId: context.auth.user ? context.auth.user.id : ''
          }
        }
      }),
      sendEmail: (email: Email) => ({
        mutation: gql`
          mutation sendMailgunEmailQuery($email: _SendMailgunEmailInput!){
            sendMailgunEmail(input: $email) {
              id
              message
            }
          }
        `,
        variables: {
          email: email
        }
      })
    };
  }
})
@Component({
  selector: 'donation-form',
  templateUrl: './donation.form.component.html',
  styleUrls: ['./donation.form.component.scss'],
  directives: [
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    MD_GRID_LIST_DIRECTIVES,
    CharityComponent,
    LoginComponent,
    RegisterComponent]
})
export class DonationFormComponent implements OnInit, AfterViewInit {

  /**
   * Our @Apollo mutations
   */
  createStripeToken: () => Promise<GraphQLResult>;
  createStripeCharge: (token: string) => Promise<GraphQLResult>;
  createDonation: (stripeChageId: string) => Promise<GraphQLResult>;
  sendEmail: (email: Email) => Promise<GraphQLResult>;

  /**
   * AuthService
   */
  auth: AuthService;

  /**
   * Models.
   */
  donated: boolean = false;
  donation: Donation;
  charities: any;
  errors: Array<GraphQLError> = [];

  constructor(auth: AuthService) {
    this.auth = auth;
    this.initDonation();
  }

  initDonation() {
    const card = new CreditCard('', '', null, null, null, null);
    const charity = new Charity(null, null, null, null, null);
    this.donation = new Donation(charity, '', 5, card);
  }

  resetDonation() {
    this.window.location.reload();
  }

  onCharitySelected(charity: Charity) {
    this.donation.charity = charity;
  }

  handleGraphQLErrors(errors) {
    if (this.errors) {
      this.errors = errors;
      throw errors;
    }
  }

  sendReceiptEmail(donation: Donation) {
    if (has(this.auth, 'user.username')) {
      const email = new Email(
        [this.auth.user.username],
        'give@scaphold.io',
        'Thank You for Donating!',
        "<h1>Thanks for Donating</h1>",
        true
      );
      this.sendEmail(email).then(({errors, data}) => {
        console.log('Successfully sent email');
      }).catch(err => {
        console.log(`Error sending email: ${err.message}`);
      });
    }
  }

  onSubmit(event) {
    if (event) { event.preventDefault(); }
    if (!this.donation.charity.id) {
      this.errors = [new GraphQLError('Please select a charity to donate to.')];
      return;
    }

    // Clean the form data.
    const [month, year] = this.donation.card.expiry.split('/');
    this.donation.card.expMonth = parseInt(month, 10);
    this.donation.card.expYear = parseInt(year, 10);
    // If you are using Card.js there is a bug that causes angular's data binding to
    // behave oddly so you may need to grab the number directly from the form.
    // If you are not using card.js you should be able to skip this line
    this.donation.card.number = document.querySelector('input[name=number]')['value'];

    // Create our stripe token & charge, scaphold donation, and send a receipt
    this.createStripeToken().then(({data, errors}: GraphQLResult) => {
      this.handleGraphQLErrors(errors);
      const token = has(data, 'createStripeCardToken.token') ? data['createStripeCardToken']['token']['id'] : null;
      return this.createStripeCharge(token);
    }).then(({data, errors}: GraphQLResult) => {
      this.handleGraphQLErrors(errors);
      const charge = has(data, 'createStripeCharge.charge') ? data['createStripeCharge']['charge'] : {};
      return this.createDonation(charge['id']);
    }).then(({errors, data}) => {
      this.handleGraphQLErrors(errors);
      this.donated = true;
      this.sendReceiptEmail(this.donation);
      return data;
    }).catch(err => {
      this.errors.push(err);
      console.log(`Error donating ${err.message}`);
    });
  }
}
```

> In the live site, we use [Card.js](https://github.com/jessepollak/card) to add some pizazz
to our donation form. There is a little more setup required to get this going so if you are interested
take a look at the [github for this project](https://github.com/scaphold-io/save-the-world-tutorial).
Note how we create a WindowService to grab the global Card.js install from the browser in our DonationFormComponent.

Note a couple of things:
- We define both queries and mutations in the @Apollo decorator. Each mutation is mapped to the component's
context and returns a promise. e.g. `sendEmail: (email: Email) => Promise<GraphQLResult>`
- All the magic happens in the `onSubmit` method. We create a stripe token, charge the token, create a Donation
that keeps track of our charity and stripe's charge id as well as send a thank you email.

**The donation template**

```html
<div class="donation-completed" *ngIf="donated">
  <md-card>
    <md-card-title>Thank You!</md-card-title>
    <md-card-content>
      You're donation is helping make the world a better place. At the end of the month, we will send your donation directly to {{ donation.charity.name }}!
      Keep being awesome!
    </md-card-content>
    <md-card-actions>
      <button md-button (click)="resetDonation()">Make Another Donation!</button>
    </md-card-actions>
  </md-card>
</div>
<div class="donation-form" *ngIf="!donated">
  <form (submit)="onSubmit($event)" id="paymentForm" #paymentForm="ngForm">
    <md-card>
      <md-card-title>
        Pick a charity
      </md-card-title>
      <md-card-content *ngIf="charities && charities.viewer && charities.viewer.allCharitys">
        <charity-row *ngFor="let charity of charities.viewer.allCharitys.edges" [charity]="charity.node" (selected)="onCharitySelected(charity.node)" [isSelected]="charity.node.id==donation.charity.id"></charity-row>
      </md-card-content>
    </md-card>
    <md-card>
        <md-card-title>
            How much and why?
        </md-card-title>
        <md-card-content>
          <div class="row">
            <md-input align="end" class="col-sm-3 col-xs-12" placeholder="USD" type="number" required [(ngModel)]="donation.amount">
              <span md-prefix>$&nbsp;</span>
              <span md-suffix>.00</span>
            </md-input>
            <md-input id="donation-description" class="col-sm-9 col-xs-12" placeholder="Say something about this donation!" type="text" [(ngModel)]="donation.description"></md-input>
          </div>
        </md-card-content>
    </md-card>
    <section>
      <div *ngIf="!auth.credential.token" class="row">
          <scaphold-register-form class="col-md-6"></scaphold-register-form>
          <scaphold-login-form class="col-md-6"></scaphold-login-form>
      </div>
      <md-card *ngIf="auth.credential.token">
          <md-card-title>
              Thank you!
          </md-card-title>
          <md-card-content *ngIf="auth.user">
              We will send a receipt to {{auth.user.username}}
          </md-card-content>
          <md-card-actions>
          <button (click)="auth.logout()" md-button>Not you?</button>
          </md-card-actions>
      </md-card>
    </section>
    <md-card>
      <div class="row">
          <div class="col-sm-6 col-xs-12">
              <md-card-title>Payment Information</md-card-title>
              <md-card-content>
                  <p>We use stripe to securly process your donation. We never store your card information!</p>
                  <div *ngFor="let error of errors" class="alert-danger">
                      <p>{{error.message}}</p>
                  </div>
                  <md-input id="name" class="col-sm-12" placeholder="Full Name" type="text" required name="name" [(ngModel)]="donation.card.name"></md-input>
                  <md-input id="number" class="col-sm-12" placeholder="Card number" type="text" required name="number" [(ngModel)]="donation.card.number"></md-input>
                  <md-input id="expiry" class="col-sm-6" placeholder="MM/YY" type="text" required name="expiry" [(ngModel)]="donation.card.expiry"></md-input>
                  <md-input id="cvc" class="col-sm-6" placeholder="CVC" type="number" required name="cvc" [(ngModel)]="donation.card.cvc"></md-input>
              </md-card-content>
          </div>
          <div class="col-sm-6 col-xs-12 card-wrapper"></div>
          <button class="col-sm-12" [disabled]="!paymentForm.form.valid" md-button type="submit">Donate</button>
      </div>
    </md-card>
  </form>
</div>
```

Our form asks you to

1. Pick a charity from our selection
2. Decide how much to donate
3. Optionally write a blurb about why you donated
4. To login/register if you would like a receipt
5. Credit card information to securely send to Stripe

This still won't quite work. Look at line 20:

```html
<charity-row *ngFor="let charity of charities.viewer.allCharitys.edges"
             [charity]="charity.node"
             [isSelected]="charity.node.id==donation.charity.id"
             (selected)="onCharitySelected(charity.node)">
</charity-row>
```

What's the deal with that!

- `<charity-row>` - a directive that is being targetted by another custom component we haven't made
yet called `CharityComponent`.
- `[charity]="charity.node"` - Property binding let's us pass an input into our component.
- `[isSelected]="charity.node.id==donation.charity.id">` - Like above is passing an input to the component.
- `(selected)="onCharitySelected(charity.node)"` - Event binding let's us call methods in `DonationFormComponent`
on events that happen in `CharityComponent`

Binding events and properties like this allows us to share certain peices of information between
a parent and child component.

Let's go ahead and add our charity component, template, and stylesheet

**The Charity Component**

```typescript
// src/app/charity/charity.component.ts

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

export class Charity {
  constructor(
    public id: string,
    public name: string,
    public mission: string,
    public imageUrl: string,
    public url: string
  ) { }
}

@Component({
  selector: 'charity-row',
  templateUrl: './charity.component.html',
  styleUrls: ['./charity.component.scss']
})
export class CharityComponent implements OnInit {

    // These define the inputs and events that we bound to in donation.form.component.html
    @Input() isSelected: boolean = false;
    @Input() charity: Charity;
    @Output() selected = new EventEmitter();

    constructor() {
        // Do stuff
    }

    ngOnInit() {}

    onSelected() {
      // Fires and event via the selected EventEmitter. This will call
      // onCharitySelected(charity.node) in our DonationFormComponent
      this.selected.next(this.charity);
    }
}
```

**Charity Component Template**

```html
<!-- src/app/charity/charity.component.html -->
<div class="row charity-row" [class.is-selected]="isSelected">
  <div class="col-sm-2 col-xs-12">
    <img [src]="charity.imageUrl" alt="Charity image">
  </div>
  <div class="col-sm-8 col-xs-12">
    <a target="_blank" [href]="charity.url"><h3>{{charity.name}}</h3></a>
    <p>{{charity.mission}}</p>
  </div>
  <div class="col-sm-2 col-xs-12">
    <button *ngIf="!isSelected" md-button (click)="onSelected()">Select</button>
    <button *ngIf="isSelected" md-button class="md-primary" (click)="onSelected()">Selected</button>
  </div>
</div>
```

**Charity Component Stylesheet**

```css
/* src/app/charity/charity.component.scss */

$selected-border: 5px solid #42A948;

.charity-row {
    padding: 10px;
    div {
        height: 100%;
    }
    img {
        width: 100%;
        max-height: 100%;
    }

    &:hover {
        border-left: $selected-border;
    }
}

.is-selected {
    border-left: $selected-border;
}
```

**WHEW! That should do it. If your server isn't running go ahead and run `npm start`**

If you go to [http://127.0.0.1:8080](http://127.0.0.1:8080) you should see your application!
If you have enabled the Stripe and Mailgun integrations, you can create a donation
using the card number `4242 4242 4242 4242` which will be accepted by your Stripe test account.
If you register or login before making the donation, you should also get emailed a thank you note.

The core functionality of our site is now done. Feel free to style, edit, and add components
as much as you'd like. Next, I'll show you how to deploy our site for free on [Github pages](https://pages.github.com/)
or Amazon's [CloudFront CDN](https://aws.amazon.com/cloudfront/).

# Deploying with Github Pages

1. Run `npm run build` to build our application and all its dependencies. This will be output into the `dist` directory.
2. Go to github and create a repository named *username*.github.io, where *username* exactly matches your github username or organization.
3. From the command line enter, `git clone https://github.com/<username>/<username>.github.io`.
4. Drag the contents of your `dist` directory into the newly cloned repository.
5. Add, commit, and push to github

```bash
# from the cloned directory
git add --all
git commit -m "Deploying my GraphQL powered Angular2 application to github pages"
git push -u origin master
```

Now if you go to **https://*username*.github.io**, you should see your deployed application.

# Deploying with AWS Cloudfront

Github pages is a great way to deploy simple websites but sometimes you want a little more
performance and flexibility. Cloudfront is a distributed content delivery network that sits
in front of Amazon's S3 blog storage. Although it is not completely free, costs sit around
or below 8 cents per GB served.

To deploy via cloudfront

1. Run `npm run build` to build our application and all its dependencies.
This will be output into the `dist` directory.
2. Create an [AWS](https://aws.amazon.com/) account if you haven't
3. Go to the [S3 portal](https://console.aws.amazon.com/s3) and create a bucket
4. Once your bucket is created, upload the contents of your app's `dist` directory to the bucket.
5. Go to the [Cloudfront portal](https://console.aws.amazon.com/cloudfront/home) and create a new distribution
    - Make sure you select the correct s3 bucket for the 'Origin Domain Name'
    - Set the 'Default Root Object' to `index.html`
    - Configure https if you would like.
6. Click 'Create Distribution'

Any content retrieved via your cloudfront distribution's domain name will be served
via the CDN.

# Wrapping Up

Congratulations! You finished building your application and have now deployed it into production.
If you want, go ahead and switch your Stripe API key and secret to your Stripe production keys in the
Scaphold integration portal. You can now start charging people on your site and their payments will appear
in your stripe account.

A quick recap

In part 1 of this tutorial, **we designed and deployed a production GraphQL API**. [Scaphold](https://scaphold.io)
made it easy to design and deploy a persistent GraphQL backend for our application. They also allowed us to add
payment support via Stripe and email functionality with Mailgun to our API in a few minutes. Scaphold got our API
up and running quickly for free while saving many many hours of development time.

In this part of the tutorial, **we built a GraphQL powered, Angular2 application and deployed it using
Github pages or Amazon's Cloudfront distribution network**. Our application let's users make donations
to the charity of their choice and securely processes payments using Scaphold's Stripe integration. As
an added bonus, we send our user's thank you notes for their donations!

**Thanks for reading our tutorial! If any steps were incomplete or unclear, please let us know in the comments below.
You can also find the [finished project on our github](https://github.com/scaphold-io/save-the-world-tutorial).**

**Please join us on [Slack](http://slack.scaphold.io)!**
