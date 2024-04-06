const {
  ButtonBuilder,
  ButtonStyle,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "addFilters",

  button: new ButtonBuilder()
    .setCustomId("addFilters")
    .setLabel("Add filters")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    const { member, guild } = interaction;

    if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
      // Wysyłanie przycisku na kanał
      return await sendEmbed(interaction, {
        description: "Only admins can create the post!",
        ephemeral: true,
        followUp: true,
        color: "red",
      });

    const instructionRow = createRow("instruction");

    const tagEmbed = await sendEmbed(interaction, {
      title: "Add Filters",
      description: `Choose filters by simply clicking on a emoji below.
  
*If unsure of which filters you should use. Please read the instructions.*`,
      row: instructionRow,
      ephemeral: true,
    });

    const forumName = "tiktok-market";
    const forumChannel = (await guild.channels.fetch()).find(
      channel =>
        channel.name.includes(forumName) &&
        channel.parent.name.toLowerCase().includes("home")
    );

    console.log("FORUM:", forumChannel?.name);

    await Promise.all(
      forumChannel?.availableTags.map(async tag => {
        if (tag.emoji?.id || tag.emoji?.name)
          await tagEmbed.react(tag.emoji?.id || tag.emoji?.name);

        // return tag.emoji?.id || tag.emoji?.name;
      })
    );
  },
};
