module.exports.client = async (Client, GatewayIntentBits, Options, Collection, Events) => {

    const { readdirSync } = require('fs');
    const path = require('node:path');
    

    const client = new Client({
        allowedMentions: { repliedUser: false },
        intents: [ 
            GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers,
            GatewayIntentBits.MessageContent, GatewayIntentBits.GuildIntegrations,
            GatewayIntentBits.GuildWebhooks, GatewayIntentBits.GuildInvites,
            GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildPresences,
            GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageReactions,
            GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.DirectMessages,
            GatewayIntentBits.DirectMessageReactions, GatewayIntentBits.DirectMessageTyping,
            GatewayIntentBits.GuildEmojisAndStickers, GatewayIntentBits.GuildBans,
            GatewayIntentBits.GuildModeration
        ],
        failIfNotExists: true,
        makeCache: Options.cacheWithLimits({
            ApplicationCommandManager: 0, BaseGuildEmojiManager: 0,
            GuildBanManager: 0, GuildInviteManager: 0,
            GuildStickerManager: 0, GuildScheduledEventManager: 0,
            PresenceManager: 0, ReactionManager: 0,
            ReactionUserManager: 0, StageInstanceManager: 0,
            VoiceStateManager: 100, ThreadMemberManager: 0,
            ApplicationCommandPermissionsManager: 0, GuildApplicationCommandManager: 0,
            GuildEmojiRoleManager: 0, MessageManager: 0, GuildBanManager: 0,
        }),
    });

    client.on("ready", () => {
        console.log(client.user.username + ` - Online`)
    })

    client.login(process.env.TOKEN)
}