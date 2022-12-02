require('dotenv').config();

const { Client, Intents, SlashCommandBuilder } = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});


client.once('ready', async () => { 
	console.log('起動完了'); 

    const data = [
        { 
            name: "task",
            description: "タスク管理(仮)",
            options: [
                {
                    type: "STRING",
                    name: "add",
                    description: "さあ、タスクを追加するんだ！",
                    options: [{
                       type: "add",
                       name: "add",
                       description: "addやで"
                    }],
                },
                {
                    type: "STRING",
                    name: "remove",
                    description: "タスクから逃げるな、卑怯者ｫｯｯー－！！！！",
                    options: [{
                        type: "remove",
                        name: "remove",
                        description: "removeやで"
                    }],
                }
            ]
        },
    ];

    await client.application.commands.set(data, '974108990751506432');
});

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) {
        return;
    }
  
    if(interaction.commandName === 'task') {

    }
 });




const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);