const {
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  ActionRowBuilder,
  TextInputStyle,
} = require("discord.js");

module.exports = {
  name: "edit",

  button: new ButtonBuilder()
    .setCustomId("edit")
    .setLabel("Edit")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction) {
    let desc = interaction.message.embeds[0].description.split("\n\n");
    
    desc = desc.slice(1, -2).map(d=>d.split('\n')[1])

    const modal = new ModalBuilder()
      .setCustomId("edit")
      .setTitle("Buzz Home Listing Form");

    // Add components to modal
    const titleInput = new TextInputBuilder()
      .setCustomId("title")
      .setLabel("Listing title")
      .setValue(desc[0])
      .setStyle(TextInputStyle.Short);

    const originInput = new TextInputBuilder()
      .setCustomId("origin")
      .setLabel("Account Origin")
      .setValue(desc[1])
      .setStyle(TextInputStyle.Short);

    const followersInput = new TextInputBuilder()
      .setCustomId("followers")
      .setLabel("Amount of followers")
      .setValue(desc[2])
      .setStyle(TextInputStyle.Short);

    const cpbInput = new TextInputBuilder()
      .setCustomId("cpb")
      .setLabel("CPB status")
      .setValue(desc[3])
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setValue(desc[4])
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      [titleInput, originInput, followersInput, cpbInput, descriptionInput].map(
        input => new ActionRowBuilder().addComponents(input)
      )
    );

    interaction.showModal(modal);
  },
};
