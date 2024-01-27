const {Character} = require('./character');


class Enemy extends Character {
  constructor(name, description, currentRoom) {
    // Fill this in
    super (name, description, currentRoom)
    this.cooldown=3000;
    this.attackTarget=null;
  }

  setPlayer(player) {
    this.player = player;
  }


  randomMove() {
    // Fill this in
    let exits = this.currentRoom.getExits();
    let rand = Math.floor(Math.random() * exits.length);
    let direction = exits[rand];

    let connectingRoom = this.currentRoom.getRoomInDirection(direction);

    if (connectingRoom) {
      this.currentRoom = connectingRoom;
    }

    this.scratchNose();
  }


  takeSandwich() {
    // Fill this in
  }

  // Print the alert only if player is standing in the same room
  alert(message) {
    if (this.player && this.player.currentRoom === this.currentRoom) {
      console.log(message);
    }
  }

  rest() {
    // Wait until cooldown expires, then act
    const resetCooldown = ()=> {
      this.cooldown = 0;
      this.act();
    };
    setTimeout(resetCooldown, this.cooldown);
  }

  attack() {
    // Fill this in
    if (this.attackTarget) {
      this.attackTarget.applyDamage(10);
      this.act();
    }
  }

  applyDamage(amount) {
    // Fill this in
    this.health-=amount;
  }



  act() {
    if (this.health <= 0) {
      // Dead, do nothing;
      console.log(`${this.name} has died`)
    } else if (this.cooldown > 0) {
      this.rest();
    } else {
      this.scratchNose();
    }

    // Fill this in
  }


  scratchNose() {
    this.cooldown += 1000;

    this.alert(`${this.name} scratches its nose`);

  }


}

module.exports = {
  Enemy,
};
