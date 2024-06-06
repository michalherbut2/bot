const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const Colors = require("../../utils/colors");
const isAdmin = require("../../functions/permissions/isAdmin");
const getRole = require("../../functions/roles/getRole");

module.exports = {
  name: "join",

  button: new ButtonBuilder()
    .setCustomId("join")
    .setLabel("Join")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    const { message, client, user } = interaction;

    // get description
    let description = message.embeds[0].description;

    // get channel id from embed
    const channelRegex = /<#(\d+)>/;
    const channelMatch = description.match(channelRegex);

    const threadId = channelMatch[1];

    // get guild
    const guild = client.guilds.cache.find(guild =>
      guild.channels.cache.find(c => c.id === threadId)
    );

    try {
      if (!guild) throw new Error("The listing has expired!");

      // get target channel
      const thread = await guild.channels.fetch(threadId);

      const members = await thread.members.fetch();

      const isAdminPesent = members.some(member => isAdmin(member.guildMember));

      // add member to the thread
      if (!isAdminPesent) {
        thread.members.add(user);
        const adminRole = await getRole("admin", guild);

        adminRole.members
          .filter(admin => admin.id != user.id)
          .map(admin =>
            sendEmbed(admin, {
              // description: `${user} admin has already joined the thread.`,
              description: `The listing is taken care of by another admin.`,
              color: message.embeds[0].color,
            })
          );
      }

      const description = isAdminPesent
        ? `Another admin is already helping with the listing.`
        : `You have **JOINED** the thread!

Please make your way to the ${thread} thread.`;

      // send dm
      sendEmbed(interaction, {
        description,
        ephemeral: true,
        color: isAdminPesent ? Colors.RED : Colors.INTENSE_GREEN,
      });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        ephemeral: true,
        color: Colors.RED,
        followUp: true,
      });
    }
  },
};
