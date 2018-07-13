 const { CommandoClient, SQLiteProvider } = require('discord.js-commando');
const { RichEmbed } = require('discord.js')
path = require('path'),
moment = require('moment'),
sqlite = require('sqlite');

const ayarlar = require('./dosya/veriler/botayarlar.json');

const client = new CommandoClient({
    commandPrefix: ayarlar.prefix,
    unknownCommandResponse: false,
    owner: ayarlar.owner,
    disableEveryone: false
});

client.dispatcher.addInhibitor(msg => {
	const blacklist = client.provider.get('global', 'userBlacklist', []);
	if (!blacklist.includes(msg.author.id)) return false;
	msg.react('😡');
	return true;
});

client.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new RichEmbed()
			.setTitle('Suncuya Katildi.')
			.setAuthor(member.user.tag, member.user.avatarURL)
  			.setColor('RANDOM')
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})

  client.on('guildMemberRemove', async member => {
  		if (!member.guild) return;
  		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
  		if (enabled !== true) return;
  		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
  		if (!logCh) return;
  		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
  		if (member.guild.channels.get(logCh).type === "text") {
  			var embed = new RichEmbed()
  			.setTitle('Sunucudan Ayrildi.')
  			.setAuthor(member.user.tag, member.user.avatarURL)
  			.setColor('RANDOM')
  			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
  			.setThumbnail(member.user.avatarURL)
  			.setFooter(`ID: ${member.user.id}`)
  			.setTimestamp();
  			member.guild.channels.get(logCh).send({embed});
  		}
  	})

    client.on('message', async msg => {
    if (!msg.guild) return;
    const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
    const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
    if (veri ==! true) return;
    if (veri === true) {
        const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
        if (swearWords.some(word => msg.content.includes(word))) {
          try {
              if (!msg.member.hasPermission("BAN_MEMBERS")) {
                  msg.delete();

                  return msg.reply('Reklam Yapma! :warning:').then(msg => msg.delete(3000));
              }
          } catch(err) {
            console.log(err);
          }
        }
    }
})

client.on('message', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'basvuru', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'basvur', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new RichEmbed()
			.setTitle('deneme.')
			.setAuthor(member.user.tag, member.user.avatarURL)
  			.setColor('RANDOM')
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	})

client.on('guildMemberAdd', async member => {
  const veri = client.provider.get(member.guild.id, 'girisRolK', []);
  if (veri ==! true) return;
  if (veri === true) {
    const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
    if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
    member.addRole(girisrolveri);
  }
})

client.registry
    .registerDefaultTypes()
    .registerGroups([
		['admin', 'Admin Komutları'],
    ['ayarlar', 'Ayarlar Komutları'],
    ['bot', 'Bot Komutları'],
    ['eglence', 'Eğlence Komutları'],
    ['moderasyon', 'Moderasyon Komutları'],
  ])
    .registerDefaultGroups()
    .registerDefaultCommands()
    .registerCommandsIn(path.join(__dirname, './dosya/commands'));

	sqlite.open(path.join(__dirname, "./dosya/veriler/kayitlar.sqlite3")).then((db) => {
		client.setProvider(new SQLiteProvider(db));
	});

client.on('error', err => {
	console.log(err)
});

client.login(ayarlar.token);
