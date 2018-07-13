const { Command } = require('discord.js-commando');

module.exports = class BlacklistCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'blacklist',
			aliases: ['karaliste', 'kara-liste'],
			group: 'admin',
			memberName: 'blacklist',
			description: 'Belirlediniz Kisiyi Kara Listeye Alirsiniz.',
			throttling: {
				usages: 2,
				duration: 3
			},
			guarded: true,

			args: [
				{
                    key: 'user',
                    label: 'kişi',
					          prompt: 'Kara Listeye Almak Isdediniz Kisi Kim ?',
                    type: 'user',
				}
			]
		});
	}

	hasPermission(msg) {
		return this.client.isOwner(msg.author);
	}

	run(msg, { user }) {
		if (this.client.isOwner(user.id)) return msg.reply('Kendini Nasil Alacan ?');

		const blacklist = this.client.provider.get('global', 'userBlacklist', []);
		if (blacklist.includes(user.id)) return msg.reply('Bu Kisi Zaten Kara Listede.');

		blacklist.push(user.id);
		this.client.provider.set('global', 'userBlacklist', blacklist);

		return msg.reply(`\`${user.tag}\` Kara Listeye Aldik.`);
	}
};
