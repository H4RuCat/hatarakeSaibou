require('dotenv').config();

const { Client, Intents, SlashCommandBuilder } = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

let taskManagement01 = [];
let taskManagement02 = [];
let taskManagement03 = [];
let taskManagement04 = [];
let taskManagement05 = [];
let taskManagement06 = [];
let taskManagement07 = [];
let taskManagement08 = [];
let taskManagement09 = [];
let taskManagement10 = [];
let taskManagement11 = [];
let taskManagement12 = [];




client.once('ready', async () => { 
	console.log('起動完了'); 

    const data = [
        { 
            name: "taskadd",
            description: "taskを追加する",
            options: [{
                type: 'STRING',
                name: 'task',
                description: 'どんなタスク？',
                require: true,
            }],
        },
        { 
            name: "taskremove",
            description: "taskを削除する",
        },
        {
            name: "tasklist",
            description: "現在のtaskを表示",
        },
        {
            name: "newtask",
            description: "新しいタスクリストを作成"
        },
    ];

    await client.application.commands.set(data, '974108990751506432');
});

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) {
        return;
    }
  
    if(interaction.commandName === 'taskadd') {

        if(taskManagement01[0] === interaction.user.id) {

        interaction.reply( '貴方にはtaskListが登録されていません。`/newtask`でtaskListを登録してください。' )

        } 

        const taskOption = interaction.options.get("task");
        taskManagement.push([taskOption.value, taskManagement01.length])

        interaction.reply( '> **タスク**: ' + taskOption.value + ' を追加しました');

        return;
    }
    if(interaction.commandName === 'tasklist') {

        if(taskManagement.length == 0) {
            interaction.reply( "現在請け負っているタスクは存在しません" );
        } else {
            interaction.reply( "現在の貴方のタスク: " + taskManagement )
        }

    }
 });




const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);

/*
    やりたいこと:
    - taskをUser事に登録可能にする
    - それぞれの固定taskListの表示場所を変更可能にする
    - taskを追加/削除したときに、固定taskListを編集し、その内容が反映されるようにする
    - 期日になったらタスク終わったかどうか聞くようにする(ボタンで終わったか否か返答させたい)
    - 期日までにタスクが終わっていない場合、何日後にタスクが終わるかbuttonで設定可能にする
    - 
*/
