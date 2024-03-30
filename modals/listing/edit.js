const {
  ButtonBuilder,
  ButtonStyle,
  TextInputStyle,
  ActionRowBuilder,
  ModalBuilder,
  TextInputBuilder,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");
const editEmbed = require("../../functions/messages/editEmbed");

module.exports = {
  name: "edit",

  async execute(interaction) {
    const { guild, user, client } = interaction;

    const titleValue = interaction.fields.getTextInputValue("title");
    const originValue = interaction.fields.getTextInputValue("origin");
    const followersValue = interaction.fields.getTextInputValue("followers");
    const cpbValue = interaction.fields.getTextInputValue("cpb");
    const descriptionValue =
      interaction.fields.getTextInputValue("description");

    console.log("kanałowanie");

    // const channelName = `listing-${interaction.member.displayName}`;
    const channelName = `listing-${user.tag}`;
    let targetChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    const row = createRow("endChat", "edit", "create");

    // console.log(interaction);
    await editEmbed(interaction.message, {
      // title: `${interaction.member.displayName} listing`,
      title: `${user.tag} listing`,
      // description: `The user - <@${user.id}> created the listing below.
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
    // sendEmbed(targetChannel, {description: "Please wait for the **STAFF** to join the chat.\n\nThey should be here shortly!"})
    // // await interaction.reply({ content: 'Your submission was received successfully!' });
    // sendEmbed(interaction, {
    //   description: "Your submission was received successfully!",
    //   ephemeral: true,
    // });
    console.log("koniec");
    await interaction.deferReply({ ephemeral: false }).catch(() => { });
    await interaction.deleteReply()
  },
};
//   },
// };
// 0
