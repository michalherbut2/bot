const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const betterSqlite3 = require("better-sqlite3");

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

  async run(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { member, guild } = interaction;
    
    // get roles
    const roles = await guild.roles.fetch();

    const memberRoles = member.roles.cache;

    const joinedRole = roles.find(role => role.name.toLowerCase() === "joined");

    const neverClaimedRole = roles.find(role => role.name.toLowerCase() === "neverclaimed");

    const claimedRole = roles.find(role => role.name.toLowerCase() === "claimed");
    const homeTrialRole = roles.find(role => role.name.toLowerCase() === "hometrial");

    // check role
    const isJoined = memberRoles.some(role => role.name.toLowerCase() === "joined");

    const db = new betterSqlite3(`db/db_${guild.id}.db`);

    const isClaimed = db
      .prepare("SELECT * FROM reward WHERE user_id = ?")
      .get(member.id);

    // manage roles
    if (isJoined) {
      await member.roles.remove(neverClaimedRole);
      await member.roles.remove(joinedRole);
    }

    if (!isClaimed) {
      await member.roles.add(homeTrialRole);
      await member.roles.add(claimedRole);
      db.prepare("INSERT INTO reward (user_id) VALUES (?)").run(member.id);
    }

    // prepare a description
    const description = isClaimed ? claimed : notClaimed;

    // reply
    await sendEmbed(interaction, {
      title,
      description,
      footerText,
      ephemeral: true,
      followUp: true,
    });

    db.close();
  },
};
