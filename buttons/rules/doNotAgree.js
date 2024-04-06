const {
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "doNotAgree",

  button: new ButtonBuilder()
    .setCustomId("doNotAgree")
    .setLabel("❌ DO NOT AGREE")
    .setStyle(ButtonStyle.Danger),

  async execute(interaction) {
    const title = "Are you sure?"

    const description = `You will be **KICKED** from the server`

    const row = createRow("confirm")

    // reply
    await sendEmbed(interaction, {
      title,
      description,
      ephemeral: true,
      color: "red",
      row
    });
  },
};
