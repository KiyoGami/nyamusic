const Discord = require(`discord.js`)
const { DisTube, default: dist } = require('distube')
const fs = require('fs')

const prefix = '!'
const owner = '703930445502480384';

const client = new Discord.Client({
    intents: [
      Discord.Intents.FLAGS.GUILDS,
      Discord.Intents.FLAGS.GUILD_MESSAGES,
      Discord.Intents.FLAGS.GUILD_VOICE_STATES,
    ]
})

client.commands = new Map()

client.aliases = new Map()

client.distube = new DisTube(client, {
    leaveOnStop: false,
    emitNewSongOnly: true,
    emitAddSongWhenCreatingQueue: false,
    emitAddListWhenCreatingQueue: false,
    youtubeDL: false
})

const distube = client.distube

fs.readdir('./commands/', (err, files) => {
    if (err) return console.log('Could not find any commands!')
    const jsFiles = files.filter(f => f.split('.').pop() === 'js')
    if (jsFiles.length <= 0) return console.log('Could not find any commands!')
    jsFiles.forEach(file => {
      const cmd = require(`./commands/${file}`)
      client.commands.set(cmd.name, cmd)
      if (cmd.aliases) cmd.aliases.forEach(alias => client.aliases.set(alias, cmd.name))
    })
})

client.on('ready', () => {
    console.log(`${client.user.tag} is ready to play music.`)
    client.guilds.cache.forEach( guild => {
        console.log(guild.name)
    })
    // const connection = getVoiceConnection(client.guild.id); 
})  

client.on('messageCreate', async message => {
    if (message.author.bot || !message.guild) return
    if(message.author.id != owner) return message.channel.send('Bạn không phải chủ nhân của tôi :Teehee:')
    if (!message.content.startsWith(prefix)) return
    let args = message.content.slice(prefix.length).split(' ')  
    const command = args.shift().toLowerCase()
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command))
    if(Object.keys(cmd).length == 0) return
    if (cmd.inVoiceChannel && !message.member.voice.channel) {
        return message.channel.send('Bạn cần vào phòng voice trước')
    }
    cmd.run(distube, message, args)
})

client.login('OTg2OTE5MjM4MzUyNjUwMjcx.GrsF3h.5LRqOmNU2goATgE2bupvEPOgc0Ghnzi8BXQh7A');