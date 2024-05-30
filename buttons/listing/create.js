const {
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createForumPost = require("../../functions/messages/createForumPost");
const createRow = require("../../functions/messages/createRow");
const Colors = require("../../utils/colors");
const fillImage = require("../../functions/images/fillImage");
const isAdmin = require("../../functions/permissions/isAdmin");
const getCategory = require("../../functions/channels/getCategory");
const getChannel = require("../../functions/channels/getChannel");
const getTags = require("../../functions/channels/getTags");

module.exports = {
  name: "create",

  button: new ButtonBuilder()
    .setCustomId("create")
    .setLabel("Create")
    .setStyle(ButtonStyle.Success),

  async run(interaction) {
    // defer the reply
    await interaction.deferReply({ ephemeral: false });

    console.log("\nSTART CREATING A POST");

    // get the interaction data
    const { message, guild, channel, member, client } = interaction;

    //////////////////////////////////////
    // CHECK THE CORECTNESS OF THE DATA //
    //////////////////////////////////////

    try {
      // check a permissions and send a warning
      if (!isAdmin(member)) throw new Error("Only admins can create the post!");

      // get a forum
      const socialPlatformName = channel.parent.name
        .toLowerCase()
        .split(" - ")[1];

      // get the channel category
      const targetCategory = await getCategory("home marketplace", guild);

      // get the target channel
      const targetChannel = getChannel(socialPlatformName, targetCategory);

      // get tags (filters)
      const appliedTags = await getTags(channel, targetChannel);

      /////////////////////
      // HANDLING IMAGES //
      /////////////////////

      // get the image thread
      const imageThread = channel.threads.cache.find(
        thread => thread.name === "ADD IMAGES"
      );

      // get messages with images
      const imageThreadMessages = await imageThread.messages.fetch();

      // get url of images
      const imageMessages = imageThreadMessages
        .filter(m => m.attachments.size)
        .first(10);

      if (!imageMessages.length)
        throw new Error(`Add images in ${imageThread}!`);

      // get the main page role
      const emojis = await interaction.guild.emojis.fetch();
      const mainPageEmoji = emojis.find(
        r => r.name.toLowerCase() === "mainpage"
      );

      // get fresh reaction data
      await Promise.all(
        imageThreadMessages.map(async m => {
          // skip if meessage has no images
          if (!m.attachments.size) return;

          // get fresh reaction data
          await Promise.all(
            m.reactions.cache.map(async r => await r.users.fetch())
          );
        })
      );

      // get the thumbnail image
      const selectedThumbnailMessage = imageThreadMessages.find(m => {
        // skip if meessage has no images or hasn't got the main page reaction
        if (!m.reactions.cache.has(mainPageEmoji.id) || !m.attachments.size)
          return false;

        // get the main page reaction
        const mainPageReaction = m.reactions.cache.get(mainPageEmoji.id);

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
      const thumbnailMessage = selectedThumbnailMessage || imageMessages[0];

      // scale Proportionally and crop the thumbnail image
      const thumbnail = await fillImage(thumbnailMessage, 433, 346);

      // remove the thumbnail image from other images
      const index = imageMessages.indexOf(thumbnailMessage);
      if (index !== -1) imageMessages.splice(index, 1);

      ///////////////////////////
      // PREPARE MESSAGES DATA //
      ///////////////////////////

      // get the embed description
      let description = message.embeds[0].description;

      // get user id from embed (seller)
      const regex = /<@(\d+)>/;
      const match = description.match(regex);

      const userMention = match[0];
      const userId = match[1];

      // edit the description remove an unnecessary text
      description = description.split("\n\n").slice(1, -2);

      // get a post name
      const name = description[0].split("\n")[1];

      // merge the description
      description = description.join("\n\n");    

      // edit the description
      description = `**Seller**:\n${userMention}\n\n${description}\n\n*Feel free to contact the seller via our platform!*`;

      // get the embed image
      const image = message.embeds[0].image.url;

      // create button
      const row = createRow("enquire");

      // get the embed color
      const color = message.embeds[0].color;

      const seller = await client.users.fetch(userId);

      //##################//
      // SENDING MESSAGES //
      //##################//

      // create a post in the forum
      const threadChannel = await createForumPost(targetChannel, {
        name,
        message: { files: [thumbnail] },
        appliedTags,
      });

      // send the rest of the images if there are any
      if (imageMessages.length) {
        // crop the images to 433 x 346 px
        const files = await Promise.all(
          imageMessages.map(async file => await fillImage(file, 433, 346))
        );

        // send the images
        await threadChannel.send({ files });
      }

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

      // send the notification to the seller
      await sendEmbed(seller, {
        description: `The post has been created ${threadChannel}.`,
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
