const db = require('quick.db');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
      //Emoji
      const dinheiro = client.emojis.cache.find(emoji => emoji.name === "dinheiroBilly");
      const premiumE = client.emojis.cache.find(emoji => emoji.name === "diamanteBilly");

      //Chamando
      let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;
      let bot = client.users.cache.get("884286072664784947")

      let avatar = user.displayAvatarURL({format: 'png'});
      let avatarBot = bot.displayAvatarURL({format: 'png'});
      let pr = await db.fetch(`premium_${user.id}`);

      //Se dinheiro for nullo definir como 0
      let coins = db.fetch(`coins_${user.id}`)
      if(coins === null) coins = 0;

      //Sobremim
      let sobre = await db.fetch(`sobre_${user.id}`)
      if(sobre === null)sobre = "Digite b.sobremim <args>";
      
      if(pr === 1){
            const embed = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setTitle(`${user.username} ${premiumE}`)
            .setDescription(`${dinheiro} Dinheiro: **R$${coins}** \n${premiumE} Premium:` + '[``on``]' + `\n\n${sobre}`)
            .setThumbnail(`${avatar}`)

            message.channel.send(`${user}`, embed);
      } else {
            const embed = new Discord.MessageEmbed()
            .setColor(`ORANGE`)
            .setTitle(`${user.username}`)
            .setDescription(`${dinheiro} Dinheiro: **R$${coins}** \n${premiumE} Premium:` + '[``off``]' + `\n\n${sobre}`)
            .setThumbnail(`${avatar}`)

            message.channel.send(`${user}`, embed);
      }

       
        
}
