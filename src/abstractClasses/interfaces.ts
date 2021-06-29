import { Client, Collection, Message, User } from "discord.js";

export interface Bot extends Client {
 commands: Collection<string, BasicCommandInterface>;
}

export interface MessageToken {
    user: User;
    message: Message;
    commandName: string;
    args: string;
};

export interface ReactionToken { // Command object must contain a field called `closeFcn`
    userid: string;
    messageid: string;
    message: Message;
    command: string;
    commandObject: any;
    timeAlive: number;
    timeout: (func: Function, timeout: number) => void;
}

export interface BasicCommandInterface {
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

    checkConditions: (msgToken: MessageToken , isUserOwner: boolean, channelType: string) => boolean;

    checkUserPermissions :(message: Message, isUserOwner: boolean, channelType: string) => boolean;

    checkArgs: (msgToken: MessageToken) => boolean;

    checkCooldown: (message: Message) => boolean;
}

export interface CommandCategoryCollection{
    name: string;
    list: BasicCommandInterface[];
}
