const createRow = require("../../functions/messages/createRow");
const editEmbed = require("../../functions/messages/editEmbed");

module.exports = {
  name: "edit",

  async run(interaction) {
    // get previous embed content and settings
    const { user, message } = interaction;

    const description = message.embeds[0].description;

    const image = message.embeds[0].image.url;

    const color = message.embeds[0].color;

    const titles = description
      .split("\n\n")
      .slice(1, -2)
      .map(k => k.split("\n")[0]);

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
      title: `${user.tag} listing`,
      description: `The user - ${user} created the listing below.\n
${listingPart}\n    
*Please provide all images necessary and wait for one of out staff members to create your listing.*\n
**Thank you.**`,
      row,
      image,
      color,
    });

    console.log("Embed edited!");
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();
  },
};
