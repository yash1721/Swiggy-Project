// Class to represent a player
class Player {
  constructor(name, health, strength, attack) {
    this.name = name;
    this.health = health;
    this.strength = strength;
    this.attack = attack;
  }

  // Method to apply damage to the player
  takeDamage(damage) {
    this.health -= damage;
    if (this.health < 0) {
      this.health = 0;
    }
  }

  // Method to check if the player is still alive
  isAlive() {
    return this.health > 0;
  }
}

export default Player;
