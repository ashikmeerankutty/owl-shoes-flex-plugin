# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the appearance and behavior of [Twilio Flex](https://www.twilio.com/flex). If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

Next, please install the [Twilio CLI](https://www.twilio.com/docs/twilio-cli/quickstart) by running:

```bash
brew tap twilio/brew && brew install twilio
```

Finally, install the [Flex Plugin extension](https://github.com/twilio-labs/plugin-flex/tree/v1-beta) for the Twilio CLI:

```bash
twilio plugins:install @twilio-labs/plugin-flex
```

## Development

Run `twilio flex:plugins --help` to see all the commands we currently support. For further details on Flex Plugins refer to our documentation on the [Twilio Docs](https://www.twilio.com/docs/flex/developer/plugins/cli) page.

```Node version 14 is required to run the application. ```
Application has two major components Server less back end and the flex plugin.


## Env File Management.
There are two env files. 
application root folder .env file and serverless folder .env file. Refer the example files to populate the values


## Deploy Flex Plugin

Refer env.example file and create a .env file in the root directory. Create a Twilio profile using the details of your Flex Account Sid and Token

```bash
twilio profiles:create // Create Twilio profile with shortname
twilio profiles:use <shortname> // Use Twilio Profile


twilio flex:plugins:build
twilio flex:plugins:deploy --changelog "<message>"
// Run release command according to instructions from command above
```

## Deploy Twilio Functions

Refer env.example file and create a .env file in the ./serverless directory

```bash
cd serverless
npm install
npm run deploy // deploy functions to Twilio Function service
```

## Local Testing
```
For Flex plugin
```
Before starting make sure .env files are properly populated. 
This command will help to make the env file ```cp env.exmple .env``` After this fill all the necessary details
```npm install``` to install all the dependencies
```twilio flex:plugins:start``` to start the plug in locally. Once application is up in default browser flex will be loaded. 
If not ```http://localhost:3002/``` use this link to open the flex.

```
For serverless
```
Before starting make sure .env files are properly populated. 
```cd serverless``` To move to the serverless folder
```npm install```. To install all the dependencies
```npm start```  To start the server. 
