import { dbType } from "../../types/db";
import { checkIfDataIsUpToDate } from "./checkIfDataIsUpToDate";
import { updateData } from "./updateData";
import * as upData from "./updateData";

async function init(db: dbType) {
    upData.init(db)
}

export {
    init,
    checkIfDataIsUpToDate,
    updateData
}