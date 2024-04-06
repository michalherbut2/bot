const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

const roleName = "Guest";

module.exports = {
  name: "agree",

  button: new ButtonBuilder()
    .setCustomId("agree")
    .setLabel("✅ AGREE")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const { guild, member } = interaction;

    const roles = await guild.roles.fetch();
    const role = roles.find(role => role.name === roleName);

    try {
      if (!role) throw new Error(`There is no role ${roleName}`);

      await member.roles.remove(role);

      const title = "Viral Buzz - Notification System";

      const description = `## AGREED TO OUR RULES ✅`;

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
