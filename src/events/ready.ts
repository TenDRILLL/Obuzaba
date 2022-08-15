import Event from "../classes/Event";
import { Client } from "discord.js";
import { loadCommands } from "../automation/commandModule";
import { init } from "../automation/twitchModule";
import * as db from "../automation/db";
import * as api from "../api";
import defaultGuild from "../templates/defaultGuild";
import { dbType } from "../types/db";

export class Ready extends Event{
    constructor() {
        super("ready",true);
    }

    async exec(bot: Client){
        console.log(`Connection to Discord Gateway formed, using account ${bot.user?.tag}.`);

        await db.connect()
        await db.init()
        await api.start(db)

        const guildData = await db.findOne("552872618345365504")
        guildData.streamer = ["test", "test2", "test3", "test4"]
        await db.updateData("552872618345365504", guildData)

        loadCommands();
        init(bot);

        await bot.guilds.cache.forEach(async guild => {
            const data = await db.findOne(guild.id)
            if (data != null) {
                const upToDate = await api.updates.checkIfDataIsUpToDate(data)
                if (!upToDate) {
                    api.updates.updateData(data, guild.id)
                    console.log(`Updated data for guild ${guild.name} | ${guild.id}`)
                }
            }else{
                db.createGuild(guild.id, defaultGuild)
            }
        })

    }
}