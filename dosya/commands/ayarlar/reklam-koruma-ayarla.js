const { Command } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')

module.exports = class BlacklistUserCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'reklam-koruma-ayarla',
			aliases: ['reklamengel', 'reklam', 'reklamengelle', 'reklam-engelleme'],
			group: 'ayarlar',
			memberName: 'reklam-koruma-ayarla',
			description: 'Reklam engelleme özelliğini açıp/kapatmanızı sağlar.',
			guildOnly: true,
			throttling: {
				usages: 1,
				duration: 10
			},

			args: [
				{
					key: 'string',
					prompt: 'Reklamlar engellensin mi?(evet ya da hayır olarak cevap yazınız)\n',
					type: 'string',
					validate: string => {
						if (string === 'evet' || string === 'hayır') return true;
						else return 'lütfen `evet` ya da `hayır` yazınız';
					}
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author) || msg.member.hasPermission("ADMINISTRATOR")
	}

	async run(msg, args) {
			if (args.string === "evet") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', true);
        const embed = new RichEmbed()
        .setColor('RANDOM')
        .setDescription(`Reklam Engelleme: **Acildi**.`)
        .setFooter('Reklam Engelleme Ayarlandı.')
        msg.embed(embed)
			}
			if (args.string === "hayır") {
				const vt = this.client.provider.get(msg.guild.id, 'reklamEngel', []);
				this.client.provider.set(msg.guild.id, 'reklamEngel', false);
        const embed1 = new RichEmbed()
        .setColor('RANDOM')
        .setDescription(`Reklam Engelleme: **Kapali**.`)
        .setFooter('Reklam Engelleme Ayarlandi.')
        return msg.embed(embed1)
			}
	}
};
