const { Events } = require("discord.js");
const client = require("../index");
const sendEmbed = require("../functions/messages/sendEmbed");

client.on(Events.InteractionCreate, async interaction => {
  // Slash Command Handling
  if (interaction.isChatInputCommand()) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => {});

    const cmd = client.slashCommands.get(interaction.commandName);
    if (!cmd)
      return interaction.followUp({ content: "An error has occurred " });

    cmd.run(client, interaction);
  }
  
  // Button Handling
  else if (interaction.isButton()) {
    // await interaction.deferReply({ ephemeral: false }).catch(() => { });
    // await interaction.deleteReply()

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
  else if (interaction.isModalSubmit()) {
    // const favoriteColor = interaction.fields.getTextInputValue('favoriteColorInput');
    // const hobbies = interaction.fields.getTextInputValue('hobbiesInput');
    // console.log( favoriteColor, hobbies );
    // // console.log(interaction);
    // await sendEmbed(interaction, {title: favoriteColor, description: hobbies})
    // await interaction.reply({ content: 'Your submission was received successfully!' });
    const { modals } = client;
    const { customId } = interaction;
    const modal = modals.get(customId);
    console.log(modals, customId, modal);
    
    if (!modal) return new Error("There is no code for this button");
    
    try {
      await modal.execute(interaction);
    } catch (err) {
      console.error(err);
    }
  }
});