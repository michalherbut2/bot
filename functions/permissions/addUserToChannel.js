const sendEmbed = require("../messages/sendEmbed");

module.exports = async ({channel}, user) => {
  try {
    // Granting user access to the channel
    channel.permissionOverwrites.edit(user.id, { ViewChannel: true });
    console.log(`Added ${user.username} to channel ${channel.name}.`);

    sendEmbed(channel, "Added user", `Added ${user.username} to channel ${channel.name}.`, "/home/michal/Obrazy/Jura-logos/logo_server_crab.gif")

    // Wyślij wiadomość prywatną
    await sendEmbed(user, "Hi", `Someone is waiting in the channel <#${channel.id}>!`)
    console.log(`Private message sent to ${user.tag}.`);

  } catch (error) {
    console.error("Error adding user to channel:", error);
  }
};
