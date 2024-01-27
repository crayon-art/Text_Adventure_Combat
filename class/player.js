const {Character} = require('./character');
const {Enemy} = require('./enemy');
const {Food} = require('./food');

class Player extends Character {

  constructor(name, startingRoom) {
    super(name, "main character", startingRoom);
  }

  move(direction) {

    const nextRoom = this.currentRoom.getRoomInDirection(direction);

    // If the next room is valid, set the player to be in that room
    if (nextRoom) {
      this.currentRoom = nextRoom;

      nextRoom.printRoom(this);
    } else {
      console.log("You cannot move in that direction");
    }
  }

  printInventory() {
    if (this.items.length === 0) {
      console.log(`${this.name} is not carrying anything.`);
    } else {
      console.log(`${this.name} is carrying:`);
      for (let i = 0 ; i < this.items.length ; i++) {
        console.log(`  ${this.items[i].name}`);
      }
    }
  }

  takeItem(itemName) {

    // Fill this in
    const item=this.currentRoom.getItemByName(itemName);
    this.items.push(item);
    this.currentRoom.items=this.currentRoom.items.filter(rItem=>rItem.name!==itemName);
    console.log(`${itemName} has been added to your inventory.`);
  }

  dropItem(itemName) {

    // Fill this in
    const dItem =this.getItemByName(itemName);
    this.items=this.items.filter(dItem=>itemName!==dItem.name);
    this.currentRoom.items.push(dItem);
    console.log(`${itemName} has been removed from your inventory.`);
    return this.items;
  }

  eatItem(itemName) {
    // Fill this in
    const eItem = this.getItemByName(itemName);
    if (eItem instanceof Food){
        this.items=this.items.filter(dItem=>itemName!==dItem.name);
        this.currentRoom.items=this.currentRoom.items.filter(eItem=>eItem.name!==itemName);
        console.log(`${this.name} eats ${itemName}.`);
    }
    else {
        console.log(`You cant eat ${itemName}.`);
    }
  }

  getItemByName(name) {
    // Fill this in
    let itemArray = this.items.filter(item => name === item.name);
    return itemArray[0];
  }

  hit(name) {
    // Fill this in
    let enemy = this.currentRoom.getEnemyByName(name);
    enemy.attackTarget = this; // Set the enemy's attack target to the player
    enemy.applyDamage(10);
    console.log(`${this.name} has dealt 10 dmg to ${enemy.name}`);
    console.log(`${enemy.name} has ${enemy.health} health left`);
    enemy.act(); // Trigger the enemy's act method to check for attack conditions
  }

  die() {
    console.log("You are dead!");
    process.exit();
  }

}

module.exports = {
  Player,
};
