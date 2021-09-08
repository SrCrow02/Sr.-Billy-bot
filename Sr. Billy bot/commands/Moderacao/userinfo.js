const Discord = require('discord.js')

const moment = require('moment')
moment.locale('pt-br')

exports.run = async (client, message, args) => {

    const inline = true
    const status = {
      online: ' `🟢` Online',
      idle: ' `🟠` Ausente',
      dnd: ' `🔴` Não pertubar',
      offline: ' `⚫️` Offline'
    }

    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member
    const target = message.mentions.users.first() || message.author
    const bot = member.user.bot ? '`🤖` Sim' : ' `🚫` Não'

    const embed = new Discord.MessageEmbed()
      .setColor('ORANGE')
      .setAuthor(`Informações do usuário`)
      .setThumbnail(member.user.displayAvatarURL)
      .addField(`**Tag**`, `${member.user.tag}`, inline)
      .addField(`**ID Discord**`, member.user.id, inline)
      .addField(`**Nickname**`, `${member.nickname !== null ? `Nickname: ${member.nickname}` : 'Nenhum'}`, true)
      .addField('**Bot**', `${bot}`, inline, true)
      .addField('**Status**', `${status[member.user.presence.status]}`, inline, true)
      .addField('**Jogando**', `${member.user.presence.game ? `${member.user.presence.game.name}` : ' Nada'}`, inline, true)
      .addField('**Cargos**', `${member.roles.cache.filter(r => r.id !== message.guild.id).map(a => `\`${a.name}\``).length}`,`${member.roles.cache.filter(r => r.id !== message.guild.id).map(roles => `<@&${roles.id}>`).join(", ") || "Esse membro não possui cargos."}`, true)
      .addField(`**Entrou no Discord em**`, formatDate('DD/MM/YYYY, às HH:mm:ss', member.user.createdAt))
      .addField(`**Entrou no servidor em**`, formatDate('DD/MM/YYYY, às HH:mm:ss', member.joinedAt))
      .setTimestamp()
    message.channel.send(embed)
  };

function formatDate (template, date) {
  var specs = 'YYYY:MM:DD:HH:mm:ss'.split(':')
  date = new Date(date || Date.now() - new Date().getTimezoneOffset() * 6e4)
  return date.toISOString().split(/[-:.TZ]/).reduce(function (template, item, i) {
    return template.split(specs[i]).join(item)
  }, template)
}
