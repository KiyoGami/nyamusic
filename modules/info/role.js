const { Collection } = require('discord.js')
const config = require('../../config.json')
const pageExcute = require('../../utils/page.js')
module.exports = {
    name: 'role',
    aliases: [],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        const cache = message.guild.roles.cache
        const roleMap = new Map()
        cache.forEach(role => roleMap.set(role.name.toLowerCase(), {"name": role.name, "id": role.id, "pos": role.position}))
        if(!args.length){
            let roleArray = Array.from(roleMap.values())
            roleArray.sort((a,b) => b.pos - a.pos)
            pageExcute(message, embedRoles(roleArray))
        }else{
            roleName = args.shift().toLowerCase()
            roleFind = roleMap.get(roleName)
            if(!roleFind) return message.channel.send('Không tìm thấy role nào như vậy!')
            message.guild.roles.fetch(roleFind.id).then((role) => {
                message.channel.send({embeds: [embedRole(role, message.guild)]})
           })
        }
    }
}      

function embedRoles(roleArray){
    let array = []
    let lastindex = 10
    for(let i = 0; i < roleArray.length; i+=10){
        let page = roleArray.slice(i, lastindex)
        lastindex += 10
        const listRole = page.map((role, index) => `${index+i+1}. **${role.name}**`).join('\n\n')
        embed = {
            color: config.botColor,
            title: '~Danh sách role theo độ ưu tiên~',
            thumbnail: {
                url: config.botAvatar
            },
            description: `${listRole}`,
            footer:{
                text: `Trang ${i/10 + 1}/${roleArray.length % 10 == 0 ? roleArray.length/10 : (roleArray.length - roleArray.length % 10)/10 + 1}`,
                icon_url: config.icon.role
            }
        }
        array.push(embed)
    }
    return array
}

function embedRole(role, guild){
    embed = {
        color: role.color,
        author: {
            name: role.name,
            icon_url: role.iconURL()
        },
        thumbnail: {
            url: config.botAvatar,
        },
        description: `**Thành viên**: \`${role.members.size}\`
                      \n**Vị trí**: \`${role.position}\`
                      \n**Ngày tạo**: \`${role.createdAt.toLocaleDateString(guild.preferredLocale, {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}\` (${guild.preferredLocale})
                      \n**Mã màu**: \`${role.hexColor}\`
                      \n**Quyền hạn**: \`${role.permissions.toArray().join('\`--\`')}\`
                      `,
        timestamp: new Date(),
        footer: {
            text: role.name,
            icon_url: config.icon.role
        }
    }
    return embed
}
