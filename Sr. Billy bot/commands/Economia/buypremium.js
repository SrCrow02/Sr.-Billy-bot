const db = require('quick.db');
const Discord = require('discord.js');

exports.run = async (client, message, args) => {
	//Emoji
	const premiumE = client.emojis.cache.find(emoji => emoji.name === "diamanteBilly");

	//Definindo as let
	let user = message.author;
	let pr = await db.fetch(`premium_${user.id}`);
	let coins = await db.fetch(`coins_${user.id}`)

	//Embed
	const embed = new Discord.MessageEmbed()
	.setTitle(`${premiumE} ` + 'Premium')
	.setColor('ORANGE')
	.setDescription(`Você já possui premium`)

	//Embed
	const embed1 = new Discord.MessageEmbed()
	.setTitle(`${premiumE} ` + 'Premium')
	.setColor('ORANGE')
	.setDescription('Você comprou premium com sucesso!!')

	//Se usuario ja tiver premium embed
	if(pr === 1){
		return message.channel.send(embed)
		
	}
	//Caso ele não tenha embed1
	else if(coins >= 50){

		//Setando premium, retirando coins e setando o premium
		db.set(`premium_${user.id}`, 1)
		db.subtract(`coins_${user.id}`, 50)

		message.channel.send(embed1);
	}else if(coins < 5000)message.channel.send("Você não tem dinheiro o bastante!!!")
}