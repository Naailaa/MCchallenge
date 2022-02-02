const { memberNicknameMention } = require("@discordjs/builders");
const { channel } = require("diagnostics_channel");
const Discord = require("discord.js");
const { exit } = require("process");
const client = new Discord.Client({
    intents: [
        Discord.Intents.FLAGS.GUILDS,
        Discord.Intents.FLAGS.GUILD_MESSAGES,
        Discord.Intents.FLAGS.GUILD_MEMBERS,
        Discord.Intents.FLAGS.GUILD_VOICE_STATES
    ]
});
const prefix ="!";
client.login("OTM3NTM0OTk3Mjg2NDk0MjM4.YfdJgQ.VuStSc4yNSfIwxNFCkxQ6zsmZ40")


client.on("ready",()=>{
    console.log("bot opérationnel");
});

//DM TOUS LES MEMBRES
client.on("messageCreate",message =>{
    if (message.content === prefix+"all") {
        message.guild.members.cache.forEach(member => {
            member.send("Hello, il y'a une reunion!").catch(e => console.error(`Couldn't DM member ${member.user.tag}`));
        });
    }
});

//DM LES ABSENTS
client.on("messageCreate",message =>{
    if (message.content === prefix+"presence") {
        message.guild.members.cache.forEach(member1 => {
            var trouve=0
            message.member.voice.channel.members.forEach(member=>{
                if(member1.id === member.id){
                    trouve=1
                }
            });
            if(trouve===0){
                member1.send("vous avez rate la reunion!").catch(e => console.error(`Couldn't DM member ${member1.user.tag}`));
                const fs = require('fs');
                fs.appendFile('absents.txt',String(member1.user.tag)+'\n', function (err) {
                if (err) throw err;
                console.log('Fichier mis à jour !');});
            }
        });
    }
});

//DONNE LES PARTICIPANTS ACTUEL AU VOICE CHANNEL
client.on("messageCreate",message =>{
    if (message.content === prefix+"m") {
        message.member.voice.channel.members.each(member=>{
            console.log(member.user.tag)
        });
    }
});

//DONNE LA LISTE DES PARTICIPANTS ET DM QUAND ILS ENTRENT ET SORTENT
client.on("messageCreate",message =>{
    if(message.author.bot) return;
    if(message.content===prefix+"start"){
        client.on('voiceStateUpdate', (oldVoice,newVoice) => {
            let user = client.users.cache.get(newVoice.id);
            let log = client.channels.cache.get('938237437161910342');
            let oldvoice =client.channels.cache.get(oldVoice.channelId);
            let newvoice =client.channels.cache.get(newVoice.channelId);
            if(newvoice) return user.createDM().then(channel=>{
                channel.send("Vous etes dans la reunion!");
                const fs = require('fs');
                fs.appendFile('participants.txt',String(user.tag)+'\n', function (err) {
                if (err) throw err;
                console.log('Fichier mis à jour !');});
            });
            if(oldvoice && !newvoice) return user.createDM().then(channel=>{
               channel.send("Vous avez quitte la reunion");
            });
        });
    }
    if(message.content===prefix+"stop"){
        process.exit(1);
    }
});
