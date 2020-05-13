require("dotenv").config();
// const Telegraf = require("telegraf");
// const session = require("telegraf/session");
const { textHandler } = require("./src/handlers/textHandler");

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
  let words=message.split(" ");
  let [input,x]=[words[0],words[1]];
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
    if (x) { words.shift(); 
       if(words[0]==="roll") { reply+="\n Type `roll` and a number, like `roll 2`. Try it." }
       else { let answer=words.join(" "); reply+="\nI don't know much about `"+answer+"`"; } }
    msg.reply(reply); }
  else if (input === 'ping') { msg.reply('pong'); }
  else if (input === 'data') { msg.reply("Username: "+" none"); }
  else if (input === 'user') { 
    reply="Collecting data \n";
// reply+="msg.d.message_id "+msg.d.message_id+"/n";
// reply+="msg.d.user_id "+msg.d.user_id+"/n";
 reply+="msg.author.id "+msg.author.id+"\n";
// reply+="user.id "+user.id+"\n";
    msg.reply(reply); }

});

client.login(tokenId);

/*
// command handler
const Markup = require("telegraf/markup");
const { sessionInit } = require("../sessionInit");
const { deposit } = require("./commands/deposit");
const { balance } = require("./commands/balance");
const { withdraw } = require("./commands/withdraw");
// const { checkDeposits } = require("./commands/checkDeposits");


module.exports.commandHandler = bot => {
  bot.start(async ctx => {
    if (ctx.chat.type == "private") await start(ctx);
  });

  bot.help(ctx => {
    if (ctx.chat.type == "private") help(ctx);
  });

  bot.command("menu", ctx => {
    if (ctx.chat.type == "private") menu(ctx);
  });

  bot.command("balance", async ctx => {
    await isAllowed(ctx, balance);
  });

  bot.command("deposit", async ctx => {
    await isAllowed(ctx, deposit);
  });

  bot.command("withdraw", async ctx => {
    await isAllowed(ctx, withdraw);
  });
};

const isAllowed = async (ctx, commandFunction) => {
  if (ctx.chat.type == "private") {
    if (ctx.from.is_bot) return ctx.reply('Only humans accepted.');
    if (!ctx.session.wallet) await sessionInit(ctx);
    await commandFunction(ctx)
  }
}

const start = async ctx => {
  await sessionInit(ctx);

  ctx.reply(
    `Hello ${ctx.from.first_name}!`,
    Markup.keyboard([["/balance", "/help"], ["/deposit", "/withdraw"]])
      .oneTime()
      .resize()
      .extra()
  );
};

const help = ctx => {
  helpMsg = `
⚛️ Atomic Help Page ⚛️\n
To tip just type a number and atom 
eg. "0.01 atom" when replying to a message 
or ⚛️=0.01 or 🎲=0.01x1-6 or 🤖=0.10 or 👽=1
What can I help you with? 
Here are a list of my commands:
Type:
/deposit - for information on depositing 
/help - for information on tipping ⚛️ Atom ⚛️ 
/withdraw - withdrawing ⚛️ Atom ⚛️  
/balance - get your ⚛️ Atomic ⚛️ balance
If you need further assistance, please contact @dreamtrove
`
  ctx.replyWithMarkdown(
    helpMsg,
    Markup.keyboard([["/balance", "/help"], ["/deposit", "/withdraw"]])
      .oneTime()
      .resize()
      .extra()
  );
};

const menu = ctx => {
  ctx.reply(
    `Main Menu:`,
    Markup.keyboard([["/balance", "/help"], ["/deposit", "/withdraw"]])
      .oneTime()
      .resize()
      .extra()
  );
};
// end command handler 
*/ 







