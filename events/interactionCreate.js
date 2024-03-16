const { Events } = require("discord.js");
const client = require("../index");

client.on(Events.InteractionCreate, async interaction => {
  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({ content: "An error has occurred " });

    const args = [];

    for (let option of interaction.options.data) {
      if (option.type === "SUB_COMMAND") {
        if (option.name) args.push(option.name);
        option.options?.forEach(x => {
          if (x.value) args.push(x.value);
        });
      } else if (option.value) args.push(option.value);
    }
    interaction.member = interaction.guild.members.cache.get(
      interaction.user.id
    );

    cmd.run(client, interaction, args);
  }
  
  // Button Handling
  else if (interaction.isButton()) {
    
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