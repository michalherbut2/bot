const {
  ButtonBuilder,
  ButtonStyle,
  PermissionFlagsBits,
  PermissionsBitField,
} = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createThread = require("../../functions/messages/createThread");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  name: "create",

  button: new ButtonBuilder()
    .setCustomId("create")
    .setLabel("Create")
    .setStyle(ButtonStyle.Success),

  async execute(interaction) {
    await interaction.deferReply({ ephemeral: true });

    const { message, guild, channel, member } = interaction;
    let description = message.embeds[0].description;

    // Sprawdzenie, czy użytkownik ma uprawnienia administratora
    if (!member.permissions.has(PermissionsBitField.Flags.Administrator))
      // Wysyłanie przycisku na kanał
      return await sendEmbed(interaction, {
        description: "Only admins can create the post!",
        ephemeral: true,
        followUp: true,
        color: "red",
      });

    // finding user id in embed
    const regex = /<@(\d+)>/;
    const match = description.match(regex);

    const userId = match[0];

    description = description.split("\n\n").slice(1, -2);
    
    const name = description[0].split("\n")[1];

    description = description.join("\n\n");

    const channelName = "tiktok-market";
    const targetChannel = guild.channels.cache.find(
      channel =>
        channel.name.includes(channelName) &&
        channel.parent.name.toLowerCase().includes("home")
    );
    
    description = `**Seller**:\n${userId}\n\n${description}\n\n*Feel free to contact the seller via our platform!*`;

    const imageThread = channel.threads.cache.find(
      thread => thread.name === "ADD IMAGES"
    );

    const mess = await imageThread.messages.fetch();

    const images = mess.map(m => m.attachments.map(i => i.url)).flat();
    console.log("images:", images.length);

    try {
      if (!images.length) throw new Error(`Add images in ${imageThread}!`);

      const embeds = await channel.messages.fetch();
      const tagEmbed = embeds.find(e =>
        e.embeds[0]?.title?.includes("Add Filters")
      );

      const reactions = tagEmbed.reactions.cache;

      const appliedTags = [];

      await Promise.all(
        reactions.map(async reaction => {
          const hasAdmin = (await reaction.users.fetch()).some(user => {
            const member = guild.members.cache.get(user.id);

            return (
              member?.permissions.has(PermissionFlagsBits.Administrator) &&
              !user.bot
            );
          });

          if (hasAdmin) {
            console.log("DODAJE");

            const tag = targetChannel?.availableTags.find(tag => {
              // console.log(tag.emoji, reaction.emoji.id, reaction.emoji.name);
              return (
                tag.emoji?.id === reaction.emoji.id ||
                tag.emoji?.name === reaction.emoji.name
              );
            });

            appliedTags.push(tag.id);
          }
        })
      );

      console.log("TAGS:", appliedTags.length);

      if (!appliedTags.length)
        throw new Error(`Add filters in ${tagEmbed.url}!`);

      // create thread in forum
      const threadChannel = await createThread(targetChannel, {
        name,
        message: { files: images.slice(0, 10) },
        appliedTags,
      });

      const row = createRow("enquire");

      // send embed in thread
      await sendEmbed(threadChannel, {
        description,
        image:
          "https://media.discordapp.net/attachments/1218001649847763045/1218010018939670579/listing.png?ex=660f55ba&is=65fce0ba&hm=535bc26678b6f233265d24673ac9174f6a5d25733bfc0f545a4f2c524f6bec1c&format=webp&quality=lossless&width=1440&height=311&",
        thumbnail:
          "https://media.discordapp.net/attachments/1216183037507932263/1216562554030264340/Logoonew.png?ex=66134c2b&is=6600d72b&hm=06b6dae2d0f70b9a34d2939206c860a6089e000a5b359ae71a14dc43baf6161e&format=webp&quality=lossless&width=625&height=625&",
        row,
      });

      // reply
      await sendEmbed(interaction, {
        description: `The post has been created ${threadChannel}.`,
        ephemeral: true,
        followUp: true,
      });
    } catch (error) {
      console.error("\x1b[31m%s\x1b[0m", error);

      sendEmbed(interaction, {
        description: error.message,
        color: "red",
        ephemeral: true,
        followUp: true,
      });
    }
  },
};
