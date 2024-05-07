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

  async run(interaction) {
    let description = interaction.message.embeds[0].description
      .split("\n\n")
      .slice(1, -1);

    // get titles and values
    const titles = description.map(d => d.split("\n")[0].split("*").join(""));
    const values = description.map(d => d.split("\n")[1]);

    // creat modal
    const modal = new ModalBuilder()
      .setCustomId("edit")
      .setTitle("Buzz Home Listing Form");

    // Add components to modal
    const titleInput = new TextInputBuilder()
      .setCustomId("title")
      .setLabel(titles[0])
      .setValue(values[0])
      .setStyle(TextInputStyle.Short);

    const originInput = new TextInputBuilder()
      .setCustomId("origin")
      .setLabel(titles[1])
      .setValue(values[1])
      .setStyle(TextInputStyle.Short);

    const fansInput = new TextInputBuilder()
      .setCustomId("fans")
      .setLabel(titles[2])
      .setValue(values[2])
      .setStyle(TextInputStyle.Short);

    const cpbInput = new TextInputBuilder()
      .setCustomId("status")
      .setLabel(titles[3])
      .setValue(values[3])
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel(titles[4])
      .setValue(values[4])
      .setStyle(TextInputStyle.Paragraph);

    modal.addComponents(
      [titleInput, originInput, fansInput, cpbInput, descriptionInput].map(
        input => new ActionRowBuilder().addComponents(input)
      )
    );

    // show modal
    interaction.showModal(modal);
  },
};
