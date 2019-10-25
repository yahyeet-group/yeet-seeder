import admin from "firebase-admin";
import * as serviceAccount from "./boardbook-33f26-firebase-adminsdk-ty14w-e9ec275f2f.json";

const games = [
  {
    name: "Chess",
    description:
      "Chess is a two-player strategy board game played on a checkered board with 64 squares arranged in an 8×8 grid.",
    difficulty: 2,
    minPlayers: 2,
    maxPlayers: 5,
    teams: [
      {
        name: "White",
        roles: []
      },
      {
        name: "Black",
        roles: []
      }
    ]
  },
  {
    name: "Skull",
    description:
      "Skull is a game of deception and manipulation where you pick the flowers and avoid the skulls.",
    difficulty: 1,
    minPlayers: 2,
    maxPlayers: 6,
    teams: []
  },
  {
    name: "Avalon",
    description:
      "Avalon is a social deduction game where the good guys tries to complete missions, while the evil team tries to fail the mission.",
    difficulty: 2,
    minPlayers: 5,
    maxPlayers: 10,
    teams: [
      {
        name: "Evil",
        roles: [
          {
            name: "Mordred"
          },
          {
            name: "Morgana"
          },
          {
            name: "Assassin"
          },
          {
            name: "Oberon"
          },
          {
            name: "Minion of Mordred"
          }
        ]
      },
      {
        name: "Good",
        roles: [
          {
            name: "Merlin"
          },
          {
            name: "Percival"
          },
          {
            name: "Loyal servant of Arthur"
          }
        ]
      }
    ]
  },
  {
    name: "Catan",
    description:
      "Catan is a game building, settling and trading game about earing as much resources as possible.",
    difficulty: 2,
    minPlayers: 3,
    maxPlayers: 4,
    teams: []
  },
  {
    name: "Smallworld",
    description:
      "Smallworld is a game where everyone is one their own, and competes to get the most points.",
    difficulty: 3,
    minPlayers: 2,
    maxPlayers: 5,
    teams: []
  }
];

(async function() {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount as admin.ServiceAccount),
    databaseURL: "https://boardbook-33f26.firebaseio.com"
  });

  const db = admin.firestore();

  for (const game of games) {
    const gameDoc = await db.collection("_games").add({
      name: game.name,
      description: game.description,
      difficulty: game.difficulty,
      minPlayers: game.minPlayers,
      maxPlayers: game.maxPlayers
    });

    console.log("Created game with id", gameDoc.id);

    for (const team of game.teams) {
      const teamDoc = await db.collection("_game_teams").add({
        name: team.name,
        gameId: gameDoc.id
      });

      console.log("Created team with id", teamDoc.id);

      for (const role of team.roles) {
        const roleDoc = await db.collection("_game_roles").add({
          name: role.name,
          teamId: teamDoc.id
        });

        console.log("Created role with id", roleDoc.id);
      }
    }
  }
})();
