export interface IUser {
    id: string;
    displayName: string;
    email: string;
    token: string;
}
export interface ILogin {
    email: string;
    password: string;
}