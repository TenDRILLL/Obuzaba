import Event from "../classes/Event";
import { Client, Guild } from "discord.js";
import {getData} from "../automation/databaseManager";


export class GuildCreate extends Event{
    constructor() {
        super("guildCreate",true);
    }

    async exec(bot: Client, guild: Guild){
        console.log(`Joined guild ${guild.name}`);
        getData(guild.id);
    }
}