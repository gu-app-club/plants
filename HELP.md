# Help and documentation

This file is a doc for folks trying to figure out how to do things in the project. Please feel free to add to it!

![someone asking for help](https://media.giphy.com/media/FqAwoNjVneJxK/giphy.gif)

## What's an HTTP Request?
An [HTTP request](http://rve.org.uk/dumprequest) is a string that's sent from a client to a server. Simplified, an HTTP request looks like this:

```
GET github.com
```

When you type "github.com" into your browser and press enter, your browser is actually sending a string that looks like `GET github.com` to github's servers. Then Github sends
back an HTML file back.

### What's a "route"? 
In this project, when we say "writing a route" we mean creating a function that listens for a particular http request and then sends back some information.

For example, lets say we have a route that looks like this:
```
GET localhost:8080/fizz
```

We might write a javascript function like this:

``` js
function fizz(request, response) {
  response.send("buzz");
}
```

And then later we might connect that function to the route like this:

``` js
router.get("/fizz", fizz);
```
