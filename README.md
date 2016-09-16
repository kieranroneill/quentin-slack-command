# Quentin Slack Command

## Introduction

Welcome to the NodeJS server that demonstrates how you can build a server that can be used to responsd to server commands. 

This project was born as a joke to my friend, [Quentin Dallaserra](https://github.com/QuentinDallaserra), and I. We both love [Slack](https://www.slack.com) and we love the ``/giphy`` command. I noticed Slack's API allows you create your own slash commands, so to pay homage to my friend [Quentin](https://github.com/QuentinDallaserra), I created this server in order to embarrass him by implementing a response to Slack's ``POST`` request that is initiated when you type ``/quentin``.

## Local Development

To setup the server you will first need to install [NodeJS](https://nodejs.org/en/).

**NOTE: NodeJS must be >= v4.5, this is due to the fact that the code uses ECMAScript 6.**

Next you will need to run:

```
npm install
```

Once the packages have been installed, you will notice a config file has been created: ``.env``. Open up this file and edit the following properties:

```
PRIVATE_NETWORK_IP=127.0.0.1
SLACK_TOKEN=s89qc_a_long_string_soxs8x
```

You will find your Slack token on the custom command settings page.

You are almost done, you can now simply run:

```
npm start
```

This will start running the [nodemon](http://nodemon.io/) server on [localhost:1337](http://localhost:1337) that will automatically reload on any code changes.

## Testing

All tests are in the testing directory and they use Mocha, Chai and Sinon.

Testing can be run by simply using:

```
npm test
```

This will run mocha.
