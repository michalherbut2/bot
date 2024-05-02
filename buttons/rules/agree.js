const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const roleName = "Guest";

const channelName = "rules";

module.exports = {
  name: "agree",

  button: new ButtonBuilder()
    // .setCustomId("agree")
    .setLabel("✅ AGREE")
    // .setStyle(ButtonStyle.Success),
    .setStyle(ButtonStyle.Link)
    .setURL(
      "https://discord.com/channels/982460828492107797/1226968554788884690"
    ),

  // if ButtonStyle is Link, the "run" function will never be executed
  async run(interaction) {
    const { guild, member } = interaction;

    const roles = await guild.roles.fetch();
    const role = roles.find(role => role.name === roleName);

    const channel = guild.channels.cache.find(c =>
      c.name.toLowerCase().includes(channelName)
    );

    try {
      if (!role) throw new Error(`There is no role ${roleName}`);
      if (!role) throw new Error(`There is no channel ${channelName}`);

      await member.roles.remove(role);

      const title = "Viral Buzz - Notification System";

      const description = `## AGREED TO OUR RULES ✅

**MAKE YOUR WAY TO THE ${channel}**`;

      // reply
      sendEmbed(interaction, {
        title,
        description,
        ephemeral: true,
      });

      console.log(
        "\x1b[34m%s\x1b[0m",
        `${member.user.tag} agreed to the rules`
      );
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        color: "red",
        ephemeral: true,
      });
    }
  },
};
