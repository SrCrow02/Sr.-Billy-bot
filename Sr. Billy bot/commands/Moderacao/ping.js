const Discord = require(`discord.js`)

module.exports.run = async (client, message, args) => {

  //emoji
  const spaceping = client.emojis.cache.find(emoji => emoji.name === "Space_ping");

  //Messagem de carregando
  const pingMessge = await message.channel.send(('Carregando...'), 100);

  //Embed
  const embed = new Discord.MessageEmbed()
  .setTitle(`${spaceping} | Ping`)
  .setColor('ORANGE')
  .setDescription(`** | Meu Ping**\nServidor: **${pingMessge.createdTimestamp - message.createdTimestamp}ms.**\nAPI: **${Math.round(client.ws.ping)}ms**`)

  console.log(`LoadPing: ${pingMessge}`)

  //Print embed
  pingMessge.edit(embed);
  console.log(`ExelPing: ${pingMessge.edit} & ${message.author}`)
};