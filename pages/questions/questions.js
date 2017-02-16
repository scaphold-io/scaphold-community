import React from 'react';
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';

import CreateApp from '../images/questions/Create_App.png';
import CreateAppModal from '../images/questions/Create_App_Modal.png';

export default [
  {
    title: 'How do I upload files from react native?',
    description: 'Upload files with react native',
    askedBy: 'Janet Zhu',
    author: 'Rohit Ravikoti',
    createdAt: '2017-02-05',
    tags: ['GraphQL', 'Files', 'react-native'],
    url: '/questions/uploading-files-from-react-native/',
    answer: (
      <div>
        <p>
          Uploading files from react-native is simple! Here is a code snippet that can get you
          started.
        </p>
        <pre className="language-javascript">
          <code className="language-javascript">
            {`// You must also install these npm modules:
// npm install --save react-native-fetch-blob
// react-native link react-native-fetch-blob
import RNFetchBlob from 'react-native-fetch-blob';

RNFetchBlob.fetch(
  'POST',
  "https://us-west-2.api.scaphold.io/graphql/scaphold-graphql",
  {
    Authorization : "Bearer " + scapholdAuthToken,
    'Content-Type' : 'multipart/form-data',
  },
  [
    {
      name : 'query',
      data : \`
        mutation CreateFile($input: CreateFileInput!) {
          createFile(input: $input) {
            changedFile {
              id
              blobMimeType
              blobUrl
              user {
                id
              }
            }
          }
        }
      \`
    },
    {
      name : 'variables',
      data : JSON.stringify({
        "input": {
          "name": "Mark Zuck Profile Picture",
          "userId": "VXNlcjoxMA==",
          "blobFieldName": "myBlobField"
        }
      })
    },
    {
      name : 'myBlobField',
      filename : 'profile',
      data: RNFetchBlob.wrap(filePath),
    },
  ]
);`
            }
          </code>
        </pre>
      </div>
    ),
  },
  {
    title: 'How to implement authentication using GraphQL?',
    description: 'Authentication with GraphQL',
    askedBy: 'Jordan Gonen',
    author: 'Michael Paris',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Authentication', 'OAuth'],
    url: '/questions/authentication-with-graphql/',
    answer: (
      <div>
        <p>
          Authentication with GraphQL can be handled in many ways. The standard is currently token
          authentication using JSON Web Tokens (JWT). To authenticate requests in Scaphold's
          and many other GraphQL APIs you will include a JWT under the Authorization key in
          the request header. For example, it might look like this.
        </p>
        <pre>
          <code>
            {'{ Authentication: Bearer YOUR_JWT_TOKEN }'}
          </code>
        </pre>
        <p>
          When a web server receives your request, it will use information encoded in the JWT to
          authenticate the request as having come from a particular user in the application. Once
          the top level server (such as Express) parses the JWT and fetches the relevant user from
          the database, the user object is often passed into GraphQL via the context. Having the
          user in the GraphQL context then allows you to do much more advanced query specific
          Authorization.
        </p>
        <p>
          There are many way to authenticate and authorize users in your Scaphold API.
          <a href="https://scaphold.io/docs/#permissions-authorization" target="_blank">For more
          details, see the docs!</a>
        </p>
      </div>
    ),
  },
  {
    title: 'How to add social authentication to Scaphold',
    description: 'Integrate social login with your application. It only takes a few seconds.',
    askedBy: 'brandonmp',
    author: 'Michael Paris',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Authentication', 'OAuth', 'Auth0'],
    url: '/questions/scaphold-social-login/',
    answer: (
      <div>
        <p>
          Social authentication with Scaphold is easy! The quickest way to get started is to use
          <a href="https://auth0.com/docs/libraries/lock" target="_blank"> Auth0 Lock</a>. Here
          is a code snippet showing all the pieces.
        </p>
        <pre>
          <code className="language-javascript">
            {`
            auth0Lock.on('authenticated', (authResult) => {
              auth0Lock.getUserInfo(authResult.accessToken, (error, profile) => {
                const networkInterface = createNetworkInterface({
                  uri: 'https://us-west-2.api.scaphold.io/graphql/lewd-plastic',
                });
                networkInterface.use([{
                  applyMiddleware(request: any, next: Function) {
                    if (!request.options.headers) {
                      request.options.headers = {};
                    }
                    request.options.headers.authorization = \`Bearer \${authResult.idToken}\`;
                    next();
                  },
                }])
                const query = gql\`
                        mutation Login($cred:LoginUserWithAuth0LockInput!) {
                            loginUserWithAuth0Lock(input:$cred) {
                                user {
                                    id
                                    username
                                }
                            }
                        }
                    \`
                const client: ApolloClient = new ApolloClient({ networkInterface })
                const mutationVariables = {
                  cred: {
                    access_token: authResult.accessToken,
                    identity: profile.identities[0],
                  },
                }
                client.mutate({ mutation: query, variables: mutationVariables })
                  .then((queryResult) => {
                    console.log(queryResult)
                  });
              })
            })
            `
          }
          </code>
        </pre>
        <p>
          Lock will call out to Auth0 and you will pass the accessToken and the returned social
          identity to Scaphold where we will register them as a credential with a Scaphold user.
          You can use the JWT returned from Auth0 directly so no need to wait for a token from
          Scaphold as we will authenticate using the same token.
        </p>
      </div>
    ),
  },
  {
    title: 'What companies are using GraphQL in production?',
    description: 'Companies that use GraphQL at scale.',
    askedBy: 'Gina Lynch',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Production'],
    url: '/questions/companies-using-graphql-in-production/',
    answer: (
      <div>
        <p>
          More and more large companies are using GraphQL in production! Apart from Facebook
          (since they created the technology), companies like Twitter, The Financial Times, Intuit,
          have already adopted GraphQL as the standard for their backends and running it at scale.
        </p>
        <p>
          Here's a high level overview of the companies using GraphQL in the industry:
        </p>
        <p>
          <ul>
            <li>Facebook</li>
            <li>GitHub</li>
            <li>Pinterest</li>
            <li>Twitter</li>
            <li>The Financial Times</li>
            <li>Intuit</li>
            <li>Beek.io</li>
            <li>CreditKarma</li>
            <li>Concur</li>
            <li>Coursera</li>
            <li>Hudl</li>
            <li>Conde Nast</li>
            <li>Salesforce</li>
          </ul>
        </p>
        <p>
          As a matter of fact, GitHub has spearheaded the movement in the industry by providing the
          first-ever public GraphQL API for their source control platform so you can make commits,
          pull requests, and star repositories all through GraphQL.
        </p>
        <p>
          A more complete list of companies using GraphQL in production can be found at the
          <a href="http://graphql.org/users/" target="_blank">
            &nbsp;official GraphQL.org website.
          </a>
        </p>
      </div>
    ),
  },
  {
    title: 'What\'s the easiest way to integrate a third-party service with GraphQL?',
    description: 'Integrate 3rd-party services (i.e. Stripe, Auth0) with GraphQL',
    askedBy: 'Gina Lynch',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', '3rd-Party Service', 'Integration'],
    url: '/questions/easiest-way-to-integrate-a-third-party-service-with-graphql/',
    answer: (
      <div>
        <p>
          GraphQL is data source agnostic. This means that GraphQL is not opinionated on
          where you are supplying your data from, whether it be through a cloud-hosted database,
          on-premise database, or even another 3rd-party cloud service. Normally, cloud services
          are built with REST, meaning there are a whole slew of endpoints and you must sift
          through their entire documentation to understand what data you can retrieve. And at the
          end of the day, you'll have to essentially map their REST endpoints to individual GraphQL
          queries and mutations for your frontend app.
        </p>
        <p>
          If you're not particularly fluent in mapping a REST API to a GraphQL query, you
          can easily accomplish this with Scaphold by storing your API keys in our integrations
          portal, and violá - you now have GraphQL queries and mutations that map exactly to the
          API of the third-party-service. You can read more about individual integrations
          that <a href="https://scaphold.io/docs/#integrations" target="_blank">we have available here</a>.
        </p>
      </div>
    ),
  },
  {
    title: 'GraphQL Analytics',
    description: 'Solutions for analyzing your GraphQL API.',
    askedBy: 'Jordan Gonen',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Analytics', 'Production'],
    url: '/questions/graphql-analytics/',
    answer: (
      <div>
        <p>
          If you're running GraphQL in production, chances are you're probably looking for analytics
          solutions so you can monitor your GraphQL API when it matters.
        </p>
        <p>
          The best solution so far that targets GraphQL backends is <a href="http://www.apollodata.com/optics" target="_blank">Apollo Optics</a>.
          It provides a wonderful GUI dashboard that will allow you to understand which parts
          of your GraphQL queries slows down your request time the most, so you can optimize
          how you fetch your data.
        </p>
        <img src="http://www.apollodata.com/images/ss-optics-apollodata-660x560@2x.png" alt="Apollo Optics Dashboard" />
        <p>
          Apart from that, Scaphold has built an in-house analytics service so that you can monitor
          your Scaphold apps in production. In addition to a dashboard that displays your data
          storage, response times, and traffic, you can also get granular information with raw logs
          of traffic that goes through your API.

          Pairing this with Apollo Optics analytics gives you the best of both worlds: fine-tuned
          query monitoring, as well as detailed overall system metrics. Your users will certainly
          appreciate it.
        </p>
      </div>
    ),
  },
  {
    title: 'Can I use social logins with GraphQL?',
    description: 'GraphQL and Auth0 Authentication.',
    askedBy: 'Ankit Singh',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Auth0', 'Social', 'Lock'],
    url: '/questions/graphql-auth0-social-authentication/',
    answer: (
      <div>
        <p>
          Social login work similarly to normal login flows through GraphQL.
          But first you must understand how OAuth works. OAuth has become the industry
          standard for most social logins (i.e. Facebook, Google, GitHub, etc...), and
          it's a way for a 3rd-party service to be able to authenticate you on behalf of
          an auth provider. There are two main ways to accomplish this on Scaphold.
        </p>
        <ol>
          <li>
            <h5><b>Use a service like Auth0 Lock.</b></h5>
            <p>
              This is a very convenient service that Auth0 provides. It's essentially a
              client-side login form that provides hooks to each social auth provider.
              Once your user logs in, you'll receive an <code>id_token</code>, upon which
              you will send it through the mutation <code>loginWithAuth0Lock</code> to Scaphold.
            </p>
          </li>
          <li>
            <h5><b>Roll your own client-side flow.</b></h5>
            <p>
              When you authenticate via an OAuth provider through their client-side SDK,
              you will receive an <code>access_token</code>, upon which you will send it
              through the mutation <code>loginWithAuth0Social</code> to Scaphold.
            </p>
          </li>
        </ol>
        <p>
          In both cases, once Scaphold verifies that this token is valid, Scaphold will
          issue you a JWT token just like the normal login flow, and you can then store it in
          local storage and send it with every request in the header.
        </p>
        <p>
          You can read more about how Scaphold does social login
          through <a href="/blog/social-auth-graphql/">our blog post here</a>. You
          can also check out our <a href="https://scaphold.io/docs/#social-auth" target="_blank">
          detailed docs here</a>.
        </p>
      </div>
    ),
  },
  {
    title: 'How to implement mobile push notifications with GraphQL?',
    description: 'GraphQL & mobile push notifications.',
    askedBy: 'seanpcheng',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Android', 'iOS', 'Push'],
    url: '/questions/graphql-mobile-push-notifications/',
    answer: `
      Android and iOS mobile push notifications can be a crucial part of your mobile applications. However, it's
      definitely not the easiest process to set up, let alone setting it up with GraphQL.
      Normally, you'd have to save your authentication key file to be able to interact with
      GCM or APNS for push notifications as well as manage your device tokens. With Scaphold, you can
      upload your key in the integrations portal, and you'll immediately be able to push to other
      users in your app. Scaphold stores the key on AWS and you can start pushing device tokens
      that associate with your currently authenticated user. From then on, you can send Android or iOS push
      notifications directly to users given their IDs with the exposed GraphQL mutations and that user will
      receive the push notification on his or her device.
    `,
  },
  {
    title: 'GraphQL vs. REST',
    description: 'Main differences between GraphQL and REST.',
    askedBy: 'Jordan Gonen',
    answeredBy: 'Jacob Gillespie',
    createdAt: '2017-01-01',
    tags: ['GraphQL', 'REST', 'API'],
    url: '/questions/graphql-vs-rest/',
    isMarkdown: true,
    answer: `
##From REST to GraphQL

*Source: [0x2a.sh](https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b)*

**Disclaimer:** GraphQL is still new and best practices are still emerging. This post describes some of my journey with implementing a GraphQL backend service, so it is a snapshot of what I’ve learned so far, presented in the hopes that it will be useful to others. Also, some of the specific real-world implementation details internal to Playlist have been paraphrased / simplified / anonymized for obvious reasons.

This post assumes a basic familiarity with GraphQL. If you are not already familiar with GraphQL:

[**GraphQL: A data query language**](https://code.facebook.com/posts/1691455094417024/graphql-a-data-query-language/)

##REST

At Playlist, we have a Rails / REST-based API that powers the app. When it was created initially, we used Github’s V3 API as an inspiration and generally modeled our API structure after theirs.

Need track information?

    GET /tracks/ID

Need to fetch a playlist?

    GET /playlists/ID

Need a playlist’s tracks?

    GET /playlists/ID/tracks

It had the benefit of simplicity — endpoints are intuitively named and can be browsed easily. Initially we even implemented URL properties on all objects so the API was browsable just by clicking (this was eventually removed in favor of smaller response payloads). Documentation described what was returned by each endpoint so our mobile team could easily integrate.

###Bloat and Slowdowns

However, as time passed, payloads got larger as requirements grew. As an example, here is a simplistic playlist object response:

\`\`\`
{
    "created_at": "2015-08-30T00:50:25.000+00:00",
    "id": "e66637db-13f9-4056-abef-f731f8b1a3c7",
    "like_count": 3,
    "liked_count": 3,
    "name": "Excuse me while I kiss these frets",
    "owner": {
        "avatar_url": "https://secure.gravatar.com/avatar/4ede0ad35bb796ea8f78861acc4372ca?s=300",
        "bio": null,
        "id": "b06e671a-b169-45e6-a645-74c31abca910",
        "login": "playlistrock",
        "name": "Playlist Rock",
        "site_admin": false
    },
    "published": false,
    "saved_count": 3,
    "track_count": 50,
    "updated_at": "2015-09-30T06:11:49.000+00:00"
}
\`\`\`

It contains all the basic information about the playlist, but (almost) none of the associated objects. As a client, you would be expected to call other endpoints like */playlist/ID/tracks* to fetch sub-resources.

As more associations were added, more data kept getting stuffed into the playlist response. Specifically, because we used Rails and ActionView partials, more data was added to the *_playlist.json.jbuilder* partial as lists of playlists needed more and more data.

Mobile requirements would state something like “we need to show the first three tags for each user playlist when displaying a user’s profile,” so rather than call */users/USERNAME/playlists*, then have to make an HTTP request to */playlists/ID/tags* once for each returned playlist, the tags got added to the playlist partial.

\`\`\`
{
    "created_at": "2015-08-30T00:50:25.000+00:00",
    "genres": [],
    "id": "e66637db-13f9-4056-abef-f731f8b1a3c7",
    "like_count": 3,
    "liked_count": 3,
    "name": "Excuse me while I kiss these frets",
    "owner": {
        "avatar_url": "https://secure.gravatar.com/avatar/4ede0ad35bb796ea8f78861acc4372ca?s=300",
        "bio": null,
        "id": "b06e671a-b169-45e6-a645-74c31abca910",
        "login": "playlistrock",
        "name": "Playlist Rock",
        "site_admin": false
    },
    "published": false,
    "saved_count": 3,
    "tags": [
        {
            "name": "Jimi Hendrix"
        },
        {
            "name": "Jimmy Page"
        },
        {
            "name": "Eric Clapton"
        },
        {
            "name": "Slash"
        },
        {
            "name": "Stevie Ray Vaughan"
        }
    ],
    "track_count": 50,
    "updated_at": "2015-09-30T06:11:49.000+00:00"
}
\`\`\`

Eventually, we got to something like the following for a */playlists/ID* response:

\`\`\`
{
    "collaborators": [],
    "created_at": "2015-08-30T00:50:25.000+00:00",
    "genres": [],
    "id": "e66637db-13f9-4056-abef-f731f8b1a3c7",
    "like_count": 3,
    "liked": true,
    "liked_count": 3,
    "name": "Excuse me while I kiss these frets",
    "owner": {
        "avatar_url": "https://secure.gravatar.com/avatar/4ede0ad35bb796ea8f78861acc4372ca?s=300",
        "bio": null,
        "id": "b06e671a-b169-45e6-a645-74c31abca910",
        "login": "playlistrock",
        "name": "Playlist Rock",
        "site_admin": false
    },
    "published": false,
    "saved": true,
    "saved_count": 3,
    "tags": [
        {
            "name": "Jimi Hendrix"
        },
        {
            "name": "Jimmy Page"
        },
        {
            "name": "Eric Clapton"
        },
        {
            "name": "Slash"
        },
        {
            "name": "Stevie Ray Vaughan"
        }
    ],
    "track_count": 50,
    "tracks": [
        {
            "album": {
                "id": "8d8223c6-284c-4aac-92bd-b31debca3237",
                "title": "Toys In The Attic"
            },
            "artists": [
                {
                    "id": "6c29ff27-ad20-4448-9961-f6617e393539",
                    "name": "Aerosmith"
                }
            ],
            "explicit": false,
            "have_liked": false,
            "id": "a1f9f37a-2a15-407d-82f8-e742ab5e3b81",
            "title": "Walk This Way"
        },
        {
            "album": {
                "id": "21a9f63b-a38f-40f1-aaf1-8b7ed3ad1a92",
                "title": "Audioslave"
            },
            "artists": [
                {
                    "id": "7d600588-d073-41e9-a4f7-434501b16c45",
                    "name": "Audioslave"
                }
            ],
            "explicit": false,
            "have_liked": false,
            "id": "4cc1fc43-61e8-49a7-be42-9d7ad35c1284",
            "title": "Like A Stone"
        },
        ...
    ],
    "updated_at": "2015-09-30T06:11:49.000+00:00"
}
\`\`\`

Here we’re embedding tracks and even a subset of their associations, with enough data to cover all the *possible* places an individual playlist could appear. And this data was returned for *every* place the playlist appeared.

This was a conscious design decision to augment responses rather than add more endpoints — we could have done something like */playlists/ID/forProfile*, */playlists/ID/forNotifications*, etc.

![Add Fields To View](https://medium2.global.ssl.fastly.net/max/2000/1*PCmjoaWoZCcqPwQUEJWEJA.jpeg)

There is something to be said for the simplicity that provides. To add a field to a track, for example, you locate the *_track.json.jbuilder* partial and add the additional field. However as views grew, performance quickly became an issue in two distinct ways.

**First**, response payloads were large, to the point that the mobile app sometimes struggled with the amount of effort it took to parse, deserialize, and store the JSON. Response times were longer, caches were larger, and every change to a small partial expanded to a much larger change all over the app.

**Second**, query performance took a hit as more and more data (especially relationships) were fetched for each request. In development with caching disabled, a single request for a playlist can request upwards of 170 database queries to pull all the relevant information.

In production, we made heavy use of Rails “Russian Doll” style caching, so for a fully cached playlist there is only one database query involved. Still, on that first load it had to execute those 170 queries to build the full response (usually fewer thanks to Russian doll caching and shared sub-resources).

[**Caching with Rails: An Overview - Ruby on Rails Guides**](http://edgeguides.rubyonrails.org/caching_with_rails.html#russian-doll-caching)

What pushed us over the edge was the *have_liked* field above. This was a boolean field indicating whether or not the currently authenticated user had liked the track. Product requirements stated that this field had to be accessible on the playlist detail view, and thus had to be included in the playlist response for each track.

This broke the Russian doll caching.

The *_track.json.jbuilder* partial became a combination of a cached portion containing “static” information about the tracks and an uncached portion containing the call to *current_user.have_liked?(track)*. Subsequently, *_playlist.json.jbuilder* and every view that referenced the track partial transformed similarly to contain a cached portion and an uncached portion.

Worse still, for a playlist request with 50 tracks, 50 calls to *have_liked?* were executed (N+1 query bug).

We had several different possible solutions, including separate sub-resource view files for separate endpoints, custom query cache management to reduce the number of additional queries, etc. However, we wanted a solution that addressed both issues and allowed for greater control.

##GraphQL

<a href="https://0x2a.sh/from-rest-to-graphql-b4e95e94c26b" rel="canonical">Continue reading on 0x2a.sh</a>

One more thing — check out this video. It was immensely helpful for me in understanding some of the benefits of GraphQL and its real-world implementation at the Financial Times.

<div class="text-center">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/S0s935RKKB4" frameborder="0" allowfullscreen></iframe>
</div>

If you have any questions, comments, pieces of advice, whatever, feel free to get in touch [@jacobwgillespie](https://twitter.com/jacobwgillespie) on Twitter or at [jacobwgillespie@gmail.com](mailto:jacobwgillespie@gmail.com).
    `,
  },
  {
    title: 'How to create an app on Scaphold?',
    description: 'Steps to create a Scaphold app.',
    askedBy: 'seanpcheng',
    answeredBy: 'Vince Ning',
    createdAt: '2016-10-10',
    tags: ['GraphQL', 'Create', 'App'],
    url: '/questions/how-to-create-a-graphql-app-on-scaphold/',
    answer: (
      <div>
        <p>
          Creating an app on Scaphold is simple! We've streamlined the process into 3 simple steps:
        </p>
        <ol>
          <li>
            Go to <a href="https://scaphold.io?signupModal=true&source=community">Scaphold.io</a> and sign up for a free account.
          </li>
          <li>
            Click <code>Create App</code> on the Apps Dashboard.
            A form will drop down asking you for details about your app.
          </li>
          <div style={{ textAlign: 'center' }}>
            <img src={CreateApp} alt="Create app" height="400px" />
          </div>
          <li>
            Fill out the form with your desired app name, description, and alias,
            and select the <code>Create</code> button.
          </li>
          <div style={{ textAlign: 'center' }}>
            <img src={CreateAppModal} alt="Create app modal" height="400px" />
          </div>
        </ol>
        <p>
          Violá! You will now be directed to the Schema Designer, and your GraphQL app
          is instantly deployed with a basic GraphQL schema visually represented
          in the Scaphold portal. You now have authentication, ability to execute
          complex queries, real-time subscriptions, analytics, and much more right
          out of the box with your GraphQL app that abides by the open standard down
          to the Relay spec.
        </p>
      </div>
    ),
  },
  {
    title: 'How to handle payments with GraphQL?',
    description: 'Using the Stripe integration.',
    askedBy: 'Ankit Singh',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Integration', 'Stripe'],
    url: '/questions/how-to-handle-payments-with-graphql/',
    answer: (
      <div>
        <p>
          On Scaphold, you can easily integrate payments through GraphQL by enabling the
          Stripe integration. After connecting your Stripe account with Scaphold through
          the integrations portal, you'll have the full power fo Stripe to be able to work
          with customers, charges, subscriptions, and more, just as you would if you were
          using Stripe's REST API. This way all your payments are now standardized through
          GraphQL and sit alongside the rest of your queries and mutations.
        </p>
        <p>
          We've built a small donations site at <a href="https://give.scaphold.io/" target="_blank">https://give.scaphold.io</a> and <a href="https://github.com/scaphold-io/save-the-world-tutorial" target="_blank">open sourced the code here</a> so
          you can see how payments work in a real live application.
        </p>
        <p>
          You can read more about implementation details <a href="https://scaphold.io/docs/#payments" target="_blank">here in our documentation</a> as well.
        </p>
      </div>
    ),
  },
  {
    title: 'How to implement custom business logic with AWS Lambda and GraphQL?',
    description: 'Using AWS Lambda with Scaphold.',
    askedBy: 'Ankit Singh',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'AWS Lambda', 'Custom'],
    url: '/questions/how-to-implement-custom-business-logic-with-aws-lambda/',
    answer: (
      <div>
        <p>
          On Scaphold, you can easily implement custom logic (i.e. business logic) for your
          app workflow through GraphQL by enabling the Custom integration. There's a couple
          steps involved:
        </p>
        <ol>
          <li>
            Host your custom logic on a cloud provider like <a href="https://aws.amazon.com/lambda/" target="_blank">AWS Lambda</a> or <a href="https://azure.microsoft.com/en-us/services/functions/" target="_blank">Azure Functions</a>.
            You may also host it yourself anywhere as long as you get a URL that Scaphold
            can make a request to.
          </li>
          <li>
            With the URL that points to your hosted microservice, enable the Custom integration
            on Scaphold and define the configuration for the data you want sent over to your
            webhook, and when you want it to fire.
          </li>
        </ol>
        <p>
          We've written up a short tutorial on <a href="blog/pokemon-go-graphql-with-aws-lambda/" target="_blank">how to get set up with AWS Lambda here</a>.
        </p>
        <p>
          You can read more about implementation details <a href="https://scaphold.io/docs/#webhooks" target="_blank">here in our documentation</a> as well.
        </p>
      </div>
    ),
  },
  {
    title: 'How to send emails with GraphQL?',
    description: 'Using the Mailgun integration.',
    askedBy: 'Vince Ning',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Integration', 'Mailgun'],
    url: '/questions/how-to-send-emails-with-graphql/',
    answer: (
      <div>
        On Scaphold, you can easily send emails through GraphQL by enabling the Mailgun integration.
        After connecting your Mailgun account with Scaphold through the integrations portal, you'll
        have the full power of Mailgun, so you'll be able to work with mailing lists, email
        addresses, and send emails. This can be applied in all sorts of places in your app
        workflow, perhaps as a way to welcome new users once they've signed up. You can read more
        about implementation details <a href="https://scaphold.io/docs/#email" target="_blank">here in our documentation</a>.
      </div>
    ),
  },
  {
    title: 'Best way to migrate data to Scaphold',
    description: 'Moving to Scaphold from another service.',
    askedBy: 'Vince Ning',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Migration', 'BaaS'],
    url: '/questions/migrating-data-to-scaphold/',
    answer: (
      <div>
        <p>
          The best way to migrate data to Scaphold currently is through a couple steps:
        </p>
        <ol>
          <li>
            Dump your data into a CSV or JSON format. Doesn't really matter which - it should be
            standard so that your script can work.
          </li>
          <li>
            Make sure you remove your old IDs upon inserting your data into Scaphold. Each time
            a new piece of data is inserted, you'll receive a new globally unique opaque ID. Take
            this ID and update it across your app's data so that connections will work automatically
            in your Scaphold app with your data.
          </li>
        </ol>
        <p>
          We're working on a way for you to be able to migrate your data from various databases
          directly, and we'd love your suggestions!
        </p>
      </div>
    ),
  },
  {
    title: 'What is GraphQL?',
    description: 'Conceptual idea behind GraphQL.',
    askedBy: 'Vince Ning',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Facebook'],
    url: '/questions/what-is-graphql/',
    isMarkdown: true,
    answer: `
GraphQL is a new application level query language recently released by Facebook.
Since its release, developer communities around the world have speculated that GraphQL
may very well be the future of APIs. Particularly, the ReactJS community has embraced
GraphQL as a more functional replacement for REST. Coupled with the growing popularity
of RelayJS, a GraphQL-optimized network layer for ReactJS apps, adoption has been
accelerated tremendously. Our mission at Scaphold is to champion GraphQL so that you,
the technological creators of the world, can begin to use this awesome technology.
The Scaphold platform offers a feature-rich, backend solution that empowers any developer
to start building GraphQL-powered apps in just a few clicks. Sign up today at
[Scaphold.io](https://scaphold.io) to get started!
    `,
  },
  {
    title: 'How do real-time GraphQL Subscriptions work?',
    description: 'Conceptual idea behind GraphQL.',
    askedBy: 'seanpcheng',
    answeredBy: 'Vince Ning',
    createdAt: '2016-12-15',
    tags: ['GraphQL', 'Real-time', 'Subscriptions'],
    url: '/questions/how-do-real-time-graphql-subscriptions-work/',
    isMarkdown: true,
    answer: `
GraphQL Subscriptions are a way for you to enable real-time functionality into your app.
Subscriptions offer a clean and efficient way to get pushed updates as they happen.
They act in parallel to mutations. Just like how mutations describe the set of actions
you can take to change your data, subscriptions define the set of events that you can
subscribe to when data changes. In fact, you can think of subscriptions as a way to react
to mutations that are performed on your server.

For example, consider building an application like Slack. It's a core functionality to
provide a chat feature for your users, and these messages need to show up on the user's
screen without having the user refresh the page each time a new message is sent. This is
where Subscriptions play a huge part. Whenever a user sends a new message, the server
immediately pushes data to each client that is subscribed to that event. This is done
through web sockets and each client has an open connection to the server.

To build an app like Slack, we need to be able to say:

> Hey, every time someone posts a new message to a channel I am a member of, tell me!
  With subscriptions we can do this by issuing a query like this:

    subscription SubscribeToNewMessage($messageFilter: MessageWhereArgs) {
      subscribeToMessage(mutations:[createMessage], filter: $messageFilter) {
        mutation
        value {
          id
          content
        }
      }
    }

This will allow the client to open a connection with the server to listen for new messages
that are created, and the client will immediately receive the info of the new message
once it's sent.

In Scaphold, you can provide complex filters and return connections as well in your
returned payload. And each new type that you create in your schema that implements the Node
interface will be automatically be added to your list of Subscriptions you can call in your app.

Not only can you create chat apps like Slack or WhatsApp, but you can also create hi-fidelity
dashboards, real-time games, and virtual reality apps. The possibilities are endless!
    `,
  },
  {
    title: 'What is Scaphold?',
    description: 'GraphQL backend as a service.',
    askedBy: 'Jordan Gonen',
    answeredBy: 'Vince Ning',
    createdAt: '2016-11-15',
    tags: ['GraphQL', 'Scaphold'],
    url: '/questions/what-is-scaphold/',
    answer: (
      <div>
        <h2><b>Scaphold is...</b></h2>
        <p>
          A GraphQL backend as a service that helps you rapidly develop apps and launch
          them into production in a matter of minutes. We provide a several key features and tools
          that help you build apps faster than ever before.
        </p>
        <img src="https://assets.scaphold.io/v2/Scaphold_Landing.png" alt="Scaphold.io" />
        <hr />
        <p>
          We're always improving the platform, but some of our best features include:
        </p>
        <ol>
          <li>
            <b>Deploy in seconds</b>
            <p>Spin up a scalable GraphQL server in 30 seconds. No coding required.</p>
          </li>
          <li>
            <b>Easily model complex data</b>
            <p>
              Creating your data model with Scaphold's intuitive Schema Designer is a breeze.
              Highly-available infrastructure is automatically configured to fit your needs.
            </p>
          </li>
          <li>
            <b>Integrate popular services</b>
            <p>
              Integrate the services you need to build your business.
              Push notifications, payments, email, and more are available in a single click!
            </p>
          </li>
          <li>
            <b>Real-time with 0 setup</b>
            <p>
              Your app is real-time out of the box. Use GraphQL Subscriptions to easily create
              messaging apps, real-time games, and more!
            </p>
          </li>
          <li>
            <b>Teams work together</b>
            <p>
              Awesome apps are built by awesome teams! Scaphold allows teams of any size to
              collaborate seamlessly.
            </p>
          </li>
          <li>
            <b>Unbeatably fast global network</b>
            <p>
              Your data should live close to your users. Deploy your apps in the region that
              provides the best experience for your customers.
            </p>
          </li>
          <li>
            <b>Custom business logic</b>
            <p>
              You can easily implement custom logic (i.e. business logic) for your app workflow
              through GraphQL.
            </p>
          </li>
        </ol>
        <p>
          Thousands of developers and engineering teams trust Scaphold to power their
          apps of all kinds. Whether you're building a web, mobile, IOT, or virtual
          reality app, we've got you covered.
        </p>
        <p>
          To learn more about how to get started fast, <a href="https://scaphold.io/community/learn" target="_blank">
          check out some of resources</a> we've recently added the site and <a href="https://scaphold.io" target="_blank">create awesome apps today</a>.
          Be on the lookout for new features as we release new updates daily.
          And if you have any questions or need help getting started, please <a href="http://slack.scaphold.io" target="_blank">join our Slack</a> or <a href="mailto:hi@scaphold.io">
          email us!</a>
        </p>
      </div>
    ),
  },
  {
    title: 'When is GraphQL Summit?',
    description: 'Looking to attend a GraphQL event?',
    askedBy: 'Ankit Singh',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-06',
    tags: ['GraphQL', 'Events'],
    url: '/questions/when-is-graphql-summit/',
    answer: (
      <div>
        <p>
          GraphQL Summit is an event held annually and hosted by the Meteor Development Group.
          The conference attracts a whole host of influencers in the GraphQL community and
          features talks about GraphQL standards and future features.
        </p>
        <p>
          The first-ever GraphQL Summit was held in late August 2016, and the next one will be
          held in the fall of 2017. You can <a href="http://www.graphql.com/summit/" target="_blank">read more about the details
          as they unveil here.</a>
        </p>
      </div>
    ),
  },
  {
    title: 'How to implement custom business logic with Scaphold Logic?',
    description: 'Using a microservice with Scaphold.',
    askedBy: 'Rohit Ravikoti',
    answeredBy: 'Michael Paris',
    createdAt: '2017-01-09',
    tags: ['GraphQL', 'Microservice', 'Custom', 'Business'],
    url: '/questions/how-to-implement-custom-business-logic-with-graphql/',
    answer: (
      <div>
        <p>
          On Scaphold, you can easily implement custom logic (i.e. business logic) for your
          app workflow through GraphQL via Scaphold's Logic page. There's a couple basic
          steps involved:
        </p>
        <ol>
          <li>
            Host your custom logic on a cloud provider like <a href="https://aws.amazon.com/lambda/" target="_blank">AWS Lambda</a> or <a href="https://azure.microsoft.com/en-us/services/functions/" target="_blank">Azure Functions</a>.
            You may also host it yourself anywhere as long as you get a URL that Scaphold
            can make a request to.
          </li>
          <li>
            With the URL that points to your hosted microservice, create a Logic function
            on Scaphold and define the configuration for the data you want sent over to your
            webhook, the mutation in your GraphQL API upon which you want it to fire, as well
            as any request headers.
          </li>
        </ol>
        <div style={{ textAlign: 'center' }}>
          <img src="../../images/projects/mailchimp-webtask.png" alt="mailchimp-webtask" width="25%" />
        </div>
        <p>
          You can watch this quick video on how to set up your custom logic on Scaphold.
          In this video, we use <a href="https://mailchimp.com/">MailChimp</a> and <a href="https://webtask.io/">Webtask.io</a> to set up a simple
          webhook to add a user to a mailing list when they sign up for a service.
        </p>
        <Row>
          <Col lg={6} lgOffset={3} md={6} mdOffset={3} sm={6} smOffset={3} xs={12} className="community-featured-video-wrapper">
            <iframe width="854" height="480" src="https://www.youtube.com/embed/hv3FQY6iipQ" frameBorder="0" allowFullScreen />
          </Col>
        </Row>
        <p>
          You can <a href="https://github.com/scaphold-io/scaphold-business-logic-examples" target="_blank">download the code here on GitHub</a> or read more about implementation details <a href="https://scaphold.io/docs/#webhooks" target="_blank">here in our documentation</a> as well.
        </p>
      </div>
    ),
  },
  {
    title: 'Where can I find GraphQL tutorials?',
    description: 'GraphQL tutorials',
    askedBy: 'Gina Lynch',
    answeredBy: 'Vince Ning',
    createdAt: '2016-12-15',
    tags: ['GraphQL', 'Tutorial'],
    url: '/questions/where-can-i-find-graphql-tutorials/',
    isMarkdown: true,
    answer: `
There are a few places to find good GraphQL tutorials.

For starters, you should visit the [official GraphQL page](http://graphql.org/learn/). They have learning guides and resources to
help you understand how GraphQL works.

You can also [use one of our learning guides](https://scaphold.io/community/learn/) to help you implement a particular feature for
your app using GraphQL. We've collected a list of the best resources and learning guides online to help you learn about GraphQL.

Here's a list to help you with the basics:

- Kadira's [LearnGraphQL.com](https://learngraphql.com/)

- Apollo's [GraphQL.com](http://www.graphql.com/)

- [The Fastest Way to Get Started](https://scaphold.io/community/blog/fastest-way-to-get-started/)

- [GraphQL vs. REST](/questions/graphql-vs-rest/)

- [State of GraphQL](https://scaphold.io/community/blog/state-of-graphql/)

- Clay Allsopp's [GraphQLHub.com](https://www.graphqlhub.com/)

- [Official GraphQL Slack](https://graphql-slack.herokuapp.com/)

- [Scaphold Slack](http://slack.scaphold.io)

- [Other Community Sites](http://graphql.org/community/)

- [Unofficial List of Resources](https://github.com/chentsulin/awesome-graphql)

Still need help? Feel free to [join our Slack](slack.scaphold.io) and ask us directly!
    `,
  },
  {
    title: 'Best practices for GraphQL security',
    description: 'GraphQL security with Scaphold',
    askedBy: 'allpwrfulr00t',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-15',
    tags: ['GraphQL', 'Security'],
    url: '/questions/graphql-security-best-practices/',
    isMarkdown: true,
    answer: `
## Best practices to maximize GraphQL security on Scaphold

Security is a vast topic and can get pretty in-depth. A lot of the following content
consists of general security measures that are good practices to have in any application - not limited to GraphQL.
But since we're learning about security, I thought that it would apply here as well.

To start off with I will give an indirect security measure that comes right out of the box with GraphQL.

### Type system

One of the largest benefits of using GraphQL is its type system. By defining types for
your API, you can guarantee that your client app(s) won't be sending you junk data that
has nothing to do with the query or mutation. The GraphQL server will validate each
request that comes in and see if the inputs match the type defined. That way, there's no
need to write custom validation for requests on each endpoint like you would in traditional
REST APIs.

### SSL

In order to have an encryped connection between your client and the server, you must
enable SSL. There are services that allow you to SSL certify your web server. This will
tell the browser to use \`https\` instead of plain \`http\`, and users will trust your
site more, particularly ones that ask for payment, or other sensitive data. Services like
DigiCert or LetsEncrypt can help you accomplish this.

### Authentication

Authenticating a client is always an interesting topic. You can implement the auth flow in
many different ways, whether it be basic auth, session auth, or token auth, just to name
a few. Scaphold uses token authentication. Everything we do, whether it be logging a
user into Scaphold or logging your user into your app, we use tokens to manage a user's
auth status. The auth flow works like this:

1. User logs in with username and password.

2. The GraphQL server verifies the user in the database against his / her hashed password.

3. If successful, the server returns a JSON Web Token (JWT) that is a Base64 encoded token with
  an expiration date. This is the authentication token.

4. To use the authentication token, your future requests should include the authentication token
  in the header as <code><pre>{ Authorization: 'Bearer' + [Auth_Token] }</pre></code>

Now, each time the server (perhaps Node Express) sees the token in the header, it will parse
  out the token, verify it, and in the GraphQL world, save the identified user in the context
  for use in the rest of the application. The user is now logged in.

### Permissioning

The ability to set permissioning on types and fields is crucial to many applications. Not
setting permissions allows everyone to access any data (probably not the best idea). The most
common types of permissioning systems are \`role-based\` and \`relation-based\`. We have both
those on Scaphold, and you can [read more about them here](https://scaphold.io/docs/#permissions-authorization).

### Encrypted storage

Now what happens when your data reaches the server and needs to be stored? It's generally a
good idea to store them on encrypted disks so that your data is protected by converting it
into unreadable code. Amazon has a good solution for this using their Elastic Block Store (EBS),
and all of your data on Scaphold is stored in encrypted AWS EBS volumes.

### Daily backups in case of failover

This goes without saying, that backing up your data is a safety measure that's not hard to achieve,
and can save your company from losing all of its data forever. It also gives you the peace of mind
that in the case that your data gets corrupted or tampered with, you have a backup to restore from
and you won't lose your customer's data, especially if it's sensitive information.

You might be wondering if Scaphold encapsulates all of this into its system. And the answer is yes.
We take pride in our security and you can rest assured that your data is safe on Scaphold's servers.
    `,
  },
  {
    title: 'What is Scaphold\'s system architecture?',
    description: 'Scaphold system architecture',
    askedBy: 'ali',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-16',
    tags: ['Scaphold', 'Architecture'],
    url: '/questions/scaphold-system-architecture/',
    isMarkdown: true,
    answer: `
## What is Scaphold built with?

Scaphold is built with the end-user in mind. We're developers too! So we'd only build a product that
we would use ourselves. Scaphold is entirely hosted on [Amazon Web Services (AWS)](https://aws.amazon.com).

## Here is our stack:

### Infrastructure

The Scaphold service has a highly-available architecture that is deployed across multiple availability zones
and across multiple regions around the world. We secure our infrastructure through closed security groups
and access controls such that only authorized users have direct access to your data.

- Relational Database: [Amazon Aurora](https://aws.amazon.com/rds/aurora/) MySQL 5.6.10a

- [Elastic Block Store (EBS)](https://aws.amazon.com/ebs/) for encrypted data storage

- Web server: [Amazon Linux AMI](https://aws.amazon.com/amazon-linux-ami/) 2016.09.b x86_64 ECS HVM GP2

- [ElasticCache](https://aws.amazon.com/elasticache/): Hosted Redis solution for GraphQL Subscriptions

- [ElasticSearch](https://aws.amazon.com/elasticsearch-service/): Used for Scaphold logs and logs for your data as well

- [Elastic Container Service](https://aws.amazon.com/ecs/): Deployment of our infrastructure via Docker containers

- [S3](https://aws.amazon.com/s3/): Used to host your files

- [CloudFront](https://aws.amazon.com/cloudfront/): Global content delivery network (CDN) to serve your files

- [Route 53](https://aws.amazon.com/route53/): Domain name service (DNS)

There are a few other services that we use as well on Amazon, such as load balancers, lambda, etc... But the ones
listed above are the main services we use to run the majority of our infrastructure.

### Frameworks

Scaphold's entire stack is run on [ECMAScript 6 (or ES6)](http://es6-features.org/). Here's the breakdown:

- [GraphQL](http://graphql.org/): This is our bread and butter. We run all of our application data through GraphQL
the same way you would when using Scaphold. As a matter of fact, we run on the same system that you do, so we're
almost always the first to know when issues occur.

- [Node Express](http://expressjs.com/): We run multiple processes of our Node application so we can handle a ton
of load on our servers. Your requests are run through a series of middlewares that allows for the proper
generation of your apps and schemas. The way we optimize your requests is by caching your schemas on the server.

- [ReactJS](https://facebook.github.io/react/): The frontend is built with yet another Facebook technology. It's
functional and lightweight approach to frontend development allows us to build an awesome user experience
that just works.

If you're considering using Scaphold and need more information evaluating the security and technology behind the scenes
before diving into our service, please email us at [hi@scaphold.io](mailto:hi@scaphold.io).
`,
  },
  {
    title: 'What is the difference between a GraphQL Query, Mutation, and Subscription',
    description: 'GraphQL Query, Mutation, & Subscription',
    askedBy: 'chrdlu',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-17',
    tags: ['GraphQL', 'Query', 'Mutation', 'Subscription'],
    url: '/questions/difference-between-graphql-query-mutation-subscription/',
    isMarkdown: true,
    answer: `
There are three first-class citizens in each GraphQL schema. They are \`Query\`, \`Mutation\`, and \`Subscription\`.

## Query

A GraphQL query is a way to fetch data in a read-only manner from your GraphQL API.

On Scaphold, queries come in a couple different shapes and forms. Each core data type X gets its own queries getX and
viewer.allXs. Since core data types can be involved in connections, you can also read related objects through any
connection fields in your schema. All core data connections take the XWhereArgs and XOrderByArgs inputs that allow
you to do complex filtering and compound ordering.

> Example Query

    /* Retrieve all users */

    query AllUsers {
      viewer {
        allUsers {
          id
          username
          lastLogin
        }
      }
    }

## Mutation

A GraphQL mutation is a way to change data on your server. It's important to note that mutations consist of a change
followed by a fetch of the piece of data that was just changed, all in one operation. Mutations are your means of
modifying data in your API. Each core data type X, gets a createX, updateX, and deleteX mutation. Input arguments
are automatically created to fit your schema and can be inspected from GraphiQL’s Doc Explorer.

> Example Mutation

    /* Create user mutation */

    mutation CreateUser($user: CreateUserInput!) {
      createUser(input: $user) {
        changedUser {
          id
          username
        }
      }
    }

    /* Variables */

    {
      "user": {
        "username": "elon@tesla.com",
        "password": "SuperSecretPassword"
      }
    }

## Subscription

A GraphQL subscription is a way to get a real-time feed of data from your server. Great use cases for this are for chat
apps, game apps, or analytics dashboards. Essentially, with GraphQL subscriptions, a client no longer needs to manually
run a fetch of the data, and rather, the server pushes data downstream to the client without refreshing the page. They
require a web socket connection though however to maintain a persistent connection between a client and a server.

> Example Subscription

    /* Subscribe to User type */

    subscription SubscribeToUser($user: [UserMutationEvent]!) {
      subscribeToUser(mutations: $user) {
        mutation
        value {
          id
          username
        }
      }
    }
    `,
  },
  {
    title: 'How to create a referral system with GraphQL?',
    description: 'Referral system',
    askedBy: 'jeffgorder',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-17',
    tags: ['User', 'Referral'],
    url: '/questions/how-to-create-a-referral-system-with-graphql/',
    isMarkdown: true,
    answer: `
### The scenario:

There are two users. And the first user (User A) refers the second (User B). The simplest
way to refer a user is using the Mailgun integration with Scaphold Logic. Here are the steps:

1. Create Mailgun account and input your API keys on Scaphold's Integrations portal.

2. Create a connection from \`User\` to \`User\` with a join table called \`Referral\`.

> Example Schema

\`\`\`
  type User {
    id: ID!
    username: String!
    password: Secret!
    referrals: [Referral]
  }

  type Referral {
    id: ID!
    user1Id: ID
    user2Id: ID
    status: ReferralStatusEnum
  }

  enum ReferralStatusEnum {
    pending
    joined
  }
\`\`\`

This way we know who referred who.

3. Whenever a user wants to refer someone to join your app, you should create a new user, and then create a new Referral
object to associate the original referrer and the new referee.

4. Then, you can send an email with new user's username and temporary
password in the signup link back to your site, perhaps encoded as a URL parameter.

5. When User B clicks the referral link, they'll be sent to sign with the temporary password. If successful, then the app
should prompt the user to ask for a new password and run the \`changeUserPassword\` mutation.

6. Upon successful login at this point, you should send a mutation call to update the referral's status to \`joined\`.
    `,
  },
  {
    title: 'How to rename an app?',
    description: 'Renaming an app',
    askedBy: 'jeffgorder',
    answeredBy: 'Vince Ning',
    createdAt: '2017-01-18',
    tags: ['App', 'Rename'],
    url: '/questions/how-to-rename-an-app/',
    isMarkdown: true,
    answer: `
Creating an app is awesome, but sometimes the name changes as you want to portray a different feel for your app or project.

For both, you need to be in an "app view", meaning you should have clicked on an app from [the dashboard](https://scaphold.io/apps)
and you can see a left side panel with various tabs to modify and analayze your app.

At this point, there are **two ways** to rename an app:

#### 1. **Top Banner:**

##### Open your API dropdown.

![My API](http://assets.scaphold.io/community/questions/My_API_Topnav.png)

##### Edit your app name and save.

<img src="http://assets.scaphold.io/community/questions/Rename_App_Modal.png" alt="Change App Name" style="max-width: 50%" />

#### 2. **Settings**

##### Open your Settings page.

![Settings Page](http://assets.scaphold.io/community/questions/Settings_Edit_App.png)

##### Edit your app name and save.

![Change App Name](http://assets.scaphold.io/community/questions/Rename_App_Settings.png)
    `,
  },
  // {
  //   title: 'How to batch queries in one request?',
  //   description: 'Query batching',
  //   askedBy: 'seanpcheng',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-01-18',
  //   tags: ['Query', 'Batching'],
  //   url: '/questions/how-to-batch-queries-in-one-request/',
  //   isMarkdown: true,
  //   answer: `
  // [NPM: Query Batching](https://www.npmjs.com/package/graphql-query-batcher)
  //   `,
