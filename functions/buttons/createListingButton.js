const {
  ButtonBuilder,
  ButtonStyle,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
} = require("discord.js");
const sendEmbed = require("../messages/sendEmbed");

// embed content
const statuses = {
  tiktok: "CPB status",
  youtube: "Monetization status",
  instagram: "Average views",
};

module.exports = socialPlatformName => {
  return {
    name: socialPlatformName,

    button: new ButtonBuilder()
      .setCustomId(socialPlatformName)
      .setLabel(socialPlatformName.toUpperCase())
      .setStyle(ButtonStyle.Secondary),

    async run(interaction) {
      const { user, guild } = interaction;

      // get the category
      const categoryName = `listings - ${socialPlatformName}`;
      const targetCategory = guild.channels.cache.find(
        channel => channel.name.toLowerCase() === categoryName
      );

      try {
        if (!targetCategory)
          throw new Error(`I cannot create the ${socialPlatformName}-listing channel.

There is no **${categoryName}** category on the server!`);

        // get the channel
        const channelName = `listing-${user.tag}`;
        let targetChannel = targetCategory?.children?.cache.find(
          channel => channel.name === channelName
        );

        if (targetChannel)
          throw new Error(`**You already have a ${socialPlatformName} listing ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`);

        // create a modal
        const modal = new ModalBuilder()
          .setCustomId(socialPlatformName)
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

        const statusInput = new TextInputBuilder()
          .setCustomId("status")
          .setLabel(statuses[socialPlatformName])
          .setStyle(TextInputStyle.Short);

        const descriptionInput = new TextInputBuilder()
          .setCustomId("description")
          .setLabel("Description")
          .setStyle(TextInputStyle.Paragraph);

        // Add inputs to the modal
        modal.addComponents(
          [
            titleInput,
            originInput,
            followersInput,
            statusInput,
            descriptionInput,
          ].map(input => new ActionRowBuilder().addComponents(input))
        );

        // Show the modal to the user
        await interaction.showModal(modal);
      } catch (error) {
        console.error("\x1b[31m%s\x1b[0m", error);

        sendEmbed(interaction, {
          description: error.message,
          ephemeral: true,
          color: "red",
        });
      }
    },
  };
};
