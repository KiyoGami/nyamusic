const config = require('../../config.json')
module.exports = {
    name: 'avatar',
    aliases: ['av', 'ava', 'avt'],
    inVoiceChannel: false,
    run:async (client, message, args) => {
        if(args.length){
            members = []
            message.mentions.members.forEach(member => members.push(member))
            message.guild.members.fetch({user: args.shift(), force: true})
                .then(mem => message.channel.send({embeds: [embedAvatar(mem)]}))
                .catch(console.error)
            if(!members.length) return
            members.forEach(mem => message.channel.send({embeds: [embedAvatar(mem)]}))
        }else message.channel.send({embeds: [embedAvatar(message.member)]})
    }
}    

let embedAvatar = (member) => embed = {
    color: member.displayColor,
    author: {
        name: member.displayName,
        icon_url: member.user.displayAvatarURL(),
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