/*
// text handler
const Markup = require("telegraf/markup");
const { getSession } = require("../dynamoDB");
const { sessionInit } = require("../sessionInit");
const { transactionInit } = require("../transactionInit");
const { dbLock } = require("../dbLock/dbLock");
const { toggleLock } = require("../dbLock/toggleLock");

module.exports.textHandler = async bot => {
  bot.on("text", async ctx => {
    if (ctx.chat.type == "private") { privateChat(ctx); } 
    else if (ctx.chat.type == "group" || "supergroup") { await groupChat(ctx); } }); };

// Default answer to unknown messages
const privateChat = ctx => {
  ctx.reply(`Hello ${ctx.from.first_name} this is Atomic bot.\nSee /help for more info.`,
    Markup.keyboard([["/balance", "/help"],["/deposit", "/withdraw"]]).oneTime().resize().extra()); };

const groupChat = async ctx => {

// const session = await getSession(ctx.from.id); if (!session.wallet.honkPoints) await sessionInit(ctx);
// const honkPoints = session.wallet.honkPoints; 
  // if(honkPoints<0.01) { ctx.message.text="ribbit"; }
  
// console.log(`Yo, ${fromUser.first_name} ${session.wallet.honkPoints}`);
  
  let dice=["🎲","⚀","⚁","⚂","⚃","⚄","⚅"]; 
  let slot=["🎰","🐸","♻️","🍋","🤡","🌶️","👽"]; 
  let slotResults=["🎰","🎰","🎰"];
  /// Listen for Tip Message from Group Chat  // RegEx "[number] cy";  // Example: "10 cy" , " 10cy" , "10 CyFrog";
  const re = /[0-9]+ *atom/gi;  const reComma = /(\d{0,3},)?(\d{3},)?\d{0,3} *atom/i;  const reDot = /\d*\.?\d* *atom/gi;
  // const re = /rain [0-9]+/gi; 
  const reSlot = /🚀/g;   const reFaucet = /🚰/g; 
  const reClown = /⚛️/g;  const reCircus = /👽/g; const reFlower = /🤖/g; const reDice = /🎲/g;
  
  
  if (ctx.message.reply_to_message) {
    
    console.log(ctx.chat_id);    
    
    let text = ctx.message.text;
    if (parseFloat(text.match(reDot)) || parseFloat(text.match(reComma))) {
      text = text.includes(".") ? text.match(reDot)[0] : text.match(reComma)[0];
      if (text.includes(".")) {
        let amount = parseFloat(text.replace(/atom/g, ""));
        const tipResult = await tip(ctx, amount); ctx.replyWithMarkdown(tipResult); }
      else if (text.includes(",")) {
        let amount = text.replace(/,/g, ""); const tipResult = await tip(ctx, amount); ctx.replyWithMarkdown(tipResult); }
      else if (text.match(re)) {
        let amount = ctx.message.text.match(re)[0].split(" ")[0];
        const tipResult = await tip(ctx, amount); ctx.replyWithMarkdown(tipResult); } }
    else if (text.match(reFaucet)) {
      let amount = 0.01; const tipResult = await tip(ctx, amount); ctx.replyWithMarkdown(tipResult); }  
    else if (text.match(reClown) || text.match(reCircus) || text.match(reFlower) || text.match(reDice) || text.match(reSlot)) {
      let amount = 0; 
      if (text.match(reClown)) { const matchArray = text.match(reClown);  amount += matchArray.length * 0.01; }
      if (text.match(reFlower)) { const matchArray = text.match(reFlower);  amount += matchArray.length * 0.1; }
      if (text.match(reCircus)){ const matchArray = text.match(reCircus); amount += matchArray.length * 1; }
      let diceText="";
        if (text.match(reDice)){ 
          const matchArray = text.match(reDice);
          for(i=0; i<matchArray.length; i++) { 
            dieRoll=parseInt((Math.random() * 6)+1);
            diceText+=dice[dieRoll]+" ";
            amount+=dieRoll * 0.01 ; } }

        if (text.match(reSlot)){ 
          const matchArray = text.match(reSlot); diceText=""; amount=0;
          for(i=0; i<3; i++) { 
            dieRoll=parseInt((Math.random() * 6)+1); slotResults[i]=slot[dieRoll]; diceText+=slotResults[i]; amount+=dieRoll; }
          if((slotResults[0]==slotResults[1])||(slotResults[1]==slotResults[2])||(slotResults[0]==slotResults[2])) { ; }
          else { amount=parseInt(amount/3); }      
          amount= amount* 0.01 ;
          if(diceText=="🐸🐸🐸") { amount=0.75; }
          if(diceText=="♻️♻️♻️") { amount=0.50; }
          if(diceText=="🍋🍋🍋") { amount=0.50; }
          if(diceText=="🤡🤡🤡") { amount=0.50; }
          if(diceText=="🌶️🌶️🌶️") { amount=0.50; }
          if(diceText=="👽👽👽") { amount=1.00; }
        }
      
      const tipResult = await tip(ctx, amount); ctx.replyWithMarkdown(tipResult+" "+diceText); } } };   

const tip = async (ctx, amount) => {
  amount = parseFloat(amount);
  const fromUser = ctx.from;
  const toUser = ctx.message.reply_to_message.from;

  if (fromUser.id === toUser.id) return `*${fromUser.first_name}*  👏`;
  try { await dbLock(ctx, fromUser.id); if (fromUser.id !== toUser.id) await dbLock(ctx, toUser.id); } catch (err) {
    console.log("testHandler:: 🗝 dbLock error while trying make tip:", err);
    return `*${fromUser.first_name}* sorry, try later.`; }

  await sessionInit(ctx);

  // Tip to bot deprecated
  if (toUser.is_bot) {
    if (fromUser.id !== toUser.id) toggleLock(ctx, toUser.id); toggleLock(ctx, fromUser.id);
    return `*${fromUser.first_name}* you can't tip to bot`; }
  const transactionSuccess = await transactionInit(amount, ctx, toUser);
  if (fromUser.id !== toUser.id) toggleLock(ctx, toUser.id); toggleLock(ctx, fromUser.id);
  let msg = "";
  if (transactionSuccess) {
    msg += `*${fromUser.first_name}* tipped ${amount.toLocaleString("en-US")} ⚛️ Atom ⚛️ to *${toUser.first_name}*`; }
  else {
    console.log("Need more Atom"); msg += `*${fromUser.first_name}* you need more ⚛️ Atom ⚛️`; } 
  return msg; };
// end text handler
*/








/*
const { commandHandler } = require("./src/handlers/commandHandler");
const commandParts = require("telegraf-command-parts");
const { notification } = require("./src/notification");
const rateLimit = require("telegraf-ratelimit");

const bot = new Telegraf(process.env.BOT_TOKEN);

const limitConfig = {
    window: 3000,
    limit: 1,
    onLimitExceeded: (ctx, next) => {
      console.log(`limit exceed for user: ${ctx.from.id}`);
    }
  };
bot.use(rateLimit(limitConfig))
bot.use(session());
bot.use(commandParts());
bot.context.db = { lockedUsers: [] };
// bot.use(Telegraf.log()); // for debugging

// Logger
// bot.use(async (ctx, next) => {
//   console.log("**********");
//   if (ctx.updateSubTypes[0] === 'text') console.log(`text:${ctx.message.text}\nfrom ${ctx.from.id}`);
//   await next();
// });

bot.catch(e => console.log(e));

console.log("ExoBot gonna rock your world!\n");

commandHandler(bot);

// Text Handler must be last updates handler !
textHandler(bot);

bot.launch();
bot.telegram.getMe().then(res => console.log(res));
console.log("Bot running locally\n");
notification(bot);

bot.launch();
bot.telegram.getMe().then(res => console.log(res));
console.log("Bot running locally\n");
notification(bot);
*/
