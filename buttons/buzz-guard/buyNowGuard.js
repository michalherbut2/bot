const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219510997472247898/payments.png?ex=6614cb9f&is=6602569f&hm=bc6d0701614fe2067e99b7a6afd189c137e44a5eb3e2c8453e929995a5c1a977&";

const thumbnail = "https://cdn.discordapp.com/attachments/888756864748228681/1219506201491144734/logo-final.png?ex=6614c727&is=66025227&hm=06d5990f17423e6cf0ce03063ba0ac0185b758ab10132c794b6002ecd5056ac9&"

const title = "BuzzGuard – Payment System";

const footerText = "©️COPYRIGHT VIRAL BUZZ 2024";

const color = 0x58c7fe

const description = `* To complete your payment, please send the required amount to the provided address below.

* Afterwards, kindly navigate to our support channel and select 'BuzzGuard' from the list of options. Upon clicking, a ticket will be created.

* Finally, submit a screenshot confirming the payment sent to the address.

* Once these steps are completed, your transaction will be processed promptly. Thank you for your cooperation.

__*CRYPTO ONLY (OTHERWISE CREATE TICKET)*__`;

module.exports = {
  name: "buyNowGuard",

  button: new ButtonBuilder()
    .setCustomId("buyNowGuard")
    .setLabel("BUY NOW")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const { user } = interaction;

    const row = createRow("litecoin", "bitcoin");

    // send dm
    await sendEmbed(user, {
      title,
      description,
      image,
      footerText,
      row,
      thumbnail,
      color,      
      ephemeral: true,
    });

    // do not reply, sent dm
    try {
      await interaction.reply({});
    } catch (error) {
      console.log("do not reply, sent dm");
    }
  },
};
