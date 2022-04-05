const { Command, colors } = require('../../utils')
const { MessageEmbed } = require('discord.js');

module.exports = class unwarn extends Command {
  constructor(name, client) {
    super(name, client)

    this.name = 'unwarn'
    this.aliases = ['unwarn']
    this.category = 'Mod'
  }

  async run(message, args) {
    const unwarn = message.mentions.members.first();
    const emptyMessage = new MessageEmbed()
      .setColor(colors['mod'])
      .setTitle('<:plus:955577453441597550> **Unwarn:**', `${message.author.username}`, true)
      .setDescription('Este comando funciona em conjunto com o comando warn e irá remover todas as advertências prévias de um usuário.') // inline false
      .addField('*Uso do comando:*', '`unwarn <@user>`', true)
      .addField('*Exemplo:*', '`unwarn @Solaris#0006`', true)

    if (!unwarn) return message.reply({ embeds: [emptyMessage] })

    const adv1 = message.guild.roles.cache.find(role => role.name === 'Advertência 1');
    const adv2 = message.guild.roles.cache.find(role => role.name === 'Advertência 2');
    const adv3 = message.guild.roles.cache.find(role => role.name === 'Advertência 3');
    if (!adv1) return message.reply('Não foi encontrado um cargo de `Advertência 1` no servidor.')
    if (!adv2) return message.reply('Não foi encontrado um cargo de `Advertência 2` no servidor.')
    if (!adv3) return message.reply('Não foi encontrado um cargo de `Advertência 3` no servidor.')

    const usuario = message.mentions.members.first() || message.guild.members.cache.get(args[0])

    const embedA = new MessageEmbed()

      .setTimestamp()
      .setColor(colors['mod'])
      .setTitle('**Err:**', `${usuario}`, true)
      .setDescription('Missing Permissions') // inline false
      .addField('*Verifique se você possui a permissão:*', '`MANAGE_ROLES`', true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })

    if (!message.member.permissions.cache.has('MANAGE_ROLES')) return message.reply({ embeds: [embedA] })

    const unwarnembed = new MessageEmbed()

      .setThumbnail(message.author.avatarURL({ dynamic: true, size: 1024 }))
      .setTitle('Aviso | Removido')
      .setColor('#ff004c')
      .addField('**Staff:**', `${message.author}`, true)
      .addField('**ID:**', `${message.author.id}`, true) //inline
      .addField('**Usuário**:', `${unwarn}`, true)
      .setFooter({ text: '🧁・Discord da Jeth', iconURL: message.guild.iconURL({ dynamic: true, size: 1024 }) })
      .setTimestamp();

    if (unwarn.roles.cache.has(adv1?.id))
      unwarn.roles.remove(adv1)

    if (unwarn.roles.cache.has(adv2?.id))
      unwarn.roles.remove(adv2)

    if (unwarn.roles.cache.has(adv3?.id))
      unwarn.roles.remove(adv3)
    message.reply({ embeds: [unwarnembed] })
  }
}