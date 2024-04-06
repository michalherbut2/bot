const { SlashCommandBuilder } = require("discord.js");
const sendEmbed = require("../functions/messages/sendEmbed");
const createRow = require("../functions/messages/createRow");

module.exports = {
  data: new SlashCommandBuilder().setName("image").setDescription("send image"),

  async run(client, interaction) {
    await interaction.deferReply()
    await interaction.followUp({
      files: [
        "https://cdn.discordapp.com/attachments/1217520156855635999/1220535328893571122/image.png?ex=660f4b1a&is=65fcd61a&hm=739149cc44f2fb1af14e9abdf09a500bd53af751e3d9da6dbff968fe28687907&",
        "https://cdn.discordapp.com/attachments/1217520156855635999/1220494166992359524/image.png?ex=660f24c5&is=65fcafc5&hm=cb8052729c8c16f12a704ac80f13814e430e914b74d5aa41678fec57d8ed3e4b&",
        "https://cdn.discordapp.com/attachments/1217520156855635999/1220464312099930272/image.png?ex=660f08f7&is=65fc93f7&hm=790c709604650984c689490624ac4dbd4fafa738da2be0c8ea1b361a75157fee&",
        "https://cdn.discordapp.com/attachments/1217520156855635999/1220122419092652183/100.png?ex=660dca8d&is=65fb558d&hm=f3fd6adcaa4d21c46f4a6faa8360d7a4aa02ed70073ecdb2da421515d92b3c40&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1221184360930345000/image.png?ex=6611a790&is=65ff3290&hm=bb99f2ae6373a7cd0f75771ffbc96b7c3b577dffdb81e7776a753fb6b70064d8&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1219019626550394950/gr_mokrzyn_3.png?ex=6609c77f&is=65f7527f&hm=135c89390a7203b70d782282f19c6dfb6da073ad8bb6f90a8d08f82169f8ffce&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1218863023997980712/logo_server_crab_big.gif?ex=66127026&is=65fffb26&hm=a753ffd6e99d5befcc9a93821be01d311896468b42dcc5d1155df45861694ff0&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1218562176579539014/Zrzut_ekranu_71.png?ex=661157f6&is=65fee2f6&hm=570c163f03d2834d3a1ff472ed1b83b073386e6f8078402897f3192d0b93a72b&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1218318072348278794/fsScreen_2024_01_19_00_12_55.png?ex=6610749f&is=65fdff9f&hm=ac4ec7150c6f58635f5896b361d072369dfd936cbda97c08801e75659eacbab9&",
        "https://cdn.discordapp.com/attachments/1124032845543915530/1218312883612680284/Farming_Simulator_22_Screenshot_2024.03.03_-_00.13.04.32.png?ex=66106fca&is=65fdfaca&hm=41bc9501106583b0e0f8df506e0bc1e89f7ef0b3bc3f04749ba6ad9f78261268&",
      ],
    });
  },
};
