const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("banuje Patryka")
    .addUserOption(option =>
      option
        .setName("czlonek")
        .setDescription("Kogo zbanowwać?")
        .setRequired(true)
    ),

  async run(client, interaction) {
     const { options, guild } = interaction
    const user = options.getUser("czlonek")
    const member = guild.members.cache.get(user.id) 
    // console.log(member);
    member.disableCommunicationUntil(Date.now() + (28 * 24 * 60 * 60 * 1000))
    console.log("siema");
    // await sendEmbed(interaction, { description: `<@${member.id}> dostał bana na 7 min` })
    interaction.followUp("nara")
    console.log("elo");
    
    // sendEmbed(
    //   interaction.channel,
    //   "LISTING ENQUIRY",
    //   "description @miszalek2",
    //   "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&"
    // );
  },
};
