---
title:  "The fastest way to get started with GraphQL."
description: "First things first: GraphQL is awesome. If you’re not already building on it, right now is a great time to start! As a quick introduction, GraphQL is an application layer query language designed by Facebook that is used to power many of their web and mobile applications."
date:   2016-06-14 14:23:37 -0700
categories:
photo: "https://medium2.global.ssl.fastly.net/max/2000/1*dleH6ofUwLsT4NDirS3D1w.png"
headshot: "http://assets.scaphold.io/images/mike.jpg"
author: "Michael Paris"
---

![](https://medium2.global.ssl.fastly.net/max/2000/1*dleH6ofUwLsT4NDirS3D1w.png)

### Introduction

First things first: GraphQL is awesome. If you’re not already building on it, right now is a great time to start! As a quick introduction, GraphQL is an application layer query language designed by Facebook that is used to power many of their web and mobile applications. A GraphQL API comes preloaded with a rich type system that makes it easy to represent complex data models, introspective capabilities that make documenting an API a breeze, and an intuitive query language that greatly improves the experience of developing client applications!

This tutorial is going to take place in multiple parts. This section is **Part 1** and over the next few minutes, we will walk through creating a production ready GraphQL API on [Scaphold](https://scaphold.io). The objective is to show you that anyone can get started with the awesomeness that is GraphQL. Future posts will walk you through how to build client applications using React, React Native and Angular 2.0 using Apollo Client and RelayJS.
> Get ready to forever replace REST with GraphQL, the future of APIs.

Let’s get building!

### Step 1: Define a schema

The first step in building a GraphQL application is to define a schema. A schema contains a set of types that you can relate to one another via ‘Connection’ fields. This set of types and connections defines the graph that will come to define your API.

We will be building a todo list application called ‘GraphToDo!’ and our app needs to be able to satisfy the following stories.

1. A user can see a set of TodoLists of which he is a member.

1. A user can create todos and edit, update, and delete his/her owned items.

1. A user can upload a profile picture.

1. A TodoList has a name, many Todo items, and a set of members.

1. A Todo has a title, content, a completed flag, an owner, and a connected set of subTasks.

Our app can accomplish all of these using the following data model.

    Type User : Node {
        id: ID!
        username: String!
        profilePicture: File
        todoLists: [TodoList]
        ownedTodos: [Todo]
    }
    // [Todo] denotes a connection to type Todo

    Type TodoList : Node {
        id: ID!
        name: String!
        todos: [Todo]
        members: [User]
    }

    Type Todo : Node {
        id: ID!
        title: String!
        content: String
        subTasks: [String]
        owner: User
        completed: Boolean
    }
    // Node is a GraphQL interface with an 'id' of type ID!

### Step 2: Implement the schema using [Scaphold](https://scaphold.io)

[Scaphold](https://scaphold.io) makes it easy to quickly define complex data models using GraphQL. To get started go create an account at S[caphold](https://scaphold.io) and follow along!

**Create an App and name it ‘GraphToDo!’**

When you create an app, [Scaphold](https://scaphold.io) will generate storage and return the url of your personalized GraphQL API. Only your [Scaphold](https://scaphold.io) admin accounts and users of your app can access that API.

![](https://medium2.global.ssl.fastly.net/max/2000/1*GbifPtXEFbbAN9riJXqLzw.png)

**Use the Schema Designer to edit your schema**

After creating an app you will be redirected to the schema designer. You can use the Schema Designer to view, create, update, and delete your GraphQL API’s types. You’ll see that by default you are given a ‘User’ type. [Scaphold](https://scaphold.io) handles user authentication and layers a permissions system on top so you can fine tune who can access what data types.

![](https://medium2.global.ssl.fastly.net/max/5712/1*Lgnvywl-LnJn5-9DCfc4tA.png)

1. Use the add type button and create two types (**TodoList** and **Todo**) that implement the **Node** interface.

1. In type **Todo** add a non nullable **String** field ‘title’, a **Boolean** field ‘completed’, and a **String** field ‘content’.

1. In type **User** create a field ‘profilePicture’ of type **File**

1. Add a field ‘name’ to the **TodoList** type

1. Add connections between our types (See below)

Let’s add the one-to-many connection ‘todos’ to the TodoList type.

![](https://medium2.global.ssl.fastly.net/max/5604/1*DrEtxN52_BfAL2RBv5QoKw.png)

Add a field with type: **Connection** and an ofType: **ToDo** and cardinality **One-To-Many**. Give the field a name and a ‘reverseName’ which will dictate the field in **Todo** that will refer back to the **TodoList**. We inject a field into the **Todo** type with the same name as the reverseName to enable bi-directional connections. Go ahead and click add.

We have a few more connection fields to add so let’s go ahead and do that.

* In User add a One-To-Many connection called ‘ownedTodos’ with ofType **Todo** and reverseName ‘owner’.

* In User also add a Many-To-Many connection called ‘todoLists’ with ofType **TodoList** and reverseName ‘members’

* In Todo add a Many-To-Many connection called ‘subTasks’ with ofType **Todo** and reverseName ‘subTasks’. *Note that the fields name and reverseName are the same. This is creating a reflexive connection where Todos relate to other Todos via the ‘subTasks’ field*

And that’s it! In those few minutes, you defined a GraphQL Schema for your **GraphToDo!** application. Even better is that you immediately have a GraphQL API ready to power your client apps! Before we start playing with our data let’s set some permissions.

**Add Custom Permissions**

Many applications need more fine grained control of what data certain users can access. Scaphold’s permissions system allows you do just that. Let’s add a permission that says a user can only create a **Todo** if they are logged in.

Click the ‘Permissions’ button next the the Todo type’s name and add a permission with scope ‘AUTHENTICATED’ and check the radio under ‘create’. We’ll go over user authentication a little later, but that permission just told your API to only allow create operations on the **Todo** type if the user is logged in.

Okay, time for a slightly more complicated permission. Let’s say that a user should be able to read a **TodoList** if they are in the **TodoList’s** ‘members’. To handle this situation you would create a permission on type **TodoList** with Scope : *RELATED*, User Fields : *members*, and the *read* radio checked. The *USER* permission scope allows you to define access rules that are based on the **Connections** in your schema. The User Fields attribute specifies a field in the current type (in our case **TodoList**) that is either a **User** or a **Connection to User** (i.e. members) and will only grant permission to an operation if the logged in user is connected to the object of the operation via that userField.

Those are the basics of how permissions work. We are going to add two more permissions. One so that only logged in users can create **TodoLists** and another so that only the owner of a **Todo** can update, replace, or delete it. At the end, your permissions should look like this:

![You can create TodoLists only if you are logged in. You can read, update, replace, and delete them if you are a member.](https://medium2.global.ssl.fastly.net/max/2780/1*vnCm2pXieiv0mnmWA7AbNA.png)*You can create TodoLists only if you are logged in. You can read, update, replace, and delete them if you are a member.*

![A user can read and create a todo only if they are logged in. A user can update, replace, or delete a Todo if they own it.](https://medium2.global.ssl.fastly.net/max/2780/1*H8R6xJMRdYxus8WqyYbBsw.png)*A user can read and create a todo only if they are logged in. A user can update, replace, or delete a Todo if they own it.*

Awesome! Our GraphQL API now has access control baked in! Let’s get to the fun stuff and start playing with our data.

### Step 3: Write some GraphQL

Now that we have defined our schema, let’s start writing some GraphQL queries. You can use [Scaphold](https://scaphold.io)’s GraphiQL editor to prototype your queries and then pull them as is into your web and mobile apps.

To create a user, type the following into the query section in GraphiQL

    # $user denotes a GraphQL variable and can be named
    # whatever you like as long as it's consistent with
    # what you have in the variables section
    mutation CreateUserMut($user: _CreateUserInput!) {
        createUser(input: $user) {
            changedUser {
                id
                username
            }
        }
    }

Then in the variables section type

    {
      "user": {
        "username": "John Doe",
        "password": "password"
      }
    }

Click send. You should receive a response that that looks something like this.

    {
      "data": {
        "createUser": {
          "changedUser": {
              "id": "ZmRhZWFiMWQtZGM4OC00MDk5LWJkNjgtMmI1MGYyMjA0ZWY4OjczYzk3NGRjLTM2OTctNDkwNC1iYzdlLTRhM2FlYWE5MTNlZg==",
              "username": "John Doe"
          }
        }
      }
    }
    # For now save the id of your new user.
    # We are going to use it later.

Notice how the response you get directly mirrors the GraphQL query. Our create query said “hey I want to create a user and, in response, I want the id and the username of the changed user”. You’re GraphQL API is smart enough to understand this and return only the data that you want.

Perhaps the most powerful part of the GraphiQL editor is the documentation explorer on the right side of the page. Scaphold automatically introspects your GraphQL APIs to get display information about your API. This allows you to cook documentation directly into our API.

![](https://medium2.global.ssl.fastly.net/max/5716/1*p7CwXnV42Ef_64HVnpXjmw.png)

You can use the doc explorer to dig around and learn your API. Your GraphQL queries will mirror the structure of the types shown here so remember you can always come back here if you get lost. You can also click the </> tag to have generate the full text of a query. This can really help learning the language when you first start.

Before we move on let’s create a **TodoList** as well.

    # Query Editor
    mutation CreateTodoList($input: _CreateTodoListInput!) {
        createTodoList(input: $input) {
            changedTodoList {
                id
                name
                todos {
                    edges {
                        node {
                            id
                            title
                        }
                     }
                }
                members {
                    edges {
                        node {
                            id
                            username
                        }
                    }
                }
            }
        }
    }

    # Variables Editor
    {
        "input": {
            "name": "Build an awesome app on Scaphold"
        }
    }

Click send. You should notice that your TodoList doesn’t yet have any members or todos. First, copy the *id* of the **TodoList** you just created, we’re going to need it in a second. If you remember, members is a many-to-many connection with **User.** When you specify a field as a many-to-many connection, Scaphold creates two mutations for manipulating the edges between objects in the connection. Look for the mutation *addUserToTodoListMembers*. Here’s where we’ll use the **User** id and **TodoList** id of the objects we just created. Use the following query to add our user ‘John Doe’ to the **TodoList’s** members.

    # Type this in the query editor
    mutation AddMember($input: _AddUserToTodoListMembersInput!) {
      addUserToTodoListMembers(input: $input) {
        changedUser {
          id
          username
        }
        changedTodoList {
          id
          name
        }
      }
    }

    # With variables
    {
      "input": {
        "userId": "<your user id>",
        "todoListId": "<your new todo list id>"
      }
    }

If you forgot to save your **User** id or **TodoList** id, you can easily grab it from the explorer tab. Let’s verify that our user was added to the **TodoList’s** members.

    # Query your todo list
    query getTodoListQuery{
      getTodoList(id: "<todo list id>"){
        id
        createdAt
        modifiedAt
        name
        members {
          edges {
            node {
              id
              username
            }
          }
        }
      }
    }

Cool! We now have a **TodoList** and have subscribed our **User** as a member.

### Step 4: Integrate Slack

Thus far we have defined a schema, added custom permissions, and created data points but to really build a productive todo app we’ve gotta do a little more. We’re going to integrate Slack so that we can get notifications in our favorite communication tool whenever a new **Todo** is created.

Jump over to the Integrations tab and add the Slack integration. To integrate slack, go to [Slack’s webhooks portal](https://api.slack.com/incoming-webhooks) and configure an incoming webhook for our app.

![](https://medium2.global.ssl.fastly.net/max/2000/1*ZMfhLgEy4fnuUImZWOPtWA.png)

After you have done this, copy and paste the URL for your webhook into the add integration modal on Scaphold.

![](https://medium2.global.ssl.fastly.net/max/2000/1*B0Hq-5Xj_4BouNeoz3pH_g.png)

We are going to bind our slack integration to the ‘afterCreate’ event on the type **Todo**. Adding this type of event will tell our Scaphold API to fire our slack integration whenever a **Todo** item is created. To configure what info is included in the message to Slack we will give a GraphQL fragment that will be applied to the new created **Todo** value before posting to slack. Say for example, we wanted to know the title, content, the name it’s parent list, and the name of the task’s owner. We would give the following GraphQL fragment for our integration.

    {
        title
        content
        owner {
            username
        }
        list {
            name
        }
    }

You can write any GraphQL expression for the fragment just make sure you include the outermost brackets.

### Step 5: Create a Todo and test our Slack integration

Let’s try out our new Slack integration! Go back to GraphiQL. Let’s go ahead and create a Todo item. Type the following query into the query tab in GraphiQL.

    mutation CreateTodoQuery($input: _CreateTodoInput!) {
      createTodo(input: $input) {
        changedTodo {
          id
          createdAt
          modifiedAt
          owner {
            id
            username
            createdAt
            modifiedAt
            lastLogin
          }
        }
      }
    }

Remember those two ids I asked you to save earlier. We’re going to use them again here. If you forgot to save them, you can easily grab them from the ‘Explorer’ tab. Enter the following in the variables tab

    {
        "input": {
            "title" : "Build a sweet on using my new GraphQL API",
            "content": "Check out these tutorials on how to get started with React, React Native, and Angular 2.0",
            "ownerId": "<John Doe's user id>",
            "listId": "<Todolist id>"
        }
    }

If everything went to plan, you should have just gotten a notification sent to the slack channel you configured in the incoming webhook containing the information we designated in our GraphQL fragment. We also just added a **Todo** to our **TodoList** and specified John Doe as the owner! Check it out!

    # Query
    query {
      getUser(id: "<John Doe's ID>") {
        id
        username
        todoLists {
          edges {
            cursor
            node {
              id
              name
              todos {
                edges {
                  cursor
                  node {
                    id
                    title
                    content
                  }
                }
              }
            }
          }
        }
      }
    }

    # Response
    {
      "data": {
        "getUser": {
          "id": "<User ID>",
          "username": "John Doe",
          "todoLists": {
            "edges": [
              {
                "cursor": "d5e41e91-0aad-4e3b-8e1c-20744bf8c515",
                "node": {
                  "id": "<TodoList ID>",
                  "name": "Build an awesome app on Scaphold",
                  "todos": {
                    "edges": [
                      {
                        "cursor": "d1502ab3-cc3a-48fc-b7fe-0b2df12c0922",
                        "node": {
                          "id": "<Todo ID>",
                          "title": "Build a sweet on using my new GraphQL API",
                          "content": "Check out our next tutorials on how to get started with React, React Native, and Angular 2.0"
                        }
                      }
                    ]
                  }
                }
              }
            ]
          }
        }
      }
    }

**A quick comment on Connections**

Connections standardize a way to paginate through large sets of objects. To do this, your [Scaphold](https://scaphold.io) API wraps connected objects in an *Edge *and each of these edges has an associated cursor. You can use this cursor to grab the next page of objects in a connection. For example, if our user had a lot of **TodoLists** of which he/she was a member, you could grab the next 5 **TodoLists** with this query:

    # Grab the next five TodoLists after the previous page.
    query {
      getUser(id: "<John Doe's ID>") {
        id
        username
        todoLists(first: 5, after: "d5e41e91-0aad-4e3b-8e1c-20744bf8c515") {
          edges {
            cursor
            node {
              id
              name
              todos {
                edges {
                  cursor
                  node {
                    id
                    title
                    content
                  }
                }
              }
            }
          }
        }
      }
    }

For now this will not return any excess **TodoLists** because we have only created 1, but this technique works for all **Connection** fields. You can also paginate backwards using the *last *and *before* Connection parameters.

### Closing thoughts

Congratulations, you did it! You now have a powerful GraphQL API that you can use to power your client apps! Let’s take a quick look back at what we just did:

1. We defined a high level data model for our TodoList application.

1. We implemented that data model in a few minutes using Scaphold’s schema designer.

1. We set custom permissions on our types so that user’s can only access the information they need.

1. We created some data using the built in GraphiQL editor

1. We integrated Slack so that we get notifications when events occur in our API.

1. We created our first Todo, saw our Slack notification fire, and then used GraphQL to issue a query that returned data from 3 different types in a single round trip!

Thanks for reading! If you liked it, share this tutorial with your friends so they can start easily building GraphQL powered apps as well! We hope you enjoyed this tutorial and would love to hear your feedback in the comments or on [Slack](http://slack.scaphold.io)!

Also, check back soon for our tutorials on how to build GraphQL powered client apps using React, React Native, and Angular 2.0! Thanks!

![](https://medium2.global.ssl.fastly.net/max/2000/1*i2qpiJvi9FBPfq--ITzILg.png)
