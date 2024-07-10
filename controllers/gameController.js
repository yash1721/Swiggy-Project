import gameService from "../services/gameService.js";

// Controller to handle the start of the game
export const startGame = async (req, res) => {
  try {
    const { players } = req.body;

    // Validate input
    if (!Array.isArray(players) || players.length < 2) {
      return res
        .status(400)
        .json({ error: "At least two players must be provided." });
    }

    // Process player data
    const playersData = players.map((player) => ({
      name: player.name,
      health: player.health,
      strength: player.strength,
      attack: player.attack,
    }));

    // Start the game
    const result = await gameService.startGame(players);
    res.status(200).json(result);
  } catch (error) {
    console.error("Error in startGame controller:", error);
    res.status(500).json({ error: error.message });
  }
};
