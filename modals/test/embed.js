const sendEmbed = require("../../functions/messages/sendEmbed");

module.exports = {
  name: "embed",

  async execute(interaction) {
    const { fields } = interaction;
    
    const title = fields.getTextInputValue("title");
    const description = fields.getTextInputValue("description");
    const footerText = fields.getTextInputValue("custom");
    
    await sendEmbed(interaction, {
      title,
      description,
      footerText
    });
  },
};
