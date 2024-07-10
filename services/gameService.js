import Player from "../models/player.js";
import { rollDice } from "../utils/rollDice.js";

const MAX_MOVES = 100; // Define a threshold for maximum moves

const gameService = {
  async startGame(playerDataList) {
    if (!Array.isArray(playerDataList) || playerDataList.length < 2) {
      throw new Error("At least two players are required to start the game.");
    }

    const players = playerDataList.map((playerData) => {
      return new Player(
        playerData.name,
        playerData.health,
        playerData.strength,
        playerData.attack
      );
    });

    let events = [];
    let activePlayers = [...players];
    let moveCount = 0;

    while (
      gameService.hasMoreThanOnePlayerAlive(activePlayers) &&
      moveCount < MAX_MOVES
    ) {
      for (let i = 0; i < activePlayers.length; i++) {
        const attacker = activePlayers[i];
        const defenders = activePlayers.filter((p) => p !== attacker);

        for (let defender of defenders) {
          const attackRoll = rollDice();
          const defendRoll = rollDice();
          const attackDamage = attacker.attack * attackRoll;
          const defendDamage = defender.strength * defendRoll;
          const damage = attackDamage - defendDamage;

          if (damage > 0) {
            defender.takeDamage(damage);
          }

          events.push({
            attacker: {
              name: attacker.name,
              health: attacker.health,
              roll: attackRoll,
            },
            defender: {
              name: defender.name,
              health: defender.health,
              roll: defendRoll,
              damageTaken: damage > 0 ? damage : 0,
            },
          });
        }
      }

      // Remove players who are knocked out
      activePlayers = activePlayers.filter((p) => p.isAlive());
      moveCount++;
    }

    let winner;
    if (moveCount >= MAX_MOVES) {
      // Declare the player with the maximum health as the winner
      const maxHealthPlayer = activePlayers.reduce(
        (max, player) => (player.health > max.health ? player : max),
        activePlayers[0]
      );
      winner = `${maxHealthPlayer.name} wins the game with the highest health!`;
    } else {
      winner =
        activePlayers.length === 1
          ? `${activePlayers[0].name} wins the game!`
          : "It's a draw!";
    }

    return { winner, events };
  },

  hasMoreThanOnePlayerAlive(players) {
    return players.filter((p) => p.isAlive()).length > 1;
  },
};

export default gameService;
