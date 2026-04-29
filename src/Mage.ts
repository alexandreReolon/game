import { Character } from "./Character";


export class Mage extends Character{
  private mana: number;

  constructor(name: string) {
    super(name, 80, 15, "https://i.imgur.com/CHcCtTE.png");
    this.mana = 100;
  }

  public attack(target: Character): void {
    if (this.mana >= 20) {
      this.log(`${this.name} lança Fireball! 🔥`);
      target.takeDamage(this.attackPower + 10);
      this.mana -= 20;
    } else {
      this.log(`${this.name} sem mana... ataque fraco`);
      target.takeDamage(this.attackPower);
    }
  }
}
