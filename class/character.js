const {Room} = require("./room.js");
const {Item} = require("./item.js");
const {Food} = require("./food.js");

class Character {

  constructor(name, description, currentRoom) {
    // Fill this in
    this.name = name;
    this.description = description;
    this.currentRoom = currentRoom;
    this.strength = 10;
    this.health = 100;
    this.items = [];
  }

  applyDamage(amount) {
    // Fill this in
    this.health-=amount;
    if (this.health<=0){
      this.die();
    }
    else console.log(`${this.name} takes ${amount} dmg`);
  }

  die() {
    // Fill this in
    this.items.forEach(item=>this.currentRoom.items.push(item));
      this.items=[];
      this.currentRoom=null;
  }

}

module.exports = {
  Character,
};
