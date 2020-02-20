// Import dependencies
const config = require('./config');
const request = require('request');
const cheerio = require('cheerio');
const Discord = require('discord.js');
const chalk = require('chalk');
const twilio = require('twilio')(config.twilioSid, config.twilioToken);

// Set up program constants
const log = console.log;
const discordHook = new Discord.WebhookClient(config.discordHookId, config.discordHookToken);

// Set up program variables
let running = false; // I'm biking
let oldNTickets;
let interval;

let tries = 0;
 
function start() {
    request(config.url, {timeout: config.timeout}, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);

            oldNTickets = $(config.selector).text();
            interval = setInterval(checkForChange, config.retryDelay);
            running = true;

            log(chalk.blue(`Started with: ${oldNTickets} tickets present.`));
            discordHook.send("I'm hiding online and scanning for tickets");
        } 
        else {
            if (tries++ < 3) { // don't want to loop forever
                start();
            }
            failedRequest(error, response);
        }
    });
}

function stop() {
    clearInterval(interval);
    running = false;
}

function checkForChange() {
    if(!running) {
        log(chalk.red(`ERROR | Start the program before running checkForChange().`));
        return;
    }

    log(chalk.grey(`Checking that ass out.`));

    request(config.url, {timeout: config.timeout}, function (error, response, body) {
        if(!error && response.statusCode == 200) {
            const $ = cheerio.load(body);
            NTickets = $(config.selector).text();
        
            if(NTickets > oldNTickets) {
                let message = `${NTickets - oldNTickets} NEW TICKET(S) FOUND :.`;

                discordHook.send(message);
                callMobilePhone();
                
                log(chalk.green(message));
            } 
            else {
                log(chalk.grey(`No new tickets found.`));
            }
        }
        else {
            failedRequest(error, response);
        }
    });
}
 
function callMobilePhone() {
    twilio.calls.create({
        url: config.twilioUrl,
        to: config.twilioTo,
        from: config.twilioFrom
    }, function(err, call) {
        if(err) {
            log(chalk.red(`ERROR | ${err}`));
        } else {
            log(chalk.green(`Calling.`));
        }
    });
}
 
function failedRequest(error, response) {
    if (error) {
        log(chalk.red(`ERROR | Failed request. ${error}.`));
    } 
    else if (response.statusCode) {
        log(chalk.red(`ERROR | Failed request. Statuscode: ${response.statusCode}`));
    }
}
 
start();
 