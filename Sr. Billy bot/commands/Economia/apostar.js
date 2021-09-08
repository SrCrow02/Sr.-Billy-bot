const Discord = require('discord.js')
const db = require('quick.db');
const ms = require('ms');

exports.run = async (client, message, args) => {
     const dinheiro = client.emojis.cache.find(emoji => emoji.name === "dinheiroTemp");

        //Variaveis
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() ||  message.author;
        let timeout = 3600000;
        let author = await db.fetch(`apostar_${user.id}`);
        let amount = await db.fetch(`coins_${message.author.id}`)

            //embed
            const embedFaltando = new Discord.MessageEmbed()
            .setTitle(`${dinheiro} Aposta`)
            .setColor('ORANGE')
            .setDescription(`Hmmm! Você não tem 100 moedas para apostar!` +
            `\n**Tente pegar seu daily diario** `)

        //dinheiro for menor que 100
        if(amount < 100) return message.channel.send(embedFaltando);

        if(author !== null && timeout - (Date.now() - author) > 0){
            let time = ms(timeout - (Date.now() - author));

             const embedEsperar = new Discord.MessageEmbed()
            .setTitle(`${dinheiro} Aposta`)
            .setColor('ORANGE')
            .setDescription(`Você já apostou suas moedas ${user}. Volte mais tarde!`)

            return message.channel.send(embedEsperar)
        } else {
            let amount = Math.floor(Math.random() * 300) + 1;
            db.add(`coins_${user.id}`, amount)
            db.set(`apostar_${user.id}`, Date.now())
            db.subtract(`coins_${message.author.id}`, 100)

             const embedreceber = new Discord.MessageEmbed()
            .setTitle(`${dinheiro} Aposta`)
            .setColor('ORANGE')
            .setDescription(`Você apostou **100** moedas e recebeu **${amount}**!`)


            message.reply(embedreceber)
        }
  
    }