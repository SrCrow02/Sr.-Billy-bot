const db = require('quick.db');
const ms = require('ms');
const Discord = require("discord.js");

exports.run = async (client, message, args) => {

        //Emoji
        const dinheiro = client.emojis.cache.find(emoji => emoji.name === "dinheiroBilly");

        //Definindo usuario e avatar
        let avatar = message.author.displayAvatarURL({format: 'png'});
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;
        
        //Tempo de espera pra cada daily
        let timeout = 84000000;
        let author = await db.fetch(`worked_${user.id}`);

        //Embed se o tempo não for 0
        let embedErro = new Discord.MessageEmbed()
        .setTitle(`Daily`)
        .setColor('ORANGE')
        .setThumbnail(`${avatar}`)
        .setDescription(`${user}, Você já pegou seu premio. Volte mais tarde!`)

        //Se tempo não for concluido embedErro
        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));
            return message.channel.send(embedErro)
        } else {

            //Numero aleatorio do daily
            let amount = Math.floor(Math.random() * 100) + 300;

            //Embed de sucesso
            let embed = new Discord.MessageEmbed()
            .setTitle(`Daily`)
            .setColor('ORANGE')
            .setThumbnail(`${avatar}`)
            .setDescription(` | Você recebeu:` + `\n${dinheiro} **Dinheiro:** ${amount}`);

            //Adicionando dinheiro
            db.add(`coins_${user.id}`, amount)
            db.set(`worked_${user.id}`, Date.now())

            message.channel.send(`${user}`, embed);
        }
}

