const {
  PermissionsBitField,
  ChannelType,
} = require("discord.js");
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

    // const channelName = `listing-${interaction.member.displayName}`;
    const channelName = `listing-${user.tag}`;
    let targetChannel = guild.channels.cache.find(
      channel => channel.name === channelName
    );

    const targetCategory = guild.channels.cache.find(
      channel => channel.name === "LISTINGS - TIKTOK"
    );

    if (targetChannel)
      return await sendEmbed(interaction, {
        description: `**You already have a listing ${targetChannel} in progress.**

Please wait until your previous listing is finalised!`,
        ephemeral: true,
        color: "red",
        followUp: true,
      });
    // if (targetChannel)
    else
      targetChannel = await guild.channels.create({
        name: channelName,
        // parent: "1218724264946172025", // buzz
        parent: targetCategory.id, // test

        permissionOverwrites: [
          //   // Zablokuj dostęp dla wszystkich poza rolą administratora
          //   {
          //     id: guild.roles.everyone,
          //     deny: [PermissionsBitField.Flags.ViewChannel],
          //   },
          {
            id: client.user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: user.id,
            allow: [PermissionsBitField.Flags.ViewChannel],
          },
          {
            id: guild.id,
            denny: [PermissionsBitField.Flags.ViewChannel],
          }
        ],
      });
/*
    targetChannel.permissionOverwrites.create(client.user.id, {
      ViewChannel: true,
    });
    targetChannel.permissionOverwrites.create(user.id, { ViewChannel: true });
    targetChannel.permissionOverwrites.edit(guild.id, { ViewChannel: false });
*/



    // channel.permissionOverwrites.create(channel.guild.roles.everyone, {
    //   ViewChannel: false,
    // });
    // await targetChannel.overwritePermissions(user.id, {
    //   VIEW_CHANNEL: true,
    // });

    const row = createRow("endChat", "edit", "create");

    // console.log(interaction);
    await sendEmbed(targetChannel, {
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
    await sendEmbed(targetChannel, {
      description:
        "Please wait for the **STAFF** to join the chat.\n\nThey should be here shortly!",
    });
    // await interaction.reply({ content: 'Your submission was received successfully!' });
    await sendEmbed(interaction, {
      description: `Your submission was received successfully!

**MAKE YOUR WAY TO THE ${targetChannel}**`,
      ephemeral: true,
      followUp: true
    });

    await targetChannel.threads.create({
      name: "ADD IMAGES",
    });

    // const privateThread = await targetChannel.threads.create({
    //   name: "Add Filters",
    //   // type: ChannelType.PrivateThread
    // });
    // privateThread.setInvitable(false)

//     const instructionRow = createRow("instruction");

//     const tagEmbed = await sendEmbed(targetChannel, {
//       title: "Add Filters",
//       description: `Choose filters by simply clicking on a emoji below.

// *If unsure of which filters you should use. Please read the instructions.*`,
//       row: instructionRow,
//     });

//     // const emojis = guild.emojis.cache;

//     // const lockfinal = emojis.find(emoji => emoji.name === "lockfinal");
//     // const MoneyBag = emojis.find(emoji => emoji.name === "MoneyBag");
//     // const ThumbUp = emojis.find(emoji => emoji.name === "ThumbUp");
//     // const BangBang = emojis.find(emoji => emoji.name === "BangBang");
//     // const flag_us = emojis.find(emoji => emoji.name === "flag_us");
//     // const flag_gb = emojis.find(emoji => emoji.name === "flag_gb");
//     // const flag_de = emojis.find(emoji => emoji.name === "flag_de");
//     // const flag_fr = emojis.find(emoji => emoji.name === "flag_fr");
//     // const flag_br = emojis.find(emoji => emoji.name === "flag_br");

//     // const emojiMap = {
//     //   lockfinal: "lockfinal",
//     //   MoneyBag: "MoneyBag",
//     //   ThumbUp: "ThumbUp",
//     //   BangBang: "BangBang",
//     //   flag_us: "🇺🇸",
//     //   flag_gb: "🇬🇧",
//     //   flag_de: "🇩🇪",
//     //   flag_fr: "🇫🇷",
//     //   flag_br: "🇧🇷",
//     // };

//     // const emojisObject = {};
//     // for (const key in emojiMap) {
//     //   if (!key.includes("flag")) {
//     //     emojisObject[key] = emojis.find(emoji => emoji.name === emojiMap[key]);
//     //   } else emojisObject[key] = emojiMap[key];
//     // }

//     // for (const key in emojisObject) {
//     //   console.log(emojisObject[key]);
//     //   tagEmbed.react(emojisObject[key]);
//     // }
//     const forumName = "tiktok-market";
//     const forumChannel = (await guild.channels.fetch()).find(
//       channel =>
//         channel.name.includes(forumName) &&
//         channel.parent.name.toLowerCase().includes("home")
//     );
//     console.log("FORUM:", forumChannel?.name);
//     // const tag =
//     await Promise.all(
//       forumChannel?.availableTags.map(async tag => {
//         // console.log("emoji tagu:", tag.emoji);
//         // tagEmbed.react(emojisObject[key]);
//         if (tag.emoji?.id || tag.emoji?.name)
//           await tagEmbed.react(tag.emoji?.id || tag.emoji?.name);

//         return tag.emoji?.id || tag.emoji?.name;
//       })
//     );
    // tag

    // tagEmbed.react();

    console.log(`CREATED LISTING TIKTOK for ${user.tag}`);
  },
};
