import {IntentsBitField, Client} from "discord.js";
import {createEvents} from "./automation/eventModule";
import dotenv from 'dotenv';
import {dbType} from "./types/db";
import * as db from "./automation/db";
import * as api from "./api";
import defaultGuild from "./templates/defaultGuild";
dotenv.config({path: "./.env"});

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildVoiceStates
    ]
});

console.log("Accessing Discord Gateway...");
bot.login(process.env.discordToken).catch(error => {
    console.log("Discord Gateway connection failed, terminating...");
    console.error(error);
    process.exit();
});

createEvents(bot);


//ONLY FOR TESTING PURPOSES
bot.on("messageCreate", async message => {
    console.log(message.content);

    if(message.content.startsWith("!")) {
        const args = message.content.slice(1).split(" ");
        if (message.guild?.id == null) return
        if (args[0] === "addStreamer") {
            const guildData = await db.findOne(message.guild.id)
            //check if streamer name is already in database
            if (guildData.streamer.includes(args[1])) {
                message.reply("Streamer already in database");
                return;
            }
            //add streamer to database
            guildData.streamer.push(args[1]);
            await db.updateData(message.guild.id, guildData)
            message.reply("Streamer added to database");
        }
    }
})