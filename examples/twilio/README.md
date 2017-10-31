# So you want to send some text messages?
This is a guide on how to use [Twilio](www.twilio.com), a SMS webservice, with a node backend.

Those were some fancy words, I shall try to explain them.
A **SMS webservice** is just a service that when asked, politly, can send text messages.
A **node backend** is a backend that is written in node. If you don't know what a backend is take a minute to read this [article](http://blog.teamtreehouse.com/i-dont-speak-your-language-frontend-vs-backend).
**node** is one of the fancy langauges that only the cool kids use. Why so fancy? It is just Javascript. Infact, it is the same Javascript that all websites use. Some developers prefer to use node for their backend because they are already comfortable developing in Javascript. A node environment is detached from the front-end, i.e. a terminal.

### Requirements
If you want to follow along please do the following.
1. Install [node and npm](https://www.npmjs.com/get-npm).
2. Create a [Twilio account](https://www.twilio.com/try-twilio).
3. Locate your [Twilio API Credentials](https://www.twilio.com/console/sms/dashboard).
4. Download this repository `git clone https://github.com/maxchehab/botonyBot.git`

### 🎉🎉🎉Lets start coding!!!🎉🎉🎉
With your terminal go into the `botanyBot` directory `cd /path/to/botanyBot/examples/twilio`.
We need to install some dependencies. With NPM installed, run `npm install`
This should do some fancy loading things but in a few seconds you should be ready to go.
A good rule of thumb, if the terminal says something scary, generally in red text, you should try to fix it.
Anyways, hopefully no scary red text was thrown at you and NPM successfully installed the dependencies for this example.

At this point, I am going to talk about the how and why of sending text messages using Twilio. If you couldn't care less and just want to send some texts to your friends, open the `twilio_example.js`. Fill in all the `{Text that needs to be replaced}` with information located at your [Twilio API Credentials](https://www.twilio.com/console/sms/dashboard).
Save, exit, and go back to the terminal.
Next, run the command `node twilio_example.js`. If no errors appear, you should have received a surprise present...

#### How things work
As mentioned above, Twilio is a webservice. If you provide certain requirements, like a username and password, they will send a text message using the prior criteria.

In the first few lines of `twilio_example.js` you shall find a few lines of code declaring constant variables.
```javascript
const ACCOUNT_SID = "{Account SID}"
const AUTH_TOKEN = "{Authorization Token}"
const ACCOUNT_NUMBER = "+1{Account Number}"
```
These are some of the required parameters for using the Twilio webservice. Think of the `ACCOUNT_SID` as your username and `AUTH_TOKEN` as your password. It is in your best interest to keep these safe under your virtual mattress or anybody can impersonate your Twilio account.

Next, I create a `SendMessage` function. This function takes two parameters, `to` and `body`.
`to` is the number address for your text message.
`body` is the body of the text message.
For example, if I want to send "Help, I have fallen and I can't get up!" to 911. I would call `SendMessage` function like this.
```javascript
SendMessage("911", "Help, I have fallen and I can't get up!");
```

That's pretty simple, but we still haven't written any code to actually *send* a text message.

The first thing I do in `SendMessage` is create my query. A query is the data that I want to send to Twilio. I do this using a Javascript object.
```javascript
let query = {
    To: to,
    From: ACCOUNT_NUMBER,
    Body: body
}
```
Next, I make the actual request. According to the [Twilio API documentation](https://www.twilio.com/docs/api/rest) I need to send my request to `https://api.twilio.com/2010-04-01/Accounts/{ACCOUNT_SID}/Messages.json`
Remember those constant variables I created at the top of `twilio_example.js`? `ACCOUNT_SID` is one of them.
To concatenate the `ACCOUNT_SID` to the url properly I simply do this...
```javascript
request({
    url: "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json",
    ...
});
```
Next, I specify what type of request I want to use. According to the documentation I have to use a `POST` request.
```javascript
request({
    ...
    method: "POST",
    ...
});
```

Now, I include the query with the request.
```javascript
request({
    ...
    JSON: true,
    form: query,
    ...
});
```
Finally, I include my Twilio API credentials (saved as a constant).

```javascript
request({
    ...
    'auth': {
        'user': ACCOUNT_SID,
        'pass': AUTH_TOKEN,
    }
});
```

This is the entire request command:
```javascript
request({
    url: "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json",
    method: "POST",
    json: true,
    form: query,
    'auth': {
        'user': ACCOUNT_SID,
        'pass': AUTH_TOKEN,
    }
}, function(error, response, body) {
    console.log(body);
});
```
The last part of the request method is called a `callback`. A callback is a function that is run once the request has a response. This should print out the body of the request, alerting us to any errors.

Congratulations! You have achieved enlightenment! Next you should use the `SendMessage` function to create the backend for BotanyBots!
