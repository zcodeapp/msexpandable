export class Datetime {
  public static currentTimestamp(): number {
    return Math.floor(Date.now() / 1000)
  }
}
