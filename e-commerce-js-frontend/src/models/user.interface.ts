export interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    isVerified: boolean;
}

export interface Register {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    status: number;
    data: {
        message?: string;
        user?: User;
    };
}

