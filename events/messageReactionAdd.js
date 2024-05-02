const { Events, PermissionsBitField } = require("discord.js");
const client = require("../index");
const sendEmbed = require("../functions/messages/sendEmbed");

client.on(Events.MessageReactionAdd, async (messageReaction, user) => {
  if (user.bot) return;

  const { message, emoji, users } = messageReaction;

  // get a member
  const member = await message.guild.members.fetch(user.id);

  // check member permission
  if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    if (message.channel.name === "ADD IMAGES")
      if (emoji.name === "❌")
        // delete image on ADD IMAGES thead when an admin add ❌ reaction
        message.delete();
  } else {
    // on listing channel
    if (message.channel.name.includes("listing-")) {
      console.log(`Collected ${emoji.name} from ${user.tag}`);

      try {
        // remove non-admin reaction
        await users.remove(user.id);

        const messages = await message.channel.messages.fetch();

        // send one warning if member without admin permissions add filter reaction
        if (
          !messages.some(m => {
            return m.embeds[0]?.description.includes(
              "**, you can't add filters.\n\nOnly **admins** have permission to do so."
            );
          })
        )
          sendEmbed(message.channel, {
            description: `**${user}**, you can't add filters.\n\nOnly **admins** have permission to do so.`,
            color: "red",
          });

        console.log(
          `Usunięto reakcję ${emoji.name} od użytkownika ${user.tag}, który nie jest administratorem.`
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
