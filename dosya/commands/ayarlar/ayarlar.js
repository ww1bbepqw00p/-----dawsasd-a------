const { Command } = require('discord.js-commando')
const { RichEmbed } = require('discord.js');

module.exports = class channelinfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'ayarlar',
			group: 'ayarlar',
			memberName: 'ayarlar',
			description: 'Sunucudaki ayarları gösterir.',
			guildOnly: true,
		});
	}

	    hasPermission(msg) {
        if(!msg.guild) return this.client.isOwner(msg.author);
        return this.client.isOwner(msg.author) || msg.member.hasPermission('MANAGE_MESSAGES');
    }

	async run(msg) {

        const modlog = msg.guild.channels.get(msg.guild.settings.get('modLog'))
        const logsChannel = msg.guild.channels.get(msg.guild.settings.get('logsChannel'))
        const reklamEngel = msg.guild.channels.get(msg.guild.settings.get('reklamEngel'))
    const embed1 = new RichEmbed()
    .setColor('RANDOM')
    .setTitle('Ayarlar;')
    .addField('Mod-Log Kanalı', modlog ? modlog : 'Belirlenmemis.', true)
    .addField('Hoş Geldin Kanalı', logsChannel ? logsChannel : 'Belirlenmis', true)
    .setFooter('Botu Daha Saglikli Kullanmak Icin Butun Kanallari Belirtin,')
    return msg.embed(embed1)

	}
}
