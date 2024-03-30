const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image = "https://cdn.discordapp.com/attachments/888756864748228681/1219514152293498910/home.png?ex=6614ce8f&is=6602598f&hm=d2ecfa6cca9f770dc3474deb51c5cd9a5e3f8b0e5cd0007d4a29c0d4803adf77&"

const title = "Why Consider Buzz Home?";

const description = `While Buzz Guest offers a fantastic platform for free. We want to highlight the exciting benefits of upgrading to Buzz Home Marketplace.

**Here's why it might be the perfect fit for you:**

**Premium Features:**
* Exclusive perks such as custom searchable listing filters ensuring a seamless shopping experience. Choose the filters that matter most to you.

**Enhanced Moderation:**
* Say goodbye to spam and unwanted content with our rigorous moderation system. We keep a pristine environment where quality listings reign supreme.

**Structured Listings:**
* Messy listings? We provide sellers with a simple form to fill out, ensuring that every listing is organized and easy to read.

**Enhanced User Experience:**
* Expect a clutter-free environment and listings that are easy to navigate. No more sifting through irrelevant information.

*By choosing Buzz Home, you're not just upgrading your experience—you're investing in a premium marketplace tailored to your needs and preferences.*

**Thank you for choosing Buzz Guest Marketplace as your starting point.**

Whether you decide to stay with us or explore the benefits of Buzz Home, we're excited to have you here.`;


module.exports = {
  name: "upgrade",

  button: new ButtonBuilder()
    .setCustomId("upgrade")
    .setLabel("UPGRADE?")
    .setStyle(ButtonStyle.Success)
    .setEmoji("✅"),

  async execute(interaction) {

    const row = createRow("sevenDayFreeTrial")

    // reply
    await sendEmbed(interaction, {
      title,
      description,
      image,
      row,
      ephemeral: true
    });
  },
};
