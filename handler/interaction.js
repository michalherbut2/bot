require("dotenv").config();
const { glob } = require("glob");
const { promisify } = require("util");
const globPromise = promisify(glob);

module.exports = async client => {
  // Slash Commands
  const slashCommands = await globPromise(`${process.cwd()}/commands/*/*.js`);
  const arrayOfSlashCommands = [];
  slashCommands.map(value => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    file.directory = directory;

    if (!file?.data.name) return;

    client.slashCommands.set(file.data.name, file);
    arrayOfSlashCommands.push(file.data.toJSON());
  });

  // Buttons
  const buttons = await globPromise(`${process.cwd()}/buttons/*/*.js`);
  buttons.map(value => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    file.directory = directory;

    if (!file?.name) return;

    client.buttons.set(file.name, file);
  });

  // Modals
  const modals = await globPromise(`${process.cwd()}/modals/*/*.js`);
  modals.map(value => {
    const file = require(value);
    const splitted = value.split("/");
    const directory = splitted[splitted.length - 2];
    file.directory = directory;

    if (!file?.name) return;

    client.modals.set(file.name, file);
  });

  // Events
  const eventFiles = await globPromise(`${process.cwd()}/events/*.js`);
  eventFiles.map(value => require(value));

  // Slash Commands Register
  client.on("ready", async () => {
    // Register for a single guild
    await client.guilds.cache
      .get("883720564970250290")
      .commands.set(arrayOfSlashCommands);
    await client.guilds.cache
      .get("982460828492107797")
      .commands.set(arrayOfSlashCommands);

    // Register for all the guilds the bot is in
    // await client.application.commands.set(arrayOfSlashCommands);
  });
};
