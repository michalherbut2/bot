require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");
// const mongoose = require("mongoose");
const globPromise = promisify(glob);

module.exports = async (client) => {

  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`);
  const arrayOfSlashCommands = [];
  slashCommands.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];

    if (!file?.name) return;

    const properties = { directory, ...file };
    client.slashCommands.set(file.name, properties);
    arrayOfSlashCommands.push(file);
  });

  // Buttons
  const buttons = await globPromise(`${process.cwd()}/buttons/*/*.js`);
  buttons.map((value) => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    file.directory = directory
    if (!file?.name) return;
    
    client.buttons.set(file.name, file);
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map((value) => require(value));

  // // Slash Commands Register
  // client.on("ready", async () => {
  //   // Register for a single guild
  //   await client.guilds.cache.get("883720564970250290").commands.set(arrayOfSlashCommands);

  //   // Register for all the guilds the bot is in
  //   // await client.application.commands.set(arrayOfSlashCommands);
  // });

  // mongoose
  // const mongooseConnectionString = process.env.mongooseConnectionString;
  // if (!mongooseConnectionString) return;

  // mongoose.connect(mongooseConnectionString).then(() => console.log("Connected to mongodb"));
};
