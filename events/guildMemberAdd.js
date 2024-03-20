const client = require("../index");

client.on("guildMemberAdd", async member => {
  // Pobranie informacji o zaproszeniach użytkownika
  //   const userInvites = await member.guild.invites.fetch();

  const invites = await member.guild.invites.fetch()

  invites.map(invite => console.log(invite))

  // Sumowanie ilości zaproszeń użytkownika
  const totalInvites = userInvites.reduce(
    (acc, invite) => acc + invite.uses,
    0
  );

  // Sprawdzenie, czy istnieje odpowiednia rola dla danej ilości zaproszeń
  if (invitesToRoles.has(totalInvites)) {
    // Pobranie roli z mapy
    const roleName = invitesToRoles.get(totalInvites);
    // Pobranie obiektu roli z serwera
    const role = member.guild.roles.cache.find(r => r.name === roleName);
    // Przydzielenie roli użytkownikowi
    if (role) {
      member.roles.add(role);
      console.log(
        `Przydzielono rolę "${roleName}" użytkownikowi ${member.user.tag} za ${totalInvites} zaproszeń.`
      );
    } else {
      console.log(`Nie można znaleźć roli "${roleName}" na serwerze.`);
    }
  }
});
