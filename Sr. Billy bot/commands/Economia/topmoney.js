const Discord = require('discord.js');
const db = require('quick.db');

exports.run = async (bot, message, args) => {
        const dinheiro = bot.emojis.cache.find(emoji => emoji.name === "dinheiroBilly");
        let money = db.all().filter(data => data.ID.startsWith(`coins_`)).sort((a, b) => b.data - a.data);
        let user = message.author;
        let avatar = user.displayAvatarURL({format: 'png'});
        
        if (!money.length) {
            let noEmbed = new Discord.MessageEmbed()
                .setAuthor(message.member.id,message.author.displayAvatarURL())
                .setColor("ORANGE")
                .setFooter("Nada para ver aqui!")
            return  message.channel.send(noEmbed)
        };

        money.length = 10;
        var finalLb = "";
        for (var i in money) {
            if (money[i].data === null) money[i].data = 0
            finalLb += `**${money.indexOf(money[i]) + 1}. ${bot.users.cache.get(money[i].ID.split('_')[1]) ? bot.users.cache.get(money[i].ID.split('_')[1]).tag : "Invalido#0000"}** \n➥ ${money[i].data} ${dinheiro}\n`;
        };

        const embed = new Discord.MessageEmbed()
            .setTitle("Top - Dinheiro")
            .setColor("ORANGE")
            .setThumbnail(avatar)
            .setDescription(`Esta é a lista de membros com mais moedas \n\n` + finalLb)
            .setFooter(bot.user.tag, bot.user.displayAvatarURL())
            .setTimestamp()
             message.channel.send(`${message.author}`, embed);
};