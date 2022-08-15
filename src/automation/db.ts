import dotenv from 'dotenv';
dotenv.config({path: "./.env"});
import * as db from "mysql2/promise"
import { dataType } from "../types/dataType"

let con: db.Connection

//get db
async function getDB(): Promise<db.Connection> {
    return con
}

//connect to database
async function connect(){
    con = await db.createConnection({
        host: process.env.databaseHost,
        user: process.env.databaseUser,
        password: process.env.databasePass,
        database: process.env.databaseName
    })
    console.log(`Database connected!`)
}

//initialise database
async function init(){
    await con.query(`CREATE TABLE IF NOT EXISTS data (
        guildID VARCHAR(255) NOT NULL,
        data JSON NULL
    )`)
    console.log(`Database initialised!`)
}

/**
 * Returns the object from the database
 * @param guildID - The ID of the Discord Guild 
 */
 async function findOne(guildID: string) : Promise<dataType> {
    let [result] = await con.query(`SELECT * FROM data WHERE guildID = ?`, [guildID])
    const res = await result[0]
    return res ? res.data : null

}

/**
 * Saves the data to the database
 * @param guildID - The ID of the Discord Guild
 * @param data - The data to be saved
 */
 async function updateData(guildID: string, data: dataType) {
    await con.query(`UPDATE data SET data = ? WHERE guildID = ?`, [JSON.stringify(data), guildID])
}

/**
 * Creates a new guild in the database
 * @param guildID - The ID of the Discord Guild
 * @param data - The data to be saved
 */
 async function createGuild(guildID: string, data: dataType) {
    await con.query(`INSERT INTO data (guildID, data) VALUES (?, ?)`, [guildID, JSON.stringify(data)])
    console.log(`New database entry created for ${guildID}`)
}

//export functions
export { getDB, connect, init, findOne, updateData, createGuild }