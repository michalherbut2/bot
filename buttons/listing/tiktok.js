const {
  ButtonBuilder,
  ButtonStyle,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "tiktok",

  button: new ButtonBuilder()
    .setCustomId("tiktok")
    .setLabel("TIKTOK")
    .setStyle(ButtonStyle.Secondary),

  async execute(interaction) {
    const { user, guild } = interaction;
    const channelName = `listing-${user.tag}`;
    let targetChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    if (targetChannel)
      return await sendEmbed(interaction, {
        description: `**You already have a listing ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`,
        ephemeral: true,
        color: "red",
        // followUp: true,
      });
    const modal = new ModalBuilder()
      .setCustomId("tiktok")
      .setTitle("Buzz Home Listing Form");

    // Add components to modal
    const titleInput = new TextInputBuilder()
      .setCustomId("title")
      .setLabel("Listing title")
      .setStyle(TextInputStyle.Short);
    // .setMinLength(10)
    // .setMaxLength(1_000)
    // .setPlaceholder("Enter some text!")
    // .setValue("Default siemaskdlasf")
    // .setRequired(true);

    // Create the text input components
    const originInput = new TextInputBuilder()
      .setCustomId("origin")
      .setLabel("Account Origin")
      .setStyle(TextInputStyle.Short);

    const followersInput = new TextInputBuilder()
      .setCustomId("followers")
      .setLabel("Amount of followers")
      .setStyle(TextInputStyle.Short);

    const cpbInput = new TextInputBuilder()
      .setCustomId("cpb")
      .setLabel("CPB status")
      .setStyle(TextInputStyle.Short);

    const descriptionInput = new TextInputBuilder()
      .setCustomId("description")
      .setLabel("Description")
      .setStyle(TextInputStyle.Paragraph);

    // const firstActionRow = new ActionRowBuilder().addComponents(
    //   favoriteColorInput
    // );
    // const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
    // const rowInput = new ActionRowBuilder().addComponents(customInput);

    // Add inputs to the modal
    // modal.addComponents(firstActionRow, secondActionRow, rowInput);
    modal.addComponents(
      [titleInput, originInput, followersInput, cpbInput, descriptionInput].map(
        input => new ActionRowBuilder().addComponents(input)
      )
    );

    // Show the modal to the user
    await interaction.showModal(modal);
  },
};
