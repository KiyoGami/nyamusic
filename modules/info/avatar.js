const config = require('../../config.json')
module.exports = {
    name: 'avatar',
    aliases: ['avt'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        if(args.length){
            members = []
            message.mentions.members.forEach(member => members.push(member))
            if(!members.length) return message.channel.send('Cần mention @ tới người này!')
            message.channel.send({embeds: [embedAvatar(members[0])]})
        }else message.channel.send({embeds: [embedAvatar(message.member)]})
    }
}    

let embedAvatar = (member) => embed = {
    color: member.displayColor,
    author: {
        name: member.displayName,
        icon_url: member.user.avatarURL(),
    },
    image: {
        url: member.user.displayAvatarURL({size: 1024}),
    },
    timestamp: new Date(),
    footer: {
        text: 'avatar',
        icon_url: config.icon.avatar
    } 
}