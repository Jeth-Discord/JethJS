const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js')

module.exports = class GifBan extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'gifban'
    this.aliases = ['gifban', 'banimentogif', 'bangif', 'gifbanimento']
    this.category = 'Mod'
    this.permissions = ['MANAGE_GUILD']
  }

  async run(message, args) {
    const doc = await this.client.database.user.getOrCreate(message.author.id)

    const teste = new MessageEmbed()
      .setAuthor('Jeth | Banimento Teste', this.client.user.avatarURL({ dynamic: true, size: 1024 }))
      .setDescription(`${message.author} baniu @USER#0000!`)
      .setImage(`${doc.gifban}`)
      .addField('Usuário:', `USER#0000`, true)
      .addField('ID:', `0000000000000000`, true)
      .addField('Motivo:', `Banido por ${message.author.tag} — Não relatou um motivo.`, false)
      .setColor(colors.default)
      .setFooter('🧁・Discord da Jeth', message.guild.iconURL({ dynamic: true, size: 1024 }))
    message.channel.send({ embed: teste })
  }
}