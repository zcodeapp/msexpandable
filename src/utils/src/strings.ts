import { v4 as uuidv4 } from 'uuid'

export class Strings {
  public static randomChars =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  public static RandomString(length: number = 10): string {
    return Array.from(
      { length },
      () =>
        this.randomChars[Math.floor(Math.random() * this.randomChars.length)]
    ).join('')
  }
  public static Uuid(): string {
    return uuidv4()
  }
}
