import Command from "../classes/Command";
import {ApplicationCommandOptionType, Client, CommandInteraction, EmbedBuilder} from "discord.js";

export class Ping extends Command {
    constructor() {
        super(
            "ping",
            {
                name: "ping",
                description: "Get the latency of the Discord Gateway.",
            }
        );
    }

    cmdRun(bot: Client, interaction: CommandInteraction): void {
        interaction.reply({
           embeds: [
               new EmbedBuilder()
                   .setDescription(`Ping: ${bot.ws.ping}ms`)
           ]
        });
    }
}