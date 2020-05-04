require("dotenv").config();
const tokenId = process.env.BOT_TOKEN;
  let dice=["🎲","⚀","⚁","⚂","⚃","⚄","⚅"]; 
// ["⚀","⚁","⚂","⚃","⚄","⚅"]

//const { transactionHandler } = require("./src/transactionHandler");
// const EventSource = require("eventsource");
//const btoa = require("btoa");

const Discord = require('discord.js');
const client = new Discord.Client();

console.log("start");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', msg => {
  if (msg.content === 'ping') {
    let dieRoll=0; let amount=0; let diceText=""; let pong="";
    for(i=0; i<3; i++) { 
      dieRoll=parseInt((Math.random() * 6)+1);
      diceText+=dice[dieRoll]+" ";
      amount+=dieRoll; }
    pong=diceText+" "+amount
    msg.reply(pong);
   //  msg.reply('pong');
  }
});

client.login(tokenId);
