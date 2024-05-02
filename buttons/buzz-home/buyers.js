const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

// embed content
const image =
  "https://media.discordapp.net/attachments/1216183037507932263/1216581165033717881/BUY.png?ex=66135d80&is=6600e880&hm=4103b1a4636beda54b25f064a2252572d4e1cbd7b77d2d71d27fdf4c40f910c0&format=webp&quality=lossless&width=1440&height=311&";

const title = "For Buyers";

const description = `__Filters for Precise Searches:__
* Looking for something specific? Our custom filters let you pick exactly what you want. Choose the filters that matter most to you.

__Direct Contact with Sellers:__
* We've made it easy for you to talk directly to sellers. Our ticket system lets you reach out to them right here on our platform.

__Diverse Marketplace Sections:__
* Explore three specialized sections crafted to fit your needs, including TikTok accounts, specialized services, and job offerings and gains.

__Peace of Mind:__
* We ensure sellers provide the necessary information for informed decisions. Feel confident in your purchases without irrelevant clutter.`;

module.exports = {
  name: "buyers",

  button: new ButtonBuilder()
    .setCustomId("buyers")
    .setLabel("📙 BUYERS")
    .setStyle(ButtonStyle.Secondary),

  async run(interaction) {
    // reply
    await sendEmbed(interaction, {
      title,
      description,
      image,
      ephemeral: true,
    });
  },
};
