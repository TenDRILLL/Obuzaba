import Event from "../classes/Event";
import { Client } from "discord.js";
import {getData, startConnection} from "../automation/databaseManager";

export class Ready extends Event{
    constructor() {
        super("ready",true);
    }

    async exec(bot: Client){
        console.log(`Connection to Discord Gateway formed, using account ${bot.user?.tag}.`);
        await startConnection();
        bot.guilds.fetch().then(guilds => {
            guilds.forEach(g => getData(g.id));
        });
    }
}