import Event from "../classes/Event";
import { Client, DiscordAPIError, Guild } from "discord.js";
import { loadCommands } from "../automation/commandModule";
import { init } from "../automation/twitchModule";
import * as db from "../automation/db";
import * as api from "../api";
import defaultGuild from "../templates/defaultGuild";
import { dbType } from "../types/db";

export class Ready extends Event{
    private guild: Guild
    constructor() {
        super("guildCreate",true);
    }

    async exec(bot: Client, guild: Guild){
        
        const data = await db.findOne(guild.id)
        if (data != null) {
            const upToDate = await api.updates.checkIfDataIsUpToDate(data)
            if (!upToDate) {
                api.updates.updateData(data, guild.id)
                console.log(` Updated data for ${guild.name} | ${guild.id}`)
            }
        }
        // create guild in database
        db.createGuild(guild.id, defaultGuild)
    }
}