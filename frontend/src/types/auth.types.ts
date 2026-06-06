export interface RegisterFormData {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;

    age: string;
    gender: string;
    heightCm: string;
    weightKg: string;
}

export interface LoginFormData {
    email: string;
    password: string;
}