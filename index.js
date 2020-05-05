require("dotenv").config();

  
let token_obj = require(`token.json`);
var token = token_obj["token"];
// let silvia_channel_id_obj = require(`silvia_channel_id.json`);
// var silvia_channel_id = silvia_channel_id_obj["silvia_channel_id"];
let owner_id_obj = require(`owner_discord_id.json`);
var owner_discord_id = owner_id_obj["owner_discord_id"];
// var report_channel = require("report_channel.json");
var channel_id = report_channel["channel"];

// NPM MODULES
const commando = require("discord.js-commando");
const path = require("path");
const oneLine = require("common-tags").oneLine;
const sqlite = require("sqlite");
sqlite.open("./database.sqlite3");

const client = new commando.Client({
  owner: owner_discord_id,
  commandPrefix: "-",
  disableEveryone: true,
  unknownCommandResponse: false
});


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
  let message=msg.content.toLowerCase(); let [input,x]=message.split(" "); let crit=0; let stun=0; let high=0; let glitch=0;
  if (input === 'roll') {
    let dieRoll=0; let amount=0; let diceText=""; let reply="";
    for(i=0; i<x; i++) { 
      dieRoll=parseInt((Math.random() * 6)+1);
      diceText+=dice[dieRoll]+" "; amount+=dieRoll; 
      if(dieRoll>high) { high=dieRoll; }
      if(dieRoll==6) { crit+=1; } 
      if(dieRoll==5) { stun+=1; } 
      if((dieRoll==1)||(dieRoll==2)) { glitch+=1; } }
    reply=diceText+" Total: "+amount + " High: "+high;
    if(high>4) {
      if(crit>3) { reply+=", Annihilation! "+crit+ " critical successes"; }
      else if(crit==3) { reply+=", triple critical"; }
      else if(crit==2) { reply+=", double critical"; }
      else if(crit==1) { reply+=", critical"; }
      else if(stun>0) { reply+=", "+stun+" stun"; }
      if(glitch >= (x/2)) { reply+=", glitch"; } }
    else if(high>2) { 
      if(glitch >= (x/2)) { reply+=", glitch"; } 
      else { reply+=", miss"; } }
    else if(high>1) { reply+=", fumble"; }
    else { reply+=", epic fail"; }

    msg.reply(reply); 
    x=0; input=""; }
  else if (input === 'ping') { msg.reply('pong'); }
  else if (input === 'data') { msg.reply("Username: "+); }
});

client.login(tokenId);
