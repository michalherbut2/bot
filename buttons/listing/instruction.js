const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "instruction",
  button: new ButtonBuilder()
    .setCustomId("instruction")
    .setLabel("Show instruction")
    .setStyle(ButtonStyle.Success),
  async execute(interaction) {
    sendEmbed(interaction, { description: `**FOLLOWERS:**
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
<a:BangBang:1003305990197870652> = CPB unavailable`, ephemeral: true });
  },
};
