export interface SignUpObj {
    username: string;
    email: string;
    password: string;
}

export interface SignInObj {
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}