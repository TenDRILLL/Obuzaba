import Discord from "discord.js"
import { dbType } from "../types/db";
import * as updates from "./updates";

let _db: dbType

async function start(db: dbType) {
    _db = db;
    updates.init(db);
}

type apiType = {
    start: (db: dbType) => Promise<void>,
    
    updates: {
        checkIfDataIsUpToDate: (guildID: string) => Promise<boolean>,
        updateData: (data: Object, guildID: string) => Promise<void>
    }
}

export {
    start,
    updates,
    apiType
}
