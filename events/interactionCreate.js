const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.InteractionCreate, async interaction => {
  // Slash Command Handling
  try {
    if (interaction.isChatInputCommand()) {
      // get a command
      const command = client.slashCommands.get(interaction.commandName);

      // if the command do not exist throw an error
      if (!command) throw new Error();

      // run the command
      command.run(client, interaction);
    }

    // Button Handling
    else if (interaction.isButton()) {
      // get a button
      const button = client.buttons.get(interaction.customId);

      // if the button do not exist throw an error
      if (!button) throw new Error("There is no code for this button");

      // run the button
      button.run(interaction);
    }

    // Modal Handling
    else if (interaction.isModalSubmit()) {
      // get a modal
      const modal = client.modals.get(interaction.customId);

      // if the modal do not exist throw an error
      if (!modal) throw new Error("There is no code for this modal");

      // run the modal
      modal.run(interaction);
    }
  } catch (error) {
    console.error(error);
    interaction.followUp(error.message);
  }
});
