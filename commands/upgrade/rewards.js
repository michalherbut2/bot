const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const image1 =
"https://cdn.discordapp.com/attachments/888756864748228681/1216904625010118717/INV.png?ex=66148abf&is=660215bf&hm=f6849f323ae64ea09ce309e52d781af47b0c9d255247fe7b4e441fe15cfc3025&";

const image2 = "https://cdn.discordapp.com/attachments/888756864748228681/1217531697021714522/trial.png?ex=6616d2c1&is=66045dc1&hm=f133a824b1928f724da05e3a27c0a805189b82b5d46724fc2f7dfff0b6adbada&"

const title1 = "INVITE REWARDS";

const title2 = "TRY BUZZ HOME FOR FREE";

const description1 = `Gain access to **premium features** that enhance your buying and selling journey,

Here's how you can get a free plan:

**30-Day Free Trial:**
Invite 5 people and you'll earn **5 credits**. Use these credits to unlock your trial period and enjoy all the perks of Buzz Home for a month.

**Lifetime Access:**
Invite 25 people and you'll earn **25 credits**. With these credits, you can secure lifetime access to Buzz Home.

With our credit system, every invite brings you closer to **exclusive rewards** and unlimited access to Buzz Home.

**Don't miss out.**

__Start inviting today and unlock a world of possibilities.__`;

const description2 = `Experience the benefits of Buzz Home Marketplace with our 7-day free trial offer.

Explore all the features and perks our platform has to offer.

**Start your free trial today!**`

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rewards")
    .setDescription("create rewards")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("sevenDayFreeTrial");

    await sendEmbed(channel, {
      title: title1,
      description: description1,
      image: image1,
    });

    await sendEmbed(channel, {
      title: title2,
      description: description2,
      image: image2,
      row,
    });
  },
};
