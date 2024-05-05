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

    const homeTrialRole = roles.find(
      role => role.name.toLowerCase() === "hometrial"
    );

    const guestRole = roles.find(role => role.name.toLowerCase() === "guest");

    const db = new betterSqlite3(`db/db_${guild.id}.db`);

    const isClaimed = db
      .prepare("SELECT * FROM reward WHERE user_id = ?")
      .get(member.id);

    // manage the roles
    // if the member has the "joined" role, remove it
    if (memberRoles.has(joinedRole.id)) await member.roles.remove(joinedRole);

    // if the member has never claimed a reward
    if (!isClaimed) {
      // add the "home trial" role
      await member.roles.add(homeTrialRole);

      // and save the claim in db
      db.prepare("INSERT INTO reward (user_id) VALUES (?)").run(member.id);
    }

    // if the member has got a reward and hasn't got a guest role
    // add "guest" role
    else if (!memberRoles.has(guestRole.id)) await member.roles.add(guestRole);

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
