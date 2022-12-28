require('dotenv').config();

const { Client, Intents, MessageEmbed } = require('discord.js');
var fs = require('fs');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

const task = []

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
                    options: [
                    {
                        type: "STRING",
                        name: "task",
                        description: "追加したいtask / tasks to add",
                        required: true,
                    },
                    {
                        type: "USER",
                        name: "user",
                        description: "タスクを追加したいユーザー / えいご",
                        required: true,
                    }
                    ]
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
                    options: [
                    {
                        type: "INTEGER",
                        name: "task_number",
                        description: "編集したいタスクの番号を指定 / specify the number of the task you want to edit",
                        required: true,
                    },
                    {
                        type: "STRING",
                        name: "task",
                        description: "変更後のタスクを指定 / えいご",
                        required: true,
                    }
                    ],
                },
            ],
        },
        {
            name: "tasklist",
            description: "指定したユーザーのタスクリストを表示 / show tasklist",
            options: [
            {
                type: "USER",
                name: "user",
                description: "タスクリストを表示したいユーザーを指定 / specify the users for whom you want to display the task list",
                required: true,
            },
            {
                type: "INTEGER",
                name: "page",
                description: "表示したいページを指定 / えいご",
                required: true,
            },
            ]
        },
        {
            name: "request",
            description: "指定したuserにタスクを依頼する / request task",
            options: [
            {
                type: "USER",
                name: "user",
                description: "依頼したいユーザーを指定 / えいご",
                required: true,
            },
            {
                type: "STRING",
                name: "task",
                description: "依頼したいタスクを指定",
                required: true,
            }
            ]
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

            const user = interaction.options.getUser('user');
            const tasks = interaction.options.getString('task');

            if (!task[user.id]) { task[user.id] = [user.id] }

            task[user.id].push(interaction.options.getString('task'))

            interaction.reply( '||  || ' + user.username + 'に タスク: `' + tasks + '` を追加')

            return;
        };
        if (interaction.options.getSubcommand() === 'remove') {

            const taskNo = interaction.options.getInteger('task_number');
            const user = interaction.options.getUser('user');

            console.log(task[interaction.user.id])

            if (!task[user.id]) { interaction.reply('タスクリストが存在しません'); return; }
            if (task[user.id].length == 0 ) { interaction.reply('タスクが存在しません'); return; }
            if (!task[user.id][taskNo]) { interaction.reply('その番号のタスクは存在しません'); return; }

            interaction.reply(taskNo + '番のタスク(`' +  task[user.id][taskNo] + '`)を削除しました')

            task[user.id].splice[taskNo]

            return;
        };
        if (interaction.options.getSubcommand() === 'edit') {
            
            const taskNo = interaction.options.getInteger('task_number');
            const tasks = interaction.options.getString('task')

            if (!task[interaction.user.id]) { interaction.reply('タスクリストが存在しません'); return; }
            if (task[interaction.user.id].length == 0 ) { interaction.reply('タスクが存在しません'); return; }
            if (!task[interaction.user.id][taskNo]) { interaction.reply('その番号のタスクは存在しません'); return; }

            interaction.reply(taskNo + '番のタスク(`' + task[interaction.user.id][taskNo] + '`)を(`' + tasks + '`)にしました')
            task[interaction.user.id][taskNo] = tasks;

            return;
        };

    };
    if(interaction.commandName === 'tasklist') {

        const user = interaction.options.getUser('user');
        const pageNumber = interaction.options.getInteger('page');

        if (!task[user.id]) { interaction.reply('タスクが存在しません。'); return; }

        const entriesPerPage = 10
        const page = Math.max(1, pageNumber)
        const maxPage = Math.floor(task[user.id].length / entriesPerPage)
        const entriesToShow = []

        for (let i = page * entriesPerPage; i < Math.min(task[user.id].length, (page + 1) * entriesPerPage); i++) {
            entriesToShow.push(task[user.id][i])
        }

        console.log(page * entriesPerPage)
        console.log(Math.min(task[user.id].length, (page + 1) * entriesPerPage))


        console.log(entriesToShow)

        const embed = new MessageEmbed()
       .setTitle('taskList')
       .setDescription(`${entriesToShow}`)
       .setColor('#FF0000')

        interaction.reply({ embeds: [embed] })

    };
    if(interaction.commandName === 'request') {



    };
});

const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);