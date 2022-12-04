require('dotenv').config();

const { Client, Intents, SlashCommandBuilder } = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

let taskManagement = [];
const taskNumber = 0;

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

        if(taskManagement[0] = interaction.user.id) {

            console.log(taskManagement)

            const taskOption = interaction.options.get("task");
            taskManagement.push([taskOption.value, taskManagement.length])
    
            interaction.reply( '> **タスク**: ' + taskOption.value + ' を追加しました');
    
            return;

        } else {

            interaction.reply( '貴方にはtaskListが登録されていません。`/newtask`でlistに登録してください。' )

            return;
        }
    }
    if(interaction.commandName === 'tasklist') {

        if(taskManagement.length == 0) {
            interaction.reply( "現在請け負っているタスクは存在しません" );
        } else {
            interaction.reply( "現在の貴方のタスク: " + taskManagement )
        }

    };
    if(interaction.commandName === 'newtask') {

        for( let taskNumber = 0; taskNumber < 100; taskNumber++) {

            if(taskManagement[taskNumber] = interaction.user.id) {

                console.log(taskManagement[taskNumber])
                console.log(taskManagement[0] + " | " + taskManagement[1] + " | " + taskManagement[2])
                interaction.reply('貴方はすでに登録されています')

                return;

            } else if(taskNumber = 100) {

                taskManagement.push(interaction.user.id)

                for( let taskListNumber = 0; taskListNumber < 100; taskListNumber++) {

                    if(taskManagement[taskListNumber] = interaction.user.id) {

                        await interaction.reply('タスクリストを登録しました **taskNumber: ' + taskListNumber + '**')

                        return;
                    }
                }
            }

        } 

        return;
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
