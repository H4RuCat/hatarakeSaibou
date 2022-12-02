require('dotenv').config();

const { Client, Intents, SlashCommandBuilder } = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});


client.once('ready', async () => { 
	console.log('起動完了'); 

    let taskManagement = [''];

    const data = [
        { 
            name: "task",
            description: "taskを管理！",
            options: [{
                type: "STRING",
                name: "add",
                description: "タスクを追加しよう！",
                required: true,
            }],
        }
    ];

    await client.application.commands.set(data, '974108990751506432');
});

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) {
        return;
    }
  
    if(interaction.commandName === 'task') {

        const taskOption = interaction.options.getString('option')

        if(taskOption == 'add') {

            interaction.reply( taskManagement + '追加しました');
        
        }

    }
 });




const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);