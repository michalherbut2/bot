const { SlashCommandBuilder, PermissionsBitField } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

// embed 1
const title1 = "HOW IT STARTED"

const image1 =
  "https://cdn.discordapp.com/attachments/888756864748228681/1218426082554806372/RED.png?ex=66234e37&is=6610d937&hm=dbd064299b2ce572fd8dd98a6ebd98ab575d662fe76616c67f7f2e1dba8d2b5a&";

const description1 = `**Buzz Home** marketplace emerged from our **frustration** with messy marketplaces scattered across different Discord servers.

Trying to buy **social media** accounts was a headache. Listings were **confusing**, **lacking information**, and sometimes **sketchy**.`;

// embed 2
const title2 = "OUR PLAN"

const image2 =
  "https://cdn.discordapp.com/attachments/888756864748228681/1218431832346066944/12333.png?ex=66235392&is=6610de92&hm=3feeb567db812eaecaed3d0a5100d73644ac580b04839ff7abab4800a837ccfc&";

const description2 = `**Determined** to create a **better solution**, we set out to build Buzz Home.

With all the **essential** information at your fingertips, expect **effortless** transactions and **seamless** experiences.

We're on a **mission** to shake up the **social media** community and build trust among our members.`

// embed 3
const image3 = "https://cdn.discordapp.com/attachments/888756864748228681/1217531697021714522/trial.png?ex=6616d2c1&is=66045dc1&hm=f133a824b1928f724da05e3a27c0a805189b82b5d46724fc2f7dfff0b6adbada&"

const title3 = "TRY BUZZ HOME FOR FREE";

const description3 = `Experience the benefits of Buzz Home Marketplace with our 7-day free trial offer.

Explore all the features and perks our platform has to offer.

**Start your free trial today!**`

module.exports = {
  data: new SlashCommandBuilder()
    .setName("get_started")
    .setDescription("create get started")
    .setDefaultMemberPermissions(PermissionsBitField.Flags.Administrator),

  async run(client, interaction) {
    await interaction.deferReply({ ephemeral: true })
    await interaction.deleteReply();

    const { channel } = interaction;

    const row = createRow("sevenDayFreeTrial");

    await sendEmbed(channel, {
      title: title1,
      description: description1,
      image: image1
    });
    
    sendEmbed(channel, {
      title: title2,
      description: description2,
      image: image2,
    });

    sendEmbed(channel, {
      title: title3,
      description: description3,
      image: image3,
      row,
    });
  },
};
