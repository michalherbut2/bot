const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");
const Colors = require("../../utils/colors");
const isAdmin = require("../../functions/permissions/isAdmin");

module.exports = {
  name: "addFilters",

  button: new ButtonBuilder()
    .setCustomId("addFilters")
    .setLabel("Add filters")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    const { member, guild } = interaction;

    // if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
    if (!isAdmin(member))
      // send a warning
      return await sendEmbed(interaction, {
        description: `${member} you can't create the listing!\n\nOnly admins have permission to do so.`,
        ephemeral: true,
        followUp: true,
        color: Colors.RED,
      });

    // create button
    const instructionRow = createRow("instruction");

    // send tag embed
    const tagEmbed = await sendEmbed(interaction, {
      title: "Add Filters",
      description: `Choose filters by simply clicking on a emoji below.
  
*If unsure of which filters you should use. Please read the instructions.*`,
      row: instructionRow,
      ephemeral: true,
    });

    // get a forum
    const forumName = "tiktok-market";
    const forumChannel = (await guild.channels.fetch()).find(
      channel =>
        channel.name.includes(forumName) &&
        channel.parent.name.toLowerCase().includes("home")
    );

    // react with all forum tags on tag embed
    await Promise.all(
      forumChannel?.availableTags.map(async tag => {
        if (tag.emoji?.id || tag.emoji?.name)
          await tagEmbed.react(tag.emoji?.id || tag.emoji?.name);
      })
    );
  },
};
