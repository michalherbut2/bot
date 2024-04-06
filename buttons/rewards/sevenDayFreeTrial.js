const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const title = "Viral Buzz - Notification System";

const claimed = `## ALREADY HAS BEEN CLAIMED ❌`;

const notClaimed = `## 7 DAY FREE TRIAL CLAIMED ✅`;

const footerText = "©️COPYRIGHT VIRAL BUZZ 2024";

module.exports = {
  name: "sevenDayFreeTrial",

  button: new ButtonBuilder()
    .setCustomId("sevenDayFreeTrial")
    .setLabel("7 DAY FREE TRIAL")
    .setStyle(ButtonStyle.Success)
    .setEmoji("✅"),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    // get roles
    const { member, guild } = interaction;

    const roles = await guild.roles.fetch();

    const memberRoles = member.roles.cache

    const neverClaimedRole = roles.find(role => role.name === "NeverClaimed");
    
    const claimedRole = roles.find(role => role.name === "Claimed");
    
    // check role
    // const isClaimed = memberRoles.some(role => role.name === "Claimed") && !memberRoles.some(role => role.name === "NeverClaimed");
    const isClaimed = !memberRoles.some(role => role.name === "NeverClaimed");

    // manage roles
    if (!isClaimed) {
      await member.roles.remove(neverClaimedRole)
      await member.roles.add(claimedRole)
    }

    // prepare a description
    const description = isClaimed ? claimed : notClaimed;

    // reply
    await sendEmbed(interaction, {
      title,
      description,
      footerText,
      ephemeral: true,
      followUp: true
    });
  },
};
