import * as CryptoJS from 'crypto-js'

/* eslint-disable @typescript-eslint/no-explicit-any */
export class Transform {
  public static Clone<T, Y = T>(origin: T): Y {
    return JSON.parse(JSON.stringify(origin))
  }

  public static md5(input: any): string {
    return CryptoJS.MD5(JSON.stringify(input)).toString()
  }
}
