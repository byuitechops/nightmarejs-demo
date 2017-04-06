/* eslint-env node, browser*/
/* eslint no-unused-vars:0 , no-console:0*/

var Nightmare = require('nightmare'),
    prompt = require('prompt');
require('nightmare-helpers')(Nightmare);

//This is what gets called after the if statment below
function secondNightmareThing(nightmare, promptData) {
    nightmare
        .click('.jump-to-chapter li:nth-child(31) a')
        //example of scraping!
        .evaluate(function () {
            //get the summary of the chapter
            return document.querySelector('#study_summary1').innerHTML;
        })
        //put this if you want your nightmare to close when its done
        //.end() 
        .then(function (summary) {
            //here we print to the console but propibily would be better to write the scrape to a file    
            console.log("summary:", summary);
            console.log('done');
        })
        .catch(function () {
            console.log('error');
        });
}

//This is what gets called after the prompt from cli.js
module.exports = function startNightmare(promptData) {
    //start up nightmare can use values from promptData
    var nightmare = Nightmare({
        show: true,
        openDevTools: {
            mode: 'detach'
        },
        webPreferences: {
            webSecurity: false,
        },
        typeInterval: 20,
        alwaysOnTop: false,
        waitTimeout: 100 * 1000,
        //fullscreen: true
        //example of using promptData in setting up nightmare
        width: promptData.width || 1920,
        height: promptData.height || 1080

    });

    //start doing stuff with nightmare
    //most likely log in first
    nightmare
        .goto('https://www.lds.org/')
        //Might need .waitURL especially for a login
        //click the link at the top
        .click('#pf-joshua li:first-of-type a')
        //click book of mormon
        .click('#pf-1 > div:nth-child(1) > ul > li:nth-child(2) > a')

    //Example of an if statement based off of the prompt data
    if (promptData.bool === "true") {
        nightmare.click('a[href*="' + promptData.book + '"')
    } else {
        nightmare.click('a[href*="alma"')
    }

    //Example of an if statement based off of things on a page
    //check if there are more than 20 chapters in this book
    nightmare
        .exists('.jump-to-chapter li:nth-child(31)')
        //or could use an evaluate
        /*
            .evaluate(function () {
                //any logic can go here this scope is the browser not node
                //just don't return a html element, only parts
                //could return an obj or arry even
                return document.querySelector('#bestID a').href === "http://coolwebsite.org";
            })
            see https://github.com/segmentio/nightmare#evaluatefn-arg1-arg2 for more details on evaluate
        */
        .then(function (hasMoreThanNChapters) {
            console.log("hasMoreThanNChapters:", hasMoreThanNChapters);
            console.log('It worked!');
            if (hasMoreThanNChapters) {
                console.log('it was true! and we did more nightmare stuff');
                secondNightmareThing(nightmare, promptData);
            } else {
                console.log('it was false and we stopped');
            }
        })
        .catch(function (e) {
            console.log("Bad things happend");
            console.log(e);
        });

}
