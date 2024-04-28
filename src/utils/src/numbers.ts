export class Numbers {
  public static RandomNumber(
    length: number = 10,
    ignoreZero?: boolean
  ): number {
    let randomChars = '0123456789'
    if (ignoreZero) randomChars = '123456789'
    let randomNumber = randomChars.charAt(
      Math.floor(Math.random() * (randomChars.length - 1)) + 1
    )
    for (let i = 1; i < length; i++) {
      randomNumber += randomChars.charAt(
        Math.floor(Math.random() * randomChars.length)
      )
    }
    return Number(randomNumber)
  }
  public static RandomDecimal(
    length: number = 10,
    decimals: number = 2
  ): number {
    return Number(
      `${Numbers.RandomNumber(length, true)}.${Numbers.RandomNumber(decimals, true)}`
    )
  }
}
