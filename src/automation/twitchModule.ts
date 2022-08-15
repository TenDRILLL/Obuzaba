import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import TwitchApi from "node-twitch";

let client;

export function init() {
    client = new TwitchApi({
        client_id: process.env.twitchClientId as string,
        client_secret: process.env.twitchClientSecret as string
    });
}

//getStreams only returns those that are live, no object for offline ones.
//If none of the provided streamers are live, returns: { data: [], pagination: {} }
//"Up to 100 streams or users can be requested in a single request" -Api Docs
//Don't yet know how pagination works, presuming after N amount of streamers it paginates them.


export function getStreams(streamers: string | Array<string>){
    if(typeof streamers === "string") streamers = [streamers];
    client.getStreams({ channels: streamers }).then(reply => {
        console.log(reply);
    }).catch(e => {
        console.log(e);
    });
}