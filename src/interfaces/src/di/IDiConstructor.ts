import { ILogger } from "..";

export interface IDiConstructor {
    restrictRewriteKey?: boolean,
    cleanSingleton?: boolean,
    logger?: ILogger
}