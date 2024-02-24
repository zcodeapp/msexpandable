export class Numbers {
    public static randomChars = "0123456789";
    public static RandomNumber(length: number = 10): number {
      return Number(Array.from({ length }, () => this.randomChars[Math.floor(Math.random() * this.randomChars.length)]).join(''));
    }
  }