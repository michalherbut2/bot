const { PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "tiktok",

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { guild, user, client } = interaction;

    const titleValue = interaction.fields.getTextInputValue("title");
    const originValue = interaction.fields.getTextInputValue("origin");
    const followersValue = interaction.fields.getTextInputValue("followers");
    const cpbValue = interaction.fields.getTextInputValue("cpb");
    const descriptionValue =
      interaction.fields.getTextInputValue("description");

    console.log("kanałowanie");

    const targetCategory = guild.channels.cache.find(
      channel => channel.name.toLowerCase() === "listings - tiktok"
    );

    if (!targetCategory)
      throw new Error(`I cannot create the ticket channel.
There is no **${labelName}** category on the server!`);

    const channelName = `listing-${user.tag}`;
    let targetChannel = targetCategory?.children?.cache.find(
      channel => channel.name === channelName
    );

    if (targetChannel)
      return await sendEmbed(interaction, {
        description: `**You already have a listing ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`,
        ephemeral: true,
        color: "red",
        followUp: true,
      });
    else
      targetChannel = await guild.channels.create({
        name: channelName,

        parent: targetCategory.id,

        permissionOverwrites: [
          // Zablokuj dostęp dla wszystkich poza rolą administratora
          {
            id: client.user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
          {
            id: user.id,
            allow: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessagesInThreads,
              PermissionsBitField.Flags.AttachFiles,
            ],
          },
          {
            id: guild.id,
            deny: [
              PermissionsBitField.Flags.ViewChannel,
              PermissionsBitField.Flags.SendMessages,
            ],
          },
        ],
      });

    const row = createRow("endChat", "edit", "create");

    await sendEmbed(targetChannel, {
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

    await sendEmbed(targetChannel, {
      description:
        "Please wait for the **STAFF** to join the chat.\n\nThey should be here shortly!",
    });

    await sendEmbed(interaction, {
      description: `Your submission was received successfully!

**MAKE YOUR WAY TO THE ${targetChannel}**`,
      ephemeral: true,
      followUp: true,
    });

    const thread = await targetChannel.threads.create({
      name: "ADD IMAGES",
      invitable: false,
    });

    thread.members.add(user);

    const instructionRow = createRow("instruction");

    const tagEmbed = await sendEmbed(targetChannel, {
      title: "Add Filters",
      description: `Choose filters by simply clicking on a emoji below.

*If unsure of which filters you should use. Please read the instructions.*`,
      row: instructionRow,
    });

    const forumName = "tiktok-market";
    const forumChannel = (await guild.channels.fetch()).find(
      channel =>
        channel.name.includes(forumName) &&
        channel.parent.name.toLowerCase().includes("home")
    );

    await Promise.all(
      forumChannel?.availableTags.map(async tag => {
        if (tag.emoji?.id || tag.emoji?.name)
          await tagEmbed.react(tag.emoji?.id || tag.emoji?.name);

        return tag.emoji?.id || tag.emoji?.name;
      })
    );

    console.log(`CREATED LISTING TIKTOK for ${user.tag}`);
  },
};
