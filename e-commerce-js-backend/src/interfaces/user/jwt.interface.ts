import { JwtPayload } from "jsonwebtoken";

export interface TokenPayload extends JwtPayload {
    id: string;
    role?: string;
}

export interface TokenOptions {
    expiresIn?: string;
    role?: string;
}