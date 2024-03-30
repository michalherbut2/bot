const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219508962874101811/guard-banner-test.png?ex=6614c9ba&is=660254ba&hm=899b9c70b293de2eb3fe4469f1acb27e0f3a511af1693d6418ca0239da533063&";

const thumbnail =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219506201491144734/logo-final.png?ex=6614c727&is=66025227&hm=06d5990f17423e6cf0ce03063ba0ac0185b758ab10132c794b6002ecd5056ac9&";

const title = "BuzzGuard - TikTok Listings Addon";

const description = `**Sell TikTok Accounts with confidence with BuzzGuard <:lockfinal:1219502287727104041>**

* Be the standout seller with our safety badge filter and ranking. <:tick:1219499855760588831>

* Demonstrate to potential buyers the authenticity of your accounts. <:tick:1219499855760588831>

* Unlock exclusive benefits and support by successfully verifying your listings. <:tick:1219499855760588831>

* Show potential buyers you're offering the real deal. <:tick:1219499855760588831>

**Explore our range of guard plans:**

Pay per listing for **$4,99**
Lifetime Plan for **$129,99**`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("guard")
    .setDescription("create guard")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("buyNowGuard", "verification");

    const color = 0x58c7fe

    sendEmbed(channel, {
      title,
      description,
      image,
      thumbnail,
      row,
      color
    });
  },
};
