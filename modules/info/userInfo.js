const config = require('../../config.json')
module.exports = {
    name: 'user',
    aliases: ['mem', 'member'],
    inVoiceChannel: false,
    run:async (client, message) => {
        const users = Array.from(message.mentions.users.values())
        let member
        if(users.length) member = await message.guild.members.fetch(users[0].id)
        else member = message.member
        const roles = member.roles.cache.map(role => role.name)
        const listRoles = '\`' + roles.join('\`--\`') + '\`'
        embed = {
            color: message.member.displayColor,
            author: {
                name: member.displayName,
                icon_url: member.displayAvatarURL()
            },
            thumbnail:{
                url: member.displayAvatarURL()
            },
            description: `**Ngày tham gia**: \`${member.joinedAt.toLocaleDateString(message.guild.preferredLocale, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}\` (${message.guild.preferredLocale})
                          \n**Nickname**: \`${member.nickname ? member.nickname : 'Không có'}\`
                          \n**Mã màu**: \`${member.displayHexColor}\`
                          \n**Vai trò**: ${listRoles}`,
            timestamp: new Date(),
            footer: {
                text: 'Thông tin thành viên',
                icon_url: config.icon.avatar
            }
        }
        message.channel.send({embeds: [embed]})
    }
}       