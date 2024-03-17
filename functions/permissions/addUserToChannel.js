const sendEmbed = require("../messages/sendEmbed");

module.exports = async ({channel}, user) => {
  try {
    // Granting user access to the channel
    channel.permissionOverwrites.edit(user.id, { ViewChannel: true });
    console.log(`Added ${user.username} to channel ${channel.name}.`);

    sendEmbed(channel, "Added user", `Added ${user.username} to channel ${channel.name}.`, "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&")

    // Wyślij wiadomość prywatną
    await sendEmbed(user, "Hi", `Someone is waiting in the channel <#${channel.id}>!`)
    console.log(`Private message sent to ${user.tag}.`);

  } catch (error) {
    console.error("Error adding user to channel:", error);
  }
};
