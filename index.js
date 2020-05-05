require("dotenv").config();

const tokenId = process.env.BOT_TOKEN;
  let dice=["🎲","⚀","⚁","⚂","⚃","⚄","⚅"]; 

const Discord = require('discord.js');
const client = new Discord.Client();

console.log("start");

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
  });

client.on('message', msg => {
  let crit=0; let stun=0; let high=0; let glitch=0; let reply="";
  let message=msg.content.toLowerCase(); 
  let [input,x]=message.split(" ");
  if (input === 'roll') {
    let dieRoll=0; let amount=0; let diceText=""; 
    if(x>0) {
      for(i=0; i<x; i++) { 
        dieRoll=parseInt((Math.random() * 6)+1);
        diceText+=dice[dieRoll]+" "; amount+=dieRoll; 
        if(dieRoll>high) { high=dieRoll; }
        if(dieRoll==6) { crit+=1; } 
        if(dieRoll==5) { stun+=1; } 
        if((dieRoll==1)||(dieRoll==2)) { glitch+=1; } }
      reply=diceText+" Total: "+amount + " High: "+high;
      if(high>5) {
        if(crit>3) { reply+=", Annihilation! "+crit+ " critical successes"; }
        else if(crit==3) { reply+=", triple critical"; }
        else if(crit==2) { reply+=", double critical"; }
        else if(crit==1) { reply+=", critical"; } }
      if(high>4) {
        if(stun>0) { reply+=", "+stun+" stun"; }
        if(glitch >= (x/2)) { reply+=", glitch"; } }
      else if(high>2) { 
        if(glitch >= (x/2)) { reply+=", critical fail"; } 
        else { reply+=", miss"; } }
      else if(high>1) { reply+=", critical fumble"; }
      else { reply+=", epic fail"; } 
      x=0; input=""; msg.reply(reply); }
    else { reply="I want to play!"; x=0; input=""; msg.reply(reply); } }
  if (input === 'soft') {

    let dieRoll=0; let amount=0; let diceText="";
    if(x>0) {
      for(i=0; i<x; i++) { 
        dieRoll=parseInt((Math.random() * 6)+1);
        diceText+=dice[dieRoll]+" "; amount+=dieRoll; 
        if(dieRoll>high) { high=dieRoll; }
        if(dieRoll==6) { stun+=1; } 
        if(dieRoll==5) { stun+=1; } 
        if((dieRoll==1)||(dieRoll==2)) { glitch+=1; } }
      reply=diceText+" Total: "+amount + " High: "+high;
      if(high>4) {
        if(stun>0) { reply+=", "+stun+" stun"; }
        if(glitch >= (x/2)) { reply+=", glitch"; } }
      else if(high>2) { 
        if(glitch >= (x/2)) { reply+=", critical fail"; } 
        else { reply+=", miss"; } }
      else if(high>1) { reply+=", critical fumble"; }
      else { reply+=", epic fail"; }
      x=0; input=""; msg.reply(reply); }
    else { reply="I want to dance!"; x=0; input=""; msg.reply(reply); } }
  if (input === 'talk') {
    reply= "Hi, I'm "+client.user.tag; 
    if (x) { 
      let [words]=x.split(" ");
      if(words[0]) { reply+="\n first word was"+words[0]; }        
      if(words[1]) { reply+="\n second word was"+words[0]; }       
      if(words[2]) { reply+="\n third word was"+words[0]; }       
      if(words[3]) { reply+="\n fourth word was"+words[0]; }       
      if(words[4]) { reply+="\n fifth word was"+words[0]; }       
      else { reply+="\nI don't know much about "+x; } }
    msg.reply(reply); }
  else if (input === 'ping') { msg.reply('pong'); }
  else if (input === 'data') { msg.reply("Username: "+" none"); }
});

client.login(tokenId);
