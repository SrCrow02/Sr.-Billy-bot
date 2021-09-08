const Discord = require('discord.js')

exports.run = async (client, message, args) => {

//Definindo dm de quem vai receber o report
let user = client.users.cache.get("765761364526366740")

//se não tiver argumentos
const reporte = args.join(" ")
if(!reporte) return message.channel.send(`${message.author} você deve digitar o bug`) 

if(args.length > 100)return message.channel.send('Maximo de 100 Caracteres');

const embedSucesso = new Discord.MessageEmbed()
.setTitle('Enviado!')
.setColor('ORANGE')
.setDescription(`O meu criado vai tentar resolver esse bug Obrigado.`)

message.channel.send(embedSucesso)

//embed
const embed = new Discord.MessageEmbed()
.setTitle("Novo bug")
.addField("Autor Da Mensagem", `\`${message.author.tag}\`\n\`${message.author.id}\``)
.addField("Bug Reportado", `${reporte}`)
.setFooter(`Reportado em ${message.guild.name}`)
.setColor("ORANGE")
user.send(embed)
}