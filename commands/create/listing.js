const { SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("listing")
    .setDescription("create listing"),

  async run(client, interaction) {
    const row = createRow("tiktok")
    const image = "https://cdn.discordapp.com/attachments/888756864748228681/1218410782421946418/FORMS.png?ex=6610caf7&is=65fe55f7&hm=bb33f7972c295c307caccb6d86743fdf16dcb51570f24ba696756520f9ab9369&"
    const footerText = "©️COPYRIGHT VIRAL BUZZ 2024"
    sendEmbed(interaction, {
      title: "BuzzHome - Listing Forms", description: `**Here you can create a listing for the BuzzHome markets.**

Please read through the form carefully so no mistakes or errors are made, thank you.`, image, row, footerText});
  },
};
