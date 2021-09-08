const Discord = require("discord.js")
const db = require('quick.db')

exports.run = async (client, message, args) => {

  //emoji
  const dinheiro = client.emojis.cache.find(emoji => emoji.name === "dinheiroBilly");
  const erro = client.emojis.cache.find(emoji => emoji.name === "erro");

  //Chamando user
  let user = message.author;

  //Se coin for nullo definir como 0
  let coins = db.fetch(`coins_${user.id}`)
  if(coins === null) coins = 0;

  //Lista cara ou coroa
  var array1 = ["cara", "coroa"];

  //random da lista
  var rand = Math.floor(Math.random() * array1.length);

  //Embeds
  let embederro = new Discord.MessageEmbed()
  .setTitle(`${erro} Erro`)
  .setColor('RED')
  .setDescription(`insira **cara** ou **coroa** e o **valor** na frente do comando`)

  let embederro2 = new Discord.MessageEmbed()
  .setTitle(`${erro} Erro`)
  .setColor('RED')
  .setDescription(`Digitou um valor que você não possui!! tente usar u-daily`)

    let embederro3 = new Discord.MessageEmbed()
  .setTitle(`${erro} Erro`)
  .setColor('RED')
  .setDescription(`Digite um valor acima de 0`)

    let embederro4 = new Discord.MessageEmbed()
  .setTitle(`${erro} Erro`)
  .setColor('RED')
  .setDescription(`Favor digite um valor numerico.`)

  let embederro5 = new Discord.MessageEmbed()
  .setTitle(`${erro} Erro`)
  .setColor('RED')
  .setDescription(`Limite de R$500 estrelas`)

  
  if(args[1] > coins){
   return message.channel.send(embederro2)
  }else if(args[1] <= 0){
    message.channel.send(embederro3)
    return
  }  
   else if (isNaN(args[1])) { 
     return message.channel.send(embederro)
   }
   else if(args[1] > 500){
    return message.channel.send(embederro5)
   }

  if (!args[0] || (args[0].toLowerCase() !== "cara" && args[0].toLowerCase() !== "coroa" || !args[1])) {
    message.reply(embederro);
  } 
else if (args[0].toLowerCase() == array1[rand]) {

  const embed1 = new Discord.MessageEmbed()
  .setTitle(`${dinheiro} Coinflip`)
  .setColor('ORANGE')
  .setDescription(`Deu **${array1[rand]}**, você ganhou ${args[1]} estrelas`)

    message.channel.send(embed1);
    db.add(`coins_${user.id}`, args[1])

  } 
else if (args[0].toLowerCase() != array1[rand]) {

  const embed2 = new Discord.MessageEmbed()
  .setTitle(`${dinheiro} Coinflip`)
  .setColor('ORANGE')
  .setDescription(`Deu **${array1[rand]}**, você perdeu ${args[1]} estrelas`)

    message.channel.send(embed2);
    db.subtract(`coins_${user.id}`, args[1])
  }
};