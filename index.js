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
  let message=msg.content.toLowerCase(); let [input,x]=message.split(" "); let crit=0; let stun=0; let high=0;
  if (input === 'roll') {
    let dieRoll=0; let amount=0; let diceText=""; let reply="";
    for(i=0; i<x; i++) { 
      dieRoll=parseInt((Math.random() * 6)+1);
      diceText+=dice[dieRoll]+" "; amount+=dieRoll; 
      if dieRoll>high) { high=dieRoll; }
      if(dieRoll==6) { crit+=1; } 
      if(dieRoll==5) { stun+=1; } }
    reply=diceText+" "+amount
    if(crit>1) { reply+=", "+crit+ " critical successes"; }
    else if(crit==1) { reply+=", 1 critical success"; }
    else if(stun>0) { reply+=", "+stun+" stun"; }
    else if(high>2) { reply+=", fail"; }
    else reply+=", epic fail";
    
    msg.reply(reply); 
    x=0; input="";
  }
  if (msg.content === 'roll') { msg.reply('pong'); }
});

client.login(tokenId);
