---
title:  "Social Authentication with OAuth + GraphQL"
date:   2016-06-28 14:23:37 -0700
categories:
description: "Social authentication has been a hot topic for developers and users alike. There are many guides on how to implement it for traditional REST-based APIs, so here’s one for the good guys."
photo: "https://medium2.global.ssl.fastly.net/max/2000/1*UaIpF0v3Dx6kljZKbCq_PQ.png"
headshot: "http://assets.scaphold.io/images/vince.jpg"
author: "Vince Ning"
---

### Quick guide on how to use OAuth with [Scaphold’s](https://scaphold.io) GraphQL platform.

![](https://medium2.global.ssl.fastly.net/max/2000/1*UaIpF0v3Dx6kljZKbCq_PQ.png)

Hi GraphQL-Lovers!

Social authentication has been a hot topic for developers and users alike. There are many guides on how to implement it for traditional REST-based APIs, so here’s one for the good guys.

Why social authentication? It all starts with the users. Most people have online social accounts on Facebook, Twitter, Google, and more. So they’re thinking,
> #“I’ll check out your app if I can just log in with my existing Facebook or Twitter account.”

The benefits are two-fold.

1. *Users* are excited to get to remember one less account name and password. Hooray!

1. *Developers* gets more content from these social authentication providers immediately upon log in, like emails, profile pictures, friends, etc…

Here’s how it works at a high level:

![Source: [https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)](https://medium2.global.ssl.fastly.net/max/2000/1*fyfmxv1QjNyo9uan1YZroQ.png)*Source: [https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2](https://www.digitalocean.com/community/tutorials/an-introduction-to-oauth-2)*

1. User must grant the application permission to access secured resources from an OAuth provider (i.e. Facebook, Google, etc).

1. After the user successfully grants the application access, the OAuth provider generates a user access token and passes it back to the application.

1. The application sends this user access token to the OAuth provider along with its own identity in order to authenticate.

1. Upon successful authentication, the OAuth provider grants authorization and returns an app access token.

1. Now that authorization is completed, the application may use the app access token for authentication to fetch authorized resources from the OAuth provider.

1. App access token is verified and the requested OAuth provider’s resources are sent back to the application.
> #This isn’t easy!

To do this yourself, you will have to perform the same workflow for every OAuth provider you wish to authenticate with. The best tool that we’ve found to help manage all these connections is [AuthO](https://auth0.com). We’ll be using this tool for the GraphQL walkthrough to help us set up OAuth.

Today, we’ll explore two of the most popular social providers:
> **Facebook** and **Google**.

Here’s the agenda:

1. Create an AuthO account.

1. Configure Facebook and Google connections.

1. Use AuthO account keys to configure an AuthO integration on [Scaphold](https://scaphold.io).

1. Obtain access token from Facebook client SDK, and send GraphQL request.

1. Store JSON Web Token (JWT) as Authorization header in HTTP requests.

1. Once logged in, send another GraphQL request with access token from Google+ client SDK to link both social authentication credentials.

1. Voilá!

Let’s start by [creating a free AuthO account](https://auth0.com/).

This will help you manage your app credentials like client IDs and secrets for your OAuth providers. By connecting your apps on your social accounts like Facebook, Google, and Twitter, you’ll then have the correct account credentials to utilize these services for your authentication flow.

![](https://medium2.global.ssl.fastly.net/max/2108/1*m6v9ZObyg-G0l9Sy_gM8Bg.png)

For more information on configuring your social connections on AuthO, check out these guides: [Facebook](https://auth0.com/docs/connections/social/facebook) / [Google](https://auth0.com/docs/connections/social/google)

Once you’ve tested out your connections to see that they work, **save your AuthO Domain, Client ID, and Client Secret**.

![](https://medium2.global.ssl.fastly.net/max/4328/1*MM_c0de72Sy1QFhE3h5hKA.png)

Next, **configure AuthO in [Scaphold](https://scaphold.io)** from the [integrations portal](https://scaphold.io/apps) to include the OAuth providers that you plan to use for your app. This will enable a new mutation in your schema called **loginUserWithAuthO** which you can use to log in users with connected OAuth providers.

![](https://medium2.global.ssl.fastly.net/max/2000/1*_uZSNHle8gFjGibs40ze9A.png)

In your client app, you’ll likely be using a client SDK to handle user login. For instance, you can use the [Facebook SDK for React Native](https://github.com/facebook/react-native-fbsdk) to ask your users to log in with their existing Facebook accounts. Your app will redirect them to a Facebook sign-in page and once this succeeds, you’ll receive an **access token** that you’ll send to [Scaphold](https://scaphold.io).

    const FBSDK = require('react-native-fbsdk');
    const {
      LoginButton,
      AccessToken
    } = FBSDK;

    var Login = React.createClass({
      render: function() {
        return (
          <View>
            <LoginButton
              publishPermissions={["publish_actions"]}
              onLoginFinished={
                (error, result) => {
                  if (error) {
                    alert("login has error: " + result.error);
                  } else if (result.isCancelled) {
                    alert("login is cancelled.");
                  } else {
                    AccessToken.getCurrentAccessToken().then(
                      (data) => {
                        // Send Access Token to Scaphold (shown below)
                        alert(data.accessToken.toString())
                      }
                    )
                  }
                }
              }
              onLogoutFinished={() => alert("logout.")}/>
          </View>
        );
      }
    });

Given the Access Token, here’s the **GraphQL mutation you can use to log your user in** to [Scaphold](https://scaphold.io) with Facebook’s OAuth flow:

    // GraphQL Mutation

    mutation loginUserWithAuth0Query($data:_LoginUserWithAuth0Input!){
        loginUserWithAuth0 (input: $data){
            access_token
            id_token
            token_type
        }
    }

    // Variables

    {
        “data”: {
            “access_token”: *"*xxxxxxxxxxx*"*, // Access token from above
            “connection”: “facebook”
        }
    }

Once you’ve sent that request, the response should resemble this:

![](https://medium2.global.ssl.fastly.net/max/2060/1*nliLmln08Mz8Gt2a9oFTqQ.png)

After [Scaphold](https://scaphold.io) verifies the access token with the OAuth provider (i.e. Facebook), we’ll pass back the newly created **JSON Web Token (JWT)** that you’ll need to **add to your Authorization header** for future requests. That way, Scaphold will be able to authorize you to make future requests through Scaphold, and it will also provide us the capability to work on that user’s behalf to access the OAuth provider’s resources. In this case, we could authorize you to access their Facebook friends and their public profile information.

![](https://medium2.global.ssl.fastly.net/max/3768/1*jsdxkaFnzI6uVBCyyTglXg.png)

In addition, if you’ve logged in already and you make the same request again but with a new OAuth provider (i.e. Google), Scaphold will **link your two accounts together**, since we know the requests being made belong to the same user.

In a similar fashion to the Facebook work flow from earlier, you’ll likely use a [client SDK for Google sign-in](https://github.com/devfd/react-native-google-signin). Upon logging in, you’ll receive an access token like so:

    GoogleSignin.signIn().then((user) => {
        // Send Access Token to Scaphold (shown below)
        console.log(user.accessToken);
        this.setState({user: user});
    }).catch((err) => {
        console.log('WRONG SIGNIN', err);
    }).done();

With this access token, you’ll **send a GraphQL request to Scaphold with “google_oauth2” as the connection name**.

![](https://medium2.global.ssl.fastly.net/max/2060/1*EvD-SRatszi3qAVn50QLrQ.png)

Congratulations! Now, you’ll have access to both Facebook and Google information using your users’ Facebook and Google account credentials. Thanks for checking this out, and **FOLLOW US** for more tutorials on simple ways to get started with GraphQL!

![](https://medium2.global.ssl.fastly.net/max/2000/1*i2qpiJvi9FBPfq--ITzILg.png)
