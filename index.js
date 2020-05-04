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
  let message=msg.content.toLowerCase(); let [input,dice]=message.split(" "); 
//  if(input === "roll 1d6") { input="roll"; x=1; }
//  if(input === "roll 2d6") { input="roll"; x=2; }
//  if(input === "roll 3d6") { input="roll"; x=3; }
//  if(input === "roll 4d6") { input="roll"; x=4; }
//  if(input === "roll 5d6") { input="roll"; x=5; }
//  if(input === "roll 6d6") { input="roll"; x=6; }
//  if(input === "roll 7d6") { input="roll"; x=7; }
//  if(input === "roll 8d6") { input="roll"; x=8; }
//  if(input === "roll 9d6") { input="roll"; x=9; }
//  if(input === "roll 10d6") { input="roll"; x=10; }
//  if(input === "roll 11d6") { input="roll"; x=11; }
//  if(input === "roll 12d6") { input="roll"; x=12; }
  if (input === 'roll') {
    let dieRoll=0; let amount=0; let diceText=""; let reply="";
    for(i=0; i<dice; i++) { 
      dieRoll=parseInt((Math.random() * 6)+1);
      if(dieRoll==6) { }
      
      diceText+=dice[dieRoll]+" ";
      amount+=dieRoll; }
    reply=diceText+" "+amount
    msg.reply(reply); 
    dice=0; input="";
  }
  if (msg.content === 'roll') { msg.reply('pong'); }
});

client.login(tokenId);
