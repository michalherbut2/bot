const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.InteractionCreate, async interaction => {
  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({ content: "An error has occurred " });

    cmd.run(client, interaction);
  }
  
  // Button Handling
  else if (interaction.isButton()) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const { buttons } = client;
    const { customId } = interaction;

    const button = buttons.get(customId);
    
    if (!button) return new Error("There is no code for this button");
    
    try {
      await button.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});