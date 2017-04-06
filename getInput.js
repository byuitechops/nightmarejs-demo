/* eslint-env node, browser*/
/* eslint no-unused-vars:0 , no-console:0*/

var prompt = require('prompt');

//All the things that prompt will ask for
var promptSettings = [
    //these are not used but there for an example if you need to log in
    {
        name: 'username',
        //required: true
        //pattern: regex for validation
    },
    {
        name: 'password',
        hidden: true,
        replace: '*',
        //required: true
    },
    //these ones are used in this example
    {
        name: 'book',
        message: 'What BOM book do you want? give me the id of the li the book link is on',
        required: true
    },
    {
        name: 'bool',
        message: 'do the one you picked? true or false',
        required: true
    }
  ];


module.exports = function (callback) {
    function promptCB(err, promptData) {
        if (err) {
            callback(err, null);
            return;
        }

        //convert any promptData values here before passing along
        //maybe some validation

        //for example make them numbers
        //promptData.width = +promptData.width
        //promptData.height = +promptData.height

        callback(null, promptData);
    }

    //set up prompt
    prompt.get(promptSettings, promptCB);
    //Run Prompt
    prompt.start();
}
