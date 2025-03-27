export interface BusinessCreationAttributes {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface Business extends BusinessCreationAttributes {
    id: number;
    createdAt: Date;
    updatedAt: Date;
}

