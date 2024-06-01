const { Events } = require("discord.js");
const client = require("../index");
const sendEmbed = require("../functions/messages/sendEmbed");
const Colors = require("../utils/colors");
const isAdmin = require("../functions/permissions/isAdmin");

client.on(Events.MessageReactionAdd, async (messageReaction, user) => {
  if (user.bot) return;

  const { message, emoji, users } = messageReaction;

  // get a member
  const member = await message.guild.members.fetch(user.id);

  // check member permission
  // if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
  if (isAdmin(member)) {
    if (message.channel.name.toLowerCase() === "add images")
      if (emoji.name === "❌")
        // delete image on ADD IMAGES thead when an admin add ❌ reaction
        message.delete();
  } else {
    // if on the add filters embed on the listing channel
    // or if on the message with an images on the add images thread
    if (
      (message.channel.name.toLowerCase().includes("listing-") &&
        message.embeds[0]?.title.toLowerCase() === "add filters") ||
      (message.channel.name.toLowerCase() === "add images" &&
        message.attachments.length)
    ) {
      try {
        // remove non-admin reaction
        await users.remove(user.id);

        const messages = await message.channel.messages.fetch();

        // send one warning if member without admin permissions add filter reaction
        if (
          !messages.some(m => {
            return m.embeds[0]?.description.includes(
              "Only **admins** have permission to do so."
            );
          })
        )
          sendEmbed(message.channel, {
            description: `**${user}**, you can't add filters.\n\nOnly **admins** have permission to do so.`,
            color: Colors.RED,
          });

        console.log(
          `Removed ${emoji.name} reaction from ${user.tag}, who is not an admin.`
        );
      } catch (error) {
        console.error(
          "\x1b[31m%s\x1b[0m",
          `Wystąpił błąd podczas usuwania reakcji: ${error}`
        );
      }
    }
  }
});
