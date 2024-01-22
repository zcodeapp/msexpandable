export class Transform {
  public static Clone<T, Y = T>(origin: T): Y {
    return JSON.parse(JSON.stringify(origin));
  }
}