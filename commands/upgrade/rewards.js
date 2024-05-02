const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const image1 =
"https://cdn.discordapp.com/attachments/888756864748228681/1216904625010118717/INV.png?ex=66148abf&is=660215bf&hm=f6849f323ae64ea09ce309e52d781af47b0c9d255247fe7b4e441fe15cfc3025&";

const title1 = "INVITE REWARDS";

const description1 = `Gain access to **premium features** that enhance your buying and selling journey,

Here's how you can get a free plan:

**30-Day Free Trial:**
Invite 5 people and you'll earn **5 credits**. Use these credits to unlock your trial period and enjoy all the perks of Buzz Home for a month.

**Lifetime Access:**
Invite 25 people and you'll earn **25 credits**. With these credits, you can secure lifetime access to Buzz Home.

With our credit system, every invite brings you closer to **exclusive rewards** and unlimited access to Buzz Home.

**Don't miss out.**

__Start inviting today and unlock a world of possibilities.__`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rewards")
    .setDescription("create rewards")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true });
    await interaction.deleteReply();

    const { channel } = interaction;

    await sendEmbed(channel, {
      title: title1,
      description: description1,
      image: image1,
    });
  },
};
