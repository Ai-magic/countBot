const Discord=require("discord.js");
const Keyv = require('keyv');
const keyv=new Keyv();
const client=new Discord.Client();
const prefix='';
client.once('ready', async () =>{
    console.log('Bot is on');
    await keyv.set('num',0);
    await keyv.set('multiplyer',1);
    await keyv.set('multiplyerCost',25);
    await keyv.set('prestige',0);
    await keyv.set('prestigeCost',1000);
    await keyv.set('superPrestige',0);
    await keyv.set('superPrestigeCost',100);
    await keyv.set('prestige$',0);
    await keyv.set('superPrestige$',0);
});
var id=null;
client.on('message', async message=>{
    const multiplyer=Math.ceil(await keyv.get('multiplyer')/2);
    const multiplyerCost=await keyv.get('multiplyerCost');
    var buy=[1];
    var shop="```asciidoc\nShop\n================\n2x Multiplyer     ("+multiplyer+")::              "+multiplyerCost+" Number ```"
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }
    const args=message.content.slice(prefix.length).split(/ +/);
    const command= args.shift().toLowerCase();
    if(command=="shop"){
        message.channel.send(shop+" ");
        return;
    }else if(command==")buy 1"){
        if(await keyv.get('multyplierCost')<=await keyv.get('num')){
            await keyv.set('multiplyer',await keyv.get('multiplyer')*2);
            await keyv.set('num',await keyv.get('num')-await keyv.get('multiplyerCost'));
            await keyv.set('multiplyerCost',await keyv.get('multiplyerCost')*4);
            message.channel.send("Multiplyer: "+await keyv.get('multiplyer')+"x    Number: "+await keyv.get('num'));
            return;
        }else{
            message.channel.send("You are too poor Get more $$$$$");
            return;
        }
    }else if(command=="number"){
            message.channel.send(await keyv.get('num')+" "+await keyv.get('multiplyer'));
            return;
    }
    //id===null || message.author.id!=id ||
    /*}else if(id==message.author.id){
        message.delete();
        message.channel.send("NO DOUBLE POSTING");
    }*/
    if( (parseInt(command))){
            if(parseInt(command)==await keyv.get('num')+(await keyv.get('multiplyer'))){
                    await keyv.set('num',await keyv.get('num')+(await keyv.get('multiplyer')));
                    return;
            }else{
                message.delete();
                message.channel.send("Next number is "+(await keyv.get('num'))+(await keyv.get('multiplyer'))+" not "+message);
            }
    }
        id=message.author.id;
});
