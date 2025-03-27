import { User } from "./user.interface";

export interface AuthRequest {
    email: string;
    password: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface AuthResponse {
    user: User;
    token?: string;
    refreshToken?: string;
}

export interface RefreshTokenResponse {
    token: string;
    refreshToken: string;
}