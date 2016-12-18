#Saskatchewan

This is a simple chat box example utilizing Express , with socket.io as our back-end stack and React.js/Flux as our front-end .
A live version runnig `https://saskatchewan.herokuapp.com/`

#Installation

Clone this repo on your machine , make sure you have `nodejs mongodb npm` installed on your machine and also `bower` .

To install project packages , run the following :

```
$ npm install
$ bower install
```

#Usage

make sure you have `mongodb` running on your machine then run the following to build the assests and run the server .

```
$ gulp build
$ npm start
```

#Development

This chat box uses a simple Registration form for new users , and login form for existing ones . Users are directed to the chat box after login where they have a list of all registered users and their status ( online / offline ) . You can chat with any user from the list ( offline / online ) . Notifications are sent for users status ( online / offline ) and new messages . You can logout from the settings button on the chat screen .

This example is just a proof of concept design and code nuances weren't taken much into consideration , it's and example of utilizing the development stack together .
