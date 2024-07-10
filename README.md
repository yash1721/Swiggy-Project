# Magical Arena - Game Simulation

## Problem Statement

Design a Magical Arena where players engage in battles defined by their attributes: "health", "strength", and "attack". Players attack in turns using dice rolls to determine damage inflicted and defended. The game ends when a player's health reaches zero.

## Solution Approach

Implemented a game simulation in Node.js where:

- Players are defined by attributes: health, strength, and attack.
- Attacks are resolved using dice rolls to calculate damage.
- Game logic handles turn-based combat, determining attack and defense outcomes.

## Project Structure

```plaintext
|-- app.js
|-- config/
|   |-- config.js
|-- controllers/
|   |-- gameController.js
|-- routes/
|   |-- gameRoutes.js
|-- services/
|   |-- gameService.js
|-- utils/
|   |-- rollDice.js
|-- test/
|   |-- gameService.test.js
|-- package.json
|-- README.md
|-- .gitignore
```
## Rules of the Game
- Players attack in turns based on their health status.
- Attack damage is calculated as attack value multiplied by attacking dice roll outcome.
- Defense reduces incoming damage based on strength multiplied by defending dice roll outcome.
- Game continues until one player's health drops to zero.

## API Documentation
### Endpoints
- **POST /api/play-round**: Initiates a round of the game with provided player details.

#### Request Body
```json
{
  "players": [
    { "name": "Player A", "health": 100, "strength": 10, "attack": 20 },
    { "name": "Player B", "health": 100, "strength": 8, "attack": 18 }
  ]
}
```
### Response Body
```json
{
  "winner": "Player A wins the game!",
  "events": [
    {
      "attacker": { "name": "Player A", "health": 100, "roll": 5 },
      "defender": { "name": "Player B", "health": 16, "roll": 2, "damageTaken": 84 }
    },
    ...
  ]
}
```
## Running the Project

### Prerequisites
- Node.js installed
- npm or yarn package manager

### Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <project-directory>

2. Install dependencies:
    ```bash
    npm install


### Usage
Start the application:
   ```bash
   npm start
```
### Testing
Run unit tests:
   ```bash
   npm test
   ```
### Contributors
- Yash Kumar




    