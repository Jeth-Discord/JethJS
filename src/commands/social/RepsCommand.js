const { Command, colors } = require('../../utils')
const moment = require('moment')
const { MessageEmbed } = require('discord.js')
moment.locale('pt-br')

module.exports = class RepsCommand extends Command {
  constructor(client) {
    super(client)

    this.name = 'reps'
    this.aliases = []
    this.category = 'social'
    this.subcommandsOnly = false
  }

  async run(message, args) {
    const member = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]) || message.author)
    if (!member) return message.channel.send('Algum erro terrível aconteceu, entre em contato com skedaddle via /bug')
    const author = await this.client.database.Users.findById(message.author.id)
    const user = await this.client.database.Users.findById(member.id)
    if (!user) {
      new this.client.database.Users({
        _id: member.id
      }).save()
    }
    if (author) {
      if (user) {
        const embed = new MessageEmbed()
          .setColor(colors['default'])
          .setTimestamp()
          .setThumbnail('https://cdn.discordapp.com/emojis/763532885935259688.png?v=1')
          .setDescription('**REPUTAÇÃO TOTAL:**')
          .addField('Usuário:', `${member}`)
          .addField('Reps:', `${user.rep}`)
          .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
        message.channel.send({ embeds: [embed] })
      }
    }
  }
}