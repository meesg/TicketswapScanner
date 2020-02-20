# TicketswapMonitor

Checks Ticketswap for new tickets, notifies you by calling via twilio and sending a message via a discord hook.
This way you get notified quicker than people just checking their email for notifications.  
  
Made with love.
  
## Installation

1. Install [Node.JS](https://nodejs.org/en/download/).
2. Download or clone the repository.
3. Open a shell in the folder.
4. Run `npm install` to download the dependencies.
5. Set up the `config.json` file.
6. Run `npm start` to start the monitor.

## Configuration settings
`twilioSid`: Your twilio account SID.  
`twilioToken`: Your twilio auth token.  
`twilioUrl`: The URL to your TwiML intructions.   
`twilioTo`: Your own phone number.  
`twilioFrom`: Twilio phone number.  
`discordHookId`: The number in your discord hook url.  
`discordHookToken`: The character string in your discord hook url.  
`url`: The webpage to be monitored.  
`retryDelay`: Delay between each request in milliseconds.  
`timeout`: Milliseconds before each request should timeout.
`selector`: DOM Selector where the current number of tickets resides.

## Todo
Must have.
- 

Should have.
- [ ] Make twilio optional.
- [ ] Make discord optional.

Could have.
- [ ] Whatsapp integration.

Would have.
- [ ] Snapchat integration
