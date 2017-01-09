---
title:  "Build a Payments API with Stripe and GraphQL"
description: "Today we are going to design, build, and deploy a website into production. Even better, we are going to do it using GraphQL, Angular JS 2.0, Apollo Client, and Scaphold.io. Forget the “Hello, world” tutorial, we’re going to build the “Save the world” tutorial. Check out the final product at https://give.scaphold.io/!"
date:   2016-07-17 12:00:00 -0700
categories:
photo: "https://give.scaphold.io/img/background.jpg"
headshot: "http://assets.scaphold.io/images/mike.jpg"
author: "Michael Paris"
---

![](https://give.scaphold.io/img/background.jpg)

Today we are going to design, build, and deploy a website into production. Even better, we are going to do it using GraphQL, Angular JS 2.0, Apollo Client, and [Scaphold.io](https://scaphold.io/). Forget the “Hello, world” tutorial, we’re going to build the “Save the world” tutorial. Check out the [final product here](https://give.scaphold.io/)!

We are going to learn some awesome new tech while we try to give something back. We’ll be building a social donation app of sorts. We are going to use Scaphold’s Stripe integration to securely process payments, Mailgun to email receipts and, at the end of every month, I will personally donate every cent you give to the charity of your choice.

Let start with a high-level overview of our stack:

1. [Angular2](https://angular.io): A performant, modular frontend framework started at Google. Angular2 is written in TypeScript and fully embraces modern JavaScript development practices.

2. [Scaphold.io](https://scaphold.io): A backend as a service platform powered by GraphQL. Scaphold makes it easy to define a data model and deploy a distributed API as well as integrate third party services to expand the functionality of your API. We will use their Stripe and Mailgun integrations to instantly add payments and email support to our API.

3. [Apollo Client](https://github.com/apollostack/apollo-client): A powerful GraphQL client that is versatile and easy to use. Apollo Client sits at the junction of Angular and Scaphold and is my favorite tool for hooking client apps up to GraphQL APIs.

4. [Webpack](https://webpack.github.io/): A popular module bundler that greatly simplifies the process of managing, building, and deploying large web projects. We will use this to package our npm packages and other resources to run smoothly in the browser.

We’ve got a lot to cover so we’re going to do it in two parts. This is **part 1** where we will go over how to build a payments & email enabled GraphQL API using [Scaphold’s](https://scaphold) GraphQL platform. Let’s get started!

## The Core API

Before we start building our Angular app, lets set up our API. [Scaphold](https://scaphold.io) provides a lot of tools and services that make building a GraphQL API easy. To start, go to [scaphold.io](https://scaphold.io) and create an app.

![](https://medium2.global.ssl.fastly.net/max/2000/1*h7bMFCr8T7xVxs--SS8Z1A.png)

Once you have an app, you will be taken to the Schema Designer where you can define your data model by creating types and adding fields to those types. A large benefit of GraphQL is its rich type system that helps us cleaner, safer APIs. Our application will use simple data model. We’ll have 4 types: User, Charity, Donation, and CharitySuggestion. When you are done, the Schema Designer should look like this.

Start by creating the four types *User, Charity, Donation, and CharitySuggestion*

![A **User** comes with “roles” out of the box. We will use these in a minute.](https://medium2.global.ssl.fastly.net/max/5616/1*ngEsXe8hR-hPRQ7UUkzSlQ.png) *A **User** comes with “roles” out of the box. We will use these in a minute.*

![A **Charity** has a name, mission, url (to their homepage), imageUrl (to their logo) and a connection to a set of donations.](https://medium2.global.ssl.fastly.net/max/5608/1*10XrmX5JzZE6IChLzfeNBA.png)*A **Charity** has a name, mission, url (to their homepage), imageUrl (to their logo) and a connection to a set of donations.*

![A **Donation** has a charity, user, description, amount, and stripeChargeId.](https://medium2.global.ssl.fastly.net/max/5600/1*IC6AADK05gPngRPTw5rZ-Q.png) *A **Donation** has a charity, user, description, amount, and stripeChargeId.*

![A **CharitySuggestion** is like a Charity but is not protected by admin permissions. Anyone can suggest a charity be added to the site.](https://medium2.global.ssl.fastly.net/max/5600/1*s33FGQXXZk1VkI64otxsuQ.png) *A **CharitySuggestion** is like a Charity but is not protected by admin permissions. Anyone can suggest a charity be added to the site.*

The Schema Designer provides the easiest way to get started with GraphQL. As you were clicking around, Scaphold spun up a GraphQL API for your new schema. Head over the *GraphiQL* tab and click the *Docs *button on the right to open up your personalized API documentation. As you can see we now have some mutations that allow us to create, update, and delete data of the custom types we just defined.

![Your API adapts to your schema. You can also activate integrations to enable new functionality.](https://medium2.global.ssl.fastly.net/max/2212/1*pxG6CZu_Tnb1I_y5EhfEPw.png)*Your API adapts to your schema. You can also activate integrations to enable new functionality.*

**Create a Charity**

Hop over to the GraphiQL tab and issue the following query to create a charity
```
// Query
mutation CreateCharity($input: _CreateCharityInput!) {
  createCharity(input: $input) {
    changedCharity {
      id
      name
      imageUrl
      mission
      url
    }
  }
}

// Variables
{
  "input": {
    "name": "Teach For America",
    "mission": "Our mission is to enlist, develop, and mobilize as many as possible of our nation's most promising future leaders to grow and strengthen the movement for educational equity and excellence.",
    "url": "https://www.teachforamerica.org/",
    "imageUrl": "http://www.knightfoundation.org/media/blogentry_images/teach-for-america-logo.jpg"
  }
}
```

> Copy & Paste the **id** of the charity that gets returned. We will need it later.

Your API comes with a lot of fuctionality out of the box, including file storage,
location services, pagination, and more.
[Check out the docs](https://scaphold.io/docs/) and play around to see what its capable of!

### Permissions

No application is complete without access control rules. Let’s finish up our schema by adding a few permissions. Mainly, we want to protect the **Charity** model to guarantee that only high-quality organizations appear in our charity list. In the Schema Designer click the ‘permissions’ link on the Charity type to set its permissions. Your Charity permissions should look like this.

![Everyone can read and admin users can create, update, and delete.](https://medium2.global.ssl.fastly.net/max/2000/1*Nqkb-ckne5r2HQz-fI3R-g.png)*Everyone can read and admin users can create, update, and delete.*

For completeness, we’ll add a few more permissions. When you are done, your permissions should look like this.

![The ‘me’ option on the RELATED permission only allows the logged in user to update/delete themself.](https://medium2.global.ssl.fastly.net/max/2776/1*IIlow_RQNIv5n2DpYepgog.png)*The ‘me’ option on the RELATED permission only allows the logged in user to update/delete themself.*

![Everyone can see and create Donations. We need Donations to calculate how much to donate to each charity so once they are created, they can no longer be modified.](https://medium2.global.ssl.fastly.net/max/2000/1*e18uly68b7DY8NEbNn6woQ.png)*Everyone can see and create Donations. We need Donations to calculate how much to donate to each charity so once they are created, they can no longer be modified.*

![Users are able to see, create, and update (vote) CharitySuggestions. Only admins can delete them.](https://medium2.global.ssl.fastly.net/max/2000/1*b2E61ZwLEp3WX8M8ITp2QQ.png)*Users are able to see, create, and update (vote) CharitySuggestions. Only admins can delete them.*

Congrats! With that you now have a GraphQL API backed by Scaphold’s distributed data store. Your Scaphold API also comes with Location Services, File Storage, and Authentication out of the box. If you hop over to the GraphiQL tab, you can start poking around your API and issuing GraphQL queries.

We can do a lot with the API we just built, but it is not quite enough for our app’s needs. To finish our app, we are going to need payments.

## Payments: The Stripe Integration

One of the most powerful aspects of [Scaphold](https://scaphold.io) is the ability to easily integrate other services into your GraphQL API. The Stripe integration lets us quickly add secure payments functionality to your API. After activating it you will be able to create payments and perform other actions to your Stripe account without ever having to worry about SDKs.

### **Create a Stripe Account**

Head over to [Stripe.com](https://stripe.com) to create an account. Once you have an account, you are going to need to give Scaphold your stripe secret and publishable keys. Click **Account Settings** from the dropdown in the top right and then go to the **API Keys** tab.

![](https://medium2.global.ssl.fastly.net/max/2000/1*Sk7pleM6kMcmDK_RKsrrMw.png)

Once you have your Stripe API keys, go to Scaphold’s integration portal and add the Stripe Integration with your test keys from Stripe.

![Add the Stripe Integration.](https://medium2.global.ssl.fastly.net/max/2000/1*Whpd8le9SAAhOJPM3Y_fsA.png)*Add the Stripe Integration.*

**Boom!** You’re GraphQL API is now payments enabled. Let’s go see what just happened. Go to the GraphiQL tab and open the documentation explorer by clicking the ‘Docs’ button. You’ll notice that in addition to having queries for the types you defined in the Schema Designer, your API now has queries and mutations for Stripe.

![You API automatically adapts as your edit your schema and add integrations.](https://medium2.global.ssl.fastly.net/max/3488/1*CGs9NaMw8euI0DI1fX1waw.jpeg)*You API automatically adapts as your edit your schema and add integrations.*

You can use these queries just like any others in your API and Scaphold will make sure everything integrates smoothly with Stripe. Use the GraphiQL explorer to your advantage. Stripe’s documentation is now cooked directly into your API and the GraphQL’s type system will improve your experience working with Stripe’s API.

### **Create a Donation**

Let’s create our first payment using our Stripe integration. The first step in creating a charge on Stripe is to generate a **StripeChargeToken**. A **StripeChargeToken** is a one time use token that can be used in place of a card or bank account to create charges. Tokens allow us to create charges without ever having to store sensitive customer information.

To create a token issue the following query

    mutation CreateCardToken($input: _CreateStripeCardTokenInput!) {
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

    // Variables
    {
      "input": {
        "card": {
          "exp_month": 10,
          "exp_year": 18,
          "number": "4242424242424242",
          "cvc": 123,
          "name": "John Doe"
        }
      }
    }

This will return the following token payload.

    {
      "data": {
        "createStripeCardToken": {
          "token": {
            "id": "tok_18YMGIGZUqmRht8KgWOmhc4H",
            "created": 1468788798,
            "livemode": false,
            "type": "card",
            "used": false,
            "card": {
              "id": "card_18YMGIGZUqmRht8Kaw5efQSV",
              "brand": "Visa",
              "exp_year": 2018
            }
          }
        }
      }
    }

The card number “4242 4242 4242 4242” is a Visa card number that Stripe uses for testing. Lets charge the card $5 using the id of the returned token.

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

    // Variables
    {
     "input": {
       "amount": 500, // Measured in cents
        "currency": "USD",
        "source": "tok_18YMGIGZUqmRht8KgWOmhc4H",
        "receipt_email": "[michael@scaphold.io](mailto:michael@scaphold.io)",
        "capture": true // if true captures the charge immediately
      }
    }

This will return a new charge object.

    {
      "data": {
        "createStripeCharge": {
          "charge": {
            "id": "ch_18YMOQGZUqmRht8KMdJw2H54",
            "amount": 500,
            "captured": true,
            "created": 1468789302,
            "currency": "usd",
            "description": null,
            "status": "succeeded"
          }
        }
      }
    }

You should be able to see the new charge in your [stripe admin portal](https://dashboard.stripe.com)! The stripe integration also includes functionality to manage stripe customers, cards, and more.

Now that we have a Stripe charge, lets make a Donation to keep track of what charity the charge is
associated with:

```
// Query
mutation createDonationQuery($donation: _CreateDonationInput!){
  createDonation(input: $donation){
    changedDonation {
      id
      charity {
        id
        name
        mission
        imageUrl
        url
      }
      amount
      description
      stripeChargeId
      createdAt
    }
  }
}

// Variables
{
  "donation": {
    "charityId": <The id of the charity we created earlier>,
    "amount": 500,
    "description": "It's a really great cause",
    "stripeChargeId": <The id of the stripe charge>
  }
}
```

Wahoo! We've made our first charge through our Stripe test account and registered it as a Donation to "Teach America".
Ideally, we'd be able to send the donor a thank you email. Although we can send Stripe receipts using the
Stripe integration, we would like to be able to send something a little more personalized.
[Scaphold’s](https://scaphold.io) Mailgun integration makes this easy!

## Email: The [Mailgun](https://mailgun.com) Integration

To finish up, we are going to add email support via the [Mailgun](https://www.mailgun.com/) Integration. Go to [Mailgun](https://mailgun.com), create and account, and setup a domain. Mailgun will ask you to verify your domain by creating TXT, CNAME, and MX DNS records to send, track, and receive email via your DNS provider. Once you have set up your Mailgun account and domain, you should see a screen that looks like this:

![](https://medium2.global.ssl.fastly.net/max/2628/1*GyoF9XCQ2M827h_yGT0TZg.png)

To finish adding the Mailgun integration, give Scaphold your API Key and domain name.

![Mailgun Credentials](https://medium2.global.ssl.fastly.net/max/2000/1*Lk-oWiDn3w3l4isW2_ifUQ.png)*Mailgun Credentials*

### **Send an email**

Awesome! Now you can send email and manage mailing lists directly from your GraphQL API. Go checkout the new functionality in the GraphiQL documentation explorer!

You can send an email with the following query

    mutation SendMailgunEmail($email: _SendMailgunEmailInput!){
      sendMailgunEmail(input: $email) {
        id
        message
      }
    }

    // Variables
    {
     "email": {
       "to": ["[michael@scaphold.io](mailto:michael@scaphold.io)"],
        "from": "[give@scaphold.io](mailto:give@scaphold.io)",
        "subject": "Welcome to Scaphold!",
        "text": "Build awesome apps with our GraphQL powered backend services!",
        "isHtml": false
      }
    }

You can manage mailing lists as well. Let’s create a mailing list.

    mutation createMailgunMailingListQuery($list: _CreateMailgunMailingListInput!){
      createMailgunMailingList(input: $list){
        message
        list {
          created_at
          address
          members_count
          description
          name
        }
      }
    }

    // Variables
    {
      "address": "contact@scaphold.io",
      "name": "Contact",
      "description": "Let us know what you think!",
      "access_level": "members"
    }

Add a user to the mailing list

    mutation addMailgunMailingListMemberQuery($input: _AddMailgunMailingListMemberInput!){
      addMailgunMailingListMember(input: $input){
        message
        list {
          created_at
          address
          members_count
          description
          name
        }
      }
    }

    // Variables
    {
      "input": {
       "list": {
         "address": "contact[@scaphold.io](mailto:hh@scaphold.io)"
        },
        "member": {
          "address": "[michael@scaphold.io](mailto:michael@scaphold.io)",
          "name": "Michael",
          "vars": {
           "city": "Seattle",
            "gender": "male"
          },
          "subscribed": true,
          "upsert": true
          // if true, updates the user if it exists
        }
      }
    }

A mailing list gives you an easy way to send emails to large groups of people. Each email sent to contact@scaphold.io will now be sent to evey member in the list. The mailgun integration offers more functionality than seen here. Use GraphiQL to checkout the other mutations and queries available.

## **Congrats!**

**Your API is now complete with payments and email functionality!**

It is now time to start building our Angular2 Application! Check out [part 2 of our tutorial](https://scaphold.io/blog/2016/07/21/build-better-websites-with-angular2-and-graphql.html) for help getting started! The tutorial will walk you through how we built [give.scaphold.io](https://give.scaphold.io). We will use the GraphQL API that we just built on Scaphold to power our site, process payments, and send emails.

Thanks for your time and please let me know how I can improve these tutorials! Have a good one!
