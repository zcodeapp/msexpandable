export interface IInjectableOptions<T extends any[] = any[]> {
    singleton: boolean;
    args: T;
}
