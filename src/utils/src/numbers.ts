export class Numbers {
  public static RandomNumber(length: number = 10, ignoreZero?: boolean): number {
    let randomChars = "0123456789";
    if (ignoreZero)
      randomChars = "123456789";
    return Number(Array.from({ length }, () => randomChars[Math.floor(Math.random() * randomChars.length)]).join(''));
  }
  public static RandomDecimal(length: number = 10, decimals: number = 2): number {
    return Number(`${Numbers.RandomNumber(length, true)}.${Numbers.RandomNumber(decimals, true)}`);
  }
}