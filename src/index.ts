import {IntentsBitField, Client} from "discord.js";
import {createEvents} from "./automation/eventModule";
import dotenv from 'dotenv';
import {verifyConfig} from "./automation/verifyConfig";
dotenv.config({path: "./.env"});

const verify = verifyConfig();
if(!verify.success){
    console.log(`Invalid configuration, ${verify.reason}`);
    process.exit();
} else {
    console.log(verify.reason);
}

const bot = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
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