//   },
//   {
//     title: 'What is Viewer in my API?',
//     description: 'chrdlu',
//     askedBy: '',
//     answeredBy: 'Vince Ning',
//     createdAt: '2017-12-15',
//     tags: [],
//     url: '/questions/what-is-viewer-in-my-api/',
//     isMarkdown: true,
//     answer: `
//     `,
//   },
//   {
//     title: 'How to fork an app?',
//     description: '',
//     askedBy: '',
//     answeredBy: 'Vince Ning',
//     createdAt: '2017-12-15',
//     tags: [],
//     url: '/questions/how-to-fork-an-app/',
//     isMarkdown: true,
//     answer: `
//     `,
//   },
//   {
//     title: 'Can I export my GraphQL schema?',
//     description: '',
//     askedBy: '',
//     answeredBy: 'Vince Ning',
//     createdAt: '2017-12-15',
//     tags: [],
//     url: '/questions/can-i-export-my-graphql-schema/',
//     isMarkdown: true,
//     answer: `
//     `,
//   },
//   {
//     title: 'What is the difference between Text and String types?',
//     description: '',
//     askedBy: '',
//     answeredBy: 'Vince Ning',
//     createdAt: '2017-12-15',
//     tags: [],
//     url: '/questions/difference-between-text-and-string/',
//     isMarkdown: true,
//     answer: `
//     `,
//   },
  // {
  //   title: 'How to upload a file in the Scaphold Dashboard?',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
  // {
  //   title: '',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
  // {
  //   title: '',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
  // {
  //   title: '',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
  // {
  //   title: '',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
  // {
  //   title: '',
  //   description: '',
  //   askedBy: '',
  //   answeredBy: 'Vince Ning',
  //   createdAt: '2017-12-15',
  //   tags: [],
  //   url: '/questions/where-can-i-find-graphql-tutorials/',
  //   isMarkdown: true,
  //   answer: `
  //   `,
  // },
];
