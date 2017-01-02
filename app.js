//Add your requirements
var restify = require('restify');
var builder = require('botbuilder');

var appId = process.env.MY_APP_ID || "8cf308bd-8e0c-4ed0-abea-87d5b324f08f";
var appSecret = process.env.MY_APP_SECRET || "iQey2xXaHX270TTwgnCWFkn";

// Create bot and add dialogs
var bot = new builder.BotConnectorBot
({appId: process.env.MY_APP_ID, appSecret: process.env.MY_APP_SECRET});
bot.add('/', new builder.SimpleDialog( function (session) {
session.send('Hello World');
}));

// Setup Restify Server
var server = restify.createServer();
server.post('/api/messages', bot.verifyBotFramework(), bot.listen());
server.listen(process.env.port || 3000, function () {
console.log('%s listening to %s', server.name, server.url);
});

server.get('/', restify.serveStatic({
    directory: __dirname,
    default: '/index.html'
}));
