import { Photo } from "./photo.interface";

export interface IUser {
    id: string;
    userName: string;
    dateOfBirth: Date;
    created: Date;
    photos: Photo[];
}