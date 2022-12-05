require('dotenv').config();

const { Client, Intents } = require('discord.js');
const { off } = require('process');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

var userTaskNumber = 1;

let taskManagement = ['interaction.user.idたち: '];
let userTask = [['**現在の貴方のタスク:** ']];


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
            options: [{
                type: 'STRING',
                name: 'tasknumber',
                description: 'タスク番号を指定しやがれください。',
                require: true,
            }],
        },
        {
            name: "tasklist",
            description: "現在のtaskを表示",
        },
        {
            name: "register",
            description: "新しいタスクリストを作成",
        },
        {
            name: "debug_register_test",
            description: "でばっぐ",
        },
    ];

    await client.application.commands.set(data, '974108990751506432');
});

client.on("interactionCreate", async (interaction) => {

    if(!interaction.isCommand()) {
        return;
    }

    if(interaction.commandName === 'taskadd') {

        for( let taskNumber = 1; taskNumber < 101; taskNumber++) {

            console.log('taskNumberを探しとるで！' + taskNumber)

            if(taskManagement[taskNumber] == interaction.user.id) {

                console.log('command実行者のtaskNumber発見やで！task登録可能や！: ' + taskNumber )

                const taskOption = interaction.options.get("task");

                    if(taskOption == null ) { 
                    
                        interaction.reply('空白のタスクは存在しませんよ？')
                    
                        return;
                    }

                    totalTaskNumber = userTaskNumber++

                    userTask.push([ '\n**   ▸ ' + taskOption.value + '**     `TaskNo.' + totalTaskNumber + '`'])

                    console.log(userTask)

                    interaction.reply( '> **タスク**: ' + taskOption.value + ' を追加しました');

                    return;

            } else if(taskNumber === 100) {

                console.log('taskNumber見つからなかったわ！この人taskList登録してないで！')
                interaction.reply( 'taskListが登録されていません。`/register`でlistに登録してください。' )

            }
            
        }

    };
    if(interaction.commandName === 'tasklist') {

        for(let taskNumber = 1; taskNumber < 101; taskNumber++) {

            console.log('登録してるか検索中や！: ' + taskNumber)

            if(taskManagement[taskNumber] == interaction.user.id) {

                console.log('みつかったで！')

                interaction.reply( '> ' + userTask );

                return;

            } else if(taskNumber === 100) {

                interaction.reply( "現在請け負っているタスクは存在しません" );

                console.log('みつからんかったわ...')

            } 
        }
    };
    if(interaction.commandName === 'register') {

        for(let taskNumber = 1; taskNumber < 101; taskNumber++) {

            console.log( 'list探してるで！: ' + taskNumber)

            if(taskManagement[taskNumber] == interaction.user.id) {

                console.log(taskNumber + 'でlistを発見！登録済みやで！ | ' + taskManagement[taskNumber])
                interaction.reply('貴方はすでに登録されています')

                return;

            } else if(taskNumber === 100) {

                console.log('list見つからなかった！空いてるlistに登録するで～！')

                taskManagement.push(interaction.user.id)

                for( let taskNumber = 0; taskNumber < 100; taskNumber++) {

                    console.log( '中身: ' + taskManagement[taskNumber] )

                    console.log( '現在: ' + taskNumber)

                    if(taskManagement[taskNumber] == null) {

                        console.log(taskNumber + 'にtasklistを登録！ | ' + taskManagement)

                        var taskNo = taskNumber - 1;

                        console.log( 'taskNo: ' + taskNo )

                        interaction.reply('タスクリストを登録しました **taskNumber: ' + taskNo + '**')

                        console.log(' ～終～')
                        return;
                    }
                }
            }

        } 

        return;
    }
    if(interaction.commandName === 'taskremove') {

        const removeNumber = interaction.options.get("tasknumber");

        console.log(removeNumber.value)

        if(!isNaN(removeNumber.value) && userTask.length >= removeNumber.value && userTask[removeNumber.value] != '削除済' && removeNumber.value != 0) {

            userTask[removeNumber.value] = '\n   **▸ 削除済 ** `TaskNo.' + removeNumber.value + '`';

            interaction.reply('`TaskNo.' + removeNumber.value + '`を削除しました')

        } else if(userTask.length <= removeNumber.value) {

            interaction.reply('存在しないTaskNoです。')

        }
    }
    if(interaction.commandName === 'debug_register_test') {

        console.log('グロい中身')
        console.log( '0: ' + taskManagement[0] )
        console.log( '1: ' + taskManagement[1] )
        console.log( '2: ' + taskManagement[2] )
        console.log( '3: ' + taskManagement[3] )
        console.log( '4: ' + taskManagement[4] )
        console.log('----------------------')

    }
 });




const token = process.env.TOKEN;

if (!token) {
  throw new Error("Tokenが指定されてません。");
}

client.login(token);

/*
    やりたいこと:
    - taskをUser事に登録可能にする ✅
    - それぞれの固定taskListの表示場所を変更可能にする
    - taskを追加/削除したときに、固定taskListを編集し、その内容が反映されるようにする
    - 期日になったらタスク終わったかどうか聞くようにする(ボタンで終わったか否か返答させたい)
    - 期日までにタスクが終わっていない場合、何日後にタスクが終わるかbuttonで設定可能にする
    - 

    備忘録:
    - taskManagement = listに登録しているUserのid
    - taskNumber = 配列(taskManagement)を一つずつ参照して、interaction.user.idと一致する要素が存在するか確認
    - userTaskNumber = これまで登録されてきたtaskの数(taskナンバー (主にtaskの削除時に使用...予定。)
    - userTask = 登録されたタスクの詳細(interaction.replyでそのまま出力すればOKになってる...けど変えた方が良くね?() )
*/
