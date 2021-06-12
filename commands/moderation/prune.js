const { BasicCommand } = require("../../abstractClasses/BasicCommand.js");
const { Collection } = require("discord.js");
const debug = require("debug")("DB");

class Prune extends BasicCommand {

    static name = "prune";
    static description = "Prune amount of messages";
    static aliases =  new Set(["purge","clean"]);
    static category = "Moderation";
    static usage = "<amount (defaults to 1)>";
    static args = true;
    static cat = new Collection();

    static execute (msgToken) {

        const member = msgToken.message.member;
        const channel = msgToken.message.channel;

        const perms = member.permissionsIn(channel);

        let todel;
        if ((todel = this.cat.get(member.id))) {
            
            channel.bulkDelete(todel);
            this.cat.delete(member.id)
            return;
        }

        if (perms.has("MANAGE_MESSAGES")) {
            channel.messages.fetch({limit: parseInt(msgToken.args)+1}).then((msgs) => {
                    let m = Array.from(msgs.values());
                    msgToken.message.reply(`Do you want to delete messages upto:\n \`${m[m.length - 1]}\``)
                    m.forEach((item) => console.log(item.content))
                    console.log(m);
                    this.cat.set(member.id, msgs);
                })

            }
        }

    }


module.exports = Prune;
