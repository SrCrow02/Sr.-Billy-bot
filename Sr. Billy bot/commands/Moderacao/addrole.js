const Discord = require('discord.js');

exports.run = (client, message, args) => {

    let membro = message.mentions.users.first();
    if (!membro) return message.reply('Para poder executar o comando, tem que mencionar um membro!')
    if (!message.member.hasPermission('ADMINISTRATOR')) return message.reply("Não tem permissão para esse comando!")
    if (!message.guild.me.hasPermission('ADMINISTRATOR')) return message.reply("Não tenho permissão administrativas!")

    let role1 =
    message.guild.roles.cache.find(r => r.name == args[1]) ||
    message.guild.roles.cache.find(r => r.id == args[1]) ||
    message.mentions.roles.first() || 
    args.join(" ");
     
    var role = message.guild.roles.cache.find(r => r.name === args[1]) ||
    message.guild.roles.cache.find(r => r.id == args[1]) ||
    message.mentions.roles.first()

    if (!role) return message.reply(`Esse cargo não existe nesse servidor.`) 

    if (!role1) return message.reply('Para poder executar o comando, tem que mencionar um cargo!')

    const embed1 = new Discord.MessageEmbed()
        .setTitle("Cargo Update")
        .setDescription(`Executado por: ${message.author.username}\n${membro} recebeu o cargo: <@&${role1.id}> `)
        .setFooter("AddRole", client.user.avatarURL())
        .setColor(`ORANGE`)
        .setTimestamp();

     message.guild.members.cache.get(membro.id).roles.add(role1);
   
    message.channel.send(embed1)
};