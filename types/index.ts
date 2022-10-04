import { type } from "os"

export type User = {
    id: string | number,
    username: string,
    email: string,
}

export type Email = {
    id: string | number,
    message: string,
    recipient: string,
    subject: string,
}