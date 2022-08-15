import defaultGuild from "../../templates/defaultGuild";
import { dbType } from "../../types/db";

let _db: dbType;

async function init(db: dbType) {
    _db = db;
}

async function updateData(data: Object, guildID: string) {
    await Object.keys(defaultGuild).forEach(async key => {
        if (data[key] == null) {
            data[key] = defaultGuild[key];
        }
    })
    //@ts-expect-error
    await _db.updateData(guildID, data);
}

export {
    init,
    updateData
}