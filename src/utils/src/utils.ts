export class Utils {
  public static randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  public static RandomString(length: number = 10): string {
    return Array.from({ length }, () => Utils.randomChars[Math.floor(Math.random() * Utils.randomChars.length)]).join('');
  }
  public static Clone<T, Y = T>(origin: T): Y {
    return JSON.parse(JSON.stringify(origin));
  }
}