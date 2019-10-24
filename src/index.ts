import admin from "firebase-admin";
import * as serviceAccount from "./boardbook-33f26-firebase-adminsdk-ty14w-e9ec275f2f.json";

const games = [
  {
    name: "",
    description: "",
    difficulty: 5,
    minPlayers: 2,
    maxPlayers: 5,
    teams: [
      {
        name: "",
        roles: [
          {
            name: ""
          },
          {
            name: ""
          },
          {
            name: ""
          },
          {
            name: ""
          }
        ]
      }
    ]
  }
];

(async function() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://boardbook-33f26.firebaseio.com"
  });

  const db = admin.firestore();

  for (const game of games) {
    const gameDoc = await db.collection('_games').add({
      name: game.name,
      description: game.description,
      difficulty: game.difficulty,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers,
    })

    console.log('Created game with id', gameDoc.id);

    for (const team of game.teams) {
      const teamDoc = await db.collection('_game_teams').add({
        name: team.name,
        gameId: gameDoc.id,
      })

      console.log('Created team with id', teamDoc.id);

      for (const role of team.roles) {
        const roleDoc = await db.collection('_game_roles').add({
          name: role.name,
          teamId: teamDoc.id,
        })

        console.log('Created role with id', roleDoc.id);
      }
    }
  }
})();
