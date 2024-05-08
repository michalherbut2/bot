const {
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  PermissionsBitField,
  AttachmentBuilder,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createForumPost = require("../../functions/messages/createForumPost");
const createRow = require("../../functions/messages/createRow");
const Colors = require("../../utils/colors");
const Canvas = require("@napi-rs/canvas");

module.exports = {
  name: "create",

  button: new ButtonBuilder()
    .setCustomId("create")
    .setLabel("Create")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    await interaction.deferReply({ ephemeral: false });

    const { message, guild, channel, member } = interaction;

    let description = message.embeds[0].description;

    const image = message.embeds[0].image.url;

    const color = message.embeds[0].color;

    // check a permissions
    if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
      // send a warning
      return await sendEmbed(interaction, {
        description: "Only admins can create the post!",
        ephemeral: true,
        followUp: true,
        color: Colors.RED,
      });

    // get user id from embed
    const regex = /<@(\d+)>/;
    const match = description.match(regex);

    const userId = match[0];

    description = description.split("\n\n").slice(1, -2);

    const name = description[0].split("\n")[1];

    description = description.join("\n\n");

    // get a forum
    const socialPlatformName = channel.parent.name
      .toLowerCase()
      .split(" - ")[1];

    const channels = await guild.channels.fetch();

    // find a category
    const categoryName = "home marketplace";
    const targetCategory = channels.find(
      channel => channel.name.toLowerCase() === categoryName
    );

    try {
      if (!targetCategory)
        throw new Error(`I cannot create the ${labelName} channel.
There is no **${categoryName}** category on the server!`);

      // get target channel
      const targetChannel = targetCategory?.children?.cache.find(channel =>
        channel.name.includes(socialPlatformName)
      );

      if (!targetChannel)
        throw new Error(`I cannot create the listing channel.
There is no **${targetChannel}** forum on the server!`);

      // edit description
      description = `**Seller**:\n${userId}\n\n${description}\n\n*Feel free to contact the seller via our platform!*`;

      // get the image thread
      const imageThread = channel.threads.cache.find(
        thread => thread.name === "ADD IMAGES"
      );

      // get messages with images
      const imageMessages = await imageThread.messages.fetch();

      // get url of images
      const files = imageMessages
        .map(m => m.attachments.map(i => i.url))
        .flat()
        .slice(0, 10);

      if (!files.length) throw new Error(`Add images in ${imageThread}!`);

      // get the main page role
      const roles = await interaction.guild.emojis.fetch();
      const mainPageRole = roles.find(r => r.name.toLowerCase() === "mainpage");

      // get fresh reaction data
      await Promise.all(
        imageMessages.map(async m => {
          // skip if meessage has no images or hasn't got the main page reaction
          if (!m.reactions.cache.has(mainPageRole.id) || !m.attachments.size)
            return;

          // get the main page reaction
          const mainPageReaction = m.reactions.cache.get(mainPageRole.id);

          // get fresh reaction data
          await mainPageReaction.users.fetch();
        })
      );

      // get the thumbnail image
      const thumbnailImage = imageMessages.find(m => {
        // skip if meessage has no images or hasn't got the main page reaction
        if (!m.reactions.cache.has(mainPageRole.id) || !m.attachments.size)
          return false;

        // get the main page reaction
        const mainPageReaction = m.reactions.cache.get(mainPageRole.id);

        // get the users that have given the main page reaction
        const rectionUsers = mainPageReaction.users.cache;

        // check if any admin has given the main page reaction
        return rectionUsers.some(user => {
          // get the server member
          const member = guild.members.cache.get(user.id);

          // check if the member is an admin and is not a bot
          return (
            member?.permissions.has(PermissionFlagsBits.Administrator) &&
            !user.bot
          );
        });
      });

      // get the url ot the thumbnail image
      const thumbnailImageUrl =
        thumbnailImage?.attachments.first().url || files[0];

      const canvas = Canvas.createCanvas(900, 900);
      const context = canvas.getContext("2d");

      const background = await Canvas.loadImage(thumbnailImageUrl);

      // This uses the canvas dimensions to stretch the image onto the entire canvas
      // context.drawImage(background, 0, 0, canvas.width, canvas.height);
      context.drawImage(background, 0, 0, background.width, background.height);

      // Use the helpful Attachment class structure to process the file for you
      const attachment = new AttachmentBuilder(await canvas.encode("jpeg"), {
        name: "profile-image.jpeg",
      });

      // interaction.reply({ files: [attachment] });

      // remove the thumbnail image from other images
      const index = files.indexOf(thumbnailImageUrl);
      if (index !== -1) files.splice(index, 1);

      // get a filter embed
      const embeds = await channel.messages.fetch();
      const tagEmbed = embeds.find(e =>
        e.embeds[0]?.title?.includes("Add Filters")
      );

      // get a reactions
      const reactions = tagEmbed.reactions.cache;

      const appliedTags = [];

      // get a tags to add
      await Promise.all(
        reactions.map(async reaction => {
          // check if admin add a reaction
          const hasAdmin = (await reaction.users.fetch()).some(user => {
            const member = guild.members.cache.get(user.id);

            return (
              member?.permissions.has(PermissionFlagsBits.Administrator) &&
              !user.bot
            );
          });

          if (hasAdmin) {
            // check if a tag exists
            const tag = targetChannel?.availableTags.find(tag => {
              return (
                tag.emoji?.id === reaction.emoji.id ||
                tag.emoji?.name === reaction.emoji.name
              );
            });

            // add a tag
            if (tag) appliedTags.push(tag.id);
          }
        })
      );

      console.log("TAGS:", appliedTags.length);

      if (!appliedTags.length)
        throw new Error(`Add filters in ${tagEmbed.url}!`);

      // create a post in the forum
      const threadChannel = await createForumPost(targetChannel, {
        name,
        message: { files: [attachment] },
        appliedTags,
      });

      // send the rest of the images if there are any
      if (files.length) {
        // crop the images to 900 x 900 px
        const croppedFiles = await Promise.all(
          files.map(async file => {
            // create a 900 x 900 2d canvas
            const canvas = Canvas.createCanvas(900, 900);
            const context = canvas.getContext("2d");

            // load the image
            const image = await Canvas.loadImage(file);

            // This uses the canvas dimensions to stretch the image onto the entire canvas
            context.drawImage(image, 0, 0, background.width, background.height);

            // Use the helpful Attachment class structure to process the file for you
            return new AttachmentBuilder(await canvas.encode("jpeg"), {
              name: "profile-image.jpeg",
            });
          })
        );

        //
        await threadChannel.send({ files: croppedFiles });
      }
      // create button
      const row = createRow("enquire");

      // send an embed in the post
      await sendEmbed(threadChannel, {
        description,
        image,
        thumbnail:
          "https://media.discordapp.net/attachments/1216183037507932263/1216562554030264340/Logoonew.png?ex=66134c2b&is=6600d72b&hm=06b6dae2d0f70b9a34d2939206c860a6089e000a5b359ae71a14dc43baf6161e&format=webp&quality=lossless&width=625&height=625&",
        row,
        color,
      });

      // reply
      await sendEmbed(interaction, {
        description: `The post has been created ${threadChannel}.`,
        // ephemeral: true,
        followUp: true,
        color,
      });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        color: Colors.RED,
        ephemeral: true,
        followUp: true,
      });
    }
  },
};
