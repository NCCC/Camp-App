## NCCC Camp App (2019)

This is the new camp app for NCCC, using:
  * [NPM](https://www.npmjs.com/) as package manager ([Yarn](https://yarnpkg.com/lang/en/) was also used sometimes, which was probably a very bad idea, more details below)
  * [React](https://reactjs.org/) (bootstrapped with [Create React App](https://github.com/facebook/create-react-app))
  * [Typescript](https://www.typescriptlang.org/) as source language
  * [Material-UI](https://material-ui.com/) for the design
  * [Workbox](https://developers.google.com/web/tools/workbox/) library for using [service workers](https://developers.google.com/web/fundamentals/primers/service-workers/) to cache the web site for offline use
  * Google Sheets as data provider
  * A simple PHP REST API for listing, fetching and filtering data from Google API without revealing the Sheet ID or the Google API key: https://api.nccc.se/camps/


### Disclaimer

This project was the first time I used NPM and Yarn (extensively), React and Typescript, so there are a quite a few things I did in a wrong or non-consistent way:
  * Using both NPM and Yarn to install modules
  * Using Typescript as language which doesn't *require* semicolons ; at the end of code lines, but then I sometimes use colons and sometimes didn't, partially because I copied a lot of code from examples which sometimes had them and sometimes didn't
  * I also later noticed that newer React examples tend to favor using "Function-based components" rather than "class-based components". In this project both are used depending on how complex the component needed to be.

I'd like to clean up the code in the future, but since it's not that long left to summer camp 2019, I think I'll just focus on bug fixing now.


### NPM and Yarn

The reason both NPM and Yarn was used is because I looked up examples online and ran both of them to install extra modules without thinking too much about it, but I see that Yarn keeps warning me about not using multiple package managers when I run it now.

Hopefully just running NPM should work, and Yarn can be ignored safely, but I haven't tested it properly.


### Running the code

  1. Install NPM on your PC (or on the server if you're testing on a server) if you haven't already
  2. Clone the project using git or just download it as a zip and unpack on your computer
  3. Run `npm install` to download all the modules (I hope it'll work without needing Yarn for anything)
  4. Then `npm start` should run the project in test mode on http://localhost:3000
  5. If you make any code changes while the test server is running, the web page will automatically refresh itself to show the new changes (or a message about errors in the code)


### Building the production/live version of the code

  1. Run `npm run build`
  2. This should create a `build` directory in the project folder, with static files that can be run on a web server
  3. Copy these files to your web server (or point your web server to this `build` directory) to test the production version of the app

**NOTE:** Service worker (offline caching) should work on http://localhost, meaning you need to run a web server on your PC. It won't work if you just start the index.html file directly (ie. if the URL bar shows file:///FOLDER/index.html).
And if you are testing on a remote web server, it needs to run on https:// with a proper certificate for service workers to be allowed.

[More information about more scripts available from the Create React App bootstrapper...](https://facebook.github.io/create-react-app/docs/available-scripts)
