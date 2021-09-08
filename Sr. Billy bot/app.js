const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config.json')
const db = require('quick.db');

client.on("ready", () => {
  let activities = [
      `${client.channels.cache.size} canais!`,
      `${client.users.cache.size} usuários!`,
      `Utilize b.help para ver meus comandos`,
    ],
    i = 0;
  setInterval( () => client.user.setActivity(`${activities[i++ % activities.length]}`, {
        type: "WATCHING"
      }), 1000 * 40); 
  client.user
      .setStatus("dnd")
      .catch(console.error);
console.log("Estou Online!")
console.log(`Estou em ${client.guilds.cache.size} servidores`)
});


client.on("guildMemberAdd", async member => {
  member.guild.channels.get('6').send(member.user.username + 'Entrou no server!');
  member.send('Obrigado por entrar no meu servidor');
})

client.on("guildCreate", guild => {
  
    console.log(`O bot entrou no servidor: ${guild.name} (ID do servidor: ${guild.id}). Membros: ${guild.memberCount} membros!`);
    client.user.setActivity(`Estou em ${client.guilds.cache.size} servidores.`);
});

client.on("guildDelete", guild => {
    console.log(`O bot foi removido do servidor: ${guild.name} (ID do servidor: ${guild.id})`);
    client.user.setActivity(`Serving ${client.guilds.cache.size} servers`);
});

client.on("message", async message => {

    if(message.channel.type === "dm") return;
  
    if(!message.content.startsWith(config.prefix))return;

    let args = message.content.split(" ").slice(1);
    let command = message.content.split(" ")[0];

    command = command.slice(config.prefix.length);
    try{
      let commandFile = require(`./commands/Economia/${command}.js`);
      delete require.cache[require.resolve(`./commands/Economia/${command}.js`)];
      return commandFile.run(client, message, args);
    }catch (err){
        console.error("Error: " + err);
    }


    let argss = message.content.split(" ").slice(1);
    let commands = message.content.split(" ")[0];

    commands = commands.slice(config.prefix.length);
    try{
      let commandFiles = require(`./commands/Moderacao/${command}.js`);
      delete require.cache[require.resolve(`./commands/Moderacao/${command}.js`)];
      return commandFiles.run(client, message, args);
    }catch (err){
        console.error("Error: " + err);
    }
  })

 client.on('message', message => {

	const embed = new Discord.MessageEmbed()
	.setTitle(`Sr. Billy`)
	.setColor('ORANGE')
	.setDescription(`Olá sou o Sr. Billy, meu prefixo é **${config.prefix}** pra ver meu comandos digite **${config.prefix}help**`)

  	if (message.author.bot) return;
  	if (message.channel.type == 'dm') return;
  	if (
      message.content == '<@884286072664784947>' ||
      message.content == '<@!884286072664784947>'
  ) {
      return message.channel.send(embed);
  }
});


client.login(config.token)
