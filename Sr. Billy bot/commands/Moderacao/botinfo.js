const Discord = require('discord.js')

exports.run = async(client, message, args) => {

	const embed = new Discord.MessageEmbed()
    .setColor('ORANGE')
    .setDescription(`Olá ${message.author}, Abaixo está uma listinha sobre mim:`)
    .setTimestamp()
    .setFooter(`${message.author.username}`)
    .addFields(
        {
            name: `Meu prefixo`,
            value: `Prefixo: **b.**`,
            inline: true
        },
        {
            name: `Servidores:`,
            value: `Estou em **${client.guilds.cache.size}** servidores.`,
            inline: true
        },
        {
            name: `Usuários:`,
            value: `Cuido de **${client.users.cache.size}** usuários.`,
            inline: true
        },
        {
            name: `Meu ping:`,
            value: `**${Math.round(client.ws.ping)}** ms`,
            inline: true
        },
        {
            name: `Meu criador:`,
            value: `SrCrow#1111`,
            inline: true
        },
        {
            name: `Meu site:`,
            value: 'Em breve',
            inline: true
        },
        {
          name: `Como usar?`,
          value: 'Bom e facil! use **b.** como prefix e **b.help** para ver meus comandos!',
          inline: true
      }
    )
    message.channel.send(embed);
}
