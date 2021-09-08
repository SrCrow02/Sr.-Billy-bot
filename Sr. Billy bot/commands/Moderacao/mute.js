const { MessageEmbed } = require("discord.js");
const Discord = require('discord.js')

module.exports = {
  name: "mute",
  description: "Mutar",
  category: "moderation",
  usage: "mute <@mention> <reason>",
  run: async (client, message, args) => {
    if (!message.member.hasPermission("MANAGE_ROLES")) {
      return message.channel.send(
        "Você não tem permissão para executar esse comando!"
      );
    }

  var membro = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

    if (!message.guild.me.hasPermission("MANAGE_ROLES")) {
      return message.channel.send("Eu não tenho permissão!");
    }

    const user = message.mentions.members.first();
  
   if(!args[0]) return message.channel.send('Mencione um Membro!');

        if(!user) return message.channel.send('Não encontrei esse usuário!');

    if(user.id === message.author.id) {
      return message.channel.send("Não se deve se mutar bobão -_-");
    }
    
    
    let reason = args.slice(1).join(" ")
    
    
    if(!reason) {
      return message.channel.send("Diga o Motivo!")
    }
    
  //TIME TO LET MUTED ROLE
    
    let muterole = message.guild.roles.cache.find(x => x.name === "Silenciado")
    
        const banembed = new Discord.MessageEmbed()
        .setTitle('Mute')
        .setThumbnail(user.user.displayAvatarURL())
        .addField('Usuário Mutado:', user)
        .addField('Mutado por:', message.author)
        .addField('Motivo:', reason)
        .setFooter('Mutado, quebrar as regras da nisso!', client.user.displayAvatarURL())
        .setTimestamp()
      if(!muterole) {
      return message.channel.send("Este, servidor não tem o cargo `Silenciado`, Crie um!")
    }
    
    
   if(user.roles.cache.has(muterole)) {
      return message.channel.send("Membro, já está mutado <a:muted:774789465415090178>")
    }
     user.roles.add(muterole)
      message.channel.send(banembed)
    
    user.send(`Você foi mutado no servidor: **${message.guild.name}** Motivo: \`${reason}\``)
    
    
    
  }
};