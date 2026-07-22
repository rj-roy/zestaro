export interface userTypes {
    _id?: string;
    name?: string;
    email?: string;
    password?: string;
    emailVerified?: boolean;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    role?: string;
    plan?: string;
    profileImage?: string;
}