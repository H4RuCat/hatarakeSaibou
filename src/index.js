require('dotenv').config();

const { Client, Intents } = require('discord.js');
var fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

client.once('ready', async () => { 
	console.log('起動完了'); 

    const data = [
        { 
            name: "task",
            description: "task",
            options: [
                {
                    type: "SUB_COMMAND",
                    name: "add",
                    description: "新規タスクを追加 / adding tasks",
                    options: [{
                        type: "STRING",
                        name: "task",
                        description: "追加したいtask / tasks to add",
                        required: true,
                    }]
                },
                {
                    type: "SUB_COMMAND",
                    name: "remove",
                    description: "指定した番号のタスクを削除 / deleting tasks",
                    options: [{
                        type: "INTEGER",
                        name: "task_number",
                        description: "削除したいタスクの番号を指定 / specify the number of the task you want to delete",
                        required: true,
                    },
                    {
                        type: "USER",
                        name: "user",
                        description: "タスクを削除したいuserを指定 / specify the user from whom you want to delete the task",
                        required: true,
                    }],
                },
                {
                    type: "SUB_COMMAND",
                    name: "edit",
                    description: "editing tasks",
                    options: [{
                        type: "INTEGER",
                        name: "task_number",
                        description: "編集したいタスクの番号を指定 / specify the number of the task you want to edit",
                        required: true,
                    }],
                },
            ],
        },
        {
            name: "tasklist",
            description: "指定したユーザーのタスクリストを表示 / show tasklist",
            options: [{
                type: "USER",
                name: "user",
                description: "タスクリストを表示したいユーザーを指定 / specify the users for whom you want to display the task list",
                required: true,
            }]
        },
        {
            name: "request",
            description: "指定したuserにタスクを依頼する / request task",
        }
    ];

    await client.application.commands.set(data, '974108990751506432');
});

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) {
        return;
    }

    if(interaction.commandName === 'task') {

        if (interaction.options.getSubcommand() === 'add') {



            return;
        };
        if (interaction.options.getSubcommand() === 'remove') {

            

            return;
        };
        if (interaction.options.getSubcommand() === 'edit') {
            


            return;
        };

    };
    if(interaction.commandName === 'tasklist') {

    };
    if(interaction.commandName === 'request') {

    };
});

const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);