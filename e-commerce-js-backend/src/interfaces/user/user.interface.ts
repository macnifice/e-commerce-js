export interface User {
    id: string;
    email: string;
    name: string;
    role: string;
    isVerified: boolean;
}

export interface UserCreationAttributes {
    email: string;
    password: string;
    name: string;
    role: string;
}
