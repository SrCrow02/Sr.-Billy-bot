const db = require('quick.db')
const Discord = require('discord.js')

exports.run = async (client, message, args) => {

    //Definindo usuario e sobremim
    let user = message.author;
    let sobre = await db.fetch(`sobre_${user.id}`);

    const embed = new Discord.MessageEmbed()
    .setTitle('Sobremim')
    .setColor('ORANGE')
    .setDescription(`Você alterou seu sobremim para **${args[0]}**`)

    if(args[0] === null) args[0] = 'Digite b.sobremim <args>'

    if(args[0].length > 25)return message.channel.send(`Desculpe são permitidos apenas 25 digitos`)

    if(!isNaN(args[0]))return message.channel.send(`É permitido apenas letras`)

    if(!args[0]){
        message.channel.send("Você precisa colocar uma descrição");
    }else{
        db.set(`sobre_${user.id}`, args[0]);
        message.channel.send(embed)
    }  
}