import mysql2 from "mysql2/promise";
import { dataType } from "./dataType";

type db = {
    getDB: () => Promise<mysql2.Connection>,
    connect: () => Promise<void>,
    init: () => Promise<void>,
    updateData: (guildID: string, data: dataType) => Promise<void>,
    findOne: (guildID: string) => Promise<dataType>
}

type dbType = {
    getDB: () => Promise<mysql2.Connection>,
    connect: () => Promise<void>,
    init: () => Promise<void>,
    updateData: (guildID: string, data: dataType) => Promise<void>,
    findOne: (guildID: string) => Promise<dataType>
}

export { db, dbType }