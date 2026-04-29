import { Character } from "./Character";
import { Mage } from "./Mage";
import { Warrior } from "./Warrior";

export class Game {
  public async startBattle(player1: Character, player2: Character) {
    this.updateUI(player1, player2);
    document.getElementById("log")!.textContent = "";

    let turn = 1;

    while (player1.isAlive() && player2.isAlive()) {
      this.log(`\n--- Turno ${turn} ---`);

      player1.attack(player2);
      this.updateUI(player1, player2);
      if (!player2.isAlive()) break;

      await this.sleep(800);

      player2.attack(player1);
      this.updateUI(player1, player2);
      await this.sleep(800);

      turn++;
    }

    this.log("\n🏆 Fim da batalha!");
    if (player1.isAlive()) {
      this.log(`${player1.name} venceu!`);
    } else {
      this.log(`${player2.name} venceu!`);
    }
  }

  public sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  public log(message: string) {
    const logEl = document.getElementById("log")!;
    logEl.textContent += message + "\n";
  }

  public updateUI(player1: Character, player2: Character) {
    (document.getElementById("img1") as HTMLImageElement).src = player1.image;
    document.getElementById("name1")!.textContent = player1.name;
    document.getElementById("hp1")!.textContent = `HP: ${player1.getHealth()}`;

    (document.getElementById("img2") as HTMLImageElement).src = player2.image;
    document.getElementById("name2")!.textContent = player2.name;
    document.getElementById("hp2")!.textContent = `HP: ${player2.getHealth()}`;
  }
}

function iniciar() {
  const player1 = new Warrior("Thor");
  const player2 = new Mage("Merlin");
  const game = new Game();
  game.startBattle(player1, player2);
}

document.getElementById("btnBattle")!.addEventListener("click", iniciar);
