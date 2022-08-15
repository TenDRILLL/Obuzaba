import dotenv from 'dotenv';
dotenv.config({path: "./.env"});

export function verifyConfig(){
    if(process.env.discordApplicationId === undefined) return {
        "success": false,
        "reason": "Missing Discord Application ID."
    };
    if(process.env.discordToken === undefined) return {
        "success": false,
        "reason": "Missing Discord Bot Token."
    };
    if(process.env.twitchClientId === undefined) return {
        "success": false,
        "reason": "Missing Twitch Client ID."
    };
    if(process.env.twitchClientSecret === undefined) return {
        "success": false,
        "reason": "Missing Twitch Client Secret."
    };
    if(process.env.databaseHost === undefined) return {
        "success": false,
        "reason": "Missing Database Host Address."
    };
    if(process.env.databaseUser === undefined) return {
        "success": false,
        "reason": "Missing Database Username."
    };
    if(process.env.databasePass === undefined) return {
        "success": false,
        "reason": "Missing Database Password."
    };
    if(process.env.databaseName === undefined) return {
        "success": false,
        "reason": "Missing Database's Name."
    };
    return {
        "success": true,
        "reason": "All config values found."
    };
}