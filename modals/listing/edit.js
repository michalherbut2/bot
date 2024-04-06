const createRow = require("../../functions/messages/createRow");
const editEmbed = require("../../functions/messages/editEmbed");

module.exports = {
  name: "edit",

  async execute(interaction) {
    const { guild, user } = interaction;

    const titleValue = interaction.fields.getTextInputValue("title");
    const originValue = interaction.fields.getTextInputValue("origin");
    const followersValue = interaction.fields.getTextInputValue("followers");
    const cpbValue = interaction.fields.getTextInputValue("cpb");
    const descriptionValue =
      interaction.fields.getTextInputValue("description");

    console.log("kanałowanie");

    const channelName = `listing-${user.tag}`;

    let targetChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    const row = createRow("endChat", "edit", "create");

    await editEmbed(interaction.message, {
      title: `${user.tag} listing`,
      description: `The user - ${user} created the listing below.

**Listing Title:**
${titleValue}

**Account Origin:**
${originValue}

**Amount of Followers:**
${followersValue}

**CPB Status:**
${cpbValue}

**Description:**
${descriptionValue}

*Please provide all images necessary and wait for one of out staff members to create your listing.*

**Thank you.**`,
      row,
      image:
        "https://cdn.discordapp.com/attachments/888756864748228681/1218410782421946418/FORMS.png?ex=6610caf7&is=65fe55f7&hm=bb33f7972c295c307caccb6d86743fdf16dcb51570f24ba696756520f9ab9369&",
    });

    // sendEmbed(interaction, {
    //   description: "Your submission was received successfully!",
    //   ephemeral: true,
    // });

    console.log("koniec");
    await interaction.deferReply({ ephemeral: true })
    await interaction.deleteReply()
  },
};
