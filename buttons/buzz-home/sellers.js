const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

// embed content
const image =
  "https://media.discordapp.net/attachments/1216183037507932263/1216581165390237756/SELL.png?ex=66135d80&is=6600e880&hm=41ac63843cab8ad6f6644c5b1da3b0222676c737322f7febef077af380607267&=&format=webp&quality=lossless&width=1440&height=311";

const title = "For Sellers";

const description = `__Filtered Information:__
* Display relevant details as searchable filters for potential buyers. Boost your chances of making successful sales.

__Easy Listing Creation:__
* No more complicated steps. Simply fill out our listing form, saving you time and effort.

__Increased Visibility:__
* Showcase your offerings to a targeted audience ensuring they see exactly what they are looking for.

__Community Engagement:__
* Connect with like-minded individuals and expand your network within our buzzing home chat and voice channels.`;

module.exports = {
  name: "sellers",

  button: new ButtonBuilder()
    .setCustomId("sellers")
    .setLabel("📘 SELLERS")
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
