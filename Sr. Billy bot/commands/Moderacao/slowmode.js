const Discord = require('discord.js')
//Comando de Slowmode 
exports.run = async (bot, message, args) => {
    
    let user = args[0];
    let text = args.slice(1).join(" ") || undefined;
    let reason = args[0];

    if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`Você não tem premissão de \`Gerenciar Canais\`.`);
    if (!message.guild.me.hasPermission("MANAGE_CHANNELS")) return message.channel.send("Eu não tenho permissão para executar esse comando.")

    if (reason > 21600) return message.channel.send("Insira um valor de  \`0\`  até  \`21600\`  para setar o  \`Slowmode\` !")

    if (!args[0]) {
        return message.channel.send(`Insira um Número de  \`0\`  até  \`21600\`  Para Poder ser Possível setar o  \`Slowmode\`  ou  \`Modo Lento\` !`)
    }

    if(isNaN(args[0])) return message.channel.send(`Não foi possível setar o Slowmode pois  \`${args[0]}\` não é um número. Da próxima vez tente usar números ${message.author}!`)

    message.channel.setRateLimitPerUser(args[0])
    message.channel.send(`${message.author} colocou  \`${args[0]}\` segundos no canal ${message.channel}!`)
}