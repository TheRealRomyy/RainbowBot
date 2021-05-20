const { Client } = require("discord.js");
const ms = require("ms");

class RainbowBot extends Client {

    constructor(option) {
        this.config = require("./config.json");
    };

    async init() {

        let time = this.config.time;
        if(!time) throw new Error("Error: Time is not defined (config.json)");
        if(isNaN(time)) time = ms(time);
        if(isNaN(time)) throw new Error("Error: Time is not on a valid unit (config.json)");

        let role = this.config.role;
        if(!role) throw new Error("Error: Role is not defined (config.json)");

        let guild = this.config.server;
        if(!guild) throw new Error("Error: Server is not defined (config.json)");

        guild = this.guilds.cache.get(guild);
        if(!guild) throw new Error("Error: Server is not a valid guild id or the bot is not in (config.json)");

        role = guild.roles.cache.get(role);
        if(!guild) throw new Error("Error: Role is not a valid role id (config.json)");

        const colors = [
            "#bb5800", "#b87e00", "#b49300", "#c7be00", "#97ca00", "#71cb01", "#00f26f", "#02c3a9", "#029dc1", "#0258bf", "#5703bf", "#9404c1", "#be00c0", "#bd005a", "#bf0106"
        ]; // Add colors if you want

        const color = colors[Math.floor(Math.random() * colors.length)];

        setInterval(() => {
            role.setColor(color).catch(error => {
                throw new Error("Error: " + error)
            });
        }, time)

        client.login(this.config.token);
    };
};

const client = new RainbowBot();

client.init();