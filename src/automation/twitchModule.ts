import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import TwitchApi from "node-twitch";
import {StreamerObject, TwitchStream} from "../types/classes";
import * as db from "../automation/db";
import discord from "discord.js";
import { dataType } from '../types/dataType';

let client;

export async function init(bot: discord.Client) {
    console.log("Twitch API init.");
    client = new TwitchApi({
        client_id: process.env.twitchClientId as string,
        client_secret: process.env.twitchClientSecret as string
    });


    setInterval(async ()=>{
        const streamers: Array<StreamerObject> = [];
        const promises: Array<Promise<dataType | null>> = [];

        bot.guilds.cache.forEach(guild => {
            promises.push(new Promise(res => {
                db.findOne(guild.id).then(data => res(data));
            }));
        });

        Promise.all(promises).then(guildDataArray => {
            guildDataArray.forEach(data => {
                if(data && data.streamers){
                    data.streamers.forEach(streamer => {
                        const existingStreamer = streamers.filter(x => x.name === streamer.toLowerCase())[0];
                        if(existingStreamer){
                            existingStreamer.guilds.push(data.guildId);
                        } else {
                            streamers.push({
                                name: streamer.toLowerCase(),
                                guilds: [data.guildId]
                            });
                        }
                    });
                }
            });
            getStreams(streamers.map(x => x.name)).then(streams => {
                if(streams.length === 0) return;
                streams.forEach(stream => {
                    const streamerObject = streamers.filter(x => x.name === stream.user_login)[0];
                    console.log(`Notify guilds ${streamerObject.guilds.join(", ")} that ${stream.user_name} is live and playing ${stream.game_name}`);
                });
            });

        });
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

