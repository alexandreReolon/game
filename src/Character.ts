
  export abstract class Character {
    public name: string;
    protected health: number;
    protected attackPower: number;
    public image: string;

    constructor(
      name: string,
      health: number,
      attackPower: number,
      image: string,
    ) {
      this.name = name;
      this.health = health;
      this.attackPower = attackPower;
      this.image = image;
    }

    public takeDamage(damage: number): void {
      this.health = Math.max(0, this.health - damage);
      this.log(`${this.name} recebeu ${damage} de dano. HP: ${this.health}`);
    }

    public isAlive(): boolean {
      return this.health > 0;
    }

    public getHealth(): number {
      return this.health;
    }

    public log(message: string) {
      const logEl = document.getElementById("log")!;
      logEl.textContent += message + "\n";
    }

    public abstract attack(target: Character): void;
  }
