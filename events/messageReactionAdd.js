const { Events, PermissionsBitField } = require("discord.js");
const client = require("../index");
const createRow = require("../functions/messages/createRow");
const sendEmbed = require("../functions/messages/sendEmbed");

client.on(Events.MessageReactionAdd, async (messageReaction, user) => {
  if (user.bot) return;

  const { message, emoji, users } = messageReaction;

  const member = await message.guild.members.fetch(user.id); // Pobierz informacje o członku

  if (member.permissions.has(PermissionsBitField.Flags.Administrator)) {
    if (message.channel.name === "ADD IMAGES")
      if (emoji.name === "❌") message.delete();
  } else {
    if (message.channel.name.includes("listing-")) {
      console.log(`Collected ${emoji.name} from ${user.tag}`);

      try {
        await users.remove(user.id); // Usuń reakcję użytkownika

        const messages = await message.channel.messages.fetch();
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
