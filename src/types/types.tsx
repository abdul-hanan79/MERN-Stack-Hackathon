

export type signupUserType = {
    name: string;
    email: string;
    password: string;
    confirmPassword?: string
}
export type loginUserType = {
    email: string;
    password: string;
}