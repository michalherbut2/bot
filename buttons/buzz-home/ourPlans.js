const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

// embed content
const image =
  "https://media.discordapp.net/attachments/888756864748228681/1216536461789102142/asdasd.png?ex=661333de&is=6600bede&hm=104f8aa6169a560628596e6abd1593ea5913b921c5425304b77b6ca3f4a7fa0c&format=webp&quality=lossless&width=1440&height=311&";

const title = "Viral Buzz – BuzzHome Plans";

const footerText = "©️COPYRIGHT VIRAL BUZZ 2024";

const description = `Monthly Plan for **$14.99**
Lifetime Plan for **$129.99**

*As a member, enjoy perks for both sellers and buyers!*

__Get started today and unlock the benefits of Buzz Home Marketplace__`;

module.exports = {
  name: "ourPlans",

  button: new ButtonBuilder()
    .setCustomId("ourPlans")
    .setLabel("🛒 OUR PLANS")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    const row = createRow("buyNow");

    // reply
    await sendEmbed(interaction, {
      title,
      description,
      image,
      footerText,
      row,
      ephemeral: true,
    });
  },
};
