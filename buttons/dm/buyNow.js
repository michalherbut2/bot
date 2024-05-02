const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

// embed content
const image =
  "https://media.discordapp.net/attachments/1216183037507932263/1216547457434128424/PAYMENT.png?ex=66133e1c&is=6600c91c&hm=a406f13268fb61f4527992abef03f127d39e62b8622ad4664cf763de26da44b1&format=webp&quality=lossless&width=1440&height=311&";

const thumbnail =
  "https://media.discordapp.net/attachments/1216104890976305162/1216201330549456926/Logoonew.png?ex=6611fbc1&is=65ff86c1&hm=50ceb9b9c349f96013743bd5bb672e231bbad5e233123921185bf65e8b516e45&format=webp&quality=lossless&width=625&height=625&";

const title = "Viral Buzz - Payment System";

const footerText = "©️COPYRIGHT VIRAL BUZZ 2024";

const description = `* To complete your payment, please send the required amount to the provided address below.

* Afterwards, kindly navigate to our support channel and select 'BuzzHome' from the list of options. Upon clicking, a ticket will be created.

* Finally, submit a screenshot confirming the payment sent to the address.

* Once these steps are completed, your transaction will be processed promptly. Thank you for your cooperation.


__***CRYPTO ONLY (OTHERWISE CREATE TICKET)***__`;

module.exports = {
  name: "buyNow",

  button: new ButtonBuilder()
    .setCustomId("buyNow")
    .setLabel("BUY NOW")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    const { user } = interaction;

    const row = createRow("litecoin", "bitcoin");

    // send dm
    await sendEmbed(user, {
      title,
      description,
      image,
      thumbnail,
      footerText,
      row,
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
