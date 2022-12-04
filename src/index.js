require('dotenv').config();

const { Client, Intents } = require('discord.js');

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILD_MESSAGES]});

var userTaskNumber = 1;

let taskManagement = [];
let userTask = [];


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

        for( let taskNumberSeek = 1; taskNumberSeek < 101; taskNumberSeek++) {

            console.log('taskNumberを探しとるで！' + taskNumberSeek)

            if(taskManagement[taskNumberSeek] == interaction.user.id) {

                console.log('command実行者のtaskNumber発見やで！task登録可能や！: ' + taskNumberSeek )

                const taskOption = interaction.options.get("task");

                totalTaskNumber = userTaskNumber++

                userTask.push([ '\n**   ▸ ' + taskOption.value + '**     `TaskNo.' + totalTaskNumber + '`'])

                console.log(userTask)

                interaction.reply( '> **タスク**: ' + taskOption.value + ' を追加しました');

                return;
            } else if(taskNumberSeek === 100) {

                console.log('taskNumber見つからなかった！この人taskList登録してないで！')
                interaction.reply( 'taskListが登録されていません。`/newtask`でlistに登録してください。' )

                return;
            }
            
        }

    };
    if(interaction.commandName === 'tasklist') {

        if(taskManagement.length == 0) {
            interaction.reply( "現在請け負っているタスクは存在しません" );
        } else {
            interaction.reply( "> 現在の貴方のタスク: " + userTask )
        }

    };
    if(interaction.commandName === 'newtask') {

        for( let taskNumber = 1; taskNumber < 101; taskNumber++) {

            console.log( 'list探してるで！: ' + taskNumber)

            if(taskManagement[taskNumber] == interaction.user.id) {

                console.log(taskNumber + 'でlistを発見！登録済みやで！ | ' + taskManagement[taskNumber])
                interaction.reply('貴方はすでに登録されています')

                return;

            } else if(taskNumber === 100) {

                console.log('list見つからなかった！空いてるlistに登録するで～！')

                taskManagement.push(interaction.user.id)

                for( let taskListNumber = 1; taskListNumber < 100; taskListNumber++) {

                    console.log( '現在: ' + taskListNumber)

                    if(taskManagement[taskListNumber] == null) {

                        console.log(taskListNumber + 'にtasklistを登録！ | ' + taskManagement[taskListNumber])

                        await interaction.reply('タスクリストを登録しました **taskNumber: ' + taskListNumber + '**')

                        console.log(' ～終～')
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
    - taskをUser事に登録可能にする ✅
    - それぞれの固定taskListの表示場所を変更可能にする
    - taskを追加/削除したときに、固定taskListを編集し、その内容が反映されるようにする
    - 期日になったらタスク終わったかどうか聞くようにする(ボタンで終わったか否か返答させたい)
    - 期日までにタスクが終わっていない場合、何日後にタスクが終わるかbuttonで設定可能にする
    - 

    備忘録:
    - taskManagement = listに登録しているUserのid
    - taskNumerSeek, taskNumber, taskListNumber = 配列(taskManagement)を一つずつ参照して、interaction.user.idと一致する要素が存在するか確認
    - userTaskNumber = これまで登録されてきたtaskの数(taskナンバー (主にtaskの削除時に使用...予定。)
    - userTask = 登録されたタスクの詳細(interaction.replyでそのまま出力すればOKになってる...けど変えた方が良くね?() )
*/
