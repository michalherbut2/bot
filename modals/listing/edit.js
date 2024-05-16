const createRow = require("../../functions/messages/createRow");
const editEmbed = require("../../functions/messages/editEmbed");

module.exports = {
  name: "edit",

  async run(interaction) {
    // get previous embed content and settings
    const { user, message } = interaction;

    const title = message.embeds[0].title;

    const description = message.embeds[0].description.split("\n\n");

    const image = message.embeds[0].image.url;

    const color = message.embeds[0].color;

    const titles = description.slice(1, -2).map(k => k.split("\n")[0]);

    // get new embed content
    const titleValue = interaction.fields.getTextInputValue("title");
    const originValue = interaction.fields.getTextInputValue("origin");
    const fansValue = interaction.fields.getTextInputValue("fans");
    const statusValue = interaction.fields.getTextInputValue("status");
    const descriptionValue =
      interaction.fields.getTextInputValue("description");

    const values = [
      titleValue,
      originValue,
      fansValue,
      statusValue,
      descriptionValue,
    ];

    // create new listing
    const listingPart = titles
      .map((value, index) => `${value}\n${values[index]}`)
      .join("\n\n");

    // create a buttons
    const row = createRow("endChat", "edit", "create");

    // edit the embed
    await editEmbed(interaction.message, {
      title,
      description: `${description[0]}\n\n${listingPart}\n\n${description
        .slice(-2)
        .join("\n\n")}`,
      row,
      image,
      color,
    });

    console.log("Embed edited!");
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();
  },
};
