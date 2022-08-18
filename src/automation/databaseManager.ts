import * as mysql from "mysql";

const connection = mysql.createConnection({
    host: process.env.databaseHost,
    user: process.env.databaseUser,
    password: process.env.databasePass,
    database: process.env.databaseName
});

export function startConnection(){
    return new Promise((res)=>{
        connection.connect((err)=>{
            if(err) {
                console.log(`Error: ${err.stack}`);
                process.exit();
            }
            console.log(`Connected, ID: ${connection.threadId}`);
            connection.query(
                `CREATE TABLE Data (
guildID VARCHAR(100) NOT NULL PRIMARY KEY,
data JSON
)`,
                (error)=>{
                    if(error){
                        if(error.code === "ER_TABLE_EXISTS_ERROR"){
                            return console.log("DB found.");
                        } else {
                            return console.log(error);
                        }
                    }
                    console.log("DB created.");
                }
            );
            console.log("Database successfully initialized.");
            res(connection.threadId);
        });
    });
}

export function getData(id) {
    return new Promise((res)=>{
        connection.query(
            `SELECT * FROM Data WHERE guildID = "${id}"`,
            (error, results)=>{
                if(error) return console.log(error);
                if(results.length === 0){
                    const config = {
                        guildID: id,
                        streamers: []
                    }
                    createData(id,config).then(() => {
                        console.log(`${id} added to the database.`);
                    });
                    res(config);
                } else {
                    const config = JSON.parse(results[0].data);
                    console.log(`${id} loaded from the database.`);
                    res(config);
                }
            }
        );
    });
}

export function saveData(id,config){
    return new Promise((res,rej)=>{
        connection.query(
            `UPDATE Data SET data = '${JSON.stringify(config)}' WHERE guildID = "${id}"`,
            (error, results)=>{
                if(error) rej(error);
                console.log(`Configuration saved for ${id}.`);
                res(results);
            }
        );
    });
}

function createData(id, config){
    return new Promise((res,rej)=>{
        connection.query(
            `INSERT INTO Data (guildID, data) VALUES ("${id}", '${JSON.stringify(config)}')`,
            (error, results)=>{
                if(error) rej(error);
                res(results);
            }
        );
    });
}

process.on("beforeExit",()=>{
    connection.end();
});