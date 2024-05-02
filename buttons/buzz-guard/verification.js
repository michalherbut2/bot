const { ButtonBuilder, ButtonStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

// embed content
const image =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219510472244461649/buzzeriffy.png?ex=66274021&is=6614cb21&hm=c22320c8ad1f4942d36619c64a55992d9bcaa93394cf3dfd3a75d3e55fc8764d&";

const thumbnail =
  "https://cdn.discordapp.com/attachments/888756864748228681/1219506201491144734/logo-final.png?ex=6614c727&is=66025227&hm=06d5990f17423e6cf0ce03063ba0ac0185b758ab10132c794b6002ecd5056ac9&";

const title = "BuzzGuard – Buzzerify System";

const footerText = "©️COPYRIGHT VIRAL BUZZ 2024";

const color = 0x58c7fe;

const description = `After making your purchase, you will need to go through our TikTok account listing verification system.

This verification process is conducted individually by our staff for each listing.

**VERIFICATION PROCESS:**

You will be asked to screen-record your dashboard.

To ensure the authenticity of the recorded footage and prevent the use of pre-recorded content, we will verify your time zone and device.

**ANALYZING PROCESS:**

* OGE security alerts
* Followers active hours/days
* Audience views, follower amount, and likes count
* CPB status
* RPM amount
* Last 30 days activity
* TikTok Shop status
* Confirmation of available funds in the account/past payouts
* Account creation date
* Previous strikes or warnings
* Traffic Locations

**If you don't qualify for BuzzGuard, you won't get a refund.**

You can apply again for another security check after 24 hours.

__Disqualified accounts won't be taken into further consideration__

*If our staff suspects account fraud during the check. You will be permanently disqualified from Buzz-Home and Buzz-Guard plans.*`;

module.exports = {
  name: "verification",

  button: new ButtonBuilder()
    .setCustomId("verification")
    .setLabel("📃 VERIFICATION")
    .setStyle(ButtonStyle.Secondary),

  async run(interaction) {
    const { user } = interaction;

    const row = createRow("litecoin", "bitcoin");

    // send dm
    await sendEmbed(user, {
      title,
      description,
      image,
      footerText,
      row,
      thumbnail,
      color,
      ephemeral: true,
    });

    // do not reply, sent dm
    try {
      await interaction.reply({});
    } catch (error) {
      console.log("do not reply, sent dm");
    }
  },
};
