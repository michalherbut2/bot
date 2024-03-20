const { EmbedBuilder, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder, ModalBuilder, TextInputStyle } = require("discord.js");
const sendEmbed = require("../../functions/messages/sendEmbed");
const createRow = require("../../functions/messages/createRow");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("Returns embed"),

  run: async (client, interaction) => {
    const modal = new ModalBuilder()
			.setCustomId('myModal')
      .setTitle('My Modal');
    
    // Add components to modal
    const input = new TextInputBuilder()
	// set the maximum number of characters to allow
	.setMaxLength(1_000)
	// set the minimum number of characters required for submission
	.setMinLength(10)
	// set a placeholder string to prompt the user
	.setPlaceholder('Enter some text!')
	// set a default value to pre-fill the input
	.setValue('Default')
	 // require a value in this input field
	.setRequired(true);

		// Create the text input components
		const favoriteColorInput = new TextInputBuilder()
    .setCustomId('favoriteColorInput')
      // The label is the prompt the user sees for this input
    .setLabel("What's your favorite color?")
      // Short means only a single line of text
    .setStyle(TextInputStyle.Short);

  const hobbiesInput = new TextInputBuilder()
    .setCustomId('hobbiesInput')
    .setLabel("What's some of your favorite hobbies?")
      // Paragraph means multiple lines of text.
    .setStyle(TextInputStyle.Paragraph);

  // An action row only holds one text input,
  // so you need one action row per text input.
  const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
  const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);
  // const rowInput = new ActionRowBuilder().addComponents(input);

  // Add inputs to the modal
  modal.addComponents(firstActionRow, secondActionRow);

  // Show the modal to the user
  await interaction.showModal(modal);
    
    // const embed = new EmbedBuilder()
    //   .setColor("#FF0000")
    //   .setTitle("🏓 Embed!")
    //   .setDescription(`Latency : ${client.ws.ping}ms`)
    //   .setTimestamp()
    //   .setFooter({ text: `Requested by ${interaction.user.tag}`, iconURL: `${interaction.user.displayAvatarURL()}` });
    // const row = createRow("embed")
    // interaction.followUp({ embeds: [embed], components: [row] });
    // // sendEmbed(interaction.channel, {title="LISTING ENQUIRY", description="description @miszalek2", "https://cdn.discordapp.com/attachments/1218001649847763045/1218007792946909234/asdasd22.png?ex=66061927&is=65f3a427&hm=ee637cb8db71085dc0334cf0bfa8296f11859c3aa7fad9ddd54ad8b38a5ed515&"});
    // sendEmbed(interaction.channel, {description: "Elo"})
  },
};
