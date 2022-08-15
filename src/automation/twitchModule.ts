import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import TwitchApi from "node-twitch";
import {TwitchStream} from "../types/classes";
import * as db from "../automation/db";
import {dbType} from "../types/db";
import discord from "discord.js";
import { dataType } from '../types/dataType';

let client;

let streamers: string[] = [];

let fakeDB = {
    streamers: [
        "Amouranth",
        "Gladd",
        "xqc"
    ]
};

export async function init(bot: discord.Client) {
    client = new TwitchApi({
        client_id: process.env.twitchClientId as string,
        client_secret: process.env.twitchClientSecret as string
    });


    setInterval(async ()=>{
        await bot.guilds.cache.forEach(async (guild) => {
            const guildData: dataType = await db.findOne(guild.id);
            if (!guildData.streamer)
                return;
            guildData.streamer.forEach(async (streamer2) => {
                if (!streamers.includes(streamer2)) {streamers.push(streamer2)}
            })
        })

        if(streamers == undefined) {
            console.log("No streamers found in database.");
        } else {
            console.log(streamers);
        }

        const streams: Array<TwitchStream> = await getStreams(fakeDB.streamers);
        if(streams.length === 0) return;
        console.log(streams);
    },60*1000);
}

//getStreams only returns those that are live, no object for offline ones.
//If none of the provided streamers are live, returns: { data: [], pagination: {} }
//"Up to 100 streams or users can be requested in a single request" -Api
//"Up to 800 requests per minute" -Api
//Don't yet know how pagination works, presuming after N amount of streamers it paginates them.

export function getStreams(streamers: Array<string>): Promise<Array<TwitchStream>>{
    return new Promise((res, rej)=>{
        client.getStreams({ channels: streamers }).then(reply => {
            res(reply.data);
        }).catch(e => {
            rej(e);
        });
    });
}

