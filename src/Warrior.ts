import { Character } from "./Character";

export class Warrior extends Character {
  constructor(name: string) {
    super(name, 120, 20, "https://i.imgur.com/CHcCtTE.png");
  }

  public attack(target: Character): void {
    this.log(`${this.name} ataca com espada! ⚔️`);
    target.takeDamage(this.attackPower);
  }
}

