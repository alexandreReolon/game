"use strict";
(() => {
  // src/Character.ts
  var Character = class {
    constructor(name, health, attackPower, image) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.image = image;
    }
    takeDamage(damage) {
      this.health = Math.max(0, this.health - damage);
      this.log(`${this.name} recebeu ${damage} de dano. HP: ${this.health}`);
    }
    isAlive() {
      return this.health > 0;
    }
    getHealth() {
      return this.health;
    }
    log(message) {
      const logEl = document.getElementById("log");
      logEl.textContent += message + "\n";
    }
  };

  // src/Mage.ts
  var Mage = class extends Character {
    constructor(name) {
      super(name, 80, 15, "https://i.imgur.com/CHcCtTE.png");
      this.mana = 100;
    }
    attack(target) {
      if (this.mana >= 20) {
        this.log(`${this.name} lan\xE7a Fireball! \u{1F525}`);
        target.takeDamage(this.attackPower + 10);
        this.mana -= 20;
      } else {
        this.log(`${this.name} sem mana... ataque fraco`);
        target.takeDamage(this.attackPower);
      }
    }
  };

  // src/Warrior.ts
  var Warrior = class extends Character {
    constructor(name) {
      super(name, 120, 20, "https://i.imgur.com/CHcCtTE.png");
    }
    attack(target) {
      this.log(`${this.name} ataca com espada! \u2694\uFE0F`);
      target.takeDamage(this.attackPower);
    }
  };

  // src/game.ts
  var Game = class {
    async startBattle(player1, player2) {
      this.updateUI(player1, player2);
      document.getElementById("log").textContent = "";
      let turn = 1;
      while (player1.isAlive() && player2.isAlive()) {
        this.log(`
--- Turno ${turn} ---`);
        player1.attack(player2);
        this.updateUI(player1, player2);
        if (!player2.isAlive()) break;
        await this.sleep(800);
        player2.attack(player1);
        this.updateUI(player1, player2);
        await this.sleep(800);
        turn++;
      }
      this.log("\n\u{1F3C6} Fim da batalha!");
      if (player1.isAlive()) {
        this.log(`${player1.name} venceu!`);
      } else {
        this.log(`${player2.name} venceu!`);
      }
    }
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    log(message) {
      const logEl = document.getElementById("log");
      logEl.textContent += message + "\n";
    }
    updateUI(player1, player2) {
      document.getElementById("img1").src = player1.image;
      document.getElementById("name1").textContent = player1.name;
      document.getElementById("hp1").textContent = `HP: ${player1.getHealth()}`;
      document.getElementById("img2").src = player2.image;
      document.getElementById("name2").textContent = player2.name;
      document.getElementById("hp2").textContent = `HP: ${player2.getHealth()}`;
    }
  };
  function iniciar() {
    const player1 = new Warrior("Thor");
    const player2 = new Mage("Merlin");
    const game = new Game();
    game.startBattle(player1, player2);
  }
  document.getElementById("btnBattle").addEventListener("click", iniciar);
})();
