import Event from "../classes/Event";
import { Client } from "discord.js";
import { loadCommands } from "../automation/commandModule";
import { init } from "../automation/twitchModule";

export class Ready extends Event{
    constructor() {
        super("ready",true);
    }

    exec(bot: Client){
        console.log(`Connection to Discord Gateway formed, using account ${bot.user?.tag}.`);
        loadCommands();
        init();
    }
}