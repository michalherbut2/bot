const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

const title = "Viral Buzz - Rules"

const image =
  "https://media.discordapp.net/attachments/1216183037507932263/1216545740843778068/RULES.png?ex=66133c82&is=6600c782&hm=d906cb005e65e974c1cee6828b79aca44b388803a993745a8b52460490742a4e&format=webp&quality=lossless&width=1206&height=260&";

const thumbnail =
  "https://media.discordapp.net/attachments/1216104890976305162/1216201330549456926/Logoonew.png?ex=6611fbc1&is=65ff86c1&hm=50ceb9b9c349f96013743bd5bb672e231bbad5e233123921185bf65e8b516e45&format=webp&quality=lossless&width=586&height=586&";

const description = `**Discord Community Guidelines:**
* All members must adhere to Discord's Terms of Service and Community Guidelines at all times.

**Respectful Conduct:**
* Treat every member with respect.
* Threats of any kind (death threats, doxing, swatting)
* Hate speech, racism, sexism
* Any form of harassment or discrimination

**No Advertising:**
* No promotions or advertisements, including via direct messages. This applies to all members.

**No Spamming:**
* Avoid spamming messages or using disruptive tools like soundboards, voice changers, or ear-rape in text or voice channels.

**No Threats, Direct or Indirect:**
* Any threats, be it DDoS, violence, abuse, or other malicious intent, are strictly prohibited.
* Your presence in this server signifies your acceptance of these rules, which may be updated without notice. It's your responsibility to stay informed about any changes`;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rules")
    .setDescription("create rules")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true })
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("agree", "doNotAgree");

    sendEmbed(channel, {
      title,
      description,
      image,
      row,
      thumbnail,
    });
  },
};
