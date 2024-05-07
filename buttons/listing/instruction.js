const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

// embed content
const descriptions = {
  tiktok: `**FOLLOWERS:**
<:5_1:1221912624854335498> = </ 5K
<:5_2:1221912611285897377> = 5K +
<:10:1221912600095494224> = 10K +
<:50:1221912178001449142> = 50K +

**RPM:**
<:001:1221916929925709886> = 0.01+
<:025:1221916946019254283> = 0.25+
<:050:1221916959541694624> = 0.50+
<:075:1221916970740613190> = 0.75+

**OTHER:**
<:active:1221922126647529614> = Active
<:lockfinal:1219502287727104041> = BuzzGuard
<a:BangBang:1003305990197870652> = CPB unavailable`,

  youtube: `**SUBSCRIBERS:**
<:5_yt:1227678285325144064> = </ 5K
<:5_yt2:1227678379264970773> = 5K +
<:10_yt:1227678437032988833> = 10K +
<:50_yt:1227678461993287760> = 50K +

**OTHER:**
<:active:1221922126647529614> = Active`,
  instagram: `**FOLLOWERS:**
<:5_insta1:1227679879764381756> = </ 5K
<:5_insta2:1227679985238806548> = 5K +
<:10_insta:1227680039663833190> = 10K +
<:50_insta:1227680079471972482> = 50K +

**OTHER:**
<:active:1221922126647529614> = Active`,
};

module.exports = {
  name: "instruction",
  button: new ButtonBuilder()
    .setCustomId("instruction")
    .setLabel("Show instruction")
    .setStyle(ButtonStyle.Success),
  
  async run(interaction) {
    const { channel, message } = interaction;

    // get a name of a social media platform
    const socialPlatformName = channel.parent.name
      .toLowerCase()
      .split(" - ")[1];

    // get a color of a social media platform
    const color = message.embeds[0].color;

    // send an instruction    
    sendEmbed(interaction, {
      description: descriptions[socialPlatformName],
      ephemeral: true,
      color,
    });
  },
};
