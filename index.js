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
  let input=msg.content; let x=0;
  if(input = "roll 1d6") { input="roll"; x=1; }
  if(input = "roll 1d6") { input="roll"; x=2; }
  if(input = "roll 1d6") { input="roll"; x=3; }
  if(input = "roll 1d6") { input="roll"; x=4; }
  if(input = "roll 1d6") { input="roll"; x=5; }
  if(input = "roll 1d6") { input="roll"; x=6; }
  if(input = "roll 1d6") { input="roll"; x=7; }
  if(input = "roll 1d6") { input="roll"; x=8; }
  if(input = "roll 1d6") { input="roll"; x=9; }
  if(input = "roll 1d6") { input="roll"; x=10; }
  if(input = "roll 1d6") { input="roll"; x=11; }
  if(input = "roll 1d6") { input="roll"; x=12; }
  if (input === 'roll') {
    let dieRoll=0; let amount=0; let diceText=""; let pong="";
    for(i=0; i<x; i++) { 
      dieRoll=parseInt((Math.random() * 6)+1);
      diceText+=dice[dieRoll]+" ";
      amount+=dieRoll; }
    pong=diceText+" "+amount
    msg.reply(pong);
  }
  if (msg.content === 'roll') { msg.reply('pong'); }
});

client.login(tokenId);
