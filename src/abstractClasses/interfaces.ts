import { Client, Collection, Message } from "discord.js";

export interface Bot extends Client {
 commands: Collection<string, BasicCommand>;
}

export interface BasicCommand {
    id: string;
    description: string;
    aliases: Set<string>;
    args: boolean;
    usage: string;
    category: string;
    guildOnly: boolean
    dmOnly: boolean;
    ownerOnly: boolean;
    cooldown: number;
    userCooldownTracker: Collection<string, object>;
    permissions: string[];

    execute: (a: any, ...b: any[]) => void;

    checkConditions: (msgToken , isUserOwner: boolean, channelType: string) => boolean;

    checkUserPermissions :(message: Message, isUserOwner: boolean, channelType: string) => boolean;

    checkArgs: (msgToken) => boolean;

    checkCooldown: (message: Message) => boolean;
}
