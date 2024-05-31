const sendEmbed = require("./sendEmbed");
const Colors = require("../../utils/colors");

module.exports = async (error, target) => {
  console.error("\x1b[31m%s\x1b[0m", error);

  sendEmbed(target, {
    description: error.message,
    color: Colors.RED,
    ephemeral: true,
    followUp: true,
  });
};
