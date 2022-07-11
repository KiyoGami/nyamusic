const config = require('../../config.json')
module.exports = {
    name: 'server',
    aliases: ['sv'],
    inVoiceChannel: false,
    run:async (client, message) => {
        guild = await message.guild.fetch()
        notbot = guild.members.cache.filter(member => !member.user.bot).size
        owner = await client.users.fetch(guild.ownerId)
        embed = {
            color: message.member.displayColor,
            author: {
                name: guild.name,
                icon_url: guild.iconURL()
            },
            description: `**Thành viên**: \`${guild.memberCount}\`
                          \n**Số lượng channel** (text/voice): \`${guild.channels.cache.size}\`
                          \n**Roles**: \`${guild.roles.cache.size}\` role
                          \n**Emojis** (ảnh/động): \`${guild.emojis.cache.size}\` emoji
                          \n**Bót**: \`${guild.memberCount - notbot}\` bot
                          \n**Chủ**: \`${owner.tag}\` 
                          \n**Ngày thành lập**: \`${guild.createdAt.toLocaleDateString(guild.preferredLocale, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}\` (${guild.preferredLocale})
                          \n**Mô tả**: \`${guild.description ? guild.description : 'không có'}\``,
            timestamp: new Date(),
            footer: {
                text: 'Thông tin server',
                icon_url: config.icon.server
            }
        }
        message.channel.send({embeds: [embed]})
    }
}       