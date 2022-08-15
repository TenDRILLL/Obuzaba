import defaultGuild from "../../templates/defaultGuild";

async function checkIfDataIsUpToDate(data: Object) : Promise<boolean> {
    let upToDate = true;
    Object.keys(defaultGuild).forEach(key => {
        if (data[key] == null) {
            upToDate = false;
            return;
        }
    })
    return upToDate;
}

export {
    checkIfDataIsUpToDate
}