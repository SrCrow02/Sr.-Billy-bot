const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    //Definindo usuario e idade
    let user = message.author;
    let idade = await db.fetch(`idade_${user.id}`);

    const embed = new Discord.MessageEmbed()
    .setTitle('Idade')
    .setColor('ORANGE')
    .setDescription(`Você alterou sua idade para **${args}**`)

    if(args === null) args = 'Digite b.setidade <args>'

    if(args.length > 3)return message.channel.send(`Desculpe são permitidos apenas 3 digitos`)

    if(!isNaN(args))return message.channel.send(`É permitido apenas numeros`)

    if(!args){
        message.channel.send("Você precisa colocar uma idade!");
    }else{
        db.set(`idade_${user.id}`, args);
        message.channel.send(embed)
    }  
}