import {
    ApplicationCommandData,
    CommandInteraction,
    Client
} from "discord.js";

export default abstract class Command {
    private readonly name: string;
    private readonly slashObject: ApplicationCommandData;

    protected constructor(name: string, slashObject: ApplicationCommandData){
        this.name = name;
        this.slashObject = slashObject;
    }

    getName(): string { return this.name; }
    getSlashObject(): ApplicationCommandData | undefined { return this.slashObject; }
    cmdRun(bot: Client, interaction: CommandInteraction){ return console.log(`${this.name} ran, but cmdRun method wasn't overridden.`); }
}