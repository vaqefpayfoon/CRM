import { AuthMatchGuard } from "./auth-match.gurad";
import { AuthGuard } from "./auth.guard";

export const guards = [
    AuthGuard,
    AuthMatchGuard
];

export * from "./auth-match.gurad";
export * from "./auth.guard";